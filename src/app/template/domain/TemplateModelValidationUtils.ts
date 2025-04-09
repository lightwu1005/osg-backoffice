import lodash from "lodash";
import {
    range0To100,
    range0To999,
    range1To100,
    range1To99,
    range1To999,
    range1To999999999,
    range2To999
} from "@/utils/rangeLimits";
import {getEnumValueByKey, hasOverLimit} from "@/modules/common/DataProcessUnit";
import {
    Deviation,
    EventMarketHeavyBettingModel,
    EventMarketImbalanceBettingsModel,
    EventMarketOddsSettingsModel,
    EventMarketProviderPriorityModel,
    GetTemplateDetailModel,
    MarketConfigModel
} from "@/services/@core/module/ResponseDataModels";
import {
    TemplateSummaryEnableType,
    TemplateSummaryUsedModel
} from "@/app/eventDetail/models/dataModel/EventDetailOddsDataModel";
import {BetSlipSettingDataModel} from "@/app/template/models/TemplateDetailDataModel";
import {allFirstCharToUpperCase} from "@/modules/common/DisplayFormatConverter";
import {LineSettingsOptions} from "@/app/eventDetail/models/dataModel/MarketSettingDataModel";

export const isTruthy = (value: any): boolean => {
    return value === 0 || !!value
}

export const customCompare = (val1: any, val2: any) => {
    if (val1 == null && val2 == null) return true

    if (typeof val1 === 'string' && typeof val2 === 'number') {
        return val1 === String(val2)
    }
    if (typeof val1 === 'number' && typeof val2 === 'string') {
        return String(val1) === val2
    }

    return undefined
}

export interface GetTemplateDetailModelWithoutData {
    eventType: string;
    templateId?: string;
    templateName?: string;
    sportId: string;
    sportName: string;
    providerPriority?: EventMarketProviderPriorityModel[];
    oddsSettings: EventMarketOddsSettingsModel;
    margin: number;
    lineSettings: string | 'NO_LIMIT' | 'MAINLINE_ONLY';
    deviation: Deviation;
    imbalanceBettings: EventMarketImbalanceBettingsModel;
    heavyBettings: EventMarketHeavyBettingModel;
    isDefault?: boolean;
    marketSettings?: MarketConfigModel[];
}

export const validateMargin = (margin: number, marginRange: [number, number]): boolean => {
    return margin ? !hasOverLimit(margin, marginRange) : true;
};

export const validateFeedOdds = (feedOdds: any, oddsMin: [number, number], oddsMax: [number, number]): boolean => {
    return (
        isValueWithinRange(feedOdds?.minimum, oddsMin) &&
        isValueWithinRange(feedOdds?.maximum, oddsMax) &&
        isValueWithinRange(feedOdds?.difference, range0To100)
    );
};

export const validateDeviation = (deviation: any): boolean => {
    return isValueWithinRange(deviation?.percentage, range0To999);
};

export const validateImbalancedBettingDecrease = (imbalancedBettingDecrease: any, decreaseRange: [number, number]): boolean => {
    return (
        validateLimit(imbalancedBettingDecrease?.decrease, decreaseRange) &&
        validateTruthyLimit(imbalancedBettingDecrease?.difference, range1To100) &&
        validateTruthyLimit(imbalancedBettingDecrease?.recalculate, range1To999999999)
    );
};

export const validateHeavyBetting = (heavyBetting: any, decreaseRange: [number, number]): boolean => {
    return (
        validateTruthyLimit(heavyBetting?.timeLimit, range1To999) &&
        validateTruthyLimit(heavyBetting?.amount, range1To999999999) &&
        validateLimit(heavyBetting?.decrease, decreaseRange)
    );
};

