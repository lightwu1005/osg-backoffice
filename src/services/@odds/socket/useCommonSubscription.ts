import {GlobalWebSocket} from "@/modules/common/GlobalWebSocket";
import {useEffect, useRef} from "react";
import isEqual from "lodash/isEqual";
import {DataBuffer} from "@/utils/DataBuffer";

export interface ISubscription<T> {
    onSubscript: (t: T) => void
}

interface SubscribeIds {
    [key: string]: {
        ids: string[],
        duplicateIds: string[]
        args: SubscribeArgs
    }
}

interface SubscribeArgs {
    [key: string]: string[]
}

interface SocketHandler {
    ids: string[]
    args: SubscribeArgs
}

const subscribeIdsRef: SubscribeIds = {}

function getSubscribeIds(key: string) {
    if (!subscribeIdsRef[key]) {
        subscribeIdsRef[key] = {ids: [], duplicateIds: [], args: {}}
    }
    return subscribeIdsRef[key]
}


const _dataBuffer = new DataBuffer<SocketHandler>(
    (newData, buffer) => {
        return [newData]
    },
    () => {},
    300
)

function getDataBuffer(sendToSocket: Function) {
    _dataBuffer.emitCallback = (socketHandler) => {
        sendToSocket(socketHandler)
    }
    return _dataBuffer
}

const useGlobalSubscribeIds = (key: string) => {
    const ref = useRef(getSubscribeIds(key));
    const dataBuffer = useRef<DataBuffer<SocketHandler>>(getDataBuffer(_sendToSocket));
    const subscribe = (ids: string | string[], args?: SubscribeArgs) => {
        const {ids: subscribeIds, duplicateIds, args: subscribeArgs} = {...ref.current};
        const idArray = Array.isArray(ids) ? ids : [ids];

        const newIds = idArray.filter(id => {
            if (subscribeIds.includes(id)) {
                duplicateIds.push(id);
                if (GlobalWebSocket.debug) console.log('duplicateIds', duplicateIds, key);
                return false;
            }
            return true;
        });
        const updatedMatchIds = [...subscribeIds, ...newIds];
        const updatedSubscribeArgs: SubscribeArgs = {...subscribeArgs};
        if (args) {
            for (const key in args) {
                if (!updatedSubscribeArgs[key]) {
                    updatedSubscribeArgs[key] = [...args[key]];
                } else {
                    updatedSubscribeArgs[key] = Array.from(new Set([...updatedSubscribeArgs[key], ...args[key]]));
                }
            }
        }
        sendToSocket(updatedMatchIds, updatedSubscribeArgs)
    }

    const unsubscribe = (ids: string | string[]) => {
        const idArray = Array.isArray(ids) ? ids : [ids];
        const duplicateIds = [...ref.current.duplicateIds];
        const idArrayWithoutDuplicate = idArray.filter(id => !duplicateIds.includes(id));
        if (!isEqual(idArray, idArrayWithoutDuplicate)) {
            duplicateIds.forEach(id => {
                ref.current.duplicateIds = duplicateIds.filter(id => !idArray.includes(id));
            });
        }
        const updatedMatchIds = ref.current.ids.filter(subscriber => !idArrayWithoutDuplicate.includes(subscriber));
        sendToSocket(updatedMatchIds, updatedMatchIds.length === 0 ? {} : ref.current.args)
    }

    const sendToSocket = (updatedMatchIds: string[], updatedArgs: SubscribeArgs) => {
        if (!isEqual(ref.current.ids, updatedMatchIds) || !isEqual(ref.current.args, updatedArgs)) {
            ref.current.ids = updatedMatchIds;
            ref.current.args = updatedArgs;
            dataBuffer.current.addData({ids: updatedMatchIds, args: updatedArgs});
        }
    }

    function _sendToSocket() {
        if (ref.current.ids.length > 0) {
            const value = {
                matchIds: ref.current.ids,
                ...(Object.entries(ref.current.args).length > 0 && {...ref.current.args})
            }
            GlobalWebSocket.getInstance().send(key, JSON.stringify(value));
        } else {
            GlobalWebSocket.getInstance().close(key);
        }
    }

    const check = () => ref.current.ids;

    return {subscribe, unsubscribe, check};
};

export interface SubscriptionProps<T> {
    url: string
    receive: (t: T) => void
}

const useSubscription = <T>({url, receive}: SubscriptionProps<T>) => {
    const globalWebsocket = GlobalWebSocket.getInstance();
    const subscribeIds = useRef<string[]>([]);
    const {subscribe, unsubscribe} = useGlobalSubscribeIds(url);

    const add = (ids: string | string[], args?: SubscribeArgs) => {
        const idArray = Array.isArray(ids) ? ids : [ids]
        const currentIds = subscribeIds.current;
        const newIds = idArray.filter(id => !currentIds.includes(id))
        subscribe(newIds, args)
        subscribeIds.current = [...currentIds, ...newIds]
    }

    const remove = (ids: string | string[]) => {
        const idArray = Array.isArray(ids) ? ids : [ids]
        unsubscribe(idArray)
        subscribeIds.current = subscribeIds.current.filter(subscriber => !idArray.includes(subscriber))
    }

    useEffect(() => {
        if (GlobalWebSocket.debug) console.log('subscribeIds', subscribeIds, url);
    }, [subscribeIds.current]);

    useEffect(() => {
        const socketHandler = {
            key: () => url,
            receive: receive,
            close: () => {
                unsubscribe(subscribeIds.current);
            },
            resendWithReconnect: () => true,
            resendMessage: () => undefined
        }
        globalWebsocket.subscribe(socketHandler);
        return () => {
            globalWebsocket.unsubscribe(socketHandler);
        }
    }, []);

    return {
        add,
        remove,
        subscribeIds
    }
}

export default useSubscription