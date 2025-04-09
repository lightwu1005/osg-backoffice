import {
    toEventDetailProps,
    toEventMarketsDetailProps,
    toEventUpdateStatus,
    toGetEventPerformance,
    toGetMarketGroups,
} from "@/app/eventDetail/models/RequestDataMapping";
import {
    CardModel,
    EventDetailDataModel,
    EventMarketModel,
    MarketGroupModel,
    ParticipantDataModel,
    PerformanceDataModel
} from "@/services/@core/module/ResponseDataModels";
import {StatusButtonGroupProps, StatusItem} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup";
import useEventRepository from "@/services/@event/repository/useEventRepository";
import {
    EventPeriodName,
    getDefaultStatusButtonList,
    getMarketFilterList,
    getMarketProviderFilterList,
    updateParticipantCard,
    updateParticipantExtraScore
} from "@/services/@event/useCase";
import {useCallback, useEffect, useState} from "react";
import {AutoMultiMenuTextFieldProps} from "@/modules/components/TextField";
import {ActionItem} from "@/modules/components/buttons/actionButton/ActionButton";
import {EventDetailPageProps} from "@/app/eventDetail/components/pageComponent/EventDetailPage";
import {usePathname} from "next/navigation";
import {useNavigationProvider} from "@/utils/NavigationProvider";
import {EventType, Functionality, InfoType, PageType} from "@/services/@core/module/Enum";
import {GlobalController} from "@/modules/common/GlobalController";
import {firstCharToUpperCase, formatLocalTimeLong} from "@/modules/common/DisplayFormatConverter";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import lodash from "lodash";
import {getMarketNameMappings} from "@/app/eventList/models/marketMappings";
import {MuiEvent} from "@mui/x-data-grid-pro";
import {GetBetSlipsFromEvent} from "@/app/betSlip/components/models/BetSlipParameters";
import useStatsSubscription, {
    SubscriptionParticipantModel,
    SubscriptionStatsModel
} from "@/services/@odds/socket/events/useStatsSubscription";
import useInfoSubscription, {SubscriptionInfoModel} from "@/services/@odds/socket/events/useInfoSubscription";
import {useClockDuration} from "@/utils/useClockDuration";
import {hasValidNumber} from "@/utils/tools";
import {DataBuffer} from "@/utils/DataBuffer";
import {calculateElapsedRunningTime} from "@/modules/components/eventTable/EventDataConverter";

const enum Action {
    ALL_MARKET_SETTINGS,
    CLOSE_ALL,
    SUSPENDED_ALL,
}

interface SubscriptionData {
    info?: SubscriptionInfoModel
    participant?: SubscriptionParticipantModel[]
}

