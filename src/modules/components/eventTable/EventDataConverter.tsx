"use client";
import {GridCellParams, GridRenderCellParams} from '@mui/x-data-grid';
import './event.columns.css'
import CommonOddsChips, {OddsChipDataModel} from "@/modules/components/eventTable/CommonOddsChips";
import {Avatar, Box, Button, Grid, Stack, Tooltip, Typography} from "@mui/material";
import {
    MatchChannelStatusChip,
    MatchMemberStatusChip,
    MatchStatusChip,
    MatchVendorStatusChip
} from "@/modules/components/chip/MatchStatusChip";
import {
    OddsBaseLinePrice,
    OddsBaseLinePriceWithApplyTemplate
} from "@/modules/components/NumberModifier/OddsBaseLinePrice";
import {
    formatLocalTimeLong,
    formatLocalTimeLongWithSeconds,
    formatLocalTimeShort,
    formatLocalTimeShortWithSeconds,
    formatLocalTimeShortWithSecondsDM,
    TimeFormat
} from "@/modules/common/DisplayFormatConverter";
import {
    ApplyTemplate,
    BetModel,
    BetSlipsModel,
    ConfigurationModel,
    MarketStatusModel,
    OddDataModel,
    OddModel,
    ParticipantDataModel
} from "@/services/@core/module/ResponseDataModels";
import {oddsFormat} from "@/utils/OddsFormat";
import {
    BetSlipEventType,
    ChannelStatus, ExtraScoreType,
    MarketLineStatus,
    MemberStatus,
    VendorStatus
} from "@/services/@core/module/Enum";
import ProgressBar from "@/modules/components/progressBar/ProgressBar";
import {DangerBall, DangerBallType} from "@/modules/components/IconBall/DangerBall";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import {ContentCopyRounded, FlagCircleRounded} from "@mui/icons-material";
import {complementZero} from "@/modules/components/NumberModifier/NumberModifier";
import {IntlShape} from "react-intl";
import SeeMoreButton from "@/modules/components/buttons/textButton/SeeMoreButton";
import {RightDrawerProps} from "@/modules/components/drawer/RightDrawer";
import TimelineDrawerContent from "@/app/eventList/components/pageComponent/TimelineDrawerContent";
import {EventPeriodName, lineStatus} from "@/services/@event/useCase";
import RunningTimer from "@/modules/components/eventTable/RunningTimer";
import isEqual from "lodash/isEqual";

export const numbersDisplay = (numbers: number[], img: string) => {
    return (
        <Stack key={img} direction={'row'} spacing={0.5} alignItems={'center'}>
            <Box
                component="img"
                alt={img}
                sx={{width: '22px', height: '22px'}}
                src={`/${img}.svg`}
            />
            <Typography variant={'inherit'}>{`${numbers[0]}:${numbers[1]}`}</Typography>
        </Stack>
    )
}

export const renderOddsDisplay = (params: GridRenderCellParams, market: string, displayType: string = 'Decimal') => {
    const oddsData = params.row['oddsData'] as OddDataModel[]
    const displayOdds = oddsData.find(item => item.marketName == market)

    //TODO: Need a rule to determine the main line in the odds, currently is used the first one to display.
    const mainline = displayOdds?.odds?.at(0);

    const line = mainline?.baseLine;
    const chipsData = mainline?.bets.map((bet, index) => {
        //TODO: need an algorithm designed to determine whether the odds have been updated to a higher or lower value

        const data: OddsChipDataModel = {
            index: index,
            className: 'default', // temporarily use default values until the algorithm is completed.
            label: `${oddsFormat(bet.price ?? '', displayType)}`,
            clickable: false
        }

        return data;
    }) || [];

    return (
        <Stack direction={"row"} spacing={1} justifyContent="center" alignItems="center">
            <Box>
                {market.toLowerCase() != '1x2' && oddsFormat(line ?? '', displayType)}
            </Box>
            <CommonOddsChips chipsData={chipsData}/>
        </Stack>
    )
}
export const getFixtureDisplay = (params: GridCellParams) => {
    const eventName = params.row['eventName'] as string;
    return `${eventName || 'Home v.s. Away'}`;
}

