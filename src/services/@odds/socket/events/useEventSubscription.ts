import {GlobalWebSocket} from "@/modules/common/GlobalWebSocket";
import {useEffect, useRef} from "react";
import isEqual from "lodash/isEqual";
import {DataBuffer} from "@/utils/DataBuffer";

interface SubscribeContent {
    matchId?: string
    marketIds: string[]
    eventType?: string
    subscriptionTypes: string[]
}

interface SubscribeContents {
    [key: string]: {
        contents: SubscribeContent[],
        duplicateContents: SubscribeContent[],
    }
}

enum SocketAction {
    ADD = 'ADD',
    DELETE = 'DELETE',
    REPLACE = 'REPLACE'
}

interface SocketHandler {
    contents: SubscribeContent[]
    action: SocketAction
}

const subscribeContentsRef: SubscribeContents = {}

function getSubscribeContents(key: string) {
    if (!subscribeContentsRef[key]) {
        subscribeContentsRef[key] = {contents: [], duplicateContents: []}
    }
    return subscribeContentsRef[key]
}

function differenceSubscribe(minusSubscribeContents: SubscribeContent[], minuendSubscribeContent: SubscribeContent[]): SubscribeContent[] {
    const result: SubscribeContent[] = [];
    minusSubscribeContents.forEach(minusContent => {
        const match = minuendSubscribeContent.find(minuendContent => isSameSubscribe(minuendContent, minusContent));
        if (!match) {
            result.push(minusContent);
        } else {
            const filteredMarketIds = minusContent.marketIds.filter(marketId => !match.marketIds.includes(marketId));
            const filteredSubscriptionTypes = minusContent.subscriptionTypes.filter(type => !match.subscriptionTypes.includes(type));
            if (filteredMarketIds.length > 0 || filteredSubscriptionTypes.length > 0) {
                const mod = {
                    ...minusContent,
                    ...(filteredMarketIds.length > 0 ? {marketIds: filteredMarketIds} : undefined),
                    ...(filteredSubscriptionTypes.length > 0 ? {subscriptionTypes: filteredSubscriptionTypes} : undefined)
                }
                result.push(mod);
            }
        }
    });
    return result;
}

function findCommonSubscribe(targetSubscribeContents: SubscribeContent[], originalSubscribeContents: SubscribeContent[]): SubscribeContent[] {
    const result: SubscribeContent[] = [];
    targetSubscribeContents.forEach(targetContent => {
        const match = originalSubscribeContents.find(originalContent => isSameSubscribe(originalContent, targetContent));
        if (match) {
            const commonMarketIds = targetContent.marketIds.filter(marketId => match.marketIds.includes(marketId));
            const commonSubscriptionTypes = targetContent.subscriptionTypes.filter(type => match.subscriptionTypes.includes(type));
            if (commonSubscriptionTypes.length > 0) {
                if (targetContent.marketIds.length === 0) {
                    result.push({
                        ...targetContent,
                        subscriptionTypes: commonSubscriptionTypes
                    });
                } else if (commonMarketIds.length > 0) {
                    result.push({
                        ...targetContent,
                        ...(commonMarketIds.length > 0 ? {marketIds: commonMarketIds} : undefined),
                        ...(commonSubscriptionTypes.length > 0 ? {subscriptionTypes: commonSubscriptionTypes} : undefined)
                    });
                }
            }
        }
    });
    return result;
}

function mergeSubscribe(plusSubscribeIds: SubscribeContent[], summandSubscribeIds: SubscribeContent[]): SubscribeContent[] {
    const result: SubscribeContent[] = [...summandSubscribeIds];

    plusSubscribeIds.forEach(plusId => {
        const match = result.find(resultId => isSameSubscribe(resultId, plusId));
        if (!match) {
            result.push(plusId);
        } else {
            const mergedMarketIds = new Set([...match.marketIds, ...plusId.marketIds]);
            const mergedSubscriptionTypes = new Set([...match.subscriptionTypes, ...plusId.subscriptionTypes]);
            match.marketIds = Array.from(mergedMarketIds);
            match.subscriptionTypes = Array.from(mergedSubscriptionTypes);
        }
    });

    return result;
}

function isSameSubscribe(sub1: SubscribeContent, sub2: SubscribeContent): boolean {
    const {matchId: matchId1, eventType: eventType1} = sub1;
    const {matchId: matchId2, eventType: eventType2} = sub2;
    if (matchId1 !== matchId2) return false;
    if (!eventType1 || !eventType2) {
        return true;
    }
    return eventType1 === eventType2;
}

