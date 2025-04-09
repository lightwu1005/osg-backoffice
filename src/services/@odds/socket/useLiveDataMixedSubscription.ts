import {SocketEvent} from "@/modules/common/GlobalWebSocket";
import {useRef} from "react";
import useSubscription, {ISubscription} from "@/services/@odds/socket/useCommonSubscription";
import {
    LineupsModel,
    PlayLogSummaryModel
} from "@/services/@core/module/ResponseDataModels";

interface LiveDataSubscription extends ISubscription<LiveDataModel>{}

export interface TimelineLogModel {
    eventId: string
    eventUtc: number
    systemLogTime: number
    team: string
    periodName: string
    periodTime: number
    type: string
    dangerState?: string | null
    description: string
    isConfirmed: 'UNCONFIRMED' | 'CONFIRMED' | 'DELETED'
}

export interface LineUpModel extends LineupsModel {
    eventId: string
    periodType: string
}

export interface SummaryModel extends PlayLogSummaryModel {
    eventId: string
    isClockRunning: boolean
    runningReceiveTime: number
}

export interface LiveDataModel {
    dataType: 'TIMELINE' | 'LINEUP' | 'SUMMARY'
    data: TimelineLogModel | LineUpModel | SummaryModel
}

const useLiveDataSubscription = () => {
    const sportSubscription = useRef<LiveDataSubscription>()
    const {add, remove, subscribeIds} = useSubscription<LiveDataModel>({
        url: SocketEvent.LIVE_DATA_MIXED,
        receive: (liveData: LiveDataModel) => {
            if (sportSubscription.current && subscribeIds.current.includes(liveData.data.eventId)) {
                sportSubscription.current.onSubscript(liveData);
            }
        }
    })

    return {
        add,
        remove,
        sportSubscription,
    }
}

export default useLiveDataSubscription
