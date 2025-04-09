import {
    DelayedSettings,
    Deviation,
    EventMarketHeavyBettingModel,
    EventMarketImbalanceBettingsModel,
    EventMarketOddsSettingsModel,
    EventMarketProviderPriorityModel,
    EventMarketSingleBetSettingsModel,
    ImbalanceSetting,
    MarketConfigModel,
    OddsListModel,
    ParlaySGPSetting
} from "@/services/@core/module/ResponseDataModels";
import {getEnumKeyByValue, getEnumValueByKey} from "@/modules/common/DataProcessUnit";
import {LineSettingsOptions} from "@/app/eventDetail/models/dataModel/MarketSettingDataModel";
import {LineSettingOptionsType} from "@/app/configuration/domain/useConfigurationViewModel";

export interface EventDetailOddsDataModel {
    marketId: string;
    marketName: string;
    marketType: string;
    listModel: OddsListModel[]
}

export type TemplateSummaryEnableType = "true" | "false" | "none";

export interface TemplateSummaryUsedModel {
    sportName: string;
    leagueName: string;
    leagueId: string;
    eventType: string;
    templateName?: string;
    templateId?: string;
    sportId: string;
    leagueIds?: string[];
    providerPriority?: EventMarketProviderPriorityModel[];
    oddsSettings?: EventMarketOddsSettingsModel;
    margin: number;
    lineSettings?: string
    deviation: Deviation;
    imbalanceBettings?: EventMarketImbalanceBettingsModel
    heavyBettings?: EventMarketHeavyBettingModel
    isDefault: boolean;
    feederSuspend: string;
    dangerAttackAction: string;
    imbalanceSettings: ImbalanceSetting;
    belowMarginSettings: LocalBelowMarginSetting;
    delayedSettings?: DelayedSettings
    singleBetSettings?: EventMarketSingleBetSettingsModel
    parlaySettings?: ParlaySGPSetting
    sgpSettings?: ParlaySGPSetting
    parlayAlert: LocalParlayAlertSetting;
    rapidBetEntrySettings: LocalRapidBetEntrySetting;
    autoSettlementSettings: LocalAutoSettlementSetting;
    marketSettings?: LocalMarketSetting[];
}

export interface LocalRapidBetEntrySetting {
    enabled: TemplateSummaryEnableType
    triggerTime: number;
    numberOfBets: number;
    suspendLine: number;
}

export interface LocalAutoSettlementSetting {
    enabled: TemplateSummaryEnableType
    delaySettlement: number;
}

export interface LocalMarketSetting {
    marketId: string;
    marketName: string;
    margin: number;
    minimumDifference: number;
    lineSettings: string;
    singleBetSettings: LocalSingleBetSetting;
    parlayable: TemplateSummaryEnableType;
    sgpable: TemplateSummaryEnableType;
}

export interface LocalSingleBetSetting {
    minimum: number;
    maximum: number;
    maxPayout: number;
}

export interface LocalParlayAlertSetting {
    type: string;
    targetNumber: number;
    potentialWin: number;
    alertRecipients: string[];
    sendEmail: TemplateSummaryEnableType
}

export interface LocalBelowMarginSetting {
    margin: number;
    alertRecipients: string[];
}

export function marketSettingToMarketConfigModel(marketSetting: LocalMarketSetting): MarketConfigModel {
    return {
        marketId: marketSetting.marketId,
        marketName: marketSetting.marketName,
        margin: marketSetting.margin,
        minimumDifference: marketSetting.minimumDifference,
        lineSettings: getEnumKeyByValue(LineSettingOptionsType, marketSetting.lineSettings) ?? marketSetting.lineSettings,
        singleBetSettings: marketSetting.singleBetSettings,
        parlayable: marketSetting.parlayable === "true",
        sgpable: marketSetting.sgpable === "true"
    }
}

export function marketConfigModelToMarketSetting(marketConfig: MarketConfigModel): LocalMarketSetting {
    return {
        marketId: marketConfig.marketId,
        marketName: marketConfig.marketName,
        margin: marketConfig.margin,
        minimumDifference: marketConfig.minimumDifference,
        lineSettings: getEnumValueByKey(LineSettingsOptions, marketConfig.lineSettings) ?? marketConfig.lineSettings,
        singleBetSettings: marketConfig.singleBetSettings,
        parlayable: marketConfig.parlayable ? "true" : "false",
        sgpable: marketConfig.sgpable ? "true" : "false"
    }
}