export const getDateTimeDisplay = (params: GridCellParams, format: TimeFormat = TimeFormat.Short) => {
    if (params.value) {
        switch (format) {
            case TimeFormat.LongWithSeconds: {
                return formatLocalTimeLongWithSeconds(params.value as number);
            }
            case TimeFormat.ShortWithSeconds: {
                return formatLocalTimeShortWithSeconds(params.value as number);
            }
            case TimeFormat.ShortWithSecondsDM: {
                return formatLocalTimeShortWithSecondsDM(params.value as number);
            }
            case TimeFormat.Long: {
                return formatLocalTimeLong(params.value as number);
            }
            case TimeFormat.Short:
            default: {
                return formatLocalTimeShort(params.value as number);
            }
        }

    } else {
        return 'No Data'
    }
}

export const renderMatchStatusDisplay = (params: GridRenderCellParams<any, string>) => {
    return <MatchStatusChip status={params.value}/>;
};

export const renderVendorStatusDisplay = (params: GridRenderCellParams<any, VendorStatus>) => {
    return <MatchVendorStatusChip status={params.value}/>;
}

export const renderChannelStatusDisplay = (params: GridRenderCellParams<any, ChannelStatus>) => {
    return <MatchChannelStatusChip status={params.value}/>;
};

export const renderMemberStatusDisplay = (params: GridRenderCellParams<any, MemberStatus>) => {
    return <MatchMemberStatusChip status={params.value}/>;
};

export const getScoreDisplay = (params: GridCellParams) => {
    const participants = params.row['participants'] as ParticipantDataModel[]
    const homeScore = participants.find(item => item.isHome)?.score
    const awayScore = participants.find(item => !item.isHome)?.score
    return `${homeScore || '0'} - ${awayScore || '0'}`
}

export const moneyFormat = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const renderBetSlipsDisplay = (params: GridRenderCellParams<any, string>, onItemClick?: (event: React.MouseEvent) => void) => {
    const betSlips = params.row['betSlips'] as BetSlipsModel
    const eventId = params.row['eventId']
    const leagueName = params.row['leagueName']
    const title = `[${eventId}] ${leagueName}`

    return <ProgressBar data={betSlips} padding={'20px 0px'} title={title} skipAnimation={true}
                        onItemClick={onItemClick}/>
};

export const renderBetSlipsSmallDisplay = (params: GridRenderCellParams<any, string>) => {
    const betSlips = params.row['betSlips'] as BetSlipsModel

    return (
        <Stack flexDirection={'column'} fontWeight={700}>
            <Stack color={'#42A5F5'} id={'accept-data'}>
                {
                    moneyFormat(betSlips.acceptAmount)
                }
            </Stack>
            <Stack color={'#9FA6AD'} id={'accept-data'}>
                {
                    moneyFormat(betSlips.pendingAmount)
                }
            </Stack>
            <Stack color={'#E47474'} id={'accept-data'}>
                {
                    moneyFormat(betSlips.rejectedAmount)
                }
            </Stack>
        </Stack>
    )
}

export const transformedPrice = (value: number, point: number, oddsDisplay: string, marketType: string = '') => {
    let countText = oddsFormat(value, oddsDisplay, point, marketType)
    if (!isNaN(Number(countText))) {
        if (countText.startsWith('+')) {
            countText = `+${complementZero(countText, point)}`
        } else {
            countText = complementZero(countText, point)
        }
    }

    return countText
}

const getBounds = (value: number, increment: number): [number, number] => {
    const lower = Math.floor(value / increment) * increment;
    const upper = lower + increment;
    return [lower, upper];
};

export const isHandicapMarket = (marketType: string) => ['handicap', 'point spread'].some(keyword =>
    marketType?.toLowerCase().includes(keyword)
);

export const isOverUnderMarket = (marketType: string) => ['over/under', 'over / under'].some(keyword =>
    marketType?.toLowerCase().includes(keyword)
);

export const isMoneyLineMarket = (marketType: string) => ['money line'].some(keyword =>
    marketType?.toLowerCase().includes(keyword)
);

export const isOneXTwoMarket = (marketType: string) => ['match result', 'half-time result'].some(keyword =>
    marketType?.toLowerCase().includes(keyword)
);


