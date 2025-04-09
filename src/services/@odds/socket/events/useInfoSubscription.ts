import {SocketEvent} from "@/modules/common/GlobalWebSocket";
import {useRef} from "react";
import {BetSlipsModel} from "@/services/@core/module/ResponseDataModels";
import {ISubscription} from "@/services/@odds/socket/useCommonSubscription";
import {EventSubscriptionModel} from "@/services/@odds/socket/events/EventSubscriptionModel";
import {DataBuffer} from "@/utils/DataBuffer";
import {updateBetSlips} from "@/services/@event/useCase";
import useEventSubscription from "@/services/@odds/socket/events/useEventSubscription";

interface MatchSubscription extends ISubscription<SubscriptionInfoModel[]> {
}

export interface SubscriptionInfoModel {
    eventId: string;
    betSlips?: BetSlipsModel | null;
    dangerBall?: string | null;
    status?: string | null;
    runningTime?: string | null;
    runningReceiveTime?: number | null;
    isClockRunning?: boolean | null;
}

const useIndoSubscription = () => {
    const infoSubscription = useRef<MatchSubscription>()
    const dataBuffer = useRef<DataBuffer<SubscriptionInfoModel>>(new DataBuffer<SubscriptionInfoModel>(
        (newData, buffer) => {

            const hasTarget = buffer.some(data => data.eventId === newData.eventId);
            return hasTarget ? buffer.map((data) => {
                const isTarget = data.eventId === newData.eventId
                return isTarget ? {
                    ...data,
                    ...(newData.dangerBall ? {dangerBall: newData.dangerBall} : undefined),
                    ...(newData.status ? {status: newData.status} : undefined),
                    ...(newData.runningTime ? {runningTime: newData.runningTime} : undefined),
                    ...(newData.betSlips ? {
                        betSlips: updateBetSlips(newData.betSlips, data.betSlips)
                    } : undefined)
                } : data
            }) : [...buffer, newData]
        },
        (mergedData) => {
            infoSubscription.current?.onSubscript(mergedData)
        },
        1000
    ))
    const {add, remove, subscribeContents} = useEventSubscription<EventSubscriptionModel>({
        url: SocketEvent.DATA_SUBSCRIPTION,
        receive: ({info}: EventSubscriptionModel) => {
            if (info && infoSubscription.current && subscribeContents.current.some(content => info.eventId === content.matchId)) {
                dataBuffer.current.addData(info)
            }
        }
    })
    return {
        add: (matchIds: string | string[]) => {
            if (Array.from(matchIds).length === 0) return
            add(matchIds, 'INFO')
        },
        remove: (matchIds: string | string[]) => {
            if (Array.from(matchIds).length === 0) return
            remove(matchIds, 'INFO')
        },
        infoSubscription
    }
}

export default useIndoSubscription