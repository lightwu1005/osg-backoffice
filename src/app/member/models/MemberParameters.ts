import {SortDirection} from "@/services/@core/module/Enum";
import {TagModel} from "@/services/@core/module/ResponseDataModels";
import {OptionItem} from "@/modules/components/buttons/multipleFilterButton/models/Interface";

export interface GetRiskGroupsParameters {
    page: number;
    pageSize: number;
    sortField?: string;
    sortDirection?: SortDirection;
}

export interface GetTagsParameters extends GetRiskGroupsParameters {
}

export interface UpdateTagsApplyParameters {
    punterId: string
    tagIds: string[]
}

export interface GetRiskGroupApplyingParameters {
    riskId: string
    page: number
    pageSize: number
    searchKey?: string
    searchValue?: string
    startDate?: number
    endDate?: number
    sortField?: string
    sortDirection?: SortDirection
}

/**
 * @param riskId - The risk group id, if not provided, it will be removed from the risk group
 * @param punterIds - The list of punter ids to be added or removed
 * */
export interface UpdateRiskGroupApplyParameters {
    riskId?: string
    punterIds: string[]
}

//Member List View (Punters)
export interface GetRiskMembersParameters {
    page: number
    pageSize: number
    searchKey?: string
    searchValue?: string
    riskIds?: string[]
    tagIds?: string[]
    startDate?: number
    endDate?: number
    sortField?: string
    sortDirection?: SortDirection
}

//RiskGroupForm
export interface LocalizedRiskGroupDetail {
    riskName?: string
    riskColor?: string
    betAmountSettings: LocalizedRiskBetAmountSettings ,
    winLossRateSettings: LocalizedRiskWinLossRateSettings
    limitationType?: string
    dailyBetLimitation: LocalizedRiskDailyBetLimitation,
    singleBetLimitation: LocalizedRiskSingleBetLimitation,
    tags?: TagModel[]
}

export interface LocalizedRiskBetAmountSettings {
    minimum?: number
    maximum?: number
}

export interface LocalizedRiskWinLossRateSettings {
    successBet?: number
    winRate?: string
    dayInterval?: number
}

export interface LocalizedRiskDailyBetLimitation {
    oddsDecrease?: number
    dailyLimit?: number
    delayAcceptance?: number
}

export interface LocalizedRiskSingleBetLimitation {
    oddsAdjustment?: number
    amountAdjustment?: number
    delayAcceptance?: number
}

//EditMemberTagsDialog
export interface EditMemberTagsParameters {
    punterId: string
    tags: OptionItem[]
}

//LocalizedMemberParameters
export interface LocalizedMemberParameters extends GetRiskMembersParameters {}

//Member Detail
export interface GetRiskMembersBetSlipsParameters {
    punterId: string
    page: number
    pageSize: number
    startDate: number
    endDate: number
    ipAddress?: string
    leagueIds?: string[]
    marketIds?: string[]
    statuses?: string[]
    sortField?: string
    sortDirection?: SortDirection
}

export interface GetRiskMembersPerformanceTotalAmountParameters {
    punterId: string
    startDate: number
    endDate: number
    dimensions?: 'HOUR' | 'HALF_DAY' | 'DAY' | 'WEEK' | 'MONTH'
}

export interface GetRiskMembersPerformanceWinLossRateParameters extends Omit<GetRiskMembersPerformanceTotalAmountParameters, 'dimension'> {}