export const sortedOddBets = (odds: OddModel, marketType: string, homeParticipantEnName: string, awayParticipantEnName: string) => {
    const lowerCaseMarket = marketType?.toLowerCase();
    const lowerCaseHome = homeParticipantEnName?.toLowerCase();
    const lowerCaseAway = awayParticipantEnName?.toLowerCase();

    const isOneXTwo = isOneXTwoMarket(lowerCaseMarket);
    const isOverUnder = isOverUnderMarket(lowerCaseMarket);
    const isHandicap = isHandicapMarket(lowerCaseMarket);
    const isMoneyLine = isMoneyLineMarket(lowerCaseMarket);

    const getOrder = () => {
        if (isOneXTwo) {
            return [lowerCaseHome, lowerCaseAway, "draw", "1", "2", "x"];
        } else if (isOverUnder) {
            return ["over", "under"];
        } else if (isHandicap || isMoneyLine) {
            return [lowerCaseHome, lowerCaseAway, "1", "2"];
        } else {
            return [lowerCaseHome, lowerCaseAway];
        }
    };

    const order = getOrder();
    return odds.bets.slice().sort((a, b) => {
        const getIndex = (betName: string) => {
            const lowerCaseBetName = betName.toLowerCase();

            for (let i = 0; i < order.length; i++) {
                if (lowerCaseBetName.includes(order[i])) {
                    return i; // Return the index of the first matching keyword
                }
            }
            return order.length; // If no match, put it at the end
        };

        return getIndex(a.betName) - getIndex(b.betName);
    });
};

export const getFractionLineDisplay = (value: string): string => {
    const num = parseFloat(value);
    if (isNaN(num)) return value;

    const absNum = Math.abs(num);
    const floorNum = Math.floor(absNum);
    const decimalPart = absNum - floorNum;

    let result: string;
    if (decimalPart === 0) {
        result = `${floorNum}`;
    } else if (decimalPart <= 0.25) {
        result = decimalPart === 0.25 ? `${floorNum}/${floorNum + 0.5}` : `${floorNum}`;
    } else if (decimalPart <= 0.75) {
        result = decimalPart === 0.75 ? `${floorNum + 0.5}/${floorNum + 1}` : `${floorNum + 0.5}`;
    } else {
        result = `${floorNum + 0.5}/${floorNum + 1}`;
    }

    return num < 0 ? `-${result}` : result;
}

/**
 * [FE-1116] ...
 * 新的球頭邏輯為
 * - 如果是 handicap 類型的 market
 * 1. baseLine 為 0 時，放在賠率低的那隊 (強隊)，若賠率又相等，則放在主隊 (FE-1259 改為固定放在主隊)
 * 2. 投注選項為雙邊時，球頭需置於含有負號的 betLine，並去除負號作為其值
 * 3. 投注選項為多邊時，球頭需置於每一邊，並取其 betLine 的值作為其值，不需處理正負號
 * - 如果是 under/over 類型的 market
 * 1. 投注選項為雙邊時，球頭需置於over，並取 baseLine 作為其值
 * 2. 投注選項為多邊時，球頭需置於每一邊，並取 baseLine 作為其值
 * - 如果是其他類型market
 * 1. 可省略球頭邏輯
 * */
export const displayStrongOddLine = (
    marketType: string,
    sortedBets: BetModel[],
    baseLine: string,
    betLine: string,
    betName: string,
    betPrice: number,
    homeParticipantEnName: string,
    lineIndex: number
) => {
    const isHandicap = isHandicapMarket(marketType);
    const isOverUnder = isOverUnderMarket(marketType);
    if (isHandicap) {
        const parseBaseLine = parseFloat(baseLine);
        const parseLine = parseFloat(betLine);
        const isHomeTeamOdds = [homeParticipantEnName?.toLowerCase(), "1", "home"].some(name => name === betName.toLowerCase());
        if (parseBaseLine === 0.0) {
            // baseLine 為 0 時，放在主隊
            return isHomeTeamOdds ? getFractionLineDisplay(betLine) : "";
        } else if (sortedBets.length > 2) {
            // 投注選項為多邊時，球頭需置於每一邊，並取其 betLine 的值作為其值，不需處理正負號
            return getFractionLineDisplay(betLine);
        } else {
            // 投注選項為雙邊時，球頭需置於含有負號的 betLine，並去除負號作為其值
            return parseLine < 0 ? getFractionLineDisplay(betLine).replace(/^-/, '') : "";
        }
    } else if (isOverUnder) {
        if (sortedBets.length > 2) {
            // 投注選項為多邊時，球頭需置於每一邊，並取 baseLine 作為其值
            return getFractionLineDisplay(baseLine);
        } else {
            // 投注選項為雙邊時，球頭需置於 over，並取 baseLine 作為其值
            return betName.toLowerCase() === "over" ? getFractionLineDisplay(baseLine) : "";
        }
    } else {
        return lineIndex === 0 ? getFractionLineDisplay(baseLine) : "";
    }
}

