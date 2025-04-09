import {useCallback, useEffect, useRef, useState} from "react"
import useChannelRepository from "@/services/@channel/respository/useChannelRepository"
import useCommonRepository from "@/services/@common/repository/useCommonRepository"
import {
    GetConfigurationParameters,
    UpdateConfigurationParameters
} from "@/app/configuration/models/ConfigurationParameters"
import {
    toGetConfigurationProps,
    toUpdateBrandConfigurationProps,
    toUpdateConfigurationProps
} from "@/app/configuration/models/RequestDataMapping"
import {ConfigurationModel, LineSettingModel} from "@/services/@core/module/ResponseDataModels"
import {DefaultEventTypes} from "@/services/@event/useCase"
import {CheckBoxGroupItemProps} from "@/modules/components/CheckBox/CheckBoxGroup"
import {
    ConfigurationDangerBallSettings,
    ConfigurationOddsSettings,
    ConfigurationRounding,
    ConfigurationRoundingIncrement
} from "@/services/@core/module/CommonDataModels"
import lodash from "lodash"
import {defaultRounding} from "@/app/channel/domain/useChannelFormViewModel"
import {convertArrayToRecord, getEnumKeyByValue, getEnumValueByKey, extractValue, hasOverLimit} from "@/modules/common/DataProcessUnit";
import {GlobalController} from "@/modules/common/GlobalController";
import store, {setOddsDisplay} from "@/modules/common/IdentityRedux";
import PermissionHandler from "@/modules/common/PermissionHandler";
import IdentityHandler from "@/modules/common/IdentityHandler";
import {usePathname} from "next/navigation";
import {range0To100, range0To30, range0To4} from "@/utils/rangeLimits";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {isTruthy} from "@/app/template/domain/TemplateModelValidationUtils";
import useBrandsRepository from "@/services/@brands/repository/useBrandsRepository";
import {Functionality} from "@/services/@core/module/Enum";

export enum LineSettingOptionsType {
    MAINLINE_ONLY = 'Mainline Only',
    NO_LIMIT = 'No Limit'
}

