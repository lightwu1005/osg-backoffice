import {Box, Grid, Stack, Typography} from "@mui/material";
import React from "react";
import {BetLimitationType, RiskGroupFormViewModel, WinLossRateType} from "@/app/member/domain/RiskGroupFormViewModel";
import {
    AutoMenuTextField,
    InfoColorPickerField,
    InfoInputComponent,
    InfoQueryableSelectTextField,
    InfoTextField
} from "@/modules/components/TextField";
import StyledToolTip from "@/modules/components/general/StyledToolTip";
import {InfoOutlined} from "@mui/icons-material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import {TagsListViewModel} from "@/app/member/domain/TagsListViewModel";
import {RiskLevelGroupWordingType} from "@/app/member/models/useRiskGroupTranslate";
import ToggleProps from "@/modules/interface/ToggleProps";
import {FullScreenDialog} from "@/modules/components/dialog/FullScreenDialog";
import Button from "@mui/material/Button";
import {getEnumValueByKey} from "@/modules/common/DataProcessUnit";

export interface RiskGroupFormProps extends ToggleProps {
    riskId?: string
    onFinished: () => void
}

const RiskGroupForm = (props: Readonly<RiskGroupFormProps>) => {
    const {
        getRiskTitle,
        handlePublish,
        handleValueChanged,
        getTranslatedWord,
        riskGroupDetail,
        isButtonDisabled,
        isBetMinimumValid,
        isBetMaximumValid,
    } = RiskGroupFormViewModel(props);

    return (
        <Box>
            <Stack direction="row" paddingY={4} spacing={0.5} alignContent="start" alignItems="center">
                <Typography variant={'h3'}>{getRiskTitle()}</Typography>
            </Stack>
            <Grid container spacing={2} flexGrow={1} alignContent={'start'}>
                <Grid item xs={6}>
                    <InfoInputComponent
                        header={getTranslatedWord(RiskLevelGroupWordingType.RiskName)}
                        error={riskGroupDetail?.riskName?.length === 0}
                        label={getTranslatedWord(RiskLevelGroupWordingType.RiskName)}
                        helperText={getTranslatedWord(RiskLevelGroupWordingType.InputValidRiskName)}
                        value={riskGroupDetail?.riskName}
                        onChange={handleValueChanged('riskName')}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InfoColorPickerField
                        data-testid={'riskColorSelector'}
                        header={getTranslatedWord(RiskLevelGroupWordingType.TagColor)}
                        props={{
                            onSelected: handleValueChanged('riskColor'),
                            defaultColor: riskGroupDetail?.riskColor
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Stack direction={"row"} spacing={1} alignItems={"center"}>
                            <Typography
                                variant={"h4"}>{getTranslatedWord(RiskLevelGroupWordingType.BetAmountSetting)}</Typography>
                            <StyledToolTip title={getTranslatedWord(RiskLevelGroupWordingType.BetAmountSettingTooltip)}>
                                <InfoOutlined/>
                            </StyledToolTip>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <InfoTextField
                        error={!isBetMinimumValid}
                        label={getTranslatedWord(RiskLevelGroupWordingType.MinimumAmount)}
                        helperText={getTranslatedWord(RiskLevelGroupWordingType.MinimumLessThanMaximum)}
                        format={"numeric"}
                        limitRange={[0, 999999999]}
                        value={riskGroupDetail?.betAmountSettings?.minimum}
                        onChange={handleValueChanged('betAmountSettings.minimum')}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InfoTextField
                        error={!isBetMaximumValid}
                        label={getTranslatedWord(RiskLevelGroupWordingType.MaximumAmount)}
                        helperText={getTranslatedWord(RiskLevelGroupWordingType.MaxGreaterThanMin)}
                        format={"number"}
                        limitRange={[0, 999999999]}
                        value={riskGroupDetail?.betAmountSettings?.maximum}
                        onChange={handleValueChanged('betAmountSettings.maximum')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Stack direction={"row"} spacing={1} alignItems={"center"}>
                            <Typography
                                variant={"h4"}>{getTranslatedWord(RiskLevelGroupWordingType.WinlossRateSetting)}</Typography>
                            <StyledToolTip
                                title={getTranslatedWord(RiskLevelGroupWordingType.WinlossRateSettingTooltip)}>
                                <InfoOutlined/>
                            </StyledToolTip>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={4}>
                    <InfoTextField
                        error={false}
                        label={getTranslatedWord(RiskLevelGroupWordingType.SuccessBetting)}
                        helperText={''}
                        format={"numeric"}
                        limitRange={[0, 999999999]}
                        value={riskGroupDetail?.winLossRateSettings?.successBet}
                        onChange={handleValueChanged('winLossRateSettings.successBet')}
                    />
                </Grid>
                <Grid item xs={4}>
                    <InfoTextField
                        error={false}
                        label={getTranslatedWord(RiskLevelGroupWordingType.StartToCountDayInterval)}
                        helperText={''}
                        format={"number"}
                        limitRange={[0, 999999999]}
                        value={riskGroupDetail?.winLossRateSettings?.dayInterval}
                        suffix={'Days'}
                        onChange={handleValueChanged('winLossRateSettings.dayInterval')}
                    />
                </Grid>
                <Grid item xs={4}>
                    <AutoMenuTextField
                        options={Object.values(WinLossRateType)}
                        label={getTranslatedWord(RiskLevelGroupWordingType.WinlossRate)}
                        helperText={''}
                        value={getEnumValueByKey(WinLossRateType, riskGroupDetail?.winLossRateSettings?.winRate ?? '')}
                        onChange={handleValueChanged('winLossRateSettings.winRate')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Stack direction={"row"} spacing={1} alignItems={"center"}>
                            <Typography
                                variant={"h4"}>{getTranslatedWord(RiskLevelGroupWordingType.BetLimitation)}</Typography>
                            <StyledToolTip title={getTranslatedWord(RiskLevelGroupWordingType.BetLimitationTooltip)}>
                                <InfoOutlined/>
                            </StyledToolTip>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <RadioGroup
                            row
                            value={Object.values(riskGroupDetail?.limitationType ?? BetLimitationType.DAILY)}
                            onChange={handleValueChanged('limitationType')}
                        >
                            <FormControlLabel
                                value={BetLimitationType.DAILY}
                                control={<Radio
                                    checked={riskGroupDetail?.limitationType === BetLimitationType.DAILY}/>}
                                label={getTranslatedWord(RiskLevelGroupWordingType.DailyBettingLimit)}
                            />
                            <FormControlLabel
                                value={BetLimitationType.SINGLE}
                                control={<Radio
                                    checked={riskGroupDetail?.limitationType === BetLimitationType.SINGLE}/>}
                                label={getTranslatedWord(RiskLevelGroupWordingType.SingleBetLimitation)}
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                {
                    riskGroupDetail?.limitationType === BetLimitationType.DAILY ?
                        (<Grid key={BetLimitationType.DAILY} container spacing={2} flexGrow={1} width={'100%'} marginX={0.5} marginTop={0.2}>
                                <Grid item xs={4}>
                                    <InfoTextField
                                        error={false}
                                        label={getTranslatedWord(RiskLevelGroupWordingType.OddsAdjustment)}
                                        helperText={''}
                                        format={"number"}
                                        step={0.0001}
                                        limitRange={[0, 999999999]}
                                        value={riskGroupDetail?.dailyBetLimitation?.oddsDecrease}
                                        onChange={handleValueChanged('dailyBetLimitation.oddsDecrease')}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <InfoTextField
                                        error={false}
                                        label={getTranslatedWord(RiskLevelGroupWordingType.DailyBettingLimit)}
                                        helperText={''}
                                        format={"number"}
                                        limitRange={[0, 999999999]}
                                        value={riskGroupDetail?.dailyBetLimitation?.dailyLimit}
                                        onChange={handleValueChanged('dailyBetLimitation.dailyLimit')}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <InfoTextField
                                        error={false}
                                        label={getTranslatedWord(RiskLevelGroupWordingType.DelayedBetSlipAcceptance)}
                                        helperText={''}
                                        format={"number"}
                                        limitRange={[0, 999999999]}
                                        suffix={'Second'}
                                        value={riskGroupDetail?.dailyBetLimitation?.delayAcceptance}
                                        onChange={handleValueChanged('dailyBetLimitation.delayAcceptance')}
                                    />
                                </Grid>
                            </Grid>
                        ) :
                        (
                            <Grid key={BetLimitationType.SINGLE} container spacing={2} flexGrow={1} width={'100%'} marginX={0.5} marginTop={0.2}>
                                <Grid item xs={4}>
                                    <InfoTextField
                                        error={false}
                                        label={getTranslatedWord(RiskLevelGroupWordingType.OddsAdjustment)}
                                        helperText={''}
                                        format={"number"}
                                        step={0.0001}
                                        limitRange={[0, 999999999]}
                                        value={riskGroupDetail?.singleBetLimitation?.oddsAdjustment}
                                        onChange={handleValueChanged('singleBetLimitation.oddsAdjustment')}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <InfoTextField
                                        error={false}
                                        label={getTranslatedWord(RiskLevelGroupWordingType.AmountAdjustmentPercentage)}
                                        helperText={''}
                                        suffix={'%'}
                                        format={"number"}
                                        limitRange={[0, 999999999]}
                                        value={riskGroupDetail?.singleBetLimitation?.amountAdjustment}
                                        onChange={handleValueChanged('singleBetLimitation.amountAdjustment')}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <InfoTextField
                                        error={false}
                                        label={getTranslatedWord(RiskLevelGroupWordingType.DelayedBetSlipAcceptance)}
                                        helperText={''}
                                        format={"number"}
                                        limitRange={[0, 999999999]}
                                        suffix={'Second'}
                                        value={riskGroupDetail?.singleBetLimitation?.delayAcceptance}
                                        onChange={handleValueChanged('singleBetLimitation.delayAcceptance')}
                                    />
                                </Grid>
                            </Grid>
                        )
                }
                <Grid item xs={12}>
                    <InfoQueryableSelectTextField
                        header={getTranslatedWord(RiskLevelGroupWordingType.Tag)}
                        tip={getTranslatedWord(RiskLevelGroupWordingType.TagTooltip)}
                        menu={{
                            label: getTranslatedWord(RiskLevelGroupWordingType.Tag),
                            currentValues: riskGroupDetail?.tags?.map(item => {
                                return {
                                    id: item.tagId,
                                    name: item.tagName
                                }
                            }),
                            multiple: true,
                            limitTags: 3,
                            onChange: handleValueChanged('tags'),
                            ViewModel: TagsListViewModel
                        }}
                    />
                </Grid>
                <Grid item xs={12} marginTop={3}>
                    <Stack alignItems={'flex-end'}>
                        <Button
                            variant="contained"
                            onClick={handlePublish}
                            disabled={isButtonDisabled}
                            data-testid={'publishButton'}
                        >
                            {
                                getTranslatedWord(RiskLevelGroupWordingType.PublishButton)
                            }
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}

export default function RiskGroupFormDialog(props: Readonly<RiskGroupFormProps>) {
    const {open, setOpen} = props

    return <FullScreenDialog
        open={open}
        setOpen={setOpen}
        content={
            <RiskGroupForm {...props} />
        }
    />
}
