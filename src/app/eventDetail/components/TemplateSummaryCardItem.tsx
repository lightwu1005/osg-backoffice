import {styled} from "@mui/material/styles";
import {Box, Grid, Stack, Typography} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import StyledToolTip from "@/modules/components/general/StyledToolTip";
import {InfoOutlined, KeyboardArrowRightRounded} from "@mui/icons-material";
import {WarningAlert, WarningSettingBarStatus} from "@/app/eventDetail/components/TemplateWarningAlert";
import lodash from "lodash";
import {SummaryPropertyType} from "@/app/eventDetail/domain/useTemplateSummaryFormViewModel";
import {getEnumValueByKey} from "@/modules/common/DataProcessUnit";

export enum SummaryCardItemType {
    Normal,
    SpecialProcess,
    Column,
    Long
}

/**
 * @param isFirst Is this the first item
 * @param isMultipleRecords Is it multiple or single item
 * @param title Just the title
 * @param tips yap, it's tips if needed
 * @param isHeader if true, then will display like the Section header
 * @param preValue the original value
 * @param refValue updated value
 * @param summaryCardItemType it's like to define what the card item should display and ues related logic to process
 * @param currnetValue what the value that this card item selected or none
 * @param isValueSet define this card item has selected or not
 * @param shouldShowWarningSettingBar should display the warning alert bar under the card item to choose which value when occur the conflict
 * @param onValueSelected it's callback the processed value
 * @param popUpMarketListClicked it's also a callback for display MarketList table
 */
export interface TemplateCardItemProps {
    isFirst?: boolean
    title: string
    tips?: string
    isHeader: boolean
    preValue?: SummaryPropertyType
    refValue?: SummaryPropertyType
    summaryCardItemType?: SummaryCardItemType
    currentValue?: SummaryPropertyType
    isValueSet?: boolean
    shouldShowWarningSettingBar?: boolean
    onValueSelected?: (value: SummaryPropertyType) => void
    popUpMarketListClicked?: (value: string) => void
}

export const OldLabel = styled(Box)({
    backgroundColor: '#D32F2F4D',
    color: '#D32F2F',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontSize: '0.75rem',
    textAlign: 'center',
    borderRadius: '0.25rem',
    padding: '0px 8px',
    height: '22px'
})

export const StrikethroughText = styled(Typography)({
    textDecoration: 'line-through',
    color: 'text.disabled'
})

export const GreenLabel = styled(Box)({
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontSize: '0.75rem',
    textAlign: 'center',
    borderRadius: '0.25rem',
    padding: '0px 8px',
    height: '22px'
})

export const GrayText = styled(Typography)({
    color: 'text.primary'
})

enum TranslateServerDisplayWords {
    AUTO = "Auto odds update",
    MANUAL = "Manual odds update",
    UNKNOWN = "Un-know",
    NO_LIMIT = "No Limit",
    MAINLINE_ONLY = "Mainline Only",
    SUSPEND_MARKET = "Suspend market",
    SUSPEND_EVENT = "Suspend event"
}