function mergeSubscribeContent(target: SubscribeContent, source: SubscribeContent): SubscribeContent {
    return {
        ...target,
        marketIds: Array.from(new Set([...target.marketIds, ...source.marketIds])),
        subscriptionTypes: Array.from(new Set([...target.subscriptionTypes, ...source.subscriptionTypes])),
        eventType: target.eventType ?? source.eventType
    };
}

function removeItemsFromContent(target: SubscribeContent, itemsToRemove: SubscribeContent): SubscribeContent {
    if (itemsToRemove.marketIds.length > 0) {
        if (itemsToRemove.marketIds.some(id => target.marketIds.includes(id))) {
            const marketIds = target.marketIds.filter(id => !itemsToRemove.marketIds.includes(id));
            const subscriptionTypes = marketIds.length === 0 ? target.subscriptionTypes.filter(type => type !== 'ODDS') : target.subscriptionTypes;
            return {
                ...target,
                marketIds: marketIds,
                subscriptionTypes: subscriptionTypes
            };
        } else {
            return target;
        }
    } else if (itemsToRemove.subscriptionTypes.some(type => target.subscriptionTypes.includes(type))) {
        return {
            ...target,
            subscriptionTypes: target.subscriptionTypes.filter(type => !itemsToRemove.subscriptionTypes.includes(type)),
        };
    } else {
        return target;
    }
}

const _dataBuffer = new DataBuffer<SocketHandler>(
    (newData, buffer) => {
        const result = [...buffer];

        // 找到對應 action 的 buffer index
        let targetActionIndex = result.findIndex(item => item.action === newData.action);
        const oppositeActionIndex = result.findIndex(item => item.action !== newData.action);

        for (let newContent of newData.contents) {
            let processed = false;

            // 先檢查相反 action 的內容
            if (oppositeActionIndex !== -1) {
                const oppositeAction = result[oppositeActionIndex].contents;
                const matchingContentIndex = oppositeAction.findIndex(content =>
                    isSameSubscribe(content, newContent)
                );

                if (matchingContentIndex !== -1) {
                    const oppositeContent = oppositeAction[matchingContentIndex]
                    const updatedContent = removeItemsFromContent(oppositeContent, newContent);
                    const leftContent = differenceSubscribe([newContent], [oppositeContent]);
                    if (!isEqual(updatedContent, oppositeContent)) {
                        if (updatedContent.subscriptionTypes.length === 0) {
                            // 如果沒有剩餘內容，移除整個項目
                            oppositeAction.splice(matchingContentIndex, 1);
                        } else {
                            // 更新移除後的內容
                            oppositeAction[matchingContentIndex] = updatedContent;
                        }
                        if (leftContent.length > 0) {
                            newContent = leftContent[0];
                        } else {
                            processed = true;
                        }
                    }
                }
            }

            // 如果尚未處理，檢查相同 action 的內容
            if (!processed) {
                if (targetActionIndex === -1) {
                    // 如果不存在對應的 action，創建新的
                    result.push({
                        action: newData.action,
                        contents: [{...newContent}]
                    });
                    targetActionIndex = result.findIndex(item => item.action === newData.action);
                } else {
                    const targetAction = result[targetActionIndex].contents;
                    const matchingContentIndex = targetAction.findIndex(content =>
                        isSameSubscribe(content, newContent)
                    );

                    if (matchingContentIndex !== -1) {
                        // 合併相同的內容
                        targetAction[matchingContentIndex] = mergeSubscribeContent(targetAction[matchingContentIndex], newContent);
                    } else {
                        // 添加新的內容
                        targetAction.push({...newContent});
                    }
                }
            }
        }
        // 清理空的 action
        return result.filter(item => item.contents.length > 0);
    },
    () => {
    },
    200
)

function getDataBuffer(sendToSocket: Function) {
    _dataBuffer.emitCallback = (socketHandlers) => {
        sendToSocket(socketHandlers)
    }
    return _dataBuffer
}

