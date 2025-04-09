import {useCallback, useEffect, useState} from "react";
import UseEventRepository from "@/services/@event/repository/useEventRepository";
import {toGetEventPlayLogTimelineProps, toTimelineStatsProps} from "@/app/eventDetail/models/RequestDataMapping";
import {TimelineEventProps} from "@/app/eventDetail/components/playLog/TimelineEvent";
import {PlayLogTimelineParameters} from "@/app/eventDetail/models/PlayLogParameters";
import {TimelineEventCardProps} from "@/app/eventDetail/components/playLog/TimelineEventCard";
import {PenaltyType} from "@/app/eventDetail/components/playLog/PenaltyIcon";
import {convertPeriodOrTypeDisplay, EventPeriodName} from "@/services/@event/useCase";
import {ApiError} from "@/services/@core/ApiErrorHandle";
import {GlobalController} from "@/modules/common/GlobalController";
import {PlayLogTimelineModel} from "@/services/@core/module/ResponseDataModels";
import useLiveDataSubscription, {
    LiveDataModel,
    TimelineLogModel
} from "@/services/@odds/socket/useLiveDataMixedSubscription";
import {IntlShape, useIntl} from "react-intl";

const AllTeams = [
    'HOME',
    'AWAY'
]

function convertToServerFormat(input: string): string {
    return input
        .toUpperCase()           // Convert the entire string to uppercase
        .split(' ')     // Split the string by spaces
        .join('_');              // Join the words with underscores
}

const getDisplay = (team: string): 'left' | 'middle' | 'right' => {
    switch (team) {
        case 'HOME':
            return 'left'
        case 'AWAY':
            return 'right'
        default:
            return 'middle'
    }
}

const toTimelineEventProps = (intl: IntlShape, event: PlayLogTimelineModel): TimelineEventProps => {
    const {eventUtc: clockTime, systemLogTime, dangerState, type} = event
    const displayType = getDisplay(event.team ?? '')

    let color: 'grey' | 'green' | 'brown' | 'red' | undefined = undefined
    switch (dangerState) {
        case "SAFE":
        case "AWAY_SAFE":
        case "HOME_SAFE":
            color = 'green'
            break;
        case "AWAY_ATTACK":
        case "AWAY_ATTACKING_FREE_KICK":
        case "HOME_ATTACK":
        case "HOME_ATTACKING_FREE_KICK":
            color = 'brown'
            break;
        case "AWAY_DANGEROUS_FREE_KICK":
        case "AWAY_DANGEROUS_FREE_ATTACK":
        case "AWAY_CORNER_DANGER":
        case "HOME_DANGEROUS_FREE_KICK":
        case "HOME_DANGEROUS_FREE_ATTACK":
        case "HOME_CORNER_DANGER":
        case "AWAY_PENALTY":
        case "HOME_PENALTY":
            color = 'red'
            break;
    }

    let penaltyType: PenaltyType | undefined = undefined
    switch (type) {
        case "YELLOW_CARD":
            penaltyType = 'yellow'
            break;
        case "RED_CARD":
            penaltyType = 'red'
            break;
    }

    const detail: TimelineEventCardProps = {
        color: color,
        name: convertPeriodOrTypeDisplay(type),
        description: event.description,
        penaltyType: penaltyType,
        periodName: EventPeriodName(intl, event.periodName),
        periodTime: event.periodTime,
        isConfirmed: event.isConfirmed ?? false
    }
    return {
        clockTime: clockTime,
        systemTime: systemLogTime,
        displayType: displayType,
        detail: detail
    }
}

