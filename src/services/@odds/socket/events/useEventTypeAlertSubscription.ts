import {SocketEvent} from "@/modules/common/GlobalWebSocket";
import {useRef} from "react";
import {ISubscription} from "@/services/@odds/socket/useCommonSubscription";
import {EventSubscriptionModel} from "@/services/@odds/socket/events/EventSubscriptionModel";
import {DataBuffer} from "@/utils/DataBuffer";
import useEventSubscription from "@/services/@odds/socket/events/useEventSubscription";

interface MatchSubscription extends ISubscription<SubscriptionEventTypeAlertModel[]>{}
export interface SubscriptionEventTypeAlertModel {
    eventId: string
    sportType: string
    eventType: string
}

const useEventTypeAlertSubscription = () => {
    const eventTypeSubscription = useRef<MatchSubscription>()
    const dataBuffer = useRef<DataBuffer<SubscriptionEventTypeAlertModel>>(new DataBuffer<SubscriptionEventTypeAlertModel>(
        (newData, buffer) => {
            const eventTypeMap = new Map(buffer.map((data) => [data.sportType, data]))
            if (eventTypeMap.get(newData.sportType)) {
                return buffer.map((data) => data.sportType === newData.sportType ? newData : data)
            }
            return [...buffer, newData]
        },
        (mergedData) => {
            eventTypeSubscription.current?.onSubscript(mergedData)
        },
        1000
    ))
    const {add, remove} = useEventSubscription<EventSubscriptionModel>({
        url: SocketEvent.DATA_SUBSCRIPTION,
        receive: ({eventTypeAlert}: EventSubscriptionModel) => {
            if (eventTypeAlert && eventTypeSubscription.current) {
                dataBuffer.current.addData(eventTypeAlert)
            }
        }
    })
    return {
        add: () => {
            add([], 'EVENT_TYPE_ALERT')
        },
        remove: () => {
            remove([], 'EVENT_TYPE_ALERT')
        },
        eventTypeSubscription,
    }
}

export default useEventTypeAlertSubscription