import {
    DelayedSettings,
    EventMarketSingleBetSettingsModel,
    ParlaySGPSetting,
    SportsDataModel,
    ImbalanceSetting,
    ParlayAlert,
    AutoSettlementSetting,
    BelowMarginSetting,
    RapidBetEntrySetting
} from "@/services/@core/module/ResponseDataModels"
import {OptionItem} from "@/modules/components/buttons/multipleFilterButton/models/Interface";

export interface IFirstRowTemplate {
    sportCategories: SportsDataModel[]
    templateName: string,
    isEditTemplate: boolean,
    isDuplicate: boolean
    templateChange: (e: string) => void
    sportName: string
    sportId: string
    sportChange: (e: string) => void
    leagues: OptionItem[]
    leaguesChange: (e: OptionItem[]) => void
    disabled?: boolean
}

export interface BetSlipSettingDataModel {
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
}