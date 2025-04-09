import React, {Fragment} from "react";
import MemoizedTemplateSummaryCard, {TemplateSummaryCardProps} from "@/app/eventDetail/components/TemplateSummaryCard";
import {Grid} from "@mui/material";
import {GridBlock} from "@/app/eventDetail/components/pageComponent/TemplateSummaryForm";
import MemorizedTemplateSummaryParlayBet, {
    ParlayType,
    TemplateSummaryParlayBetProps
} from "@/app/eventDetail/components/TemplateSummaryParlayBet";
import TemplateBetSlipAmountSettings, {
    TemplateBetSlipAmountSettingsProps
} from "@/app/eventDetail/components/TemplateSummaryBetSlipSetting";

export interface SummaryBetSlipSettingProps {
    feederSuspendProps?: TemplateSummaryCardProps
    dangerAttackProps?: TemplateSummaryCardProps
    betSlipAmountSettingsProps?: TemplateBetSlipAmountSettingsProps
    autoSettlementSettingsProps?: TemplateSummaryCardProps
    bellowMarginSettingsProps?: TemplateSummaryCardProps
    parlayAlertProps?: TemplateSummaryCardProps
    rapidBetEntrySettingsProps?: TemplateSummaryCardProps
    delaySettingProps?: TemplateSummaryCardProps,
    singleBetProps?: TemplateSummaryCardProps,
    parlayBetProps?: TemplateSummaryParlayBetProps,
    sgpBetProps?: TemplateSummaryParlayBetProps
}

const SummaryBetSlipSetting = (props: SummaryBetSlipSettingProps) => {
    const {
        feederSuspendProps,
        dangerAttackProps,
        betSlipAmountSettingsProps,
        autoSettlementSettingsProps,
        bellowMarginSettingsProps,
        parlayAlertProps,
        rapidBetEntrySettingsProps,
        delaySettingProps,
        singleBetProps,
        parlayBetProps,
        sgpBetProps,
    } = props

    return (
        <Fragment>
            <GridBlock sx={{marginBottom: 3}}>
                <Grid item xs={6}>
                    <MemoizedTemplateSummaryCard
                        key={feederSuspendProps?.items[0]?.title}
                        items={feederSuspendProps?.items ?? []}
                    />
                </Grid>
                <Grid item xs={6}>
                    <MemoizedTemplateSummaryCard
                        key={dangerAttackProps?.items[0]?.title}
                        items={dangerAttackProps?.items ?? []}
                    />
                </Grid>
            </GridBlock>
            <GridBlock sx={{marginBottom: 3}}>
                <Grid item xs={6}>
                    <TemplateBetSlipAmountSettings
                        title={betSlipAmountSettingsProps?.title ?? 'Bet Slip Amount Imbalance Setting'}
                        preValue={betSlipAmountSettingsProps?.preValue}
                        refValue={betSlipAmountSettingsProps?.refValue}
                        currentValue={betSlipAmountSettingsProps?.currentValue}
                        isValueSet={betSlipAmountSettingsProps?.isValueSet ?? false}
                        shouldShowWarningSettingBar={betSlipAmountSettingsProps?.shouldShowWarningSettingBar ?? false}
                        onValueSelected={betSlipAmountSettingsProps?.onValueSelected}
                        adjustable={betSlipAmountSettingsProps?.adjustable ?? false}
                        reset={betSlipAmountSettingsProps?.reset ?? false}
                    />
                </Grid>
                <Grid item xs={6} paddingLeft={4}>
                    <MemoizedTemplateSummaryCard
                        key={bellowMarginSettingsProps?.items[0]?.title}
                        items={bellowMarginSettingsProps?.items ?? []}
                    />
                </Grid>
            </GridBlock>
            <GridBlock sx={{marginBottom: 3}}>
                <Grid item xs={6}>
                    <MemoizedTemplateSummaryCard
                        key={delaySettingProps?.items[0]?.title}
                        items={delaySettingProps?.items ?? []}
                    />
                </Grid>
                <Grid item xs={6} paddingLeft={4}>
                    <MemoizedTemplateSummaryCard
                        key={singleBetProps?.items[0]?.title}
                        items={singleBetProps?.items ?? []}
                    />
                </Grid>
            </GridBlock>
            <GridBlock sx={{marginBottom: 3}}>
                <Grid item xs={6}>
                    <MemorizedTemplateSummaryParlayBet
                        title={parlayBetProps?.title ?? ''}
                        preValue={parlayBetProps?.preValue}
                        refValue={parlayBetProps?.refValue}
                        currentValue={parlayBetProps?.currentValue}
                        isValueSet={parlayBetProps?.isValueSet ?? false}
                        shouldShowWarningSettingBar={parlayBetProps?.shouldShowWarningSettingBar ?? false}
                        onValueSelected={parlayBetProps?.onValueSelected}
                        adjustable={parlayBetProps?.adjustable ?? false}
                        parlayType={parlayBetProps?.parlayType ?? ParlayType.Parlay}
                        reset={parlayBetProps?.reset ?? false}
                    />
                </Grid>
                <Grid item xs={6} paddingLeft={4}>
                    <MemorizedTemplateSummaryParlayBet
                        title={sgpBetProps?.title ?? ''}
                        preValue={sgpBetProps?.preValue}
                        refValue={sgpBetProps?.refValue}
                        currentValue={sgpBetProps?.currentValue}
                        isValueSet={sgpBetProps?.isValueSet ?? false}
                        shouldShowWarningSettingBar={sgpBetProps?.shouldShowWarningSettingBar ?? false}
                        onValueSelected={sgpBetProps?.onValueSelected}
                        adjustable={sgpBetProps?.adjustable ?? false}
                        parlayType={sgpBetProps?.parlayType ?? ParlayType.SGP}
                        reset={sgpBetProps?.reset ?? false}
                    />
                </Grid>
            </GridBlock>
            <GridBlock sx={{marginBottom: 3}}>
                <Grid item xs={6}>
                    <MemoizedTemplateSummaryCard
                        key={parlayAlertProps?.items[0]?.title}
                        items={parlayAlertProps?.items ?? []}
                    />
                </Grid>
                <Grid item xs={6} paddingLeft={4}>
                    <MemoizedTemplateSummaryCard
                        key={rapidBetEntrySettingsProps?.items[0]?.title}
                        items={rapidBetEntrySettingsProps?.items ?? []}
                    />
                </Grid>
            </GridBlock>
            <GridBlock sx={{marginBottom: 3}}>
                <Grid item xs={12}>
                    <MemoizedTemplateSummaryCard
                        key={autoSettlementSettingsProps?.items[0]?.title}
                        items={autoSettlementSettingsProps?.items ?? []}
                    />
                </Grid>
            </GridBlock>
        </Fragment>
    )
}

export default React.memo(SummaryBetSlipSetting)