import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

export enum ImpactTemplatesViewWordingType {
    // View All Impact
    AllColumnChanges = "viewAllImpact.allColumnChanges",

    // View All Impact (Tabs)
    TAB_TemplateDefault = "viewAllImpact.templateDefault",
    TAB_Feeder = "viewAllImpact.feeder",
    TAB_Margin = "viewAllImpact.margin",
    TAB_Risk = "viewAllImpact.risk",
    TAB_Imbalanced = "viewAllImpact.imbalanced",
    TAB_BetSlip = "viewAllImpact.betSlip",
    TAB_Parlay = "viewAllImpact.parlay",
    TAB_Market = "viewAllImpact.Market",
    TAB_BetSlipRisks = "viewAllImpact.betSlipRisks",
    TAB_MarketControl = "viewAllImpact.marketControl",
    TAB_Alert = "viewAllImpact.alert",
    TAB_RapidBet = "viewAllImpact.rapidBet",
    TAB_Settlement = "viewAllImpact.settlement",

    // All Field Labels
    LABEL_New = "viewAllImpact.new",
    LABEL_Old = "viewAllImpact.old",

    // Template Level Fields
    Leagues = "league",
    TemplateName = "templateName",
    Margin = "margin",

    // Feeder Settings
    OddsFeedProviderPriority = "oddsFeedProviderPriority",
    FeederOddsMinimumSetting = "feederOddsMinimumSetting",

    // Risk Settings
    OddsDeviationThreshold = "oddsDeviationThreshold",
    DeviationResponseActions = "deviationResponseActions",

    // Imbalanced Betting Settings
    ImbalancedBettingSetting = "imbalancedBettingSetting",
    HeavyBetting = "heavyBetting",

    // Bet Slip Settings
    DelayedAcceptanceSetting = "delayedAcceptanceSetting",
    SingleBetSetting = "singleBetSetting",

    // Parlay Settings
    ParlaySetting = "parlayBetSetting",
    SGPSetting = "sgp",
    Enable = "enable",
    Disable = "disable",
    MinimumLegs = "minimumLegs",
    MaximumLegs = "maximumLegs",
    MinimumOdds = "minimumOdds",
    MaximumOdds = "maximumOdds",
    MaximumPayout = "maximumPayout",

    // Market and Line Settings
    Markets = "markets",
    LineSettings = "lineSettings",

    // Other wording
    SearchLeague = "viewAllImpact.searchLeague",

    //BetSlip Setting
    FeederSuspendMarket = "viewAllImpact.feederSuspendMarket",
    DangerAttackAction = "viewAllImpact.dangerAttackAction",
    BetSlipAmountImbalanceSetting = "viewAllImpact.betSlipAmountImbalanceSetting",
    BelowTheMarginSetting = "viewAllImpact.belowTheMarginSetting",
    ParlayAlertSettings = "viewAllImpact.parlayAlertSettings",
    RapidBetEntrySettings = "viewAllImpact.rapidBetEntrySettings",
    AutoSettlementSettings = "viewAllImpact.autoSettlementSettings",
}

