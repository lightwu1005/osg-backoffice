import {SocketEvent} from "@/modules/common/GlobalWebSocket";
import {useRef} from "react";
import {CardModel, ExtraScore} from "@/services/@core/module/ResponseDataModels";
import {ISubscription} from "@/services/@odds/socket/useCommonSubscription";
import {EventSubscriptionModel} from "@/services/@odds/socket/events/EventSubscriptionModel";
import {DataBuffer} from "@/utils/DataBuffer";
import {hasValidNumber} from "@/utils/tools";
import useEventSubscription from "@/services/@odds/socket/events/useEventSubscription";
import {updateParticipantCard, updateParticipantExtraScore} from "@/services/@event/useCase";

interface MatchSubscription extends ISubscription<SubscriptionStatsModel[]>{}
export interface SubscriptionStatsModel {
    eventId: string;
    participant: SubscriptionParticipantModel;
}
export interface SubscriptionParticipantModel {
    id: string;
    score?: number | null;
    corner?: number | null;
    card?: CardModel | null;
    extraScores?: ExtraScore[] | null;
}

const useStatsSubscription = () => {
    const statsSubscription = useRef<MatchSubscription>()
    const dataBuffer = useRef<DataBuffer<SubscriptionStatsModel>>(new DataBuffer<SubscriptionStatsModel>(
        (newData, buffer) => {

            const updateParticipant = (newParticipant: SubscriptionParticipantModel, buffer?: SubscriptionParticipantModel): SubscriptionParticipantModel => {
                if (!buffer) return newParticipant;
                return {
                    ...buffer,
                    ...(hasValidNumber(newParticipant.score) ? {score: newParticipant.score} : undefined),
                    ...(hasValidNumber(newParticipant.corner) ? {corner: newParticipant.corner} : undefined),
                    ...(newParticipant.card ? {card: updateParticipantCard(newParticipant.card, buffer.card)} : undefined),
                    ...(newParticipant.extraScores ? {extraScores: updateParticipantExtraScore(newParticipant.extraScores, buffer.extraScores)} : undefined),
                }
            }

            const hasTarget = buffer.some(data => data.eventId === newData.eventId && data.participant.id === newData.participant.id);
            return hasTarget ? buffer.map((data) => {
                const isTarget = data.eventId === newData.eventId && data.participant.id === newData.participant.id
                return isTarget ? {
                    ...data,
                    ...(newData.participant ? {
                        participant: updateParticipant(newData.participant, data.participant)
                    } : undefined),
                } : data
            }) : [...buffer, newData]
        },
        (mergedData) => {
            statsSubscription.current?.onSubscript(mergedData)
        },
        1000
    ))
    const {add, remove, subscribeContents} = useEventSubscription<EventSubscriptionModel>({
        url: SocketEvent.DATA_SUBSCRIPTION,
        receive: ({stats}: EventSubscriptionModel) => {
            if (stats && statsSubscription.current && subscribeContents.current.some(content => stats.eventId === content.matchId)) {
                dataBuffer.current.addData(stats)
            }
        }
    })
    return {
        add: (matchIds: string | string[]) => {
            if (Array.from(matchIds).length === 0) return
            add(matchIds, 'PARTICIPANTS')
        },
        remove: (matchIds: string | string[]) => {
            if (Array.from(matchIds).length === 0) return
            remove(matchIds, 'PARTICIPANTS')
        },
        statsSubscription,
    }
}

export default useStatsSubscription