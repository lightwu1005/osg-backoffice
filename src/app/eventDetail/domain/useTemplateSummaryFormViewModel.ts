import {ComeFromPage, TemplateSummaryFormProps} from "@/app/eventDetail/components/pageComponent/TemplateSummaryForm";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {TemplateSummaryCardProps} from "@/app/eventDetail/components/TemplateSummaryCard";
import {
    EventMarketProviderPriorityModel,
    GetTemplateDetailModel,
    ImbalanceSetting,
    ParlaySGPSetting,
    UpdateEventMarketSettingsModel
} from "@/services/@core/module/ResponseDataModels";
import lodash from "lodash"
import useEventRepository from "@/services/@event/repository/useEventRepository";
import {AlertDialogProps} from "@/modules/components/dialog/AlertDialog";
import {GlobalController} from "@/modules/common/GlobalController";
import {SummaryCardItemType} from "@/app/eventDetail/components/TemplateSummaryCardItem";
import useTemplateRepository from "@/services/@template/respository/useTemplateRepository";
import {
    toAddTemplateProps,
    toUpdateEventMarketSetting,
    toUpdateTemplate
} from "@/app/eventDetail/models/RequestDataMapping";
import {DeviationOption} from "@/app/eventDetail/models/dataModel/MarketSettingDataModel";
import {ParlayType, TemplateSummaryParlayBetProps} from "@/app/eventDetail/components/TemplateSummaryParlayBet";
import {PostTemplate, UpdateTemplateDetail} from "@/services/@core/module/CommonDataModels";
import {getEnumKeyByValue, getEnumValueByKey} from "@/modules/common/DataProcessUnit";
import {allFirstCharToUpperCase} from "@/modules/common/DisplayFormatConverter";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {useIntl} from "react-intl";
import {ImpactTemplatesViewProps} from "@/app/template/pageComponent/ImpactTemplatesView";
import {
    LocalMarketSetting,
    marketSettingToMarketConfigModel,
    TemplateSummaryEnableType,
    TemplateSummaryUsedModel
} from "@/app/eventDetail/models/dataModel/EventDetailOddsDataModel";
import {DangerAttackActionType, FeederSuspendActionType,} from "@/app/template/models/actionType";
import {TemplateBetSlipAmountSettingsProps} from "@/app/eventDetail/components/TemplateSummaryBetSlipSetting";
import {ComponentType} from "@/app/template/domain/useTemplateFormViewModel";
import {StatusButtonGroupProps} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup";
import {TemplateSummaryMarketSettingsProps} from "@/app/template/pageComponent/SummaryMarketsSetting";
import {GetTemplateDefaultConflictsParameters} from "@/app/template/models/TemplateParameters";
import {toGetTemplateDefaultConflictsProps} from "@/app/template/models/RequestDataMapping";
import dayjs from "dayjs";

export enum SummaryPreViewStatus {
    NoConflict,
    Conflict,
    hasChanged
}

export type SummaryPropertyType = boolean | string | number | string[]
type DirectionType = 'left' | 'right' | 'none'

interface UpdatePaths {
    [key: string]: {
        relatedPath: string;
        relatedSetting: SummaryPropertyType
    };
}

enum ButtonTypes {
    BackToPreView = "buttonType.backToPreView",
    ConfirmSetting = "buttonType.confirmSetting",
    Cancel = "buttonType.cancel",
    IgnorePreviousSettingPublishDirectly = "buttonType.ignorePreviousSettingPublishDirectly",
    ResetPreviousAllSetting = "buttonType.resetPreviousAllSetting",
    ConfirmAllChanges = "buttonType.confirmAllChanges"
}

export function mergeDeep(preObj: any, refObj: any) {
    const result: any = {};

    const keys = lodash.union(lodash.keys(preObj), lodash.keys(refObj))

    keys.forEach(key => {
        const preVal = lodash.get(preObj, key)
        const refVal = lodash.get(refObj, key)

        if (lodash.isEqual(preVal, refVal)) {
            result[key] = preVal
        } else if (lodash.isObject(preVal) && lodash.isObject(refVal) && !lodash.isArray(preVal) && !lodash.isArray(refVal)) {
            result[key] = mergeDeep(preVal, refVal)
        } else {
            result[key] = getDefaultValueByType(preVal, refVal)
        }
    })

    return result
}

function getDefaultValueByType(preVal: any, refVal: any): any {
    if (lodash.isString(preVal) || lodash.isString(refVal)) {
        return ""
    } else if (lodash.isArray(preVal) || lodash.isArray(refVal)) {
        return []
    } else if (lodash.isNumber(preVal) || lodash.isNumber(refVal)) {
        return -1
    } else if (lodash.isBoolean(preVal) || lodash.isBoolean(refVal)) {
        return false
    } else {
        return null
    }
}

function checkIfInitialValue(value: any, initialValue: any): boolean {
    return lodash.isEqual(value, initialValue)
}

export function getSettingsValue(targetObj: any, refObj: any, initialValueChecks: any): any {
    const result = lodash.cloneDeep(targetObj)

    lodash.keys(result).forEach(key => {
        if (lodash.isObject(result[key]) && !lodash.isArray(result[key])) {
            result[key] = getSettingsValue(result[key], lodash.get(refObj, key), lodash.get(initialValueChecks, key))
        } else {
            if (checkIfInitialValue(result[key], lodash.get(initialValueChecks, key))) {
                result[key] = lodash.get(refObj, key)
            }
        }
    })

    return result
}

enum SummaryAlertDialogWording {
    TemplateConfirmTitle = "confirm.templateConfirmTitle",
    TemplateConfirmContent = "confirm.templateConfirmContent",
    MarketConfirmTitle = "confirm.marketConfirmTitle",
    MarketConfirmContent = "confirm.marketConfirmContent",
    TemplateDefaultTitle = "confirm.templateDefaultTitle",
    TemplateDefaultContent = "confirm.templateDefaultContent",
    TemplateAllMarketSettingTitle = "confirm.templateAllMarketSettingTitle",
    TemplateAllMarketSettingContent = "confirm.templateAllMarketSettingContent"
}

export function convertArrayToString(items: string[]) {
    return items.map(item => allFirstCharToUpperCase(item)).join(', ')
}

export function convertBooleanToString(statues: string[], value?: TemplateSummaryEnableType) {
    const trueOption = ["Enabled", "Selected", "true"]
    const falseOption = ["Disabled", "UnSelected", "false"]

    if (trueOption.includes(value as string)) {
        return statues[1]
    } else if (falseOption.includes(value as string)) {
        return statues[0]
    } else {
        return "none"
    }
}

