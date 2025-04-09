import {
    EventDetailProps,
    EventMarketsDetailProps,
    GetEventMarketSettingsProps,
    GetEventPlayLogMatchStatsProps,
    GetEventPlayLogTimelineProps,
    GetLineupsProps,
    GetPlayLogSummaryProps,
    MarketBalanceProps,
    OddsListProps,
    OddsMarginCalculateProps,
    OddsMarginProps,
    OddsMarketStatusProps,
    SetProviderPreferenceProps,
    TimelineStatusesProps,
    UpdateEventsStatusProps,
    UpdateOddsMarginProps,
} from "@/services/@core/module/RequestDataModels";
import {OddsMarketStatusParameter} from "@/app/eventDetail/models/OddsMarketStatusParameter";
import {UpdateOddsMarginParameter} from "@/app/eventDetail/models/UpdateOddsMarginParameter";
import {PlayLogTimelineParameters} from "@/app/eventDetail/models/PlayLogParameters";
import {UpdateEventMarketSettingsModel} from "@/services/@core/module/ResponseDataModels";
import {InfoType} from "@/services/@core/module/Enum";
import {PostTemplate, UpdateTemplateDetail} from "@/services/@core/module/CommonDataModels";

export function toEventDetailProps(eventId: string): EventDetailProps {
    return {
        endPoint: {
            eventId: eventId
        }
    };
}

export function toEventMarketsDetailProps(eventId: string, eventType: string): EventMarketsDetailProps {
    return {
        endPoint: {
            eventId: eventId
        },
        query: {
            eventType: eventType
        }
    };
}

export function toEventUpdateStatus(eventIds: string[], status: string): UpdateEventsStatusProps {
    return {
        body: {
            eventIds: eventIds,
            status: status
        }
    }
}

export function toOddsListProps(eventType: string, eventId: string, marketIds: string[]): OddsListProps {
    return {
        query: {
            eventId: eventId,
            marketIds: marketIds,
            eventType: eventType
        }
    };
}

export function toMarketBalanceProps(eventId: string, marketId: string): MarketBalanceProps {
    return {
        query: {
            eventId: eventId,
            marketId: marketId
        }
    };
}

export function toOddsMarketStatusProps(parameters: OddsMarketStatusParameter): OddsMarketStatusProps {
    return {
        body: parameters
    };
}

export function toSetProviderPreferenceProps(eventId: string, provider: string, marketId: string): SetProviderPreferenceProps {
    return {
        body: {
            eventId: eventId,
            provider: provider,
            marketId: marketId
        }
    };
}

export function toEventMarketSettingsProps(eventId: string, eventType: string, marketId?: string): GetEventMarketSettingsProps {
    return {
        query: {
            eventId: eventId,
            eventType: eventType,
            ...(marketId ? {marketId: marketId} : undefined),
        }
    }
}

export function toOddsMarginProps(eventId: string, marketId?: string, baseLineId?: string): OddsMarginProps {
    return {
        query: {
            eventId: eventId,
            ...(marketId ? {marketId: marketId} : undefined),
            ...(baseLineId ? {baseLineId: baseLineId} : undefined),
        }
    };
}

export function toUpdateOddsMarginProps(parameter: UpdateOddsMarginParameter): UpdateOddsMarginProps {
    return {
        body: parameter
    };
}

export function toOddsMarginCalculateProps(maxPayout: number, margin?: number, minOdds?: number, maxOdds?: number): OddsMarginCalculateProps {
    return {
        body: {
            ...(margin ? {margin: margin} : undefined),
            ...(minOdds ? {minOdds: minOdds} : undefined),
            ...(maxOdds ? {maxOdds: maxOdds} : undefined),
            maxPayout: maxPayout,
        }
    };
}

export function toGetEventPlayLogSummaryProps(eventId: string): GetPlayLogSummaryProps {
    return {
        endPoint: {
            eventId: eventId
        }
    }
}

export function toGetEventPlayLogMatchStatsProps(eventId: string): GetEventPlayLogMatchStatsProps {
    return {
        endPoint: {
            eventId: eventId
        }
    }
}

export function toGetEventPlayLogTimelineProps(params: PlayLogTimelineParameters): GetEventPlayLogTimelineProps {
    const {eventId, provider, sportName, types, participantPositions} = params;
    return {
        endPoint: {
            eventId: eventId,
            provider: provider
        },
        query: {
            sportName: sportName,
            ...(types ? {types: types} : undefined),
            ...(participantPositions ? {participantPositions: participantPositions} : undefined)
        }
    }
}

export function toTimelineStatsProps(eventId: string, provider: string): TimelineStatusesProps {
    return {
        endPoint: {
            eventId: eventId,
            provider: provider
        }
    }
}

export function toGetLineupProps(eventId: string): GetLineupsProps {
    return {
        endPoint: {
            eventId: eventId
        }
    }
}

export function toUpdateEventMarketSetting(parameters: UpdateEventMarketSettingsModel) {
    return {
        body: parameters
    }
}

export function toAddTemplateProps(parameters: PostTemplate) {
    return {
        body: parameters
    }
}

export function toUpdateTemplate(parameters: UpdateTemplateDetail, templateId: string) {
    return {
        endPoint: {
            templateId: templateId
        },
        body: parameters
    }
}

export function toGetEventPerformance(eventId: string, infoType: InfoType) {
    return {
        endPoint: {
            infoType: infoType,
            eventId: eventId
        }
    }
}

export function toGetMarketGroups(eventType: string, sportId: string) {
    return {
        query: {
            eventType: eventType,
            sportId: sportId
        }
    }
}