export const validateBetSlipSetting = (betSlipSetting: BetSlipSettingDataModel, belowMarginLimit: [number, number], passRateOptions: string[]): boolean => {
    if (!betSlipSetting) return true

    const isValidImbalance = betSlipSetting.imbalanceSettings?.type === 'PERCENTAGE'
        ? isValueWithinRange(betSlipSetting.imbalanceSettings?.autoAccept, range1To99)
        : isValueWithinRange(betSlipSetting.imbalanceSettings?.autoAccept, range1To999999999)

    const isValidParlayAlert = betSlipSetting.parlayAlert.type === 'LEGS' ? isValueWithinRange(betSlipSetting.parlayAlert?.targetNumber, range2To999) : true

    const rangesToValidate = [
        { value: betSlipSetting.belowMarginSettings?.margin, range: belowMarginLimit },
        { value: betSlipSetting.delayedSettings?.delayedSecond, range: range1To999 },
        { value: betSlipSetting.singleBetSettings?.minimum, range: range1To999999999 },
        { value: betSlipSetting.singleBetSettings?.maximum, range: range1To999999999 },
        { value: betSlipSetting.singleBetSettings?.maxPayout, range: range1To999999999 },
        { value: betSlipSetting.parlaySettings?.minimumLegs, range: range2To999 },
        { value: betSlipSetting.parlaySettings?.maximumLegs, range: range2To999 },
        { value: betSlipSetting.parlaySettings?.minimum, range: range1To999999999 },
        { value: betSlipSetting.parlaySettings?.maximum, range: range1To999999999 },
        { value: betSlipSetting.parlaySettings?.maxPayout, range: range1To999999999 },
        { value: betSlipSetting.sgpSettings?.minimumLegs, range: range2To999 },
        { value: betSlipSetting.sgpSettings?.maximumLegs, range: range2To999 },
        { value: betSlipSetting.sgpSettings?.minimum, range: range1To999999999 },
        { value: betSlipSetting.sgpSettings?.maximum, range: range1To999999999 },
        { value: betSlipSetting.sgpSettings?.maxPayout, range: range1To999999999 },
    ]

    const areRangesValid = rangesToValidate.every(({ value, range }) =>
        isValueWithinRange(value, range)
    )

    const parlayAlertRecipients = lodash.isEmpty(betSlipSetting.parlayAlert?.alertRecipients)
    const belowMarginAlertRecipients = lodash.isEmpty(betSlipSetting.belowMarginSettings?.alertRecipients)

    return isValidImbalance && isValidParlayAlert && areRangesValid && !parlayAlertRecipients && !belowMarginAlertRecipients
}

export const validateLeagueIds = (response: GetTemplateDetailModel, leagues: string[]): boolean => {
    return lodash.isNull(response?.leagues) && lodash.isEmpty(leagues)
        ? true
        : lodash.isEqual(
            response?.leagues?.map((item: { leagueId: string }) => item.leagueId)?.toSorted((a: string, b: string) => a.localeCompare(b)),
            leagues.toSorted((a: string, b: string) => a.localeCompare(b))
        );
}

export const validateLimit = (value: number | undefined, range: [number, number]): boolean => {
    return value && range ? !hasOverLimit(value, range) : true;
}

export const isValueWithinRange = (value: number | undefined, range: [number, number]): boolean => {
    return value !== undefined && range ? !hasOverLimit(value, range) : true;
};

export const validateTruthyLimit = (value: number | undefined, range: [number, number]): boolean => {
    return isTruthy(value) ? isValueWithinRange(value, range) : true;
};

export interface IsOutOfRangeParams {
    margin: number;
    marginRange: [number, number];
    feedOdds: any;
    oddsMin: [number, number];
    oddsMax: [number, number];
    deviation: any;
    imbalancedBettingDecrease: any;
    decreaseRange: [number, number];
    heavyBetting: any;
    betSlipSetting: BetSlipSettingDataModel;
    belowMarginLimit: [number, number];
    passRateOptions: string[];
}

