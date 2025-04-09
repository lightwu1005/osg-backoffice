"use client";
import {Box, Button, Divider, Grid, Stack, Typography} from "@mui/material";
import React from "react";
import {MatchStatusChip} from "@/modules/components/chip/MatchStatusChip";
import MarketsComponent from "@/app/eventDetail/components/MarketsComponent";
import ActionButton from "@/modules/components/buttons/actionButton/ActionButton";
import LoadingAnimation from "@/modules/components/general/LoadingAnimation";
import useEventDetailViewModel from "@/app/eventDetail/domain/useEventDetailViewModel";
import {OddsContent} from "@/app/eventDetail/components/OddsContent";
import MarketSettingDialog from "@/app/eventDetail/components/pageComponent/MarketSettingDialog";
import PageFramework from "@/modules/components/general/PageFramework";
import SummaryComponent from "@/app/eventDetail/components/SummaryComponent";
import {EventType, PageType} from "@/services/@core/module/Enum";
import {EventStatus} from "@/services/@core/module/EventStatus";
import ParticipantContainer from "../ParticipantContainer";

export interface EventDetailPageProps {
    eventType: string
    eventId: string
    sportId: string
}

export default function EventDetailPage(props: EventDetailPageProps) {
    const {eventType, eventId} = props
    const {
        isLoading,
        detailData,
        periodName,
        startDate,
        actions,
        allMarketStatusItems,
        marketsFilter,
        providersFilter,
        displayFilterButtons,
        selectedMarket,
        selectedProviders,
        eventDuration,
        subPagePop, setSubPagePop,
        handleMarketSelectedResult,
        handleProviderSelectedResult,
        handleStatusButtonOnClick,
        handleActionButtonOnClick,
        onClickMarketSetting,
        onClickPlayByPlayLogButton,
        marketPerformance,
        betSlipPerformance,
        selectedMarketId,
        intl,
        funType,
        funCommonType,
        isBets,
        onClickAcceptData,
        shouldShowMarketsAndOddsView,
        home,
        away,
        currentMatchState,
        marketsData,
        marketGroups
    } = useEventDetailViewModel(props)

    return (
        <PageFramework>
            <Stack spacing={2} sx={{width: '100%', maxWidth: '100%', mx: 'auto', paddingY: 2, paddingX: 3}}>
                <Box sx={{position: 'relative'}}>
                    <Grid container alignItems={'center'}>
                        <Grid item xs={12} mb={1}>
                            <Typography data-testid={'leagueName'} fontSize={24}>{detailData?.leagueName}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography data-testid={'startDate'} fontSize={14}>{startDate}</Typography>
                        </Grid>
                        <Grid item ml={2}>
                            <MatchStatusChip data-testid={'statusChip'} status={detailData?.status}/>
                        </Grid>
                    </Grid>
                    {
                        eventType === EventType.inPlay &&
                        <Box sx={{position: 'absolute', top: 0, right: 0}}>
                            <Button variant={'outlined'} onClick={onClickPlayByPlayLogButton}>
                                {
                                    intl.formatMessage({
                                        id: `${funType}.playByPlayLog`,
                                        defaultMessage: 'Play by Play Log'
                                    })
                                }
                            </Button>
                        </Box>
                    }
                </Box>
                <Divider/>
                <Box data-testid='teamInfo'>
                    <ParticipantContainer
                        home={{
                            name: home.name,
                            score: home.score,
                            cards: home.cards,
                            extraScores: home.extraScores,
                        }}
                        away={{
                            name: away.name,
                            score: away.score,
                            cards: away.cards,
                            extraScores: away.extraScores,
                        }}
                        periodName={periodName ?? ''}
                        duration={eventDuration}
                        switchToHomeTeam={currentMatchState.home}
                        switchToAwayTeam={currentMatchState.away}
                    />
                </Box>
                <Box sx={{position: 'relative'}}>
                    <SummaryComponent title={intl.formatMessage({id: `${funType}.summary`, defaultMessage: 'Summary'})}
                                      marketPerformance={marketPerformance}
                                      betSlipPerformance={betSlipPerformance}
                                      eventId={eventId}
                                      defaultExpanded={detailData?.status === EventStatus.FINISHED}
                    />
                </Box>
                {
                    shouldShowMarketsAndOddsView && (
                        <>
                            <Box data-testid={'markets'} sx={{position: 'relative'}}>
                                <MemoizedMarketsComponent
                                    title={intl.formatMessage({id: `${funType}.market`, defaultMessage: 'Market'})}
                                    subTitle={intl.formatMessage({
                                        id: `${funType}.marketDescription`,
                                        defaultMessage: 'You can control specific markets here.'
                                    })}
                                    allMarketStatusItems={allMarketStatusItems}
                                    marketProps={marketsFilter}
                                    marketGroups={marketGroups}
                                    providerProps={providersFilter}
                                    marketSelectedResult={handleMarketSelectedResult}
                                    providerSelectedResult={handleProviderSelectedResult}
                                    statusButtonOnClick={handleStatusButtonOnClick}
                                    isBets={isBets}
                                    sportType={detailData?.sportType ?? "Soccer"}
                                    eventType={eventType}
                                />
                                <Box sx={{position: 'absolute', top: 0, right: 0}}>
                                    <ActionButton
                                        label={intl.formatMessage({
                                            id: `${funCommonType}.actions`, defaultMessage: 'Actions'
                                        })}
                                        list={actions}
                                        onItemClick={handleActionButtonOnClick}
                                    />
                                </Box>
                            </Box>
                            <Box data-testid={'odds'}>
                                <MemoizedOddsContent
                                    pageType={PageType.EventDetail}
                                    eventType={eventType}
                                    eventId={eventId}
                                    onClickMarketSetting={onClickMarketSetting}
                                    selectedMarket={selectedMarket}
                                    marketStatusItems={displayFilterButtons.items}
                                    providers={selectedProviders}
                                    detailData={detailData}
                                    isBets={isBets}
                                    onClickAcceptData={onClickAcceptData}
                                    homeParticipantEnName={home.participantEnName ?? home.name}
                                    awayParticipantEnName={away.participantEnName ?? away.name}
                                    marketType={marketsData.find(market => market.marketId === selectedMarket.key)?.marketType ?? ''}
                                />
                                <LoadingAnimation isLoading={isLoading}/>
                            </Box>
                        </>
                    )
                }
                <MarketSettingDialog open={subPagePop} setOpen={setSubPagePop}
                                     marketSettingProps={{
                                         eventId: eventId,
                                         eventType: eventType,
                                         marketId: selectedMarketId,
                                         sportId: detailData?.sportId ?? '',
                                         sportType: detailData?.sportType ?? '',
                                         sportName: detailData?.sportName ?? '',
                                         leagueId: detailData?.leagueId ?? '',
                                         leagueName: detailData?.leagueName ?? ''
                                     }}
                />
            </Stack>
        </PageFramework>
    )
}

const MemoizedMarketsComponent = React.memo(MarketsComponent, (prevProps, nextProps) => {
    // Only re-render if props are changed
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
})
MemoizedMarketsComponent.displayName = 'MarketsComponent'

const MemoizedOddsContent = React.memo(OddsContent, (prevProps, nextProps) => {
    // Only re-render if props are changed
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
})
MemoizedOddsContent.displayName = 'OddsContent'