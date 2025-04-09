import {
    BetModel,
    BetSlipsModel, CardModel,
    EventMarketModel, ExtraScore,
    LeagueModel,
    OddModel,
    PlayLogStatisticModel,
    PlayLogSummaryModel
} from "@/services/@core/module/ResponseDataModels";
import {AutoMultiMenuTextFieldProps} from "@/modules/components/TextField/MultiSelectTextField";
import {StatusButtonGroupProps} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup";
import {EventStatus} from "@/services/@core/module/EventStatus";
import {StatisticSummaryProps} from "@/app/eventDetail/components/playLog/StatisticSummary";
import {PeriodScore} from "@/app/eventDetail/components/playLog/GameSectionScoreboard";
import {BetSlipEventType, EventMarketStatus, EventType, MarketLineStatus} from "@/services/@core/module/Enum";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {IntlShape} from "react-intl";
import {hasValidNumber} from "@/utils/tools";
import lodash from "lodash";
import {SubscriptionBetModel, SubscriptionOddsModel} from "@/services/@odds/socket/events/OddsSubscriptionProvider";

export const DefaultEventTypes = (intl: IntlShape): { key: string, text: string, type: string }[] => {
    const funType = `${LocalizationFunctionType.Common}.eventType`
    return [
        {
            key: BetSlipEventType.inPlay,
            text: intl.formatMessage({id: `${funType}.inPlay`, defaultMessage: 'In Play'}),
            type: BetSlipEventType.inPlay
        },
        {
            key: BetSlipEventType.startingSoon,
            text: intl.formatMessage({id: `${funType}.startingSoon`, defaultMessage: 'Starting Soon'}),
            type: BetSlipEventType.startingSoon
        },
        {
            key: BetSlipEventType.preMatch,
            text: intl.formatMessage({id: `${funType}.preMatch`, defaultMessage: 'Pre Match'}),
            type: BetSlipEventType.preMatch
        }
    ]
}

export const BetSlipEventTypes = (intl: IntlShape): { key: string, text: string, type: string }[] => {
    const funType = `${LocalizationFunctionType.Common}.eventType`;

    return [
        ...DefaultEventTypes(intl),
        {
            key: BetSlipEventType.settled,
            text: intl.formatMessage({id: `${funType}.settled`, defaultMessage: 'Settled'}),
            type: BetSlipEventType.settled
        }
    ];
}

export const EventPeriodName = (intl: IntlShape, periodName: string) => {
    const funcType = `${LocalizationFunctionType.Event}.periodNames`;

    return !lodash.isEmpty(periodName) ? intl.formatMessage({
        id: `${funcType}.${periodName}`,
        defaultMessage: convertPeriodOrTypeDisplay(periodName) // Convert the period name to readable text if the translation is not found
    }) : '';
}

export const getMarketFilterList = (props: EventMarketModel[], defaultMarket?: string[]): AutoMultiMenuTextFieldProps => {
    const options = props.map(item => item.marketName)
    const initialSelectedOptions = defaultMarket ? props.filter(option => defaultMarket.includes(option.marketType.toLowerCase())).map(option => option.marketName) : undefined

    return {
        id: `market-${props.length}`,
        isEmptyEqualSelectAll: false,
        initialSelectedOptions: initialSelectedOptions,
        options: options,
    };
}

export const getMarketProviderFilterList = (props: EventMarketModel[]): AutoMultiMenuTextFieldProps => {
    const options = Array.from(new Set(props.flatMap(market => market.providers)))

    return {
        id: `provider-${props.length}`,
        isEmptyEqualSelectAll: false,
        initialSelectedOptions: [],
        options: options,
        width: "100%"
    };
}

export const getDefaultStatusButtonList = (props?: EventMarketModel[]): StatusButtonGroupProps => {
    const filterData = (props && props.length) ? props : []

    return {
        items: filterData.map(item => ({
            key: item.marketId,
            text: item.marketName,
            type: item.marketType
        }))
    };
}

export const defaultEventQueryParamsReplace = (params: Record<string, any>, leagueModels: LeagueModel[]) => {
    const obj = Object.entries(params)

    return Object.fromEntries(obj.map(o => {
        const [key, value] = o
        let newValue = value
        switch (key) {
            case "leagueIds":
                if ((value?.length ?? 0) === 0) {
                    newValue = undefined
                } else {
                    newValue = leagueModels
                        .filter(leagueModel => value.includes(leagueModel.leagueId))
                        .map(leagueModel => leagueModel.leagueId);
                }
                break;
            case "statuses":
                if ((value?.length ?? 0) === 0) {
                    newValue = undefined
                } else {
                    newValue = Object.entries(EventStatus)
                        .filter(([statusKey, statusValue]) => value.includes(statusValue))
                        .map(([statusKey, statusValue]) => statusKey);
                }
                break;
        }
        return [key, newValue]
    }))
}

export const toPlayLogGameSectionScoreboardProps = (scores: PlayLogStatisticModel[]): PeriodScore[] => {
    return scores.map(item => {
        return {
            name: convertPeriodOrTypeDisplay(item.name),
            home: item.home,
            away: item.away,
            sequence: item.sequence
        } as PeriodScore
    })
}