export const useTemplateTranslate = () => {
    const intl = useIntl();
    const tempFunType = LocalizationFunctionType.Template;

    const translationMap = {
        [ImpactTemplatesViewWordingType.AllColumnChanges]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.AllColumnChanges}`,
            defaultMessage: 'All Column Changes'
        }),
        [ImpactTemplatesViewWordingType.TAB_TemplateDefault]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.TAB_TemplateDefault}`,
            defaultMessage: 'Template Default'
        }),
        [ImpactTemplatesViewWordingType.TAB_Feeder]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.TAB_Feeder}`,
            defaultMessage: 'Feeder'
        }),
        [ImpactTemplatesViewWordingType.TAB_Margin]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.TAB_Margin}`,
            defaultMessage: 'Margin'
        }),
        [ImpactTemplatesViewWordingType.TAB_Risk]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.TAB_Risk}`,
            defaultMessage: 'Risk'
        }),
        [ImpactTemplatesViewWordingType.TAB_Imbalanced]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.TAB_Imbalanced}`,
            defaultMessage: 'Imbalanced'
        }),
        [ImpactTemplatesViewWordingType.TAB_BetSlip]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.TAB_BetSlip}`,
            defaultMessage: 'Bet Slip'
        }),
        [ImpactTemplatesViewWordingType.TAB_Parlay]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.TAB_Parlay}`,
            defaultMessage: 'Parlay'
        }),
        [ImpactTemplatesViewWordingType.TAB_Market]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.TAB_Market}`,
            defaultMessage: 'Market'
        }),
        [ImpactTemplatesViewWordingType.Disable]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.Disable}`,
            defaultMessage: 'Disable'
        }),
        [ImpactTemplatesViewWordingType.Enable]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.Enable}`,
            defaultMessage: 'Enable'
        }),
        [ImpactTemplatesViewWordingType.HeavyBetting]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.HeavyBetting}`,
            defaultMessage: 'Heavy Betting'
        }),
        [ImpactTemplatesViewWordingType.LineSettings]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.LineSettings}`,
            defaultMessage: 'Line Settings'
        }),
        [ImpactTemplatesViewWordingType.Leagues]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.Leagues}`,
            defaultMessage: 'Leagues'
        }),
        [ImpactTemplatesViewWordingType.Margin]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.Margin}`,
            defaultMessage: 'Margin'
        }),
        [ImpactTemplatesViewWordingType.LABEL_New]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.LABEL_New}`,
            defaultMessage: 'New'
        }),
        [ImpactTemplatesViewWordingType.LABEL_Old]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.LABEL_Old}`,
            defaultMessage: 'Old'
        }),
        [ImpactTemplatesViewWordingType.OddsDeviationThreshold]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.OddsDeviationThreshold}`,
            defaultMessage: 'Odds Deviation Threshold'
        }),
        [ImpactTemplatesViewWordingType.OddsFeedProviderPriority]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.OddsFeedProviderPriority}`,
            defaultMessage: 'Odds Feed Provider Priority'
        }),
        [ImpactTemplatesViewWordingType.ParlaySetting]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.ParlaySetting}`,
            defaultMessage: 'Parlay Bet Setting'
        }),
        [ImpactTemplatesViewWordingType.SGPSetting]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.SGPSetting}`,
            defaultMessage: 'SGP'
        }),
        [ImpactTemplatesViewWordingType.TemplateName]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.TemplateName}`,
            defaultMessage: 'Template Name'
        }),
        [ImpactTemplatesViewWordingType.DeviationResponseActions]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.DeviationResponseActions}`,
            defaultMessage: 'Deviation Response Actions'
        }),
        [ImpactTemplatesViewWordingType.FeederOddsMinimumSetting]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.FeederOddsMinimumSetting}`,
            defaultMessage: 'Feeder Odds Minimum Setting'
        }),
        [ImpactTemplatesViewWordingType.ImbalancedBettingSetting]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.ImbalancedBettingSetting}`,
            defaultMessage: 'Imbalanced Betting Setting'
        }),
        [ImpactTemplatesViewWordingType.DelayedAcceptanceSetting]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.DelayedAcceptanceSetting}`,
            defaultMessage: 'Delayed Acceptance Setting'
        }),
        [ImpactTemplatesViewWordingType.SingleBetSetting]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.SingleBetSetting}`,
            defaultMessage: 'Single Bet Setting'
        }),
        [ImpactTemplatesViewWordingType.Markets]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.Markets}`,
            defaultMessage: 'Markets'
        }),
        [ImpactTemplatesViewWordingType.MinimumLegs]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.MinimumLegs}`,
            defaultMessage: 'Minimum Legs'
        }),
        [ImpactTemplatesViewWordingType.MaximumLegs]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.MaximumLegs}`,
            defaultMessage: 'Maximum Legs'
        }),
        [ImpactTemplatesViewWordingType.MinimumOdds]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.MinimumOdds}`,
            defaultMessage: 'Minimum Odds'
        }),
        [ImpactTemplatesViewWordingType.MaximumOdds]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.MaximumOdds}`,
            defaultMessage: 'Maximum Odds'
        }),
        [ImpactTemplatesViewWordingType.MaximumPayout]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.MaximumPayout}`,
            defaultMessage: 'Maximum Payout'
        }),
        [ImpactTemplatesViewWordingType.SearchLeague]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.SearchLeague}`,
            defaultMessage: 'Search League'
        }),
        [ImpactTemplatesViewWordingType.TAB_Alert]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.TAB_Alert}`,
            defaultMessage: 'Alert'
        }),
        [ImpactTemplatesViewWordingType.TAB_MarketControl]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.TAB_MarketControl}`,
            defaultMessage: 'Market Control'
        }),
        [ImpactTemplatesViewWordingType.TAB_RapidBet]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.TAB_RapidBet}`,
            defaultMessage: 'Rapid Bet'
        }),
        [ImpactTemplatesViewWordingType.TAB_Settlement]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.TAB_Settlement}`,
            defaultMessage: 'Settlement'
        }),
        [ImpactTemplatesViewWordingType.FeederSuspendMarket]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.FeederSuspendMarket}`,
            defaultMessage: 'Feeder Suspend Market'
        }),
        [ImpactTemplatesViewWordingType.DangerAttackAction]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.DangerAttackAction}`,
            defaultMessage: 'Danger Attack Action'
        }),
        [ImpactTemplatesViewWordingType.BetSlipAmountImbalanceSetting]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.BetSlipAmountImbalanceSetting}`,
            defaultMessage: 'Bet Slip Amount Imbalance Setting'
        }),
        [ImpactTemplatesViewWordingType.BelowTheMarginSetting]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.BelowTheMarginSetting}`,
            defaultMessage: 'Below The Margin Setting'
        }),
        [ImpactTemplatesViewWordingType.TAB_BetSlipRisks]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.TAB_BetSlipRisks}`,
            defaultMessage: 'Risk'
        }),
        [ImpactTemplatesViewWordingType.ParlayAlertSettings]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.ParlayAlertSettings}`,
            defaultMessage: 'Parlay Alert Settings'
        }),
        [ImpactTemplatesViewWordingType.RapidBetEntrySettings]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.RapidBetEntrySettings}`,
            defaultMessage: 'Rapid Bet Entry Settings'
        }),
        [ImpactTemplatesViewWordingType.AutoSettlementSettings]: intl.formatMessage({
            id: `${tempFunType}.${ImpactTemplatesViewWordingType.AutoSettlementSettings}`,
            defaultMessage: 'Auto Settlement Settings'
        }),
    };

    const getTranslatedWord = (wordingType: ImpactTemplatesViewWordingType) => {
        return translationMap[wordingType] || '';
    }

    return {getTranslatedWord};
};