export const isOutOfRange = ({
                                 margin,
                                 marginRange,
                                 feedOdds,
                                 oddsMin,
                                 oddsMax,
                                 deviation,
                                 imbalancedBettingDecrease,
                                 decreaseRange,
                                 heavyBetting,
                                 betSlipSetting,
                                 belowMarginLimit,
                                 passRateOptions,
                             }: IsOutOfRangeParams): boolean => {
    const isMarginValid = validateMargin(margin, marginRange);
    const isFeedOddsValid = validateFeedOdds(feedOdds, oddsMin, oddsMax);
    const isDeviationValid = validateDeviation(deviation);
    const isImbalancedBettingDecreaseValid = validateImbalancedBettingDecrease(imbalancedBettingDecrease, decreaseRange);
    const isHeavyBettingValid = validateHeavyBetting(heavyBetting, decreaseRange);
    const isBetSlipSettingValid = validateBetSlipSetting(betSlipSetting, belowMarginLimit, passRateOptions)

    return (
        isMarginValid &&
        isFeedOddsValid &&
        isDeviationValid &&
        isImbalancedBettingDecreaseValid &&
        isHeavyBettingValid &&
        isBetSlipSettingValid
    );
};

export const isValidateDefaultSettings = (response: any, isDefault: boolean): boolean => {
    return lodash.isEqual(response?.isDefault, isDefault);
};

export const validateDelayedSettings = (response: any, delayedSecond: number, situationEvent: string[]): boolean => {
    const situation: string[] = lodash.isArray(situationEvent)
        ? lodash.sortBy(situationEvent.map((item) => allFirstCharToUpperCase(item)))
        : []
    const resSituation = lodash.sortBy(response?.delayedSettings?.situation?.map((item: string) => allFirstCharToUpperCase(item)))

    const isValidDelaySec = lodash.isUndefined(delayedSecond) &&
    lodash.isUndefined(response?.delayedSettings?.delayedSecond)
        ? true
        : lodash.isEqualWith(Number(delayedSecond), response?.delayedSettings?.delayedSecond, customCompare);

    const isValidDelayEvent = lodash.isEmpty(situation) &&
    lodash.isUndefined(resSituation)
        ? true
        : lodash.isEqualWith(situation, resSituation, customCompare);

    return isValidDelaySec && isValidDelayEvent;
};

export const isDataEqualBetSlipSetting = (response: any, betslipSetting: BetSlipSettingDataModel): boolean => {
    const resBetSlipSetting: Omit<BetSlipSettingDataModel, 'delayedSettings'> = {
        feederSuspend: response?.feederSuspend,
        dangerAttackAction: response?.dangerAttackAction,
        belowMarginSettings: response?.belowMarginSettings,
        singleBetSettings: response?.singleBetSettings,
        parlaySettings: response?.parlaySettings,
        sgpSettings: response?.sgpSettings,
        parlayAlert: response?.parlayAlert,
        rapidBetEntrySettings: response?.rapidBetEntrySettings,
        autoSettlementSettings: response?.autoSettlementSettings,
        imbalanceSettings: response?.imbalanceSettings,
    }

    const isValidDelayedSettings = validateDelayedSettings(response, betslipSetting?.delayedSettings?.delayedSecond, betslipSetting?.delayedSettings?.situation ?? [])
    return lodash.isEqualWith(resBetSlipSetting, lodash.omit(betslipSetting, 'delayedSettings'), customCompare) && isValidDelayedSettings
}

export interface EditDataValidationParams {
    response: any;
    refSetting: GetTemplateDetailModelWithoutData;
    resource: GetTemplateDetailModelWithoutData;
    lineSettings: string;
    refMarketSettings: MarketConfigModel[];
    leagues?: string[];
    isDefault?: boolean;
    betSlipSetting: BetSlipSettingDataModel;
}

