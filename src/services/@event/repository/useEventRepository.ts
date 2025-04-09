import useApiInteractor from "@/services/@core/ApiInteractor";
import {
    AddEventPinsProps,
    EventDetailProps,
    EventListProps,
    EventMarketsDetailProps,
    GetEventMarketSettingsProps,
    GetEventPerformanceProps,
    GetEventPinsProps,
    GetEventPlayLogMatchStatsProps,
    GetEventPlayLogTimelineProps,
    GetLineupsProps, GetMarketGroups,
    GetPlayLogSummaryProps,
    TimelineStatusesProps,
    UpdateAutoPayoutProps,
    UpdateEventMarketSettingsProp,
    UpdateEventsStatusProps
} from "@/services/@core/module/RequestDataModels";

const useEventRepository = () => {
    const apiInteractor = useApiInteractor()

    const getEventList = async (requestData: EventListProps) => {
        return await apiInteractor.getEventList(requestData)
    }

    const getEventMarketDetail = async (requestData: EventMarketsDetailProps) => {
        return await apiInteractor.getEventMarketDetail(requestData)
    }

    const getEventDetail = async (requestData: EventDetailProps) => {
        return await apiInteractor.getEventDetail(requestData)
    }

    const getPlayLogSummary = async (requestData: GetPlayLogSummaryProps) => {
        return await apiInteractor.getPlayLogSummary(requestData)
    }

    const updateEventsStatus = async (requestData: UpdateEventsStatusProps) => {
        return await apiInteractor.updateEventsStatus(requestData)
    }

    const getEventPins = async (requestData: GetEventPinsProps) => {
        return await apiInteractor.getEventPins(requestData)
    }

    const updateEventPins = async (requestData: AddEventPinsProps) => {
        return await apiInteractor.updateEventPins(requestData)
    }

    const updateAutoPayout = async (requestData: UpdateAutoPayoutProps) => {
        return await apiInteractor.updateAutoPayout(requestData)
    }

    const getEventMarketSettings = async (requestData: GetEventMarketSettingsProps) => {
        return await apiInteractor.getEventMarketSettings(requestData)
    }

    const updateEventMarketSettings = async (requestData: UpdateEventMarketSettingsProp) => {
        return await apiInteractor.updateEventMarketSettings(requestData)
    }

    const getLineups = async (requestData: GetLineupsProps) => {
        return await apiInteractor.getLineUps(requestData)
    }

    const getEventPlayLogMatchStats = async (requestData: GetEventPlayLogMatchStatsProps)=> {
        return await apiInteractor.getEventPlayLogMatchStats(requestData)
    }

    const getEventPlayLogTimeline = async (requestData: GetEventPlayLogTimelineProps) => {
        return await apiInteractor.getEventPlayLogTimeline(requestData);
    }

    const timelineStatuses = async (requestData: TimelineStatusesProps) => {
        return await apiInteractor.timelineStatuses(requestData);
    }

    const getEventPerformance = async (requestData: GetEventPerformanceProps) => {
        return await apiInteractor.getEventPerformance(requestData)
    }

    const getMarketGroups = async (requestData: GetMarketGroups) => {
        return await apiInteractor.getMarketGroups(requestData)
    }

    return {
        getEventList,
        getEventMarketDetail,
        getEventDetail,
        getPlayLogSummary,
        updateEventsStatus,
        getEventPins,
        updateEventPins,
        getEventMarketSettings,
        updateAutoPayout,
        updateEventMarketSettings,
        getLineups,
        getEventPlayLogMatchStats,
        getEventPlayLogTimeline,
        timelineStatuses,
        getEventPerformance,
        getMarketGroups
    }
}

export default useEventRepository