export const getRuleNumber = (value: number, configuration?: ConfigurationModel): number | undefined => {
    for (let rule of configuration?.rounding ?? []) {
        const {ruleName, ruleNumber} = rule;
        const ranges = ruleName.split('_');
        if (ranges.length === 2) {
            const [min, max] = ranges.map(Number);
            if (value >= min && value < max) {
                return ruleNumber;
            }
        } else if (ruleName.endsWith('+')) {
            const min = Number(ruleName.slice(0, -1));
            if (value >= min) {
                return ruleNumber;
            }
        }
    }
    return undefined;
}

export const getIncrementByRuleNumber = (ruleNumber: number, configuration?: ConfigurationModel): number | undefined => {
    if (!configuration) return undefined;
    let rule = configuration.roundingIncrement.find(rule => rule.ruleNumber === ruleNumber);
    if (rule?.increment) return rule.increment;
    const max = ruleNumber || 4;
    for (let i = max; i > 0; i--) {
        rule = configuration.roundingIncrement.find(rule => rule.ruleNumber === i);
        if (rule?.increment) return rule.increment;
    }
    return undefined;
}

/**
 * 計算賽事實際運行時間
 * @param runningReceiveTime Server 接收到事件的時間(timestamp)
 * @param runningTime 運行時間(秒)
 * */
export const calculateElapsedRunningTime = (runningReceiveTime: number, runningTime: number): number => {
    const currentTime = Math.floor(Date.now() / 1000);
    const timeDiff = currentTime - runningReceiveTime;

    // 如果運行時間不存在或是 0, 則實際運行時間為 0
    if (!runningTime || runningTime === 0) return 0;

    // 否則為 (當前時間 - Server 接收到事件的時間) + 運行時間
    const currentRunningTime = timeDiff + runningTime;
    // 如果運算完運行時間小於 0, 則實際運行時間為 0
    return currentRunningTime < 0 ? 0 : currentRunningTime;
}

export const renderWithDangerBall = (
    intl: IntlShape,
    funType: string,
    params: GridRenderCellParams<any, string>,
    handleCopyButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, text: string) => void
) => {
    const dangerBallState: DangerBallType | undefined = params.row['dangerBallState'] as DangerBallType
    const textValue = params.value as string
    return (
        <>
            <Box sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'inline-block',
            }}>
                {textValue}
            </Box>
            <Tooltip arrow placement="top-start"
                     title={intl.formatMessage({id: `${funType}.copy`, defaultMessage: 'Copy'})}
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
            {
                dangerBallState &&
                <DangerBall dangerType={dangerBallState}/>
            }
        </>
    )
};

export const renderWithCopyButton = (
    intl: IntlShape,
    funType: string,
    params: GridRenderCellParams<any, string>,
    handleCopyButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, text: string) => void
) => {
    const textValue = params.value as string
    return (
        <>
            <Box sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'inline-block',
            }}>
                {textValue}
            </Box>
            <Tooltip arrow placement="top-start"
                     title={intl.formatMessage({id: `${funType}.copy`, defaultMessage: 'Copy'})}
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
        </>
    )
};

