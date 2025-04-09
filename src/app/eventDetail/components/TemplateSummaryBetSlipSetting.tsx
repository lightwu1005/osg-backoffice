import React, {useCallback, useEffect, useMemo, useState} from "react";
import {TemplateCardItems, TemplateSummaryCardProps} from "@/app/eventDetail/components/TemplateSummaryCard";
import {WarningAlert, WarningSettingBarStatus} from "@/app/eventDetail/components/TemplateWarningAlert";
import lodash from "lodash";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {SummaryPropertyType} from "@/app/eventDetail/domain/useTemplateSummaryFormViewModel";
import TemplateSummaryCardItem, {
    GrayText,
    GreenLabel,
    OldLabel,
    StrikethroughText
} from "@/app/eventDetail/components/TemplateSummaryCardItem";
import {Box, Divider, Stack, Typography} from "@mui/material";
import StyledToolTip from "@/modules/components/general/StyledToolTip";
import {InfoOutlined} from "@mui/icons-material";
import {getEnumValueByKey} from "@/modules/common/DataProcessUnit";
import {ImbalanceAmountActionType} from "@/app/template/models/actionType";
import {ImbalanceSetting} from "@/services/@core/module/ResponseDataModels";

export interface TemplateBetSlipAmountSettingsProps {
    title: string
    preValue?: ImbalanceSetting
    refValue?: ImbalanceSetting
    currentValue?: ImbalanceSetting
    isValueSet: boolean
    shouldShowWarningSettingBar: boolean
    onValueSelected?: (value?: ImbalanceSetting) => void
    adjustable: boolean
    reset: boolean
}

enum BetSlipAmountSettingType {
    Percentage = "PERCENTAGE",
    Amount = "AMOUNT",
    PercentageToAmount = "PERCENTAGE_TO_AMOUNT",
    AmountToPercentage = "AMOUNT_TO_PERCENTAGE"
}

