import {MarketSettingProps} from "@/app/eventDetail/components/pageComponent/MarketSetting";
import useEventRepository from "@/services/@event/repository/useEventRepository";
import useCommonRepository from "@/services/@common/repository/useCommonRepository";
import useChannelRepository from "@/services/@channel/respository/useChannelRepository";
import useTemplateViewModel from "@/app/template/domain/useTemplateViewModel";
import {GlobalController} from "@/modules/common/GlobalController";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {useCallback, useEffect, useRef, useState} from "react";
import {
    ConfigurationModel,
    DelayedSettings,
    Deviation,
    EventMarketHeavyBettingModel,
    EventMarketImbalanceBettingsModel,
    EventMarketModel,
    EventMarketOddsSettingsModel,
    EventMarketProviderPriorityModel,
    EventMarketSettingsModel,
    EventMarketSingleBetSettingsModel,
    GetTemplateDetailModel,
    ImbalanceSetting,
    MarketConfigModel,
    ParlaySGPSetting
} from "@/services/@core/module/ResponseDataModels";
import {toEventMarketsDetailProps, toEventMarketSettingsProps} from "@/app/eventDetail/models/RequestDataMapping";
import {toGetConfigurationProps} from "@/app/configuration/models/RequestDataMapping";
import {toProvidersProps} from "@/app/dashboard/models/RequestDataMapping";
import lodash from "lodash";
import {BetSlipSettingDataModel} from "@/app/template/models/TemplateDetailDataModel";
import {defaultGetTemplateDetailModel} from "@/services/@core/module/DefaultResponseData";
import {
    DeviationOption,
    IFeedOddsSetting,
    IFirstRow,
    IHeavyBetting,
    IImbalancedBettingDecrease,
    IMarginLine,
    IOddsDeviation,
    LineSettingsOptions
} from "@/app/eventDetail/models/dataModel/MarketSettingDataModel";
import {SortedCardListProps} from "@/app/eventDetail/components/marketSetting/SortedCardList";
import {OptionItem} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {
    LocalAutoSettlementSetting,
    LocalBelowMarginSetting,
    LocalParlayAlertSetting,
    LocalRapidBetEntrySetting,
    marketConfigModelToMarketSetting,
    TemplateSummaryUsedModel
} from "@/app/eventDetail/models/dataModel/EventDetailOddsDataModel";
import {
    extractValue,
    getEnumKeyByValue,
    getEnumValueByKey,
    useDynamicValueUpdater
} from "@/modules/common/DataProcessUnit";
import {
    AlertRecipientsRoleType,
    DangerAttackActionType,
    FeederSuspendActionType,
    ImbalanceAmountActionType
} from "@/app/template/models/actionType";
import {ComponentType, passRateOptions, removePercentageSymbol} from "@/app/template/domain/useTemplateFormViewModel";
import {allFirstCharToUpperCase, toUpperCaseWithUnderscore} from "@/modules/common/DisplayFormatConverter";
import {range0To100, range0To999, range1To100, range1To999, range1To999999999, range2To999} from "@/utils/rangeLimits";
import {SwitchFormProps} from "@/modules/components/switchForm/SwitchForm";
import {BetSlipSettingProps} from "@/app/template/components/BetSlipSetting";
import {GeneralSettingProps} from "@/app/template/components/GeneralSetting";
import {GridRowModel} from "@mui/x-data-grid-pro";
import {MarketConfigFormContentProps} from "@/app/template/components/marketConfigForm/MarketConfigFormContent";
import {EventType} from "@/services/@core/module/Enum";
import {StatusButtonGroupProps} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup";
import {
    checkIsRequiredFieldsFilled,
    customCompare,
    isOutOfRange
} from "@/app/template/domain/TemplateModelValidationUtils";
import {
    AutoSettlementSetting,
    BelowMarginSetting,
    ParlayAlertSetting,
    RapidBetEntrySetting
} from "@/services/@core/module/CommonDataModels";
import {ComeFromPage, TemplateSummaryFormProps} from "@/app/eventDetail/components/pageComponent/TemplateSummaryForm";

