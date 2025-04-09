"use client";
import {GRID_CHECKBOX_SELECTION_COL_DEF, GridColDef} from '@mui/x-data-grid';
import {
    getDateTimeDisplay,
    getFractionLineDisplay,
    numbersDisplay
} from '@/modules/components/eventTable/EventDataConverter'
import '@/modules/components/eventTable/event.columns.css'
import BetSlipOptionField from "@/app/betSlip/components/BetSlipOptionField";
import AccountRiskField from "@/app/betSlip/components/AccountRiskField";
import * as React from "react";
import {
    AccountInfoModel,
    BetParticipantDataModel,
    BetPartModel,
    RiskModel,
    StatusPartModel
} from "@/services/@core/module/ResponseDataModels";
import {Box, Stack, Tooltip, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {ContentCopyRounded} from "@mui/icons-material";
import {moneyFormat} from "@/utils/tools";
import {BetResult, BetStatus, BetType, EventType} from "@/services/@core/module/Enum";
import {ParlayDetailProps} from "@/modules/components/parlayDetail/ParlayDetail";
import {
    firstCharToUpperCase,
    formatLocalTimeLongWithSeconds,
    formatLocalTimeShort,
    TimeFormat
} from "@/modules/common/DisplayFormatConverter";
import {MatchBetResultChip} from "@/modules/components/chip/MatchStatusChip";
import {RiskLevel} from "@/modules/components/buttons/riskButton/RiskButton";
import PermissionHandler from "@/modules/common/PermissionHandler";
import IdentityHandler from "@/modules/common/IdentityHandler";
import BetSlipStatus from "@/modules/components/betSlip/BetSlipStatus";
import {removeZeroZeroFromBaseLine} from "@/app/eventList/domain/useEventListViewModel";
import WithSeeMoreField from "@/app/betSlip/components/WithSeeMoreField";
import {IntlShape} from "react-intl";

export function processParticipantCards(participants: BetParticipantDataModel[]): {cardTypes: Set<string>; cardItems: Record<string, number[]>} {
    let cardTypes = new Set<string>();

    participants.forEach(participant => {
        if (participant.cards?.every(card => card.cardCount == null)) {
            participant.cards = [];
        } else {
            participant.cards?.forEach(card => {
                cardTypes.add(card.cardType);
            });
        }
    });

    const cardItems = Array.from(cardTypes).reduce((result: Record<string, number[]>, cardType) => {
        result[cardType] = participants.map(participant => {
            const card = participant.cards?.find(card => card.cardType === cardType);
            return card ? card.cardCount ?? 0 : 0;
        });

        return result;
    }, {});

    return {cardTypes, cardItems};
}


/**
 * The value of field will be used as the key for sortField.
 * */
export function columns(
    intl: IntlShape,
    funType: string,
    handleRiskButtonClick: (account: string, option: RiskLevel) => void,
    handleCopyButtonClick: (text: string) => void,
    handleParlayDetail: (props: ParlayDetailProps) => void,
    handleOptionClick: (betSlipId: string, betType: BetType, optionType: BetStatus) => void,
    riskMenuItems?: RiskLevel[]
): GridColDef[] {
    return [
        {
            field: 'betTime',
            headerName: intl.formatMessage({id: `${funType}.betTime`, defaultMessage: 'Bet Time'}),
            headerClassName: 'bold-header',
            minWidth: 165,
            valueGetter: (params) => getDateTimeDisplay(params, TimeFormat.LongWithSeconds)
        },
        {
            field: 'punterAccount',
            headerName: intl.formatMessage({id: `${funType}.accountOrIP`, defaultMessage: 'Account / IP'}),
            headerClassName: 'bold-header',
            minWidth: 155,
            renderCell: (params) => {
                const accountInfo = params.row['accountInfo'] as AccountInfoModel
                const risk: RiskModel = params.row['risk'] ??
                    {
                        riskId: '',
                        riskName: '',
                        riskColor: '#FFFFFF'
                    }
                return (
                    <AccountRiskField
                        userId={accountInfo.punterAccount}
                        riskName={risk.riskName} riskColor={risk.riskColor}
                        ipAddress={accountInfo.ipAddress}
                        menuItems={riskMenuItems}
                        onMenuClick={(option) => handleRiskButtonClick(accountInfo.punterAccount, option)}
                    />
                )
            }
        },
        {
            field: 'betType',
            headerName: intl.formatMessage({id: `${funType}.betTypeOrBetID`, defaultMessage: 'Betslip Type / Bet ID'}),
            headerClassName: 'bold-header',
            minWidth: 200,
            renderCell: (params) => {
                const betPart = params.row['betPart'] as BetPartModel
                const betSlipId = params.row['betSlipId'] as string
                const className =
                    typeof params.colDef.cellClassName === 'function'
                        ? params.colDef.cellClassName(params)
                        : params.colDef.cellClassName;
                return (
                    <Stack>
                        <Typography variant={'body2'} className={className}>{betPart.betType}</Typography>
                        <Stack direction="row" alignContent="start" alignItems="center">
                            <Typography variant={'body2'} className={className}>{betSlipId}</Typography>
                            <Tooltip arrow placement="top-start"
                                     title={intl.formatMessage({id: `${funType}.copy`, defaultMessage: 'Copy'})}
                            >
                                <IconButton
                                    sx={{fill: 'text.primary'}}
                                    onClick={() => handleCopyButtonClick(betSlipId)}
                                >
                                    <ContentCopyRounded/>
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Stack>
                )
            }
        },
        {
            field: 'sportName_marketName',
            headerName: intl.formatMessage({id: `${funType}.sportMarket`, defaultMessage: 'Sport / Market'}),
            headerClassName: 'bold-header',
            width: 200,
            sortable: false,
            renderHeader: () => (
                <div className="MuiDataGrid-columnHeaderTitle">
                    { intl.formatMessage({id: `${funType}.sport`, defaultMessage: 'Sport'}) }
                    &nbsp;/&nbsp;
                    { intl.formatMessage({id: `${funType}.market`, defaultMessage: 'Market'}) }
                </div>

            ),
            renderCell: (params) => {
                const betSlipId = params.row['betSlipId'] as string
                const accountInfo = params.row['accountInfo'] as AccountInfoModel
                const betPart = params.row['betPart'] as BetPartModel
                const legs = betPart.legs
                const betType = betPart.betType
                const sports = Array.from(new Set(legs.map(leg => leg.sportName)))
                const markets = Array.from(legs.map(leg => leg.marketName))
                return (
                    <Box>
                        <WithSeeMoreField
                            data={sports}
                            displayType={'plus-number'}
                            limitItem={1}
                            computedWidth={params.colDef.computedWidth}
                        />
                        <WithSeeMoreField
                            data={markets}
                            displayType={'leg'}
                            limitItem={1}
                            computedWidth={params.colDef.computedWidth}
                            countIncludeDisplayItems={betType.toUpperCase() === BetType.PARLAY}
                            onClick={() =>
                                handleParlayDetail({
                                    parlayId: betSlipId,
                                    betAmount: betPart.betAmount,
                                    legs: legs,
                                    device: accountInfo.device,
                                    maxPayout: betPart.maxPayout
                                })
                            }
                        />
                    </Box>
                )
            }
        },
        {
            field: 'leagueName_eventName',
            headerName: intl.formatMessage({id: `${funType}.leagueEvent`, defaultMessage: 'League / Event'}),
            headerClassName: 'bold-header',
            width: 280,
            sortable: false,
            renderHeader: () => (
                <div className="MuiDataGrid-columnHeaderTitle">
                    { intl.formatMessage({id: `${funType}.league`, defaultMessage: 'League'}) }
                    &nbsp;/&nbsp;
                    { intl.formatMessage({id: `${funType}.event`, defaultMessage: 'Event'}) }
                </div>

            ),
            renderCell: (params) => {
                const betPart = params.row['betPart'] as BetPartModel
                const legs = betPart.legs
                const data = legs.map(leg => {
                    const home = leg.participants?.find(participant => participant.isHome)
                    const away = leg.participants?.find(participant => !participant.isHome)
                    const line = getFractionLineDisplay(removeZeroZeroFromBaseLine(leg.line) ?? leg.line)
                    const participants = leg.participants ?? []
                    const {cardTypes, cardItems} = processParticipantCards(participants) ?? {}

                    return (
                        <Stack key={leg.id}>
                            <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
                                <Typography
                                    variant={'body2'}
                                    sx={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: 'inline-block',
                                        color: 'primary.main'
                                    }}
                                >
                                    {leg.eventId}
                                </Typography>
                                <Typography
                                    variant={'body2'}
                                    sx={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: 'inline-block',
                                    }}
                                >
                                    {leg.leagueName}
                                </Typography>
                            </Stack>
                            <Typography
                                variant={'body2'}
                                sx={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: 'inline-block',
                                }}
                            >
                                {home?.name}&nbsp;
                                {leg.eventType === EventType.inPlay ? `(${home?.score}:${away?.score})` : 'vs' }&nbsp;
                                {away?.name}
                            </Typography>
                            <Stack direction={'row'} alignItems={'center'}>
                                <Typography variant={'body2'}
                                            sx={{color: '#136C13', fontWeight: 600}}>
                                    {leg.betName}&nbsp;{line}
                                </Typography>
                                &nbsp;@&nbsp;
                                <Typography variant={'body2'}
                                            sx={{color: '#C41C1C', fontWeight: 600}}>
                                    {leg.odds}
                                </Typography>
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'start'}>
                                {(home?.corners && away?.corners) && numbersDisplay([home.corners, away.corners], 'CornerKick')}
                                {cardTypes.size > 0 && Object.keys(cardItems).map(cardType => numbersDisplay(cardItems[cardType], cardType))}
                            </Stack>
                        </Stack>
                    )
                })
                return (
                    <WithSeeMoreField
                        data={data}
                        displayType={'plus-number'}
                        limitItem={1}
                        computedWidth={params.colDef.computedWidth}
                    />
                )
            }
        },
        {
            field: 'eventTime',
            headerName: intl.formatMessage({id: `${funType}.eventStartTime`, defaultMessage: 'Event Time'}),
            headerClassName: 'bold-header',
            minWidth: 180,
            renderCell: (params) => {
                const betPart = params.row['betPart'] as BetPartModel
                const legs = betPart.legs
                return (
                    <WithSeeMoreField
                        data={legs.map(leg => formatLocalTimeShort(leg.eventTime))}
                        displayType={'plus-number'}
                        limitItem={1}
                        computedWidth={params.colDef.computedWidth}
                    />
                )
            },
            valueGetter: (params) => getDateTimeDisplay(params, TimeFormat.Short)
        },
        {
            field: 'betAmount',
            headerName: intl.formatMessage({id: `${funType}.betAmount`, defaultMessage: 'Bet Amount'}),
            headerClassName: 'bold-header',
            minWidth: 120,
            renderCell: (params) => {
                const betPart = params.row['betPart'] as BetPartModel
                const className =
                    typeof params.colDef.cellClassName === 'function'
                        ? params.colDef.cellClassName(params)
                        : params.colDef.cellClassName;
                return (
                    <Typography variant={'body2'} className={className}>
                        $ {moneyFormat(betPart.betAmount, 2)}
                    </Typography>
                )
            }
        },
        {
            field: 'maxPayout',
            headerName: intl.formatMessage({id: `${funType}.maximumPayout`, defaultMessage: 'Maximum Payout'}),
            headerClassName: 'bold-header',
            minWidth: 145,
            renderCell: (params) => {
                const betPart = params.row['betPart'] as BetPartModel
                const className =
                    typeof params.colDef.cellClassName === 'function'
                        ? params.colDef.cellClassName(params)
                        : params.colDef.cellClassName;
                return (
                    <Typography variant={'body2'} className={className}>
                        $ {moneyFormat(betPart.maxPayout, 2)}
                    </Typography>
                )
            }
        },
        {
            field: 'payout',
            headerName: intl.formatMessage({id: `${funType}.payout`, defaultMessage: 'Payout'}),
            headerClassName: 'bold-header',
            minWidth: 145,
            renderCell: (params) => {
                const betPart = params.row['betPart'] as BetPartModel
                const className =
                    typeof params.colDef.cellClassName === 'function'
                        ? params.colDef.cellClassName(params)
                        : params.colDef.cellClassName;
                return (
                    <Typography variant={'body2'} className={className}>
                        $ {moneyFormat(betPart.payout, 2)}
                    </Typography>
                )
            }
        },
        {
            field: 'device',
            headerName: intl.formatMessage({id: `${funType}.device`, defaultMessage: 'Device'}),
            headerClassName: 'bold-header',
            minWidth: 95,
            renderCell: (params) => {
                const accountInfo = params.row['accountInfo'] as AccountInfoModel
                const className =
                    typeof params.colDef.cellClassName === 'function'
                        ? params.colDef.cellClassName(params)
                        : params.colDef.cellClassName;
                return (
                    <Typography variant={'body2'} className={className}>{accountInfo.device}</Typography>
                )
            }
        },
        {
            field: 'providerName',
            headerName: intl.formatMessage({
                id: `${funType}.oddsFeed`, defaultMessage: 'Odds Feed'
            }),
            headerClassName: 'bold-header',
            minWidth: 140,
            renderCell: (params) => {
                const betPart = params.row['betPart'] as BetPartModel
                const legs = betPart.legs
                const data = Array.from(new Set(legs.map(leg => leg.providerName)));
                return (
                    <WithSeeMoreField
                        data={data}
                        displayType={'plus-number'}
                        limitItem={1}
                        computedWidth={params.colDef.computedWidth}
                    />
                )
            }
        },
        {
            field: 'eventType',
            headerName: intl.formatMessage({id: `${funType}.bettingType`, defaultMessage: 'Betting Type'}),
            headerClassName: 'bold-header',
            minWidth: 120,
            renderCell: (params) => {
                const betPart = params.row['betPart'] as BetPartModel
                const legs = betPart.legs
                const data = Array.from(new Set(legs.map(leg => leg.eventType)));
                return (
                    <WithSeeMoreField
                        data={data}
                        displayType={'plus-number'}
                        limitItem={1}
                        computedWidth={params.colDef.computedWidth}
                    />
                )
            }
        },
        {
            field: 'status',
            headerName: intl.formatMessage({id: `${funType}.status`, defaultMessage: 'Status'}),
            headerClassName: 'bold-header',
            minWidth: 165,
            renderCell: (params) => {
                const statusPart = params.row['statusPart'] as StatusPartModel
                return <BetSlipStatus statusPart={statusPart}/>
            }
        },
        {
            field: 'eventStatus',
            headerName: intl.formatMessage({id: `${funType}.eventStatus`, defaultMessage: 'Event Status'}),
            headerClassName: 'bold-header',
            minWidth: 165,
            renderCell: (params) => {
                const betPart = params.row['betPart'] as BetPartModel
                const legs = betPart.legs
                const data = Array.from(new Set(legs.map(leg => leg.eventStatus)));
                return (
                    <WithSeeMoreField
                        data={data}
                        layoutType={'chip'}
                        displayType={'plus-number'}
                        limitItem={1}
                        computedWidth={params.colDef.computedWidth}
                    />
                )
            }
        },
        {
            field: 'settlement',
            headerName: intl.formatMessage({id: `${funType}.betSlipStatus`, defaultMessage: 'Bet Slip Status'}),
            headerClassName: 'bold-header',
            minWidth: 140,
            renderCell: (params) => {
                const statusPart = params.row['statusPart'] as StatusPartModel
                const className =
                    typeof params.colDef.cellClassName === 'function'
                        ? params.colDef.cellClassName(params)
                        : params.colDef.cellClassName;
                return (
                    <Typography variant={'body2'}
                                className={className}>{firstCharToUpperCase(statusPart.settlement) ?? '-'}</Typography>
                )
            }

        },
        {
            field: 'result',
            headerName: intl.formatMessage({id: `${funType}.result`, defaultMessage: 'Result'}),
            headerClassName: 'bold-header',
            minWidth: 120,
            renderCell: (params) => {
                const statusPart = params.row['statusPart'] as StatusPartModel
                const className =
                    typeof params.colDef.cellClassName === 'function'
                        ? params.colDef.cellClassName(params)
                        : params.colDef.cellClassName;
                return (
                    <>
                        {
                            statusPart.result
                                ? <MatchBetResultChip status={statusPart.result as BetResult}/>
                                : <Typography variant={'body2'} className={className}>-</Typography>
                        }
                    </>
                )
            }
        },
        {
            field: 'finalScore',
            headerName: intl.formatMessage({id: `${funType}.finalScore`, defaultMessage: 'Final Score'}),
            headerClassName: 'bold-header',
            minWidth: 220,
            renderCell: (params) => {
                const betPart = params.row['betPart'] as BetPartModel
                const legs = betPart.legs
                const data = legs.map(leg => {
                    const scoreResults = leg.betResults?.filter(betResult => betResult.name === 'SCORE') ?? [];
                    const homeFinalScoreAtPlacedMarket = scoreResults.find(result => result.position === 1)?.finalScore ?? '--';
                    const awayFinalScoreAtPlacedMarket = scoreResults.find(result => result.position === 2)?.finalScore ?? '--';
                    return `${homeFinalScoreAtPlacedMarket} : ${awayFinalScoreAtPlacedMarket}`
                })
                return (
                    <WithSeeMoreField data={data}
                                      limitItem={1}
                                      displayType={'plus-number'}
                                      computedWidth={params.colDef.computedWidth}
                    />
                )
            }
        },
        {
            field: 'operator',
            headerName: intl.formatMessage({id: `${funType}.operator`, defaultMessage: 'Operator'}),
            headerClassName: 'bold-header',
            minWidth: 160,
            renderCell: (params) => {
                const operator = params.row.operator ?? '-'
                const operatorTime = params.row.operatorTime ? formatLocalTimeLongWithSeconds(params.row.operatorTime) : '-'
                const className =
                    typeof params.colDef.cellClassName === 'function'
                        ? params.colDef.cellClassName(params)
                        : params.colDef.cellClassName;
                return (
                    <Typography variant={'body2'}
                                className={className}
                                component={'span'}
                                sx={{whiteSpace: 'pre-line'}}
                    >
                        {`${operator} \n ${operatorTime}`}
                    </Typography>
                )
            }

        },
        {
            field: 'option',
            headerName: intl.formatMessage({id: `${funType}.option`, defaultMessage: 'Option'}),
            headerClassName: 'bold-header',
            sortable: false,
            minWidth: 215,
            renderCell: (params) => {
                const betSlipId = params.row['betSlipId'] as string
                const betPart = params.row['betPart'] as BetPartModel
                const statusPart = params.row['statusPart'] as StatusPartModel

                const {isEditable: checkEdit} = PermissionHandler()
                const {userRole, currentPathName} = IdentityHandler();
                const isEditable = checkEdit(userRole, currentPathName || '');

                return (
                    <BetSlipOptionField
                        enableAccept={isEditable && statusPart.status === BetStatus.PENDING}
                        enableDelete={isEditable && statusPart.status !== BetStatus.VOID}
                        enableReject={isEditable && (statusPart.status === BetStatus.PENDING || statusPart.status === BetStatus.ACCEPTED)}
                        onClick={(status) => handleOptionClick(betSlipId, betPart.betType as BetType, status)}
                    />
                )
            }
        },
    ]
}

export const pinColumns = {
    left: [
        GRID_CHECKBOX_SELECTION_COL_DEF.field,
        'betTime',
        'punterAccount'
    ],
    right: []
}
export const rowsPerPageOptions = [10, 15, 20, 30, 50]; // Options to define the number of row to display on table.
export const disableSelectionOnClick = true; // To enable/disable selection when click on row.