const TemplateBetSlipAmountSettings = (props: TemplateBetSlipAmountSettingsProps) => {
    const {
        preValue,
        refValue,
        currentValue,
        isValueSet,
        onValueSelected,
        adjustable,
        reset
    } = props

    const [betSlipAmountSettingType, setBetSlipAmountSettingType] = useState<BetSlipAmountSettingType>(BetSlipAmountSettingType.Percentage)
    const [selectedValue, setSelectedValue] = useState<ImbalanceSetting | undefined>(currentValue)
    const [betSlipSettingProps, setBetSlipSettingProps] = useState<TemplateSummaryCardProps>()
    const [isSubmitValueClicked, setIsSubmitValueClicked] = useState(false);
    const [isSelectedValueClicked, setIsSelectedValueClicked] = useState(false);
    const [warningSettingBarStatus, setWarningSettingBarStatus] = useState<WarningSettingBarStatus>(WarningSettingBarStatus.Restore)
    const initialSubmitValue = useMemo(() => {
        return {
            ...lodash.cloneDeep({
                type: refValue?.type ?? "PERCENTAGE",
                autoAccept: -1,
                action: ""
            })
        }
    }, [preValue])
    const [submitValue, setSubmitValue] = useState<ImbalanceSetting>(initialSubmitValue)

    const intl = useIntl()
    const funType = LocalizationFunctionType.Template
    const tipsWording = intl.formatMessage({
        id: `${funType}.confirmDifferentValue`,
        defaultMessage: 'Your previous setting is different, please confirm the value.'
    })
    const [isPreferValueSelected, setIsPreferValueSelected] = useState(isValueSet ?? false)

    useEffect(() => {
        setSubmitValue(initialSubmitValue)
    }, [initialSubmitValue])

    useEffect(() => {
        if (reset) {
            setSubmitValue(initialSubmitValue);
            setSelectedValue(undefined);
            setIsPreferValueSelected(isValueSet ?? false);
            setWarningSettingBarStatus(WarningSettingBarStatus.Restore);
        }
    }, [reset]);

    const [shouldDisplayCardItems, setShouldDisplayCardItems] = useState(true)

    function processValue() {
        if (currentValue) {
            if (!isValueSet) {
                if (betSlipAmountSettingType === BetSlipAmountSettingType.PercentageToAmount && preValue) {
                    setSelectedValue(preValue)
                    setWarningSettingBarStatus(WarningSettingBarStatus.KeepOld)
                } else if (betSlipAmountSettingType === BetSlipAmountSettingType.AmountToPercentage && refValue) {
                    setSelectedValue(refValue)
                    setWarningSettingBarStatus(WarningSettingBarStatus.UseNew)
                } else {
                    setSelectedValue(currentValue)
                    setWarningSettingBarStatus(WarningSettingBarStatus.Restore)
                }
            } else {
                setSelectedValue(currentValue)
            }
        }
    }

    useEffect(() => {
        if (currentValue) {
            processValue()
        }
    }, [currentValue]);

    useEffect(() => {
        if ((preValue?.type === BetSlipAmountSettingType.Percentage) && refValue?.type === BetSlipAmountSettingType.Amount) {
            setBetSlipAmountSettingType(BetSlipAmountSettingType.PercentageToAmount)
            setWarningSettingBarStatus(WarningSettingBarStatus.UseNew)
        } else if (preValue?.type === BetSlipAmountSettingType.Amount && (refValue?.type === BetSlipAmountSettingType.Percentage)) {
            setBetSlipAmountSettingType(BetSlipAmountSettingType.AmountToPercentage)
            setWarningSettingBarStatus(WarningSettingBarStatus.KeepOld)
        } else {
            setBetSlipAmountSettingType(BetSlipAmountSettingType[preValue?.type as keyof typeof BetSlipAmountSettingType] ?? BetSlipAmountSettingType.Percentage);
        }
    }, [preValue, refValue]);

    const settingValueSelected = useCallback((status: WarningSettingBarStatus, isSelectedValueClicked: boolean) => {
        setIsSelectedValueClicked(isSelectedValueClicked)
        switch (status) {
            case WarningSettingBarStatus.KeepOld:
                setSelectedValue(preValue)
                setWarningSettingBarStatus(WarningSettingBarStatus.KeepOld)
                setIsPreferValueSelected(true)
                break
            case WarningSettingBarStatus.UseNew:
                setSelectedValue(refValue)
                setWarningSettingBarStatus(WarningSettingBarStatus.UseNew)
                setIsPreferValueSelected(true)
                break
            case WarningSettingBarStatus.Restore:
                processValue()
                setWarningSettingBarStatus(WarningSettingBarStatus.Restore)
                setIsPreferValueSelected(false)
                break
        }
    }, [preValue, refValue, selectedValue, isValueSet]);

    const handleDynamicChange = useCallback((path: string) => (value: SummaryPropertyType | boolean) => {
        setIsSubmitValueClicked(true)
        setSubmitValue(prev => {
            if (lodash.get(prev, path) === value) return prev;
            const result = lodash.set({...prev}, path, value);
            return result;
        })
    }, [])

    useEffect(() => {
        if (onValueSelected) {
            if (isSubmitValueClicked) {
                onValueSelected(submitValue);
                setIsSubmitValueClicked(false);
            } else if (isSelectedValueClicked) {
                onValueSelected(selectedValue);
                setIsSelectedValueClicked(false);
            }
        }
    }, [submitValue, isSubmitValueClicked, selectedValue, isSelectedValueClicked, onValueSelected]);

    function updateBetSlipAmountSettings() {
        function getIsValueSet(path: string): boolean {
            return lodash.get(submitValue, path) !== -1;
        }

        setBetSlipSettingProps({
            items: [
                {
                    title: intl.formatMessage({
                        id: `${funType}.autoAcceptBetSlip`,
                        defaultMessage: 'Auto Accept Bet Slip'
                    }),
                    isHeader: false,
                    isValueSet: getIsValueSet("autoAccept"),
                    preValue: `<${preValue?.type === BetSlipAmountSettingType.Percentage ? '' : '$'}${preValue?.autoAccept}${preValue?.type === BetSlipAmountSettingType.Percentage ? '%' : ''}`,
                    refValue: `<${refValue?.type === BetSlipAmountSettingType.Percentage ? '' : '$'}${refValue?.autoAccept}${refValue?.type === BetSlipAmountSettingType.Percentage ? '%' : ''}`,
                    currentValue: currentValue?.autoAccept,
                    onValueSelected: handleDynamicChange("autoAccept"),
                    shouldShowWarningSettingBar: false,
                },
                {
                    title: `>=${refValue?.type === BetSlipAmountSettingType.Percentage ? '' : '$'}${refValue?.autoAccept}${refValue?.type === BetSlipAmountSettingType.Percentage ? '%' : ''}`,
                    isHeader: false,
                    isValueSet: getIsValueSet("autoAccept"),
                    preValue: getEnumValueByKey(ImbalanceAmountActionType, preValue?.action ?? ''),
                    refValue: getEnumValueByKey(ImbalanceAmountActionType, refValue?.action ?? ''),
                    currentValue: getEnumValueByKey(ImbalanceAmountActionType, currentValue?.action ?? ''),
                    onValueSelected: handleDynamicChange("action"),
                    shouldShowWarningSettingBar: false,
                }
            ]
        })
    }

    useEffect(() => {
        updateBetSlipAmountSettings()
    }, [preValue, refValue, selectedValue])

    function isConflict() {
        return betSlipAmountSettingType === BetSlipAmountSettingType.PercentageToAmount ||
            betSlipAmountSettingType === BetSlipAmountSettingType.AmountToPercentage
    }

    useEffect(() => {
        DisplayConflict()
    }, [submitValue]);

    function getDisplayWord(isPreWord: boolean) {
        let preWord = ''
        let refWord = ''

        const type = isPreferValueSelected ? selectedValue?.type === BetSlipAmountSettingType.Percentage ? BetSlipAmountSettingType.Percentage : BetSlipAmountSettingType.Amount : betSlipAmountSettingType
        const percentage = intl.formatMessage({id: `${funType}.percentage`, defaultMessage: 'Percentage'})
        const amount = intl.formatMessage({id: `${funType}.amount`, defaultMessage: 'Amount'})
        switch (type) {
            case BetSlipAmountSettingType.PercentageToAmount:
                preWord = percentage
                refWord = amount
                break
            case BetSlipAmountSettingType.AmountToPercentage:
                preWord = amount
                refWord = percentage
                break
            case BetSlipAmountSettingType.Percentage:
                refWord = percentage
                break
            case BetSlipAmountSettingType.Amount:
                refWord = amount
                break
        }

        return isPreWord ? preWord : refWord
    }

    function NormalTextItem() {
        return (
            <Stack direction={"column"} sx={{width: '100%'}} spacing={1}>
                {
                    betSlipSettingProps?.items.map((item, index) => (
                        <Stack key={`NormalTextItem-${index}-${item.title}`} direction={"row"} sx={{width: '100%'}}
                               justifyContent={"space-between"}>
                            <Typography key={`StrikethroughText-l-${index}-${item.title}`} variant="body1">
                                {item.title}
                            </Typography>
                            <Typography key={`NormalTextItem-r-${index}-${item.title}`} variant="body1">
                                {(warningSettingBarStatus === WarningSettingBarStatus.KeepOld) ?
                                    item.preValue :
                                    item.refValue
                                }
                            </Typography>
                        </Stack>
                    ))
                }
            </Stack>
        )
    }

    function DisplayConflict() {
        const getConflictStatus = () => {
            return !isPreferValueSelected && isConflict();
        };

        const renderConflictLabels = () => {
            return (
                <Stack direction="row" spacing={1} alignItems="flex-start">
                    <OldLabel>OLD</OldLabel>
                    <StrikethroughText variant="body1">{getDisplayWord(true)}</StrikethroughText>
                    <GreenLabel>NEW</GreenLabel>
                    <GrayText variant="body1">{getDisplayWord(false)}</GrayText>
                </Stack>
            );
        };

        const renderConflictMessage = () => {
            const conflict = getConflictStatus();

            return (
                <Stack direction="row" spacing={0.5} alignItems="center">
                    <Typography
                        variant={"h5"}
                        color={conflict ? "#D32F2F" : "text.secondary"}
                    >
                        {getDisplayWord(false)}
                    </Typography>
                    {conflict && (
                        <StyledToolTip title={tipsWording} arrow>
                            <InfoOutlined fontSize="small"/>
                        </StyledToolTip>
                    )}
                </Stack>
            );
        };

        const conflict = getConflictStatus();

        return (
            <Stack direction="column" spacing={1}>
                {conflict && renderConflictLabels()}
                {renderConflictMessage()}
            </Stack>
        );
    }


    const DisplayItems = () => {
        return (
            <Stack direction={"column"} spacing={2} sx={{width: '100%'}}>
                {isConflict() ?
                    isPreferValueSelected ?
                        <NormalTextItem key={'NormalTextItem'}/> :
                        <TemplateCardItems items={betSlipSettingProps?.items ?? []}/> :
                    <NormalTextItem key={'NormalTextItem'}/>
                }
            </Stack>
        )
    }

    return (
        <Stack direction={"column"} spacing={2}>
            <Box sx={{height: '24px'}}>
                <TemplateSummaryCardItem title={props.title} isHeader={true}/>
            </Box>
            <DisplayConflict/>
            {
                (shouldDisplayCardItems) && (
                    <Stack spacing={1} direction={"row"} justifyContent={"left"}>
                        <Divider orientation="vertical" sx={{height: 'auto', backgroundColor: 'lightgray', width: '2px'}}/>
                        <DisplayItems/>
                    </Stack>
                )
            }
            {
                (isConflict() && adjustable) && (
                    <WarningAlert
                        isPreferValueSelected={isPreferValueSelected}
                        onRestore={() => settingValueSelected(WarningSettingBarStatus.Restore, true)}
                        onKeepOld={() => settingValueSelected(WarningSettingBarStatus.KeepOld, true)}
                        onUseNew={() => settingValueSelected(WarningSettingBarStatus.UseNew, true)}
                    />
                )
            }
        </Stack>
    )
}

export default React.memo(TemplateBetSlipAmountSettings)