export const toPlayLogStatisticSummaryProps = (data: PlayLogStatisticModel[]): StatisticSummaryProps[] => {
    return data.map(item => {
        return {
            name: item.name,
            home: Number(item.home),
            away: Number(item.away),
            sequence: item.sequence
        } as StatisticSummaryProps
    })
}

export const toPlayLogSummaryProps = (intl: IntlShape, data: PlayLogSummaryModel): PlayLogSummaryModel => {
    return {
        ...data,
        currentPeriodName: EventPeriodName(intl, data.currentPeriodName ?? ''),
    }
}

// Convert Event Period Or Type to Readable Text.
// Capitalize the first letter of each word, and remove underscores.
export function convertPeriodOrTypeDisplay(periodName?: string | null): string {
    // Function to capitalize the first letter of a word
    if (lodash.isNil(periodName) || lodash.isEmpty(periodName)) return ''
    const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

    // Split the period name by underscores
    const words = periodName.split('_');

    // RegExp pattern
    const pattern = /^(\d+)([a-zA-Z]+)$/;

    // Process each word
    return words.map(word => {
        // Check if the word contains numeric suffix
        const match = pattern.exec(word);
        if (match) {
            const [, numberPart, suffixPart] = match;
            return `${numberPart}${suffixPart.toLowerCase()}`;
        }
        return capitalize(word);
    }).join(' ');
}

export const filterNewAndUpdatedOdds = (newOddsData: SubscriptionOddsModel[], currentOdds?: OddModel[]) => {
    const currentBaseLine = currentOdds?.map(odd => odd.baseLine) ?? [];
    const currentLines = currentOdds?.map(odd => odd.bets) ?? [];
    const currentBets = currentLines.flat();
    const currentBetIds = currentBets.map(bet => bet.betId)
    const newLines = newOddsData.filter(
        data =>
            (currentBaseLine.length === 0 || (data.baseLine !== null && !currentBaseLine.includes(data.baseLine))) &&
            Boolean(data.bets?.length) &&
            data.bets?.every(bet => !currentBetIds.includes(bet.betId))
    )
    const updateLines = newOddsData.filter(data => data.bets?.some(bet => currentBetIds.includes(bet.betId) || currentBaseLine.includes(data.baseLine)))
    const newStatus = newOddsData[newOddsData.length - 1].status
    return {
        newLines,
        updateLines,
        newStatus
    }
}

export const setNewAndUpdatedOdds = (newLines: SubscriptionOddsModel[], updateLines: SubscriptionOddsModel[], newStatus?: string, currentOdds?: OddModel[]): OddModel[] => {
    return markMostBalance(oddsSort([...(currentOdds?.map(odd => {
        const targetLineData = updateLines.find(data => odd.bets.some(currentBet => data.bets?.some(newBet => newBet.betId === currentBet.betId) || odd.baseLine === data.baseLine))
        if (targetLineData) {
            return updateBets(odd, targetLineData, newStatus)
        }
        return newStatus ? {
            ...odd,
            oddsSuspendedStatus: newStatus
        } : odd
    }) ?? []), ...(newLines.map(data => {
            return {
                baseLine: data.baseLine,
                bets: data.bets as BetModel[] ?? [],
                isMostBalance: false,
                oddsSuspendedStatus: newStatus ?? data.status
            }
        })
    )]))
}

export const updateBets = (odd: OddModel, newData: SubscriptionOddsModel, newStatus?: string): OddModel => {
    const {baseLine, bets} = newData;
    const newBets = bets?.filter(bet => !odd.bets.some(currentBet => currentBet.betId === bet.betId)) ?? [];
    return {
        ...odd,
        ...(newStatus || newData.status ? {oddsSuspendedStatus: newStatus ?? newData.status} : undefined),
        bets: [...odd.bets.map(bet => {
            const resBet = bets?.find((resBet: SubscriptionBetModel) => resBet.betId === bet.betId);
            return {
                ...bet,
                ...(resBet ? {
                    ...(resBet.betName ? {betName: resBet.betName} : undefined),
                    ...(resBet.price ? {price: resBet.price} : undefined),
                    ...(resBet.updateTime ? {updateTime: resBet.updateTime} : undefined),
                    ...(resBet.originalPrice ? {originalPrice: resBet.originalPrice} : undefined),
                    ...(resBet.betSlips ? {betSlips: updateBetSlips(resBet.betSlips, bet.betSlips)} : undefined),
                    ...(hasValidNumber(resBet.adjustedNumber) ? {adjustedNumber: resBet.adjustedNumber} : undefined),
                    ...(resBet.betStatus ? {betStatus: resBet.betStatus} : undefined),
                } : undefined)
            }
        }), ...(newBets as BetModel[])],
    }
}