export const defaultMarket = (sportType: string, isInplay: boolean) => {
    const {marketNameObj} = getMarketNameMappings(sportType, isInplay);
    return Object.values(marketNameObj).map(item => item.toLowerCase())
}
const useEventDetailViewModel = (props: EventDetailPageProps) => {
    const {eventType, eventId, sportId} = props
    const eventRepo = useEventRepository();
    const {normalProvider, betSlipProvider} = useNavigationProvider()
    const [sportType, setSportType] = useState<string>('')
    const [sportName, setSportName] = useState<string>('')
    const globalController = GlobalController.getInstance()
    const intl = useIntl()
    const funType = LocalizationFunctionType.Event
    const funCommonType = LocalizationFunctionType.Common
    const isBets = process.env.FUNCTIONALITY === Functionality.Bets;
    const shouldShowMarketsAndOddsView = !lodash.isEmpty(eventType)

    const defaultParticipant = {
        id: '',
        name: '',
        abbreviation: '',
        score: 0,
        type: '',
        isHome: true,
        imageUrl: ''
    } as ParticipantDataModel

    const getEventMarketDetail = async (eventId: string, eventType: string) => {
        return await eventRepo.getEventMarketDetail(toEventMarketsDetailProps(eventId, eventType));
    }

    const updateEventStatus = async (eventIds: string[], status: string) => {
        return await eventRepo.updateEventsStatus(toEventUpdateStatus(eventIds, status));
    }

    const getMarketGroups = async (eventType: string, sportId: string) => {
        if (eventType === "") {return Promise.resolve([])}
        return await eventRepo.getMarketGroups(toGetMarketGroups(eventType, sportId))
    }

    const getEventPerformanceByInfoType = useCallback(async (eventId: string, infoType: InfoType) => {
        return await eventRepo.getEventPerformance(toGetEventPerformance(eventId, infoType))
    }, [eventRepo]);

    const getMarketList = (data?: EventMarketModel[]) => {
        const markets = getMarketFilterList(data || [], defaultMarket(sportType, eventType === EventType.inPlay))
        const providers = getMarketProviderFilterList(data || [])
        return {markets, providers}
    }

    const getStatusButtonList = (data?: EventMarketModel[]): StatusButtonGroupProps => {
        return getDefaultStatusButtonList(data)
    }

    const getEventDetail = useCallback(async (eventId: string) => {
        return await eventRepo.getEventDetail(toEventDetailProps(eventId))
    }, [eventRepo]);

    const [detailData, setDetailData] = useState<EventDetailDataModel>();
    const [marketsData, setMarketsData] = useState<EventMarketModel[]>([])
    const [marketsFilter, setMarketsFilter] = useState<AutoMultiMenuTextFieldProps>({options: []})
    const [providersFilter, setProvidersFilter] = useState<AutoMultiMenuTextFieldProps>({options: []})
    const [allMarketStatusItems, setAllMarketStatusItems] = useState<StatusItem[]>([]);
    const [displayFilterButtons, setDisplayFilterButtons] = useState<StatusButtonGroupProps>(getStatusButtonList());
    const [statusButtonGroup, setStatusButtonGroup] = useState<StatusButtonGroupProps>(getStatusButtonList());
    const [selectedMarket, setSelectedMarket] = useState<StatusItem>({key: '', text: '', type: ''});
    const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [subPagePop, setSubPagePop] = useState(false);
    const startDate = detailData ? formatLocalTimeLong(detailData.startTime)
        : intl.formatMessage({id: `${funCommonType}.noData`, defaultMessage: 'No Data'});
    const pathname = usePathname();
    const [marketPerformance, setMarketPerformance] = useState<PerformanceDataModel[]>([])
    const [betSlipPerformance, setBetSlipPerformance] = useState<PerformanceDataModel[]>([])
    const [marketGroups, setMarketGroups] = useState<MarketGroupModel[]>([])

    const {add: statsAdd, remove: statsRemove, statsSubscription} = useStatsSubscription()
    const {add: infoAdd, remove: infoRemove, infoSubscription} = useInfoSubscription()
    const [currentMatchState, setCurrentMatchState] = useState({
        home: false, away: false
    })
    const [homeParticipant, setHomeParticipant] = useState<ParticipantDataModel>(defaultParticipant)
    const [awayParticipant, setAwayParticipant] = useState<ParticipantDataModel>(defaultParticipant)
    const [periodName, setPeriodName] = useState<string>()

    const {eventDuration, setDuration, setIsClockRunning} = useClockDuration({sportType})

    const subscriptBuffer = new DataBuffer<SubscriptionData>(
        (newData, buffer) => {
            return [...buffer, newData]
        },
        (mergedData) => {
            const updateData = (detailData: EventDetailDataModel, mergedData: SubscriptionData[]) => {
                return mergedData.reduce((currentData, data) => {
                    let modifiedData = currentData;
                    if (data.info) {
                        modifiedData = modifyInfo(modifiedData, data.info);
                    }
                    if (data.participant) {
                        modifiedData = modifyParticipant(modifiedData, data.participant);
                    }
                    return modifiedData;
                }, detailData);
            }
            setDetailData(prevState => {
                if (!prevState) return prevState
                return updateData(prevState, mergedData)
            })
        },
        300
    )

    const actions: ActionItem[] = [
        {
            key: Action.CLOSE_ALL,
            value: intl.formatMessage({
                id: `${funType}.action.closeAllEventMarkets`,
                defaultMessage: 'Close all event markets'
            })
        },
        {
            key: Action.SUSPENDED_ALL,
            value: intl.formatMessage({
                id: `${funType}.action.suspendedAllEventMarkets`,
                defaultMessage: 'Suspended all event markets'
            })
        }
    ]

    if (!isBets) {
        actions.unshift({
            key: Action.ALL_MARKET_SETTINGS,
            value: intl.formatMessage({
                id: `${funType}.action.allMarketsSetting`,
                defaultMessage: 'All markets settings'
            })
        })
    }

    const getData = useCallback(() => {
        Promise.all([
            getEventPerformanceByInfoType(eventId, InfoType.Market),
            getEventPerformanceByInfoType(eventId, InfoType.BetSlips),
            getEventDetail(eventId),
            getMarketGroups(eventType, sportId)
        ])
            .then(results => {
                const [market, betSlip, detail, marketGroups] = results
                if (market) setMarketPerformance(market)
                if (betSlip) setBetSlipPerformance(betSlip)
                if (marketGroups) setMarketGroups(marketGroups)
                if (detail) {
                    setDetailData(detail)
                    setSportName(detail.sportName)
                    setSportType(detail.sportType.toLowerCase())
                }
                if (shouldShowMarketsAndOddsView) {
                    getMarketDetail()
                }
            })
            .catch((error) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: error
                });
            })
            .finally(() => setIsLoading(false))
    }, [getEventDetail, eventId, globalController])

    const getMarketDetail = async () => {
        try {
            const data = await getEventMarketDetail(eventId, eventType);
            if (!data) return
            setMarketsData(data);
            const {markets, providers} = getMarketList(data);
            setMarketsFilter(
                {
                    ...markets,
                    placeholder: intl.formatMessage({id: `${funCommonType}.market`, defaultMessage: 'Market'})
                }
            );
            setProvidersFilter({
                ...providers,
                placeholder: intl.formatMessage({id: `${funCommonType}.provider`, defaultMessage: 'Provider'})
            });
            setAllMarketStatusItems(data.map(item => ({
                key: item.marketId,
                text: item.marketName,
                type: item.marketType
            })))
        } catch (error) {
            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                severity: 'error',
                show: true,
                message: (error as Error).message
            });
        }
    }

    // useEffect(() => { //TODO: Temporarily disabled due to the lack of data #FE-735
    //     if (marketsFilter.options.length > 0 && providersFilter.options.length > 0) {
    //         handleMarketSelectedResult([])
    //         handleProviderSelectedResult([])
    //     }
    // }, [marketsFilter, providersFilter]);

    const modifyParticipant = (data: EventDetailDataModel, newParticipants: SubscriptionParticipantModel[]) => {
        const prevStateHome = data.participants[0]
        const prevStateAway = data.participants[1]
        if (!prevStateHome?.id || !prevStateAway?.id) return data
        const participantMap = new Map(newParticipants.map(participant => [participant.id, participant]))
        const homeParticipant = participantMap.get(prevStateHome.id)
        const awayParticipant = participantMap.get(prevStateAway.id)

        const updateCards = (card: CardModel, prevStateCards?: CardModel[]): CardModel[] => {
            return prevStateCards?.map(prevCard => {
                if (prevCard.cardType !== card.cardType) return prevCard
                return updateParticipantCard(card, prevCard)
            }) ?? []
        }

        const updateParticipant = (prevParticipant: ParticipantDataModel, newParticipant?: SubscriptionParticipantModel): ParticipantDataModel => {
            return {
                ...prevParticipant,
                ...(newParticipant ? {
                    ...(hasValidNumber(newParticipant.score) ? {score: newParticipant.score!} : undefined),
                    ...(hasValidNumber(newParticipant.corner) ? {corner: newParticipant.corner!} : undefined),
                    ...(newParticipant.card ? {cards: updateCards(newParticipant.card, prevParticipant.cards)} : undefined),
                    ...(newParticipant.extraScores ? {extraScores: updateParticipantExtraScore(newParticipant.extraScores, prevParticipant.extraScores)} : undefined),
                } : undefined)
            };
        };

        const newHomeParticipant = updateParticipant(prevStateHome, homeParticipant)
        const newAwayParticipant = updateParticipant(prevStateAway, awayParticipant)
        return {
            ...data,
            participants: [newHomeParticipant, newAwayParticipant]
        }
    }
    const onStatsSubscript = (statses: SubscriptionStatsModel[]) => {
        const newParticipants = statses.filter(states => states.eventId === eventId).map(state => state.participant);
        subscriptBuffer.addData({participant: newParticipants})
    }

    const modifyInfo = (data: EventDetailDataModel, info: SubscriptionInfoModel) => {
        const {runningReceiveTime, runningTime, isClockRunning} = info
        return {
            ...data,
            ...(runningReceiveTime ? {runningReceiveTime} : undefined),
            ...(runningTime ? {runningTime} : undefined),
            ...(isClockRunning !== null ? {isClockRunning} : undefined),
        };
    }
    const onInfoSubscriptCallBack = (infos: SubscriptionInfoModel[]) => {
        const info = infos.find(info => info.eventId === eventId)
        if (!info) return
        subscriptBuffer.addData({info: info})
    }

    const addSubscriptions = (id: string) => {
        const ids = [id];
        infoAdd(ids);
        statsAdd(ids);
    };

    const removeSubscriptions = (id: string) => {
        const ids = [id];
        infoRemove(ids);
        statsRemove(ids);
    };

    useEffect(() => {
        if (eventId) {
            infoSubscription.current = {onSubscript: onInfoSubscriptCallBack}
            statsSubscription.current = {onSubscript: onStatsSubscript}

            addSubscriptions(eventId)
            getData();
        }
        return () => {
            if (eventId) {
                removeSubscriptions(eventId)
            }
            infoSubscription.current = undefined
            statsSubscription.current = undefined
        }
    }, [eventId])

    useEffect(() => {
        if (marketsData.length > 0) { //TODO: This is a temporary solution. Might to be removed after the demo #FE-735
            // To sync up initial data with components since they are not really returning true selecting status back to real world.
            const _defaultMarket = defaultMarket(sportType, eventType === EventType.inPlay);
            const displayedMarket = marketsData.filter(market => _defaultMarket.includes(market.marketType.toLowerCase()));
            if (displayedMarket.length > 0) {
                const filterButtonData = getStatusButtonList(displayedMarket);
                setDisplayFilterButtons(filterButtonData);
                setStatusButtonGroup(filterButtonData)
            }
        }
    }, [marketsData, sportType]);

    useEffect(() => {
        const participants = detailData?.participants
        if (participants) {
            const homeParticipant = participants.find(participant => participant.isHome) ?? defaultParticipant
            const awayParticipant = participants.find(participant => !participant.isHome) ?? defaultParticipant
            setHomeParticipant(homeParticipant)
            setAwayParticipant(awayParticipant)
        }

        const runningTime = detailData?.runningTime?.split(' ')[1]
        if (runningTime) {
            const parsedRunningTime = Number(runningTime)
            const duration = detailData?.runningReceiveTime
                ? calculateElapsedRunningTime(detailData.runningReceiveTime, parsedRunningTime)
                : parsedRunningTime
            setDuration(duration)
        }
        setIsClockRunning(prevState => {
            const isClockRunning = detailData?.isClockRunning ?? false
            if (prevState === isClockRunning) return prevState
            return isClockRunning
        })
        const periodName = EventPeriodName(intl, detailData?.runningTime?.split(' ')?.[0] ?? '')
        setPeriodName(prevState => {
            if (prevState === periodName) return prevState
            return periodName
        })

    }, [detailData]);

    const handleMarketSelectedResult = useCallback((markets: string[]) => {
        const selectedMarkets = marketsData.filter(market => markets.includes(market.marketName))
        const filterButtonsData = getStatusButtonList(selectedMarkets)
        setDisplayFilterButtons(filterButtonsData)
        setStatusButtonGroup(filterButtonsData)
    }, [displayFilterButtons, marketsFilter]);

    const handleProviderSelectedResult = useCallback((providers: string[]) => {
        if (providers.length === 0) {
            setSelectedProviders(providersFilter.options)
        } else {
            setSelectedProviders(providers);
        }
    }, [providersFilter]);

    const handleStatusButtonOnClick = useCallback((statusItem: StatusItem | undefined) => {
        if (statusItem) {
            setSelectedMarket(statusItem);
        }
    }, []);

    const toggleSubPage = useCallback(() => setSubPagePop(!subPagePop),[subPagePop]);

    const [selectedMarketId, setSelectedMarketId] = useState<string>()
    const onClickMarketSetting = useCallback((id: string) => {
        setSelectedMarketId(id)
        toggleSubPage()
    },[toggleSubPage])
    const handleActionButtonOnClick = (item: ActionItem, index: number) => {
        let status = '';

        switch (index) {
            case Action.ALL_MARKET_SETTINGS:
                setSelectedMarketId('')
                toggleSubPage();
                return;
            case Action.CLOSE_ALL:
                status = 'CLOSE';
                break;
            case Action.SUSPENDED_ALL:
                status = 'SUSPENDED';
                break;
            default:
                return;
        }

        if (status) {
            setIsLoading(true);
            updateEventStatus([eventId], status)
                .then()
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };

    const onClickPlayByPlayLogButton = () => {
        normalProvider.normalNavigation(
            `${pathname}/playByPlayLog`,
            {
                'sportType': sportType, 'eventType': eventType, 'sportId': detailData?.sportId
            });
    }

    const onClickAcceptData = useCallback((event: MuiEvent) => {
        const newParams: GetBetSlipsFromEvent = {
            ...((detailData?.sportId && sportName) &&
                {sportIds: {sportId: detailData?.sportId, sportName: firstCharToUpperCase(sportName)},}),
            eventType: eventType as EventType,
            marketIds: [{marketId: selectedMarket.key, marketName: selectedMarket.text}],
            providerNames: selectedProviders,
            eventId: eventId
        }
        betSlipProvider.betSlipNavigation(newParams, PageType.BetSlip)
    },[betSlipProvider, detailData?.sportId, eventId, eventType, selectedMarket.key, selectedMarket.text, selectedProviders, sportName])

    return {
        isLoading,
        detailData,
        periodName,
        startDate,
        actions,
        allMarketStatusItems,
        marketsFilter,
        providersFilter,
        displayFilterButtons,
        statusButtonGroup,
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
        home: homeParticipant,
        away: awayParticipant,
        currentMatchState,
        marketsData,
        marketGroups
    }
}

export default useEventDetailViewModel