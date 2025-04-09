import {SocketEvent} from "@/modules/common/GlobalWebSocket";
import {useRef} from "react";
import useSubscription, {ISubscription} from "@/services/@odds/socket/useCommonSubscription";

interface PlayLogSubscription extends ISubscription<PlayLogModel>{}
export interface PlayLogModel {
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

const usePlayLogSubscription = (sport: string) => {
    const sportSubscription = useRef<PlayLogSubscription>()
    const {add, remove, subscribeIds} = useSubscription<PlayLogModel>({
        url: SocketEvent.LIVE_PLAY_LOG(sport.toLowerCase()),
        receive: (playLog: PlayLogModel) => {
            if (sportSubscription.current && subscribeIds.current.includes(playLog.eventId)) {
                sportSubscription.current.onSubscript(playLog);
            }
        }
    })

    return {
        add,
        remove,
        sportSubscription,
    }
}

export default usePlayLogSubscription