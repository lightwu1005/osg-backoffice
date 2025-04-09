import React, {Fragment} from "react";
import {Grid} from "@mui/material";
import MemoizedTemplateSummaryCard, {TemplateSummaryCardProps} from "@/app/eventDetail/components/TemplateSummaryCard";
import {GridBlock} from "@/app/eventDetail/components/pageComponent/TemplateSummaryForm";
import {SummaryCardItemType} from "@/app/eventDetail/components/TemplateSummaryCardItem";


export interface GeneralSettingProps {
    providerPriorityProps?: TemplateSummaryCardProps
    oddsSettingProps?: TemplateSummaryCardProps
    basicTemplateInfoProps?: TemplateSummaryCardProps
    marginProps?: TemplateSummaryCardProps
    lineSettingProps?: TemplateSummaryCardProps
    deviationProps?: TemplateSummaryCardProps
    decreaseSettingProps?: TemplateSummaryCardProps
    heavyBettingProps?: TemplateSummaryCardProps
}

const SummaryGeneralSetting = (props: GeneralSettingProps) => {

    const {
        providerPriorityProps,
        oddsSettingProps,
        marginProps,
        lineSettingProps,
        deviationProps,
        decreaseSettingProps,
        heavyBettingProps
    } = props

    return (
        <Fragment>
            <GridBlock sx={{marginBottom: 3}}>
                <Grid item xs={6}>
                    <MemoizedTemplateSummaryCard
                        key={providerPriorityProps?.items[0]?.title}
                        items={providerPriorityProps?.items ?? []}
                    />
                </Grid>
                <Grid item xs={6} paddingLeft={4}>
                    <MemoizedTemplateSummaryCard
                        key={oddsSettingProps?.items[0]?.title}
                        items={oddsSettingProps?.items ?? []}
                    />
                </Grid>
            </GridBlock>
            <GridBlock sx={{marginBottom: 3}}>
                <Grid item xs={6}>
                    <MemoizedTemplateSummaryCard
                        key={marginProps?.items[0]?.title}
                        items={marginProps?.items ?? []}
                    />
                </Grid>
                <Grid item xs={6}>
                    <MemoizedTemplateSummaryCard
                        key={lineSettingProps?.items[0]?.title}
                        items={lineSettingProps?.items ?? []}
                    />
                </Grid>
            </GridBlock>
            <GridBlock sx={{marginBottom: 3}}>
                <Grid item xs={6}>
                    <MemoizedTemplateSummaryCard
                        key={deviationProps?.items[0]?.title}
                        items={deviationProps?.items[0] ? [deviationProps.items[0]] : []}
                    />
                    <MemoizedTemplateSummaryCard
                        key={deviationProps?.items[1]?.title}
                        items={deviationProps?.items[1] ? [deviationProps.items[1]] : []}
                    />
                </Grid>
            </GridBlock>
            <GridBlock sx={{marginBottom: 3}}>
                <Grid item xs={6}>
                    <MemoizedTemplateSummaryCard
                        key={decreaseSettingProps?.items[0]?.title}
                        items={decreaseSettingProps?.items ?? []}
                    />
                </Grid>
                <Grid item xs={6}>
                    <MemoizedTemplateSummaryCard
                        key={heavyBettingProps?.items[0]?.title}
                        items={heavyBettingProps?.items ?? []}
                    />
                </Grid>
            </GridBlock>
        </Fragment>
    )
}

export default React.memo(SummaryGeneralSetting)