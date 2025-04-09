import {
    CancelRounded,
    ExpandMoreRounded,
    PauseRounded,
    PlayCircleRounded,
    ReportProblemRounded,
    StopCircleRounded,
    ThumbUpAltRounded
} from "@mui/icons-material";
import {Accordion, AccordionDetails, AccordionSummary, Grid, Stack, Tooltip, Typography} from "@mui/material";
import {ConfigurationModel, OddModel} from "@/services/@core/module/ResponseDataModels";
import React, {useEffect, useState} from "react";
import {NumberModifier} from "@/modules/components/NumberModifier/NumberModifier";
import ProgressBar from "@/modules/components/progressBar/ProgressBar";
import {IntlShape, useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {
    displayStrongOddLine,
    getIncrementByRuleNumber,
    getRuleNumber,
    sortedOddBets
} from "@/modules/components/eventTable/EventDataConverter";
import {getMarketStatusBgColor, getMarketStatusDarkBgColor} from "@/app/eventDetail/models/EventDetailUtils";
import {defaultBetSlipsModel} from "@/services/@core/module/DefaultResponseData";
import {EventMarketStatus, Functionality} from "@/services/@core/module/Enum";
import lodash from "lodash";
import {lineStatus} from "@/services/@event/useCase";

export interface MarketLineContainerProps {
    defaultExpanded?: boolean
    stopExpandedChange?: boolean
    eventId: string
    marketType: string
    marketName: string
    marketId: string
    marketStatus?: string | null
    eventStatus?: string | null
    provider: string
    odds: OddModel[]
    displayType?: string
    configuration?: ConfigurationModel
    onMarketStatusChange?: (eventId: string, marketId: string, providers: string[], status: string) => void
    onOddPriceChanged?: (betId: string, price: number, originalPrice: number) => void
    onDataSelected?: (eventId: string, marketId: string, marketName: string) => void;
    homeParticipantEnName: string
    awayParticipantEnName: string
}

const MostBalanceComment = ({intl, funcType}: { intl: IntlShape, funcType: string }) => (
    <Tooltip arrow placement={'top'}
             title={intl.formatMessage({
                 id: `${funcType}.mostBalanceLine`,
                 defaultMessage: 'Most Balance Line'
             })}>
        <ThumbUpAltRounded sx={{
            width: '1.2rem', height: '1.2rem',
            color: '#EF6C00'
        }}/>
    </Tooltip>
)

const MarketLineContainer = ({
                                 defaultExpanded = true, stopExpandedChange = false, eventId, marketName, marketId,
                                 marketStatus, eventStatus, provider, odds, displayType = 'Decimal', configuration,
                                 onMarketStatusChange, onOddPriceChanged, onDataSelected, homeParticipantEnName,
                                 awayParticipantEnName, marketType
                             }: MarketLineContainerProps) => {
    const intl = useIntl();
    const funcType = LocalizationFunctionType.Event;
    const [expanded, setExpanded] = useState(defaultExpanded);
    const [skipAnimation, setSkipAnimation] = useState(false)
    const isBetsBO = process.env.FUNCTIONALITY === Functionality.Bets

    const isActive = (status?: string | null) => {
        return status !== EventMarketStatus.SUSPENDED && status !== EventMarketStatus.CLOSE
    }
    const [marketActive, setMarketActive] = useState(true)

    const handleActiveChange = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, status: string) => {
        e.stopPropagation();
        onMarketStatusChange && onMarketStatusChange(eventId, marketId, [provider], status);
    }

    const handleAccordionChange = () => {
        if (!stopExpandedChange) {
            setExpanded((prev) => !prev);
        }
    };

    const onClickBetSlipProgress = () => {
        onDataSelected && onDataSelected(eventId, marketId, marketName);
    }

    useEffect(() => {
        const id = setTimeout(() => {
            setSkipAnimation(true);
        }, 1000)
        return () => clearTimeout(id)
    }, []);

    useEffect(() => {
        setMarketActive(isActive(marketStatus))
    }, [marketStatus]);

    return (
        <Accordion defaultExpanded={defaultExpanded} expanded={expanded} onChange={handleAccordionChange}
                   sx={{
                       boxShadow: 'none',
                       '& .MuiAccordionSummary-root': {
                           cursor: stopExpandedChange ? 'default' : 'pointer',
                           '&:hover': {
                               cursor: stopExpandedChange ? 'default' : 'pointer',
                           },
                           backgroundColor: '#F0F4F8',
                           '[data-mui-color-scheme="dark"] &': {
                               backgroundColor: '#0a1625',
                           },
                       },
                   }}
        >
            <AccordionSummary
                expandIcon={!stopExpandedChange ? <ExpandMoreRounded/> : undefined}
                sx={{borderTop: 'none'}}
            >
                <Stack direction={'row'} spacing={1}>
                    {
                        marketActive ? <PlayCircleRounded sx={{cursor: 'default', color: '#51BC51'}}/> :
                            marketStatus === 'CLOSE' ? <CancelRounded sx={{cursor: 'default', color: '#00000061 '}}/> :
                                <ReportProblemRounded sx={{cursor: 'default', color: '#EA9A3E'}}/>
                    }
                    <Typography color={'text.primary'} variant={'h5'}>{marketName}</Typography>
                    {
                        marketStatus !== 'SUSPENDED' ?
                            <Tooltip
                                title={intl.formatMessage({
                                    id: `${funcType}.suspendedMarket`,
                                    defaultMessage: 'Suspended Market'
                                })}
                                arrow placement="top-end">
                                <PauseRounded
                                    sx={{
                                        cursor: marketActive ? 'pointer' : 'default',
                                        color: '#636B74',
                                        opacity: marketActive ? 1 : 0.38
                                    }}
                                    onClick={(e) => {
                                        if (marketActive)
                                            handleActiveChange(e, 'SUSPENDED')
                                    }}
                                />
                            </Tooltip> :
                            <Tooltip
                                title={intl.formatMessage({
                                    id: `${funcType}.activeMarket`,
                                    defaultMessage: 'Active Market'
                                })}
                                arrow placement="top-start">
                                <PlayCircleRounded
                                    sx={{cursor: 'pointer', color: '#51BC51'}}
                                    onClick={(e) =>
                                        handleActiveChange(e, 'ACTIVE')}
                                />
                            </Tooltip>
                    }
                    {marketStatus !== 'CLOSE' ?
                        <Tooltip
                            title={intl.formatMessage({
                                id: `${funcType}.closeMarket`,
                                defaultMessage: 'Close Market'
                            })}
                            arrow placement="top-start">
                            <StopCircleRounded
                                sx={{cursor: 'pointer', color: '#FF4724'}}
                                onClick={(e) =>
                                    handleActiveChange(e, 'CLOSE')}
                            />
                        </Tooltip> :
                        <Tooltip
                            title={intl.formatMessage({
                                id: `${funcType}.activeMarket`,
                                defaultMessage: 'Active Market'
                            })}
                            arrow placement="top-start">
                            <PlayCircleRounded
                                sx={{cursor: 'pointer', color: '#51BC51'}}
                                onClick={(e) =>
                                    handleActiveChange(e, 'ACTIVE')}
                            />
                        </Tooltip>
                    }
                </Stack>
            </AccordionSummary>
            {
                odds.map((odd) => {
                    const sortedBets = sortedOddBets(odd, marketType, homeParticipantEnName, awayParticipantEnName);
                    const status = lineStatus(sortedBets, odd.oddsSuspendedStatus, marketStatus, eventStatus);
                    return <AccordionDetails key={`${odd.marketId}-${odd.baseLine}`} sx={{
                        border: '1px solid #0000001F',
                        backgroundColor: getMarketStatusBgColor(status),
                        '[data-mui-color-scheme="dark"] &': {
                            border: '1px solid #636B7450',
                            backgroundColor: getMarketStatusDarkBgColor(status)
                        }
                    }}>
                        <Grid container spacing={2}>
                            {
                                sortedBets.map((bet, index) => {
                                    const point = getRuleNumber(Number(bet.price), configuration) ?? 4;
                                    const quantity = getIncrementByRuleNumber(point, configuration);
                                    const viewOnly = isBetsBO || bet.betStatus === 'CLOSED'

                                    const base = displayStrongOddLine(
                                        marketType,
                                        sortedBets,
                                        odd.baseLine ?? '',
                                        bet.line,
                                        bet.betName,
                                        bet.price,
                                        homeParticipantEnName,
                                        index
                                    );
                                    return (
                                        <React.Fragment key={`${bet.betId}-${bet.line}`}>
                                            <Grid item xs={1.8} sx={{my: '0.5rem'}}>
                                                <Typography color={'text.primary'} variant={'body2'}>
                                                    {bet.betName}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={1.2} sx={{my: '0.5rem'}}>
                                                <Stack direction="row" spacing={0.5}>
                                                    <Typography color="text.primary" variant="body2">
                                                        {base}
                                                    </Typography>
                                                    {base && odd.isMostBalance && (
                                                        <MostBalanceComment intl={intl} funcType={funcType}/>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={5} md={4}>
                                                <NumberModifier
                                                    key={index + bet.betId}
                                                    point={point}
                                                    quantity={quantity}
                                                    status={bet.betStatus}
                                                    displayType={displayType}
                                                    value={bet.price}
                                                    onValueChange={(value) => onOddPriceChanged && onOddPriceChanged(bet.betId, value, bet.price)}
                                                    viewOnly={viewOnly || bet.betStatus === 'CLOSED'}
                                                    originalPrice={bet.originalPrice}
                                                    adjustedNumber={bet.adjustedNumber}
                                                    market={marketType}
                                                />
                                            </Grid>
                                            <Grid item xs={4} md={5}>
                                                <ProgressBar
                                                    key={index + bet.betId}
                                                    layout={'horizontal'}
                                                    padding={'0px'}
                                                    data={bet.betSlips ?? defaultBetSlipsModel}
                                                    skipAnimation={skipAnimation}
                                                    onItemClick={() => onClickBetSlipProgress()}
                                                />
                                            </Grid>
                                        </React.Fragment>
                                    )
                                })
                            }
                        </Grid>
                    </AccordionDetails>
                })
            }
        </Accordion>
    );
}

export default React.memo(MarketLineContainer, (prevProps, nextProps) => (
    lodash.isEqual(
        lodash.omit(prevProps, ['onMarketStatusChange', 'onOddPriceChanged', 'onDataSelected']),
        lodash.omit(nextProps, ['onMarketStatusChange', 'onOddPriceChanged', 'onDataSelected'])
    ))
)