function useTimelineViewModel(eventId: string, sportType: string, defaultStates?: string[]) {
    const {getEventPlayLogTimeline, timelineStatuses} = UseEventRepository()
    const [events, setEvents] = useState<TimelineEventProps[]>([])
    const [allStates, setAllStates] = useState<string[]>([])
    const [queryParams, setQueryParams] = useState<PlayLogTimelineParameters>({
        eventId: eventId,
        provider: 'GENIUS',
        sportName: sportType.toUpperCase(),
        types: defaultStates?.map((state) => convertToServerFormat(state)),
        participantPositions: undefined
    });
    const {add, remove, sportSubscription} = useLiveDataSubscription()
    const globalController = GlobalController.getInstance()
    const intl = useIntl()

    useEffect(() => {
        if (eventId) {
            const onSubscript = (liveData: LiveDataModel) => {
                if (liveData.dataType === 'TIMELINE') {
                    const timeline = liveData.data as TimelineLogModel
                    const event = toTimelineEventProps(intl, {
                        eventUtc: timeline.eventUtc,
                        systemLogTime: timeline.systemLogTime,
                        dangerState: timeline.dangerState,
                        team: timeline.team,
                        type: timeline.type,
                        description: timeline.description,
                        periodName: timeline.periodName,
                        periodTime: timeline.periodTime,
                        isConfirmed: timeline.isConfirmed === 'CONFIRMED'
                    })

                    setEvents(prevState => {
                        const targetIndex = prevState.findIndex(oldEvent =>
                            oldEvent.displayType === event.displayType &&
                            oldEvent.clockTime === event.clockTime &&
                            oldEvent.systemTime === event.systemTime &&
                            oldEvent.detail.periodName === event.detail.periodName &&
                            oldEvent.detail.periodTime === event.detail.periodTime
                        );

                        if (timeline.isConfirmed === 'DELETED') {
                            return targetIndex !== -1 ? prevState.filter((_, index) => index !== targetIndex) : prevState;
                        }

                        if (targetIndex !== -1) {
                            return [
                                ...prevState.slice(0, targetIndex),
                                event,
                                ...prevState.slice(targetIndex + 1)
                            ];
                        }

                        const insertIndex = prevState.findIndex(oldEvent => oldEvent.clockTime < event.clockTime);
                        const indexToInsert = insertIndex === -1 ? prevState.length : insertIndex;
                        return [
                            ...prevState.slice(0, indexToInsert),
                            event,
                            ...prevState.slice(indexToInsert)
                        ];
                    })
                }
            }

            add(eventId)
            sportSubscription.current = {
                onSubscript: onSubscript
            }
        }

        return () => {
            if (eventId) {
                remove(eventId)
            }
        }
    }, [eventId])

    useEffect(() => {
        timelineStatuses(toTimelineStatsProps(eventId, 'GENIUS')).then(resp => {
            setAllStates(resp)
        })
    }, [])

    useEffect(() => {

        getEventPlayLogTimeline(toGetEventPlayLogTimelineProps(queryParams))
            .then(resp => {
                const events: TimelineEventProps[] = resp.map((event, index) => {
                    return toTimelineEventProps(intl, event)
                })
                setEvents(events.toReversed())
            }).catch((e: ApiError) => {
                // ignore 404 error because the ticket [FE-683]
                if (e.status !== 404) {
                    globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                        severity: 'error',
                        show: true,
                        message: e.message
                    })
                }
            })
    }, [queryParams]);

    const handleQueryChange = useCallback((params: Record<string, any>) => {
        setQueryParams(currentParams => ({
            ...currentParams,
            ...params
        }));
    }, []);

    const handleStates = useCallback((states: string[]) => {
        handleQueryChange({
            types: states.length === 0 ? undefined : states.map(state => convertToServerFormat(state))
        })
    }, [allStates, handleQueryChange])

    const handleTeams = useCallback((teams: string[]) => {
        handleQueryChange({
            participantPositions: teams.length === 0 ? undefined : teams.map(team => team.toUpperCase())
        })
    }, [handleQueryChange])

    return {
        events,
        allStates: allStates,
        allTeams: AllTeams,
        handleStates,
        handleTeams,
        selectedStates: queryParams.types,
        selectedTeams: queryParams.participantPositions
    }
}

export default useTimelineViewModel