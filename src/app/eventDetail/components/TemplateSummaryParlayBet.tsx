import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ParlaySGPSetting} from "@/services/@core/module/ResponseDataModels";
import {Box, Divider, Stack, Typography} from "@mui/material";
import lodash from "lodash";
import {TemplateCardItems, TemplateSummaryCardProps} from "@/app/eventDetail/components/TemplateSummaryCard";
import TemplateSummaryCardItem, {
    GrayText,
    GreenLabel,
    OldLabel,
    StrikethroughText
} from "@/app/eventDetail/components/TemplateSummaryCardItem";
import {WarningAlert, WarningSettingBarStatus} from "@/app/eventDetail/components/TemplateWarningAlert";
import StyledToolTip from "@/modules/components/general/StyledToolTip";
import {InfoOutlined} from "@mui/icons-material";
import {mergeDeep, SummaryPropertyType} from "@/app/eventDetail/domain/useTemplateSummaryFormViewModel";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

export enum ParlayType {
    Parlay = "Parlay",
    SGP = "SGP"
}

/**
 * @param title Just the title
 * @param preValue the original value
 * @param refValue updated value
 * @param currnetValue what the value that this card item selected or none
 * @param isValueSet define this card item has selected or not
 * @param shouldShowWarningSettingBar should display the warning alert bar under the card item to choose which value when occur the conflict
 * @param onValueSelected it's callback the processed value
 * @param isTemplate if it's used for template type, then the value will be modified
 * @param parlayType define this item use for Parlay or SGP, then display the related title
 * @param reset if parent trigger the reset event, this item should do something like become the original state
 */
export interface TemplateSummaryParlayBetProps {
    title: string
    preValue?: ParlaySGPSetting
    refValue?: ParlaySGPSetting
    currentValue?: ParlaySGPSetting
    isValueSet: boolean
    shouldShowWarningSettingBar: boolean
    onValueSelected?: (value?: ParlaySGPSetting) => void
    adjustable: boolean
    parlayType: ParlayType,
    reset: boolean
}

enum ParlayDisplayStatus {
    Enable,
    Disable,
    DisableToEnable,
    EnableToDisable
}

