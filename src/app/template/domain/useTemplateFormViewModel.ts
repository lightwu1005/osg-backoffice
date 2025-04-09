import * as React from "react";
import {useCallback, useEffect, useRef, useState} from "react";
import {BetSlipSettingDataModel, IFirstRowTemplate} from "@/app/template/models/TemplateDetailDataModel"
import useCommonRepository from "@/services/@common/repository/useCommonRepository";
import {toGetTemplateMarketsProps} from "@/app/dashboard/models/RequestDataMapping";
import {
    ConfigurationModel,
    Deviation,
    EventMarketHeavyBettingModel,
    EventMarketImbalanceBettingsModel,
    EventMarketOddsSettingsModel,
    EventMarketProviderPriorityModel,
    GetTemplateDetailModel,
    MarketConfigModel,
    BelowMarginSetting,
    ImbalanceSetting
} from "@/services/@core/module/ResponseDataModels";
import {
    DeviationOption,
    IFeedOddsSetting,
    IHeavyBetting,
    IImbalancedBettingDecrease,
    IMarginLine,
    IOddsDeviation,
    LineSettingsOptions,
    MarketList
} from "@/app/eventDetail/models/dataModel/MarketSettingDataModel";
import {SwitchFormProps} from "@/modules/components/switchForm/SwitchForm";
import {toGetTemplateDetailProps} from "@/app/template/models/RequestDataMapping";
import useTemplateRepository from "@/services/@template/respository/useTemplateRepository";
import {
    LocalRapidBetEntrySetting,
    LocalAutoSettlementSetting,
    marketConfigModelToMarketSetting,
    TemplateSummaryUsedModel, LocalParlayAlertSetting,
} from "@/app/eventDetail/models/dataModel/EventDetailOddsDataModel";
import {TemplateFormProps} from "@/app/template/pageComponent/TemplateForm";
import {ComeFromPage, TemplateSummaryFormProps} from "@/app/eventDetail/components/pageComponent/TemplateSummaryForm";
import useTabViewModel from "@/viewModels/useTabViewModel";
import {GetTemplateMarketsParameters} from "@/app/eventList/models/EventQueryParameters";
import {GlobalController} from "@/modules/common/GlobalController";
import {allFirstCharToUpperCase, toUpperCaseWithUnderscore} from "@/modules/common/DisplayFormatConverter";
import {toGetConfigurationProps} from "@/app/configuration/models/RequestDataMapping";
import useChannelRepository from "@/services/@channel/respository/useChannelRepository";
import lodash from "lodash";
import PermissionHandler from "@/modules/common/PermissionHandler";
import IdentityHandler from "@/modules/common/IdentityHandler";
import {SortedCardListProps} from "@/app/eventDetail/components/marketSetting/SortedCardList";
import {
    extractValue,
    getEnumKeyByValue,
    getEnumValueByKey,
    useDynamicValueUpdater
} from "@/modules/common/DataProcessUnit";
import {range0To100, range0To999, range1To100, range1To999, range1To999999999, range2To999} from "@/utils/rangeLimits";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {useIntl} from "react-intl";
import {
    checkIsRequiredFieldsFilled,
    GetTemplateDetailModelWithoutData,
    isOutOfRange,
    isValidEditData,
    getEnabledStatus,
    EditDataValidationParams
} from "@/app/template/domain/TemplateModelValidationUtils";
import {GetConfigurationParameters} from "@/app/configuration/models/ConfigurationParameters";
import {EventType} from "@/services/@core/module/Enum";
import {StatusButtonGroupProps} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup";
import {GeneralSettingProps} from "@/app/template/components/GeneralSetting";
import {GridRowModel} from "@mui/x-data-grid-pro";
import {MarketConfigFormContentProps} from "@/app/template/components/marketConfigForm/MarketConfigFormContent";
import {BetSlipSettingProps} from "@/app/template/components/BetSlipSetting";
import {
    DangerAttackActionType,
    FeederSuspendActionType,
    ImbalanceAmountActionType,
    AlertRecipientsRoleType
} from "@/app/template/models/actionType"
import { OptionItem } from "@/modules/components/buttons/multipleFilterButton/models/Interface";

export enum ComponentType {
    'GeneralSetting' = 'GeneralSetting',
    'BetSlipSetting' = 'BetSlipSetting',
    'MarketsSetting' = 'MarketsSetting'
}

export const passRateOptions = ['50', '60', '70', '80', '90']

export function removePercentageSymbol(input: string) {
    return input.replace(/%/g, '');
}

interface DefaultCheckBoxProps {
    title: string;
    defaultChecked: boolean;
    onCheck?: (event: React.SyntheticEvent, checked: boolean) => void;
}

