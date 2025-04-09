import * as React from "react";
import {BetModel, ConfigurationModel, OddModel} from "@/services/@core/module/ResponseDataModels";
import {GridColDef, GridRenderCellParams} from "@mui/x-data-grid-pro";
import {Box, Stack, Typography} from "@mui/material";
import Chip from "@mui/material/Chip";
import {
    getFractionLineDisplay,
    getRuleNumber,
    transformedPrice
} from "@/modules/components/eventTable/EventDataConverter";
import IdentityHandler from "@/modules/common/IdentityHandler";
import {BetPartData} from "@/app/testPlaceBet/models/TestPlaceBetParameters";
import {EventType} from "@/services/@core/module/Enum";

export interface OddsLinePriceProps {
    eventId: string,
    baseLine: string,
    bet: BetModel
    marketType: string
}

export function otherLineColumns(
    targetCols: GridColDef[],
    selectedOdds: BetPartData[],
    eventType: string,
    sportType: string,
    configuration?: ConfigurationModel,
    toggle?: (props: OddsLinePriceProps) => void
): GridColDef[] {

    const isBasketball = sportType.toLowerCase() === 'basketball';
    const handicapMktName = isBasketball
        ? 'Point Spread'
        : eventType === EventType.inPlay
            ? 'Rest of Match Asian Handicap'
            : 'Asian Handicap';
    const underOverTitle = isBasketball ? 'Total Points Over / Under' : 'Total Goals Over / Under';

    const renderOddsBaseLinePriceDisplay = (
        params: GridRenderCellParams,
        marketType: string,
        configuration?: ConfigurationModel,
        oddsToggle?: (props: OddsLinePriceProps) => void
    ) => {
        const isHandicap = marketType.toLowerCase().includes(handicapMktName.toLowerCase());
        const lowerCaseMarket = isHandicap ? handicapMktName : marketType;
        const oddsData = params.row[lowerCaseMarket] as OddModel;
        if (!oddsData) return null;
        const isDangerBall = !!params.row.dangerBallState;
        const eventStatus = params.row.eventSuspendedStatus !== 'SUSPENDED' && params.row.eventSuspendedStatus !== 'CLOSE';
        const marketStauts = params.row.marketSuspendedStatus.some((item: string) => item.toLowerCase() === marketType.toLowerCase());
        const bets = oddsData.bets;
        const lineString = (eventType === EventType.inPlay) ? getFractionLineDisplay(oddsData.baseLine ?? '') : getFractionLineDisplay(oddsData.baseLine?.replace(/\s*\([^()]*\)/, '') ?? '');
        const {oddsDisplay} = IdentityHandler();

        const onClick = (bet: BetModel, eventId: string, baseLine: string, marketType: string) => () => {
            if (oddsToggle) {
                oddsToggle({eventId, baseLine, bet, marketType});
            }
        }

        return (
            <Stack key={params.row.id + marketType} direction={'row'} alignItems={'center'}>
                <Typography sx={{color: 'text.primary', marginRight: '0.5rem', textAlign: 'center', lineHeight: '35px', fontSize: '0.875rem'}}>
                    {lineString}
                </Typography>
                {
                    bets.map((bet, index) => {
                        const point = configuration ? getRuleNumber(Number(bet.price), configuration) : 4
                        const betStatus = bet.betStatus === 'CLOSED' || bet.betStatus === 'SUSPENDED';
                        return (
                            <Box key={bet.betId} flexDirection={'row'} display={'flex'} justifyContent={'center'} alignItems={'center'} p={0.5}>
                                <Chip
                                    sx={{width: '100px', height: '26px'}}
                                    disabled={isDangerBall || !eventStatus || marketStauts || betStatus}
                                    label={transformedPrice(Number(bet.price), point ?? 4, oddsDisplay, marketType)}
                                    color={selectedOdds.some(item => item.oddsId === bet.betId) ? 'primary' : 'default'}
                                    onClick={onClick(bet, params.row.eventId ?? '', oddsData.baseLine ?? '', marketType)}
                                />
                            </Box>
                        )
                    })
                }
            </Stack>
        )
    }


    return [
        {
            field: 'Under/Over',
            headerName: '',
            headerClassName: 'bold-header',
            minWidth: 400,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => renderOddsBaseLinePriceDisplay(params, underOverTitle, configuration, toggle)
        },
        {
            field: 'Asian Handicap',
            headerName: '',
            headerClassName: 'bold-header',
            minWidth: 400,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => renderOddsBaseLinePriceDisplay(params, handicapMktName, configuration, toggle)
        }
    ]
}