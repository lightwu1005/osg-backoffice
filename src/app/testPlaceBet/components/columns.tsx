"use client";
import {GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import {
    getDateTimeDisplay, getFractionLineDisplay, getRuleNumber,
    renderMarketStatusDisplay,
    renderMatchStatusDisplay,
    renderWithCopyButton,
    renderWithDangerBall, transformedPrice
} from '@/modules/components/eventTable/EventDataConverter'
import '@/modules/components/eventTable/event.columns.css'
import * as React from "react";
import {
    BetModel,
    ConfigurationModel,
    OddDataModel,
    OddModel
} from "@/services/@core/module/ResponseDataModels";
import {OddsLinePriceProps} from "@/app/testPlaceBet/components/otherLineColumns";
import {Box, Stack, Typography} from "@mui/material";
import Chip from "@mui/material/Chip";
import IdentityHandler from "@/modules/common/IdentityHandler";
import {BetPartData} from "@/app/testPlaceBet/models/TestPlaceBetParameters";
import {EventType} from "@/services/@core/module/Enum";
import {IntlShape} from "react-intl";

export function columns(
    intl: IntlShape,
    funType: string,
    eventType: string,
    sportType: string,
    handleCopyButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, text: string) => void,
    selectedOdds: BetPartData[],
    configuration?: ConfigurationModel,
    toggle?: (props: OddsLinePriceProps) => void
): GridColDef[] {

    const isBasketball = sportType.toLowerCase() === 'basketball';

    const ouMktName = isBasketball ? 'Total Points Over / Under' : 'Total Goals Over / Under';
    const handicapMktName = isBasketball
        ? 'Point Spread'
        : eventType === EventType.inPlay
            ? 'Rest of Match Asian Handicap'
            : 'Asian Handicap';
    const oneXTwoMktName = isBasketball ? 'Money Line' : 'Match Result';

    const ouTitle = isBasketball ? intl.formatMessage(
        { id: 'event.targetMarkets.overUnder', defaultMessage: 'Over/Under' },
    ) : intl.formatMessage(
        { id: 'event.targetMarkets.ou', defaultMessage: 'O/U' },
    );
    const handicapTitle = isBasketball ? intl.formatMessage(
        { id: 'event.targetMarkets.handicap', defaultMessage: 'Handicap' },
    ) : intl.formatMessage(
        { id: 'event.targetMarkets.asiaHandicap', defaultMessage: 'Asia Handicap' },
    );
    const oneXTwoTitle = isBasketball ? intl.formatMessage(
        { id: 'event.targetMarkets.moneyLine', defaultMessage: 'Money Line' },
    ) : intl.formatMessage(
        { id: 'event.targetMarkets.1X2', defaultMessage: '1X2' },
    );

    const renderOddsBaseLinePriceDisplay = (
        params: GridRenderCellParams<any, string>,
        market: string,
        configuration?: ConfigurationModel,
        oddsToggle?: (props: OddsLinePriceProps) => void
    ) => {
        const {oddsDisplay} = IdentityHandler();
        const isDangerBall = !!params.row.dangerBallState;
        const eventStatus = params.row.eventSuspendedStatus !== 'ACTIVE';
        const isHandicap = market.toLowerCase().includes(handicapMktName.toLowerCase());
        const lowerCaseMarket = isHandicap ? handicapMktName.toLowerCase() : market.toLowerCase();

        let oddsData = params.row.oddsData.find((item: OddDataModel) => item.marketType.toLowerCase() === lowerCaseMarket) as OddDataModel;
        if (!oddsData?.odds || oddsData.odds.length === 0) {
            return (
                <Box>
                    No Data
                </Box>
            )
        }

        const firstOdds = oddsData?.odds?.at(0) ?? {} as OddModel;
        const marketStatus = oddsData?.marketSuspendedStatus === 'SUSPENDED' || oddsData?.marketSuspendedStatus === 'CLOSE';
        const oddsLength = lowerCaseMarket === '1x2' ? 0 : oddsData?.odds?.length ?? 0;

        const onClick = (bet: BetModel, eventId: string, baseLine: string, marketType: string) => () => {
            if (oddsToggle) {
                oddsToggle({eventId, baseLine, bet, marketType});
            }
        }

        let order: string[] = [];
        switch (lowerCaseMarket) {
            case '1x2': order = ["1", "2", "x"]; break;
            case 'under/over including overtime':
            case 'total points over / under':
            case 'total goals over / under':
            case 'half-time total goals over / under':
            case 'under/over': order = ["over", "under"]; break;
            case '12':
            case '12 including overtime':
            case 'half-time result':
            case 'half-time asian handicap':
            case 'asian handicap including overtime':
            case 'match handicap':
            case 'money line':
            case 'match result':
            case 'point spread':
            case 'rest of match asian handicap':
            case 'asian handicap': order = ["1", "2"]; break;
            default: order = []; break;
        }

        const sortedBets = firstOdds.bets.slice().sort((a, b) => order.indexOf(a.betName.toLowerCase()) - order.indexOf(b.betName.toLowerCase()));
        const lineString = (eventType === EventType.inPlay) ? getFractionLineDisplay(firstOdds.baseLine ?? '') : getFractionLineDisplay(firstOdds.baseLine?.replace(/\s*\([^()]*\)/, '') ?? '');

        return (
            <Stack key={params.row.id + market} direction={'row'} alignItems={'center'}>
                {firstOdds.baseLine &&
                    <Typography sx={{color: 'text.primary', marginRight: '0.5rem', textAlign: 'center', lineHeight: '35px', fontSize: '0.875rem'}}>
                        {lineString}
                    </Typography>
                }
                {
                    sortedBets.map((bet, index) => {
                        const point = configuration ? getRuleNumber(Number(bet.price), configuration) : 4
                        const betStatus = bet.betStatus === 'CLOSED' || bet.betStatus === 'SUSPENDED';
                        return (
                            <Box key={bet.betId} flexDirection={'row'} display={'flex'} justifyContent={'center'} alignItems={'center'} p={0.5}>
                                <Chip
                                    disabled={isDangerBall || eventStatus || marketStatus || betStatus}
                                    sx={{width: '130px', height: '26px'}}
                                    label={transformedPrice(Number(bet.price), point ?? 4, oddsDisplay, market)}
                                    color={selectedOdds.some(item => item.oddsId === bet.betId) ? 'primary' : 'default'}
                                    onClick={onClick(bet, params.row.eventId ?? '', firstOdds.baseLine ?? '', market)}
                                />
                            </Box>
                        )
                    })
                }
                {
                    oddsLength > 1 && (
                        <Typography
                            sx={{
                                color: '#0288D1',
                                textAlign: 'center',
                                lineHeight: '35px',
                                fontSize: '0.875rem',
                                cursor: 'pointer'
                            }}
                        >
                            {`(+${oddsLength - 1})`}
                        </Typography>
                    )
                }
            </Stack>
        );
    }

    return [
        {
            field: 'eventId',
            headerName: intl.formatMessage({id: `${funType}.eventID`, defaultMessage: 'Event ID'}),
            headerClassName: 'bold-header',
            width: 125,
            renderCell: (params) => renderWithDangerBall(intl, funType, params, handleCopyButtonClick)
        },
        {
            field: 'startTime',
            headerName: intl.formatMessage({id: `${funType}.eventStartTime`, defaultMessage: 'Event Start Time'}),
            headerClassName: 'bold-header',
            width: 175,
            valueGetter: getDateTimeDisplay
        },
        {
            field: 'leagueName',
            headerName: intl.formatMessage({id: `${funType}.league`, defaultMessage: 'League'}),
            headerClassName: 'bold-header',
            width: 175
        },
        {
            field: 'eventName',
            headerName: intl.formatMessage({id: `${funType}.event`, defaultMessage: 'Event'}),
            headerClassName: 'bold-header',
            width: 125,
            renderCell: (params) => renderWithCopyButton(intl, funType, params, handleCopyButtonClick)
        },
        {
            field: 'status',
            headerName: intl.formatMessage({id: `${funType}.eventStatus`, defaultMessage: 'Event Status'}),
            headerClassName: 'bold-header',
            width: 150,
            renderCell: renderMatchStatusDisplay
        },
        {
            field: 'OU',
            headerName: ouTitle,
            headerClassName: 'bold-header',
            minWidth: 400,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => renderOddsBaseLinePriceDisplay(params, ouMktName, configuration, toggle)
        },
        {
            field: 'AH',
            headerName: handicapTitle,
            headerClassName: 'bold-header',
            minWidth: 400,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => renderOddsBaseLinePriceDisplay(params, handicapMktName, configuration, toggle)
        },
        {
            field: isBasketball ? '12' : '1X2',
            headerName: oneXTwoTitle,
            headerClassName: 'bold-header',
            minWidth: 450,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => renderOddsBaseLinePriceDisplay(params, oneXTwoMktName, configuration, toggle)
        },
        {
            field: 'marketStatus',
            headerName: intl.formatMessage({ id: `${funType}.runningSuspendedHide`, defaultMessage: 'Running / Suspended / Hide' }),
            headerClassName: 'bold-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 220,
            sortable: false,
            renderCell: renderMarketStatusDisplay
        }
    ]
}

export const rowsPerPageOptions = [10, 15, 20, 30, 50];
export const checkboxSelection = false;
export const disableSelectionOnClick = true;