const useConfigurationViewModel = () => {
    const userFunctionality = process.env.FUNCTIONALITY ?? '';
    const commonRepo = useCommonRepository()
    const channelRepo = useChannelRepository()
    const brandRepo = useBrandsRepository()

    const getDangerBalls = useCallback(async () => {
        return await commonRepo.getDangerBalls()
    }, [commonRepo])
    const getConfiguration = useCallback(async (parameters: GetConfigurationParameters) => {
        if (userFunctionality === Functionality.Odds) {
            return await channelRepo.getConfiguration(toGetConfigurationProps(parameters))
        } else {
            return await brandRepo.getConfiguration(toGetConfigurationProps(parameters))
        }
    }, [channelRepo, brandRepo])
    const updateConfiguration = useCallback(async (parameters: UpdateConfigurationParameters) => {
        if (userFunctionality === Functionality.Odds) {
            return await channelRepo.updateConfiguration(toUpdateConfigurationProps(parameters))
        } else {
            return await brandRepo.updateConfiguration(toUpdateBrandConfigurationProps(parameters))
        }
    }, [channelRepo, brandRepo])

    const intl = useIntl();
    const funType = LocalizationFunctionType.Configuration;
    const [configurationData, setConfigurationData] = useState<ConfigurationModel>()
    const [eventType, setEventType] = useState(DefaultEventTypes(intl)[0])
    const [loading, setLoading] = useState(false)
    const refConfigurationData = useRef(configurationData)
    const [checkboxGroup, setCheckboxGroup] = useState<CheckBoxGroupItemProps[]>([])
    const [oddsSetting, setOddsSetting] = useState<ConfigurationOddsSettings>()
    const [margin, setMargin] = useState<number>(0)
    const [lineSetting, setLineSetting] = useState<LineSettingModel>()
    const [roundsSetting, setRoundsSetting] = useState<ConfigurationRounding[]>(defaultRounding)
    const [isAllRolesConsistent, setIsAllRolesConsistent] = useState(false)
    const [roundingIncrement, setRoundingIncrement] = useState<ConfigurationRoundingIncrement[]>([])
    const [dangerBallSetting, setDangerBallSetting] = useState<ConfigurationDangerBallSettings>()
    const [dangerBallSettingSelected, setDangerBallSettingSelected] = useState<ConfigurationDangerBallSettings>()
    const [isSubmitEnable, setIsSubmitEnable] = useState(true)
    const [isMaxOddsFieldValid, setIsMaxOddsFieldValid] = useState(true);
    const [isMinOddsFieldValid, setIsMinOddsFieldValid] = useState(true);
    const lastRequestKey = useRef<number>(0)

    const globalController = GlobalController.getInstance()
    const [dangerBallList, setDangerBallList] = useState<Record<string, string>>({});
    const {isEditable: checkEdit} = PermissionHandler();
    const {userRole} = IdentityHandler();
    const pathname = usePathname();
    const currentPathName = pathname ? pathname.split('/').pop() : '';
    const isEditable = checkEdit(userRole, currentPathName ?? '');

    useEffect(() => {
        if(dangerBallSetting){
            const {autoAcceptBetSlips, autoHoldBetSlips, autoRejectBetSlips} = dangerBallSetting

            const accept = Array.from(new Set([...autoHoldBetSlips, ...autoRejectBetSlips]))
            const hold = Array.from(new Set([...autoAcceptBetSlips, ...autoRejectBetSlips]))
            const reject = Array.from(new Set([...autoAcceptBetSlips, ...autoHoldBetSlips]))

            setDangerBallSettingSelected(prevState => {
                return {
                    ...prevState,
                    autoRejectBetSlips: reject,
                    autoAcceptBetSlips: accept,
                    autoHoldBetSlips: hold,
                }
            })

        }
    }, [dangerBallSetting]);

    function getConfigurationData() {
        const configReq: GetConfigurationParameters = {
            eventType: eventType.key,
        }

        setLoading(true)
        const randomKey = Math.random()
        lastRequestKey.current = randomKey
        Promise.all([getConfiguration(configReq), getDangerBalls()])
            .then(([configurationResponse, dangerBallsResponse]) => {
                if (lastRequestKey.current !== randomKey) return
                setConfigurationData(configurationResponse)
                setDangerBallList(convertArrayToRecord(dangerBallsResponse ?? []))
            })
            .catch()
            .finally(() => {
                if (lastRequestKey.current !== randomKey) return
                setLoading(false)
            })
    }

    useEffect(() => {
        getConfigurationData()
    }, [eventType])

    function updateFromData() {
        if (configurationData) {
            refConfigurationData.current = lodash.cloneDeep(configurationData)
            if (configurationData.oddsFormat.display.length === 0) {
                store.dispatch(setOddsDisplay(configurationData.oddsFormat.options[0]))
            }
            setCheckboxGroup(configurationData.oddsFormat.options.map((displayType, index) => ({
                label: displayType,
                checked: configurationData.oddsFormat.display ?
                    configurationData.oddsFormat.display.includes(displayType) :
                    index === 0
            })));
            if (userFunctionality === Functionality.Odds) {
                setOddsSetting(configurationData.oddsSettings)
                setMargin(configurationData.defaultMargin)
                setLineSetting(configurationData.lineSetting)
                setRoundingIncrement(configurationData.roundingIncrement)
            }
            setRoundsSetting(configurationData.rounding)
            setDangerBallSetting(configurationData.dangerBallSettings)
            setIsMinOddsFieldValid(true)
            setIsMaxOddsFieldValid(true)
            setIsAllRolesConsistent(false)
        }
    }

    useEffect(() => {
        if (lodash.isEqual(configurationData?.eventType, eventType.key)) updateFromData()
    }, [configurationData, eventType])

    const isRoundingFormatValid = (ruleNumber: number, value: number) => {
        const extractedValue = Number(extractValue(value));
        const min = 10 ** -ruleNumber;
        const max = ruleNumber === 0 ? 99 : min * 9

        return !isNaN(extractedValue) && extractedValue >= min && extractedValue <= max;
    }

    const handleEventTypeChange = useCallback((index: number, key: string) => {
        setEventType(prevState => {
            if (prevState.key === key) return prevState
            return DefaultEventTypes(intl)[index]
        })
    }, [eventType])

    const handleCheckboxChanged = useCallback((label: string, checked: boolean) => {
        setCheckboxGroup(prev => {
            const newCheckboxGroup = prev.map(item =>
                item.label === label ? {...item, checked} : item
            )

            if (refConfigurationData.current) {
                refConfigurationData.current = {
                    ...refConfigurationData.current,
                    oddsFormat: {
                        ...refConfigurationData.current.oddsFormat,
                        display: newCheckboxGroup.filter(item => item.checked).map(item => item.label)
                    }
                }
            }

            return newCheckboxGroup
        })
    }, [])

    const handleOddsSetting = useCallback((path: string) => (value: any) => {
        const extractedValue = extractValue(value)

        setOddsSetting(prev => {
            if (!prev) return prev
            if (lodash.get(prev, path) === extractedValue) return prev
            const isValid = !(extractValue(value) === '' || extractedValue < 0)

            if (refConfigurationData.current) {
                switch (path) {
                    case 'minimum':
                        refConfigurationData.current.oddsSettings.minimum = isValid ? Number(extractedValue) : -1
                        setIsMinOddsFieldValid(Number(extractedValue) <= refConfigurationData.current?.oddsSettings.maximum)
                        setIsMaxOddsFieldValid(refConfigurationData.current?.oddsSettings.maximum >= Number(extractedValue))
                        break
                    case 'maximum':
                        refConfigurationData.current.oddsSettings.maximum = isValid ? Number(extractedValue) : -1
                        setIsMinOddsFieldValid(refConfigurationData.current?.oddsSettings.minimum <= Number(extractedValue))
                        setIsMaxOddsFieldValid(Number(extractedValue) >= refConfigurationData.current?.oddsSettings.minimum)
                        break
                    case 'difference':
                        refConfigurationData.current.oddsSettings.difference = isValid ? Number(extractedValue) : -1
                        break
                }
            }
            return lodash.set({...prev}, path, extractedValue) as ConfigurationOddsSettings
        })
    }, [])

    const handleMarginChanged = useCallback((value: any) => {
        const translatedMargin = value.target.value
        if (refConfigurationData.current) {
            refConfigurationData.current.defaultMargin = translatedMargin
        }
        setMargin(translatedMargin)
    }, [])

    const handleLineSettingChanged = useCallback((value: string) => {
        const enumKey = getEnumKeyByValue(LineSettingOptionsType, value);
        if (enumKey) {
            setLineSetting(prev => {
                if (!prev || prev.receive === enumKey) return prev

                if (refConfigurationData.current) {
                    refConfigurationData.current.lineSetting.receive = enumKey
                }

                return {...prev, receive: enumKey}
            })
        }
    }, [lineSetting])

    const handleAllRolesConsistent = useCallback((checked: boolean) => {
        setIsAllRolesConsistent(checked)
        if (checked) {
            setRoundsSetting(prevState => {
                if (prevState.length === 0) return prevState
                const firstValue = prevState[0].ruleNumber
                const result = prevState.map(item => ({...item, ruleNumber: firstValue}))
                if (refConfigurationData.current) {
                    refConfigurationData.current.rounding = result
                }
                return result
            })
        }
    }, [])

    const handleRoundingSetting = useCallback(
        (ruleName: string) => (newValue: any) => {
            const extractedValue = extractValue(newValue);

            const index = findRoundSettingIndex(ruleName, roundsSetting);
            if (index === -1) return;

            setRoundsSetting(prevState =>
                updateRounding(prevState, index, extractedValue)
            );
        },
        [isAllRolesConsistent, roundsSetting]
    );

    const findRoundSettingIndex = (ruleName: string, settings: ConfigurationRounding[]): number => {
        return settings.findIndex(item => item.ruleName === ruleName);
    };

    const updateRounding = (
        prevState: ConfigurationRounding[],
        index: number,
        value: number
    ): ConfigurationRounding[] => {
        const newState = applyRoundingUpdate(prevState, index, value);

        if (refConfigurationData.current) {
            const isAllValid = areAllItemsValid(newState);
            refConfigurationData.current.rounding = isAllValid ? newState : [];
        }

        return newState;
    };

    const applyRoundingUpdate = (
        prevState: ConfigurationRounding[],
        index: number,
        value: number
    ): ConfigurationRounding[] => {
        const newState = [...prevState];
        const newRounding = { ...newState[index], ruleNumber: value };

        if (isAllRolesConsistent) {
            return applyToAllItems(newState, value);
        } else {
            newState[index] = newRounding;
            return newState;
        }
    };

    const applyToAllItems = (state: ConfigurationRounding[], value: number): ConfigurationRounding[] => {
        return state.map(item => ({ ...item, ruleNumber: value }));
    };

    const areAllItemsValid = (state: ConfigurationRounding[]): boolean => {
        const filterItems = state.filter(item => item.ruleNumber >= 0);
        return filterItems.length === roundsSetting.length;
    };

    const getIncrementLabel = (ruleNumber: number) => {
        const translatedNumber = Number(ruleNumber)

        switch (translatedNumber) {
            case 0:
                return intl.formatMessage({id: `${funType}.integer`, defaultMessage: 'Integer'})
            case 1:
                return intl.formatMessage({id: `${funType}.tenth`, defaultMessage: 'Tenth'})
            case 2:
                return intl.formatMessage({id: `${funType}.hundredth`, defaultMessage: 'Hundredth'})
            case 3:
                return intl.formatMessage({id: `${funType}.thousandth`, defaultMessage: 'Thousandth'})
            case 4:
            default:
                return intl.formatMessage({id: `${funType}.tenThousandth`, defaultMessage: 'Ten-Thousandth'})
        }
    }

    const handleRoundingIncrementChanged = useCallback((ruleNumber: number, increment: any) => {
        if (isNaN(Number(extractValue(increment)))) return

        const extractedValue = Number(extractValue(increment))

        const roundedValue = parseFloat(extractedValue.toFixed(ruleNumber))

        setRoundingIncrement(prevState => {
            if (roundedValue < 0 ) return prevState
            const index = prevState.findIndex(item => item.ruleNumber === ruleNumber)
            if (index === -1) {
                return [...prevState, {ruleNumber, increment: roundedValue}]
            }
            const newState = [...prevState]
            newState[index] = {ruleNumber, increment: roundedValue}

            const uniqueRuleNumbers = getUniqueRuleNumbers(roundsSetting)

            const validItemLength = newState.filter(item => item.increment >= 0).length === uniqueRuleNumbers.length
            if (refConfigurationData.current) {
                refConfigurationData.current.roundingIncrement = validItemLength ? newState : []
            }
            return newState
        })
    }, [roundsSetting])

    const getUniqueRuleNumbers = (roundsSetting: ConfigurationRounding[]) => {
        return Array.from(new Set(roundsSetting.map(item => +item.ruleNumber)))
            .filter(item => Number(item) >= range0To4[0]);
    };

    const getRoundingIncrementResult = (uniqueRuleNumbers: number[], prevState: ConfigurationRoundingIncrement[]) => {
        return uniqueRuleNumbers.map(ruleNumber => {
            const existing = prevState.find(item => item.ruleNumber === ruleNumber);
            if (existing) {
                return existing;
            }
            const defaultIncrement = 10 ** -Math.min(ruleNumber, 4);
            return {ruleNumber, increment: Number(defaultIncrement.toFixed(ruleNumber))};
        }).sort((a, b) => a.ruleNumber - b.ruleNumber);
    };

    useEffect(() => {
        const uniqueRuleNumbers = getUniqueRuleNumbers(roundsSetting);
        setRoundingIncrement(prevState => {
            const result = getRoundingIncrementResult(uniqueRuleNumbers, prevState);

            if (refConfigurationData.current) {
                refConfigurationData.current.roundingIncrement = result
            }

            return result.filter(item => (item.ruleNumber >= 0 && item.ruleNumber <= 4));
        })
    }, [roundsSetting])

    const removeValueFromOtherArrays = (state: ConfigurationDangerBallSettings, path: keyof ConfigurationDangerBallSettings, values: string[]): ConfigurationDangerBallSettings => {
        const newState = { ...state }

        Object.keys(newState).forEach(key => {
            if (key !== path) {
                newState[key as keyof ConfigurationDangerBallSettings] = newState[key as keyof ConfigurationDangerBallSettings].filter(value => !values.includes(value))
            }
        })

        return newState
    }

    const handleDangerBallChanged = useCallback((path: keyof ConfigurationDangerBallSettings) => (value: any) => {
        const translatedValue: string[] = (extractValue(value) as string[]).map((value) => getEnumKeyByValue(dangerBallList, value) ?? '')

        setDangerBallSetting(prevState => {
            if (!prevState) return
            const newState = removeValueFromOtherArrays(prevState, path, translatedValue)
            newState[path] = translatedValue

            if (lodash.isEqual(prevState[path], translatedValue)) {
                return prevState
            }

            if (refConfigurationData.current) {
                refConfigurationData.current.dangerBallSettings = newState
            }

            return newState
        })
    }, [dangerBallSetting])

    const handleSubmit = useCallback(() => {
        if (!refConfigurationData.current) return
        const updateReq: UpdateConfigurationParameters = {
            eventType: eventType.key,
            body: {
                ...refConfigurationData.current,
                oddsFormat: refConfigurationData.current.oddsFormat.display,
                lineSetting: refConfigurationData.current.lineSetting.receive,
            }
        }

        setLoading(true)
        updateConfiguration(updateReq)
            .then(response => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'success',
                    show: true,
                    message: response.result
                })
                getConfigurationData()
            })
            .catch(e => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: e
                })
            })
            .finally(() => setLoading(false))
    }, [eventType])

    const validateConfigData = useCallback((configData: ConfigurationModel): boolean => {
        const {
            oddsFormat,
            oddsSettings,
            defaultMargin,
            rounding,
            roundingIncrement
        } = configData
        if (userFunctionality === Functionality.Odds) {
            if (oddsSettings.minimum < 0 || oddsSettings.maximum < 0 || oddsSettings.difference < 0 ||
                oddsSettings.minimum > oddsSettings.maximum || oddsSettings.maximum < oddsSettings.minimum) {
                return false
            }
            if (defaultMargin < 0 || defaultMargin > 30 || !isTruthy(defaultMargin)) return false
            if (roundingIncrement.length < 1) return false
        }
        if (rounding.length !== 9) return false
        if (oddsFormat.display.length === 0 && oddsFormat.options.length > 0) return false

        return true
    }, [])

    const isOutOfRange = (): boolean => {
        if (userFunctionality === Functionality.Odds) {
            if (oddsSetting?.difference && hasOverLimit(oddsSetting.difference, range0To100)) return false;
            if (margin && hasOverLimit(margin, range0To30)) return false;
        }

        if (roundsSetting) {
            for (const item of roundsSetting) {
                if (hasOverLimit(item.ruleNumber, range0To4)) return false;
            }
        }

        if (roundingIncrement) {
            for (const item of roundingIncrement) {
                const min = 10 ** -(item.ruleNumber)
                const max = item.ruleNumber === 0 ? 99 : min * 9
                if (hasOverLimit(item.increment, [min, max])) return false;
            }
        }

        return true;
    };

    useEffect(() => {
        if (!refConfigurationData.current) return

        function filterRoundingIncrement(configDta?: Partial<ConfigurationModel>) {
            return {
                ...configDta,
                roundingIncrement: configDta?.roundingIncrement?.filter(item => item.increment !== null),
            };
        }

        const refConfigurationDataRemoveMargin = lodash.omit(refConfigurationData.current, 'defaultMargin')
        const configurationDataRemoveMargin = lodash.omit(configurationData, 'defaultMargin')
        refConfigurationDataRemoveMargin.rounding.forEach(item => {
            item.ruleNumber = +item.ruleNumber;
        });

        const isConfigDataEqual = lodash.isEqual(refConfigurationDataRemoveMargin, filterRoundingIncrement(configurationDataRemoveMargin))
        const isMarginEqual = lodash.isEqual(+margin, configurationData?.defaultMargin)

        if (isConfigDataEqual && isMarginEqual) {
            setIsSubmitEnable(false)
            return
        }

        const isValidConfig = validateConfigData(refConfigurationData.current)

        setIsSubmitEnable(isValidConfig && isOutOfRange())
    }, [
        checkboxGroup,
        configurationData,
        oddsSetting,
        lineSetting,
        roundsSetting,
        roundingIncrement,
        isAllRolesConsistent,
        validateConfigData,
        margin,
        dangerBallSetting,
    ])

    return {
        eventType,
        handleEventTypeChange,
        getDangerBalls,
        getConfiguration,
        updateConfiguration,
        loading,
        dangerBallList,
        checkboxGroup,
        handleCheckboxChanged,
        configurationData,
        handleOddsSetting,
        isMinOddsFieldValid,
        isMaxOddsFieldValid,
        oddsSetting,
        handleMarginChanged,
        margin,
        handleLineSettingChanged,
        lineSetting,
        handleRoundingSetting,
        roundsSetting,
        isAllRolesConsistent,
        handleAllRolesConsistent,
        roundingIncrement,
        handleRoundingIncrementChanged,
        dangerBallSetting,
        handleDangerBallChanged,
        isEditable,
        isSubmitEnable,
        oddsControl: (userFunctionality === Functionality.Odds),
        handleSubmit,
        getIncrementLabel,
        getEnumValueByKey,
        getEnumKeyByValue,
        dangerBallSettingSelected,
        isRoundingFormatValid,
        intl,
        funType
    }
}

export default useConfigurationViewModel
