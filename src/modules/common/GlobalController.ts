export class GlobalController {
    static KEY_TOAST_ALERT = 'ToastAlert'
    static KEY_UNREAD_MESSAGE = 'UnreadMessage'
    static KEY_NOTIFICATION_SNACKBAR = 'NotificationSnackbar'
    static KEY_API_ERROR = 'ApiError'

    private static instance: GlobalController;
    private _eventHandlers: IEventHandler<any, any>[] = [];

    private constructor() {
    }

    public static getInstance(): GlobalController {
        if (!GlobalController.instance) {
            GlobalController.instance = new GlobalController();
        }
        return GlobalController.instance;
    }

    public subscribe(eventHandler: IEventHandler<any, any>): void {
        const eventHandlerIndex = this._eventHandlers.indexOf(eventHandler);
        if (eventHandlerIndex < 0)
            this._eventHandlers.push(eventHandler);
    }

    public unsubscribe(eventHandler: IEventHandler<any, any>): void {
        const eventHandlerIndex = this._eventHandlers.indexOf(eventHandler);
        if (eventHandlerIndex >= 0)
            this._eventHandlers = this
                ._eventHandlers
                .filter((_, index) => index !== eventHandlerIndex);
    }

    public dispatch(key: any, args: any): void {
        this._eventHandlers.forEach(eventHandler => {
            if (this._eventHandlers.indexOf(eventHandler) >= 0)
                if (key === eventHandler.key()) {
                    eventHandler.receive(args);
                }
        });
    }
}

export interface IEventHandler<Key, T> {
    receive(eventArgs: T): void;

    key(): Key;
}