export const updateBetSlips = (newBetSlips: BetSlipsModel, buffer?: BetSlipsModel | null): BetSlipsModel => {
    if (!buffer) return newBetSlips;
    return {
        ...buffer,
        ...(hasValidNumber(newBetSlips.accept) ? {accept: newBetSlips.accept} : undefined),
        ...(hasValidNumber(newBetSlips.acceptAmount) ? {acceptAmount: newBetSlips.acceptAmount} : undefined),
        ...(hasValidNumber(newBetSlips.pending) ? {pending: newBetSlips.pending} : undefined),
        ...(hasValidNumber(newBetSlips.pendingAmount) ? {pendingAmount: newBetSlips.pendingAmount} : undefined),
        ...(hasValidNumber(newBetSlips.rejected) ? {rejected: newBetSlips.rejected} : undefined),
        ...(hasValidNumber(newBetSlips.rejectedAmount) ? {rejectedAmount: newBetSlips.rejectedAmount} : undefined),
    }
}

const statusOrder: Record<string, number> = {
    ACTIVE: 1,
    SUSPENDED: 2,
    CLOSED: 3,
};
export const oddsSort = (odds: OddModel[]) => {
    const originalOdds = [...odds]
    const newOdds = originalOdds.sort((a, b) => {
        const statusA = lineStatus(a.bets, a.oddsSuspendedStatus)
        const statusB = lineStatus(b.bets, b.oddsSuspendedStatus)

        if (statusOrder[statusA] !== statusOrder[statusB]) {
            return statusOrder[statusA] - statusOrder[statusB];
        }

        const lengthA = a.bets.filter(bet => bet.betStatus !== 'CLOSED').length
        const lengthB = b.bets.filter(bet => bet.betStatus !== 'CLOSED').length

        if (lengthA > 1 && lengthB === 1) return -1
        if (lengthA === 1 && lengthB > 1) return 1

        const priceDiffA = Math.max(...a.bets.map(bet => bet.price)) - Math.min(...a.bets.map(bet => bet.price))
        const priceDiffB = Math.max(...b.bets.map(bet => bet.price)) - Math.min(...b.bets.map(bet => bet.price))
        const diff = priceDiffA - priceDiffB;
        if (diff !== 0) return diff;

        const baseLineA = Number(a.baseLine) || 0
        const baseLineB = Number(b.baseLine) || 0
        return baseLineA - baseLineB;
    })
    return newOdds
};

export const markMostBalance = (odds: OddModel[]) => {
    return odds.map((odd, index) => {
        if (index === 0) {
            const isOpened = odd.oddsSuspendedStatus !== EventMarketStatus.SUSPENDED
                && odd.oddsSuspendedStatus !== EventMarketStatus.CLOSE
                && odd.bets.length <= 2
                && odd.bets.filter(bet => bet.betStatus === 'OPEN').length > 1
            return {
                ...odd,
                isMostBalance: isOpened
            }
        }
        return {
            ...odd,
            isMostBalance: false
        }
    })
};

export const lineStatus = (bets: BetModel[], oddsStatus?: string | null, marketStatus?: string | null, eventStatus?: string | null) => {
    const isClosed = bets.every(bet => bet.betStatus === 'CLOSED');
    if (isClosed) return MarketLineStatus.CLOSED;
    const isSuspended = bets.some(bet => bet.betStatus === 'SUSPENDED') && bets.every(bet => bet.betStatus !== 'OPEN');
    if (isSuspended) return MarketLineStatus.SUSPENDED;
    const result = oddsStatus ?? marketStatus ?? eventStatus ?? MarketLineStatus.ACTIVE
    return result === 'CLOSE' ? MarketLineStatus.CLOSED : result
}

export const gotTypeChanged = (currentType: string, newStatus: string) => {
    const newEventStatus = EventStatus[newStatus]
    switch (currentType) {
        case EventType.inPlay:
            return newEventStatus !== EventStatus.IN_PROGRESS && newEventStatus !== EventStatus.COVERAGE_LOST
        case EventType.startingSoon:
            return newEventStatus !== EventStatus.ABOUT_TO_START && newEventStatus !== EventStatus.NOT_STARTED_YET
        case EventType.preMatch:
            return newEventStatus !== EventStatus.NOT_STARTED_YET
        default:
            return false
    }
}

export const updateParticipantCard = (newCard: CardModel, to?: CardModel | null): CardModel => {
    if (!to) return newCard;
    return {
        ...to,
        ...(newCard.cardType ? {cardType: newCard.cardType} : undefined),
        ...(hasValidNumber(newCard.cardCount) ? {cardCount: newCard.cardCount} : undefined),
        ...(newCard.cardImage ? {cardImage: newCard.cardImage} : undefined),
    }
}
export const updateParticipantExtraScore = (newExtraScore: ExtraScore[], to?: ExtraScore[] | null): ExtraScore[] => {
    if (!to) return newExtraScore;
    const existTypes = to.map(score => score.type)
    const newScores = newExtraScore.filter(score =>  !existTypes.includes(score.type))
    return [...to.map((score) => {
        const target = newExtraScore.find(newScore => newScore.type === score.type)
        return target ? {
            ...score,
            ...(hasValidNumber(target.score) ? {score: target.score} : undefined),
        } : score
    }), ...newScores]
}
