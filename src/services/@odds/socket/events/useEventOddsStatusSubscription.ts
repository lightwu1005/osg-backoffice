import {SocketEvent} from "@/modules/common/GlobalWebSocket";
import {useRef} from "react";
import {ISubscription} from "@/services/@odds/socket/useCommonSubscription";
import {EventSubscriptionModel} from "@/services/@odds/socket/events/EventSubscriptionModel";
import {DataBuffer} from "@/utils/DataBuffer";
import useEventSubscription from "@/services/@odds/socket/events/useEventSubscription";

interface MatchSubscription extends ISubscription<SubscriptionEventOddsStatusModel[]>{}
export interface SubscriptionEventOddsStatusModel {
    eventId: string
    channelId: string
    eventSuspendedStatus: string
    markets?: SubscriptionMarketModel[] | null
}
export interface SubscriptionMarketModel {
    marketId: string
    marketSuspendedStatus: string
    provider: string
}

const useStatusSubscription = () => {
    const statusSubscription = useRef<MatchSubscription>()
    const dataBuffer = useRef<DataBuffer<SubscriptionEventOddsStatusModel>>(new DataBuffer<SubscriptionEventOddsStatusModel>(
        (newData, buffer) => {
            const statusMap = new Map(buffer.map((data) => [data.eventId, data]))
            if (statusMap.get(newData.eventId)) {
                return buffer.map((data) => data.eventId === newData.eventId ? newData : data)
            }
            return [...buffer, newData]
        },
        (mergedData) => {
            statusSubscription.current?.onSubscript(mergedData)
        },
        1000
    ))
    const {add, remove, subscribeContents} = useEventSubscription<EventSubscriptionModel>({
        url: SocketEvent.DATA_SUBSCRIPTION,
        receive: ({eventOddsStatus}: EventSubscriptionModel) => {
            if (eventOddsStatus && statusSubscription.current && subscribeContents.current.some(content => eventOddsStatus.eventId === content.matchId)) {
                dataBuffer.current.addData(eventOddsStatus)
            }
        }
    })
    return {
        add: (matchIds: string | string[]) => {
            if (Array.from(matchIds).length === 0) return
            add(matchIds, 'EVENT_ODDS_STATUS')
        },
        remove: (matchIds: string | string[]) => {
            if (Array.from(matchIds).length === 0) return
            remove(matchIds, 'EVENT_ODDS_STATUS')
        },
        statusSubscription,
    }
}

export default useStatusSubscription