const TemplateCardItem = (props: TemplateCardItemProps) => {
    const {
        isFirst,
        title,
        tips,
        preValue,
        refValue,
        isHeader,
        currentValue,
        isValueSet,
        shouldShowWarningSettingBar = false,
        summaryCardItemType,
        onValueSelected,
        popUpMarketListClicked,
    } = props

    const [settingValue, setSettingValue] = useState<SummaryPropertyType | undefined>(currentValue)
    const [isSpecialEvent, setIsSpecialEvent] = useState(false)
    const [isPreferValueSelected, setIsPreferValueSelected] = useState(isValueSet ?? false)
    const [cardItemType, setCardItemType] = useState<SummaryCardItemType>(SummaryCardItemType.Normal)
    const isConflict = useCallback(() => {
        if (isPreferValueSelected) {
            return false
        } else {
            const result = !lodash.isEqual(preValue, refValue)
            return result
        }
    }, [preValue, refValue, isPreferValueSelected])
    const [specialOption, setSpecialOption] = useState<"left" | "right" | "none">("none")

    useEffect(() => {
        setCardItemType(summaryCardItemType ?? SummaryCardItemType.Normal)
        setIsSpecialEvent((summaryCardItemType === SummaryCardItemType.SpecialProcess) || (summaryCardItemType === SummaryCardItemType.Column))
    }, [summaryCardItemType]);

    const [isClicked, setIsClicked] = useState(false)

    useEffect(() => {
        setIsPreferValueSelected(isValueSet ?? false)
    }, [isValueSet])

    useEffect(() => {
        if (isValueSet === false) {
            setSpecialOption("none")
        }
    }, [isValueSet]);

    function shouldShowOldNewValues(value?: SummaryPropertyType) {
        return value !== '' && value?.toLocaleString() !== 'null' && value !== undefined && value !== null
    }

    const settingValueSelected = useCallback((status: WarningSettingBarStatus) => {
        setIsClicked(true)
        switch (status) {
            case WarningSettingBarStatus.KeepOld:
                setSpecialOption("left")
                setSettingValue(preValue ?? '')
                setIsPreferValueSelected(true)
                break
            case WarningSettingBarStatus.UseNew:
                setSpecialOption("right")
                setSettingValue(refValue ?? '')
                setIsPreferValueSelected(true)
                break
            case WarningSettingBarStatus.Restore:
                setSpecialOption("none")
                switch (typeof currentValue) {
                    case "number":
                        setSettingValue(-1)
                        break
                    case "string":
                        setSettingValue(refValue)
                        break
                    case 'object':
                        setSettingValue([])
                }
                setIsPreferValueSelected(false)
        }
    }, [preValue, refValue])

    useEffect(() => {
        if (onValueSelected && typeof settingValue !== "undefined" && isClicked) {
            onValueSelected(isSpecialEvent ? specialOption : settingValue)
        }
    }, [settingValue, isClicked, isSpecialEvent, isPreferValueSelected])

    useEffect(() => {
        setSettingValue(currentValue)
    }, [currentValue])

    function getDisplayWord(value: string) {
        if (Object.keys(TranslateServerDisplayWords).includes(value)) {
            return getEnumValueByKey(TranslateServerDisplayWords, value)
        }
        return value
    }

    function getDisplayLongWord(value: string) {
        const displayWord: string = getDisplayWord(value) ?? ""
        const maxLength = 12;
        if (displayWord.length > maxLength) {
            return displayWord.slice(0, maxLength) + '...';
        } else {
            return displayWord;
        }
    }

    const NormalItem = ({margin}: { margin: boolean }) => {
        const conflict = isConflict();

        const renderTitle = () => (
            <Typography
                variant={isHeader ? "h4" : "body1"}
                color={conflict ? "#D32F2F" : "text.primary"}
                sx={{
                    textDecoration: title === 'Odds Decrease %' && !currentValue ? 'line-through' : 'none',
                    whiteSpace: 'nowrap',
                    marginLeft: margin ? '32px !important' : undefined,
                }}
            >
                {title}
            </Typography>
        );

        const renderTooltip = () =>
            tips && conflict ? (
                <StyledToolTip title={tips} arrow>
                    <InfoOutlined fontSize="small"/>
                </StyledToolTip>
            ) : null;

        const renderOldNewValues = () => (
            <>
                {
                    getDisplayWord(`${refValue}`) !== "undefined" ?
                        <>
                            {shouldShowOldNewValues(preValue) &&
                                <Stack direction="row" spacing={1} alignItems={"flex-start"}>
                                    <OldLabel>OLD</OldLabel>
                                    {
                                        summaryCardItemType === SummaryCardItemType.Long && (preValue?.toString()?.length || 0) > 12 ?
                                            <StyledToolTip title={getDisplayWord(preValue as string)} arrow>
                                                <StrikethroughText
                                                    variant="body1">{getDisplayLongWord(`${preValue}`)}</StrikethroughText>
                                            </StyledToolTip>
                                            :
                                            <StrikethroughText
                                                variant="body1">{getDisplayWord(`${preValue}`)}</StrikethroughText>
                                    }
                                    {popUpMarketListClicked && (
                                        <KeyboardArrowRightRounded color={"primary"}
                                                                   onClick={() => popUpMarketListClicked('left')}/>
                                    )}
                                </Stack>
                            }
                            {shouldShowOldNewValues(refValue) &&
                                <Stack direction="row" spacing={1} alignItems={"flex-start"}>
                                    <GreenLabel>NEW</GreenLabel>
                                    {
                                        summaryCardItemType === SummaryCardItemType.Long && (refValue?.toString()?.length || 0) > 12 ?
                                            <StyledToolTip title={getDisplayWord(refValue as string)} arrow>
                                                <GrayText variant="body1">{getDisplayLongWord(`${refValue}`)}</GrayText>
                                            </StyledToolTip>
                                            :
                                            <GrayText variant="body1">{getDisplayWord(`${refValue}`)}</GrayText>
                                    }
                                    {popUpMarketListClicked && (
                                        <KeyboardArrowRightRounded color={"primary"}
                                                                   onClick={() => popUpMarketListClicked('right')}/>
                                    )}
                                </Stack>
                            }
                        </>
                        :
                        <StrikethroughText variant="body1">{getDisplayWord(`${preValue}`)}</StrikethroughText>
                }
            </>
        );

        const renderDefaultValues = () => (
            <Stack direction="row" alignItems="center" spacing={1}>
                <GrayText variant="body1">
                    {settingValue === undefined ? "" : getDisplayWord(`${settingValue}`)}
                </GrayText>
                {popUpMarketListClicked && (
                    <KeyboardArrowRightRounded color="primary" onClick={() => popUpMarketListClicked('none')}/>
                )}
            </Stack>
        );

        return (
            <Stack direction="row" justifyContent="space-between" alignItems={"flex-start"}>
                <Stack direction="row" spacing={0.5} paddingLeft={isHeader ? 0 : 2} alignItems="center">
                    {getDisplayWord(`${refValue}`) !== "undefined" || !conflict ? (
                        <>
                            {renderTitle()}
                            {renderTooltip()}
                        </>
                    ) : (
                        <StrikethroughText variant="body1">
                            {title}
                        </StrikethroughText>
                    )}
                </Stack>
                <Stack direction="row" spacing={1} alignItems={"flex-start"}>
                    {conflict ? renderOldNewValues() : renderDefaultValues()}
                </Stack>
            </Stack>
        );
    }

    const ProviderItem = () => {
        const preValueArray = preValue as string[]
        const refValueArray = refValue as string[]

        const conflict = !lodash.isEqual(preValueArray, refValueArray)
        return (
            <Stack direction={"column"} spacing={2}>
                <Stack direction={"row"} spacing={0.5} alignItems="center">
                    <Typography variant={isHeader ? "h4" : "body1"} color={isConflict() ? "#D32F2F" : "text.primary"}>
                        {title}
                    </Typography>
                    {tips && conflict ? (
                        <StyledToolTip title={tips} arrow>
                            <InfoOutlined fontSize="small"/>
                        </StyledToolTip>
                    ) : null}
                </Stack>
                <Grid container paddingLeft={2}>
                    {conflict ? (
                        <>
                            <Grid item xs={6}>
                                {shouldShowOldNewValues(preValue) &&
                                    <Stack direction={"row"} spacing={2}>
                                        <OldLabel>OLD</OldLabel>
                                        <Stack direction="column" spacing={1}>
                                            {preValueArray.map((item, index) => (
                                                <StrikethroughText key={index}>{item}</StrikethroughText>
                                            ))}
                                        </Stack>
                                    </Stack>
                                }
                            </Grid>
                            <Grid item xs={6}>
                                {shouldShowOldNewValues(refValue) &&
                                    <Stack direction={"row"} spacing={2}>
                                        <GreenLabel>NEW</GreenLabel>
                                        <Stack direction="column" spacing={1}>
                                            {(refValueArray.map((item, index) => (
                                                <Typography key={index} sx={{textAlign: 'left'}}>{item}</Typography>
                                            )))}
                                        </Stack>
                                    </Stack>
                                }
                            </Grid>
                        </>
                    ) : (
                        <Grid item xs={12}>
                            <Stack direction="column" spacing={1}>
                                {(specialOption === "left" ? preValueArray : refValueArray).map((item, index) => (
                                    <GrayText key={index}>{item}</GrayText>
                                ))}
                            </Stack>
                        </Grid>
                    )}
                </Grid>
            </Stack>
        )
    }

    return (
        <Stack direction={"column"} spacing={2} sx={{width: '100%'}}>
            {
                cardItemType === SummaryCardItemType.Column ?
                    <ProviderItem/> :
                    <NormalItem margin={!isFirst && summaryCardItemType === SummaryCardItemType.Long}/>
            }
            {
                shouldShowWarningSettingBar && (
                    <WarningAlert
                        isPreferValueSelected={isPreferValueSelected}
                        onRestore={() => settingValueSelected(WarningSettingBarStatus.Restore)}
                        onKeepOld={() => settingValueSelected(WarningSettingBarStatus.KeepOld)}
                        onUseNew={() => settingValueSelected(WarningSettingBarStatus.UseNew)}
                    />
                )
            }
        </Stack>
    )
}

const MemoizedTemplateCardItem = React.memo(TemplateCardItem);
MemoizedTemplateCardItem.displayName = 'TemplateCardItem';

export default MemoizedTemplateCardItem;
