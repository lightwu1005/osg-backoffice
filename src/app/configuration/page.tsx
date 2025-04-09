"use client"
import {Box, Button, Grid, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import useConfigurationViewModel, {LineSettingOptionsType} from "@/app/configuration/domain/useConfigurationViewModel";
import {StatusButtonGroup} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup";
import * as React from "react";
import {DefaultEventTypes} from "@/services/@event/useCase";
import CheckBoxGroup from "@/modules/components/CheckBox/CheckBoxGroup";
import {
    InfoInputComponent,
    InfoMultiSelectComponent,
    InfoSelectComponent,
    MultiMenuTextFieldType
} from "@/modules/components/TextField";
import {RegexPatterns} from "@/modules/common/CommonRegexChecker";
import {toRuleNameDisplay} from "@/app/channel/domain/useChannelFormViewModel";
import CheckBoxItem from "@/modules/components/CheckBox/CheckBoxItem";
import StyledToolTip from "@/modules/components/general/StyledToolTip";
import {InfoOutlined} from "@mui/icons-material";
import PageFramework from "@/modules/components/general/PageFramework";
import {convertArrayToRecord} from "@/modules/common/DataProcessUnit";
import {toUpperCaseWithUnderscore} from "@/modules/common/DisplayFormatConverter";
import {range0To100, range0To4} from "@/utils/rangeLimits";

export default function Page() {
    const {
        checkboxGroup,
        handleCheckboxChanged,
        eventType,
        handleEventTypeChange,
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
        dangerBallList,
        dangerBallSetting,
        handleDangerBallChanged,
        isEditable,
        isSubmitEnable,
        oddsControl,
        handleSubmit,
        getIncrementLabel,
        getEnumValueByKey,
        dangerBallSettingSelected,
        isRoundingFormatValid,
        intl,
        funType
    } = useConfigurationViewModel();

    const theme = useTheme()
    const isLessThanSm = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <PageFramework>
            <Box sx={{padding: '2.5rem'}}>
                <Grid container paddingY={0} spacing={8} flexGrow={1} alignContent={'start'}>
                    <Grid item xs={12}>
                        <StatusButtonGroup
                            items={DefaultEventTypes(intl)}
                            selectedIndex={DefaultEventTypes(intl).findIndex(type =>
                                type.key === eventType.key)}
                            onClick={handleEventTypeChange}
                        />
                    </Grid>
                </Grid>
                <Grid container paddingY={2} spacing={8} flexGrow={1} alignContent={'start'}>
                    <Grid item xs={12}>
                        <Stack direction={"column"}>
                            <Typography variant={'h4'}>
                                {
                                    intl.formatMessage({
                                        id: `${funType}.feedOddsFormat`, defaultMessage: 'Feed Odds Format'})
                                }
                            </Typography>
                            <CheckBoxGroup items={checkboxGroup} disabled={!isEditable} onChange={handleCheckboxChanged}/>
                        </Stack>
                    </Grid>
                </Grid>
                { oddsControl &&
                    <Grid container paddingY={2} spacing={2} flexGrow={1} alignContent={'start'}>
                        <Grid item xs={12}>
                            <Stack direction={"row"} justifyContent={"space-between"}>
                                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                                    <Typography variant={"h4"}>
                                        {
                                            intl.formatMessage({
                                                id: `${funType}.feederOddsAlignmentMinimumSetting`,
                                                defaultMessage: 'Feeder Odds Alignment Minimum Setting'
                                            })
                                        }
                                    </Typography>
                                    <StyledToolTip title={intl.formatMessage({
                                        id: `${funType}.feederOddsAlignmentMaximumSettingTips`,
                                        defaultMessage: 'You will received the range of odds from feeders'
                                    })}>
                                        <InfoOutlined/>
                                    </StyledToolTip>
                                </Stack>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <InfoInputComponent
                                header={''}
                                error={oddsSetting?.maximum && oddsSetting?.minimum ? !isMinOddsFieldValid : false}
                                label={intl.formatMessage({
                                    id: `${funType}.minimumOdds`, defaultMessage: 'Minimum Odds'
                                })}
                                helperText={intl.formatMessage({
                                    id: `${funType}.minimumOddsTips`,
                                    defaultMessage: 'The amount needs to be less than the maximum.'
                                })}
                                format={"number"}
                                regex={RegexPatterns.OddSettingLimit}
                                limitRange={[1, Number(oddsSetting?.maximum) || 999]}
                                value={Number(oddsSetting?.minimum) || 0}
                                onChange={handleOddsSetting('minimum')}
                                disable={!isEditable}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <InfoInputComponent
                                header={''} error={oddsSetting?.maximum && oddsSetting?.minimum ? !isMaxOddsFieldValid : false}
                                label={intl.formatMessage({
                                    id: `${funType}.maximumOdds`, defaultMessage: 'Maximum Odds'
                                })}
                                helperText={intl.formatMessage({
                                    id: `${funType}.maximumOddsTips`,
                                    defaultMessage: 'The amount needs to be greater than the minimum.'
                                })}
                                format={"number"}
                                regex={RegexPatterns.OddSettingLimit}
                                limitRange={[Number(oddsSetting?.minimum) || 1, 1000]}
                                value={Number(oddsSetting?.maximum) || 0}
                                onChange={handleOddsSetting('maximum')}
                                disable={!isEditable}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <InfoInputComponent
                                header={''} error={false}
                                label={intl.formatMessage({
                                    id: `${funType}.minimumDifference`, defaultMessage: 'Minimum Difference %'
                                })}
                                helperText={''}
                                format={"number"}
                                suffix={"%"}
                                regex={RegexPatterns.OddSettingLimit}
                                limitRange={range0To100}
                                value={Number(oddsSetting?.difference) || 0}
                                onChange={handleOddsSetting('difference')}
                                disable={!isEditable}
                            />
                        </Grid>
                    </Grid>
                }
                { oddsControl &&
                    <Grid container paddingY={2} spacing={2} flexGrow={1} alignContent={'start'} alignItems={'flex-end'}>
                        <Grid item xs={12}>
                            <InfoInputComponent
                                header={
                                    intl.formatMessage({
                                        id: `${funType}.defaultMargin`,
                                        defaultMessage: 'Default Margin'
                                    })
                                }
                                error={false}
                                format={'number'}
                                tip={intl.formatMessage({
                                    id: `${funType}.defaultMarginTips`,
                                    defaultMessage: 'Setting the profit margin for odds.'
                                })}
                                label={'Margin'} helperText={''}
                                limitRange={range0To100}
                                value={margin}
                                onChange={handleMarginChanged}
                                disable={!isEditable}
                            />
                        </Grid>
                    </Grid>
                }
                { oddsControl &&
                    <Grid container paddingY={2} spacing={2} flexGrow={1} alignContent={'start'}>
                        <Grid item xs={12}>
                            <InfoSelectComponent
                                header={intl.formatMessage({
                                    id: `${funType}.lineSettings`,
                                    defaultMessage: 'Line Settings'
                                })}
                                disabled={!isEditable}
                                tip={intl.formatMessage({
                                    id: `${funType}.lineSettingsTips`,
                                    defaultMessage: 'Setup the line you want to open to the channel.'
                                })}
                                menu={{
                                    label: intl.formatMessage({
                                        id: `${funType}.lineSettingsLabel`,
                                        defaultMessage: 'Select the line settings'
                                    }),
                                    options: lineSetting?.conditions.map(condition =>
                                        getEnumValueByKey(LineSettingOptionsType, condition) ?? condition) ?? [],
                                    value: getEnumValueByKey(LineSettingOptionsType, lineSetting?.receive ?? '') || '',
                                    onChange: handleLineSettingChanged
                                }}
                            />
                        </Grid>
                    </Grid>
                }
                <Grid container paddingY={2} spacing={2} flexGrow={1} alignContent={'start'} alignItems={'flex-end'}>
                    <Grid item xs={12}>
                        <Stack direction={"row"} justifyContent={"space-between"} flexWrap={'wrap'}>
                            <Stack direction={"row"} spacing={1} alignItems={"center"}>
                                <Typography variant={"h4"}>
                                    {
                                        intl.formatMessage({
                                            id: `${funType}.roundingRules`,
                                            defaultMessage: 'Rounding Rules'
                                        })
                                    }
                                </Typography>
                                <StyledToolTip title={intl.formatMessage({
                                    id: `${funType}.roundingRulesTips`,
                                    defaultMessage: 'Number of digits after the decimal point'
                                })}>
                                    <InfoOutlined/>
                                </StyledToolTip>
                            </Stack>
                            <CheckBoxItem isChecked={isAllRolesConsistent}
                                          label={intl.formatMessage({
                                              id: `${funType}.allRulesConsistent`,
                                              defaultMessage: 'All Rules Consistent'
                                          })}
                                          disabled={!isEditable}
                                          onChange={handleAllRolesConsistent}
                            />
                        </Stack>
                    </Grid>
                    <Grid container paddingY={2} paddingLeft={2} spacing={2} flexGrow={1} alignContent={'start'}>
                        {roundsSetting.map((rule, index) => (
                            <Grid item xs={12} sm={4} key={rule.ruleName}>
                                <InfoInputComponent
                                    disable={!isEditable || (isAllRolesConsistent && index !== 0)}
                                    header={''}
                                    error={false}
                                    helperText={''}
                                    tip={""}
                                    label={toRuleNameDisplay(rule)}
                                    format={"number"}
                                    value={rule.ruleNumber === 0 ? '0' : Number(rule.ruleNumber)}
                                    onChange={handleRoundingSetting(rule.ruleName)}
                                    limitRange={range0To4}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                { oddsControl &&
                    <Grid container paddingY={2} spacing={2} flexGrow={1} alignContent={'start'}>
                        <Grid item xs={12}>
                            <Stack direction={"row"} justifyContent={"space-between"}>
                                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                                    <Typography variant={"h4"}>
                                        {
                                            intl.formatMessage({
                                                id: `${funType}.eachClickSettings`,
                                                defaultMessage: 'Each Click Settings'
                                            })
                                        }
                                    </Typography>
                                    <StyledToolTip title={intl.formatMessage({
                                        id: `${funType}.eachClickSettingsTips`,
                                        defaultMessage: 'Set the value for each adjustment of the odds'
                                    })}>
                                        <InfoOutlined/>
                                    </StyledToolTip>
                                </Stack>
                            </Stack>
                        </Grid>
                        {roundingIncrement.filter(item => item.increment >= 0).map((increment, index) => (
                            <Grid item xs={12} sm={4} key={`roundingIncrement-${increment.ruleNumber}`}>
                                <InfoInputComponent
                                    disable={!isEditable}
                                    header={''}
                                    error={!isRoundingFormatValid(increment.ruleNumber, increment.increment)}
                                    tip={""}
                                    label={getIncrementLabel(increment.ruleNumber)}
                                    helperText={intl.formatMessage({
                                        id: `${funType}.roundingIncrementHelperText`,
                                        defaultMessage: 'The maximum allowable input is {value1} ~ {value2}'
                                    }, {
                                        value1: Number((10 ** -increment.ruleNumber).toFixed(increment.ruleNumber)),
                                        value2: Number(((10 ** -increment.ruleNumber) * 9).toFixed(increment.ruleNumber))
                                    })}
                                    format={"numeric"}
                                    step={Number((10 ** -increment.ruleNumber).toFixed(increment.ruleNumber))}
                                    value={increment.increment < 0 ? 0 : Number(increment.increment)}
                                    onChange={(value) => handleRoundingIncrementChanged(increment.ruleNumber, value)}
                                    regex={RegexPatterns.RoundingIncrement}
                                    limitRange={[Number((10 ** -increment.ruleNumber).toFixed(increment.ruleNumber)), Number(((10 ** -increment.ruleNumber) * 9).toFixed(increment.ruleNumber))]}
                                />
                            </Grid>
                        ))}
                    </Grid>
                }
                <Grid container paddingY={2} spacing={2} flexGrow={1} alignContent={'start'} alignItems={'flex-end'}>
                    <Grid item xs={12} sm={4}>
                        <InfoMultiSelectComponent
                            header={intl.formatMessage({
                                id: `${funType}.dangerBallSettings`,
                                defaultMessage: 'Danger Ball Setting'
                            })}
                            disabled={!isEditable}
                            tip={intl.formatMessage({
                                id: `${funType}.dangerBallSettingsTips`,
                                defaultMessage: 'When a danger ball is triggered, the system will automatically manage the bet slips.'
                            })}
                            menu={{
                                label: intl.formatMessage({
                                    id: `${funType}.autoAcceptBetSlip`,
                                    defaultMessage: 'Auto Accept Bet Slip'
                                }),
                                displayType: MultiMenuTextFieldType.renderTag,
                                isEmptyEqualSelectAll: false,
                                limitTags: isLessThanSm ? 1 : 2,
                                options: Object.values(dangerBallList).filter(item => !dangerBallSettingSelected?.autoAcceptBetSlips.includes(toUpperCaseWithUnderscore(item))),
                                onChange: handleDangerBallChanged('autoAcceptBetSlips'),
                                initialSelectedOptions: Object.values(convertArrayToRecord(dangerBallSetting?.autoAcceptBetSlips ?? [])),

                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <InfoMultiSelectComponent
                            header={''}
                            disabled={!isEditable}
                            menu={{
                                label: intl.formatMessage({
                                    id: `${funType}.autoHoldBetSlip`,
                                    defaultMessage: 'Auto Hold Bet Slip'
                                }),
                                options: Object.values(dangerBallList).filter(item => !dangerBallSettingSelected?.autoHoldBetSlips.includes(toUpperCaseWithUnderscore(item))),
                                isEmptyEqualSelectAll: false,
                                displayType: MultiMenuTextFieldType.renderTag,
                                limitTags: isLessThanSm ? 1 : 2,
                                onChange: handleDangerBallChanged('autoHoldBetSlips'),
                                initialSelectedOptions: Object.values(convertArrayToRecord(dangerBallSetting?.autoHoldBetSlips ?? [])),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <InfoMultiSelectComponent
                            header={''}
                            disabled={!isEditable}
                            menu={{
                                label: intl.formatMessage({
                                    id: `${funType}.autoRejectBetSlip`,
                                    defaultMessage:'Auto Reject Bet Slip',
                                }),
                                options: Object.values(dangerBallList).filter(item => !dangerBallSettingSelected?.autoRejectBetSlips.includes(toUpperCaseWithUnderscore(item))),
                                isEmptyEqualSelectAll: false,
                                displayType: MultiMenuTextFieldType.renderTag,
                                limitTags: isLessThanSm ? 1 : 2,
                                onChange: handleDangerBallChanged('autoRejectBetSlips'),
                                initialSelectedOptions: Object.values(convertArrayToRecord(dangerBallSetting?.autoRejectBetSlips ?? [])),
                            }}
                        />
                    </Grid>
                </Grid>
                <Stack alignItems={'end'} paddingY={2}>
                    <Button variant={'contained'}
                            color={'primary'}
                            disabled={!isSubmitEnable}
                            onClick={handleSubmit}
                    >
                        {
                            intl.formatMessage({
                                id: `${funType}.save`,
                                defaultMessage: 'Save'
                            })
                        }
                    </Button>
                </Stack>
            </Box>
        </PageFramework>
    )
}