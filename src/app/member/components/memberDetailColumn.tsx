import {GridColDef} from '@mui/x-data-grid';
import '@/modules/components/eventTable/event.columns.css';
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {
    AccountInfoModel,
    BetPartModel,
    RiskMembersBetSlipsBetPartModel,
    StatusPartModel
} from "@/services/@core/module/ResponseDataModels";
import {Box, Stack, Tooltip, Typography} from "@mui/material";
import {BetResult, BetType} from "@/services/@core/module/Enum";
import {ContentCopyRounded} from "@mui/icons-material";
import * as React from "react";
import BetSlipStatus from "@/modules/components/betSlip/BetSlipStatus";
import {getDateTimeDisplay} from "@/modules/components/eventTable/EventDataConverter";
import {firstCharToUpperCase, TimeFormat} from "@/modules/common/DisplayFormatConverter";
import IconButton from "@mui/material/IconButton";
import WithSeeMoreField from "@/app/betSlip/components/WithSeeMoreField";
import {ParlayDetailProps} from "@/modules/components/parlayDetail/ParlayDetail";
import {toMoneyFormat} from "@/utils/tools";
import {MatchBetResultChip} from "@/modules/components/chip/MatchStatusChip";

const funType = `${LocalizationFunctionType.Member}.detail`
const funCommonType = LocalizationFunctionType.Common

