import {
    toGetBrandDetail,
    toGetChannelDetail,
    toUpdateBrand,
    toUpdateChannel
} from "@/app/channel/models/RequestDataMapping";
import {Country, Functionality, EventType} from "@/services/@core/module/Enum";
import {AvailableOwnerContent, ConfigurationDetailModel} from "@/services/@core/module/ResponseDataModels";
import {toProvidersProps} from "@/app/dashboard/models/RequestDataMapping";
import useChannelRepository from "@/services/@channel/respository/useChannelRepository";
import useCommonRepository from "@/services/@common/repository/useCommonRepository";
import useOddsRepository from "@/services/@odds/respository/useOddsRepository";
import {GlobalController} from "@/modules/common/GlobalController";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import lodash, {cloneDeep} from "lodash";
import {RegexPatterns} from "@/modules/common/CommonRegexChecker";
import ApiResponse from "@/services/@core/ApiResponse";
import {ChannelFormProps} from "@/app/channel/components/pageComponent/ChannelForm";
import {ConfigurationRounding} from "@/services/@core/module/CommonDataModels";
import useBrandsRepository from "@/services/@brands/repository/useBrandsRepository";
import {OptionModelItem} from "@/app/channel/domain/AvailableOwnerSelectionViewModel";
import {toGetConfigurationProps} from "@/app/configuration/models/RequestDataMapping";
import {LocalChannelFormModel, useLocalDataTranslate} from "@/app/channel/models/LocalDataTranslate";
import {allFirstCharToUpperCase, toUpperCaseWithUnderscore} from "@/modules/common/DisplayFormatConverter";
import PermissionHandler from "@/modules/common/PermissionHandler";
import IdentityHandler from "@/modules/common/IdentityHandler";
import {usePathname} from "next/navigation";
import {hasOverLimit} from "@/modules/common/DataProcessUnit";
import {range0To100, range1To1000} from "@/utils/rangeLimits";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {isTruthy} from "@/app/template/domain/TemplateModelValidationUtils";
import {datadogLogs} from "@/config/Datadog";

export function toRuleNameDisplay({ruleName, ruleNumber}: ConfigurationRounding): string {
    let minimumValue = 0
    const separateStr = ruleName.split('_')
    if (separateStr.length > 1) {
        minimumValue = Number(separateStr.at(0))
    } else {
        minimumValue = 1000
    }
    const formattedName = ruleName.replace('_', ' > = ');
    if (ruleNumber < 0) return `${formattedName} (e.g. ${minimumValue})`;
    const piExample = ruleNumber === 0 ? (minimumValue + 1) : (minimumValue + (Math.PI - 3)).toFixed(ruleNumber)
    return `${formattedName} (e.g. ${piExample})`;
}

export const defaultRounding = [
    {ruleName: "0_2", ruleNumber: 4},
    {ruleName: "2_5", ruleNumber: 4},
    {ruleName: "5_10", ruleNumber: 4},
    {ruleName: "10_25", ruleNumber: 4},
    {ruleName: "25_50", ruleNumber: 4},
    {ruleName: "50_100", ruleNumber: 4},
    {ruleName: "100_250", ruleNumber: 4},
    {ruleName: "250_1000", ruleNumber: 4},
    {ruleName: "1000+", ruleNumber: 4}
]

