import ApiUrlBuilder from "@/services/@core/module/ApiUrlBuilder";
import ReconnectingWebSocket from "reconnecting-websocket";
import {getCombineSplitStringsFromCookie} from "@/services/@core/module/LongTokenHandler";
import {Message} from "reconnecting-websocket/reconnecting-websocket";
import Builder from "@/config/Builder";
import {setEndPoints} from "@/services/@core/module/RequestConfigBuilder";
import {GlobalController} from "@/modules/common/GlobalController";
import {cleanIdentityInfo} from "@/modules/common/IdentityHandler";
import {datadogLogs} from "@/config/Datadog";

interface ActivatedSocket {
    [key: string]: ReconnectingWebSocket;
}

interface PendingMap {
    [key: string]: Message[]
}

interface MessageMap {
    [key: string]: Message
}

export const SocketEvent = {
    ODDS_ADJUSTMENT: ApiUrlBuilder.getPath(ApiUrlBuilder.DevSocket.oddsAdjustment),
    DATA_SUBSCRIPTION: ApiUrlBuilder.getPath(ApiUrlBuilder.DevSocket.dataSubscription),
    LIVE_PLAY_LOG: (sport: string) => setEndPoints(ApiUrlBuilder.getPath(ApiUrlBuilder.DevSocket.livePlayLog), {sport: sport}),
    LIVE_DATA_MIXED: ApiUrlBuilder.getPath(ApiUrlBuilder.DevSocket.liveDataMixed)
} as const;

export class GlobalWebSocket implements GlobalWebSocket {
    // static readonly debug = !Builder.isProd;
    static readonly debug = false;
    private static instance: GlobalWebSocket | undefined;
    private socketHandlers: IWebSocketHandler<any>[] = [];
    private activatedSocket: ActivatedSocket = {};
    private _pending: PendingMap = {};
    private _lastMessage: MessageMap = {};
    private isMock = Builder.isMock

    private constructor() {
    }

    public testSubscription(message: string) {
        if (!GlobalWebSocket.debug) return
        const url = SocketEvent.DATA_SUBSCRIPTION
        try { // JSON format
            const data = JSON.parse(message);
            console.log(`mock message\n${Date.now()}: ${JSON.stringify(data)}`)
            if (this.activatedSocket[url]) {
                console.log(`mock send out for`, url, data)
                this.socketHandlers.forEach(handler => {
                    if (handler.key() === url) {
                        handler.receive(data)
                    }
                })
            }
        } catch (e) {
            if (GlobalWebSocket.debug) console.error('mock message error', e, message, url);
            this.errorMessage(message)
        }
    }

    public static getInstance(): GlobalWebSocket {
        if (!GlobalWebSocket.instance) {
            GlobalWebSocket.instance = new GlobalWebSocket();
        }
        return GlobalWebSocket.instance;
    }

    public static clearInstance(): void {
        if (GlobalWebSocket.instance) {
            Object.entries(GlobalWebSocket.instance.activatedSocket).forEach(([key, socket], _) => {
                socket.close()
            })
            GlobalWebSocket.instance.activatedSocket = {}
            GlobalWebSocket.instance = undefined;
        }
    }

    public subscribe(socketHandler: IWebSocketHandler<any>): void {
        const key = socketHandler.key()
        if (GlobalWebSocket.debug) console.log('subscribed', key)
        const socketHandlerIndex = this.socketHandlers.indexOf(socketHandler)
        datadogLogs.logger.debug('Socket Subscribe', {key: key});
        if (socketHandlerIndex < 0)
            this.socketHandlers.push(socketHandler)
        if (!this.activatedSocket[key]) {
            this.connect(socketHandler.key())
        }
    }

    public unsubscribe(handler: IWebSocketHandler<any>): void {
        const key = handler.key()
        if (GlobalWebSocket.debug) console.log('unsubscribed', handler.key());
        const eventHandlerIndex = this.socketHandlers.indexOf(handler)
        datadogLogs.logger.debug('Socket Unsubscribe', {key: key});
        if (eventHandlerIndex >= 0)
            this.socketHandlers = this
                .socketHandlers
                .filter((_, index) => index !== eventHandlerIndex);
        if (this.activatedSocket[key] && this.socketHandlers.every(h => h.key() !== key)) {
            setTimeout(() => { // Make sure no other handler is added
                if (this.activatedSocket[key] && this.socketHandlers.every(h => h.key() !== key)) {
                    this.activatedSocket[key].close()
                    delete this.activatedSocket[key]
                }
            }, 3000)
        }
    }