export const MemberListColumns = (
    handleCopyButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, text: string) => void,
    handleParlayDetail: (props: ParlayDetailProps) => void,
): GridColDef[] => {
    const intl = useIntl();
    return [
        {
            field: 'betTime',
            headerName: intl.formatMessage({id: `${funCommonType}.betTime`, defaultMessage: 'Bet Time'}),
            headerClassName: 'bold-header',
            minWidth: 135,
            valueGetter: (params) => getDateTimeDisplay(params, TimeFormat.ShortWithSecondsDM)
        },
        {
            field: 'betSlipId',
            headerName: intl.formatMessage({
                id: `${funCommonType}.betTypeOrBetID`,
                defaultMessage: 'Bet Type / Bet ID'
            }),
            headerClassName: 'bold-header',
            minWidth: 160,
            renderCell: (params) => {
                const betType = params.row['betPart'].betType
                const textValue = params.value as string
                return <Stack>
                    <Typography>{betType}</Typography>
                    <Stack direction="row" alignItems="center">
                        <Box sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: 'inline-block',
                        }}>
                            {textValue}
                        </Box>
                        <Tooltip arrow placement="top-start"
                                 title={intl.formatMessage({id: `${funCommonType}.copy`, defaultMessage: 'Copy'})}
                        >
                            <IconButton
                                sx={{fill: 'text.primary'}}
                                onClick={(event) => {
                                    handleCopyButtonClick(event, textValue)
                                }}
                            >
                                <ContentCopyRounded/>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>
            }
        },
        {
            field: 'leagues',
            headerName: intl.formatMessage({id: `${funCommonType}.league`, defaultMessage: 'League'}),
            headerClassName: 'bold-header',
            minWidth: 165,
            renderCell: (params) => {
                const betPart = params.row['betPart'] as BetPartModel
                const legs = betPart.legs
                const leagues = Array.from(new Set(legs.map(leg => leg.leagueName)))
                return (
                    <WithSeeMoreField
                        data={leagues}
                        displayType={'plus-number'}
                        limitItem={1}
                        computedWidth={params.colDef.computedWidth}
                    />
                )
            }
        },
        {
            field: 'events', //betPart.legs.map(leg => leg.eventName)
            headerName: intl.formatMessage({id: `${funCommonType}.events`, defaultMessage: 'Event'}),
            headerClassName: 'bold-header',
            minWidth: 165,
            renderCell: (params) => {
                const betSlipId = params.row['betSlipId'] as string
                const accountInfo = params.row['accountInfo'] as AccountInfoModel
                const betPart = params.row['betPart'] as RiskMembersBetSlipsBetPartModel
                const legs = betPart.legs
                const betType = betPart.betType
                return <WithSeeMoreField
                    hideSeeMoreButtonOnHover={true}
                    data={legs.map(leg => leg.eventName)}
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
            }
        },
        {
            field: 'markets',
            headerName: intl.formatMessage({id: `${funCommonType}.market`, defaultMessage: 'Market'}),
            headerClassName: 'bold-header',
            minWidth: 180,
            renderCell: (params) => {
                const betSlipId = params.row['betSlipId'] as string
                const accountInfo = params.row['accountInfo'] as AccountInfoModel
                const betPart = params.row['betPart'] as RiskMembersBetSlipsBetPartModel
                const betType = betPart.betType
                const legs = betPart.legs
                const markets = legs.map(leg =>
                    <React.Fragment key={`leg-market-${leg.id}`}>
                        {leg.marketName}<br/>
                        <span style={{color: '#136C13', fontWeight: 600}}>{leg.betName} {leg.line}</span>
                        {' '}@{' '}<span style={{color: '#C41C1C', fontWeight: 600}}>{leg.odds}</span>
                    </React.Fragment>
                )
                return <WithSeeMoreField
                    hideSeeMoreButtonOnHover={true}
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
            }
        },
        {
            field: 'betAmount',
            headerName: intl.formatMessage({id: `${funCommonType}.amount`, defaultMessage: 'Amount'}),
            headerClassName: 'bold-header',
            minWidth: 130,
            valueGetter: (params) => {
                const betPart = params.row['betPart'] as RiskMembersBetSlipsBetPartModel
                return toMoneyFormat(betPart.betAmount)
            }
        },
        {
            field: 'maxPayout',
            headerName: intl.formatMessage({id: `${funCommonType}.maximumPayout`, defaultMessage: 'Maximum Payout'}),
            headerClassName: 'bold-header',
            minWidth: 140,
            valueGetter: (params) => {
                const betPart = params.row['betPart'] as RiskMembersBetSlipsBetPartModel
                return toMoneyFormat(betPart.maxPayout)
            }
        },
        {
            field: 'statusPart.status',
            headerName: intl.formatMessage({id: `${funCommonType}.status`, defaultMessage: 'Status'}),
            headerClassName: 'bold-header',
            minWidth: 145,
            renderCell: (params) => {
                const statusPart = params.row['statusPart'] as StatusPartModel
                return <BetSlipStatus statusPart={statusPart}/>
            }
        },
        {
            field: 'statusPart.settlement',
            headerName: intl.formatMessage({id: `${funCommonType}.betSlipStatus`, defaultMessage: 'Bet Slip Status'}),
            headerClassName: 'bold-header',
            minWidth: 120,
            renderCell: (params) => {
                const statusPart = params.row['statusPart'] as StatusPartModel
                return (
                    <Typography variant={'body2'} color={'text.primary'}>
                        {firstCharToUpperCase(statusPart.settlement) ?? '-'}
                    </Typography>
                )
            }
        },
        {
            field: 'statusPart.result',
            headerName: intl.formatMessage({id: `${funCommonType}.result`, defaultMessage: 'Result'}),
            headerClassName: 'bold-header',
            minWidth: 120,
            renderCell: (params) => {
                const statusPart = params.row['statusPart'] as StatusPartModel
                return <>
                        {
                            statusPart.result
                                ? <MatchBetResultChip status={statusPart.result as BetResult}/>
                                : <Typography variant={'body2'} color={'text.primary'}>-</Typography>
                        }
                    </>
            }
        },
        {
            field: 'accountInfo',
            headerName: intl.formatMessage({id: `${funType}.deviceIP`, defaultMessage: 'Device/ IP'}),
            headerClassName: 'bold-header',
            minWidth: 214,
            renderCell: (params) => {
                const accountInfo = params.value as AccountInfoModel
                return <Stack>
                    <Typography>{accountInfo.device}</Typography>
                    <Typography style={{opacity: 0.6}} >{accountInfo.ipAddress}</Typography>
                </Stack>
            }
        },
    ]
}

export const rowsPerPageOptions = [10, 15, 20, 30, 50];
export const checkboxSelection = false;
export const disableSelectionOnClick = true;