'use client'
import React from "react";
import {Box, Slide, Stack, Typography} from "@mui/material";
import PlayLogHeaderContent from "@/app/eventDetail/components/playLog/PlayLogHeaderContent";
import usePlayLogSummaryViewModel from "@/app/eventDetail/domain/usePlayLogSummaryViewModel";
import LineupsPage from "@/app/eventDetail/components/playLog/pageComponent/LineupsPage";
import Tabs from "@/modules/components/tabs/Tabs";
import MatchStatsPage from "@/app/eventDetail/components/playLog/pageComponent/MatchStatsPage";
import TimelinePage from "@/app/eventDetail/components/playLog/pageComponent/TimelinePage";
import PageFramework from "@/modules/components/general/PageFramework";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import ParticipantContainer from "@/app/eventDetail/components/ParticipantContainer";
import {removeNonLettersAndToLower} from "@/app/eventDetail/models/EventDetailUtils";

export interface PlayByPlayLogPageProps {
    eventId: string;
    sportType: string;
}

function HideOnScroll({eventId, sportType}: {
    readonly eventId: string
    readonly sportType: string
}) {
    const {
        isLoading,
        summaryData,
        statistics,
        scores,
        isTopBarVisible,
        targetTopBarRef,
        currentMatchState,
        eventDuration
    } = usePlayLogSummaryViewModel(eventId, sportType);

    const isHomeState = currentMatchState.home;
    const isAwayState = currentMatchState.away;
    const borderImage = isHomeState
        ? 'linear-gradient(to right, #0B6BCB 50%, transparent 50%) 1'
        : isAwayState ? 'linear-gradient(to right, transparent 50%, #C41C1C 50%) 1' : undefined;

    const redCards = summaryData?.statisticCounts.find(item =>
        removeNonLettersAndToLower(item.name) === 'redcards');
    const yellowCards = summaryData?.statisticCounts.find(item =>
        removeNonLettersAndToLower(item.name) === 'yellowcards');

    return (
        <>
            <div ref={targetTopBarRef}>
                <Box data-testid={'summary-section'}
                     sx={{
                         borderBottom: `${!isHomeState && !isAwayState ? undefined : '4px solid'}`,
                         borderImage: borderImage,
                     }}
                >
                    <Typography sx={{paddingX: 3, paddingY: 2}} variant={'h3'} color={'text.primary'}>
                        [{eventId}] {summaryData?.eventName}
                    </Typography>
                    <PlayLogHeaderContent isLoading={isLoading} summaryData={summaryData} statistics={statistics} scores={scores} duration={eventDuration}/>
                </Box>
            </div>
            {!isTopBarVisible && (
                <Slide in={!isTopBarVisible} style={{transformOrigin: '0 0 0'}} timeout={300}>
                    <Box>
                        <ParticipantContainer
                            home={{
                                name: summaryData?.competitors.homeName ?? '',
                                score: Number(summaryData?.periodScores.at(-1)?.home),
                                cards: (redCards || yellowCards) ? [
                                    {cardType: 'red', cardCount: Number(redCards?.home)},
                                    {cardType: 'yellow', cardCount: Number(yellowCards?.home)},
                                ] : undefined
                            }}
                            away={{
                                name: summaryData?.competitors.awayName ?? '',
                                score: Number(summaryData?.periodScores.at(-1)?.away),
                                cards: (redCards || yellowCards) ? [
                                    {cardType: 'red', cardCount: Number(redCards?.away)},
                                    {cardType: 'yellow', cardCount: Number(yellowCards?.away)},
                                ] : undefined
                            }}
                            periodName={summaryData?.currentPeriodName ?? ''}
                            duration={eventDuration ?? summaryData?.eventDuration}
                            switchToHomeTeam={isHomeState}
                            switchToAwayTeam={isAwayState}
                            isFixedToTop
                        />
                    </Box>
                </Slide>
            )}
        </>
    );
}

export default function PlayByPlayLogPage(props: PlayByPlayLogPageProps) {
    const isBasketball: boolean = /basketball/i.test(props.sportType)
    const intl = useIntl()
    const funType = LocalizationFunctionType.Event

    const timeline = intl.formatMessage({
        id: `${funType}.timeline`,
        defaultMessage: 'TIMELINE'
    })
    const matchStats = intl.formatMessage({
        id: `${funType}.matchStats`,
        defaultMessage: 'MATCH STATS'
    })
    const lineups = intl.formatMessage({
        id: `${funType}.lineups`,
        defaultMessage: 'LINEUPS'
    })

    return (
        <PageFramework>
            <Stack gap={1} sx={{width: '100%', maxWidth: '100%', mx: 'auto'}}>
                <HideOnScroll eventId={props.eventId} sportType={props.sportType}/>
                <Box data-testid='play-log-tabs'>
                    <Tabs
                        variant={'fullWidth'}
                        labels={[
                            {label: timeline},
                            {label: matchStats},
                            ...(isBasketball ? [] : [{label: lineups}])
                        ]}
                    >
                        {[TimelinePage, MatchStatsPage, ...(isBasketball ? [] : [LineupsPage])].map((Page, index) => (
                            <Box
                                data-testid={`tab-info-${index}`}
                                key={`tab-info-${index}`}
                                width='100%'
                                sx={{
                                    backgroundColor: '#FBFCFE',
                                    '[data-mui-color-scheme="dark"] &': {
                                        backgroundColor: '#090E17',
                                    },
                                    paddingX: 10, paddingY: 4
                                }}
                            >
                                {React.createElement(Page, {eventId: props.eventId, sportType: props.sportType})}
                            </Box>
                        ))}
                    </Tabs>
                </Box>
            </Stack>
        </PageFramework>
    );
}
