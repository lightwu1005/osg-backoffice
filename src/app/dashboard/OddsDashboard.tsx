"use client";
import React from "react"
import {Box} from "@mui/material"
import DevicePerformance from "@/app/dashboard/components/pageComponent/DevicePerformance"
import SportsPerformance from "@/app/dashboard/components/pageComponent/SportsPerformance"
import BetSlipsPerformance from "@/app/dashboard/components/pageComponent/BetSlipsPerformance";
import MarketPerformance from "@/app/dashboard/components/pageComponent/MarketPerformance"
import LeaguePerformance from "@/app/dashboard/components/pageComponent/LeaguePerformance"
import EventSettledAmountImbalanceHighlight from "@/app/dashboard/components/pageComponent/ImbalancePerformance"
import PerformanceDateSelection from "@/app/dashboard/components/PerformanceDateSelection"
import {PageType} from "@/services/@core/module/Enum";
import useOddsDashboardViewModel from "@/app/dashboard/domain/useOddsDashboardViewModel";

export default function OddsDashboard() {
    const {
        deviceBarData,
        sportBarData,
        betSlipBarData,
        marketBarData,
        leagueBarData,
        imbalanceBarData,
        sportList,
        onChartSelected,
        onDateRangeSelected,
        handleQueryChange,
        intl,
        funType
    } = useOddsDashboardViewModel()

    return (<>
            <Box height={32}/>
            <PerformanceDateSelection onDateRangeSelected={onDateRangeSelected}/>
            <Box height={32}/>
            <Box sx={{display: 'flex'}}>
                <DevicePerformance
                    title={intl.formatMessage({
                        id: `${funType}.memberDevicesText`, defaultMessage: 'Member Devices'
                    })}
                    chartData={deviceBarData}
                    onDataSelected={onChartSelected(PageType.BetSlip)}
                />
                <SportsPerformance
                    title={intl.formatMessage({
                        id: `${funType}.sportPerformanceText`,
                        defaultMessage: 'Sport Performance'
                    })}
                    sportsList={sportList}
                    chartData={sportBarData}
                    onDataSelected={onChartSelected(PageType.BetSlip)}
                    handleQueryChange={handleQueryChange}
                />
            </Box>
            <Box height={32}/>
            <Box sx={{display: 'flex'}}>
                <BetSlipsPerformance
                    title={intl.formatMessage({
                        id: `${funType}.bettingSlipPerformanceText`,
                        defaultMessage: 'Betting Slip Performance'
                    })}
                    chartData={betSlipBarData}
                    onDataSelected={onChartSelected(PageType.BetSlip)}
                    hasOptions={true}
                    handleQueryChange={handleQueryChange}
                />
                <MarketPerformance
                    title={intl.formatMessage({
                        id: `${funType}.marketPerformanceText`,
                        defaultMessage: 'Market Performance'
                    })}
                    sportsList={sportList}
                    chartData={marketBarData}
                    onDataSelected={onChartSelected(PageType.BetSlip)}
                    handleQueryChange={handleQueryChange}
                    hasOptions={true}
                />
            </Box>
            <Box height={32}/>
            <Box>
                <LeaguePerformance
                    title={intl.formatMessage({
                        id: `${funType}.leaguePerformanceText`,
                        defaultMessage: 'League Performance'
                    })}
                    sportsList={sportList}
                    chartData={leagueBarData}
                    onDataSelected={onChartSelected(PageType.BetSlip)}
                    handleQueryChange={handleQueryChange}/>
            </Box>
            <Box height={32}/>
            <Box>
                <EventSettledAmountImbalanceHighlight
                    title={intl.formatMessage({
                        id: `${funType}.eventSettledAmountImbalanceHighlight`,
                        defaultMessage: 'Event Settled Amount Imbalance Highlight'
                    })}
                    sportsList={sportList}
                    chartData={imbalanceBarData}
                    onDataSelected={onChartSelected(PageType.EventList)}
                    handleQueryChange={handleQueryChange}/>
            </Box>
        </>
    );
}