    public send(key: string, data: Message) {
        const ws = this.activatedSocket[key]
        if (ws) {
            if (ws.readyState === WebSocket.OPEN) {
                this._send(ws, data, key)
            } else {
                this.pending(key).push(data)
            }
        } else {
            this.pending(key).push(data)
            this.connect(key)
        }
    }

    public close(key: string) {
        if (this.activatedSocket[key]) {
            this.activatedSocket[key].close()
            delete this.activatedSocket[key]
        }
    }

    private _send(ws: ReconnectingWebSocket, data: Message, key: string) {
        if (GlobalWebSocket.debug) console.log('socket send', data, key);
        ws.send(data)
        this._lastMessage[key] = data
    }

    private pending(key: string): Message[] {
        if (!this._pending[key]) {
            this._pending[key] = []
        }
        return this._pending[key]
    }

    private pendingClear(key: string): void {
        if (this._pending[key]?.length > 0) {
            this._pending[key] = []
        }
    }

    private connect(url: string): void {
        if (this.isMock) return
        const authorization = getCombineSplitStringsFromCookie('a');
        if (authorization === '') {
            return;
        }
        const ws = new ReconnectingWebSocket(`${url}?token=${authorization}`);
        this.activatedSocket[url] = ws;
        ws.onopen = () => {
            const currentAuthorization = getCombineSplitStringsFromCookie('a');
            if (authorization !== currentAuthorization) {
                ws.close()
                if (this.activatedSocket[url]) {
                    delete this.activatedSocket[url]
                }
                return
            }
            if (!this.activatedSocket[url]) {
                this.activatedSocket[url] = ws;
            }
            const handler = this.socketHandlers.find(handler => handler.key() === url)
            if (handler?.resendWithReconnect() && this._lastMessage[url]) {
                const message = handler.resendMessage() ?? this._lastMessage[url]
                if (message) {
                    this._send(ws, message, url)
                }
            }
            const pendingMessages = this.pending(url)
            if (pendingMessages.length > 0) {
                pendingMessages.forEach(data => {
                    this._send(ws, data, url)
                })
                this.pendingClear(url)
            }
        };
        ws.onmessage = (event: MessageEvent) => {
            try { // JSON format
                const data = JSON.parse(event.data);
                /** TODO: just for test, don't merge into feature branch */
                // if (GlobalWebSocket.debug) console.log('socket message', data, url);
                console.log(`socket message\n${Date.now()}: ${JSON.stringify(data)}`)
                datadogLogs.logger.debug('Socket Message', {data: data});
                /** TODO: end */
                if (this.activatedSocket[url]) {
                    this.socketHandlers.forEach(handler => {
                        if (handler.key() === url) {
                            handler.receive(data)
                        }
                    })
                }
            } catch (e) {
                if (GlobalWebSocket.debug) console.error('socket message', event.data, url);
                datadogLogs.logger.error('Socket Message', {data: event.data}, e instanceof Error ? e : new Error(String(e)));
                this.errorMessage(event.data)
            }
        };
        ws.onerror = (error) => {
            if (GlobalWebSocket.debug) console.error(error);
            datadogLogs.logger.error('socket error', {error: error, url: url}, error instanceof Error ? error : new Error(String(error)));
        };
        ws.onclose = (event) => {
            if (GlobalWebSocket.debug) console.log('socket closed', url);
            if (this.activatedSocket[url]) {
                delete this.activatedSocket[url]
            }
        };
    }

    private errorMessage(message: string) {
        if (message.includes('Token expired')) {
            GlobalWebSocket.clearInstance()
            cleanIdentityInfo();
        }
        if (window.location.hostname.startsWith('localhost') || window.location.hostname.startsWith('dev') || window.location.hostname.startsWith('stage')) {
            GlobalController.getInstance().dispatch(GlobalController.KEY_TOAST_ALERT, {
                severity: 'error',
                show: true,
                message: message
            })
        }
    }
}

export interface IWebSocketHandler<T> {
    close(): void;

    receive(eventArgs: T): void;

    key(): string;

    resendWithReconnect(): boolean;

    resendMessage(): string | undefined;
}