const useChannelFormViewModel = ({setOpen, channelId, onFinished}: ChannelFormProps) => {
    const userFunctionality = process.env.FUNCTIONALITY || '';
    const channelRepo = useChannelRepository()
    const brandRepo = useBrandsRepository()
    const commonRepo = useCommonRepository()
    const oddsRepo = useOddsRepository()
    const {toLocalChannelForm, toBrandDetailData, toChannelDetailData, defaultValues} = useLocalDataTranslate()
    const {isEditable: checkEdit} = PermissionHandler()
    const {userRole} = IdentityHandler()
    const isAdmin = userFunctionality === Functionality.Admin

    const addChannel = async (parameters: LocalChannelFormModel) => {
        if (isAdmin) {
            return await channelRepo.addChannel(toChannelDetailData(parameters));
        } else {
            return await brandRepo.addBrand(toBrandDetailData(parameters));
        }
    }

    const updateChannel = async (parameters: LocalChannelFormModel) => {
        if (isAdmin) {
            return await channelRepo.updateChannel(toUpdateChannel(toChannelDetailData(parameters)));
        } else {
            return await brandRepo.updateBrand(toUpdateBrand(toBrandDetailData(parameters)));
        }
    }

    const getDisplayTypes = async () => {
        return await oddsRepo.getDisplayTypes()
    }

    const getConfiguration = async () => {
        return await channelRepo.getConfiguration(toGetConfigurationProps({eventType: EventType.inPlay}))
    }

    const getProviders = async () => {
        return await commonRepo.getProviders(toProvidersProps(undefined));
    }

    const getChannelDetail = async (channelId: string) => {
        if (isAdmin) {
            return await channelRepo.getChannelDetail(toGetChannelDetail(channelId))
        } else {
            return await brandRepo.getBrandDetail(toGetBrandDetail(channelId))
        }
    }

    const globalController = GlobalController.getInstance()

    const pathname = usePathname();
    const currentPathName = pathname ? pathname.split('/').pop() : '';
    const isEditable = checkEdit(userRole, currentPathName ?? '');
    const [displayTypes, setDisplayTypes] = useState<string[]>([])
    const [lineSettings, setLineSettings] = useState('')
    const [fieldsValues, setFieldValues] = useState<LocalChannelFormModel>(defaultValues)
    const clonedFieldsValues = useRef<LocalChannelFormModel>(defaultValues);
    const prevValues = useRef<LocalChannelFormModel>();
    const [locations, setLocations] = useState<string[]>([])
    const [providers, setProviders] = useState<string[]>([])
    const [isMaxOddsFieldValid, setIsMaxOddsFieldValid] = useState(true);
    const intl = useIntl()
    const funType = LocalizationFunctionType.Channel

    const marginRange = useRef<[number, number]>()

    useEffect(() => {
        if (lodash.isEqual(fieldsValues, prevValues.current)) return;
        prevValues.current = fieldsValues;
    }, [fieldsValues]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const locations = Object.values(Country)
                setLocations(locations)
                if (isAdmin) {
                    const displayTypes = await getDisplayTypes()
                    if (displayTypes) setDisplayTypes(displayTypes.map( (item) => item.typeName))

                    const providers = await getProviders()
                    setProviders(providers)
                } else {
                    const config = await getConfiguration()
                    if (config) {
                        setDisplayTypes(config.oddsFormat.options)
                        marginRange.current = [-(config.defaultMargin || 0), 999]
                    }
                }

                if (channelId) {
                    getChannelDetail(channelId).then(response => {
                        const localChannelForm = toLocalChannelForm(response)
                        setFieldValues(localChannelForm)
                        clonedFieldsValues.current = cloneDeep(localChannelForm);
                        if (isAdmin) {
                            const lineSettings = allFirstCharToUpperCase(localChannelForm.configuration?.lineSettings ?? '')
                            setLineSettings(lineSettings)
                        }
                    })
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
                datadogLogs.logger.error('Error fetching data', {}, error instanceof Error ? error : new Error(String(error)));
            }
        };

        fetchData();
    }, []);

    const isObjectValid = (obj: any): boolean => {
        return lodash.every(obj, (value) => {
            if (lodash.isArray(value)) {
                return lodash.every(value, (item) => isObjectValid(item));
            } else if (lodash.isObject(value)) {
                return isObjectValid(value);
            }
            return value !== undefined && value !== '';
        });
    };

    const isConfigurationValid = (configuration: ConfigurationDetailModel) => {
        return configuration &&
            configuration.oddsProviders.length > 0 &&
            configuration.lineSettings.length > 0 &&
            isObjectValid(configuration) &&
            configuration.rounding.every(rule => rule.ruleNumber >= 0 && rule.ruleNumber <= 4) &&
            configuration.oddsSettings.minimum >= 0;
    };
    const isMarginWithinRange = (margin?: number) => {
        return isTruthy(margin) && !hasOverLimit(margin ?? 0, marginRange.current as [number, number]);
    };
    const isOddsSettingsValid = (configuration: ConfigurationDetailModel) => {
        if (!configuration) return false;

        const isOddsMin = hasOverLimit(configuration.oddsSettings?.minimum, range1To1000);
        const isOddsMax = hasOverLimit(configuration.oddsSettings?.maximum, range1To1000);
        const isOddsDiff = hasOverLimit(configuration.oddsSettings?.difference, range0To100);

        return !isOddsMin && !isOddsMax && !isOddsDiff;
    };

    const isSubmitEnabled = useMemo(() => {
        if (!fieldsValues) return false;

        const {
            channelName,
            channelId,
            configuration,
            oddsFormat,
            margin,
            ...otherFields
        } = fieldsValues;

        const hasChanged = !lodash.isEqual(fieldsValues, clonedFieldsValues.current);
        const areFieldsFilled = isObjectValid(otherFields);
        const isConfigValid = isConfigurationValid(configuration as ConfigurationDetailModel);
        const oddsFormatValid = oddsFormat.length > 0;
        const isChannelNameValid = RegexPatterns.UserName.test(channelName);
        const isMarginValid = isMarginWithinRange(margin);
        const isValidOddsSetting = isOddsSettingsValid(configuration as ConfigurationDetailModel);

        const validResult = (isAdmin)
            ? areFieldsFilled && isChannelNameValid && isConfigValid && oddsFormatValid
            : areFieldsFilled && isChannelNameValid && oddsFormatValid && isMarginValid;

        return userFunctionality === 'Admin' ? validResult && hasChanged && isValidOddsSetting : validResult && hasChanged;
    }, [fieldsValues]);


    const implementChannel = async () => {
        function checkOddsRangeValid() {
            const minOdds = fieldsValues.configuration?.oddsSettings.minimum ?? 0;
            const maxOdds = fieldsValues.configuration?.oddsSettings.maximum ?? 0;
            const isValueValid = minOdds <= maxOdds;
            setIsMaxOddsFieldValid(isValueValid);

            return isValueValid
        }

        try {
            let response: ApiResponse<string> = {
                isSuccess: false,
                result: ''
            };

            if (!fieldsValues) return;
            if (!checkOddsRangeValid()) return

            if (channelId) {
                const updateResponse = await updateChannel(fieldsValues);
                if (updateResponse) {
                    response = updateResponse;
                }
            } else {
                const addResponse = await addChannel(fieldsValues);
                if (addResponse) {
                    response = addResponse;
                }
            }

            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                severity: response.isSuccess ? 'success' : 'error',
                show: true,
                message: response.result
            });

            if (response.isSuccess) {
                setTimeout(() => {
                    setOpen(false)
                    onFinished()
                }, 1500);
            }
        } catch (error) {
            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                severity: 'error',
                show: true,
                message: channelId ?
                    intl.formatMessage({
                        id: `${funType}.updateChannelFailed`,
                        defaultMessage: 'Failed to update channel'
                    }) :
                    intl.formatMessage({
                    id: `${funType}.createChannelFailed`,
                    defaultMessage: 'Failed to create channel'
                })
            });
        }
    }

    const title: string = channelId ?
        intl.formatMessage({
            id: `${funType}.formTitleUpdate`,
            defaultMessage: 'Channel Detail'
        }) :
        intl.formatMessage({
            id: `${funType}.formTitleCreate`,
            defaultMessage: 'Add a New Channel'
        })
    const subTitle: string = intl.formatMessage({
        id: `${funType}.formSubtitle`,
        defaultMessage: 'Please complete all required fields to set up the channel.'
    })
    const buttonTitle = channelId ? intl.formatMessage({
        id: `${funType}.formSubmitUpdate`,
        defaultMessage: 'Save'
    }) : intl.formatMessage({
        id: `${funType}.formSubmitCreate`,
        defaultMessage: 'Add The Channel'
    })

    const handleQueryableSelectedValue = useCallback((options?: OptionModelItem[]) => {
        if (options && options.length > 0 && options[0].model) {
            const option: AvailableOwnerContent = options[0].model
            handleOwnerChange('ownerName')(option)
        } else {
            handleOwnerChange('ownerName')({uuid: '', userName: '', userAccount: ''})
        }
    }, [])

    const handleOwnerChange = useCallback((field: keyof LocalChannelFormModel) => (value: AvailableOwnerContent) => {
        setFieldValues(prev => {
            if (prev === undefined) return prev;
            return {
                ...prev,
                ownerName: value.userName,
                ownerId: value.uuid,
                email: value.userAccount
            }
        })
    }, []);

    const handleMarginChange = useCallback((field: keyof LocalChannelFormModel) => (value: any) => {
        setFieldValues(prev => {
            if (prev === undefined) return prev;
            return {
                ...prev,
                margin: Number(value.target.value)
            }
        })
    }, []);

    const handleDynamicChange = useCallback((path: string) => (value: any) => {
        setFieldValues(prev => {
            const previousValues = prev ?? defaultValues;

            const keys = path.split('.');
            const result = {...previousValues};

            let current: any = result;
            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                if (!(key in current)) {
                    current[key] = {};
                } else if (typeof current[key] !== 'object') {
                    console.error('Invalid path for handleDynamicChange:', path);
                    datadogLogs.logger.error('Invalid path for handleDynamicChange', {path: path}, new Error('Invalid path for handleDynamicChange'));
                    return previousValues;
                }
                current = current[key];
            }

            const finalKey = keys[keys.length - 1];
            const isEvent = value instanceof Event || (typeof value === 'object' && value !== null && 'target' in value);

            let finalValue = isEvent ? value.target.value : value;
            if (isEvent && !isNaN(finalValue) && finalValue.trim() !== '') {
                finalValue = Number(finalValue);
            }

            if (finalKey === 'lineSettings') {
                finalValue = toUpperCaseWithUnderscore(finalValue);
            }
            current[finalKey] = finalValue;

            if (finalKey === 'minimum' || finalKey === 'maximum') {
                setIsMaxOddsFieldValid(true)
            }

            return result;
        });
    }, [defaultValues]);

    const handleChannelAction = () => {
        implementChannel()
    }

    return {
        title,
        subTitle,
        buttonTitle,
        locations,
        displayTypes,
        providers,
        lineSettings,
        fieldsValues,
        isEditable,
        isSubmitEnabled,
        marginRange,
        handleQueryableSelectedValue,
        handleDynamicChange,
        handleChannelAction,
        toRuleNameDisplay,
        clonedFieldsValues,
        isMaxOddsFieldValid,
        handleMarginChange,
        intl,
        funType
    }
}

export default useChannelFormViewModel