import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

export enum RiskLevelGroupWordingType {
    CreateRiskGroup = "riskLevelGroup.createRiskGroup",
    EditRiskGroup = "riskLevelGroup.editRiskGroup",
    RiskName = "riskLevelGroup.riskName",
    TagColor = "riskLevelGroup.tagColor",
    BetAmountSetting = "riskLevelGroup.betAmountSetting",
    MinimumAmount = "riskLevelGroup.minimumAmount",
    MaximumAmount = "riskLevelGroup.maximumAmount",
    WinlossRateSetting = "riskLevelGroup.winLossRateSetting",
    SuccessBetting = "riskLevelGroup.successBetting",
    StartToCountDayInterval = "riskLevelGroup.startToCountDayInterval",
    WinlossRate = "riskLevelGroup.winLossRate",
    BetLimitation = "riskLevelGroup.betLimitation",
    DailyBettingLimit = "riskLevelGroup.dailyBettingLimit",
    SingleBetLimitation = "riskLevelGroup.singleBetLimitation",
    DailyBettingLimitation = "riskLevelGroup.dailyBettingLimitation",
    OddsAdjustment = "riskLevelGroup.oddsAdjustment",
    AmountAdjustmentPercentage = "riskLevelGroup.amountAdjustmentPercentage",
    DelayedBetSlipAcceptance = "riskLevelGroup.delayedBetSlipAcceptance",
    Tag = "riskLevelGroup.tag",
    PublishButton = "riskLevelGroup.publishButton",
    SuspiciousMember = "riskLevelGroup.suspiciousMember",
    UnusualIP = "riskLevelGroup.unusualIP",
    InputValidRiskName = "riskLevelGroup.inputValidRiskName",
    MaxGreaterThanMin = "riskLevelGroup.maxGreaterThanMin",
    MinimumLessThanMaximum = "riskLevelGroup.minimumLessThanMaximum",

    // Tooltips
    BetAmountSettingTooltip = "riskLevelGroup.tooltips.betAmountSetting",
    WinlossRateSettingTooltip = "riskLevelGroup.tooltips.winLossRateSetting",
    BetLimitationTooltip = "riskLevelGroup.tooltips.betLimitation",
    TagTooltip = "riskLevelGroup.tooltips.tag"
}

export const useRiskLevelGroupTranslate = () => {
    const intl = useIntl();
    const tempFunType = LocalizationFunctionType.Member;

    const translationMap = {
        [RiskLevelGroupWordingType.CreateRiskGroup]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.CreateRiskGroup}`,
            defaultMessage: 'Create Risk Group'
        }),
        [RiskLevelGroupWordingType.EditRiskGroup]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.EditRiskGroup}`,
            defaultMessage: 'Edit Risk Group'
        }),
        [RiskLevelGroupWordingType.RiskName]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.RiskName}`,
            defaultMessage: 'Risk Name'
        }),
        [RiskLevelGroupWordingType.TagColor]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.TagColor}`,
            defaultMessage: 'Tag Color'
        }),
        [RiskLevelGroupWordingType.BetAmountSetting]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.BetAmountSetting}`,
            defaultMessage: 'Bet Amount Setting'
        }),
        [RiskLevelGroupWordingType.MinimumAmount]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.MinimumAmount}`,
            defaultMessage: 'Minimum Amount'
        }),
        [RiskLevelGroupWordingType.MaximumAmount]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.MaximumAmount}`,
            defaultMessage: 'Maximum Amount'
        }),
        [RiskLevelGroupWordingType.WinlossRateSetting]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.WinlossRateSetting}`,
            defaultMessage: 'Winloss Rate Setting'
        }),
        [RiskLevelGroupWordingType.SuccessBetting]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.SuccessBetting}`,
            defaultMessage: 'Success betting'
        }),
        [RiskLevelGroupWordingType.StartToCountDayInterval]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.StartToCountDayInterval}`,
            defaultMessage: 'Start to Count Day Interval (Day)'
        }),
        [RiskLevelGroupWordingType.WinlossRate]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.WinlossRate}`,
            defaultMessage: 'Winloss Rate'
        }),
        [RiskLevelGroupWordingType.BetLimitation]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.BetLimitation}`,
            defaultMessage: 'Bet Limitation'
        }),
        [RiskLevelGroupWordingType.DailyBettingLimit]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.DailyBettingLimit}`,
            defaultMessage: 'Daily Betting Limit'
        }),
        [RiskLevelGroupWordingType.SingleBetLimitation]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.SingleBetLimitation}`,
            defaultMessage: 'Single Bet Limitation'
        }),
        [RiskLevelGroupWordingType.DailyBettingLimitation]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.DailyBettingLimitation}`,
            defaultMessage: 'Daily Betting Limitation'
        }),
        [RiskLevelGroupWordingType.OddsAdjustment]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.OddsAdjustment}`,
            defaultMessage: 'Odds Adjustment (Frame)'
        }),
        [RiskLevelGroupWordingType.AmountAdjustmentPercentage]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.AmountAdjustmentPercentage}`,
            defaultMessage: 'Amount Adjustment %'
        }),
        [RiskLevelGroupWordingType.DelayedBetSlipAcceptance]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.DelayedBetSlipAcceptance}`,
            defaultMessage: 'Delayed Bet Slip Acceptance (Second)'
        }),
        [RiskLevelGroupWordingType.Tag]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.Tag}`,
            defaultMessage: 'Tag'
        }),
        [RiskLevelGroupWordingType.PublishButton]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.PublishButton}`,
            defaultMessage: 'Publish'
        }),
        [RiskLevelGroupWordingType.SuspiciousMember]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.SuspiciousMember}`,
            defaultMessage: 'Suspicious Member'
        }),
        [RiskLevelGroupWordingType.UnusualIP]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.UnusualIP}`,
            defaultMessage: 'Unusual IP'
        }),
        [RiskLevelGroupWordingType.InputValidRiskName]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.InputValidRiskName}`,
            defaultMessage: 'Please input valid risk name'
        }),
        [RiskLevelGroupWordingType.MaxGreaterThanMin]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.MaxGreaterThanMin}`,
            defaultMessage: 'Max should be greater than Min'
        }),
        [RiskLevelGroupWordingType.MinimumLessThanMaximum]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.MinimumLessThanMaximum}`,
            defaultMessage: 'Minimum should be less than Maximum'
        }),
        // Tooltips
        [RiskLevelGroupWordingType.BetAmountSettingTooltip]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.BetAmountSettingTooltip}`,
            defaultMessage: 'Setting the minimum/maximum betting limits.'
        }),
        [RiskLevelGroupWordingType.WinlossRateSettingTooltip]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.WinlossRateSettingTooltip}`,
            defaultMessage: 'Setting the number of successful bets and win rate within a specific time period. The system will group members based on these conditions.'
        }),
        [RiskLevelGroupWordingType.BetLimitationTooltip]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.BetLimitationTooltip}`,
            defaultMessage: 'Setting daily betting limits or single bet limits, and adjust member odds, betting limits, and bet slip delays accordingly.'
        }),
        [RiskLevelGroupWordingType.TagTooltip]: intl.formatMessage({
            id: `${tempFunType}.${RiskLevelGroupWordingType.TagTooltip}`,
            defaultMessage: 'Setting member tags for this group.'
        })
    };

    const getTranslatedWord = (wordingType: RiskLevelGroupWordingType) => {
        return translationMap[wordingType] || '';
    }

    return {getTranslatedWord};
};