const useGlobalEventSubscribe = (key: string) => {
    const ref = useRef(getSubscribeContents(key));
    const dataBuffer = useRef<DataBuffer<SocketHandler>>(getDataBuffer(_sendToSocket));

    const subscribe = (contents: SubscribeContent[], action: SocketAction) => {
        const {contents: subscribeContents, duplicateContents} = {...ref.current};
        // console.log('subscribe', JSON.stringify(contents), action)
        if (action === SocketAction.ADD) {
            const currentContents: SubscribeContent[] = JSON.parse(JSON.stringify(subscribeContents));
            const modifiedContents: SubscribeContent[] = [];
            contents.forEach(content => {
                const match = currentContents.find(currentContent => isSameSubscribe(currentContent, content));
                if (!match) {
                    currentContents.push(content);
                    modifiedContents.push(content);
                } else {
                    const diff = differenceSubscribe([content], [match]);
                    const common = findCommonSubscribe([content], [match]);
                    if (diff.length > 0) {
                        const modifiedContent = diff[0];
                        match.marketIds.push(...modifiedContent.marketIds);
                        match.subscriptionTypes = Array.from(new Set([...match.subscriptionTypes, ...modifiedContent.subscriptionTypes]));
                        match.eventType = match.eventType ?? content.eventType
                        modifiedContents.push(modifiedContent);
                    }
                    if (common.length > 0) {
                        const commonContent = common[0];
                        const duplicateMatch = duplicateContents.find(dupContent => isSameSubscribe(dupContent, content));
                        if (!duplicateMatch) {
                            duplicateContents.push({
                                ...commonContent,
                                eventType: content.eventType,
                            });
                        } else {
                            duplicateMatch.eventType = duplicateMatch.eventType || content.eventType
                            duplicateMatch.marketIds.push(...commonContent.marketIds);
                            duplicateMatch.subscriptionTypes.push(...content.subscriptionTypes);
                        }
                    }
                }
            });
            sendToSocket(currentContents, modifiedContents, action);
        } else if (action === SocketAction.DELETE) {
            const currentContents: SubscribeContent[] = JSON.parse(JSON.stringify(subscribeContents));
            const modifiedContents: SubscribeContent[] = [];
            contents.forEach(content => {
                const match = currentContents.find(updatedContent => isSameSubscribe(updatedContent, content));
                if (match) {
                    const common = findCommonSubscribe([content], [match]);
                    if (common.length > 0) {
                        const commonContent = common[0];
                        const duplicateMatch = duplicateContents.find(dupContent => isSameSubscribe(dupContent, content));
                        if (duplicateMatch) {
                            const shouldRemoveContents = findCommonSubscribe([commonContent], [duplicateMatch]);
                            if (shouldRemoveContents.length > 0) {
                                const shouldRemoveContent = shouldRemoveContents[0];
                                shouldRemoveContent.marketIds.forEach(marketId => {
                                    const index = duplicateMatch.marketIds.indexOf(marketId);
                                    if (index !== -1) {
                                        duplicateMatch.marketIds.splice(index, 1);
                                        const commonIndex = commonContent.marketIds.indexOf(marketId)
                                        if (commonIndex !== -1) {
                                            commonContent.marketIds.splice(commonIndex, 1);
                                        }
                                    }
                                });
                                shouldRemoveContent.subscriptionTypes.forEach(type => {
                                    const index = duplicateMatch.subscriptionTypes.indexOf(type);
                                    if (index !== -1) {
                                        duplicateMatch.subscriptionTypes.splice(index, 1);
                                        const commonIndex = commonContent.subscriptionTypes.indexOf(type)
                                        if (commonIndex !== -1) {
                                            commonContent.subscriptionTypes.splice(commonIndex, 1);
                                        }
                                    }
                                });
                                if (duplicateMatch.marketIds.length === 0 && duplicateMatch.subscriptionTypes.length === 0) {
                                    const dupIndex = duplicateContents.indexOf(duplicateMatch);
                                    duplicateContents.splice(dupIndex, 1);
                                }
                            }
                        }
                        if (commonContent.subscriptionTypes.length > 0) {
                            const modified = findCommonSubscribe([commonContent], [match]);
                            if (modified.length > 0) {
                                const modifiedContent = modified[0];
                                match.marketIds = match.marketIds.filter(marketId => !modifiedContent.marketIds.includes(marketId));
                                match.subscriptionTypes = match.subscriptionTypes.filter(type => {
                                    if (type === 'ODDS' && match.marketIds.length > 0) {
                                        return true
                                    }
                                    return !modifiedContent.subscriptionTypes.includes(type)
                                });
                                if (match.marketIds.length === 0) {
                                    match.eventType = undefined;
                                }
                                if (match.subscriptionTypes.length === 0) {
                                    const index = currentContents.indexOf(match);
                                    currentContents.splice(index, 1);
                                }
                                modifiedContents.push(modifiedContent);
                            }
                        }
                    }
                }
            });
            sendToSocket(currentContents, modifiedContents, action);
        }
    }

    const unsubscribe = (ids: SubscribeContent[]) => {
        subscribe(ids, SocketAction.DELETE);
    }

    const sendToSocket = (updatedIds: SubscribeContent[], modifiedIds: SubscribeContent[], action: SocketAction) => {
        if (!isEqual(ref.current.contents, updatedIds)) {
            ref.current.contents = updatedIds;
            dataBuffer.current.addData({contents: modifiedIds, action});
        }
    }

    function _sendToSocket(handlers: SocketHandler[]) {
        if (handlers.length > 0) {
            const subscriptions = handlers.flatMap(handler => {
                return handler.contents.map(subscribeId => ({
                    ...(subscribeId.matchId ? {matchId: subscribeId.matchId} : undefined),
                    ...(subscribeId.marketIds.length > 0 ? {marketIds: subscribeId.marketIds} : undefined),
                    ...(subscribeId.eventType ? {eventType: subscribeId.eventType} : undefined),
                    subscriptionTypes: subscribeId.subscriptionTypes,
                    action: handler.action
                }));
            });

            const value = {
                subscriptions: subscriptions,
            };

            if (GlobalWebSocket.debug)
                console.log('_sendToSocket', value);
            GlobalWebSocket.getInstance().send(key, JSON.stringify(value));
        } else {
            if (GlobalWebSocket.debug) console.log('_sendToSocket close');
            GlobalWebSocket.getInstance().close(key);
        }
    }

    const contents = () => ref.current.contents;

    return {subscribe, unsubscribe, contents};
};