export const renderEventDisplay = (
    params: GridRenderCellParams<any, string>,
    intl: IntlShape,
    eventType: string,
    handleRightDrawer?: (props: Omit<RightDrawerProps, 'open' | 'setOpen'>) => void,
) => {
    const participantsData = params.row['participants'] as ParticipantDataModel[]
    const homeParticipant = participantsData?.find(participant => participant.isHome)
    const awayParticipant = participantsData?.find(participant => !participant.isHome)
    const inPlay = eventType === BetSlipEventType.inPlay
    const allCardTypes = new Set<string>();
    participantsData?.forEach(participant => {
        const {cards} = participant;

        if (cards && cards.length > 0) {
            cards.forEach(card => {
                allCardTypes.add(card.cardType);
            });
        }
    });
    const cardNumbers = Array.from(allCardTypes).reduce((acc: Record<string, number[]>, cardType) => {
        acc[cardType] = participantsData?.map(participant => {
            const {cards} = participant;
            if (!cards || cards.length === 0) {
                return 0;
            }
            const card = cards.find(c => c.cardType === cardType);
            return card ? card.cardCount : 0;
        });

        return acc;
    }, {});
    const cornerNumbers = participantsData?.toSorted((a, b) => (a.isHome ? -1 : 1))
        .reduce((acc: number[], participant) => {
            acc.push(participant.corner ?? 0);
            return acc;
        }, []);

    const isClockRunning = params.row['isClockRunning'] as boolean;
    const runningTimeData = (params.row['runningTime'] as string)?.split(' ');
    const periodName = EventPeriodName(intl, runningTimeData?.[0])
    const runningTime = Number(runningTimeData?.[1] ?? 0);
    const homeExtraScores = homeParticipant?.extraScores ?? [];
    const awayExtraScores = awayParticipant?.extraScores ?? [];

    const homePenaltyScore = homeExtraScores.find(extraScore => extraScore.type === ExtraScoreType.PENALTIES)?.score
    const awayPenaltyScore = awayExtraScores.find(extraScore => extraScore.type === ExtraScoreType.PENALTIES)?.score
    const eventId = params.row['eventId']
    const sportType = params.row['sportType']
    const leagueName = params.row['leagueName']
    const title = `[${eventId}] ${leagueName}`
    const handleTimelineDrawer = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        handleRightDrawer && handleRightDrawer({
            title: intl.formatMessage({id: 'event.timeline', defaultMessage: 'Timeline'}),
            subTitle: title,
            children: <TimelineDrawerContent eventId={eventId} sportType={sportType}/>
        })
    }

    const runningReceiveTime = params.row['runningReceiveTime'] as number;
    const elapsedRunningTime = runningReceiveTime
        ? calculateElapsedRunningTime(runningReceiveTime, runningTime)
        : runningTime;
    return (
        <Grid container spacing={1} alignItems={'flex-start'}>
            {
                runningTimeData && <Grid item xs={12}>
                    <Stack direction={'row'} alignItems={'center'} spacing={1}>
                        <Stack direction={'row'} alignItems={'center'} spacing={1}>
                            <Typography fontSize={'0.75rem'} color={'text.secondaryChannel'}>{periodName}</Typography>
                            <RunningTimer
                                sportType={sportType}
                                runningTime={elapsedRunningTime}
                                isClockRunning={isClockRunning}
                                fontSize={'0.75rem'}
                            />
                        </Stack>
                    </Stack>
                </Grid>
            }
            <Grid item xs={12}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography variant={'inherit'}>{homeParticipant?.name ?? 'Home'}</Typography>
                    {inPlay &&
                        <Stack direction={"row"}>
                            <Typography sx={{cursor: 'pointer'}}
                                        variant={'inherit'} fontWeight={'bold'}
                                        color={'#2196F3'}
                                        onClick={handleTimelineDrawer}
                            >
                                {homeParticipant?.score}
                            </Typography>
                            <Typography sx={{cursor: 'pointer'}}
                                        variant={'inherit'} fontWeight={'bold'}
                                        color={'text.secondaryChannel'}
                                        onClick={handleTimelineDrawer}
                            >
                                {(homePenaltyScore !== undefined ? `(${homePenaltyScore})` : '')}
                            </Typography>
                        </Stack>
                    }
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography variant={'inherit'}>{awayParticipant?.name ?? 'Away'}</Typography>
                    {inPlay &&
                        <Stack direction={"row"}>
                            <Typography sx={{cursor: 'pointer'}}
                                        variant={'inherit'} fontWeight={'bold'}
                                        color={'#2196F3'}
                                        onClick={handleTimelineDrawer}
                            >
                                {awayParticipant?.score}
                            </Typography>
                            <Typography sx={{cursor: 'pointer'}}
                                        variant={'inherit'} fontWeight={'bold'}
                                        color={'text.secondaryChannel'}
                                        onClick={handleTimelineDrawer}
                            >
                                {(awayPenaltyScore !== undefined ? `(${awayPenaltyScore})` : '')}
                            </Typography>
                        </Stack>
                    }
                </Stack>
            </Grid>
            {
                allCardTypes.size > 0 &&
                <Grid item xs={12}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        {numbersDisplay(cornerNumbers, 'CornerKick')}
                        {Object.keys(cardNumbers).map(cardType => numbersDisplay(cardNumbers[cardType], cardType))}
                    </Stack>
                </Grid>
            }

        </Grid>
    )
}

