import {
    Deviation,
    EventMarketHeavyBettingModel,
    EventMarketImbalanceBettingsModel,
    EventMarketOddsSettingsModel, MarketGroupModel
} from "@/services/@core/module/ResponseDataModels"
import {OptionItem} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {StatusItem} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup";
import {AutoMultiMenuTextFieldProps} from "@/modules/components/TextField";

/**
 * @param eventType - The type of event (use to filter template)
 * @param marketId - The id of the market (use to filter template)
 * @param sportId - The id of the sport (use to filter template)
 * @param sportName - The name of the sport (use to display)
 * @param openNewTemplateDialog - The function to open creates new template dialog
 * */
export interface IFirstRow {
    sportId: string
    sportType: string
    sportName: string
    templateName: string
    templateId: string
    templateChange: (template: OptionItem) => void
    eventType: string
    marketId?: string
    openNewTemplateDialog: () => void
    templateListRenderKey: number,
    isCustomized: boolean
}

export interface IFeedOddsSetting {
    feedOdds: EventMarketOddsSettingsModel
    feedOddsChange?: (e: string) => (value: any) => void
    feedOddsRange?: {[key: string]: [number, number]}
    disabled?: boolean
}

export interface IOddsDeviation {
    deviation: Deviation,
    onDeviationChange?: (path: string) => (value: any) => void,
    thresholdRange?: [number, number],
    disabled?: boolean
}

export interface IImbalancedBettingDecrease {
    imbalancedBettingDecrease: EventMarketImbalanceBettingsModel,
    onImbalancedBettingDecrease?: (path: string) => (value: any) => void
    imbalancedRange?: {[key: string]: [number, number]}
    disabled?: boolean
}

export interface IHeavyBetting {
    heavyBetting: EventMarketHeavyBettingModel
    heavyBettingChange?: (path: string) => (value: any) => void
    heavyBettingRange?: {[key: string]: [number, number]}
    disabled?: boolean
}

export interface IMarginLine {
    margin: number
    lineSettings: string,
    lineSettingDropDown: string[],
    onMarginLineChange?: (path: string) => (value: any) => void,
    disabled?: boolean
}

export interface MarketList {
    marketName: string
    marketId: string
}

export enum LineSettingsOptions {
    'No Limit' = 'NO_LIMIT',
    'Mainline Only' = 'MAINLINE_ONLY'
}

export enum DeviationOption {
    'Follow the odds provider without margin guarantee' = 'FOLLOW_PROVIDER',
    'Continue using calculated odds' = 'USE_CALCULATED'
}



export interface LocalMarketGroupModel extends MarketGroupModel {
    marketStatusItems: StatusItem[]
    marketProps: AutoMultiMenuTextFieldProps
    statusButtonGroupItems: StatusItem[]
}

