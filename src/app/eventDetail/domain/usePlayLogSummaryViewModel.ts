import useEventRepository from "@/services/@event/repository/useEventRepository";
import {toGetEventPlayLogSummaryProps} from "@/app/eventDetail/models/RequestDataMapping";
import {useEffect, useRef, useState} from "react";
import {PlayLogSummaryModel} from "@/services/@core/module/ResponseDataModels";
import {
    toPlayLogGameSectionScoreboardProps,
    toPlayLogStatisticSummaryProps,
    toPlayLogSummaryProps
} from "@/services/@event/useCase";
import {StatisticSummaryProps} from "@/app/eventDetail/components/playLog/StatisticSummary";
import {PeriodScore} from "@/app/eventDetail/components/playLog/GameSectionScoreboard";
import {ApiError} from "@/services/@core/ApiErrorHandle";
import {GlobalController} from "@/modules/common/GlobalController";
import useLiveDataSubscription, {
    LiveDataModel,
    SummaryModel,
    TimelineLogModel
} from "@/services/@odds/socket/useLiveDataMixedSubscription";
import {triggerStates} from "@/app/eventDetail/models/EventDetailUtils";
import {useClockDuration} from "@/utils/useClockDuration";
import {useIntl} from "react-intl";
import {calculateElapsedRunningTime} from "@/modules/components/eventTable/EventDataConverter";

const usePlayLogSummaryViewModel = (eventId: string, sportType: string) => {
    const eventRepo = useEventRepository();

    const getPlayLogSummary = async (eventId: string) => {
        return await eventRepo.getPlayLogSummary(toGetEventPlayLogSummaryProps(eventId));
    }

    const [summaryData, setSummaryData] = useState<PlayLogSummaryModel>();
    const [isLoading, setIsLoading] = useState(false);
    const [statistics, setStatistics] = useState<StatisticSummaryProps[]>([]);
    const [scores, setScores] = useState<PeriodScore[]>([]);

    const [isTopBarVisible, setIsTopBarVisible] = useState(true);
    const targetTopBarRef = useRef(null);
    const [currentMatchState, setCurrentMatchState] = useState({
        home: false, away: false
    })

    const globalController = GlobalController.getInstance();
    const {add, remove, sportSubscription} = useLiveDataSubscription()

    const {eventDuration, setDuration, setIsClockRunning} = useClockDuration({sportType})
    const intl = useIntl();

    const getData = () => {
        setIsLoading(true);
        getPlayLogSummary(eventId).then(data => {
            setSummaryData(toPlayLogSummaryProps(intl, data));
            setStatistics(toPlayLogStatisticSummaryProps(data.statisticCounts));
            setScores(toPlayLogGameSectionScoreboardProps(data.periodScores));
            const elapsedRunningTime = data.runningReceiveTime
                ? calculateElapsedRunningTime(data.runningReceiveTime, data.eventDuration ?? 0)
                : data.eventDuration ?? 0;
            setDuration(elapsedRunningTime);
            setIsClockRunning(data.isClockRunning ?? false);
        }).catch((e: ApiError) => {
            // ignore 404 error because the ticket [FE-683]
            if (e.status !== 404) {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: e.message
                })
            }
        }).finally(() => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        if (eventId) {
            getData();

            const onSubscript = (liveData: LiveDataModel) => {
                switch (liveData.dataType) {
                    case 'TIMELINE': {
                        const timeline = liveData.data as TimelineLogModel
                        if (triggerStates.some(item => item === timeline.type.toUpperCase())) {
                            setCurrentMatchState({
                                home: timeline.team === 'HOME',
                                away: timeline.team === 'AWAY'
                            });
                        } else {
                            setCurrentMatchState({
                                home: false, away: false
                            });
                        }
                        break;
                    }
                    case 'SUMMARY': {
                        const summary = liveData.data as SummaryModel
                        if (summary.eventDuration || summary.runningReceiveTime || summary.isClockRunning !== null) {
                            const elapsedRunningTime = summary.runningReceiveTime
                                ? calculateElapsedRunningTime(summary.runningReceiveTime, summary.eventDuration ?? 0)
                                : summary.eventDuration ?? 0;
                            setDuration(elapsedRunningTime);
                            setIsClockRunning(summary.isClockRunning);
                        }
                        setSummaryData(toPlayLogSummaryProps(intl, summary));
                        setStatistics(toPlayLogStatisticSummaryProps(summary.statisticCounts));
                        setScores(toPlayLogGameSectionScoreboardProps(summary.periodScores));
                        break;
                    }
                    default:
                        break;
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

    }, [eventId]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsTopBarVisible(entry.isIntersecting);
            },
            {
                root: null, // Observe the window
                threshold: 0, // Fires when the element is completely invisible
            }
        );

        const current = targetTopBarRef.current;
        if (current) {
            observer.observe(current);
        }

        return () => {
            if (current) {
                observer.unobserve(current);
            }
        };
    }, []);

    return {
        isLoading,
        summaryData,
        statistics,
        scores,
        isTopBarVisible,
        targetTopBarRef,
        currentMatchState,
        eventDuration
    }
}

export default usePlayLogSummaryViewModel