export const renderMarketStatusDisplay = (params: GridRenderCellParams<any, string>) => {
    const eventId = params.row['eventId']
    const leagueName = params.row['leagueName']
    const title = `[${eventId}] ${leagueName}`
    const marketStatus = params.row['marketStatus'] as MarketStatusModel

    const data = {
        running: marketStatus?.runningNumber || 0,
        suspended: marketStatus?.suspendedNumber || 0,
        hide: marketStatus?.closedNumber || 0
    }

    return <ProgressBar data={data} padding={'20px 0px'} title={title} skipAnimation={true}/>
};

interface RenderOddsBaseLinePriceProps {
    params: GridRenderCellParams<any, string>;
    displayMarketName: string;
    marketType: string;
    oddsDisplay: string;
    configuration?: ConfigurationModel;
    handlePriceChanged?: (betId: string, price: number, originalPrice: number) => void;
    withTemplate?: boolean;
    handleTemplateBtnClick?: (template: ApplyTemplate) => void;
    handleMoreLines?: (displayMarket: string, eventId: string, marketId: string) => void;
}

const RenderOddsBaseLinePriceCommon = ({
                                           params,
                                           displayMarketName,
                                           marketType,
                                           oddsDisplay,
                                           configuration,
                                           handlePriceChanged,
                                           withTemplate = false,
                                           handleTemplateBtnClick,
                                           handleMoreLines,
                                       }: RenderOddsBaseLinePriceProps) => {
    const oddsData = params.row['oddsData'] as OddDataModel[]
    const lowerCaseMarket = marketType.toLowerCase();
    let foundOddsItem = oddsData.find(item => item.marketType.toLowerCase() === lowerCaseMarket);
    const oddsList = foundOddsItem?.odds;
    const applyTemplate = foundOddsItem?.applyTemplate;
    const marketSuspendedStatus = foundOddsItem?.marketSuspendedStatus;

    const odds = oddsList?.at(0)
    const eventId = params.row['eventId'] ?? ''
    const marketId = foundOddsItem?.marketId ?? ''
    const eventSuspendedStatus = params.row['eventSuspendedStatus']
    const participants = params.row['participants']
    const homeParticipantEnName = participants.find((participant: ParticipantDataModel) => participant.isHome)?.participantEnName ?? ''
    const awayParticipantEnName = participants.find((participant: ParticipantDataModel) => !participant.isHome)?.participantEnName ?? ''
    if (!configuration) return null
    const handleMore = () => {
        handleMoreLines && handleMoreLines(displayMarketName, eventId, marketId)
    }

    if (odds) {
        const sortedBets = sortedOddBets(odds, marketType, homeParticipantEnName, awayParticipantEnName);
        const baseLineDisplay = getFractionLineDisplay(odds.baseLine ?? '');
        const oddsLength = oddsList?.filter(odd => {
            // Return true if not all lineStatus are 'CLOSED'
            const status = lineStatus(odd.bets, odd.oddsSuspendedStatus, marketSuspendedStatus, eventSuspendedStatus)
            return status !== MarketLineStatus.CLOSED;
        })?.length ?? 0;

        const oddsBaseLinePriceProps = sortedBets.map((bet, index) => {
            const point = getRuleNumber(Number(bet.price), configuration) ?? 4;
            const base = displayStrongOddLine(
                marketType,
                sortedBets,
                odds.baseLine ?? '',
                bet.line,
                bet.betName,
                bet.price,
                homeParticipantEnName,
                index
            );
            const betSlips = bet.betSlips
            return {
                base: base,
                price: bet.price?.toString(),
                point: point,
                quantity: getIncrementByRuleNumber(point, configuration),
                betStatus: bet.betStatus,
                originalPrice: withTemplate ? bet.originalPrice : undefined,
                betSlips: withTemplate ? betSlips : undefined,
                adjustedNumber: withTemplate ? bet.adjustedNumber : undefined,
                onValueChange: (value: number) => {
                    if (handlePriceChanged) {
                        handlePriceChanged(bet.betId, value, bet.price ?? 0);
                    }
                }
            };
        });

        return (
            withTemplate ? (
                <OddsBaseLinePriceWithApplyTemplate
                    marketType={marketType}
                    displayType={oddsDisplay}
                    isShowBase={baseLineDisplay !== ''}
                    layoutType='vertical'
                    isWidthFixed={true}
                    odds={oddsBaseLinePriceProps}
                    applyTemplate={applyTemplate}
                    otherLines={oddsLength > 1 &&
                        <SeeMoreButton text={`(+${oddsLength - 1})`} onClick={handleMore}/>}
                    handleTemplateBtnClick={() => applyTemplate && handleTemplateBtnClick && handleTemplateBtnClick(applyTemplate)}
                />
            ) : (
                <>
                    <Box height='100%' display='flex'>
                        <OddsBaseLinePrice
                            displayType={oddsDisplay}
                            marketType={marketType}
                            odds={oddsBaseLinePriceProps}
                        />
                    </Box>
                    {oddsLength > 1 ? <Box sx={{color: '#0288D1', marginLeft: '0.5rem', cursor: 'pointer'}}
                                           onClick={handleMore}>(+{oddsLength - 1})</Box> : <></>}
                </>
            )
        );
    } else {
        return <OddsBaseLinePrice marketType={marketType}/>
    }
};
const MemoizedRenderOddsBaseLinePriceCommon = React.memo(RenderOddsBaseLinePriceCommon, (prevProps, nextProps) => {
    return isEqual(prevProps.params, nextProps.params) &&
        prevProps.oddsDisplay === nextProps.oddsDisplay &&
        isEqual(prevProps.configuration, prevProps.configuration)
})
MemoizedRenderOddsBaseLinePriceCommon.displayName = 'RenderOddsBaseLinePriceCommon'