export const isValidEditData = ({
                                    response,
                                    refSetting,
                                    resource,
                                    lineSettings,
                                    refMarketSettings,
                                    leagues,
                                    isDefault,
                                    betSlipSetting,
                                }: EditDataValidationParams): boolean => {
    const isValidLeagueIds = lodash.isNil(leagues) ? true : validateLeagueIds(response, leagues);
    const isValidDefault = lodash.isNil(isDefault) ? true : isValidateDefaultSettings(response, isDefault);
    const isEqualBetSlipSetting = isDataEqualBetSlipSetting(response, betSlipSetting)
    const isProviderPriorityEqual = JSON.stringify(resource.providerPriority?.map(item => item.provider)) === JSON.stringify(refSetting.providerPriority?.map(item => item.provider))
    const isLineSettingsEqual = lodash.isEqual(lineSettings, response?.lineSettings)
    const refMarketSettingsMod = refMarketSettings.map(item => ({
        ...item,
        lineSettings: getEnumValueByKey(LineSettingsOptions, item.lineSettings) ?? item.lineSettings
    }))
    const isMarketSettingsEqual = lodash.isEqualWith(lodash.sortBy(response?.marketSettings, "marketId"), lodash.sortBy(refMarketSettingsMod, "marketId"), customCompare)
    const isSettingsEqual = lodash.isEqualWith(lodash.omit(resource, ["providerPriority", "marketSettings"]), lodash.omit(refSetting, ["providerPriority", "marketSettings"]), customCompare)
    return (
        isSettingsEqual &&
        isValidLeagueIds &&
        isValidDefault &&
        isEqualBetSlipSetting &&
        isProviderPriorityEqual &&
        isLineSettingsEqual &&
        isMarketSettingsEqual
    )
}