export interface SubscriptionProps<T> {
    url: string
    receive: (t: T) => void
}

const useEventSubscription = <T>({url, receive}: SubscriptionProps<T>) => {
    const globalWebsocket = GlobalWebSocket.getInstance();
    const subscribeContents = useRef<SubscribeContent[]>([]);
    const {subscribe, unsubscribe, contents} = useGlobalEventSubscribe(url);

    const add = (matchIds: string | string[], subscriptionTypes: string, marketIds?: string | string[], eventType?: string) => {
        const matchIdArray = Array.isArray(matchIds) ? matchIds : [matchIds];
        const marketIdArray = marketIds ? (Array.isArray(marketIds) ? marketIds : [marketIds]) : [];
        const subscriptionTypeArray = [subscriptionTypes];

        const newSubscribeContents: SubscribeContent[] = [];
        matchIdArray.forEach(matchId => {
            newSubscribeContents.push({
                matchId,
                marketIds: [...marketIdArray],
                subscriptionTypes: subscriptionTypeArray,
                ...(eventType ? {eventType} : undefined),
            });
        });
        if (newSubscribeContents.length === 0) {
            newSubscribeContents.push({
                marketIds: marketIdArray,
                subscriptionTypes: subscriptionTypeArray,
            });
        }
        subscribe(newSubscribeContents, SocketAction.ADD)
        subscribeContents.current = contents()
    }

    const remove = (matchIds: string | string[], subscriptionTypes: string, marketIds?: string | string[], eventType?: string) => {
        const matchIdArray = Array.isArray(matchIds) ? matchIds : [matchIds];
        const marketIdArray = marketIds ? (Array.isArray(marketIds) ? marketIds : [marketIds]) : [];
        const subscriptionTypeArray = [subscriptionTypes];
        if (matchIdArray.length === 0 && marketIdArray.length === 0 && subscriptionTypeArray.length === 0) {
            return;
        }

        const removeSubscribeContents: SubscribeContent[] = [];
        matchIdArray.forEach(matchId => {
            removeSubscribeContents.push({
                matchId,
                marketIds: [...marketIdArray],
                subscriptionTypes: subscriptionTypeArray,
                ...(eventType ? {eventType} : undefined),
            });
        });
        if (removeSubscribeContents.length === 0) {
            removeSubscribeContents.push({
                marketIds: marketIdArray,
                subscriptionTypes: subscriptionTypeArray,
            });
        }

        subscribe(removeSubscribeContents, SocketAction.DELETE);
        subscribeContents.current = contents()
    }

    useEffect(() => {
        if (GlobalWebSocket.debug)
            console.log('subscribeContents', subscribeContents, url);
    }, [subscribeContents.current]);

    useEffect(() => {
        const socketHandler = {
            key: () => url,
            receive: receive,
            close: () => {
                unsubscribe(subscribeContents.current);
            },
            resendWithReconnect: () => true,
            resendMessage: () => {
                const subscriptions = contents().map(content => ({
                    ...content,
                    action: SocketAction.ADD
                }))
                return JSON.stringify({
                    subscriptions: subscriptions
                })
            }
        }
        globalWebsocket.subscribe(socketHandler);
        return () => {
            globalWebsocket.unsubscribe(socketHandler);
        }
    }, []);

    return {
        add,
        remove,
        subscribeContents: subscribeContents
    }
}

export default useEventSubscription