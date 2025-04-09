import React, { createContext, useContext, useRef, useState, ReactNode } from 'react';
import { SocketEvent } from "@/modules/common/GlobalWebSocket";
import { BetModel } from "@/services/@core/module/ResponseDataModels";
import { EventSubscriptionModel } from "@/services/@odds/socket/events/EventSubscriptionModel";
import { DataBuffer } from "@/utils/DataBuffer";
import { hasValidNumber } from "@/utils/tools";
import { updateBetSlips } from "@/services/@event/useCase";
import useEventSubscription from "@/services/@odds/socket/events/useEventSubscription";

export interface SubscriptionOddsModel {
    channelId: string;
    eventId: string;
    marketId: string;
    baseLine?: string;
    eventType?: string;
    status?: string;
    bets?: SubscriptionBetModel[];
    homeName?: string;
    awayName?: string;
}

export interface SubscriptionBetModel extends Omit<BetModel, "acceptedAmount" | "acceptedNumber"> {}

interface OddsSubscriptionContextType {
    add: (matchIds: string | string[], marketIds: string | string[], eventType: string) => void;
    remove: (matchIds: string | string[], marketIds: string | string[], eventType: string) => void;
    odds: SubscriptionOddsModel[];
}

const OddsSubscriptionContext = createContext<OddsSubscriptionContextType | undefined>(undefined);

export const OddsSubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [odds, setOdds] = useState<SubscriptionOddsModel[]>([]);
    const { add, remove, subscribeContents } = useEventSubscription<EventSubscriptionModel>({
        url: SocketEvent.DATA_SUBSCRIPTION,
        receive: ({ odds }: EventSubscriptionModel) => {
            if (odds) {
                const oddsArray = Array.isArray(odds) ? odds : [odds];
                oddsArray.forEach(data => {
                    const marketIds = subscribeContents.current.find(content => content.matchId === data.eventId)?.marketIds;
                    if (marketIds?.includes(data.marketId)) {
                        dataBuffer.current.addData(data);
                    }
                });
            }
        },
    });

    const updateBets = (newBets: SubscriptionBetModel[], buffer?: SubscriptionBetModel[]): SubscriptionBetModel[] => {
        if (!buffer) return [...newBets];

        const newBetsMap = new Map(newBets.map(bet => [bet.betId, bet]));
        const updatedBuffer = buffer.map(bet => {
            if (newBetsMap.has(bet.betId)) {
                const targetBet = newBetsMap.get(bet.betId)!;
                newBetsMap.delete(bet.betId);
                return {
                    ...bet,
                    ...(targetBet.betName ? { betName: targetBet.betName } : undefined),
                    ...(hasValidNumber(targetBet.price) ? { price: targetBet.price } : undefined),
                    ...(targetBet.updateTime ? { updateTime: targetBet.updateTime } : undefined),
                    ...(hasValidNumber(targetBet.originalPrice) ? { originalPrice: targetBet.originalPrice } : undefined),
                    ...(hasValidNumber(targetBet.adjustedNumber) ? { adjustedNumber: targetBet.adjustedNumber } : undefined),
                    ...(targetBet.betSlips ? { betSlips: updateBetSlips(targetBet.betSlips, bet.betSlips) } : undefined),
                    ...(targetBet.betStatus ? { betStatus: targetBet.betStatus } : undefined),
                };
            }
            return bet;
        });
        return [...updatedBuffer, ...Array.from(newBetsMap.values())];
    };

    const merge = (newData: SubscriptionOddsModel, buffer: SubscriptionOddsModel[]) => {
        const isMatchingBet = (bet: SubscriptionBetModel, newBets?: SubscriptionBetModel[]) =>
            newBets?.map(newBet => newBet.betId)?.includes(bet.betId) || false;

        const isNewStatus = Boolean(newData.status) && newData.baseLine === null && !newData.bets?.length;
        const hasTarget = buffer.some(data =>
            data.eventId === newData.eventId &&
            data.marketId === newData.marketId &&
            data.channelId === newData.channelId &&
            (data.bets?.some(bet => isMatchingBet(bet, newData.bets)) || data.baseLine === newData.baseLine)
        );

        return hasTarget
            ? buffer.map(data => {
                const isTarget =
                    data.eventId === newData.eventId &&
                    data.marketId === newData.marketId &&
                    data.channelId === newData.channelId &&
                    (data.bets?.some(bet => isMatchingBet(bet, newData.bets)) || data.baseLine === newData.baseLine);
                return isTarget
                    ? {
                        ...data,
                        ...(newData.bets ? { bets: updateBets(newData.bets, data.bets) } : undefined),
                        ...(newData.eventType ? { eventType: newData.eventType } : undefined),
                        ...(newData.status ? { status: newData.status } : undefined),
                        ...(newData.homeName ? { homeName: newData.homeName } : undefined),
                        ...(newData.awayName ? { awayName: newData.awayName } : undefined),
                    }
                    : data;
            })
            : [
                ...(isNewStatus
                    ? buffer.map(data => {
                        if (data.marketId === newData.marketId && data.eventId === newData.eventId) {
                            return { ...data, status: newData.status };
                        }
                        return data;
                    })
                    : buffer),
                newData,
            ];
    }

    const dataBuffer = useRef<DataBuffer<SubscriptionOddsModel>>(
        new DataBuffer<SubscriptionOddsModel>(
            merge,
            mergedData => {
                setOdds(prevOdds => {
                    const eventIds = subscribeContents.current.map(content => content.matchId);
                    let newOdds = [...prevOdds.filter(odd => eventIds.includes(odd.eventId))];
                    mergedData.forEach(data => {
                        newOdds = merge(data, newOdds);
                    })
                    return newOdds
                });
            },
            200
        )
    );

    const contextValue: OddsSubscriptionContextType = {
        add: (matchIds, marketIds, eventType) => {
            if (Array.isArray(matchIds) && matchIds.length === 0 || Array.isArray(marketIds) && marketIds.length === 0) return;
            add(matchIds, 'ODDS', marketIds, eventType);
        },
        remove: (matchIds, marketIds, eventType) => {
            if (Array.isArray(matchIds) && matchIds.length === 0 || Array.isArray(marketIds) && marketIds.length === 0) return;
            remove(matchIds, 'ODDS', marketIds, eventType);
        },
        odds,
    };

    return (
        <OddsSubscriptionContext.Provider value={contextValue}>
            {children}
        </OddsSubscriptionContext.Provider>
    );
};

export const useOddsSubscription = () => {
    const context = useContext(OddsSubscriptionContext);
    if (!context) {
        throw new Error('useOddsSubscription must be used within an OddsSubscriptionProvider');
    }
    return context;
};

export default useOddsSubscription;