export const checkIsRequiredFieldsFilled = (model: TemplateSummaryUsedModel): boolean => {
    const isFilled = (value: any) => {
        return value !== undefined && value !== null && value !== '' && (typeof value === 'number' ? !isNaN(value) : true);
    };

    const isEventTypeValid = isFilled(model.eventType)
    const isTemplateNameValid = isFilled(model.templateName)
    const isSportIdValid = isFilled(model.sportId)
    const isProviderPriorityValid = !lodash.isEmpty(model.providerPriority)
    const isMarginValid = isFilled(model.margin)

    const isOddsSettingValid = isFilled(model.oddsSettings?.minimum) && isFilled(model.oddsSettings?.maximum) && isFilled(model.oddsSettings?.difference)

    const isLineSettingsValid = isFilled(model.lineSettings)
    const isDeviationPercentageValid = isFilled(model.deviation?.percentage)
    const isDeviationActionValid = isFilled(model.deviation?.action)

    const isImbalanceDecreaseUpdateTypeValid = isFilled(model.imbalanceBettings?.updateType)
    const isImbalanceDecreaseDifferenceValid = isFilled(model.imbalanceBettings?.difference)
    const isImbalanceDecreaseRecalculateValid = isFilled(model.imbalanceBettings?.recalculate)
    const isImbalancedDecreaseDecreaseValid = model.imbalanceBettings?.updateType === 'MANUAL' ? isFilled(model.imbalanceBettings?.decrease) : true

    const isHeavyBettingsUpdateTypeValid = isFilled(model.heavyBettings?.updateType)
    const isHeavyBettingsDecreaseValid = model.heavyBettings?.updateType === 'MANUAL' ? isFilled(model.heavyBettings?.decrease) : true

    const isIsDefaultValid = isFilled(model.isDefault)
    const isFeederSuspendValid = isFilled(model.feederSuspend)
    const isDangerAttackActionValid = isFilled(model.dangerAttackAction)

    const isImbalanceSettingsAutoAcceptValid = isFilled(model.imbalanceSettings?.autoAccept)
    const isImbalanceSettingsTypeValid = isFilled(model.imbalanceSettings?.type)
    const isImbalanceSettingsActionValid = isFilled(model.imbalanceSettings?.action)

    const isBelowMarginSettingsValid = isFilled(model.belowMarginSettings?.margin) && !lodash.isEmpty(model.belowMarginSettings?.alertRecipients)
    const isDelayedSettingsValid = isFilled(model.delayedSettings?.delayedSecond)

    const isSingleBetValid = isFilled(model.singleBetSettings?.minimum) && isFilled(model.singleBetSettings?.maximum) && isFilled(model.singleBetSettings?.maxPayout)

    const isParlayMinimumLegsValid = isFilled(model.parlaySettings?.minimumLegs);
    const isParlayMaximumLegsValid = isFilled(model.parlaySettings?.maximumLegs);
    const isParlayMinimumValid = isFilled(model.parlaySettings?.minimum);
    const isParlayMaximumValid = isFilled(model.parlaySettings?.maximum);
    const isParlayMaxPayoutValid = isFilled(model.parlaySettings?.maxPayout);

    const areParlaySettingsValid =
        isParlayMinimumLegsValid &&
        isParlayMaximumLegsValid &&
        isParlayMinimumValid &&
        isParlayMaximumValid &&
        isParlayMaxPayoutValid

    const isSgpMinimumLegsValid = isFilled(model.sgpSettings?.minimumLegs);
    const isSgpMaximumLegsValid = isFilled(model.sgpSettings?.maximumLegs);
    const isSgpMinimumValid = isFilled(model.sgpSettings?.minimum);
    const isSgpMaximumValid = isFilled(model.sgpSettings?.maximum);
    const isSgpMaxPayoutValid = isFilled(model.sgpSettings?.maxPayout);

    const areSgpSettingsValuesValid =
        isSgpMinimumLegsValid &&
        isSgpMaximumLegsValid &&
        isSgpMinimumValid &&
        isSgpMaximumValid &&
        isSgpMaxPayoutValid

    const isParlayAlertValid = isFilled(model.parlayAlert?.potentialWin) && isFilled(model.parlayAlert?.targetNumber) && !lodash.isEmpty(model.parlayAlert?.alertRecipients) && isFilled(model.parlayAlert?.type) && isFilled(model.parlayAlert?.sendEmail)

    const isRapidBetEntrySettingsValid = isFilled(model.rapidBetEntrySettings?.numberOfBets) && isFilled(model.rapidBetEntrySettings?.suspendLine) && isFilled(model.rapidBetEntrySettings?.triggerTime)
    const isAutoSettlementSettingsValid = model.autoSettlementSettings?.enabled === "true" ? isFilled(model.autoSettlementSettings?.delaySettlement) : true

    const isAutoSettlementSettingsDelaySettlementValid = isFilled(model.autoSettlementSettings?.delaySettlement)

    const isDelayedSettingsSituationValid = lodash.isArray(model.delayedSettings?.situation) && model.delayedSettings?.situation?.length > 0

    return (
        isEventTypeValid &&
        isTemplateNameValid &&
        isSportIdValid &&
        isOddsSettingValid &&
        isMarginValid &&
        isLineSettingsValid &&
        isDeviationPercentageValid &&
        isDeviationActionValid &&
        isImbalanceDecreaseUpdateTypeValid &&
        isImbalanceDecreaseDifferenceValid &&
        isImbalanceDecreaseRecalculateValid &&
        isImbalancedDecreaseDecreaseValid &&
        isHeavyBettingsUpdateTypeValid &&
        isHeavyBettingsDecreaseValid &&
        isIsDefaultValid &&
        isFeederSuspendValid &&
        isDangerAttackActionValid &&
        isImbalanceSettingsAutoAcceptValid &&
        isImbalanceSettingsTypeValid &&
        isImbalanceSettingsActionValid &&
        isBelowMarginSettingsValid &&
        isDelayedSettingsValid &&
        isSingleBetValid &&
        areParlaySettingsValid &&
        areSgpSettingsValuesValid &&
        isParlayAlertValid &&
        isRapidBetEntrySettingsValid &&
        isAutoSettlementSettingsValid &&
        isAutoSettlementSettingsDelaySettlementValid &&
        isDelayedSettingsSituationValid &&
        isProviderPriorityValid
    );
};


export const getEnabledStatus = (value: any): TemplateSummaryEnableType => {
    if (value === undefined) return "none"
    return value ? "true" : "false"
}