const TemplateSummaryParlayBet = (props: TemplateSummaryParlayBetProps) => {
    const {
        preValue,
        refValue,
        isValueSet,
        onValueSelected,
        adjustable,
        currentValue,
        parlayType,
        reset
    } = props

    const [parlayDisplayStatus, setParlayDisplayStatus] = useState(ParlayDisplayStatus.Disable)
    const [selectedValue, setSelectedValue] = useState<ParlaySGPSetting | undefined>()
    const [parlaySettingProps, setParlaySettingProps] = useState<TemplateSummaryCardProps>()
    const [isSubmitValueClicked, setIsSubmitValueClicked] = useState(false);
    const [isSelectedValueClicked, setIsSelectedValueClicked] = useState(false);
    const [warningSettingBarStatus, setWarningSettingBarStatus] = useState<WarningSettingBarStatus>(WarningSettingBarStatus.Restore)
    const initialSubmitValue = useMemo(() => {
        return {
            ...lodash.cloneDeep({
                "enabled": preValue?.enabled ?? false,
                "minimumLegs": -1,
                "maximumLegs": -1,
                "minimum": -1,
                "maximum": -1,
                "maxPayout": -1
            })
        }
    }, [preValue])
    const [submitValue, setSubmitValue] = useState<ParlaySGPSetting>(initialSubmitValue)

    const intl = useIntl()
    const funType = LocalizationFunctionType.Template
    const tipsWording = intl.formatMessage({ id: `${funType}.confirmDifferentValue`,
        defaultMessage: 'Your previous setting is different, please confirm the value.' })
    const [isPreferValueSelected, setIsPreferValueSelected] = useState(isValueSet ?? false)
    const memoMergedValue = mergeDeep(preValue, refValue)

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

    const [shouldDisplayCardItems, setShouldDisplayCardItems] = useState(false)

    useEffect(() => {
        switch (warningSettingBarStatus) {
            case WarningSettingBarStatus.KeepOld:
                setShouldDisplayCardItems(preValue?.enabled ?? false)
                break
            case WarningSettingBarStatus.UseNew:
                setShouldDisplayCardItems(refValue?.enabled ?? false)
                break
            case WarningSettingBarStatus.Restore:
                setShouldDisplayCardItems(preValue?.enabled ?? false)
                break
        }
    }, [warningSettingBarStatus]);

    function processValue() {
        if (currentValue) {
            if (isValueSet === false) {
                if (parlayDisplayStatus === ParlayDisplayStatus.EnableToDisable && preValue) {
                    setSelectedValue(preValue)
                    setWarningSettingBarStatus(WarningSettingBarStatus.KeepOld)
                }
                else if (parlayDisplayStatus === ParlayDisplayStatus.DisableToEnable && refValue) {
                    setSelectedValue(refValue)
                    setWarningSettingBarStatus(WarningSettingBarStatus.UseNew)
                }
                else {
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
        if ((preValue?.enabled === false) && refValue?.enabled === true) {
            setParlayDisplayStatus(ParlayDisplayStatus.DisableToEnable)
            setWarningSettingBarStatus(WarningSettingBarStatus.UseNew)
        }else if (preValue?.enabled === true && (refValue?.enabled === false)) {
            setParlayDisplayStatus(ParlayDisplayStatus.EnableToDisable)
            setWarningSettingBarStatus(WarningSettingBarStatus.KeepOld)
        }else if (preValue?.enabled === true && refValue?.enabled === true) {
            setParlayDisplayStatus(ParlayDisplayStatus.Enable)
            setShouldDisplayCardItems(true)
        }else {
            setParlayDisplayStatus(ParlayDisplayStatus.Disable)
            setShouldDisplayCardItems(false)
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
    },[preValue, refValue, selectedValue, isValueSet]);

    const handleDynamicChange = useCallback((path: string) => (value: SummaryPropertyType | boolean) => {
        setIsSubmitValueClicked(true)
        setSubmitValue(prev => {
            if (lodash.get(prev, path) === value) return prev;
            const result = lodash.set({ ...prev }, path, value);
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

    function updateParlaySettings() {
        function getCurrentValue(path: string, preNumber?: number, refMember?: number): number | undefined {
            let result: number = -1
            if (parlayDisplayStatus === ParlayDisplayStatus.DisableToEnable || parlayDisplayStatus === ParlayDisplayStatus.EnableToDisable) {
                result = (preNumber === refMember) ? preNumber : lodash.get(submitValue, path)
            } else if (parlayDisplayStatus === ParlayDisplayStatus.Enable) {
                result = (preNumber === refMember) ? preNumber : (lodash.get(submitValue, path) !== -1 ? lodash.get(submitValue, path) : lodash.get(memoMergedValue, path))
            }

            return result
        }

        function getIsValueSet(path: string): boolean {
            let result = false
            if (parlayDisplayStatus === ParlayDisplayStatus.DisableToEnable || parlayDisplayStatus === ParlayDisplayStatus.EnableToDisable) {
                result = lodash.get(submitValue, path) !== -1
            } else if (parlayDisplayStatus === ParlayDisplayStatus.Enable) {
                result = lodash.get(submitValue, path) !== -1
            }

            return result
        }

        setParlaySettingProps({
            items: [
                {
                    title: intl.formatMessage({ id: `${funType}.minimumLegs`, defaultMessage: 'Minimum Legs' }),
                    isHeader: false,
                    preValue: preValue?.minimumLegs,
                    refValue: refValue?.minimumLegs,
                    currentValue: getCurrentValue('minimumLegs', preValue?.minimumLegs, refValue?.minimumLegs),
                    isValueSet: getIsValueSet('minimumLegs'),
                    shouldShowWarningSettingBar: adjustable && (preValue?.minimumLegs !== refValue?.minimumLegs),
                    onValueSelected: handleDynamicChange('minimumLegs'),
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({ id: `${funType}.maximumLegs`, defaultMessage: 'Maximum Legs' }),
                    isHeader: false,
                    preValue: preValue?.maximumLegs,
                    refValue: refValue?.maximumLegs,
                    currentValue: getCurrentValue('maximumLegs', preValue?.minimumLegs, refValue?.minimumLegs),
                    isValueSet: getIsValueSet('maximumLegs'),
                    shouldShowWarningSettingBar: adjustable && (preValue?.maximumLegs !== refValue?.maximumLegs),
                    onValueSelected: handleDynamicChange('maximumLegs'),
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({ id: `${funType}.minimumAmount`,
                        defaultMessage: 'Minimum Amount' }),
                    isHeader: false,
                    preValue: preValue?.minimum,
                    refValue: refValue?.minimum,
                    currentValue: getCurrentValue('minimum', preValue?.minimum, refValue?.minimum),
                    isValueSet: getIsValueSet('minimum'),
                    shouldShowWarningSettingBar: adjustable && (preValue?.minimum !== refValue?.minimum),
                    onValueSelected: handleDynamicChange('minimum'),
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({ id: `${funType}.maximumAmount`,
                        defaultMessage: 'Maximum Amount' }),
                    isHeader: false,
                    preValue: preValue?.maximum,
                    refValue: refValue?.maximum,
                    currentValue: getCurrentValue('maximum', preValue?.maximum, refValue?.maximum),
                    isValueSet: getIsValueSet('maximum'),
                    shouldShowWarningSettingBar: adjustable && (preValue?.maximum !== refValue?.maximum),
                    onValueSelected: handleDynamicChange('maximum'),
                    tips: tipsWording
                },
                {
                    title: intl.formatMessage({ id: `${funType}.maximumPayout`, defaultMessage: 'Maximum Payout' }),
                    isHeader: false,
                    preValue: preValue?.maxPayout,
                    refValue: refValue?.maxPayout,
                    currentValue: getCurrentValue('maxPayout', preValue?.maxPayout, refValue?.maxPayout),
                    isValueSet: getIsValueSet('maxPayout'),
                    shouldShowWarningSettingBar: adjustable && (preValue?.maxPayout !== refValue?.maxPayout),
                    onValueSelected: handleDynamicChange('maxPayout'),
                    tips: tipsWording
                }
            ]
        })
    }
    useEffect(() => {
        updateParlaySettings()
    }, [preValue, refValue, selectedValue]);

    function isConflict() {
        return parlayDisplayStatus === ParlayDisplayStatus.DisableToEnable || parlayDisplayStatus === ParlayDisplayStatus.EnableToDisable
    }

    useEffect(() => {
        DisplayConflict()
    }, [submitValue]);

    function getDisplayWord(isPreWord: boolean) {
        let preWord = ''
        let refWord = ''

        const type = isPreferValueSelected ? selectedValue?.enabled ? ParlayDisplayStatus.Enable : ParlayDisplayStatus.Disable : parlayDisplayStatus
        const disable = intl.formatMessage({ id: `${funType}.disable`, defaultMessage: 'Disable' })
        const enable = intl.formatMessage({ id: `${funType}.enable`, defaultMessage: 'Enable' })
        switch (type) {
            case ParlayDisplayStatus.DisableToEnable:
                preWord = `${disable} ${parlayType}`
                refWord = `${enable} ${parlayType}`
                break
            case ParlayDisplayStatus.EnableToDisable:
                preWord = `${enable} ${parlayType}`
                refWord = `${disable} ${parlayType}`
                break
            case ParlayDisplayStatus.Enable:
                refWord = `${enable} ${parlayType}`
                break
            case ParlayDisplayStatus.Disable:
                refWord = `${disable} ${parlayType}`
                break
        }

        return isPreWord ? preWord : refWord
    }

    function DisplayConflict() {
        const conflict = isPreferValueSelected ? false : isConflict()

        return (
            <Stack direction={"column"} spacing={1}>
                {!isPreferValueSelected && (
                    (conflict) && (
                        <>
                            <Stack direction="row" spacing={1} alignItems="flex-start">
                                <OldLabel>OLD</OldLabel>
                                <StrikethroughText variant="body1">{getDisplayWord(true)}</StrikethroughText>
                                <GreenLabel>NEW</GreenLabel>
                                <GrayText variant="body1">{getDisplayWord(false)}</GrayText>
                            </Stack>
                        </>
                    )
                )}
                <Stack direction={"row"} spacing={0.5} alignItems="center">
                    <Typography variant={"h5"} color={(conflict && !isPreferValueSelected) ? "#D32F2F" : "text.secondary"}>
                        {getDisplayWord(false)}
                    </Typography>
                    {conflict ? (
                        <StyledToolTip title={tipsWording} arrow>
                            <InfoOutlined fontSize="small"/>
                        </StyledToolTip>
                    ) : null}
                </Stack>
            </Stack>
        )
    }

    function DisplayParlayItems() {
        if (parlayDisplayStatus === ParlayDisplayStatus.DisableToEnable) {
            return <NormalTextItem key={'NormalTextItem'}/>
        } else if (parlayDisplayStatus === ParlayDisplayStatus.EnableToDisable) {
            return <StrikethroughTextItem key={`StrikethroughTextItem`}/>
        }
    }

    function StrikethroughTextItem() {
        return (
            <Stack direction={"column"} sx={{width: '100%'}} spacing={1}>
                {
                    parlaySettingProps?.items.map((item, index) => (
                        <Stack key={`StrikethroughTextItem-${index}`} direction={"row"} sx={{width: '100%'}} justifyContent={"space-between"}>
                            <StrikethroughText key={`StrikethroughText-l-${index}`} variant="body1">
                                {item.title}
                            </StrikethroughText>
                            <StrikethroughText key={`StrikethroughText-r-${index}`} variant="body1">
                                {item.preValue}
                            </StrikethroughText>
                        </Stack>
                    ))
                }
            </Stack>
        )
    }

    function NormalTextItem() {
        return (
            <Stack direction={"column"} sx={{width: '100%'}} spacing={1}>
                {
                    parlaySettingProps?.items.map((item, index) => (
                        <Stack key={`NormalTextItem-${index}`} direction={"row"} sx={{width: '100%'}} justifyContent={"space-between"}>
                            <Typography key={`StrikethroughText-l-${index}`} variant="body1">
                                {item.title}
                            </Typography>
                            <Typography key={`NormalTextItem-r-${index}`} variant="body1">
                                {item.refValue}
                            </Typography>
                        </Stack>
                    ))
                }
            </Stack>
        )
    }
    
    return (
        <Stack direction={"column"} spacing={2}>
            <Box sx={{height: '1.5rem'}}>
                <TemplateSummaryCardItem title={props.title} isHeader={true}/>
            </Box>
            <DisplayConflict/>
            {
                (shouldDisplayCardItems) && (
                    <Stack spacing={1} direction={"row"} justifyContent={"left"}>
                        <Divider orientation="vertical" sx={{ height: 'auto', backgroundColor: 'lightgray', width: '0.125rem'}}/>
                        <Stack direction={"column"} spacing={2} sx={{width: '100%'}}>
                            {isConflict()
                                ? isPreferValueSelected ? <TemplateCardItems items={parlaySettingProps?.items ?? []}/> : <DisplayParlayItems key={`DisplayParlayItems`}/>
                                : <TemplateCardItems items={parlaySettingProps?.items ?? []}/>
                            }
                        </Stack>
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

const MemorizedTemplateSummaryParlayBet = React.memo(TemplateSummaryParlayBet)
MemorizedTemplateSummaryParlayBet.displayName = 'TemplateSummaryParlayBet'
export default MemorizedTemplateSummaryParlayBet
