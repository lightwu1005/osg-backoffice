"use client";
import React, {useCallback, useEffect, useState} from "react"
import {Accordion, AccordionDetails, AccordionSummary, Stack, Typography} from "@mui/material"
import BetSlipsPerformance from "@/app/dashboard/components/pageComponent/BetSlipsPerformance";
import MarketPerformance from "@/app/dashboard/components/pageComponent/MarketPerformance"
import {PerformanceDataModel} from "@/services/@core/module/ResponseDataModels";
import {BarChartProps, PieChartProps, toBarchartParameters} from "@/app/dashboard/models/EventQueryParameters";
import {toBarchartProps, toPieChartProps} from "@/services/@dashboard/useCase";
import {useNavigationProvider} from "@/utils/NavigationProvider";
import {PageType} from "@/services/@core/module/Enum";
import {CommonPieChartRecord} from "@/modules/components/charts/CommonPieChart";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import { ExpandMore } from "@mui/icons-material";

export interface SummaryComponentProps {
    readonly title: string
    readonly marketPerformance: PerformanceDataModel[]
    readonly betSlipPerformance: PerformanceDataModel[]
    readonly eventId: string
    readonly defaultExpanded: boolean
}

export default function SummaryComponent(props: SummaryComponentProps) {
    const {chartProvider} = useNavigationProvider();
    const {
        marketPerformance,
        betSlipPerformance,
        title,
        eventId,
        defaultExpanded
    } = props
    const [betSlipBarData, setBetSlipBarData] = useState<PieChartProps[]>()
    const [marketBarData, setMarketBarData] = useState<BarChartProps>()
    const [expanded, setExpanded] = useState<boolean>(defaultExpanded)

    const intl = useIntl()
    const funType = `${LocalizationFunctionType.Dashboard}.odds`

    const onChartSelected = useCallback(() => (params: CommonPieChartRecord) => {
        const newParams: CommonPieChartRecord = {...params, eventId: eventId}
        chartProvider.chartNavigation(newParams, PageType.BetSlip)
    }, []);


    useEffect(() => {
        const parameters: toBarchartParameters = {
            title: intl.formatMessage({id: `${funType}.marketName`, defaultMessage: 'Market Name'}),
            subTitle: intl.formatMessage({id: `${funType}.numberOfBets`, defaultMessage: 'Number of Bets'}),
            dataType: 'number',
            data: props.marketPerformance
        }
        setMarketBarData(() => toBarchartProps(parameters))
    }, [marketPerformance]);

    useEffect(() => {
        setBetSlipBarData(() => toPieChartProps(betSlipPerformance))
    }, [betSlipPerformance]);

    useEffect(() => {
        if (defaultExpanded)
            setExpanded(defaultExpanded)
    }, [defaultExpanded]);

    return (
        <Accordion
            sx={{
                border: 'none',
                boxShadow: 'none',
                '&:before': {
                    display: 'none',
                }
            }}
            expanded={expanded}
            onChange={(_, isExpanded) => setExpanded(isExpanded)}
        >
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={'panel-summary-content'}
                id={'panel-summary-header'}
                sx={{ paddingX: 0, borderTop: 'none' }}
            >
                <Typography variant={'h4'} sx={{
                    color: '#171A1C',
                    '[data-mui-color-scheme="dark"] &': {
                        color: '#9FA6AD'
                    },
                    fontSize: 20,
                    fontFamily: 'Inter',
                    fontWeight: '600',
                }}>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ paddingX: 0 }}>
                <Stack direction={"row"} justifyContent={"space-between"} spacing={2}>
                    <MarketPerformance
                        title={intl.formatMessage({
                            id: `${funType}.marketPerformanceText`,
                            defaultMessage: 'Market Performance'
                        })}
                        chartData={marketBarData} onDataSelected={onChartSelected()} hasOptions={false}/>
                    <BetSlipsPerformance
                        title={intl.formatMessage({
                            id: `${funType}.bettingSlipPerformanceText`,
                            defaultMessage: 'Betting Slip Performance'
                        })}
                        chartData={betSlipBarData} onDataSelected={onChartSelected()} hasOptions={false}/>
                </Stack>
            </AccordionDetails>
        </Accordion>
    )
}
