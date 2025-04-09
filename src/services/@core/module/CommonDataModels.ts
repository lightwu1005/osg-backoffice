import {SortDirection} from "@/services/@core/module/Enum";
import {
    DelayedSettings,
    Deviation,
    EventMarketHeavyBettingModel,
    EventMarketImbalanceBettingsModel,
    EventMarketOddsSettingsModel,
    EventMarketProviderPriorityModel,
    EventMarketSingleBetSettingsModel,
    ImbalanceSetting, MarketConfigModel, ParlayAlert,
    ParlaySGPSetting,
    TagModel
} from "@/services/@core/module/ResponseDataModels";

export interface ConfigurationOddsSettings {
    minimum: number
    maximum: number
    difference: number
}

export interface ConfigurationRounding {
    ruleName: string
    ruleNumber: number
}

export interface ConfigurationRoundingIncrement {
    ruleNumber: number
    increment: number
}

export interface ConfigurationDangerBallSettings {
    autoAcceptBetSlips: string[]
    autoHoldBetSlips: string[]
    autoRejectBetSlips: string[]
}

export interface NumberConditionSettings {
    condition: string,
    amount1: number,
    amount2?: number
}

export interface TypeSearchSettings {
    searchType: string,
    searchValue: string
}

/**
 * @param marketId To filter templates including this market, only use by single market settings to get list
 * */
export interface GetTemplates {
    eventType: string
    page: number
    pageSize: number
    search?: string
    settingLevel?: string[]
    sportIds?: string[]
    marketId?: string
    sortField?: string
    sortDirection?: SortDirection
}

export interface PostTemplate {
    eventType: string
    templateName: string
    sportId: string
    leagueIds?: string[]
    providerPriority: EventMarketProviderPriorityModel[]
    oddsSettings: EventMarketOddsSettingsModel
    margin: number
    lineSettings: string
    deviation: Deviation
    imbalanceBettings: EventMarketImbalanceBettingsModel
    heavyBettings: EventMarketHeavyBettingModel
    isDefault?: boolean
    feederSuspend: string
    dangerAttackAction: string
    imbalanceSettings: ImbalanceSetting
    belowMarginSettings: BelowMarginSetting
    delayedSettings: DelayedSettings
    singleBetSettings: EventMarketSingleBetSettingsModel
    parlaySettings: ParlaySGPSetting
    sgpSettings: ParlaySGPSetting
    parlayAlert: ParlayAlert
    rapidBetEntrySettings: RapidBetEntrySetting
    autoSettlementSettings: AutoSettlementSetting
    marketSettings?: MarketConfigModel[]
    isCustomized?: boolean
}

export interface UpdateTemplateDetail {
    templateName?: string
    leagueIds?: string[]
    isDefault?: boolean
    margin?: number
    oddsSettings?: EventMarketOddsSettingsModel
    providerPriority?: EventMarketProviderPriorityModel[]
    deviation: Deviation
    imbalanceBettings?: EventMarketImbalanceBettingsModel
    heavyBettings?: EventMarketHeavyBettingModel
    singleBetSettings?: EventMarketSingleBetSettingsModel
    parlaySettings?: ParlaySGPSetting
    sgpSettings?: ParlaySGPSetting
    marketSettings?: MarketConfigModel[]
    lineSettings?: string
    eventType: string
    delayedSettings?: DelayedSettings
    feederSuspend?: string
    dangerAttackAction?: string
    imbalanceSettings?: ImbalanceSetting
    belowMarginSettings?: BelowMarginSetting
    parlayAlert?: ParlayAlert
    rapidBetEntrySettings?: RapidBetEntrySetting
    autoSettlementSettings?: AutoSettlementSetting
}

export interface GetRiskGroupDetailModel {
    riskName: string
    riskColor: string
    betAmountSettings: RiskBetAmountSettings,
    winLossRateSettings: RiskWinLossRateSettings
    limitationType: string
    dailyBetLimitation?: RiskDailyBetLimitation,
    singleBetLimitation?: RiskSingleBetLimitation,
    tags: TagModel[]
}

export interface RiskGroupDetailModel {
    riskName: string
    riskColor: string
    betAmountSettings: RiskBetAmountSettings,
    winLossRateSettings: RiskWinLossRateSettings
    limitationType: string
    dailyBetLimitation?: RiskDailyBetLimitation,
    singleBetLimitation?: RiskSingleBetLimitation,
    tagIds: string[]
}

export interface RiskBetAmountSettings {
    minimum: number
    maximum: number
}

export interface RiskWinLossRateSettings {
    successBet: number
    winRate: string
    dayInterval: number
}

export interface RiskDailyBetLimitation {
    oddsDecrease: number
    dailyLimit: number
    delayAcceptance: number
}

export interface RiskSingleBetLimitation {
    oddsAdjustment: number
    amountAdjustment: number
    delayAcceptance: number
}

export interface ManualSettleBetLegVoid {
    eventId: string
    oddsType: string
    betId: string
    line: string
    odds: number
}

export interface RapidBetEntrySetting {
    enabled: boolean
    triggerTime: number;
    numberOfBets: number;
    suspendLine: number;
}

export interface AutoSettlementSetting {
    enabled: boolean
    delaySettlement: number;
}

export interface MarketSetting {
    marketId: string;
    marketName: string;
    margin: number;
    minimumDifference: number;
    lineSettings: string;
    singleBetSettings: SingleBetSetting;
    parlayable: boolean;
    sgpable: boolean;
}

export interface SingleBetSetting {
    minimum: number;
    maximum: number;
    maxPayout: number;
}

export interface ParlayAlertSetting {
    type: string;
    targetNumber: number;
    potentialWin: number;
    alertRecipients: string[];
    sendEmail: boolean
}

export interface BelowMarginSetting {
    margin: number;
    alertRecipients: string[];
}