const useMarketSettingViewModel = (props: MarketSettingProps) => {
    const {
        eventId,
        eventType,
        onNext,
        marketId,
        sportId,
        sportType,
        sportName,
        leagueId,
        leagueName
    } = props
    const eventRepo = useEventRepository()
    const commonRepo = useCommonRepository()
    const channelRepo = useChannelRepository()
    const {getTemplateDetail} = useTemplateViewModel()
    const globalController = GlobalController.getInstance()
    const intl = useIntl()
    const funType = LocalizationFunctionType.Event
    const templateFunType = LocalizationFunctionType.Template
    const isAllMarketSetting = !marketId

    /* data flow
     * O = original data, N = new data, C = current display data
     * original data and new data both shouldn't be touched, any change only apply to current display data
     * 1. get original data from api, set to O and C, N should be empty
     * 2. user select a new template, should set to N and C
     * 3. user change any setting, should only set to C
     * compare validation rules:
     * 1. if O === C && N === undefined/null -> isCustomized = false and next button disabled
     * 2. if O === undefined/null, shouldn't able to change any setting
     * 3. if N !== undefined/null && N !== O -> isCustomized = false and next button enabled
     * 4. if N !== undefined/null && N !== C -> isCustomized = true and next button enabled
     * 5. if N === undefined/null && O !== C -> isCustomized = true and next button enabled
     *
     * value validation rules:
     * 1. C.marketSettings !== O.marketSettings && N === undefined/null -> isCustomized = true and next button enabled
     * 2. N.MarketSettings !== C.marketSettings && N.MarketSettings !== empty -> isCustomized = true and next button enabled
     */

    // original data sets
    const [situationList, setSituationList] = useState<string[]>()
    const [marketList, setMarketList] = useState<EventMarketModel[]>() // all market for this event
    const [configuration, setConfiguration] = useState<ConfigurationModel>();
    const [originalTemplateData, setOriginalTemplateData] = useState<EventMarketSettingsModel>() // original data
    const [rawTemplateData, setRawTemplateData] = useState<GetTemplateDetailModel>() // new data

    // current display data
    const [templateId, setTemplateId] = useState<string>()
    const [templateName, setTemplateName] = useState<string>()
    const rawTemplateName = useRef<string>()
    const [margin, setMargin] = useState<number>()
    const [providerPriority, setProviderPriority] = useState<EventMarketProviderPriorityModel[]>()
    const [feedOdds, setFeedOdds] = useState<EventMarketOddsSettingsModel>({
        minimum: 1,
        maximum: 1000,
        difference: 0
    })
    const [deviation, setDeviation] = useState<Deviation>()
    const [imbalancedBettingDecrease, setImbalancedBettingDecrease] = useState<EventMarketImbalanceBettingsModel>()
    const [heavyBetting, setHeavyBetting] = useState<EventMarketHeavyBettingModel>()
    const [marketsSettings, setMarketsSettings] = useState<MarketConfigModel[]>([])
    const [selectedMarketIds, setSelectedMarketIds] = useState<string[]>([])
    const [lineSettings, setLineSettings] = useState<string>()
    const [betSlipSetting, setBetSlipSetting] = useState<BetSlipSettingDataModel | undefined>({
        feederSuspend: '',
        dangerAttackAction: '',
        imbalanceSettings: {action: '', type: ''},
        belowMarginSettings: {margin: undefined as unknown as number, alertRecipients: []},
        delayedSettings: {situation: [], delayedSecond: undefined as unknown as number},
        singleBetSettings: {
            minimum: undefined as unknown as number,
            maximum: undefined as unknown as number,
            maxPayout: undefined as unknown as number
        },
        parlaySettings: {
            enabled: false,
            minimumLegs: undefined as unknown as number,
            maximumLegs: undefined as unknown as number,
            minimum: undefined as unknown as number,
            maximum: undefined as unknown as number,
            maxPayout: undefined as unknown as number,
        },
        sgpSettings: {
            enabled: false,
            minimumLegs: undefined as unknown as number,
            maximumLegs: undefined as unknown as number,
            minimum: undefined as unknown as number,
            maximum: undefined as unknown as number,
            maxPayout: undefined as unknown as number,
        },
        parlayAlert: {
            alertRecipients: [],
            targetNumber: 50,
            type: 'PERCENTAGE',
            potentialWin: undefined as unknown as number,
            sendEmail: false
        },
        rapidBetEntrySettings: {
            enabled: false,
            triggerTime: undefined as unknown as number,
            numberOfBets: undefined as unknown as number,
            suspendLine: undefined as unknown as number
        },
        autoSettlementSettings: {enabled: false, delaySettlement: undefined as unknown as number}
    })
    const updateValueChanged = useDynamicValueUpdater<BetSlipSettingDataModel>(setBetSlipSetting)

    // flags
    const isCustomized = useRef<boolean>(false)
    const [showTemplateModelDialog, setShowTemplateModelDialog] = useState<boolean>(false)
    const [templateListRenderKey, setTemplateListRenderKey] = useState<number>(0)
    const [isSubmitEnabled, setIsSubmitEnabled] = useState<boolean>(false)
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)

    // range
    const oddsMin = useRef<[number, number]>([1, feedOdds?.maximum || 1000])
    const oddsMax = useRef<[number, number]>([feedOdds?.minimum || 1, 1000])


    const pageTitle: string = intl.formatMessage({
        id: isAllMarketSetting ? `${funType}.allMarketsSettingTitle` : `${funType}.marketsSettingTitle`,
        defaultMessage: isAllMarketSetting ? 'All Markets Setting' : 'Markets Setting'
    });

    const pageDescribe: string = intl.formatMessage({
        id: isAllMarketSetting ? `${funType}.allMarketsSettingDescription` : `${funType}.marketsSettingDescription`,
        defaultMessage: isAllMarketSetting
            ? 'Please setup your preference, the setting will change all the markets in this event.'
            : 'Please setup your preference, the setting will change all the lines in this market.'
    });

    const getDangerBalls = useCallback(async () => {
        return await commonRepo.getDangerBalls()
    }, [commonRepo])

    const getEventMarketSettings = async (eventId: string, eventType: string, marketId?: string) => {
        return await eventRepo.getEventMarketSettings(toEventMarketSettingsProps(eventId, eventType, marketId));
    }
    const getEventMarketDetail = async (eventId: string, eventType: string) => {
        return await eventRepo.getEventMarketDetail(toEventMarketsDetailProps(eventId, eventType))
    }
    const getSituationList = () => {
        getDangerBalls().then(response => {
            setSituationList(response)
        })
    }
    const getConfiguration = async (eventType: string) => {
        return await channelRepo.getConfiguration(toGetConfigurationProps({eventType}))
    }
    const getProviders = async () => {
        return await commonRepo.getProviders(toProvidersProps(sportId));
    }
    const getConfigurationData = (eventType: string) => {
        getConfiguration(eventType).then(response => {
            setConfiguration(prevState => {
                if (lodash.isEqual(prevState, response)) return prevState
                return response
            })
        })
    }

    const saveData = (resource: EventMarketSettingsModel | GetTemplateDetailModel) => {
        setProviderPriority(resource.providerPriority)
        setFeedOdds(resource.oddsSettings)
        setImbalancedBettingDecrease(resource.imbalanceBettings)
        setDeviation(resource.deviation)
        setHeavyBetting(resource.heavyBettings)
        setMarketsSettings(resource.marketSettings ?? [])
        setSelectedMarketIds(resource.marketSettings?.map(item => item.marketId) ?? [])
        setLineSettings(resource.lineSettings)
        setMargin(resource.margin)
        setBetSlipSetting(prevState => {
            return {
                ...prevState,
                feederSuspend: resource.feederSuspend || defaultGetTemplateDetailModel.feederSuspend,
                dangerAttackAction: resource.dangerAttackAction || defaultGetTemplateDetailModel.dangerAttackAction,
                imbalanceSettings: resource.imbalanceSettings || defaultGetTemplateDetailModel.imbalanceSettings,
                belowMarginSettings: resource.belowMarginSettings || defaultGetTemplateDetailModel.belowMarginSettings,
                delayedSettings: resource.delayedSettings || defaultGetTemplateDetailModel.delayedSettings,
                singleBetSettings: resource.singleBetSettings || defaultGetTemplateDetailModel.singleBetSettings,
                parlaySettings: resource.parlaySettings || defaultGetTemplateDetailModel.parlaySettings,
                sgpSettings: resource.sgpSettings || defaultGetTemplateDetailModel.sgpSettings,
                parlayAlert: resource.parlayAlert || defaultGetTemplateDetailModel.parlayAlert,
                rapidBetEntrySettings: resource.rapidBetEntrySettings || defaultGetTemplateDetailModel.rapidBetEntrySettings,
                autoSettlementSettings: resource.autoSettlementSettings || defaultGetTemplateDetailModel.autoSettlementSettings
            } as BetSlipSettingDataModel
        })
        setIsFirstLoad(false)
    }

    const onTemplateChange = (template: OptionItem) => {
        const {id, name} = template
        setTemplateId(id)
        setTemplateName(name)
    }

    const onImbalancedBettingDecrease = useCallback((path: string) => (value: any) => {
        const extractedValue = extractValue(value)
        setImbalancedBettingDecrease(prevState => {
            return {
                ...prevState,
                [path]: extractedValue
            } as EventMarketImbalanceBettingsModel
        });
    }, [])

    const onDeviationChange = useCallback((path: string) => (value: any) => {
        const extractedValue = path === 'action' ? getEnumValueByKey(DeviationOption, extractValue(value)) : extractValue(value)

        setDeviation(prevState => {
            return {
                ...prevState,
                [path]: extractedValue
            } as Deviation
        });
    }, [])

    const onHeavyBettingChange = useCallback((path: string) => (value: any) => {
        const extractedValue = extractValue(value)
        setHeavyBetting(prevState => {
            return {
                ...prevState,
                [path]: extractedValue
            } as EventMarketHeavyBettingModel
        });
    }, [])

    const onFeedOddsChange = useCallback((path: string) => (value: any) => {
        const extractedValue = extractValue(value)

        setFeedOdds(prevState => {
            if (lodash.get(prevState, path) === extractedValue) return prevState
            return {
                ...prevState,
                [path]: extractedValue
            } as EventMarketOddsSettingsModel;
        })
    }, [])

    const onBetSlipSettingChange = (path: string) => (value: any) => {
        if (lodash.isEmpty(value) && !lodash.isBoolean(value) && !lodash.isArray(value)) return

        switch (path) {
            case 'feederSuspend':
                updateValueChanged(path)(getEnumKeyByValue(FeederSuspendActionType, value))
                break
            case 'dangerAttackAction':
                updateValueChanged(path)(getEnumKeyByValue(DangerAttackActionType, value))
                break
            case 'imbalanceSettings.action':
                updateValueChanged(path)(getEnumKeyByValue(ImbalanceAmountActionType, value))
                break
            case 'belowMarginSettings.alertRecipients':
            case 'parlayAlert.alertRecipients':
                updateValueChanged(path)((value as string[]).map(item => getEnumKeyByValue(AlertRecipientsRoleType, item)))
                break
            case 'parlayAlert.targetNumber':
                betSlipSetting?.parlayAlert.type === 'PERCENTAGE' ?
                    updateValueChanged(path)(Number(removePercentageSymbol(value))) : updateValueChanged(path)(value)
                break
            case 'delayedSettings.situation':
                updateValueChanged(path)((value as string[]).map(item => toUpperCaseWithUnderscore(item)))
                break
            default: {
                const newValue = value && value.target && typeof value.target?.value !== 'undefined'
                    ? value.target?.value
                    : value;
                updateValueChanged(path)(newValue)
                break
            }
        }
    }

    const onMarginLineChange = useCallback((path: string) => (value: any) => {
        if (lodash.isEmpty(value)) return
        const extractedValue = path === 'margin' ? +extractValue(value) : extractValue(value)
        const line = getEnumValueByKey(LineSettingsOptions, extractedValue)

        if (path === 'margin') setMargin(extractedValue)
        if (path === 'lineSettings') setLineSettings(line)
    }, [])

    const toProviderPriority = (e: string[]): void => {
        const array = e.map((item, index) => {
            return {
                order: index,
                provider: item
            }
        })
        setProviderPriority(() => array)
    }

    const FirstColumnsProp: IFirstRow = {
        sportId: sportId,
        sportType: sportType,
        sportName: sportName,
        templateId: templateId as string,
        templateName: templateName as string,
        templateChange: onTemplateChange,
        eventType: eventType,
        marketId: marketId,
        openNewTemplateDialog: () => setShowTemplateModelDialog(true),
        templateListRenderKey: templateListRenderKey,
        isCustomized: isCustomized.current
    }

    const ProviderPriority: SortedCardListProps = {
        title: intl.formatMessage({ id: `${templateFunType}.oddsFeedProviderPriority`,
            defaultMessage: 'Odds Feed Provider Priority' }),
        listItems: providerPriority?.map(item => item.provider) || [],
        onChange: toProviderPriority,
        disabled: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) : true
    }

    const MarginLineProp: IMarginLine = {
        margin: margin as number,
        lineSettings: lineSettings as string,
        lineSettingDropDown: configuration?.lineSetting.receive === 'MAINLINE_ONLY' ? ['MAINLINE_ONLY'] as string[] : configuration?.lineSetting.conditions as string[],
        onMarginLineChange: onMarginLineChange,
        disabled: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) : true
    }

    const FeedOddsSettingProp: IFeedOddsSetting = {
        feedOdds: feedOdds as EventMarketOddsSettingsModel,
        feedOddsChange: onFeedOddsChange,
        feedOddsRange: {
            'minimum': oddsMin.current as [number, number],
            'maximum': oddsMax.current as [number, number],
            'difference': range0To100
        },
        disabled: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) : true
    }

    const OddsDeviationProp: IOddsDeviation = {
        deviation: deviation as Deviation,
        onDeviationChange: onDeviationChange,
        thresholdRange: range0To999,
        disabled: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) : true
    }

    const ImbalancedBettingDecreaseProp: IImbalancedBettingDecrease = {
        imbalancedBettingDecrease: imbalancedBettingDecrease as EventMarketImbalanceBettingsModel,
        onImbalancedBettingDecrease: onImbalancedBettingDecrease,
        disabled: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) : true,
        imbalancedRange: {
            difference: range1To100,
            decrease: range1To100,
            recalculate: range1To999999999
        }
    }

    const HeavyBettingProp: IHeavyBetting = {
        heavyBetting: heavyBetting as EventMarketHeavyBettingModel,
        heavyBettingRange: {
            timeLimit: range1To999,
            amount: range1To999999999,
            decrease: range1To100
        },
        heavyBettingChange: onHeavyBettingChange,
        disabled: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) : true
    }

    const ParlayProps: SwitchFormProps = {
        header: {
            title: intl.formatMessage({ id: `${funType}.parlayBetSetting`, defaultMessage: 'Parlay Bet Setting' }),
            tip: intl.formatMessage({ id: `${funType}.parlayBetTip`, defaultMessage: 'Setting parlay bet limitation.' })
        },
        enabled: {
            value: Boolean(betSlipSetting?.parlaySettings.enabled),
            label: intl.formatMessage({ id: `${funType}.parlay`, defaultMessage: 'Parlay' }),
            onChange: onBetSlipSettingChange('parlaySettings.enabled'),
            disabled: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) : true
        },
        inputArr: [
            [
                {
                    label: intl.formatMessage({ id: `${funType}.minimumLegs`, defaultMessage: 'Minimum Legs' }),
                    format: 'number',
                    value: Number(betSlipSetting?.parlaySettings.minimumLegs),
                    onChange: onBetSlipSettingChange('parlaySettings.minimumLegs'),
                    header: '',
                    tip: '',
                    error: false,
                    helperText: '',
                    limit: range2To999,
                    disable: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) : true
                },
                {
                    label: intl.formatMessage({ id: `${funType}.maximumLegs`, defaultMessage: 'Maximum Legs' }),
                    format: 'number',
                    value: Number(betSlipSetting?.parlaySettings.maximumLegs),
                    onChange: onBetSlipSettingChange('parlaySettings.maximumLegs'),
                    header: '',
                    tip: '',
                    error: false,
                    helperText: '',
                    limit: range2To999,
                    disable: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) : true
                },
            ],
            [
                {
                    label: intl.formatMessage({ id: `${funType}.minimumAmount`, defaultMessage: 'Minimum Amount' }),
                    format: 'number',
                    value: Number(betSlipSetting?.parlaySettings.minimum),
                    onChange: onBetSlipSettingChange('parlaySettings.minimum'),
                    header: '',
                    tip: '',
                    error: false,
                    helperText: '',
                    limit: range1To999999999,
                    disable: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) : true
                },
                {
                    label: intl.formatMessage({ id: `${funType}.maximumAmount`, defaultMessage: 'Maximum Amount' }),
                    format: 'number',
                    value: Number(betSlipSetting?.parlaySettings.maximum),
                    onChange: onBetSlipSettingChange('parlaySettings.maximum'),
                    header: '',
                    tip: '',
                    error: false,
                    helperText: '',
                    limit: range1To999999999,
                    disable: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) : true
                },
                {
                    label: intl.formatMessage({ id: `${funType}.maximumPayoutAmount`, defaultMessage: 'Maximum Payout Amount' }),
                    format: 'number',
                    value: Number(betSlipSetting?.parlaySettings.maxPayout),
                    onChange: onBetSlipSettingChange('parlaySettings.maxPayout'),
                    header: '',
                    tip: '',
                    error: false,
                    helperText: '',
                    limit: range1To999999999,
                    disable: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) : true
                },
            ]
        ]
    }

    const SGPProps: SwitchFormProps = {
        header: {
            title: intl.formatMessage({ id: `${funType}.sgpBetSetting`, defaultMessage: 'SGP Bet Setting' }),
            tip: intl.formatMessage({ id: `${funType}.sgpBetTip`, defaultMessage: 'Setting same game parlay bet limitation.' })
        },
        enabled: {
            value: Boolean(betSlipSetting?.sgpSettings.enabled),
            label: intl.formatMessage({ id: `${funType}.sgp`, defaultMessage: 'SGP' }),
            onChange: onBetSlipSettingChange('sgpSettings.enabled'),
            disabled: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) : true
        },
        inputArr: [
            [
                {
                    label: intl.formatMessage({ id: `${funType}.minimumLegs`,
                        defaultMessage: 'Minimum Legs' }),
                    format: 'number',
                    value: Number(betSlipSetting?.sgpSettings.minimumLegs),
                    onChange: onBetSlipSettingChange('sgpSettings.minimumLegs'),
                    header: '',
                    tip: '',
                    error: false,
                    helperText: '',
                    limit: range2To999,
                    disable: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) : true
                },
                {
                    label: intl.formatMessage({ id: `${funType}.maximumLegs`,
                        defaultMessage: 'Maximum Legs' }),
                    format: 'number',
                    value: Number(betSlipSetting?.sgpSettings.maximumLegs),
                    onChange: onBetSlipSettingChange('sgpSettings.maximumLegs'),
                    header: '',
                    tip: '',
                    error: false,
                    helperText: '',
                    limit: range2To999,
                    disable: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) : true
                },
            ],
            [
                {
                    label: intl.formatMessage({ id: `${funType}.minimumAmount`,
                        defaultMessage: 'Minimum Amount' }),
                    format: 'number',
                    value: Number(betSlipSetting?.sgpSettings.minimum),
                    onChange: onBetSlipSettingChange('sgpSettings.minimum'),
                    header: '',
                    tip: '',
                    error: false,
                    helperText: '',
                    limit: range1To999999999,
                    disable: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) : true
                },
                {
                    label: intl.formatMessage({ id: `${funType}.maximumAmount`,
                        defaultMessage: 'Maximum Amount' }),
                    format: 'number',
                    value: Number(betSlipSetting?.sgpSettings.maximum),
                    onChange: onBetSlipSettingChange('sgpSettings.maximum'),
                    header: '',
                    tip: '',
                    error: false,
                    helperText: '',
                    limit: range1To999999999,
                    disable: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) : true
                },
                {
                    label: intl.formatMessage({ id: `${funType}.maximumPayoutAmount`, defaultMessage: 'Maximum Payout Amount' }),
                    format: 'number',
                    value: Number(betSlipSetting?.sgpSettings.maxPayout),
                    onChange: onBetSlipSettingChange('sgpSettings.maxPayout'),
                    header: '',
                    tip: '',
                    error: false,
                    helperText: '',
                    limit: range1To999999999,
                    disable: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) : true
                },
            ]
        ]
    }

    const RapidProps: SwitchFormProps = {
        header: {
            title: intl.formatMessage({ id: `${funType}.rapidBetEntry`, defaultMessage: 'Rapid Bet Entry' }),
            tip: intl.formatMessage({ id: `${funType}.rapidBetTip`, defaultMessage: `When Rapid Bet Entry is triggered, the system will automatically suspend the market's line.` })
        },
        enabled: {
            value: Boolean(betSlipSetting?.rapidBetEntrySettings?.enabled),
            label: intl.formatMessage({ id: `${funType}.rapidBetEntry`, defaultMessage: 'Rapid Bet Entry' }),
            onChange: onBetSlipSettingChange('rapidBetEntrySettings.enabled'),
            disabled: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) : true
        },
        inputArr: [
            [
                {
                    label: intl.formatMessage({ id: `${funType}.triggerTime`,
                        defaultMessage: 'Trigger Time (Second)' }),
                    format: 'number',
                    value: betSlipSetting?.rapidBetEntrySettings?.triggerTime,
                    onChange: onBetSlipSettingChange('rapidBetEntrySettings.triggerTime'),
                    header: '',
                    tip: '',
                    error: false,
                    helperText: '',
                    limit: range1To999999999,
                    disable: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) : true
                },
                {
                    label: intl.formatMessage({ id: `${funType}.numberOfBets`,
                        defaultMessage: 'Number Of Bets' }),
                    format: 'number',
                    value: betSlipSetting?.rapidBetEntrySettings?.numberOfBets,
                    onChange: onBetSlipSettingChange('rapidBetEntrySettings.numberOfBets'),
                    header: '',
                    tip: '',
                    error: false,
                    helperText: '',
                    limit: range1To999999999,
                    disable: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) : true
                },
                {
                    label: intl.formatMessage({ id: `${funType}.suspendLine`,
                        defaultMessage: 'Suspend line (Second)' }),
                    format: 'number',
                    value: betSlipSetting?.rapidBetEntrySettings?.suspendLine,
                    onChange: onBetSlipSettingChange('rapidBetEntrySettings.suspendLine'),
                    header: '',
                    tip: '',
                    error: false,
                    helperText: "",
                    limit: range1To999999999,
                    disable: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) : true
                },
            ]
        ]
    }

    const AutoSettlementProps: SwitchFormProps = {
        header: {
            title: intl.formatMessage({ id: `${funType}.autoSettlementSetting`, defaultMessage: 'Auto Settlement Setting' }),
            tip: intl.formatMessage({ id: `${funType}.autoSettlementSettingTip`, defaultMessage: `Setting a delay of a few seconds for auto-settlement.` })
        },
        enabled: {
            value: Boolean(betSlipSetting?.autoSettlementSettings?.enabled),
            label: intl.formatMessage({ id: `${funType}.autoSettlement`, defaultMessage: 'Auto Settlement' }),
            onChange: onBetSlipSettingChange('autoSettlementSettings.enabled'),
            disabled: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) : true
        },
        inputArr: [
            [
                {
                    label: intl.formatMessage({ id: `${funType}.delaySettlement`,
                        defaultMessage: 'Delayed Auto Settlement (Second)' }),
                    format: 'number',
                    value: betSlipSetting?.autoSettlementSettings?.delaySettlement,
                    onChange: onBetSlipSettingChange('autoSettlementSettings.delaySettlement'),
                    header: '',
                    tip: '',
                    error: false,
                    helperText: '',
                    limit: range1To999999999,
                    disable: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) : true
                }
            ]
        ]
    }

    const GeneralSettingProps: GeneralSettingProps = {
        sortCard: ProviderPriority,
        feedOddsSetting: FeedOddsSettingProp,
        marginLine: MarginLineProp,
        oddsDeviation: OddsDeviationProp,
        imbalancedBetting: ImbalancedBettingDecreaseProp,
        heavyBetting: HeavyBettingProp
    }

    const BetSlipSettingProps: BetSlipSettingProps = {
        intl: intl,
        funType: templateFunType,
        isEditable: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) as boolean: true,
        betSlipSetting: lodash.cloneDeep(betSlipSetting) as BetSlipSettingDataModel,
        onBetSlipSettingChange: onBetSlipSettingChange,
        situationEventList: situationList?.map(item => allFirstCharToUpperCase(item)) ?? [],
        parlay: ParlayProps,
        sgp: SGPProps,
        rapid: RapidProps,
        autoSettlement: AutoSettlementProps
    }

    const handleMarketSelectOnChange = useCallback((selectedMarketNames: string[]) => {
        const selectedMarketIds = marketList?.filter(market => selectedMarketNames.includes(market.marketName))
            .map(market => market.marketId);
        setSelectedMarketIds(selectedMarketIds ?? []);
    }, [marketList])

    const handleMarketRowUpdate = (row: GridRowModel) => {
        setMarketsSettings(prevData => prevData?.map(marketConfig =>
            marketConfig.marketId === row.marketId ? {...marketConfig, ...row} : marketConfig
        ));
    }

    const marketSettingsProps: MarketConfigFormContentProps = {
        eventType: eventType as EventType,
        sportId: sportId,
        markets: marketList || [],
        marketRowData: marketsSettings || [] as MarketConfigModel[],
        selectedMarketIds: selectedMarketIds,
        handleMarketSelectOnChange: handleMarketSelectOnChange,
        handleMarketRowUpdate: handleMarketRowUpdate,
        viewOnly: isAllMarketSetting ? (rawTemplateData?.isCustomized ?? originalTemplateData?.isCustomized) : true
    }

    const tabs: StatusButtonGroupProps['items'] = [{
        key: ComponentType.GeneralSetting,
        text: intl.formatMessage({ id: `common.generalSetting`, defaultMessage: 'General Setting' }),
        type: ComponentType.GeneralSetting
    },{
        key: ComponentType.BetSlipSetting,
        text: intl.formatMessage({ id: `common.betSlipSetting`, defaultMessage: 'Bet Slip Setting' }),
        type: ComponentType.BetSlipSetting,
    },{
        key: ComponentType.MarketsSetting,
        text: intl.formatMessage({ id: `event.marketsSettingTitle`, defaultMessage: 'Markets Setting' }),
        type: ComponentType.MarketsSetting,
    }]

    const convertCurrentDataToSummaryData = (): TemplateSummaryUsedModel => {
        const newData = {
            eventType: eventType,
            sportId: sportId,
            templateId: templateId as string,
            templateName: templateName as string,
            leagueId: leagueId ?? '',
            leagueName: leagueName ?? '',
            sportName: sportName,
            margin: Number(margin),
            oddsSettings: {
                minimum: Number(feedOdds?.minimum),
                maximum: Number(feedOdds?.maximum),
                difference: Number(feedOdds?.difference)
            },
            providerPriority: providerPriority as EventMarketProviderPriorityModel[],
            imbalanceBettings: imbalancedBettingDecrease as EventMarketImbalanceBettingsModel,
            heavyBettings: heavyBetting as EventMarketHeavyBettingModel,
            imbalanceSettings: betSlipSetting?.imbalanceSettings as ImbalanceSetting,
            singleBetSettings: betSlipSetting?.singleBetSettings as EventMarketSingleBetSettingsModel,
            parlaySettings: betSlipSetting?.parlaySettings as ParlaySGPSetting,
            sgpSettings: betSlipSetting?.sgpSettings as ParlaySGPSetting,
            delayedSettings: betSlipSetting?.delayedSettings,
            marketSettings: marketsSettings?.map(item => marketConfigModelToMarketSetting(item)) ?? [],
            lineSettings: lineSettings ?? '',
            deviation: deviation as Deviation,
            feederSuspend: betSlipSetting?.feederSuspend as string,
            dangerAttackAction: betSlipSetting?.dangerAttackAction as string,
            parlayAlert: {
                ...betSlipSetting?.parlayAlert,
                sendEmail: betSlipSetting?.parlayAlert?.sendEmail ? 'true' : 'false',
            } as LocalParlayAlertSetting,
            rapidBetEntrySettings: {
                ...betSlipSetting?.rapidBetEntrySettings,
                enabled: betSlipSetting?.rapidBetEntrySettings?.enabled ? 'true' : 'false',
            } as LocalRapidBetEntrySetting,
            autoSettlementSettings: {
                ...betSlipSetting?.autoSettlementSettings,
                enabled: betSlipSetting?.autoSettlementSettings?.enabled ? 'true' : 'false',
            } as LocalAutoSettlementSetting,
            isDefault: false,
            belowMarginSettings: betSlipSetting?.belowMarginSettings as LocalBelowMarginSetting
        }

        return newData
    }

    const convertCurrentDataToTemplateData = (): EventMarketSettingsModel => {
        return {
            sportName: "",
            eventType: eventType as EventType,
            sportId: sportId,
            templateId: templateId as string,
            templateName: templateName as string,
            leagueId: leagueId ?? '',
            leagueName: leagueName ?? '',
            margin: Number(margin),
            oddsSettings: {
                minimum: Number(feedOdds?.minimum),
                maximum: Number(feedOdds?.maximum),
                difference: Number(feedOdds?.difference)
            },
            providerPriority: providerPriority as EventMarketProviderPriorityModel[],
            imbalanceBettings: imbalancedBettingDecrease as EventMarketImbalanceBettingsModel,
            heavyBettings: heavyBetting as EventMarketHeavyBettingModel,
            imbalanceSettings: betSlipSetting?.imbalanceSettings as ImbalanceSetting,
            singleBetSettings: betSlipSetting?.singleBetSettings as EventMarketSingleBetSettingsModel,
            parlaySettings: betSlipSetting?.parlaySettings as ParlaySGPSetting,
            sgpSettings: betSlipSetting?.sgpSettings as ParlaySGPSetting,
            delayedSettings: {
                delayedSecond: betSlipSetting?.delayedSettings.delayedSecond ?? undefined as unknown as number,
                situation: betSlipSetting?.delayedSettings.situation.toSorted((a, b) => {
                    const indexA =
                        rawTemplateData?.delayedSettings?.situation
                            ? rawTemplateData?.delayedSettings?.situation.indexOf(a)
                            : originalTemplateData?.delayedSettings?.situation
                                ? originalTemplateData?.delayedSettings?.situation.indexOf(a)
                                : betSlipSetting?.delayedSettings.situation.indexOf(a);
                    const indexB =
                        rawTemplateData?.delayedSettings?.situation
                            ? rawTemplateData?.delayedSettings?.situation.indexOf(b)
                            : originalTemplateData?.delayedSettings?.situation
                                ? originalTemplateData?.delayedSettings?.situation.indexOf(b)
                                : betSlipSetting?.delayedSettings.situation.indexOf(b);
                    return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
                }) ?? []
            },
            marketSettings: marketsSettings ?? [],
            lineSettings: lineSettings ?? '',
            deviation: deviation as Deviation,
            feederSuspend: betSlipSetting?.feederSuspend as string,
            dangerAttackAction: betSlipSetting?.dangerAttackAction as string,
            parlayAlert: betSlipSetting?.parlayAlert as ParlayAlertSetting,
            rapidBetEntrySettings: betSlipSetting?.rapidBetEntrySettings as RapidBetEntrySetting,
            autoSettlementSettings: betSlipSetting?.autoSettlementSettings as AutoSettlementSetting,
            belowMarginSettings: betSlipSetting?.belowMarginSettings as BelowMarginSetting,
            isCustomized: isCustomized.current
        }
    }

    const onClickNext = () => {
        const combinedData = isCustomized ? convertCurrentDataToSummaryData() : originalTemplateData

        const data: TemplateSummaryFormProps = {
            comeFromPage: isAllMarketSetting ? ComeFromPage.AllMarketSetting : ComeFromPage.MarketSetting,
            adjustable: false,
            eventIds: eventId ? [eventId] : [],
            preValue: combinedData as TemplateSummaryUsedModel,
            refValue: convertCurrentDataToSummaryData(),
            marketId: marketId,
            isCustomized: isCustomized.current
        }

        if (onNext) {
            onNext(data)
        }
    }

    useEffect(() => {
        // To get new template and set to current display data
        const fetchData = (templateId: string) => {
            getTemplateDetail(templateId).then(response => {
                saveData(response) // save to C
                if (originalTemplateData?.templateId === templateId) {
                    setOriginalTemplateData(response) // save to O
                } else {
                    setRawTemplateData(response) // save to N
                }
            })
        }

        if (templateId) fetchData(templateId)
    }, [templateId]);

    useEffect(() => {
        if (!eventId) return
        const fetchData = () => {
            getEventMarketDetail(eventId, eventType).then(response => {
                setMarketList(response)
            })
        }

        fetchData()
    }, [eventId, eventType]);

    useEffect(() => {
        getConfigurationData(eventType)
        if (isAllMarketSetting) {
            const providers = getProviders()
            providers.then(response => {
                setProviderPriority(response.map((item, index) => {
                    return {
                        order: index + 1,
                        provider: item
                    }
                }))
                setOriginalTemplateData((prev) => {
                    return prev ? {...prev, providerPriority: response.map((item, index) => {
                            return {
                                order: index + 1,
                                provider: item
                            }
                        })} : prev
                })
            })
            getSituationList()
            if (!templateName) {
                setTemplateName("no use template")
                rawTemplateName.current = "no use template"
            }
        }
        if (!eventId) return
        const fetchData = () => {
            getEventMarketSettings(eventId, eventType, marketId).then(response => {
                if (response) {
                    // save to original data
                    setOriginalTemplateData(response)
                    setTemplateId(response.templateId)
                    setTemplateName(response.templateName)
                    const marketSettingResponse = lodash.cloneDeep(response)
                    // copy to current data
                    saveData(marketSettingResponse)
                } else {
                    setOriginalTemplateData({
                        eventType: eventType,
                        sportId: sportId,
                        templateId: templateId as string,
                        templateName: templateName as string,
                        leagueId: leagueId ?? '',
                        leagueName: leagueName ?? '',
                        sportName: sportName,
                        margin: Number(margin),
                        oddsSettings: {
                            minimum: Number(feedOdds?.minimum),
                            maximum: Number(feedOdds?.maximum),
                            difference: Number(feedOdds?.difference)
                        },
                        providerPriority: providerPriority as EventMarketProviderPriorityModel[],
                        imbalanceBettings: imbalancedBettingDecrease as EventMarketImbalanceBettingsModel,
                        heavyBettings: heavyBetting as EventMarketHeavyBettingModel,
                        imbalanceSettings: betSlipSetting?.imbalanceSettings as ImbalanceSetting,
                        singleBetSettings: betSlipSetting?.singleBetSettings as EventMarketSingleBetSettingsModel,
                        parlaySettings: betSlipSetting?.parlaySettings as ParlaySGPSetting,
                        sgpSettings: betSlipSetting?.sgpSettings as ParlaySGPSetting,
                        delayedSettings: betSlipSetting?.delayedSettings,
                        marketSettings: marketsSettings ?? [],
                        lineSettings: lineSettings ?? '',
                        deviation: deviation as Deviation,
                        feederSuspend: betSlipSetting?.feederSuspend as string,
                        dangerAttackAction: betSlipSetting?.dangerAttackAction as string,
                        parlayAlert: betSlipSetting?.parlayAlert ?? undefined as unknown as ParlayAlertSetting,
                        rapidBetEntrySettings: betSlipSetting?.rapidBetEntrySettings,
                        autoSettlementSettings: betSlipSetting?.autoSettlementSettings,
                        belowMarginSettings: betSlipSetting?.belowMarginSettings
                    })
                    setIsFirstLoad(false)
                }
            }).catch((error) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: error.message
                })
            })
        }
        fetchData();
    }, []);

    useEffect(() => {
        const totalMarketConfigs = marketList
            ?.filter(market => selectedMarketIds.includes(market.marketId))
            ?.map(market => {
                const existingConfig =
                    marketsSettings?.find(config => config.marketId === market.marketId)
                return lodash.cloneDeep(existingConfig) || {
                    marketId: market.marketId,
                    marketName: market.marketName,
                    margin: configuration?.defaultMargin ?? 0,
                    minimumDifference: configuration?.oddsSettings.difference ?? 0,
                    lineSettings: configuration?.lineSetting.receive ?? LineSettingsOptions['No Limit'],
                    singleBetSettings: {
                        minimum: 1,
                        maximum: 10000,
                        maxPayout: 10000
                    },
                    parlayable: false,
                    sgpable: false
                } as MarketConfigModel
            })
        if (totalMarketConfigs) setMarketsSettings(totalMarketConfigs);
    }, [selectedMarketIds, marketList])

    const isValidEditData = (base?: EventMarketSettingsModel, target?: EventMarketSettingsModel): boolean => {
        if (!base && !target) return false

        const compareBelowMarginSettings = () => {
            const {alertRecipients: bAlertRecipients} = (base?.belowMarginSettings as BelowMarginSetting) || {};
            const {alertRecipients: tAlertRecipients} = (target?.belowMarginSettings as BelowMarginSetting) || {};
            return lodash.isEqualWith(
                {...base?.belowMarginSettings, alertRecipients: bAlertRecipients?.toSorted((a, b) => a.localeCompare(b))},
                {...target?.belowMarginSettings, alertRecipients: tAlertRecipients?.toSorted((a, b) => a.localeCompare(b))},
                customCompare)
        }
        const compareDelayedSettings = () => {
            const {situation: bSituation } = (base?.delayedSettings as DelayedSettings) || {};
            const {situation: tSituation} = (target?.delayedSettings as DelayedSettings) || {};
            return lodash.isEqualWith(
                {...base?.delayedSettings, situation: bSituation?.toSorted((a, b) => a.localeCompare(b))},
                {...target?.delayedSettings, situation: tSituation?.toSorted((a, b) => a.localeCompare(b))},
                customCompare)
        }
        const compareParlayAlert = () => {
            const {alertRecipients: bAlertRecipients} = (base?.parlayAlert as ParlayAlertSetting) || {};
            const {alertRecipients: tAlertRecipients} = (target?.parlayAlert as ParlayAlertSetting) || {};
            return lodash.isEqualWith(
                {...base?.parlayAlert, alertRecipients: bAlertRecipients?.toSorted((a, b) => a.localeCompare(b))},
                {...target?.parlayAlert, alertRecipients: tAlertRecipients?.toSorted((a, b) => a.localeCompare(b))},
                customCompare)
        }

        const isSameTemplateName = (lodash.isEmpty(base?.templateName) && lodash.isEqual(target?.templateName, 'no use template')) || lodash.isEqual(base?.templateName, target?.templateName)
        const isSameProviderPriority =
            lodash.isEqual(
                base?.providerPriority?.toSorted((a, b) => a.provider.localeCompare(b.provider)),
                target?.providerPriority?.toSorted((a, b) => a.provider.localeCompare(b.provider)))
        const isSameOddsSettings = lodash.isEqualWith(base?.oddsSettings, target?.oddsSettings, customCompare)
        const isSameMargin = lodash.isEqual(base?.margin, target?.margin)
        const isSameLineSettings = lodash.isEqual(base?.lineSettings, target?.lineSettings)
        const isSameDeviation = lodash.isEqualWith(base?.deviation, target?.deviation, customCompare)
        const isSameImbalanceBettings = lodash.isEqualWith(base?.imbalanceBettings, target?.imbalanceBettings, customCompare)
        const isSameHeavyBettings = lodash.isEqualWith(base?.heavyBettings, target?.heavyBettings, customCompare)
        const isSameFeederSuspend = lodash.isEqual(base?.feederSuspend, target?.feederSuspend)
        const isSameDangerAttackAction = lodash.isEqual(base?.dangerAttackAction, target?.dangerAttackAction)
        const isSameImbalanceSettings = lodash.isEqualWith(base?.imbalanceSettings, target?.imbalanceSettings, customCompare)
        const isSameBelowMarginSettings = compareBelowMarginSettings()
        const isSameDelayedSettings = compareDelayedSettings()
        const isSameSingleBetSettings = lodash.isEqualWith(base?.singleBetSettings, target?.singleBetSettings, customCompare)
        const isSameParlaySettings = lodash.isEqualWith(base?.parlaySettings, target?.parlaySettings, customCompare)
        const isSameSgpSettings = lodash.isEqualWith(base?.sgpSettings, target?.sgpSettings, customCompare)
        const isSameParlayAlert = compareParlayAlert()
        const isSameRapidBetEntrySettings = lodash.isEqualWith(base?.rapidBetEntrySettings, target?.rapidBetEntrySettings, customCompare)
        const isSameAutoSettlementSettings = lodash.isEqualWith(base?.autoSettlementSettings, target?.autoSettlementSettings, customCompare)
        const isSameMarketSettings =
            lodash.isEqualWith(
                base?.marketSettings?.toSorted((a, b) => a.marketId.localeCompare(b.marketId)),
                target?.marketSettings?.toSorted((a, b) => a.marketId.localeCompare(b.marketId)),
                customCompare)

        const verifyAll = [
            !isSameTemplateName,
            !isSameProviderPriority,
            !isSameOddsSettings,
            !isSameMargin,
            !isSameLineSettings,
            !isSameDeviation,
            !isSameImbalanceBettings,
            !isSameHeavyBettings,
            !isSameFeederSuspend,
            !isSameDangerAttackAction,
            !isSameImbalanceSettings,
            !isSameBelowMarginSettings,
            !isSameDelayedSettings,
            !isSameSingleBetSettings,
            !isSameParlaySettings,
            !isSameSgpSettings,
            !isSameParlayAlert,
            !isSameRapidBetEntrySettings,
            !isSameAutoSettlementSettings,
            !isSameMarketSettings,
            !compareBelowMarginSettings(),
            !compareDelayedSettings(),
            !compareParlayAlert(),
        ]
        return verifyAll.some(Boolean)
    }

    useEffect(() => {
        if (isFirstLoad) return

        const checkIsSubmitEnabled = () => {
            const summaryData = convertCurrentDataToSummaryData()
            const isRequiredFieldsFilled = checkIsRequiredFieldsFilled(summaryData)
            const inRange = isOutOfRange({ // I don't know why the method name called isOutOfRange, but the return value is the opposite
                margin: margin as number,
                marginRange: range0To999,
                feedOdds,
                oddsMin: oddsMin.current as [number, number],
                oddsMax: oddsMax.current as [number, number],
                deviation,
                imbalancedBettingDecrease,
                decreaseRange: range1To100,
                heavyBetting,
                betSlipSetting: betSlipSetting as BetSlipSettingDataModel,
                belowMarginLimit: range0To999,
                passRateOptions,
            })

            /**
             * Check if the current data is edited
             * isOldEditData - check if the current data is edited from the original data
             * isNewEditData - check if the current data is edited from the new data
             * isSelectedNewData - check if the new data is different from the original data
             * The actual operation of each check as below:
             * 1. Actually when first time comes in,
             *    if the original data is empty (which is the template name of current will set to "no use template"),
             *    will copy current data to original data, so the isOldEditData will be false.
             * 2. If the original data is not empty, original data will copy to current data,
             *    so when compare current data with original data, if anything different it will consider as edited.
             * 3. If this event do using template, the template detail will set to new data, and then copy to current data,
             *    so when compare current data with new data, if anything different it will consider as edited.
             * 4. If the user select the new template at any time, the new template will set to new data,
             *    and only compare with original data to know it is selected new data.
             * 5. When selected a new template, and then edited the current data, both isNewEditData and isSelectedNewData will be true.
             *    At this moment, it will consider as edited and customized.
             *
             * About the customized flag:
             * 1. If the current data is edited, the customized flag will be true.
             * 2. If the new data is edited and not selected new data, the customized flag will be true.
             * 3. Actually the customized flag will be true when the current data is edited and not selected new data.
             */
            const currentTemplateData = convertCurrentDataToTemplateData();

            const isOldEditData = rawTemplateData ? false : isValidEditData(originalTemplateData as EventMarketSettingsModel, currentTemplateData);
            const isNewEditData = rawTemplateData ? isValidEditData(rawTemplateData as EventMarketSettingsModel, currentTemplateData) : false;
            const isSelectedNewData = rawTemplateData ? isValidEditData(originalTemplateData, rawTemplateData) : false;

            const isEditedData = rawTemplateData
                ? isNewEditData || isSelectedNewData
                : isOldEditData;

            isCustomized.current = isEditedData && (isOldEditData || isNewEditData);

            return (isEditedData && isRequiredFieldsFilled && inRange)
        }

        const submitEnabled = checkIsSubmitEnabled()

        setIsSubmitEnabled(submitEnabled);

    }, [templateId,
        marketId,
        margin,
        deviation,
        imbalancedBettingDecrease,
        heavyBetting,
        feedOdds,
        betSlipSetting,
        marketsSettings,
        lineSettings,
        templateName,
        providerPriority
    ]);

    return {
        pageTitle,
        pageDescribe,
        FirstColumnsProp,
        onClickNext,
        marketList,
        showTemplateModelDialog,
        setShowTemplateModelDialog,
        templateId,
        refresh: (templateId?: string) => {
            if (templateId) {
                setTemplateId(templateId)
                setTemplateListRenderKey(prevState => prevState + 1)
            }
        },
        openNewTemplateDialog: () => setShowTemplateModelDialog(true),
        isSubmitEnabled,
        intl,
        funCommonType: LocalizationFunctionType.Common,
        tabs,
        GeneralSettingProps,
        BetSlipSettingProps,
        marketSettingsProps
    }
}

export default useMarketSettingViewModel