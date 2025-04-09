"use client";
import {GridColDef} from '@mui/x-data-grid';
import {
    getDateTimeDisplay,
    getFractionLineDisplay,
    numbersDisplay
} from '@/modules/components/eventTable/EventDataConverter'
import '@/modules/components/eventTable/event.columns.css'
import {removeZeroZeroFromBaseLine} from "@/app/eventList/domain/useEventListViewModel";
import {Box, Button, Stack, Typography} from "@mui/material";
import {IntlShape} from "react-intl";
import * as React from "react";
import {TimeFormat} from "@/modules/common/DisplayFormatConverter";
import {BetParticipantDataModel, BetResultModel} from "@/services/@core/module/ResponseDataModels";
import {BetResult, BetStatus, EventType} from "@/services/@core/module/Enum";
import {MatchBetResultChip} from "@/modules/components/chip/MatchStatusChip";
import {processParticipantCards} from "@/app/betSlip/components/columns";

export function columns(
    intl: IntlShape,
    commonLang: string,
    handleOptionClick: (betId: string, optionType: BetStatus) => void
): GridColDef[] {
    return [
        {
            field: 'eventTime',
            headerName: intl.formatMessage({id: `${commonLang}.eventStartTime`, defaultMessage: 'Event Start Time'}),
            headerClassName: 'bold-header',
            flex: 1,
            valueGetter: (params) => getDateTimeDisplay(params, TimeFormat.Short)
        },
        {
            field: 'sportName_marketName',
            headerClassName: 'bold-header',
            flex: 1.5,
            sortable: false,
            renderHeader: () => (
                <div className="MuiDataGrid-columnHeaderTitle">
                    { intl.formatMessage({id: `${commonLang}.sport`, defaultMessage: 'Sport'}) }
                    &nbsp;/&nbsp;
                    { intl.formatMessage({id: `${commonLang}.market`, defaultMessage: 'Market'}) }
                </div>

            ),
            renderCell: (params) => {
                const sportName = params.row['sportName'] as string
                const marketName = params.row['marketName'] as string
                return (
                    <div className="MuiDataGrid-cellContent" title={`${sportName}\n${marketName}`}>
                        <div className="MuiDataGrid-cellContent">{sportName}</div>
                        <div className="MuiDataGrid-cellContent">{marketName}</div>
                    </div>
                )
            }
        },
        {
            field: 'leagueName_eventName',
            headerClassName: 'bold-header',
            flex: 4,
            sortable: false,
            renderHeader: () => (
                <div className="MuiDataGrid-columnHeaderTitle">
                    { intl.formatMessage({id: `${commonLang}.league`, defaultMessage: 'League'}) }
                    &nbsp;/&nbsp;
                    { intl.formatMessage({id: `${commonLang}.event`, defaultMessage: 'Event'}) }
                </div>
            ),
            renderCell: (params) => {
                const eventId = params.row['eventId'] as string
                const leagueName = params.row['leagueName'] as string
                const eventType = params.row['eventType'] as string
                const betName = params.row['betName'] as string
                const line = getFractionLineDisplay(removeZeroZeroFromBaseLine(params.row['line']) ?? params.row['line']);
                const odds = params.row['odds'];
                const participants = params.row['participants'] as BetParticipantDataModel[]
                const home = participants?.find(participant => participant.isHome)
                const away = participants?.find(participant => !participant.isHome)

                const {cardTypes, cardItems} = processParticipantCards(participants)

                return (
                    <Box className="MuiDataGrid-cellContent" title={`${leagueName}\n${betName} ${line} @${odds}`}>
                        <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
                            <Typography className="MuiDataGrid-cellContent" variant={'body2'} color={'primary.main'}>
                                {eventId}
                            </Typography>
                            <Typography className="MuiDataGrid-cellContent" variant={'body2'}>
                                {leagueName}
                            </Typography>
                        </Stack>
                        <Typography className="MuiDataGrid-cellContent" variant={'body2'}>
                            {home?.name}&nbsp;
                            {eventType === EventType.inPlay ? `(${home?.score ?? '--'}:${away?.score ?? '--'})` : 'vs'}&nbsp;
                            {away?.name}
                        </Typography>
                        <Stack direction={'row'} alignItems={'center'}>
                            <Typography variant={'body2'} sx={{color: '#136C13', fontWeight: 600}}>
                                {betName}&nbsp;{line}
                            </Typography>
                            &nbsp;@&nbsp;
                            <Typography variant={'body2'} sx={{color: '#C41C1C', fontWeight: 600}}>
                                {odds}
                            </Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'start'}>
                            {(home?.corners && away?.corners) && numbersDisplay([home.corners, away.corners], 'CornerKick')}
                            {cardTypes.size > 0 && Object.keys(cardItems).map(cardType => numbersDisplay(cardItems[cardType], cardType))}
                        </Stack>
                    </Box>
                )
            }
        },
        {
            field: 'providerName',
            headerName: intl.formatMessage({
                id: `${commonLang}.oddsFeed`, defaultMessage: 'Odds Feed'}),
            headerClassName: 'bold-header',
            width: 100,
        },
        {
            field: 'status',
            headerName: intl.formatMessage({id: `${commonLang}.result`, defaultMessage: 'Result'}),
            headerClassName: 'bold-header',
            flex: 1,
            renderCell: (params) => {
                const status = params.value as string
                return (
                    <>
                    { status
                        ? <MatchBetResultChip status={status as BetResult}/>
                        : <Typography variant={'body2'} color={'text.primary'}>-</Typography>
                    }
                    </>
                )
            }
        },
        {
            field: 'finalScore',
            headerName: intl.formatMessage({
                id: `${commonLang}.finalScore`, defaultMessage: 'Final Score'}),
            headerClassName: 'bold-header',
            flex: 1,
            renderCell: (params) => {
                const betResults = params.row['betResults'] as BetResultModel[]
                const scoreResults = betResults?.filter(betResult => betResult.name === 'SCORE') ?? [];
                const homeFinalScoreAtPlacedMarket = scoreResults.find(result => result.position === 1)?.finalScore ?? '--';
                const awayFinalScoreAtPlacedMarket = scoreResults.find(result => result.position === 2)?.finalScore ?? '--';
                return `${homeFinalScoreAtPlacedMarket} : ${awayFinalScoreAtPlacedMarket}`
            }
        },
        {
            field: 'action',
            headerName: intl.formatMessage({
                id: `${commonLang}.action`, defaultMessage: 'Action'}),
            headerClassName: 'bold-header',
            align: 'center',
            headerAlign: 'center',
            flex: 1,
            renderCell: (params) => {
                const betId = params.row['betId'] as string
                return (
                    <Button variant={'text'} color={'error'} sx={{margin: 0}}
                            onClick={() => handleOptionClick(betId, BetStatus.VOID)}
                    >
                        {
                            intl.formatMessage({
                                id: `betSlip.actionDelete`, defaultMessage: 'Delete'})
                        }
                    </Button>
                )
            }
        }
    ]
}