export const renderOddsBaseLinePriceDisplay = (
    params: GridRenderCellParams<any, string>,
    marketType: string,
    oddsDisplay: string,
    configuration?: ConfigurationModel,
    handlePriceChanged?: (betId: string, price: number, originalPrice: number) => void,
    handleMoreLines?: (displayMarketName: string, eventId: string, marketId: string) => void,
) => {
    return <MemoizedRenderOddsBaseLinePriceCommon
        params={params}
        configuration={configuration}
        displayMarketName={marketType}
        marketType={marketType}
        oddsDisplay={oddsDisplay}
        handlePriceChanged={handlePriceChanged}
        handleMoreLines={handleMoreLines}/>
};

export const renderOddsBaseLinePriceDisplayWithApplyTemplate = (
    params: GridRenderCellParams<any, string>,
    displayMarketName: string,
    marketType: string,
    oddsDisplay: string,
    configuration?: ConfigurationModel,
    handlePriceChanged?: (betId: string, price: number, originalPrice: number) => void,
    handleTemplateBtnClick?: (template: ApplyTemplate) => void,
    handleMoreLines?: (displayMarketName: string, eventId: string, marketId: string) => void
) => {
    return <MemoizedRenderOddsBaseLinePriceCommon
        params={params}
        configuration={configuration}
        displayMarketName={displayMarketName}
        marketType={marketType}
        oddsDisplay={oddsDisplay}
        withTemplate={true}
        handlePriceChanged={handlePriceChanged}
        handleTemplateBtnClick={handleTemplateBtnClick}
        handleMoreLines={handleMoreLines}/>
};

