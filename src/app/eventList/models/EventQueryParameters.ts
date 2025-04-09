import {SortDirection} from "@/services/@core/module/Enum";

export interface EventQueryParameters {
    eventType: string
    sportId: string
    page: number
    pageSize: number
    displayPin?: boolean
    searchType?: string
    searchValue?: string
    locationIds?: string[]
    leagueIds?: string[]
    statuses?: string[]
    startDate?: number
    endDate?: number
    sortField?: string
    sortDirection?: SortDirection
}

export interface GetTemplateMarketsParameters {
    page: number
    pageSize: number
    eventType: string
    sportId: string
    leagueIds?: string[]
}