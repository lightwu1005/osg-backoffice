import {
    GetPerformanceProps,
    GetTemplateMarketsProps,
    LeaguesProps,
    LocationsProps,
    ProviderInformationProps,
    ProvidersProps
} from "@/services/@core/module/RequestDataModels";
import {
    GetPerformanceParameters,
    LeagueQueryParameters,
    ProviderInfoQueryParameters,
} from "@/app/dashboard/models/EventQueryParameters";
import {GetTemplateMarketsParameters} from "@/app/eventList/models/EventQueryParameters";

export function toLeaguesProps({sportIds, eventType, search, page, pageSize}: LeagueQueryParameters): LeaguesProps {
    return {
        query: {
            page: page,
            pageSize: pageSize,
            ...(sportIds && sportIds.length > 0 ? {sportIds: sportIds} : undefined),
            ...(eventType ? {eventType: eventType} : undefined),
            ...(search ? {name: search} : undefined),
        }
    };
}

export function toLocationsProps(sportId: string): LocationsProps {
    return {
        query: {
            sportId: sportId
        }
    };
}

export function toProvidersProps(sportId?: string): ProvidersProps {
    return {
        query: {
            sportId: sportId
        }
    };
}

export function toProviderInformationProps(query: ProviderInfoQueryParameters): ProviderInformationProps {
    return {
        query: query
    };
}

export function toGetPerformanceProps(query: GetPerformanceParameters): GetPerformanceProps {
    const {infoType, startDate, endDate, sportIds, betType} = query;
    return {
        endPoint: {
            infoType: infoType
        },
        query: {
            startDate: startDate,
            endDate: endDate,
            ...(sportIds && sportIds.length > 0 ? {sportIds: sportIds} : undefined),
            ...(betType ? {betType: betType} : undefined),
        }
    };
}

export function toGetTemplateMarketsProps(requestData: GetTemplateMarketsParameters): GetTemplateMarketsProps {
    const {page, pageSize, eventType, sportId, leagueIds} = requestData
    return {
        body: {
          page,
          pageSize,
          eventType,
          sportId,
          leagueIds
        }
    };
}