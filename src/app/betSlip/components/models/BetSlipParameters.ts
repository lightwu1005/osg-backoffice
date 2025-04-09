import {BetType, EventType, SortDirection} from "@/services/@core/module/Enum";
import {
    ManualSettleBetLegVoid,
    NumberConditionSettings,
    TypeSearchSettings
} from "@/services/@core/module/CommonDataModels";

/**
 * @param eventType Event type, Optional, if not pass this param means to get all bet slips
 * @param page Page number
 * @param pageSize How many rows in one page
 * @param search Search conditions with type and value
 * @param betType Bet type
 * @param sportIds Sport ids
 * @param leagueIds League ids
 * @param marketIds Market ids
 * @param statuses The status of bet slip
 * @param settlements The settlement status of bet slip
 * @param devices The devices use to place bet
 * @param result The filter condition of bet slip result
 * @param betAmount The filter conditions of bet amount
 * @param maximumPayout The filter conditions of maximum payout amount
 * @param payout The filter conditions of payout amount
 * @param startDate Bet time range start date
 * @param endDate Bet time range end date
 * @param sortField The field to sort
 * @param sortDirection The direction to sort
 */
export interface GetBetSlipsParameter {
    page: number,
    pageSize: number,
    eventType?: string,
    search?: TypeSearchSettings,
    betTypes?: BetType[],
    sportIds?: string[],
    leagueIds?: string[],
    marketIds?: string[],
    statuses?: string[],
    settlements?: string[],
    devices?: string[],
    providerNames?: string[],
    results?: string[],
    betAmount?: NumberConditionSettings,
    maximumPayout?: NumberConditionSettings,
    payout?: NumberConditionSettings,
    startDate?: number,
    endDate?: number,
    eventStartDate?: number,
    eventEndDate?: number,
    sortField?: string,
    sortDirection?: SortDirection
}

export interface GetBetSlipsFromEvent {
    sportIds?: { sportId: string; sportName: string }
    marketIds?: { marketId: string; marketName: string }[]
    startDate?: number
    endDate?: number
    eventType?: EventType,
    providerNames?: string[],
    eventId?: string
}

/**
 * @param betSlipIds The selecting betSlip ids
 * @param status The status going to apply to betSlips
 * @param description The description/reason of rejecting betSlips
 * @param sendMsg Should send message to user's email or not
 */
export interface BetSlipAcceptanceParameter {
    betSlipIds: string[],
    status: string,
    description?: string,
    sendMsg: boolean
}

export interface BetSlipVoidBetLegsParameter {
    betSlipId: string,
    manualSettleBetLegVoList: ManualSettleBetLegVoid[],
    description?: string,
    sendMsg: boolean
}

/**
 * @param startDate The designated start date for data the export range.
 * @param endDate The designated end date for the data export range.
 */
export interface BetSlipExportParameter {
    startDate: number,
    endDate: number
}