export const renderWithEventIdAndStatus = (
    intl: IntlShape,
    funType: string,
    params: GridRenderCellParams<any, string>,
    handleCopyButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, text: string) => void
) => {
    const eventId = params.row['eventId'] as string
    const dangerBallState = params.row['dangerBallState'] as DangerBallType
    return (
        <Stack
            spacing={0.5}
            sx={{
                width: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'inline-block',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover .icon-button': {
                    display: 'inline-flex',
                }
            }}
        >
            <Stack direction={'row'} alignItems={'center'}>
                <Typography
                    variant={'body2'}
                    sx={{
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        lineHeight: '1.5',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: 'inline-block'
                    }}
                >
                    {eventId}
                </Typography>
                <Tooltip arrow placement="top-start"
                         title={intl.formatMessage({id: `${funType}.copy`, defaultMessage: 'Copy'})}
                >
                    <IconButton
                        size={'small'}
                        className="icon-button"
                        sx={{
                            position: 'relative',
                            right: 0,
                            display: 'none'
                        }}
                        onClick={(event) => {
                            handleCopyButtonClick(event, eventId)
                        }}
                    >
                        <ContentCopyRounded fontSize={'small'}/>
                    </IconButton>
                </Tooltip>
            </Stack>
            {dangerBallState && <DangerBall dangerType={dangerBallState}/>}
        </Stack>
    )
};

export const renderWithLocationLeagueAndTemplate = (
    intl: IntlShape,
    funType: string,
    params: GridRenderCellParams<any, string>,
    handleCopyButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, text: string) => void,
    handleTemplateBtnClick: (template: ApplyTemplate) => void
) => {
    const leagueName = params.row['leagueName']
    const locationName = params.row['locationName']
    const locationType = params.row['locationType']
    const applyTemplate = params.row['applyTemplate'] as ApplyTemplate
    const formatLocationImgName = (locationType?: string) => {
        return locationType?.trim()
            .replace(/\s+/g, '_')
            .replace(/[^\w-]/g, '')
            .toUpperCase()
    }

    return (
        <Stack
            spacing={0.5}
            sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'inline-block',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover .icon-button': {
                    display: 'inline-flex',
                }
            }}
        >
            <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
                <Avatar
                    src={`/country/circle/${formatLocationImgName(locationType)}.svg`}
                    alt={locationType}
                    sx={{width: '1.25rem', height: '1.25rem'}}
                >
                    <Avatar
                        src={`/country/circle/DEFAULT.svg`}
                        alt={locationType}
                        sx={{width: '1.25rem', height: '1.25rem'}}
                    >
                        <FlagCircleRounded sx={{width: '100%'}}/>
                    </Avatar>
                </Avatar>
                <Typography
                    variant={'body2'}
                    sx={{
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        lineHeight: '1.5',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: 'inline-block'
                    }}
                >
                    {locationName}
                </Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'}>
                <Typography
                    variant={'body2'}
                    sx={{
                        whiteSpace: 'wrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: 'inline-block'
                    }}
                >
                    {leagueName}
                </Typography>
                <Tooltip arrow placement="top-start"
                         title={intl.formatMessage({id: `${funType}.copy`, defaultMessage: 'Copy'})}
                >
                    <IconButton
                        size={'small'}
                        className="icon-button"
                        sx={{
                            position: 'relative',
                            right: 0,
                            display: 'none'
                        }}
                        onClick={(event) => {
                            handleCopyButtonClick(event, leagueName)
                        }}
                    >
                        <ContentCopyRounded fontSize={'small'}/>
                    </IconButton>
                </Tooltip>
            </Stack>
            <Stack sx={{
                width: 120
            }}>
                {
                    applyTemplate && <Tooltip title={applyTemplate?.templateName} placement="top-start">
                        <Button
                            variant={'text'}
                            size={'small'}
                            sx={{
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                display: 'block',
                                padding: 0,
                                width: 'min-content',
                            }}
                            onClick={() => handleTemplateBtnClick && handleTemplateBtnClick(applyTemplate)}>
                            {applyTemplate?.templateName}
                        </Button>
                    </Tooltip>
                }
            </Stack>
        </Stack>
    )
}