const useTemplateFormViewModel = (props: TemplateFormProps) => {
    const {eventType, editTemplateId, onPublish, viewOnly, isDuplicate} = props
    const commonRepo = useCommonRepository()
    const templateRepo = useTemplateRepository()
    const channelRepo = useChannelRepository()
    const {sportCategories} = useTabViewModel()
    const globalController = GlobalController.getInstance()

    const getDangerBalls = useCallback(async () => {
        return await commonRepo.getDangerBalls()
    }, [commonRepo])
    const getTemplateDetail = useCallback(async (prop: string): Promise<GetTemplateDetailModel> => {
        return await templateRepo.getTemplateDetail(toGetTemplateDetailProps(prop))
    }, [templateRepo])
    const getTemplateMarkets = useCallback(async (requestData: GetTemplateMarketsParameters) => {
        return await templateRepo.getTemplateMarkets(toGetTemplateMarketsProps(requestData))
    }, [templateRepo])
    const getConfiguration = useCallback(async (parameters: GetConfigurationParameters) => {
        return await channelRepo.getConfiguration(toGetConfigurationProps(parameters))
    }, [channelRepo])

    const {isEditable: checkEdit} = PermissionHandler();
    const {userRole} = IdentityHandler();
    const isEditable = checkEdit(userRole, 'template');

    const intl = useIntl();
    const funType = LocalizationFunctionType.Template;
    const pageTitle = (editTemplateId && !isDuplicate)
        ? intl.formatMessage({ id: `${funType}.formTitleUpdate`, defaultMessage: 'Edit Template' })
        : intl.formatMessage({ id: `${funType}.formTitleCreate`, defaultMessage: 'Create a template' });

    const pageDescribe = (editTemplateId && !isDuplicate)
        ? intl.formatMessage({ id: `${funType}.formSubtitleUpdate`, defaultMessage: 'Please complete fields to edit the template.' })
        : intl.formatMessage({ id: `${funType}.formSubtitleCreate`, defaultMessage: 'Please complete fields to create the template.' });

    const [response, setResponse] = useState<GetTemplateDetailModel>()
    const [queryParams, setQueryParams] = useState<GetTemplateMarketsParameters>({
        page: 1,
        pageSize: 100,
        sportId: '',
        eventType: eventType,
    })

    const [templateName, setTemplateName] = useState<string>('')
    const [sportName, setSportName] = useState<string>('')
    const [sportId, setSportId] = useState<string>()
    const [leagues, setLeagues] = useState<OptionItem[]>([])
    const [isDefault, setIsDefault] = useState<boolean>(false)
    const [margin, setMargin] = useState<number>(0)
    const [feedOdds, setFeedOdds] = useState<EventMarketOddsSettingsModel>({
        minimum: 1, maximum: 1000, difference: 0
    })
    const [deviation, setDeviation] = useState<Deviation>()
    const [imbalancedBettingDecrease, setImbalancedBettingDecrease] = useState<EventMarketImbalanceBettingsModel>()
    const [heavyBetting, setHeavyBetting] = useState<EventMarketHeavyBettingModel>()
    const [marketList, setMarketList] = useState<MarketList[]>()
    const [lineSettings, setLineSettings] = useState<string>()
    const [providerPriority, setProviderPriority] = useState<EventMarketProviderPriorityModel[]>([
        {
            order: 0,
            provider: ''
        }
    ])
    const [configuration, setConfiguration] = useState<ConfigurationModel>();
    const [marketSettings, setMarketSettings] = useState<MarketConfigModel[]>([])
    const [selectedMarketIds, setSelectedMarketIds] = useState<string[]>([])

    const [betSlipSetting, setBetSlipSetting] = useState<BetSlipSettingDataModel>()
    const updateValueChanged = useDynamicValueUpdater<BetSlipSettingDataModel>(setBetSlipSetting)
    const [situationList, setSituationList] = useState<string[]>()

    const oddsMin = useRef<[number, number]>([1, feedOdds?.maximum || 1000])
    const oddsMax = useRef<[number, number]>([feedOdds?.minimum || 1, 1000])

    const getTemplateMarketList = (requestData: GetTemplateMarketsParameters) => {
        getTemplateMarkets(requestData).then(res => {
            const markets: MarketList[] = res.content.map(item => {
                return {
                    marketName: item.marketName,
                    marketId: item.marketId
                }
            })
            setMarketList(markets)
        }).catch((error) => {
            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                severity: 'error',
                show: true,
                message: error.message
            });
        })
    }
    const getSituationList = () => {
        getDangerBalls().then(response => {
            setSituationList(response)
        }).catch((error) => {
            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                severity: 'error',
                show: true,
                message: error.message
            });
        })
    }

    const getTemplateDetailData = useCallback((id: string) => {
        getTemplateDetail(id).then(res => {
            setResponse(lodash.cloneDeep(res))
            if (!isDuplicate && res.isDefault) setIsDefault(res.isDefault)
            if (!isDuplicate) setTemplateName(res.templateName ?? '')
            setSportName(res.sportName)
            setSportId(res.sportId)
            setQueryParams(prevState => {
                return {
                    ...prevState,
                    sportId: res.sportId
                }
            })
            setMarketSettings(res.marketSettings ?? [])
            setSelectedMarketIds(res.marketSettings?.map(item => item.marketId) ?? [])
            setProviderPriority(res.providerPriority?.sort((a, b) => a.order - b.order) ?? [])
            if (!isDuplicate)
                setLeagues(res.leagues?.map(league => {
                    return {
                        id: league.leagueId,
                        name: league.leagueName
                    }
                }) ?? [])
            setFeedOdds(() => {
                return {
                    minimum: res.oddsSettings?.minimum || 0,
                    maximum: res.oddsSettings?.maximum || 0,
                    difference: res.oddsSettings?.difference || 0
                }
            })

            setImbalancedBettingDecrease((prevState) => {
                return {
                    ...prevState,
                    decrease: res.imbalanceBettings?.decrease,
                    updateType: res.imbalanceBettings?.updateType,
                    difference: res.imbalanceBettings?.difference,
                    recalculate: res.imbalanceBettings?.recalculate
                }
            })
            setHeavyBetting((prevState) => {
                return {
                    ...prevState,
                    decrease: res.heavyBettings?.decrease,
                    updateType: res.heavyBettings?.updateType,
                    timeLimit: res.heavyBettings?.timeLimit,
                    amount: res.heavyBettings?.amount
                }
            })
            setMargin(res.margin)
            setLineSettings(res.lineSettings)
            setDeviation(res.deviation)

            setBetSlipSetting(prevState => {
                return {
                    ...prevState,
                    feederSuspend: res.feederSuspend,
                    dangerAttackAction: res.dangerAttackAction,
                    imbalanceSettings: res.imbalanceSettings,
                    belowMarginSettings: res.belowMarginSettings,
                    delayedSettings: res.delayedSettings,
                    singleBetSettings: res.singleBetSettings,
                    parlaySettings: res.parlaySettings,
                    sgpSettings: res.sgpSettings,
                    parlayAlert: res.parlayAlert,
                    rapidBetEntrySettings: res.rapidBetEntrySettings,
                    autoSettlementSettings: res.autoSettlementSettings
                } as BetSlipSettingDataModel
            })
        }).catch((error) => {
            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                severity: 'error',
                show: true,
                message: error.message
            });
        })
    }, [getTemplateDetail, globalController])
    const getConfigurationData = () => {
        const resuest: GetConfigurationParameters = {
            eventType: eventType as EventType
        }
        getConfiguration(resuest).then(response => {
            if (!response) return
            setConfiguration(prevState => {
                if (lodash.isEqual(prevState, response)) return prevState
                return response
            })
        })
    }

    useEffect(() => {
        if (editTemplateId) getTemplateDetailData(editTemplateId)
        if (!editTemplateId && configuration) {
            setProviderPriority(() => {
                const providers = configuration.supportProviders
                if (!providers) return []
                return providers.map((item, index) => {
                    return {
                        order: index,
                        provider: item
                    }
                })
            })
            setBetSlipSetting({
                feederSuspend: '',
                dangerAttackAction: '',
                imbalanceSettings: {
                    action: '',
                    type: '',
                },
                belowMarginSettings: {
                    margin: undefined as unknown as number,
                    alertRecipients: []
                },
                delayedSettings: {
                    situation: [],
                    delayedSecond: undefined as unknown as number,
                },
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
                autoSettlementSettings: {
                    enabled: false,
                    delaySettlement: undefined as unknown as number,
                }
            })
        }
    }, [editTemplateId, configuration]);

    useEffect(() => {
        if (queryParams.eventType && queryParams.sportId) {
            getTemplateMarketList(queryParams)
        }
    }, [queryParams, sportId, sportName])

    const getSportId = useCallback((): string => {
        const currentSport = sportCategories.find((item) => item.sportName === sportName)!
        return currentSport?.sportId
    }, [sportName, sportCategories])

    useEffect(() => {
        const sportId = getSportId()
        setSportId(sportId)
        setQueryParams(prevState => {
            return {
                ...prevState,
                sportId: sportId
            }
        })
    }, [sportName]);

    useEffect(() => {
        if (leagues) {
            setQueryParams(prevState => {
                return {
                    ...prevState,
                    leagueIds: leagues.map(item => item.id)
                }
            })
        }
        if (!leagues) {
            setQueryParams(prevState => {
                const {leagueIds, ...state} = prevState
                return state
            })
        }
    }, [leagues]);

    useEffect(() => {
        getConfigurationData()
        getSituationList()
    }, []);

    useEffect(() => {
        const totalMarketConfigs = marketList
            ?.filter(market => selectedMarketIds.includes(market.marketId))
            ?.map(market => {
                const existingConfig =
                    response?.marketSettings?.find(config => config.marketId === market.marketId) ||
                    marketSettings.find(config => config.marketId === market.marketId);
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
                } as MarketConfigModel;
            })
        if (totalMarketConfigs) setMarketSettings(totalMarketConfigs);
    }, [selectedMarketIds, marketList]);

    const toProviderPriority = (e: string[]): void => {
        const array = e.map((item, index) => {
            return {
                order: index,
                provider: item
            }
        })
        setProviderPriority(() => array)
    }

    const onSportChange = (e: string) => {
        setSportName(e)
        setLeagues([])
    }

    const onDeviationChange = useCallback((path: string) => (value: any) => {
        if (lodash.isEmpty(value)) return
        const extractedValue = path === 'action' ? getEnumValueByKey(DeviationOption, extractValue(value)) : +extractValue(value)

        setDeviation(prevState => {
            return {
                ...prevState,
                [path]: extractedValue
            } as Deviation
        });
    }, [])
    const onMarginLineChange = useCallback((path: string) => (value: any) => {
        if (lodash.isEmpty(value)) return
        const extractedValue = path === 'margin' ? +extractValue(value) : extractValue(value)
        const line = getEnumValueByKey(LineSettingsOptions, extractedValue)

        if (path === 'margin') setMargin(extractedValue)
        if (path === 'lineSettings') setLineSettings(line)
    }, [])

    const onImbalancedBettingDecrease = useCallback((path: string) => (value: any) => {
        const extractedValue = extractValue(value)
        setImbalancedBettingDecrease(prevState => {
            return {
                ...prevState,
                [path]: extractedValue
            } as EventMarketImbalanceBettingsModel
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
                [path]: +extractedValue
            } as EventMarketOddsSettingsModel;
        })
    }, [])

    const onDefaultChange = useCallback((event: React.SyntheticEvent, checked: boolean) => {
        setIsDefault(checked)
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
            case 'imbalanceSettings.type':
            case 'parlayAlert.type':
                updateValueChanged(path)(value.target.defaultValue)
                break
            case 'delayedSettings.situation':
                updateValueChanged(path)((value as string[]).map(item => toUpperCaseWithUnderscore(item)))
                break
            default:
                updateValueChanged(path)(value)
                break
        }
    }

    const onParlaySgpChange = (path: string) => (value: any) => {
        const realValue = lodash.isBoolean(value) ? value : extractValue(value)

        if (path.includes('parlaySettings')) {
            setBetSlipSetting(prevState => ({
                ...prevState,
                parlaySettings: {
                    ...prevState?.parlaySettings,
                    [path.split('.')[1]]: realValue,
                },
            } as BetSlipSettingDataModel))
        }

        if (path.includes('sgpSettings')) {
            setBetSlipSetting(prevState => ({
                ...prevState,
                sgpSettings: {
                    ...prevState?.sgpSettings,
                    [path.split('.')[1]]: realValue,
                },
            } as BetSlipSettingDataModel))
        }
    }

    const handleMarketSelectOnChange = (selectedMarketNames: string[]) => {
        const selectedMarketIds = marketList?.filter(market => selectedMarketNames.includes(market.marketName))
            .map(market => market.marketId);
        setSelectedMarketIds(selectedMarketIds ?? []);
    }

    const handleMarketRowUpdate = (row: GridRowModel) => {
        setMarketSettings(prevData => prevData.map(marketConfig =>
            marketConfig.marketId === row.marketId ? {...marketConfig, ...row} : marketConfig
        ));
    }

    const FirstRowTemplateProp: IFirstRowTemplate = {
        disabled: viewOnly ?? !isEditable,
        sportCategories,
        templateName: templateName as string,
        isDuplicate: isDuplicate,
        isEditTemplate: isDuplicate ? false : !lodash.isEmpty(editTemplateId ?? ''),
        templateChange: setTemplateName,
        sportName: sportName as string,
        sportId: sportId as string,
        sportChange: onSportChange,
        leagues: leagues as OptionItem[],
        leaguesChange: setLeagues,
    }
    const DefaultSettingProp: DefaultCheckBoxProps = {
        title: intl.formatMessage({ id: `${funType}.setDefaultTitle`, defaultMessage: 'Set as default template?' }),
        defaultChecked: isDefault,
        onCheck: onDefaultChange
    }
    const ProviderPriorityProp: SortedCardListProps = {
        title: intl.formatMessage({ id: `${funType}.oddsFeedProviderPriority`,
            defaultMessage: 'Odds Feed Provider Priority' }),
        disabled: viewOnly ?? !isEditable,
        listItems: providerPriority.map(item => item.provider),
        onChange: toProviderPriority
    }
    const FeedOddsSettingProp: IFeedOddsSetting = {
        disabled: viewOnly ?? !isEditable,
        feedOdds: feedOdds as EventMarketOddsSettingsModel,
        feedOddsChange: onFeedOddsChange,
        feedOddsRange: {
            'minimum': oddsMin.current as [number, number],
            'maximum': oddsMax.current as [number, number],
            'difference': range0To100
        }
    }
    const OddsDeviationProp: IOddsDeviation = {
        deviation: deviation as Deviation,
        onDeviationChange: onDeviationChange,
        thresholdRange: range0To999,
        disabled: viewOnly ?? !isEditable
    }
    const ImbalancedBettingDecreaseProp: IImbalancedBettingDecrease = {
        imbalancedBettingDecrease: imbalancedBettingDecrease as EventMarketImbalanceBettingsModel,
        onImbalancedBettingDecrease: onImbalancedBettingDecrease,
        imbalancedRange: {
            difference: range1To100,
            decrease: range1To100,
            recalculate: range1To999999999
        },
        disabled: viewOnly ?? !isEditable
    }
    const HeavyBettingProp: IHeavyBetting = {
        heavyBetting: heavyBetting as EventMarketHeavyBettingModel,
        heavyBettingChange: onHeavyBettingChange,
        heavyBettingRange: {
            timeLimit: range1To999,
            amount: range1To999999999,
            decrease: range1To100
        },
        disabled: viewOnly ?? !isEditable
    }
    const ParlayProps: SwitchFormProps = {
        header: {
            title: intl.formatMessage({ id: `${funType}.parlayBetSetting`, defaultMessage: 'Parlay Bet Setting' }),
            tip: intl.formatMessage({ id: `${funType}.parlayBetTip`, defaultMessage: 'Setting parlay bet limitation.' })
        },
        enabled: {
            value: Boolean(betSlipSetting?.parlaySettings.enabled),
            label: intl.formatMessage({ id: `${funType}.parlay`, defaultMessage: 'Parlay' }),
            onChange: onParlaySgpChange('parlaySettings.enabled'),
            disabled: viewOnly ?? !isEditable
        },
        inputArr: [
            [
                {
                    label: intl.formatMessage({ id: `${funType}.minimumLegs`, defaultMessage: 'Minimum Legs' }),
                    format: 'number',
                    value: Number(betSlipSetting?.parlaySettings.minimumLegs),
                    onChange: onParlaySgpChange('parlaySettings.minimumLegs'),
                    header: '',
                    tip: '',
                    error: betSlipSetting?.parlaySettings.minimumLegs && betSlipSetting.parlaySettings.maximumLegs ? +betSlipSetting?.parlaySettings.minimumLegs > +betSlipSetting.parlaySettings.maximumLegs : false,
                    helperText: intl.formatMessage({ id: `${funType}.amountLessThanMax`, defaultMessage: 'The amount needs to be less than the maximum.' }),
                    limit: range2To999,
                    disable: viewOnly ?? !isEditable
                },
                {
                    label: intl.formatMessage({ id: `${funType}.maximumLegs`, defaultMessage: 'Maximum Legs' }),
                    format: 'number',
                    value: Number(betSlipSetting?.parlaySettings.maximumLegs),
                    onChange: onParlaySgpChange('parlaySettings.maximumLegs'),
                    header: '',
                    tip: '',
                    error: betSlipSetting?.parlaySettings.minimumLegs && betSlipSetting.parlaySettings.maximumLegs ? +betSlipSetting?.parlaySettings.minimumLegs > +betSlipSetting.parlaySettings.maximumLegs : false,
                    helperText: intl.formatMessage({ id: `${funType}.amountGreaterThanMin`, defaultMessage: 'The amount needs to be greater than the minimum.' }),
                    limit: range2To999,
                    disable: viewOnly ?? !isEditable
                },
            ],
            [
                {
                    label: intl.formatMessage({ id: `${funType}.minimumAmount`, defaultMessage: 'Minimum Amount' }),
                    format: 'number',
                    value: Number(betSlipSetting?.parlaySettings.minimum),
                    onChange: onParlaySgpChange('parlaySettings.minimum'),
                    header: '',
                    tip: '',
                    error: betSlipSetting?.parlaySettings.minimum && betSlipSetting?.parlaySettings.maximum ? +betSlipSetting?.parlaySettings.minimum > +betSlipSetting?.parlaySettings.maximum : false,
                    helperText: intl.formatMessage({ id: `${funType}.amountLessThanMax`, defaultMessage: 'The amount needs to be less than the maximum.' }),
                    limit: range1To999999999,
                    disable: viewOnly ?? !isEditable
                },
                {
                    label: intl.formatMessage({ id: `${funType}.maximumAmount`, defaultMessage: 'Maximum Amount' }),
                    format: 'number',
                    value: Number(betSlipSetting?.parlaySettings.maximum),
                    onChange: onParlaySgpChange('parlaySettings.maximum'),
                    header: '',
                    tip: '',
                    error: betSlipSetting?.parlaySettings.minimum && betSlipSetting?.parlaySettings.maximum ? +betSlipSetting?.parlaySettings.minimum > +betSlipSetting?.parlaySettings.maximum : false,
                    helperText: intl.formatMessage({ id: `${funType}.amountGreaterThanMin`, defaultMessage: 'The amount needs to be greater than the minimum.' }),
                    limit: range1To999999999,
                    disable: viewOnly ?? !isEditable
                },
                {
                    label: intl.formatMessage({ id: `${funType}.maximumPayoutAmount`, defaultMessage: 'Maximum Payout Amount' }),
                    format: 'number',
                    value: Number(betSlipSetting?.parlaySettings.maxPayout),
                    onChange: onParlaySgpChange('parlaySettings.maxPayout'),
                    header: '',
                    tip: '',
                    error: false,
                    helperText: '',
                    limit: range1To999999999,
                    disable: viewOnly ?? !isEditable
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
            onChange: onParlaySgpChange('sgpSettings.enabled'),
            disabled: viewOnly ?? !isEditable
        },
        inputArr: [
            [
                {
                    label: intl.formatMessage({ id: `${funType}.minimumLegs`,
                        defaultMessage: 'Minimum Legs' }),
                    format: 'number',
                    value: Number(betSlipSetting?.sgpSettings.minimumLegs),
                    onChange: onParlaySgpChange('sgpSettings.minimumLegs'),
                    header: '',
                    tip: '',
                    error: betSlipSetting?.sgpSettings.minimumLegs && betSlipSetting?.sgpSettings.maximumLegs ? +betSlipSetting?.sgpSettings.minimumLegs > +betSlipSetting?.sgpSettings.maximumLegs : false,
                    helperText: intl.formatMessage({ id: `${funType}.amountLessThanMax`,
                        defaultMessage: 'The amount needs to be less than the maximum.' }),
                    limit: range2To999,
                    disable: viewOnly ?? !isEditable
                },
                {
                    label: intl.formatMessage({ id: `${funType}.maximumLegs`,
                        defaultMessage: 'Maximum Legs' }),
                    format: 'number',
                    value: Number(betSlipSetting?.sgpSettings.maximumLegs),
                    onChange: onParlaySgpChange('sgpSettings.maximumLegs'),
                    header: '',
                    tip: '',
                    error: betSlipSetting?.sgpSettings.minimumLegs && betSlipSetting?.sgpSettings.maximumLegs ? +betSlipSetting?.sgpSettings.minimumLegs > +betSlipSetting?.sgpSettings.maximumLegs : false,
                    helperText: intl.formatMessage({ id: `${funType}.amountGreaterThanMin`,
                        defaultMessage: 'The amount needs to be greater than the minimum.' }),
                    limit: range2To999,
                    disable: viewOnly ?? !isEditable
                },
            ],
            [
                {
                    label: intl.formatMessage({ id: `${funType}.minimumAmount`,
                        defaultMessage: 'Minimum Amount' }),
                    format: 'number',
                    value: Number(betSlipSetting?.sgpSettings.minimum),
                    onChange: onParlaySgpChange('sgpSettings.minimum'),
                    header: '',
                    tip: '',
                    error: betSlipSetting?.sgpSettings.minimum && betSlipSetting?.sgpSettings.maximum ? +betSlipSetting?.sgpSettings.minimum > +betSlipSetting?.sgpSettings.maximum : false,
                    helperText: intl.formatMessage({ id: `${funType}.amountLessThanMax`,
                        defaultMessage: 'The amount needs to be less than the maximum.' }),
                    limit: range1To999999999,
                    disable: viewOnly ?? !isEditable
                },
                {
                    label: intl.formatMessage({ id: `${funType}.maximumAmount`,
                        defaultMessage: 'Maximum Amount' }),
                    format: 'number',
                    value: Number(betSlipSetting?.sgpSettings.maximum),
                    onChange: onParlaySgpChange('sgpSettings.maximum'),
                    header: '',
                    tip: '',
                    error: betSlipSetting?.sgpSettings.minimum && betSlipSetting?.sgpSettings.maximum ? +betSlipSetting?.sgpSettings.minimum > +betSlipSetting?.sgpSettings.maximum : false,
                    helperText: intl.formatMessage({ id: `${funType}.amountGreaterThanMin`,
                        defaultMessage: 'The amount needs to be greater than the minimum.' }),
                    limit: range1To999999999,
                    disable: viewOnly ?? !isEditable
                },
                {
                    label: intl.formatMessage({ id: `${funType}.maximumPayoutAmount`, defaultMessage: 'Maximum Payout Amount' }),
                    format: 'number',
                    value: Number(betSlipSetting?.sgpSettings.maxPayout),
                    onChange: onParlaySgpChange('sgpSettings.maxPayout'),
                    header: '',
                    tip: '',
                    error: false,
                    helperText: '',
                    limit: range1To999999999,
                    disable: viewOnly ?? !isEditable
                },
            ]
        ]
    }
    const MarginLineProp: IMarginLine = {
        margin: margin,
        lineSettings: lineSettings as string,
        lineSettingDropDown: configuration?.lineSetting.receive === 'MAINLINE_ONLY' ? ['MAINLINE_ONLY'] : configuration?.lineSetting.conditions as string[],
        onMarginLineChange: onMarginLineChange,
        disabled: viewOnly ?? !isEditable
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
            disabled: viewOnly ?? !isEditable
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
                    disable: viewOnly ?? !isEditable
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
                    disable: viewOnly ?? !isEditable
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
                    disable: viewOnly ?? !isEditable
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
            disabled: viewOnly ?? !isEditable
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
                    disable: viewOnly ?? !isEditable
                }
            ]
        ]
    }

    const GeneralSettingProps: GeneralSettingProps = {
        sortCard: ProviderPriorityProp,
        feedOddsSetting: FeedOddsSettingProp,
        marginLine: MarginLineProp,
        oddsDeviation: OddsDeviationProp,
        imbalancedBetting: ImbalancedBettingDecreaseProp,
        heavyBetting: HeavyBettingProp
    }

    const BetSlipSettingProps: BetSlipSettingProps = {
        intl: intl,
        funType: funType,
        isEditable: viewOnly ?? !isEditable,
        betSlipSetting: lodash.cloneDeep(betSlipSetting) as BetSlipSettingDataModel,
        onBetSlipSettingChange: onBetSlipSettingChange,
        situationEventList: situationList?.map(item => allFirstCharToUpperCase(item)) ?? [],
        parlay: ParlayProps,
        sgp: SGPProps,
        rapid: RapidProps,
        autoSettlement: AutoSettlementProps
    }

    const marketSettingsProps: MarketConfigFormContentProps = {
        eventType: eventType as EventType,
        sportId: sportId as string,
        markets: marketList || [],
        marketRowData: marketSettings || [],
        selectedMarketIds: selectedMarketIds,
        handleMarketSelectOnChange: handleMarketSelectOnChange,
        handleMarketRowUpdate: handleMarketRowUpdate,
        viewOnly: viewOnly ?? !isEditable
    }

    function getRefSetting(): TemplateSummaryUsedModel {
        const rapidEnabled = getEnabledStatus(betSlipSetting?.rapidBetEntrySettings?.enabled);
        const autoSettlementEnabled = getEnabledStatus(betSlipSetting?.autoSettlementSettings?.enabled);
        const parlayAlertSendEmail = getEnabledStatus(betSlipSetting?.parlayAlert?.sendEmail);
        const leagueName = leagues.map(item => item.name) ?? []

        return {
            eventType, isDefault, sportName,
            leagueId: leagues.join(','),
            templateId: response?.templateId,
            templateName,
            sportId: sportId ?? getSportId() ?? response?.sportId,
            leagueIds: leagues.map(item => item.id),
            leagueName: lodash.sortBy(leagueName).join(',')  ?? '',
            oddsSettings: feedOdds,
            providerPriority: providerPriority,
            imbalanceBettings: imbalancedBettingDecrease,
            imbalanceSettings: betSlipSetting?.imbalanceSettings as ImbalanceSetting,
            heavyBettings: heavyBetting,
            singleBetSettings: betSlipSetting?.singleBetSettings,
            parlaySettings: betSlipSetting?.parlaySettings,
            sgpSettings: betSlipSetting?.sgpSettings,
            delayedSettings: betSlipSetting?.delayedSettings,
            margin: margin,
            lineSettings: lineSettings,
            deviation: deviation as Deviation,
            feederSuspend: betSlipSetting?.feederSuspend as string,
            dangerAttackAction: betSlipSetting?.dangerAttackAction ?? '',
            belowMarginSettings: betSlipSetting?.belowMarginSettings as BelowMarginSetting,
            rapidBetEntrySettings: {
                enabled: rapidEnabled,
                triggerTime: betSlipSetting?.rapidBetEntrySettings?.triggerTime,
                numberOfBets: betSlipSetting?.rapidBetEntrySettings?.numberOfBets,
                suspendLine: betSlipSetting?.rapidBetEntrySettings?.suspendLine
            } as LocalRapidBetEntrySetting,
            autoSettlementSettings: {
                enabled: autoSettlementEnabled,
                delaySettlement: betSlipSetting?.autoSettlementSettings?.delaySettlement
            } as LocalAutoSettlementSetting,
            parlayAlert: {
                alertRecipients: betSlipSetting?.parlayAlert?.alertRecipients,
                targetNumber: betSlipSetting?.parlayAlert?.targetNumber,
                type: betSlipSetting?.parlayAlert?.type,
                potentialWin: betSlipSetting?.parlayAlert?.potentialWin,
                sendEmail: parlayAlertSendEmail
            } as LocalParlayAlertSetting,
            marketSettings: marketSettings.map(item => marketConfigModelToMarketSetting(item))
        }
    }

    function getPreSetting(response: GetTemplateDetailModel): TemplateSummaryUsedModel {
        const rapidEnabled = getEnabledStatus(response?.rapidBetEntrySettings?.enabled);
        const autoSettlementEnabled = getEnabledStatus(response?.autoSettlementSettings?.enabled);
        const parlayAlertSendEmail = getEnabledStatus(response?.parlayAlert?.sendEmail);
        const leagueName = response?.leagues?.map(league => league.leagueName) ?? []
        const leagueId = response?.leagues?.map(league => league.leagueId) ?? []

        return {
            sportName: response?.sportName,
            leagueName: lodash.sortBy(leagueName).join(',') ?? '',
            leagueId: lodash.sortBy(leagueId).join(',') ?? '',
            eventType: response?.eventType,
            templateName: response?.templateName,
            templateId: response?.templateId,
            sportId: response?.sportId,
            leagueIds: response?.leagues?.map(league => league.leagueId) ?? [],
            providerPriority: response?.providerPriority,
            oddsSettings: response?.oddsSettings,
            margin: response?.margin ?? -1,
            lineSettings: response?.lineSettings,
            deviation: response.deviation,
            imbalanceBettings: response?.imbalanceBettings,
            imbalanceSettings: response?.imbalanceSettings as ImbalanceSetting,
            heavyBettings: response?.heavyBettings,
            isDefault: response?.isDefault,
            feederSuspend: response?.feederSuspend,
            dangerAttackAction: response?.dangerAttackAction,
            belowMarginSettings: response?.belowMarginSettings as BelowMarginSetting,
            delayedSettings: response?.delayedSettings,
            singleBetSettings: response.singleBetSettings,
            parlaySettings: response?.parlaySettings,
            sgpSettings: response?.sgpSettings,
            parlayAlert: {
                alertRecipients: response?.parlayAlert?.alertRecipients,
                targetNumber: response?.parlayAlert?.targetNumber,
                type: response?.parlayAlert?.type,
                potentialWin: response?.parlayAlert?.potentialWin,
                sendEmail: parlayAlertSendEmail
            },
            rapidBetEntrySettings: {
                enabled: rapidEnabled,
                triggerTime: response?.rapidBetEntrySettings?.triggerTime,
                numberOfBets: response?.rapidBetEntrySettings?.numberOfBets,
                suspendLine: response?.rapidBetEntrySettings?.suspendLine
            } as LocalRapidBetEntrySetting,
            autoSettlementSettings: {
                enabled: autoSettlementEnabled,
                delaySettlement: response?.autoSettlementSettings?.delaySettlement
            } as LocalAutoSettlementSetting,
            marketSettings: response?.marketSettings?.map(item => marketConfigModelToMarketSetting(item))
        }
    }

    const onClickPublish = async () => {
        // If there has no response (Add Template), then use refSetting, else use preSetting
        const preSetting: TemplateSummaryUsedModel = !response ? getRefSetting() : getPreSetting(response)

        const data: TemplateSummaryFormProps = {
            comeFromPage: editTemplateId && !isDuplicate ? ComeFromPage.EditTemplate : ComeFromPage.AddTemplate,
            eventIds: [],
            adjustable: true,
            preValue: preSetting,
            refValue: getRefSetting(),
        }

        if (onPublish) {
            onPublish(data)
        }
    }

    const createRefSetting = (): GetTemplateDetailModelWithoutData => ({
        eventType, isDefault, sportName,
        templateId: response?.templateId || '',
        templateName,
        sportId: sportId ?? getSportId(),
        oddsSettings: feedOdds as EventMarketOddsSettingsModel,
        providerPriority: providerPriority,
        imbalanceBettings: imbalancedBettingDecrease as EventMarketImbalanceBettingsModel,
        heavyBettings: heavyBetting as EventMarketHeavyBettingModel,
        margin: Number(margin),
        lineSettings: lineSettings as string,
        deviation: deviation as Deviation
    });

    const createResource = (): GetTemplateDetailModelWithoutData => ({
        eventType: response?.eventType as string,
        isDefault: response?.isDefault as boolean,
        sportName: response?.sportName as string,
        templateId: response?.templateId || '',
        templateName: response?.templateName as string,
        sportId: sportId ?? getSportId(),
        oddsSettings: response?.oddsSettings as EventMarketOddsSettingsModel,
        providerPriority: response?.providerPriority as EventMarketProviderPriorityModel[],
        imbalanceBettings: response?.imbalanceBettings as EventMarketImbalanceBettingsModel,
        heavyBettings: response?.heavyBettings as EventMarketHeavyBettingModel,
        margin: response?.margin as number,
        lineSettings: response?.lineSettings as string,
        deviation: response?.deviation as Deviation
    })

    const [isSubmitEnabled, setIsSubmitEnabled] = useState<boolean>(false);

    useEffect(() => {
        const checkIsSubmitEnabled = () => {
            const isRequiredFieldsFilled = checkIsRequiredFieldsFilled(getRefSetting())

            const validationParams: EditDataValidationParams = {
                response,
                refSetting: createResource(),
                resource: createRefSetting(),
                lineSettings: lineSettings as string,
                refMarketSettings: marketSettings,
                leagues: leagues.map(item => item.id),
                isDefault,
                betSlipSetting: betSlipSetting as BetSlipSettingDataModel,
            }

            const validEdit = isValidEditData(validationParams)

            const outOfRange = isOutOfRange({
                margin,
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

            if (!editTemplateId) {
                return isRequiredFieldsFilled && outOfRange;
            } else if (response) {
                return isRequiredFieldsFilled && outOfRange && !validEdit;
            } else  {
                return false
            }
        };

        const isEditable = checkIsSubmitEnabled()
        setIsSubmitEnabled(isEditable)

    }, [templateName, sportName, margin, feedOdds, deviation,
        imbalancedBettingDecrease, heavyBetting, isDefault,
        leagues, sportId, providerPriority,
        betSlipSetting, response, editTemplateId, lineSettings, marketSettings
    ]);

    const tabs: StatusButtonGroupProps['items'] = [{
        key: ComponentType.GeneralSetting,
        text: intl.formatMessage({ id: `common.generalSetting`, defaultMessage: 'General Setting' }),
        type: ComponentType.GeneralSetting,
    },{
        key: ComponentType.BetSlipSetting,
        text: intl.formatMessage({ id: `common.betSlipSetting`, defaultMessage: 'Bet Slip Setting' }),
        type: ComponentType.BetSlipSetting,
    },{
        key: ComponentType.MarketsSetting,
        text: intl.formatMessage({ id: `event.marketsSettingTitle`, defaultMessage: 'Markets Setting' }),
        type: ComponentType.MarketsSetting,
    }]

    return {
        pageTitle,
        pageDescribe,
        FirstRowTemplateProp,
        DefaultSettingProp,
        marketSettingsProps,
        onClickPublish,
        isSubmitEnabled,
        isEditable: viewOnly || isEditable,
        intl,
        funType,
        tabs,
        GeneralSettingProps,
        BetSlipSettingProps
    }
}

export default useTemplateFormViewModel