const useTemplateSummaryFormViewModel = (props: TemplateSummaryFormProps) => {
    const initialValue: TemplateSummaryUsedModel = {
        "eventType": "",
        "sportId": "",
        "sportName": "",
        "templateId": "",
        "templateName": "",
        "leagueId": "",
        "isDefault": false,
        "leagueName": "",
        'leagueIds': [],
        "margin": -1,
        "oddsSettings": {
            "minimum": -1,
            "maximum": -1,
            "difference": -1
        },
        "providerPriority": [],
        "imbalanceBettings": {
            "updateType": "",
            "difference": -1,
            "decrease": -1,
            "recalculate": -1
        },
        "heavyBettings": {
            "updateType": "",
            "timeLimit": -1,
            "amount": -1,
            "decrease": -1
        },
        "singleBetSettings": {
            "minimum": -1,
            "maximum": -1,
            "maxPayout": -1
        },
        "delayedSettings": {
            "situation": [],
            "delayedSecond": -1
        },
        "parlaySettings": {
            "enabled": false,
            "minimumLegs": -1,
            "maximumLegs": -1,
            "minimum": -1,
            "maximum": -1,
            "maxPayout": -1
        },
        "sgpSettings": {
            "enabled": false,
            "minimumLegs": -1,
            "maximumLegs": -1,
            "minimum": -1,
            "maximum": -1,
            "maxPayout": -1
        },
        "lineSettings": "",
        "deviation": {
            "percentage": -1,
            "action": ""
        },
        "feederSuspend": "",
        "dangerAttackAction": "",
        "imbalanceSettings": {
            "type": "",
            "autoAccept": -1,
            "action": ""
        },
        "belowMarginSettings": {
            "margin": -1,
            "alertRecipients": []
        },
        "parlayAlert": {
            "type": "",
            "targetNumber": -1,
            "potentialWin": -1,
            "alertRecipients": [],
            "sendEmail": "none"
        },
        "rapidBetEntrySettings": {
            "enabled": "none",
            "triggerTime": -1,
            "numberOfBets": -1,
            "suspendLine": -1
        },
        "autoSettlementSettings": {
            "enabled": "none",
            "delaySettlement": -1
        },
        "marketSettings": []
    }

    const intl = useIntl()
    const funType = LocalizationFunctionType.Template
    const funCommonType = LocalizationFunctionType.Common
    const tipsWording = intl.formatMessage({
        id: `${funType}.confirmDifferentValue`,
        defaultMessage: 'Your previous setting is different please confirm the value'
    });
    const {
        adjustable,
        isDataFromConfiguration = false,
        comeFromPage,
        preValue,
        refValue,
        onFinished,
        gotoSettingPage,
        eventIds,
        marketId,
        isCustomized
    } = props
    const eventRepo = useEventRepository()
    const {updateEventMarketSettings} = eventRepo
    const templateRepo = useTemplateRepository()
    const {addTemplate, updateTemplateDetail, getTemplateDefaultConflicts} = templateRepo
    const [basicTemplateInfoProps, setBasicTemplateInfoProps] = useState<TemplateSummaryCardProps>()
    const [marginProps, setMarginProps] = useState<TemplateSummaryCardProps>()
    const [providerPriorityProps, setProviderPriorityProps] = useState<TemplateSummaryCardProps>()
    const [oddsSettingProps, setOddsSettingProps] = useState<TemplateSummaryCardProps>()
    const [decreaseSettingProps, setDecreaseSettingProps] = useState<TemplateSummaryCardProps>()
    const [heavyBettingProps, setHeavyBettingProps] = useState<TemplateSummaryCardProps>()
    const [singleBetProps, setSingleBetProps] = useState<TemplateSummaryCardProps>()
    const [delaySettingProps, setDelaySettingProps] = useState<TemplateSummaryCardProps>()
    const [parlayBetProps, setParlayBetProps] = useState<TemplateSummaryParlayBetProps>()
    const [sgpBetProps, setSgpBetProps] = useState<TemplateSummaryParlayBetProps>()
    const [lineSettingProps, setLineSettingProps] = useState<TemplateSummaryCardProps>()
    const [deviationProps, setDeviationProps] = useState<TemplateSummaryCardProps>()
    const [feederSuspendProps, setFeederSuspendProps] = useState<TemplateSummaryCardProps>()
    const [dangerAttackActionProps, setDangerAttackActionProps] = useState<TemplateSummaryCardProps>()
    const [betSlipAmountSettingsProps, setBetSlipAmountSettingsProps] = useState<TemplateBetSlipAmountSettingsProps>()
    const [bellowMarginSettingsProps, setBellowMarginSettingsProps] = useState<TemplateSummaryCardProps>()
    const [parlayAlertProps, setParlayAlertProps] = useState<TemplateSummaryCardProps>()
    const [rapidBetEntrySettingsProps, setRapidBetEntrySettingsProps] = useState<TemplateSummaryCardProps>()
    const [autoSettlementSettingsProps, setAutoSettlementSettingsProps] = useState<TemplateSummaryCardProps>()
    const [leftButtonName, setLeftButtonName] = useState("")
    const [rightButtonName, setRightButtonName] = useState("")
    const [submitValue, setSubmitValue] = useState<TemplateSummaryUsedModel>(lodash.cloneDeep(initialValue))
    const initStatusValue = useRef({...initialValue})
    const refMergedValue = mergeDeep(preValue, refValue)
    const [previewStatus, setPreviewStatus] = useState<SummaryPreViewStatus>(SummaryPreViewStatus.NoConflict)
    const globalController = GlobalController.getInstance()
    const [loading, setLoading] = useState(false)
    const [resetPreviousAll, setResetPreviousAll] = useState(false)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [publishTemplate, setPublishTemplate] = useState(false)
    const [parlaySettingShouldRest, setParlaySettingShouldRest] = useState(false)
    const [betSlipSettingShouldRest, setBetSlipSettingShouldRest] = useState(false)
    const [delaySituationOptions, setDelaySituationOptions] = useState<DirectionType>('none')
    const [belowMarginAlertRecipients, setBelowMarginAlertRecipients] = useState<DirectionType>('none')
    const [parlayAlertRecipients, setParlayAlertRecipients] = useState<DirectionType>('none')
    const [marketSettingsProps, setMarketSettingsProps] = useState<TemplateSummaryMarketSettingsProps>()

    const templateConfirmTitle = comeFromPage === ComeFromPage.AllMarketSetting ?
        intl.formatMessage({
            id: `${funType}.${SummaryAlertDialogWording.TemplateAllMarketSettingTitle}`,
            defaultMessage: 'Reminder'
        }) :
        submitValue.isDefault ?
            intl.formatMessage({
                id: `${funType}.${SummaryAlertDialogWording.TemplateDefaultTitle}`,
                defaultMessage: 'Set as Default Template?'
            }) :
            intl.formatMessage({
                id: `${funType}.${SummaryAlertDialogWording.TemplateConfirmTitle}`,
                defaultMessage: 'Apply the template?'
            });
    const templateConfirmContent = comeFromPage === ComeFromPage.AllMarketSetting ?
        intl.formatMessage({
            id: `${funType}.${SummaryAlertDialogWording.TemplateAllMarketSettingContent}`,
            defaultMessage: "This modification will only apply to this event and will not overwrite the original template settings."
        }) :
        submitValue.isDefault ?
            intl.formatMessage({
                id: `${funType}.${SummaryAlertDialogWording.TemplateDefaultContent}`,
                defaultMessage: 'Please confirm that each sport or league can have only one default template assigned.'
            }) :
            intl.formatMessage({
                id: `${funType}.${SummaryAlertDialogWording.TemplateConfirmContent}`,
                defaultMessage: 'Are you sure you want to change this template? it will be changed all line in the market.'
            })
    const marketConfirmTitle = comeFromPage === ComeFromPage.AllMarketSetting ?
        intl.formatMessage({
            id: `${funType}.${SummaryAlertDialogWording.TemplateAllMarketSettingTitle}`,
            defaultMessage: 'Reminder'
        }) :
        intl.formatMessage({
            id: `${funType}.${SummaryAlertDialogWording.MarketConfirmTitle}`,
            defaultMessage: 'Confirm the setting?'
        });
    const marketConfirmContent = comeFromPage === ComeFromPage.AllMarketSetting ?
        intl.formatMessage({
            id: `${funType}.${SummaryAlertDialogWording.TemplateAllMarketSettingContent}`,
            defaultMessage: "This modification will only apply to this event and will not overwrite the original template settings."
        }) :
        intl.formatMessage({
            id: `${funType}.${SummaryAlertDialogWording.MarketConfirmContent}`,
            defaultMessage: 'Are you sure you want to change the setting? it will be changed all markets in the event.'
        });

    const refAlertDialogProps = useRef<AlertDialogProps>({
        title: adjustable ? templateConfirmTitle : marketConfirmTitle,
        content: adjustable ? templateConfirmContent : marketConfirmContent,
        actions: [
            {
                type: 'cancel',
                text: intl.formatMessage({id: `${funCommonType}.cancel`, defaultMessage: 'Cancel'}),
                onClick: () => setShowConfirmDialog(false)
            },
            {
                type: 'confirm',
                text: intl.formatMessage({id: `${funCommonType}.confirm`, defaultMessage: 'Confirm'}),
                autoFocus: true,
                onClick: () => {
                    setPublishTemplate(true)
                    setShowConfirmDialog(false)
                }
            }
        ]
    })

    const [impactTemplateViewOpen, setImpactTemplateViewOpen] = useState(false)

    const impactTemplateData = useRef<ImpactTemplatesViewProps>(
        {
            newTemplates: [],
            oldTemplates: [],
            onFinished: () => {
                setImpactTemplateViewOpen(false)
            }
        }
    )

    useEffect(() => {
        updateTemplateCardProps()
    }, [submitValue])

    useEffect(() => {
        updatePreviewStatus()
    }, [submitValue])

    const hasConflict = useMemo(() => {
        const preValueFiltered = lodash.omit(preValue, ['id', 'eventId']);
        const refValueFiltered = lodash.omit(refValue, ['id', 'eventId']);

        return !lodash.isEqual(preValueFiltered, refValueFiltered);
    }, [preValue, refValue]);

    const hasChanged = useCallback(() => {
        const isEqualInitial = lodash.isEqual(submitValue, initStatusValue.current)
        const isEqualRefModel = lodash.isEqual(submitValue, refMergedValue)
        return !(isEqualInitial || isEqualRefModel)
    }, [submitValue])

    const updatePreviewStatus = useCallback(() => {
        if (!hasConflict) {
            setPreviewStatus(SummaryPreViewStatus.NoConflict);
        } else if (hasChanged()) {
            setPreviewStatus(SummaryPreViewStatus.hasChanged);
        } else if (previewStatus !== SummaryPreViewStatus.hasChanged) {
            setPreviewStatus(SummaryPreViewStatus.Conflict);
        }
    }, [submitValue])

    const backToPreView = intl.formatMessage({
        id: `${funType}.${ButtonTypes.BackToPreView}`,
        defaultMessage: 'BACK TO PREVIOUS'
    });
    const confirmSetting = intl.formatMessage({
        id: `${funType}.${ButtonTypes.ConfirmSetting}`,
        defaultMessage: 'CONFIRM'
    });
    const cancel = intl.formatMessage({id: `${funType}.${ButtonTypes.Cancel}`, defaultMessage: 'Cancel'});
    const ignorePreviousSettingPublishDirectly = intl.formatMessage({
        id: `${funType}.${ButtonTypes.IgnorePreviousSettingPublishDirectly}`,
        defaultMessage: 'Ignore Previous setting publish directly'
    });
    const resetPreviousAllSetting = intl.formatMessage({
        id: `${funType}.${ButtonTypes.ResetPreviousAllSetting}`, defaultMessage: 'Reset previous all setting'
    });
    const confirmAllChanges = intl.formatMessage({
        id: `${funType}.${ButtonTypes.ConfirmAllChanges}`,
        defaultMessage: 'Confirm all changes'
    });

    useEffect(() => {
        switch (previewStatus) {
            case SummaryPreViewStatus.NoConflict:
                setLeftButtonName(backToPreView)
                setRightButtonName(confirmSetting)
                break
            case SummaryPreViewStatus.Conflict:
                setLeftButtonName(cancel)
                setRightButtonName(ignorePreviousSettingPublishDirectly)
                break
            case SummaryPreViewStatus.hasChanged:
                setLeftButtonName(resetPreviousAllSetting)
                setRightButtonName(confirmAllChanges)
                break
        }
    }, [previewStatus])

    const handleProviderChange = useCallback((path: string) => (value: SummaryPropertyType) => {
        let providerPriorities: EventMarketProviderPriorityModel[] = []

        if (value === "left") {
            providerPriorities = preValue.providerPriority ?? []
        } else if (value === "right") {
            providerPriorities = refValue.providerPriority ?? []
        } else {
            providerPriorities = []
        }

        setSubmitValue(prev => {
            if (lodash.get(prev, path) === providerPriorities || providerPriorities.length === 0) return prev

            return lodash.set({...prev}, path, providerPriorities)
        })
    }, [])

    function isComeFromTemplatePage() {
        return comeFromPage === ComeFromPage.EditTemplate || comeFromPage === ComeFromPage.AddTemplate
    }

    const handleItemIdChange = useCallback((path: string) => (value: SummaryPropertyType) => {
        const pathsToUpdate: UpdatePaths = {
            "sportName": {
                relatedPath: "sportId",
                relatedSetting: value === preValue.sportName ? preValue.sportId : refValue.sportId
            },
            "leagueName": {
                relatedPath: isComeFromTemplatePage() ? "leagueIds" : 'leagueId',
                relatedSetting: (() => {
                    if (isComeFromTemplatePage()) {
                        return value === preValue.leagueName ? preValue.leagueIds ?? [] : refValue.leagueIds ?? [];
                    } else {
                        return value === preValue.leagueName ? preValue.leagueId ?? '' : refValue.leagueId ?? '';
                    }
                })()
            }
        };

        const setting = pathsToUpdate[path];
        if (!setting) return;

        setSubmitValue(prev => {
            if (lodash.get(prev, path) === value) return prev;

            let result = lodash.set({...prev}, path, value);
            result = lodash.set(result, setting.relatedPath, setting.relatedSetting);

            return result;
        });
    }, []);


    const handleParlayBetChange = useCallback((path: string) => (value?: ParlaySGPSetting) => {
        setSubmitValue(prev => {
            if (lodash.get(prev, path) === value) return prev
            setParlaySettingShouldRest(false)
            return lodash.set({...prev}, path, value)
        })
    }, [])

    const handleDelaySituationChange = useCallback((path: string) => (value: SummaryPropertyType) => {
        const stringToArray = (strItem: string) => {
            return strItem === '' ? [] : strItem.split(',').map(item => item.trim());
        }

        let situations: string[] = []

        if (value === "left") {
            situations = preValue.delayedSettings?.situation ?? []
            setDelaySituationOptions('left')
        } else if (value === "right") {
            situations = refValue.delayedSettings?.situation ?? []
            setDelaySituationOptions('right')
        } else {
            situations = typeof value === "string" ? stringToArray(value) : []
            setDelaySituationOptions('none')
        }

        setSubmitValue(prev => {
            if (lodash.get(prev, path) === value) return prev

            return lodash.set({...prev}, path, situations);
        });
    }, [])

    function convertModelBySpecificData<T>(updateTemplateInfo: TemplateSummaryUsedModel): T {

        const resultFeeder = getEnumKeyByValue(FeederSuspendActionType, updateTemplateInfo.feederSuspend) ?? updateTemplateInfo.feederSuspend
        const resultDanger = getEnumKeyByValue(DangerAttackActionType, updateTemplateInfo.dangerAttackAction) ?? updateTemplateInfo.dangerAttackAction

        const newModel = {
            ...updateTemplateInfo,
            feederSuspend: resultFeeder,
            dangerAttackAction: resultDanger,
            rapidBetEntrySettings: updateTemplateInfo.rapidBetEntrySettings
                ? {
                    ...updateTemplateInfo.rapidBetEntrySettings,
                    enabled: convertOptionToBoolean(updateTemplateInfo.rapidBetEntrySettings.enabled),
                }
                : undefined,
            autoSettlementSettings: updateTemplateInfo.autoSettlementSettings
                ? {
                    ...updateTemplateInfo.autoSettlementSettings,
                    enabled: convertOptionToBoolean(updateTemplateInfo.autoSettlementSettings.enabled),
                }
                : undefined,
            parlayAlert: updateTemplateInfo.parlayAlert
                ? {
                    ...updateTemplateInfo.parlayAlert,
                    sendEmail: convertOptionToBoolean(updateTemplateInfo.parlayAlert.sendEmail),
                }
                : undefined,
            isCustomized: isCustomized,
            templateName: comeFromPage === ComeFromPage.AllMarketSetting ?
                `${updateTemplateInfo.templateName}-${eventIds.join('-')}-${dayjs().unix()}` :
                updateTemplateInfo.templateName,
            marketSettings: updateTemplateInfo.marketSettings?.map(item => marketSettingToMarketConfigModel(item))
        };

        return newModel as unknown as T;
    }

    function convertOptionToBoolean(value: TemplateSummaryEnableType): boolean {
        const trueOption = ["Enabled", "Selected"]
        const falseOption = ["Disabled", "UnSelected"]

        if (trueOption.includes(value as string)) {
            return true
        } else if (falseOption.includes(value as string)) {
            return false
        } else {
            return value === "true"
        }
    }

    const handleDynamicChange = useCallback((path: string) => (value: SummaryPropertyType) => {

        if (path === 'imbalanceBettings.updateType' && value === 'AUTO') {
            setSubmitValue(prevState => {
                const {imbalanceBettings} = prevState
                return {
                    ...prevState,
                    imbalanceBettings: {
                        recalculate: imbalanceBettings?.recalculate ?? 0,
                        difference: imbalanceBettings?.difference ?? 0,
                        decrease: imbalanceBettings?.decrease,
                        updateType: imbalanceBettings?.updateType ?? 'AUTO'
                    }
                }
            })
        }

        if (path === 'imbalanceBettings.updateType' && value === 'MANUAL') {
            setSubmitValue(prevState => {
                const {imbalanceBettings} = prevState
                return {
                    ...prevState,
                    imbalanceBettings: imbalanceBettings
                }
            })
        }

        setSubmitValue(prev => {
            if (lodash.get(prev, path) === value) return prev
            const result = lodash.set({...prev}, path, value)
            return result
        })
    }, [])

    const impactTemplateViewTitle = intl.formatMessage({
        id: `${funType}.viewAllImpacts`,
        defaultMessage: 'VIEW ALL IMPACTS'
    });

    const formTitle = () => {
        let formTitle = ''

        switch (comeFromPage) {
            case ComeFromPage.AllMarketSetting:
                formTitle = intl.formatMessage({
                    id: `${funType}.allMarketSettingSummary`,
                    defaultMessage: 'All Market Setting Summary'
                })
                break
            case ComeFromPage.MarketSetting:
                formTitle = intl.formatMessage({
                    id: `${funType}.marketSettingSummary`,
                    defaultMessage: 'Market Setting Summary'
                })
                break
            case ComeFromPage.EditTemplate:
                formTitle = intl.formatMessage({id: `${funType}.templateSummary`, defaultMessage: 'Template Summary'})
                break;
            case ComeFromPage.AddTemplate:
                if (impactTemplateData.current.newTemplates.length > 0) {
                    formTitle = intl.formatMessage({
                        id: `${funType}.compareDefaultTemplate`,
                        defaultMessage: 'Compare Default Template'
                    })
                } else {
                    formTitle = intl.formatMessage({
                        id: `${funType}.templateSummary`,
                        defaultMessage: 'Template Summary'
                    })
                }
                break;
        }

        return formTitle
    }

    function updateBasicTemplateInfoProps() {
        const preLeagueName = isComeFromTemplatePage() ? preValue.leagueName : refValue.leagueName

        setBasicTemplateInfoProps({
            items: [
                {
                    title: refValue.templateName ?? "None",
                    isHeader: true
                },
                {
                    title: intl.formatMessage({id: `${funCommonType}.sport`, defaultMessage: 'Sport'}),
                    isHeader: false,
                    preValue: isDataFromConfiguration ? refValue.sportName : preValue.sportName,
                    refValue: refValue.sportName,
                    currentValue: (preValue.sportName === refValue.sportName) ? refValue.sportName : lodash.get(submitValue, 'sportName'),
                    isValueSet: lodash.get(submitValue, 'sportName') !== "",
                    shouldShowWarningSettingBar: adjustable && (preValue.sportName !== refValue.sportName),
                    onValueSelected: handleItemIdChange('sportName'),
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({id: `${funCommonType}.league`, defaultMessage: 'League'}),
                    isHeader: false,
                    preValue: preLeagueName,
                    refValue: refValue.leagueName,
                    currentValue: (preLeagueName === refValue.leagueName) ? refValue.leagueName : lodash.get(submitValue, 'leagueName'),
                    isValueSet: lodash.get(submitValue, 'leagueName') !== "",
                    shouldShowWarningSettingBar: adjustable && (preValue.leagueName !== refValue.leagueName),
                    onValueSelected: handleItemIdChange('leagueName'),
                    tips: tipsWording
                }
            ]
        })
    }

    function updateMarginProps() {
        setMarginProps({
            items: [
                {
                    title: intl.formatMessage({id: `${funCommonType}.margin`, defaultMessage: 'Margin'}),
                    isHeader: true,
                    preValue: preValue.margin,
                    refValue: refValue.margin,
                    currentValue: (preValue.margin === refValue.margin) ? refValue.margin : lodash.get(submitValue, 'margin'),
                    isValueSet: lodash.get(submitValue, 'margin') !== -1,
                    shouldShowWarningSettingBar: adjustable && (preValue.margin !== refValue.margin),
                    onValueSelected: handleDynamicChange('margin'),
                    tips: tipsWording,
                    summaryCardItemType: SummaryCardItemType.Long
                }
            ]
        })
    }

    function updateLineSettingProps() {
        setLineSettingProps({
            items: [
                {
                    title: intl.formatMessage({id: `${funType}.lineSetting`, defaultMessage: 'Line Setting'}),
                    isHeader: true,
                    preValue: preValue.lineSettings,
                    refValue: refValue.lineSettings,
                    currentValue: (preValue.lineSettings === refValue.lineSettings) ? refValue.lineSettings : lodash.get(submitValue, 'lineSettings'),
                    isValueSet: lodash.get(submitValue, 'lineSettings') !== "",
                    shouldShowWarningSettingBar: adjustable && (preValue.lineSettings !== refValue.lineSettings),
                    onValueSelected: handleDynamicChange('lineSettings'),
                    tips: tipsWording,
                    summaryCardItemType: SummaryCardItemType.Long
                }
            ]
        })
    }

    function updateProviderPriorityProps() {
        const preProviderItems = preValue.providerPriority?.map(item => {
            return item.provider
        })

        const refProviderItems = refValue.providerPriority?.map(item => {
            return item.provider
        })

        const currentItems = lodash.get(submitValue, 'providerPriority')?.map((item: any) => {
            return item.provider
        })

        setProviderPriorityProps({
            items: [
                {
                    title: intl.formatMessage({
                        id: `${funType}.oddsFeedProviderPriority`,
                        defaultMessage: 'Odds Feed Provider Priority'
                    }),
                    isHeader: true,
                    preValue: isDataFromConfiguration ? refProviderItems : preProviderItems,
                    refValue: refProviderItems,
                    currentValue: (lodash.isEqual(preValue.providerPriority, refValue.providerPriority)) ? preProviderItems : currentItems,
                    isValueSet: (currentItems ?? []).length > 0,
                    shouldShowWarningSettingBar: adjustable && !lodash.isEqual(preValue.providerPriority, refValue.providerPriority),
                    onValueSelected: handleProviderChange('providerPriority'),
                    summaryCardItemType: SummaryCardItemType.Column,
                    tips: tipsWording
                }
            ]
        })
    }

    function updateOddsSettingProps() {
        setOddsSettingProps({
            items: [
                {
                    title: intl.formatMessage({
                        id: `${funType}.feederOddsMinimumSetting`,
                        defaultMessage: 'Feeder Odds Alignment Minimum Setting'
                    }),
                    isHeader: true,
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({id: `${funType}.timeLimit`, defaultMessage: 'Time limit (Second)'}),
                    isHeader: false,
                    preValue: preValue.oddsSettings?.minimum,
                    refValue: refValue.oddsSettings?.minimum,
                    currentValue: (preValue.oddsSettings?.minimum === refValue.oddsSettings?.minimum) ? refValue.oddsSettings?.minimum : lodash.get(submitValue, 'oddsSettings.minimum'),
                    isValueSet: lodash.get(submitValue, 'oddsSettings.minimum') !== -1,
                    shouldShowWarningSettingBar: adjustable && (preValue.oddsSettings?.minimum !== refValue.oddsSettings?.minimum),
                    onValueSelected: handleDynamicChange('oddsSettings.minimum'),
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({id: `${funType}.maximumOdds`, defaultMessage: 'Maximum Odds'}),
                    isHeader: false,
                    preValue: preValue.oddsSettings?.maximum,
                    refValue: refValue.oddsSettings?.maximum,
                    currentValue: (preValue.oddsSettings?.maximum === refValue.oddsSettings?.maximum) ? refValue.oddsSettings?.maximum : lodash.get(submitValue, 'oddsSettings.maximum'),
                    isValueSet: lodash.get(submitValue, 'oddsSettings.maximum') !== -1,
                    shouldShowWarningSettingBar: adjustable && (preValue.oddsSettings?.maximum !== refValue.oddsSettings?.maximum),
                    onValueSelected: handleDynamicChange('oddsSettings.maximum'),
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({
                        id: `${funType}.oddsDifferenceAlignment`,
                        defaultMessage: 'Odds Difference Alignment %'
                    }),
                    isHeader: false,
                    preValue: preValue.oddsSettings?.difference,
                    refValue: refValue.oddsSettings?.difference,
                    currentValue: (preValue.oddsSettings?.difference === refValue.oddsSettings?.difference) ? refValue.oddsSettings?.difference : lodash.get(submitValue, 'oddsSettings.difference'),
                    isValueSet: lodash.get(submitValue, 'oddsSettings.difference') !== -1,
                    shouldShowWarningSettingBar: adjustable && (preValue.oddsSettings?.difference !== refValue.oddsSettings?.difference),
                    onValueSelected: handleDynamicChange('oddsSettings.difference'),
                    tips: tipsWording
                }
            ]
        })
    }

    function updateDeviationProps() {
        setDeviationProps({
            items: [
                {
                    title: intl.formatMessage({
                        id: `${funType}.oddsDeviationThreshold`,
                        defaultMessage: 'Odds Deviation Threshold'
                    }),
                    isHeader: true,
                    preValue: isDataFromConfiguration ? refValue.deviation.percentage : preValue.deviation.percentage,
                    refValue: refValue.deviation.percentage,
                    currentValue: (preValue.deviation?.percentage === refValue.deviation?.percentage) ? refValue.deviation?.percentage : lodash.get(submitValue, 'deviation.percentage'),
                    isValueSet: lodash.get(submitValue, 'deviation.percentage') !== -1,
                    shouldShowWarningSettingBar: adjustable && (preValue.deviation?.percentage !== refValue.deviation?.percentage),
                    onValueSelected: handleDynamicChange('deviation.percentage'),
                    tips: tipsWording,
                    summaryCardItemType: SummaryCardItemType.Long
                },
                {
                    title: intl.formatMessage({
                        id: `${funType}.deviationResponseActions`,
                        defaultMessage: 'Deviation Response Actions'
                    }),
                    isHeader: true,
                    preValue: isDataFromConfiguration ? getEnumKeyByValue(DeviationOption, refValue.deviation.action) : getEnumKeyByValue(DeviationOption, preValue.deviation.action),
                    refValue: getEnumKeyByValue(DeviationOption, refValue.deviation.action),
                    currentValue: getEnumKeyByValue(DeviationOption, (preValue.deviation.action === refValue.deviation.action) ? preValue.deviation.action : lodash.get(submitValue, 'deviation.action')),
                    isValueSet: lodash.get(submitValue, 'deviation.action') !== "",
                    shouldShowWarningSettingBar: adjustable && (preValue.deviation.action !== refValue.deviation.action),
                    onValueSelected: handleDynamicChange('deviation.action'),
                    tips: tipsWording,
                    summaryCardItemType: SummaryCardItemType.Long
                }
            ]
        })
    }

    function updateFeederSuspendProps() {
        setFeederSuspendProps({
            items: [
                {
                    title: intl.formatMessage({
                        id: `${funType}.feederSuspendMarket`,
                        defaultMessage: 'Feeder Suspend Market'
                    }),
                    isHeader: true,
                    preValue: isDataFromConfiguration ? getEnumValueByKey(FeederSuspendActionType, refValue.feederSuspend) : getEnumValueByKey(FeederSuspendActionType, preValue.feederSuspend),
                    refValue: getEnumValueByKey(FeederSuspendActionType, refValue.feederSuspend),
                    currentValue: (preValue.feederSuspend === refValue.feederSuspend) ? getEnumValueByKey(FeederSuspendActionType, refValue.feederSuspend) : lodash.get(submitValue, 'feederSuspend'),
                    isValueSet: lodash.get(submitValue, 'feederSuspend') !== "",
                    shouldShowWarningSettingBar: adjustable && (preValue.feederSuspend !== refValue.feederSuspend),
                    onValueSelected: handleDynamicChange('feederSuspend'),
                    tips: tipsWording
                }
            ]
        })
    }

    function updateDangerAttackActionProps() {
        setDangerAttackActionProps({
            items: [
                {
                    title: intl.formatMessage({
                        id: `${funType}.dangerAttackAction`,
                        defaultMessage: 'Danger Attack Action'
                    }),
                    isHeader: true,
                    preValue: isDataFromConfiguration ? getEnumValueByKey(DangerAttackActionType, refValue.dangerAttackAction) : getEnumValueByKey(DangerAttackActionType, preValue.dangerAttackAction),
                    refValue: getEnumValueByKey(DangerAttackActionType, refValue.dangerAttackAction),
                    currentValue: (preValue.dangerAttackAction === refValue.dangerAttackAction) ? getEnumValueByKey(DangerAttackActionType, refValue.dangerAttackAction) : lodash.get(submitValue, 'dangerAttackAction'),
                    isValueSet: lodash.get(submitValue, 'dangerAttackAction') !== "",
                    shouldShowWarningSettingBar: adjustable && (preValue.dangerAttackAction !== refValue.dangerAttackAction),
                    onValueSelected: handleDynamicChange('dangerAttackAction'),
                    tips: tipsWording
                }
            ]
        })
    }

    function checkBetSlipAmountSettingIsEqual(item?: ImbalanceSetting) {
        if (lodash.isEqual(item, initialValue.imbalanceSettings)) {
            return false;
        } else {
            return !betSlipSettingShouldRest
        }
    }

    const handleBetSlipAmountSettingChange = useCallback((path: string) => (value?: ImbalanceSetting) => {
        setSubmitValue(prev => {
            if (lodash.get(prev, path) === value) return prev
            setBetSlipSettingShouldRest(false)
            return lodash.set({...prev}, path, value)
        })
    }, [])

    function updateBetSlipAmountSettingsProps() {
        const isValueSet = checkBetSlipAmountSettingIsEqual(submitValue.imbalanceSettings)
        const currentValue = isValueSet ? lodash.get(submitValue, 'imbalanceSettings') : lodash.get(initialValue, 'imbalanceSettings')

        const betSlipSettingProps: TemplateBetSlipAmountSettingsProps = {
            title: intl.formatMessage({
                id: `${funType}.betSlipAmountImbalanceSetting`,
                defaultMessage: 'Bet Slip Amount Imbalance Setting'
            }),
            preValue: isDataFromConfiguration ? refValue.imbalanceSettings : preValue.imbalanceSettings,
            refValue: refValue.imbalanceSettings,
            currentValue: currentValue,
            isValueSet: isValueSet,
            shouldShowWarningSettingBar: adjustable && !lodash.isEqual(preValue.imbalanceSettings, refValue.imbalanceSettings),
            onValueSelected: handleBetSlipAmountSettingChange('imbalanceSettings'),
            adjustable: adjustable,
            reset: betSlipSettingShouldRest
        }

        setBetSlipAmountSettingsProps(betSlipSettingProps)
    }

    const handleBelowMarginAlertRecipientsChange = useCallback((path: string) => (value: SummaryPropertyType) => {
        const stringToArray = (strItem: string) => {
            return strItem === '' ? [] : strItem.split(',').map(item => item.trim());
        }

        let recipients: string[] = []

        if (value === "left") {
            recipients = preValue.belowMarginSettings.alertRecipients ?? []
            setBelowMarginAlertRecipients('left')
        } else if (value === "right") {
            recipients = refValue.belowMarginSettings.alertRecipients ?? []
            setBelowMarginAlertRecipients('right')
        } else {
            recipients = typeof value === "string" ? stringToArray(value) : []
            setBelowMarginAlertRecipients('none')
        }

        setSubmitValue(prev => {
            if (lodash.get(prev, path) === value) return prev

            return lodash.set({...prev}, path, recipients);
        });
    }, [])

    function updateBellowMarginSettingsProps() {
        function currentAlertRecipients() {
            return lodash.isEqual(preValue.belowMarginSettings.alertRecipients, refValue.belowMarginSettings.alertRecipients)
                ? convertArrayToString(refValue.belowMarginSettings.alertRecipients || [])
                : convertArrayToString(lodash.get(submitValue, 'belowMarginSettings.alertRecipients', []))
        }

        function checkIsValueSet() {
            return belowMarginAlertRecipients !== 'none'
        }

        setBellowMarginSettingsProps({
            items: [
                {
                    title: intl.formatMessage({
                        id: `${funType}.belowMarginSetting`,
                        defaultMessage: 'Below Margin Setting'
                    }),
                    isHeader: true,
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({
                        id: `${funType}.marginPercentage`,
                        defaultMessage: 'Margin %'
                    }),
                    isHeader: false,
                    preValue: isDataFromConfiguration ? refValue.belowMarginSettings.margin : preValue.belowMarginSettings.margin,
                    refValue: refValue.belowMarginSettings.margin,
                    currentValue: (preValue.belowMarginSettings.margin === refValue.belowMarginSettings.margin) ? refValue.belowMarginSettings.margin : lodash.get(submitValue, 'belowMarginSettings.margin'),
                    isValueSet: lodash.get(submitValue, 'belowMarginSettings.margin') !== -1,
                    shouldShowWarningSettingBar: adjustable && (preValue.belowMarginSettings.margin !== refValue.belowMarginSettings.margin),
                    onValueSelected: handleDynamicChange('belowMarginSettings.margin'),
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({
                        id: `${funType}.setAlertNotificationRecipients`,
                        defaultMessage: 'Set Alert Notification Recipients'
                    }),
                    isHeader: false,
                    preValue: isDataFromConfiguration ? convertArrayToString(refValue.belowMarginSettings.alertRecipients || []) : convertArrayToString(preValue.belowMarginSettings.alertRecipients || []),
                    refValue: convertArrayToString(refValue.belowMarginSettings.alertRecipients || []),
                    currentValue: currentAlertRecipients(),
                    isValueSet: checkIsValueSet(),
                    shouldShowWarningSettingBar: adjustable && (convertArrayToString(preValue.belowMarginSettings.alertRecipients || []) !== convertArrayToString(refValue.belowMarginSettings.alertRecipients || [])),
                    onValueSelected: handleBelowMarginAlertRecipientsChange('belowMarginSettings.alertRecipients'),
                    tips: tipsWording,
                    summaryCardItemType: SummaryCardItemType.SpecialProcess
                }
            ]
        })
    }

    const handleParlayAlertRecipientsChange = useCallback((path: string) => (value: SummaryPropertyType) => {
        const stringToArray = (strItem: string) => {
            return strItem === '' ? [] : strItem.split(',').map(item => item.trim());
        }

        let recipients: string[] = []

        if (value === "left") {
            recipients = preValue.parlayAlert.alertRecipients ?? []
            setParlayAlertRecipients('left')
        } else if (value === "right") {
            recipients = refValue.parlayAlert.alertRecipients ?? []
            setParlayAlertRecipients('right')
        } else {
            recipients = typeof value === "string" ? stringToArray(value) : []
            setParlayAlertRecipients('none')
        }

        setSubmitValue(prev => {
            if (lodash.get(prev, path) === value) return prev

            return lodash.set({...prev}, path, recipients);
        });
    }, [])

    function updateParlayAlertSetting() {
        function currentAlertRecipients() {
            return lodash.isEqual(preValue.parlayAlert.alertRecipients, refValue.parlayAlert.alertRecipients)
                ? convertArrayToString(refValue.parlayAlert.alertRecipients || [])
                : convertArrayToString(lodash.get(submitValue, 'parlayAlert.alertRecipients', []))
        }

        function checkIsValueSet() {
            return parlayAlertRecipients !== 'none'
        }

        const options = ["UnSelected", "Selected"]

        setParlayAlertProps({
            items: [
                {
                    title: intl.formatMessage({
                        id: `${funType}.parlayAlertSettings`,
                        defaultMessage: 'Parlay Alert Settings'
                    }),
                    isHeader: true,
                    preValue: isDataFromConfiguration ? refValue.parlayAlert.type : preValue.parlayAlert.type,
                    refValue: refValue.parlayAlert.type,
                    currentValue: (preValue.parlayAlert.type === refValue.parlayAlert.type) ? refValue.parlayAlert.type : lodash.get(submitValue, 'parlayAlert.type'),
                    isValueSet: lodash.get(submitValue, 'parlayAlert.type') !== "",
                    shouldShowWarningSettingBar: adjustable && (preValue.parlayAlert.type !== refValue.parlayAlert.type),
                    onValueSelected: handleDynamicChange('parlayAlert.type'),
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({
                        id: `${funType}.passRate`,
                        defaultMessage: "Pass Rate %"
                    }),
                    isHeader: false,
                    preValue: isDataFromConfiguration ? refValue.parlayAlert.targetNumber : preValue.parlayAlert.targetNumber,
                    refValue: refValue.parlayAlert.targetNumber,
                    currentValue: (preValue.parlayAlert.targetNumber === refValue.parlayAlert.targetNumber) ? refValue.parlayAlert.targetNumber : lodash.get(submitValue, 'parlayAlert.targetNumber'),
                    isValueSet: lodash.get(submitValue, 'parlayAlert.targetNumber') !== -1,
                    shouldShowWarningSettingBar: adjustable && (preValue.parlayAlert.targetNumber !== refValue.parlayAlert.targetNumber),
                    onValueSelected: handleDynamicChange('parlayAlert.targetNumber'),
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({
                        id: `${funType}.potentialWin`,
                        defaultMessage: 'Potential Win'
                    }),
                    isHeader: false,
                    preValue: isDataFromConfiguration ? refValue.parlayAlert.potentialWin : preValue.parlayAlert.potentialWin,
                    refValue: refValue.parlayAlert.potentialWin,
                    currentValue: (preValue.parlayAlert.potentialWin === refValue.parlayAlert.potentialWin) ? refValue.parlayAlert.potentialWin : lodash.get(submitValue, 'parlayAlert.potentialWin'),
                    isValueSet: lodash.get(submitValue, 'parlayAlert.potentialWin') !== -1,
                    shouldShowWarningSettingBar: adjustable && (preValue.parlayAlert.potentialWin !== refValue.parlayAlert.potentialWin),
                    onValueSelected: handleDynamicChange('parlayAlert.potentialWin'),
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({
                        id: `${funType}.setAlertNotificationRecipients`,
                        defaultMessage: 'Set Alert Notification Recipients'
                    }),
                    isHeader: false,
                    preValue: isDataFromConfiguration ? convertArrayToString(refValue.parlayAlert.alertRecipients || []) : convertArrayToString(preValue.parlayAlert.alertRecipients || []),
                    refValue: convertArrayToString(refValue.parlayAlert.alertRecipients || []),
                    currentValue: currentAlertRecipients(),
                    isValueSet: checkIsValueSet(),
                    shouldShowWarningSettingBar: adjustable && (convertArrayToString(preValue.parlayAlert.alertRecipients || []) !== convertArrayToString(refValue.parlayAlert.alertRecipients || [])),
                    onValueSelected: handleParlayAlertRecipientsChange('parlayAlert.alertRecipients'),
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({
                        id: `${funType}.notificationEmail`,
                        defaultMessage: 'Notifications sent to the email'
                    }),
                    isHeader: false,
                    preValue: isDataFromConfiguration ? convertBooleanToString(options, refValue.parlayAlert.sendEmail) : convertBooleanToString(options, preValue.parlayAlert.sendEmail),
                    refValue: convertBooleanToString(options, refValue.parlayAlert.sendEmail),
                    currentValue: convertBooleanToString(options, (preValue.parlayAlert.sendEmail === refValue.parlayAlert.sendEmail) ? refValue.parlayAlert.sendEmail : lodash.get(submitValue, 'parlayAlert.sendEmail')),
                    isValueSet: convertBooleanToString(options, lodash.get(submitValue, 'parlayAlert.sendEmail')) !== "none",
                    shouldShowWarningSettingBar: adjustable && (preValue.parlayAlert.sendEmail !== refValue.parlayAlert.sendEmail),
                    onValueSelected: handleDynamicChange('parlayAlert.sendEmail'),
                    tips: tipsWording
                }
            ]
        })
    }

    function updateRapidBettingProps() {
        const options = ["Disabled", "Enabled"]

        setRapidBetEntrySettingsProps({
            items: [
                {
                    title: intl.formatMessage({
                        id: `${funType}.rapidBetEntry`,
                        defaultMessage: 'Rapid Bet Entry'
                    }),
                    isHeader: true,
                    preValue: isDataFromConfiguration ? convertBooleanToString(options, refValue.rapidBetEntrySettings.enabled) : convertBooleanToString(options, preValue.rapidBetEntrySettings.enabled),
                    refValue: convertBooleanToString(options, refValue.rapidBetEntrySettings.enabled),
                    currentValue: convertBooleanToString(options, (preValue.rapidBetEntrySettings.enabled === refValue.rapidBetEntrySettings.enabled) ? refValue.rapidBetEntrySettings.enabled : lodash.get(submitValue, 'rapidBetEntrySettings.enabled')),
                    isValueSet: convertBooleanToString(options, lodash.get(submitValue, 'rapidBetEntrySettings.enabled')) !== "none",
                    shouldShowWarningSettingBar: adjustable && (preValue.rapidBetEntrySettings.enabled !== refValue.rapidBetEntrySettings.enabled),
                    onValueSelected: handleDynamicChange('rapidBetEntrySettings.enabled'),
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({
                        id: `${funType}.triggerTime`,
                        defaultMessage: 'Trigger Time (Second)'
                    }),
                    isHeader: false,
                    preValue: isDataFromConfiguration ? refValue.rapidBetEntrySettings.triggerTime : preValue.rapidBetEntrySettings.triggerTime,
                    refValue: refValue.rapidBetEntrySettings.triggerTime,
                    currentValue: (preValue.rapidBetEntrySettings.triggerTime === refValue.rapidBetEntrySettings.triggerTime) ? refValue.rapidBetEntrySettings.triggerTime : lodash.get(submitValue, 'rapidBetEntrySettings.triggerTime'),
                    isValueSet: lodash.get(submitValue, 'rapidBetEntrySettings.triggerTime') !== -1,
                    shouldShowWarningSettingBar: adjustable && (preValue.rapidBetEntrySettings.triggerTime !== refValue.rapidBetEntrySettings.triggerTime),
                    onValueSelected: handleDynamicChange('rapidBetEntrySettings.triggerTime'),
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({
                        id: `${funType}.numberOfBets`,
                        defaultMessage: 'Number of Bets'
                    }),
                    isHeader: false,
                    preValue: isDataFromConfiguration ? refValue.rapidBetEntrySettings.numberOfBets : preValue.rapidBetEntrySettings.numberOfBets,
                    refValue: refValue.rapidBetEntrySettings.numberOfBets,
                    currentValue: (preValue.rapidBetEntrySettings.numberOfBets === refValue.rapidBetEntrySettings.numberOfBets) ? refValue.rapidBetEntrySettings.numberOfBets : lodash.get(submitValue, 'rapidBetEntrySettings.numberOfBets'),
                    isValueSet: lodash.get(submitValue, 'rapidBetEntrySettings.numberOfBets') !== -1,
                    shouldShowWarningSettingBar: adjustable && (preValue.rapidBetEntrySettings.numberOfBets !== refValue.rapidBetEntrySettings.numberOfBets),
                    onValueSelected: handleDynamicChange('rapidBetEntrySettings.numberOfBets'),
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({
                        id: `${funType}.suspendLine`,
                        defaultMessage: 'Suspend line (Second)'
                    }),
                    isHeader: false,
                    preValue: isDataFromConfiguration ? refValue.rapidBetEntrySettings.suspendLine : preValue.rapidBetEntrySettings.suspendLine,
                    refValue: refValue.rapidBetEntrySettings.suspendLine,
                    currentValue: (preValue.rapidBetEntrySettings.suspendLine === refValue.rapidBetEntrySettings.suspendLine) ? refValue.rapidBetEntrySettings.suspendLine : lodash.get(submitValue, 'rapidBetEntrySettings.suspendLine'),
                    isValueSet: lodash.get(submitValue, 'rapidBetEntrySettings.suspendLine') !== -1,
                    shouldShowWarningSettingBar: adjustable && (preValue.rapidBetEntrySettings.suspendLine !== refValue.rapidBetEntrySettings.suspendLine),
                    onValueSelected: handleDynamicChange('rapidBetEntrySettings.suspendLine'),
                    tips: tipsWording
                }
            ]
        })
    }

    function updateAutoSettlementProps() {
        const options = ["Disabled", "Enabled"]

        setAutoSettlementSettingsProps({
            items: [
                {
                    title: intl.formatMessage({
                        id: `${funType}.autoSettlementSetting`,
                        defaultMessage: 'Auto Settlement Setting'
                    }),
                    isHeader: true,
                    preValue: isDataFromConfiguration ?
                        convertBooleanToString(options, refValue.autoSettlementSettings.enabled) :
                        convertBooleanToString(options, preValue.autoSettlementSettings.enabled),
                    refValue: convertBooleanToString(options, refValue.autoSettlementSettings.enabled),
                    currentValue: convertBooleanToString(options, (preValue.autoSettlementSettings.enabled === refValue.autoSettlementSettings.enabled) ?
                        refValue.autoSettlementSettings.enabled : lodash.get(submitValue, 'autoSettlementSettings.enabled')),
                    isValueSet: convertBooleanToString(options, lodash.get(submitValue, 'autoSettlementSettings.enabled')) !== "none",
                    shouldShowWarningSettingBar: adjustable && (preValue.autoSettlementSettings.enabled !== refValue.autoSettlementSettings.enabled),
                    onValueSelected: handleDynamicChange('autoSettlementSettings.enabled'),
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({
                        id: `${funType}.delaySettlement`,
                        defaultMessage: 'Delayed Auto Settlement (Second)'
                    }),
                    isHeader: false,
                    preValue: isDataFromConfiguration ? refValue.autoSettlementSettings.delaySettlement : preValue.autoSettlementSettings.delaySettlement,
                    refValue: refValue.autoSettlementSettings.delaySettlement,
                    currentValue: (preValue.autoSettlementSettings.delaySettlement === refValue.autoSettlementSettings.delaySettlement) ? refValue.autoSettlementSettings.delaySettlement : lodash.get(submitValue, 'autoSettlementSettings.delaySettlement'),
                    isValueSet: lodash.get(submitValue, 'autoSettlementSettings.delaySettlement') !== -1,
                    shouldShowWarningSettingBar: adjustable && (preValue.autoSettlementSettings.delaySettlement !== refValue.autoSettlementSettings.delaySettlement),
                    onValueSelected: handleDynamicChange('autoSettlementSettings.delaySettlement'),
                    tips: tipsWording
                }
            ]
        })
    }

    function getDecreaseDefaultValue() {
        return (
            [
                {
                    title: intl.formatMessage({
                        id: `${funType}.imbalancedBettingSetting`,
                        defaultMessage: 'Imbalanced Betting Setting'
                    }),
                    isHeader: true,
                    preValue: isDataFromConfiguration ? refValue.imbalanceBettings?.updateType : preValue.imbalanceBettings?.updateType,
                    refValue: refValue.imbalanceBettings?.updateType,
                    currentValue: (preValue.imbalanceBettings?.updateType === refValue.imbalanceBettings?.updateType) ? refValue.imbalanceBettings?.updateType : lodash.get(submitValue, 'imbalanceBettings.updateType'),
                    isValueSet: lodash.get(submitValue, 'imbalanceBettings.updateType') !== "",
                    shouldShowWarningSettingBar: adjustable && (preValue.imbalanceBettings?.updateType !== refValue.imbalanceBettings?.updateType),
                    onValueSelected: handleDynamicChange('imbalanceBettings.updateType'),
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({
                        id: `${funType}.percentageOfDifference`,
                        defaultMessage: 'Percentage of difference'
                    }),
                    isHeader: false,
                    preValue: isDataFromConfiguration ? refValue.imbalanceBettings?.difference : preValue.imbalanceBettings?.difference,
                    refValue: refValue.imbalanceBettings?.difference,
                    currentValue: (preValue.imbalanceBettings?.difference === refValue.imbalanceBettings?.difference) ?
                        refValue.imbalanceBettings?.difference : lodash.get(submitValue, 'imbalanceBettings.difference'),
                    isValueSet: lodash.get(submitValue, 'imbalanceBettings.difference') !== -1,
                    shouldShowWarningSettingBar: adjustable && (preValue.imbalanceBettings?.difference !== refValue.imbalanceBettings?.difference),
                    onValueSelected: handleDynamicChange('imbalanceBettings.difference'),
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({
                        id: `${funType}.recalculateMinimumAmount`,
                        defaultMessage: 'Recalculate Minimum Amount'
                    }),
                    isHeader: false,
                    preValue: isDataFromConfiguration ?
                        refValue.imbalanceBettings?.recalculate : preValue.imbalanceBettings?.recalculate,
                    refValue: refValue.imbalanceBettings?.recalculate,
                    currentValue: (preValue.imbalanceBettings?.recalculate === refValue.imbalanceBettings?.recalculate) ?
                        refValue.imbalanceBettings?.recalculate : lodash.get(submitValue, 'imbalanceBettings.recalculate'),
                    isValueSet: lodash.get(submitValue, 'imbalanceBettings.recalculate') !== -1,
                    shouldShowWarningSettingBar: adjustable && (preValue.imbalanceBettings?.recalculate !== refValue.imbalanceBettings?.recalculate),
                    onValueSelected: handleDynamicChange('imbalanceBettings.recalculate'),
                    tips: tipsWording
                }
            ]
        )
    }

    function updateDecreaseSettingProps() {

        const defaultData = getDecreaseDefaultValue()

        const isImbalanceDecreaseDifferent = preValue.imbalanceBettings?.decrease !== refValue.imbalanceBettings?.decrease;
        const isUpdateTypeNotAuto = !submitValue.imbalanceBettings?.updateType
            ? refValue.imbalanceBettings?.updateType !== 'AUTO'
            : submitValue.imbalanceBettings?.updateType !== 'AUTO';

        const additionalItem = {
            title: intl.formatMessage({
                id: `${funType}.oddsDecreasePercentage`,
                defaultMessage: 'Odds Decrease %'
            }),
            isHeader: false,
            preValue: isDataFromConfiguration ? refValue.imbalanceBettings?.decrease : preValue.imbalanceBettings?.decrease,
            refValue: refValue.imbalanceBettings?.decrease,
            currentValue: preValue.imbalanceBettings?.decrease === refValue.imbalanceBettings?.decrease ?
                refValue.imbalanceBettings?.decrease : lodash.get(submitValue, 'imbalanceBettings.decrease'),
            isValueSet: false,
            shouldShowWarningSettingBar: adjustable && isImbalanceDecreaseDifferent && isUpdateTypeNotAuto,
            onValueSelected: handleDynamicChange('imbalanceBettings.decrease'),
            tips: tipsWording
        };

        const referenceValue = submitValue.imbalanceBettings?.updateType ?
            submitValue.imbalanceBettings?.updateType : refValue.imbalanceBettings?.updateType;

        switch (referenceValue) {
            case 'AUTO':
                if (preValue.imbalanceBettings?.decrease) {
                    setDecreaseSettingProps({
                        items: [...defaultData, additionalItem]
                    })
                } else {
                    setDecreaseSettingProps({
                        items: defaultData
                    })
                }
                break;
            case 'MANUAL':
                setDecreaseSettingProps({
                    items: [...defaultData, additionalItem]
                })
                break;
            default:
                setDecreaseSettingProps({
                    items: defaultData
                })
        }
    }

    function getHeavyBettingDefaultValue() {
        return (
            [
                {
                    title: intl.formatMessage({id: `${funType}.heavyBetting`, defaultMessage: 'Heavy Betting'}),
                    isHeader: true,
                    preValue: isDataFromConfiguration ? refValue.heavyBettings?.updateType : preValue.heavyBettings?.updateType,
                    refValue: refValue.heavyBettings?.updateType,
                    currentValue: (preValue.heavyBettings?.updateType === refValue.heavyBettings?.updateType) ? refValue.heavyBettings?.updateType : lodash.get(submitValue, 'heavyBettings.updateType'),
                    isValueSet: lodash.get(submitValue, 'heavyBettings.updateType') !== "",
                    shouldShowWarningSettingBar: adjustable && (preValue.heavyBettings?.updateType !== refValue.heavyBettings?.updateType),
                    onValueSelected: handleDynamicChange('heavyBettings.updateType'),
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({id: `${funType}.timeLimit`, defaultMessage: 'Time limit (Second)'}),
                    isHeader: false,
                    preValue: isDataFromConfiguration ? refValue.heavyBettings?.timeLimit : preValue.heavyBettings?.timeLimit,
                    refValue: refValue.heavyBettings?.timeLimit,
                    currentValue: (preValue.heavyBettings?.timeLimit === refValue.heavyBettings?.timeLimit) ? refValue.heavyBettings?.timeLimit : lodash.get(submitValue, 'heavyBettings.timeLimit'),
                    isValueSet: lodash.get(submitValue, 'heavyBettings.timeLimit') !== -1,
                    shouldShowWarningSettingBar: adjustable && (preValue.heavyBettings?.timeLimit !== refValue.heavyBettings?.timeLimit),
                    onValueSelected: handleDynamicChange('heavyBettings.timeLimit'),
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({id: `${funType}.amountOfBet`, defaultMessage: 'Amount of bet'}),
                    isHeader: false,
                    preValue: isDataFromConfiguration ? refValue.heavyBettings?.amount : preValue.heavyBettings?.amount,
                    refValue: refValue.heavyBettings?.amount,
                    currentValue: (preValue.heavyBettings?.amount === refValue.heavyBettings?.amount) ? refValue.heavyBettings?.amount : lodash.get(submitValue, 'heavyBettings.amount'),
                    isValueSet: lodash.get(submitValue, 'heavyBettings.amount') !== -1,
                    shouldShowWarningSettingBar: adjustable && (preValue.heavyBettings?.amount !== refValue.heavyBettings?.amount),
                    onValueSelected: handleDynamicChange('heavyBettings.amount'),
                    tips: tipsWording
                }
            ]
        )
    }

    function updateHeavyBettingProps() {
        const defaultData = getHeavyBettingDefaultValue()

        const referenceValue = submitValue.heavyBettings?.updateType ? submitValue.heavyBettings?.updateType : refValue.heavyBettings?.updateType;

        switch (referenceValue) {
            case 'AUTO':
                setHeavyBettingProps({
                    items: defaultData
                })
                break;
            case 'MANUAL':
                setHeavyBettingProps({
                    items: [...defaultData, {
                        title: intl.formatMessage({
                            id: `${funType}.oddsDecreasePercentage`,
                            defaultMessage: 'Odds Decrease %'
                        }),
                        isHeader: false,
                        preValue: isDataFromConfiguration ? refValue.heavyBettings?.decrease : preValue.heavyBettings?.decrease,
                        refValue: refValue.heavyBettings?.decrease,
                        currentValue: (preValue.heavyBettings?.decrease === refValue.heavyBettings?.decrease) ? preValue.heavyBettings?.decrease : lodash.get(submitValue, 'heavyBettings.decrease'),
                        isValueSet: lodash.get(submitValue, 'heavyBettings.decrease') !== -1,
                        shouldShowWarningSettingBar: adjustable && (preValue.heavyBettings?.decrease !== refValue.heavyBettings?.decrease),
                        onValueSelected: handleDynamicChange('heavyBettings.decrease'),
                        tips: tipsWording
                    }]
                })
                break;
            default:
                setHeavyBettingProps({
                    items: defaultData
                })
        }
    }

    function updateDelayProps() {
        function checkIsValueSet() {
            return delaySituationOptions !== 'none'
        }

        function currentSituation() {
            return lodash.isEqual(preValue.delayedSettings?.situation, refValue.delayedSettings?.situation)
                ? convertArrayToString(refValue.delayedSettings?.situation || [])
                : convertArrayToString(lodash.get(submitValue, 'delayedSettings.situation', []))
        }

        setDelaySettingProps({
            items: [
                {
                    title: intl.formatMessage({
                        id: `${funType}.delayedAcceptanceSetting`,
                        defaultMessage: 'Delayed Acceptance Setting'
                    }),
                    isHeader: true,
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({id: `${funType}.situationEvent`, defaultMessage: 'Situation Event'}),
                    isHeader: false,
                    preValue: isDataFromConfiguration ? convertArrayToString(refValue.delayedSettings?.situation || []) : convertArrayToString(preValue.delayedSettings?.situation || []),
                    refValue: convertArrayToString(refValue.delayedSettings?.situation || []),
                    currentValue: currentSituation(),
                    isValueSet: checkIsValueSet(),
                    shouldShowWarningSettingBar: adjustable && (convertArrayToString(preValue.delayedSettings?.situation || []) !== convertArrayToString(refValue.delayedSettings?.situation || [])),
                    onValueSelected: handleDelaySituationChange('delayedSettings.situation'),
                    tips: tipsWording,
                    summaryCardItemType: SummaryCardItemType.SpecialProcess
                },
                {
                    title: intl.formatMessage({
                        id: `${funType}.delayedBetSlipAcceptance`,
                        defaultMessage: 'Delayed Bet Slip Acceptance (Second)'
                    }),
                    isHeader: false,
                    preValue: isDataFromConfiguration ? refValue.delayedSettings?.delayedSecond : preValue.delayedSettings?.delayedSecond,
                    refValue: refValue.delayedSettings?.delayedSecond,
                    currentValue: (preValue.delayedSettings?.delayedSecond === refValue.delayedSettings?.delayedSecond) ? refValue.singleBetSettings?.minimum : lodash.get(submitValue, 'delayedSettings.delayedSecond'),
                    isValueSet: lodash.get(submitValue, 'delayedSettings.delayedSecond') !== -1,
                    shouldShowWarningSettingBar: adjustable && (preValue.delayedSettings?.delayedSecond !== refValue.delayedSettings?.delayedSecond),
                    onValueSelected: handleDynamicChange('delayedSettings.delayedSecond'),
                    tips: tipsWording
                },
            ]
        })
    }

    function updateSingleBetProps() {
        setSingleBetProps({
            items: [
                {
                    title: intl.formatMessage({
                        id: `${funType}.singleBetSetting`,
                        defaultMessage: 'Single Bet Setting'
                    }),
                    isHeader: true,
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({
                        id: `${funType}.minimumAmount`,
                        defaultMessage: 'Minimum Amount'
                    }),
                    isHeader: false,
                    preValue: isDataFromConfiguration ? refValue.singleBetSettings?.minimum : preValue.singleBetSettings?.minimum,
                    refValue: refValue.singleBetSettings?.minimum,
                    currentValue: (preValue.singleBetSettings?.minimum === refValue.singleBetSettings?.minimum) ? refValue.singleBetSettings?.minimum : lodash.get(submitValue, 'singleBetSettings.minimum'),
                    isValueSet: lodash.get(submitValue, 'singleBetSettings.minimum') !== -1,
                    shouldShowWarningSettingBar: adjustable && (preValue.singleBetSettings?.minimum !== refValue.singleBetSettings?.minimum),
                    onValueSelected: handleDynamicChange('singleBetSettings.minimum'),
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({
                        id: `${funType}.maximumAmount`,
                        defaultMessage: 'Maximum Amount'
                    }),
                    isHeader: false,
                    preValue: isDataFromConfiguration ? refValue.singleBetSettings?.maximum : preValue.singleBetSettings?.maximum,
                    refValue: refValue.singleBetSettings?.maximum,
                    currentValue: (preValue.singleBetSettings?.maximum === refValue.singleBetSettings?.maximum) ? refValue.singleBetSettings?.maximum : lodash.get(submitValue, 'singleBetSettings.maximum'),
                    isValueSet: lodash.get(submitValue, 'singleBetSettings.maximum') !== -1,
                    shouldShowWarningSettingBar: adjustable && (preValue.singleBetSettings?.maximum !== refValue.singleBetSettings?.maximum),
                    onValueSelected: handleDynamicChange('singleBetSettings.maximum'),
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({id: `${funType}.maximumPayout`, defaultMessage: 'Maximum Payout'}),
                    isHeader: false,
                    preValue: isDataFromConfiguration ? refValue.singleBetSettings?.maxPayout : preValue.singleBetSettings?.maxPayout,
                    refValue: refValue.singleBetSettings?.maxPayout,
                    currentValue: (preValue.singleBetSettings?.maxPayout === refValue.singleBetSettings?.maxPayout) ? refValue.singleBetSettings?.maxPayout : lodash.get(submitValue, 'singleBetSettings.maxPayout'),
                    isValueSet: lodash.get(submitValue, 'singleBetSettings.maxPayout') !== -1,
                    shouldShowWarningSettingBar: adjustable && (preValue.singleBetSettings?.maxPayout !== refValue.singleBetSettings?.maxPayout),
                    onValueSelected: handleDynamicChange('singleBetSettings.maxPayout'),
                    tips: tipsWording
                },
            ]
        })
    }

    function checkParlayIsEqual(comparedItem: ParlayType, item?: ParlaySGPSetting) {
        if (lodash.isEqual(item, initialValue.parlaySettings)) {
            return false;
        } else {
            return !parlaySettingShouldRest
        }
    }

    function updateParlaySettingProps() {

        const isValueSet = checkParlayIsEqual(ParlayType.Parlay, submitValue.parlaySettings)
        const currentValue = isValueSet ? lodash.get(submitValue, 'parlaySettings') : lodash.get(initialValue, 'parlaySettings')

        const parlaySettingProps: TemplateSummaryParlayBetProps = {
            title: intl.formatMessage({id: `${funType}.parlayBetSetting`, defaultMessage: 'Parlay Bet Setting'}),
            preValue: preValue.parlaySettings,
            refValue: refValue.parlaySettings,
            currentValue: currentValue,
            isValueSet: isValueSet,
            shouldShowWarningSettingBar: adjustable && !lodash.isEqual(preValue.parlaySettings, refValue.parlaySettings),
            onValueSelected: handleParlayBetChange('parlaySettings'),
            adjustable: adjustable,
            parlayType: ParlayType.Parlay,
            reset: parlaySettingShouldRest
        }

        setParlayBetProps(parlaySettingProps)
    }

    function updateSGPSettingProps() {

        const isValueSet = checkParlayIsEqual(ParlayType.SGP, submitValue.sgpSettings)
        const currentValue = isValueSet ? lodash.get(submitValue, 'sgpSettings') : lodash.get(initialValue, 'sgpSettings')

        const sgpSettingProps: TemplateSummaryParlayBetProps = {
            title: intl.formatMessage({id: `${funType}.sgpBetSetting`, defaultMessage: 'SGP Bet Setting'}),
            preValue: isDataFromConfiguration ? refValue.sgpSettings : preValue.sgpSettings,
            refValue: refValue.sgpSettings,
            currentValue: currentValue,
            isValueSet: isValueSet,
            shouldShowWarningSettingBar: adjustable && !lodash.isEqual(preValue.sgpSettings, refValue.sgpSettings),
            onValueSelected: handleParlayBetChange('sgpSettings'),
            adjustable: adjustable,
            parlayType: ParlayType.SGP,
            reset: parlaySettingShouldRest
        }

        setSgpBetProps(sgpSettingProps)
    }

    const handleMarketSettingsChange = useCallback((path: string) => (submitValue: LocalMarketSetting[]) => {
        let marketSettings: LocalMarketSetting[] = []

        setSubmitValue(prev => {
            if (lodash.get(prev, path) === marketSettings || marketSettings.length === 0) return prev

            return lodash.set({...prev}, path, marketSettings)
        })
    }, [])


    function updateMarketSettings() {
        const marketSettingProps: TemplateSummaryMarketSettingsProps = {
            preValue: preValue.marketSettings,
            refValue: refValue.marketSettings,
            isDataFromConfiguration: isDataFromConfiguration,
            adjustable: adjustable,
            onSubmitValueChange: handleMarketSettingsChange('marketSettings'),
        }

        setMarketSettingsProps(marketSettingProps)
    }

    const updateTemplateCardProps = useCallback(() => {
        updateBasicTemplateInfoProps()
        updateMarginProps()
        updateLineSettingProps()
        updateProviderPriorityProps()
        updateOddsSettingProps()
        updateDeviationProps()
        updateDecreaseSettingProps()
        updateHeavyBettingProps()
        updateSingleBetProps()
        updateParlaySettingProps()
        updateSGPSettingProps()
        updateDelayProps()
        updateFeederSuspendProps()
        updateRapidBettingProps()
        updateAutoSettlementProps()
        updateBetSlipAmountSettingsProps()
        updateParlayAlertSetting()
        updateBellowMarginSettingsProps()
        updateDangerAttackActionProps()
        updateMarketSettings()
    }, [submitValue])

    const resetPreviewAllSetting = useCallback(() => {
        setSubmitValue(refMergedValue)
        setResetPreviousAll(!resetPreviousAll)
        setParlaySettingShouldRest(true)
        setDelaySituationOptions('none')
    }, [resetPreviousAll])

    useEffect(() => {
        if (publishTemplate) {
            switch (previewStatus) {
                case SummaryPreViewStatus.NoConflict:
                case SummaryPreViewStatus.Conflict: {
                    routeTheApiCall(refValue)
                    break
                }
                case SummaryPreViewStatus.hasChanged: {
                    const setting = getSettingsValue(submitValue, refValue, initialValue)
                    routeTheApiCall(setting)
                    break
                }
            }
        }
    }, [publishTemplate])

    function routeTheApiCall(request: TemplateSummaryUsedModel) {
        const {marketSettings, ...other} = request

        switch (comeFromPage) {
            case ComeFromPage.AllMarketSetting:
                if (isCustomized) {
                    createTemplate(request)
                } else {
                    const request: UpdateEventMarketSettingsModel = {
                        eventIds: eventIds,
                        eventType: other.eventType,
                        templateId: other.templateId ?? '',
                        marketId: undefined
                    }
                    updateEventMarketSetting(request)
                }
                break
            case ComeFromPage.MarketSetting:
                if (adjustable) {
                    updateTemplate(request)
                } else {
                    const request: UpdateEventMarketSettingsModel = {
                        eventIds: eventIds,
                        eventType: other.eventType,
                        templateId: other.templateId ?? '',
                        marketId: marketId
                    }
                    updateEventMarketSetting(request)
                }
                break
            case ComeFromPage.AddTemplate:
                createTemplate(request)
                break
            case ComeFromPage.EditTemplate:
                updateTemplate(request)
                break
        }
    }

    const updateEventMarketSetting = useCallback((parameters: UpdateEventMarketSettingsModel) => {
        setLoading(true)
        const request = {
            ...parameters,
            "eventIds": eventIds
        }

        updateEventMarketSettings(toUpdateEventMarketSetting(request))
            .then((response) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: response.failureIds.length > 0 ? 'warning' : 'success',
                    show: true,
                    message: response.failureIds.length > 0
                        ? intl.formatMessage({
                                id: `${funType}.partialSuccess`,
                                defaultMessage: 'Partial success, Please try {ids} again later.'
                            }, {ids: response.failureIds.join(', ')}
                        ) : intl.formatMessage({
                            id: `${funType}.marketSettingsSuccess`,
                            defaultMessage: 'Market settings has been updated successfully!'
                        })
                })

                if (response) {
                    setTimeout(() => {
                        if (onFinished) {
                            onFinished()
                        }
                    }, 1500);
                }
            })
            .catch((result) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: result
                });
            })
            .finally(() => {
                setPublishTemplate(false)
                setLoading(false)
            })
    }, [setLoading, globalController])

    const createTemplate = useCallback((parameters: TemplateSummaryUsedModel) => {
        setLoading(true)
        const postTemplate = convertModelBySpecificData<PostTemplate>(parameters)

        addTemplate(toAddTemplateProps(postTemplate))
            .then((response) => {

                if (comeFromPage === ComeFromPage.AllMarketSetting) {
                    const request: UpdateEventMarketSettingsModel = {
                        eventIds: eventIds,
                        eventType: parameters.eventType,
                        templateId: response.templateId ?? '',
                        marketId: undefined
                    }

                    updateEventMarketSetting(request)
                    return
                }

                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'success',
                    show: true,
                    message: intl.formatMessage({id: `${funType}.publishSuccess`, defaultMessage: 'Publish success'})
                })

                if (response) {
                    setTimeout(() => {
                        if (onFinished) {
                            onFinished(response.templateId)
                        }
                    }, 1500);
                }
            })
            .catch((e) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: e
                })
            })
            .finally(() => {
                setPublishTemplate(false)
                setLoading(false)
            })
    }, [setLoading, globalController])

    const updateTemplate = useCallback((parameters: TemplateSummaryUsedModel) => {
        setLoading(true)
        const convertData = convertModelBySpecificData<UpdateTemplateDetail>(parameters)
        const {templateId} = parameters
        const updateTemplateInfo = convertData as UpdateTemplateDetail

        updateTemplateDetail(toUpdateTemplate(updateTemplateInfo, templateId ?? ''))
            .then((response) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: response.isSuccess ? 'success' : 'error',
                    show: true,
                    message: response.isSuccess ? intl.formatMessage({
                        id: `${funType}.publishSuccess`,
                        defaultMessage: 'Publish success'
                    }) : intl.formatMessage({id: `${funType}.publishFail`, defaultMessage: 'Publish failed'})
                })

                if (response) {
                    setTimeout(() => {
                        if (onFinished) {
                            onFinished()
                        }
                    }, 1500);
                }
            })
            .finally(() => {
                setPublishTemplate(false)
                setLoading(false)
            })
    }, [setLoading, globalController])

    function transformParametersToImpactTemplate(parameters: TemplateSummaryUsedModel): GetTemplateDetailModel {
        const {leagueId, leagueName, marketSettings} = parameters
        const leagueIds = leagueId?.split(',') ?? []
        const leagueNames = leagueName?.split(',') ?? []
        const marketConfigSettings = marketSettings?.map(item => marketSettingToMarketConfigModel(item)) ?? []

        return {
            ...parameters,
            leagues: leagueIds.map((id, index) => ({
                leagueId: id,
                leagueName: leagueNames[index]
            })),
            templateId: parameters.templateId ?? '',
            templateName: parameters.templateName ?? '',
            oddsSettings: parameters.oddsSettings ?? {minimum: 0, maximum: 0, difference: 0},
            providerPriority: parameters.providerPriority ?? [],
            imbalanceBettings: parameters.imbalanceBettings ??
                {updateType: '', difference: 0, recalculate: 0, decrease: 0},
            heavyBettings: parameters.heavyBettings ?? {
                updateType: '',
                timeLimit: 0,
                amount: 0,
                decrease: 0
            },
            singleBetSettings: parameters.singleBetSettings ?? {minimum: 0, maximum: 0, maxPayout: 0},
            parlaySettings: parameters.parlaySettings ??
                {enabled: false, minimum: 0, maximum: 0, maximumLegs: 0, minimumLegs: 0, maxPayout: 0},
            sgpSettings: parameters.sgpSettings ??
                {enabled: false, minimum: 0, maximum: 0, maximumLegs: 0, minimumLegs: 0, maxPayout: 0},
            delayedSettings: parameters.delayedSettings ?? {situation: [], delayedSecond: 0},
            lineSettings: parameters.lineSettings ?? '',
            marketSettings: marketConfigSettings,
            parlayAlert: {
                ...parameters.parlayAlert,
                sendEmail: parameters.parlayAlert.sendEmail === 'true'
            },
            rapidBetEntrySettings: {
                ...parameters.rapidBetEntrySettings,
                enabled: parameters.rapidBetEntrySettings.enabled === 'true'
            },
            autoSettlementSettings: {
                ...parameters.autoSettlementSettings,
                enabled: parameters.autoSettlementSettings.enabled === 'true'
            }
        }
    }

    useEffect(() => {
        const getTemplateConflicts = (parameters: TemplateSummaryUsedModel) => {
            setLoading(true)
            const {leagueIds, templateId, sportId, eventType, marketSettings} = parameters
            const marketIds = marketSettings ? marketSettings.map(item => item.marketId) : []
            const request: GetTemplateDefaultConflictsParameters = {
                sportId: sportId,
                eventType: eventType,
                leagueIds: leagueIds,
                marketIds: marketIds,
                ...(templateId ? {templateId: templateId} : {})
            }

            getTemplateDefaultConflicts(toGetTemplateDefaultConflictsProps(request)).then((response) => {
                if (response.length > 0) {
                    const newTemplate = transformParametersToImpactTemplate(refValue)

                    impactTemplateData.current = {
                        ...impactTemplateData.current,
                        newTemplates: [newTemplate],
                        oldTemplates: response
                    }
                }
            }).finally(() => {
                setLoading(false)
            })
        }

        getTemplateConflicts(refValue)
    }, []);

    const handleButtonClick = (buttonType: string) => {
        const isLeftButtonClicked = buttonType === "left"
        switch (previewStatus) {
            case SummaryPreViewStatus.NoConflict:
            case SummaryPreViewStatus.Conflict:
                if (isLeftButtonClicked) {
                    if (gotoSettingPage) {
                        gotoSettingPage()
                    }
                } else {
                    setShowConfirmDialog(true)
                }
                break;
            case SummaryPreViewStatus.hasChanged:
                if (isLeftButtonClicked) {
                    resetPreviewAllSetting()
                } else {
                    setShowConfirmDialog(true)
                }
                break;
        }
    }

    const pageTabs: StatusButtonGroupProps['items'] = [{
        key: ComponentType.GeneralSetting,
        text: intl.formatMessage({id: `common.generalSetting`, defaultMessage: 'General Setting'}),
        type: ComponentType.GeneralSetting
    }, {
        key: ComponentType.BetSlipSetting,
        text: intl.formatMessage({id: `common.betSlipSetting`, defaultMessage: 'Bet Slip Setting'}),
        type: ComponentType.BetSlipSetting,
    }, {
        key: ComponentType.MarketsSetting,
        text: intl.formatMessage({id: `event.marketsSettingTitle`, defaultMessage: 'Markets Setting'}),
        type: ComponentType.MarketsSetting,
    }]

    const handleImpactTemplateViewOpen = () => {
        impactTemplateData.current.newTemplates[0] = transformParametersToImpactTemplate(getSettingsValue(submitValue, refValue, initialValue))

        setImpactTemplateViewOpen(true)
    }

    return {
        basicTemplateInfoProps,
        marginProps,
        lineSettingProps,
        providerPriorityProps,
        oddsSettingProps,
        deviationProps,
        decreaseSettingProps,
        heavyBettingProps,
        singleBetProps,
        formTitle,
        leftButtonName,
        rightButtonName,
        handleButtonClick,
        showConfirmDialog,
        setShowConfirmDialog,
        publishTemplate,
        refAlertDialogProps,
        loading,
        impactTemplateViewOpen,
        setImpactTemplateViewOpen,
        parlayBetProps,
        sgpBetProps,
        delaySettingProps,
        impactTemplateViewTitle,
        impactTemplateData,
        feederSuspendProps,
        dangerAttackActionProps,
        betSlipAmountSettingsProps,
        autoSettlementSettingsProps,
        bellowMarginSettingsProps,
        parlayAlertProps,
        rapidBetEntrySettingsProps,
        pageTabs,
        marketSettingsProps,
        handleImpactTemplateViewOpen,
        comeFromPage
    }
}

export default useTemplateSummaryFormViewModel