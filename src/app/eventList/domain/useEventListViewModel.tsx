import {
    toEventListProps,
    toGetEventPinsProps,
    toUpdateAutoPayoutProps,
    toUpdateEventPinsProps
} from "@/app/eventList/models/RequestDataMapping";
import {EventQueryParameters} from "@/app/eventList/models/EventQueryParameters";
import useEventRepository from "@/services/@event/repository/useEventRepository";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    ApplyTemplate,
    BetModel,
    CardModel,
    ConfigurationModel,
    EventDataModel,
    EventListModel,
    LeagueModel,
    OddDataModel,
    OddModel,
    ParticipantDataModel
} from "@/services/@core/module/ResponseDataModels";
import {GridCellParams, GridRowId} from "@mui/x-data-grid";
import {usePathname} from "next/navigation";
import {ActionItem} from "@/modules/components/buttons/actionButton/ActionButton";
import {GridColumnOrderChangeParams, MuiEvent, useGridApiRef} from "@mui/x-data-grid-pro";
import {GridCallbackDetails} from "@mui/x-data-grid/models/api";
import {checkboxSelection, oddsEventColumns as columns, skipField} from "@/app/eventList/components/oddsEventColumns";
import {QuickActionLabel} from "@/modules/components/eventTable/QuickAction";
import {toEventUpdateStatus, toOddsMarketStatusProps} from "@/app/eventDetail/models/RequestDataMapping";
import {AlertDialogProps, buildAlertDialogProps} from "@/modules/components/dialog/AlertDialog";
import {GlobalController} from "@/modules/common/GlobalController";
import lodash, {debounce} from "lodash";
import {
    defaultEventQueryParamsReplace,
    DefaultEventTypes,
    filterNewAndUpdatedOdds,
    markMostBalance,
    oddsSort,
    setNewAndUpdatedOdds,
    updateBetSlips,
    updateParticipantCard,
    updateParticipantExtraScore
} from "@/services/@event/useCase";
import PermissionHandler from "@/modules/common/PermissionHandler";
import useChannelRepository from "@/services/@channel/respository/useChannelRepository";
import {toGetConfigurationProps} from "@/app/configuration/models/RequestDataMapping";
import {useNavigationProvider} from "@/utils/NavigationProvider";
import {MarketSettingProps} from "@/app/eventDetail/components/pageComponent/MarketSetting";
import IdentityHandler from "@/modules/common/IdentityHandler";
import {OptionItem, SelectedOptions} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import store, {setOddsDisplay} from "@/modules/common/IdentityRedux";
import {EventStartTimeData} from "@/modules/components/buttons/multipleFilterButton/pageComponent/EventStartTime";
import useOddsAdjustment from "@/services/@odds/socket/useOddsAdjustment";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {EventMarketStatus, EventType, PageType} from "@/services/@core/module/Enum";
import {useMemorizeState} from "@/utils/useMemorizeState";
import {useMemorizeRef} from "@/utils/useMemorizeRef";
import {PageState, useStateContext} from "@/utils/StateContext";
import {GetBetSlipsFromEvent} from "@/app/betSlip/components/models/BetSlipParameters";
import {firstCharToUpperCase} from "@/modules/common/DisplayFormatConverter";
import isEqual from "lodash/isEqual";
import {getMarketNameMappings} from "@/app/eventList/models/marketMappings";
import useInfoSubscription, {SubscriptionInfoModel} from "@/services/@odds/socket/events/useInfoSubscription";
import useStatsSubscription, {SubscriptionStatsModel} from "@/services/@odds/socket/events/useStatsSubscription";
import {RightDrawerProps} from "@/modules/components/drawer/RightDrawer";
import {OddsMarketStatusParameter} from "@/app/eventDetail/models/OddsMarketStatusParameter";
import useOddsRepository from "@/services/@odds/respository/useOddsRepository";
import MarketDrawerContent from "@/app/eventList/components/pageComponent/MarketDrawerContent";
import {OtherLinesDrawerContentProps} from "@/app/eventList/components/pageComponent/OtherLinesDrawerContent";
import {Timeout} from "react-number-format/types/types";
import {EventStatus} from "@/services/@core/module/EventStatus";
import useEventOddsStatusSubscription, {
    SubscriptionEventOddsStatusModel
} from "@/services/@odds/socket/events/useEventOddsStatusSubscription";
import useEventTypeAlertSubscription, {
    SubscriptionEventTypeAlertModel
} from "@/services/@odds/socket/events/useEventTypeAlertSubscription";
import {hasValidNumber} from "@/utils/tools";
import {DataBuffer} from "@/utils/DataBuffer";
import {DropdownSearch} from "@/modules/components/DropdownInput/DropdownInput";
import {datadogLogs} from "@/config/Datadog";
import useOddsSubscription, {SubscriptionOddsModel} from "@/services/@odds/socket/events/OddsSubscriptionProvider";

const enum Action {
    PinEvents,
    CloseAllEventMarkets,
    SuspendedAllEventMarkets
}

interface TimerMap {
    [key: string]: Timeout
}

interface DefaultLabelMap {
    [key: string]: string[]
}

interface SubscriptionData {
    odds?: SubscriptionOddsModel[]
    info?: SubscriptionInfoModel[]
    clearDangerBall?: SubscriptionInfoModel[]
    stats?: SubscriptionStatsModel[]
    status?: SubscriptionEventOddsStatusModel[]
}

export const removeZeroZeroFromBaseLine = (baseLine: string | null | undefined): string | null | undefined => {
    return baseLine ? baseLine.replace(/\(\d+-\d+\)/g, "").trim() : baseLine;
};

const removeZeroZeroFromBetsLine = (bets: BetModel[]): BetModel[] => {
    return bets.map((bet) => ({
        ...bet,
        line: bet.line ? bet.line.replace(/\(\d+-\d+\)/g, "").trim() : bet.line
    }));
};

export const updateOdds = (oddsItem: OddModel): OddModel => {
    const updatedBaseLine = removeZeroZeroFromBaseLine(oddsItem.baseLine);
    const updatedBets = removeZeroZeroFromBetsLine(oddsItem.bets);
    return {
        ...oddsItem,
        baseLine: updatedBaseLine ?? '',
        bets: updatedBets,
    };
};

const filterBaseLineAndLineForMarket = (market: OddDataModel): OddDataModel => {
    if (market.marketName === "Asian Handicap" || market.marketName === "Asian Handicap Including Overtime") {
        const updatedOdds = (market.odds ?? []).map(updateOdds);
        return {
            ...market,
            odds: updatedOdds,
        };
    }
    return market;
};

const useEventListViewModel = (sportId: string, sportType: string, sportName: string) => {
    // repos and subscriptions
    const eventRepo = useEventRepository();
    const channelRepo = useChannelRepository();
    const oddsRepo = useOddsRepository()
    const {adjustment} = useOddsAdjustment()
    const {add: oddsAdd, remove: oddsRemove, odds} = useOddsSubscription()
    const {add: infoAdd, remove: infoRemove, infoSubscription} = useInfoSubscription()
    const {add: statsAdd, remove: statsRemove, statsSubscription} = useStatsSubscription()
    const {add: statusAdd, remove: statusRemove, statusSubscription} = useEventOddsStatusSubscription()
    const {add: eventTypeAdd, remove: eventTypeRemove, eventTypeSubscription} = useEventTypeAlertSubscription()

    const onStatsSubscriptCallBack = (statuses: SubscriptionStatsModel[]) => {
        addDataToBuffer({stats: statuses})
    }
    const onStatusSubscriptCallBack = (statuses: SubscriptionEventOddsStatusModel[]) => {
        addDataToBuffer({status: statuses})
    }
    const onInfoSubscriptCallBack = (infos: SubscriptionInfoModel[]) => {
        addDataToBuffer({info: infos})

        if (infos.some(info => info.dangerBall)) {
            const tag = Date.now()
            const timeout = setTimeout(() => {
                addDataToBuffer({clearDangerBall: infos.filter(info => info.dangerBall)})
                if (timerMap.current[tag]) {
                    const copy = {...timerMap.current}
                    delete copy[tag]
                    timerMap.current = copy
                }
            }, 3000)
            timerMap.current = {
                ...timerMap.current,
                [tag]: timeout
            }
        }
    }
    const onEventTypeSubscriptCallBack = (eventTypeAlerts: SubscriptionEventTypeAlertModel[]) => {
        const hasUpdate = eventTypeAlerts.some(eventType => {
            return eventType.sportType.toUpperCase() === sportType.toUpperCase() && eventType.eventType === queryParams.eventType
        })
        if (hasUpdate) {
            handleQueryChange({
                page: queryParams.page
            })
        }
    }

    infoSubscription.current = {onSubscript: onInfoSubscriptCallBack}
    statsSubscription.current = {onSubscript: onStatsSubscriptCallBack}
    statusSubscription.current = {onSubscript: onStatusSubscriptCallBack}
    eventTypeSubscription.current = {onSubscript: onEventTypeSubscriptCallBack}

    // subscription
    const subscriptionDataBuffer = new DataBuffer<SubscriptionData>(
        (newData, buffer) => {
            return [...buffer, newData]
        },
        (mergedData) => {
            updateEventList(updateEvent, mergedData)
        },
        300
    )
    const subscriptionDataBufferRef = useRef(subscriptionDataBuffer)
    const addDataToBuffer = (data: SubscriptionData) => {
        subscriptionDataBufferRef.current.addData(data);
    };
    if (odds.length > 0) addDataToBuffer({odds: odds})


    // user role check
    const {userRole, currentPathName, oddsDisplay} = IdentityHandler();
    const {isEditable: checkEdit} = PermissionHandler();
    const isEditable = checkEdit(userRole, currentPathName);

    // formatters
    const intl = useIntl()
    const funType = LocalizationFunctionType.Event
    const funCommonType = LocalizationFunctionType.Common
    const eventTypeList: { key: string, text: string, type: string }[] = DefaultEventTypes(intl)

    // global settings
    const globalController = GlobalController.getInstance()
    const {normalProvider, betSlipProvider} = useNavigationProvider()


    const updateEventsStatus = async (eventIds: string[], status: string) => {
        return await eventRepo.updateEventsStatus(toEventUpdateStatus(eventIds, status))
    }

    const updateEventPins = async (eventIds: string[], pin: boolean) => {
        return await eventRepo.updateEventPins(toUpdateEventPinsProps(eventIds, pin))
    }


    // url params
    const getStateQueryParams = () => pageState.get(`${sportType}_queryParams`) as PageState
    const pageState = useStateContext()
    const defaultEventTypeIndex = getStateQueryParams()?.eventType ? eventTypeList.findIndex(item => item.key === getStateQueryParams()?.eventType) : 0
    const lastSportId = getStateQueryParams()?.sportId
    const dataKey = 'headerName'
    const pathname = usePathname();
    const [queryParams, setQueryParams] = useMemorizeState<EventQueryParameters>(`${sportType}_queryParams`, {
        eventType: eventTypeList[defaultEventTypeIndex].key,
        sportId: sportId,
        page: 1,
        pageSize: 10,
    }, () => lastSportId !== sportId);


    // view model properties
    const dataGridRef = useGridApiRef();


    // UI state
    const [loading, setLoading] = useState(false);
    const [allDisplayTypes, setAllDisplayTypes] = useMemorizeState<string[]>(`${sportType}_allDisplayTypes`, []);
    const [actions, setActions] = useMemorizeState<ActionItem[]>(`${sportType}_actions`, [], () => {
        return lastSportId !== sportId
    });
    const [canClean, setCanClean] = useMemorizeState(`${sportType}_canClean`, (queryParams.searchValue?.length ?? 0) +
        (queryParams.locationIds?.length ?? 0) +
        (queryParams.leagueIds?.length ?? 0) +
        (queryParams.statuses?.length ?? 0) +
        (queryParams.startDate ?? 0) +
        (queryParams.endDate ?? 0)
        > 0);



    const eventListRef = useMemorizeRef<EventListModel>(`${sportType}_eventList`, {totalElements: 0, content: []});
    const [selectedEvent, setSelectedEvent] = useMemorizeState<EventDataModel[]>(`${sportType}_selectedEvent`, [], () => {
        return lastSportId !== sportId
    });
    const [isCollapse, setIsCollapse] = useMemorizeState<boolean>(`${sportType}_isCollapse`, false);
    const [showMarketSetting, setShowMarketSetting] = useState(false)
    const [showOtherLinesDrawer, setShowOtherLinesDrawer] = useState(false)
    const [onlyPin, setOnlyPin] = useMemorizeState<boolean>(`${sportType}_onlyPin`)
    const [showTemplateDialog, setShowTemplateDialog] = useState<boolean>(false)
    const [isBarChartClicked, setIsBarChartClicked] = useState<boolean>(false)
    const [showRightDrawer, setShowRightDrawer] = useState(false)
    const [rightDrawerProps, setRightDrawerProps] = useState<Omit<RightDrawerProps, 'open' | 'setOpen'>>()
    const currentSearch = useRef<DropdownSearch>()

    const disableColumnResize = true
    // Store complete order history of all known fields
    const orderHistoryRef = useRef<string[]>();

    const [configuration, setConfiguration] = useMemorizeState<ConfigurationModel>(`${sportType}_configuration`);
    const [displayEventList, setDisplayEventList] = useState<EventListModel>({totalElements: 0, content: []});
    const displayEventListRef = useRef<EventListModel>(displayEventList); //For subscriptionDataBuffer
    const pinEventList = useMemorizeRef<EventDataModel[]>(`${sportType}_pinEventList`, []);
    const [pinEventIds, setPinEventIds] = useMemorizeState<string[]>(`${sportType}_pinEventIds`, []);
    const [rowSelectionModel, setRowSelectionModel] = useMemorizeState<GridRowId[]>(`${sportType}_rowSelectionModel`, [], () => {
        return lastSportId !== sportId
    });
    const [leagueModels, setLeagueModels] = useMemorizeState<LeagueModel[]>(`${sportType}_leagueModels`, [])
    const leagueModelsRef = useRef<LeagueModel[]>(leagueModels);
    const [filterSelected, setFilterSelected] = useMemorizeState<SelectedOptions<any>>(`${sportType}_filterSelected`, {});
    const [marketSettingProps, setMarketSettingProps] = useState<MarketSettingProps>({
        eventType: eventTypeList[defaultEventTypeIndex].key,
        sportId: sportId,
        sportType: sportType,
        sportName: sportName
    })

    const {marketNameObj} = getMarketNameMappings(sportType, queryParams.eventType === EventType.inPlay);

    const [otherLinesDrawerContent, setOtherLinesDrawerContent] = useState<OtherLinesDrawerContentProps>({
        title: '',
        subTitle: '',
        homeName: '',
        awayName: '',
        homeParticipantEnName: '',
        awayParticipantEnName: '',
        eventId: '',
        marketName: '',
        marketType: '',
        marketId: '',
        marketStatus: '',
        provider: '',
        odds: []
    })
    const lastRequestKey = useRef<number>(0)

    const [applyTemplate, setApplyTemplate] = useState<ApplyTemplate & { eventType: string }>({
        eventType: eventTypeList[defaultEventTypeIndex].key,
        templateId: '', templateName: ''
    })
    const previousDisplayIds = useRef<string[]>([]);
    const previousDisplayMarketMap = useRef<Map<string, string[]>>();
    const timerMap = useRef<TimerMap>({});

    const [defaultLabels, setDefaultLabels] = useMemorizeState<DefaultLabelMap>(`${sportType}_defaultLabels`)
    const [showDialog, setShowDialog] = useState(false)
    const [dialogProps, setDialogProps] = useState<AlertDialogProps>({
        title: "", content: "", actions: []
    })

    const searchOption: ActionItem[] = [{
        key: 'EVENT_NAME', value: intl.formatMessage({id: `${funType}.searchEvent`, defaultMessage: 'Event'})
    }, {
        key: 'EVENT_ID', value: intl.formatMessage({id: `${funType}.searchEventID`, defaultMessage: 'Event ID'})
    }]

    const allActions: { [n: number]: ActionItem } = {
        0: {
            key: Action.PinEvents,
            value: intl.formatMessage({id: `${funType}.action.pinEvents`, defaultMessage: 'Pin events'})
        },
        1: {
            key: Action.CloseAllEventMarkets,
            value: intl.formatMessage({
                id: `${funType}.action.closeAllEventMarkets`,
                defaultMessage: 'Close all event markets'
            })
        },
        2: {
            key: Action.SuspendedAllEventMarkets,
            value: intl.formatMessage({
                id: `${funType}.action.suspendedAllEventMarkets`,
                defaultMessage: 'Suspended all event markets'
            })
        }
    }

    const selectedClear = () => {
        setSelectedEvent([])
        setRowSelectionModel([])
    }
    const priceChangedDebounceMap = new Map<string, (price: number, originalPrice: number) => void>();
    const lastSubscriptionEventType = useRef<string>();


    const handleBarChartClick = (event: React.MouseEvent) => {
        setIsBarChartClicked(true)
    }

    const handleCopyButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, text: string) => {
        event.stopPropagation();
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Text copied to clipboard: ', text);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                datadogLogs.logger.error('Failed to copy text', {text: text}, err instanceof Error ? err : new Error(String(err)));
            });
    }

    const handleCollapse = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsCollapse(!isCollapse)
    }
    const handleTemplateBtnClick = (template: ApplyTemplate) => {
        setApplyTemplate({
            eventType: queryParams.eventType,
            ...template
        })
        setShowTemplateDialog(true)
    }


    const handleRightDrawer = (props: Omit<RightDrawerProps, 'open' | 'setOpen'>) => {
        setRightDrawerProps({
            title: props.title,
            subTitle: props.subTitle,
            children: props.children,
        })
        setShowRightDrawer(true)
    }

    const handleOtherLinesContentProgressBarClick = useCallback((eventId: string, marketId: string, marketName: string) => {
        const requestParams: GetBetSlipsFromEvent = {
            marketIds: marketId && marketName ? [{marketId, marketName}] : [],
            eventId: eventId
        }

        betSlipProvider.betSlipNavigation(requestParams, PageType.BetSlip)
    }, [])


    const updateMarketSetting = (id: string) => {
        setMarketSettingProps({
            eventId: id,
            eventType: queryParams.eventType,
            sportId: sportId,
            sportType: sportType,
            sportName: sportName,
            leagueId: eventListRef.current.content.find(event => event.eventId === id)?.leagueId,
            leagueName: eventListRef.current.content.find(event => event.eventId === id)?.leagueName
        })
    }
    const clearMarketSetting = () => {
        setMarketSettingProps({
            eventType: queryParams.eventType,
            sportId: sportId,
            sportType: sportType,
            sportName: sportName,
        })
    }

    const resetLeagues = () => {
        setLeagueModels([])
        handleQueryChange({
            leagueIds: undefined,
        })
    }

    const handleEventTypeChange = (_: number, key: string) => {
        selectedClear()
        resetLeagues()
        handleQueryChange({
            eventType: key,
        })
    }

    const handleSearch = (type: string, value: string) => {
        currentSearch.current = {
            type: type,
            value: value
        }
        handleQueryChange({
            searchType: (value !== '') ? searchOption.find(item => item.value === type)?.key : undefined,
            searchValue: (value !== '') ? value : undefined,
        })
    }

    const handleLeague = (value: OptionItem[]) => {
        const newLeagues = value.map(item => ({
            leagueId: item.id,
            leagueName: item.name
        }));

        const isLeagueExisting = (existingLeagues: { leagueId: string }[], newLeague: { leagueId: string }) =>
            !existingLeagues.some(existingLeague => existingLeague.leagueId === newLeague.leagueId);

        setLeagueModels(prevState => {
            const filteredNewLeagues = newLeagues.filter(newLeague => isLeagueExisting(prevState, newLeague));
            return [...prevState, ...filteredNewLeagues];
        });

        handleQueryChange({
            leagueIds: value.map(item => item.id),
        });
    };

    useEffect(() => {
        leagueModelsRef.current = leagueModels;
    }, [leagueModels]);

    const handleActionClick = useCallback((item: ActionItem) => {
        switch (item.key) {
            case Action.PinEvents:
                updateEventPins(rowSelectionModel as string[], true).then(resp => {
                    selectedClear()
                    handleQueryChange({
                        page: queryParams.page
                    })
                })
                break;
            case Action.CloseAllEventMarkets:
                showCloseDialog(rowSelectionModel as string[])
                break;
            case Action.SuspendedAllEventMarkets:
                showSuspendedDialog(rowSelectionModel as string[])
                break;
        }
    }, [rowSelectionModel, updateEventPins, updateEventsStatus]);


    const onCellClick = (params: GridCellParams, event: MuiEvent, details: GridCallbackDetails) => {
        const clickedDeepDOM = (event as unknown as React.MouseEvent).target as HTMLElement;
        const marketName = marketNameObj[params.colDef.field]

        if (clickedDeepDOM.id === 'accept-data' || (isBarChartClicked && params.field === 'betSlips')) {
            const marketArr = params.row.oddsData;
            const marketId = marketArr.find((market: any) => market.marketName === marketName)?.marketId;

            const newParams: GetBetSlipsFromEvent = {
                eventType: queryParams.eventType as EventType,
                sportIds: {sportId, sportName: firstCharToUpperCase(sportName)},
                ...(queryParams.endDate && {endDate: queryParams.endDate}),
                ...(queryParams.startDate && {startDate: queryParams.startDate}),
                marketIds: marketId && marketName ? [{marketId, marketName}] : [],
                eventId: params.row.eventId
            }

            betSlipProvider.betSlipNavigation(newParams, PageType.BetSlip)
            return
        }

        if (!skipField.includes(params.field)) {
            normalProvider.normalNavigation(`${pathname}/${params.row.eventId}`, {
                eventType: queryParams.eventType,
                sportId: sportId,
                sportType: sportType
            })
        }
    }

    const handlePriceChanged = (betId: string, price: number, originalPrice: number) => {
        if (!priceChangedDebounceMap.has(betId)) {
            const debouncedFn = debounce((price: number, originalPrice: number) => {
                adjustment({
                    eventType: queryParams.eventType,
                    betId,
                    price,
                    originalPrice,
                });
            }, 500);

            priceChangedDebounceMap.set(betId, debouncedFn);
        }

        const debouncedFn = priceChangedDebounceMap.get(betId);
        debouncedFn!(price, originalPrice);
    };


    const handleColumnOrderChange = (params: GridColumnOrderChangeParams) => {
        if (params.targetIndex === params.oldIndex) return;

        const checkBoxOffset = checkboxSelection ? 1 : 0;

        // Adjust indices to account for checkbox column
        const oldIndex = params.oldIndex - checkBoxOffset;
        const targetIndex = params.targetIndex - checkBoxOffset;

        // Update the order history to reflect the new position
        const fields = orderHistoryRef.current!;
        const [movedField] = fields.splice(oldIndex, 1);
        fields.splice(targetIndex, 0, movedField);

        orderHistoryRef.current = fields;
    };

    const updateMarketStatus = async (prop: OddsMarketStatusParameter) => {
        return await oddsRepo.updateOddsMarketStatus(toOddsMarketStatusProps(prop));
    };

    const handleMoreLine = useCallback((displayMarketName: string, eventId: string, marketId: string) => {
        const event = displayEventList.content.find(event => event.eventId === eventId)
        if (!event) return
        const {oddsData, eventSuspendedStatus, leagueName, participants} = event;
        const market = oddsData.find(market => market.marketId === marketId)
        if (!market) return
        const marketName = market.marketName
        const oddsList = market.odds ?? [];
        if (oddsList.length === 0) return
        const odds = oddsList?.at(0)
        if (!odds) return
        const title = `[${eventId}] ${leagueName}`
        const home = participants.find((participant: Omit<ParticipantDataModel, 'eventSuspendedStatus'>) => participant.isHome)
        const away = participants.find((participant: Omit<ParticipantDataModel, 'eventSuspendedStatus'>) => !participant.isHome)

        setOtherLinesDrawerContent(prevState => ({
            title: displayMarketName,
            subTitle: title,
            homeName: home?.name ?? '',
            awayName: away?.name ?? '',
            homeParticipantEnName: home?.participantEnName ?? '',
            awayParticipantEnName: away?.participantEnName ?? '',
            eventId: eventId,
            marketName: marketName,
            marketId: market.marketId,
            marketStatus: market.marketSuspendedStatus,
            eventStatus: eventSuspendedStatus,
            provider: market.provider,
            odds: oddsList ?? [],
            displayType: oddsDisplay,
            marketType: market.marketType,
        }))
        if (otherLinesDrawerContent) setShowOtherLinesDrawer(true)
    }, [configuration, displayEventList, handleOtherLinesContentProgressBarClick, oddsDisplay])

    const handleMarketActiveChange = useCallback((eventId: string, marketId: string, providers: string[], status: string) => {
        const requestProps: OddsMarketStatusParameter = {
            eventId: eventId,
            marketId: marketId,
            providers: providers,
            status: status,
        }
        updateMarketStatus(requestProps).then(() => {
            setDisplayEventList((prevState) => {
                const newState = {
                    ...prevState,
                    content: prevState.content.map(event => {
                        if (event.eventId === eventId) {
                            return {
                                ...event,
                                oddsData: event.oddsData.map(market => {
                                    if (market.marketId === marketId) {
                                        return {
                                            ...market,
                                            marketSuspendedStatus: status,
                                            odds: markMostBalance(oddsSort(market.odds?.map(odd => ({
                                                ...odd,
                                                oddsSuspendedStatus: status
                                            })) ?? []))
                                        }
                                    }
                                    return market
                                })
                            }
                        }
                        return event
                    })
                }
                if (isEqual(prevState, newState)) return prevState
                return newState
            })
        });
    }, [displayEventList, otherLinesDrawerContent, setDisplayEventList, updateMarketStatus]);

    const filterBaseLineAndLine = (event: EventDataModel): EventDataModel => {
        if (queryParams.eventType) {
            const updatedOddsData = event.oddsData.map(filterBaseLineAndLineForMarket);

            return {
                ...event,
                oddsData: updatedOddsData,
            };
        }
        return event;
    };

    const combineEvent = (eventList: EventListModel, pinEventList: EventDataModel[]) => {
        eventListRef.current = eventList
        const pinEventIds = new Set(pinEventList.map(event => event.eventId));
        const filteredEventList = eventList.content.filter(event => !pinEventIds.has(event.eventId));
        const displayEventList: EventListModel = {
            totalElements: eventList.totalElements,
            content: modifyOdds([...pinEventList, ...filteredEventList].map(item => filterBaseLineAndLine(item)), odds)
        };
        setDisplayEventList(prevState => {
            if (isEqual(prevState, displayEventList)) return prevState
            return displayEventList
        });
    }

    const getData = useCallback(() => {
        if (queryParams.sportId !== sportId) return
        const setupConfig = (config: ConfigurationModel) => {
            setConfiguration(prevState => {
                return config
            })
            if (!oddsDisplay || oddsDisplay === '') {
                const defaultDisplay = config.oddsFormat.display[0] || config.oddsFormat.options[0] || 'Decimal';
                store.dispatch(setOddsDisplay(defaultDisplay));
            }
            setAllDisplayTypes(config.oddsFormat.display)
        }

        setLoading(true);
        const randomKey = Math.random()
        lastRequestKey.current = randomKey
        const apis: Promise<any>[] = [
            eventRepo.getEventPins(toGetEventPinsProps(queryParams.sportId, queryParams.eventType)),
            eventRepo.getEventList(toEventListProps({...queryParams, displayPin: false})),
            channelRepo.getConfiguration(toGetConfigurationProps({eventType: queryParams.eventType}))
        ]
        Promise.all(apis).then((result) => {
            const [pinList, eventList, config] = result
            if (lastRequestKey.current !== randomKey) return
            if (!lodash.isEqual(pinEventList.current, pinList)) {
                pinEventList.current = modifyOdds(pinList, odds)
                setPinEventIds((pinList as EventDataModel[]).map(event => event.eventId))
            }
            setupConfig(config)
            combineEvent({
                ...eventList,
                content: eventList.content
            }, pinList)
        }).catch(() => {
            // not going to handle it because of the error will only be api cancel for now.
        }).finally(() => {
            if (lastRequestKey.current !== randomKey) return
            setLoading(false)
        })
    }, [queryParams, configuration, lastRequestKey.current, odds, onlyPin]);


    const updateEvent = (events: EventDataModel[], mergedData: SubscriptionData[]) => {
        let modifiedEvents = events
        mergedData.forEach(data => {
            if (data.odds) {
                modifiedEvents = modifyOdds(modifiedEvents, data.odds)
            }
            if (data.info) {
                modifiedEvents = modifyInfo(modifiedEvents, data.info)
            }
            if (data.clearDangerBall) {
                modifiedEvents = clearDangerBall(modifiedEvents, data.clearDangerBall)
            }
            if (data.stats) {
                modifiedEvents = modifyStats(modifiedEvents, data.stats)
            }
            if (data.status) {
                modifiedEvents = modifyStatus(modifiedEvents, data.status)
            }
        })
        return modifiedEvents
    }

    const modifyOdds = useMemo(() => (events: EventDataModel[], oddsModels: SubscriptionOddsModel[]) => {
        const updateOddsData = (data: OddDataModel, newDatas: SubscriptionOddsModel[]): OddDataModel => {
            const {newLines, updateLines, newStatus} = filterNewAndUpdatedOdds(newDatas, data.odds)
            return {
                ...data,
                ...(newStatus ? {marketSuspendedStatus: newStatus} : undefined),
                odds: setNewAndUpdatedOdds(newLines, updateLines, newStatus, data.odds)
            }
        };

        return events.map(event => {
            if (!oddsModels.some(odds => odds.eventId)) return event;
            const newDatas = oddsModels.filter(odds => odds.eventId === event.eventId);
            const homeName = newDatas.find(data => data.homeName)?.homeName;
            const awayName = newDatas.find(data => data.awayName)?.awayName;
            return {
                ...event,
                oddsData: event.oddsData.map(data => {
                    const newData = newDatas.filter(newData => newData.marketId === data.marketId)
                    if (newData.length > 0) {
                        return updateOddsData(data, newData)
                    }
                    return data
                }),
                ...(homeName || awayName ? {
                    participants: event.participants.map(participant => {
                        if (homeName && participant.isHome) {
                            return {
                                ...participant,
                                name: homeName
                            }

                        } else if (awayName && !participant.isHome) {
                            return {
                                ...participant,
                                name: awayName
                            }
                        }
                        return participant
                    })
                } : undefined),
            };
        });
    }, [])

    const modifyInfo = useMemo(() => (events: EventDataModel[], infos: SubscriptionInfoModel[]) => {
        const infoMap = new Map(infos.map(info => [info.eventId, info]));
        const updateEvent = (events: EventDataModel[]) => {
            const updateStatus = (event: EventDataModel) => {
                const info = infoMap.get(event.eventId)
                if (!info || event.eventId !== info.eventId) return event;
                const {dangerBall, status, runningTime, runningReceiveTime, isClockRunning, betSlips} = info
                return {
                    ...event,
                    ...(dangerBall ? {dangerBallState: dangerBall} : undefined),
                    ...(status ? {status: EventStatus[status]} : undefined),
                    ...(runningTime ? {runningTime} : undefined),
                    ...(runningReceiveTime ? {runningReceiveTime} : undefined),
                    ...(isClockRunning != null ? {isClockRunning} : {}), // isClockRunning could be false, only check if it's not null
                    ...(betSlips ? {betSlips: updateBetSlips(betSlips, event.betSlips)} : undefined)
                };
            };
            return events.map(updateStatus).filter((event): event is EventDataModel => event !== undefined);
        };
        return updateEvent(events)
    }, [])

    const clearDangerBall = useMemo(() => (events: EventDataModel[], infos: SubscriptionInfoModel[]) => {
        const updateStatus = (event: EventDataModel) => {
            const infoMap = new Map(infos.map(info => [info.eventId, info]));
            const info = infoMap.get(event.eventId)
            if (!(info?.dangerBall) || event.eventId !== info.eventId || event.dangerBallState !== info.dangerBall) return event;
            return {
                ...event,
                dangerBallState: undefined
            };
        };
        return events.map(updateStatus);
    }, [])


    const modifyStats = useMemo(() => (events: EventDataModel[], statses: SubscriptionStatsModel[]) => {
        const updateStats = (event: EventDataModel) => {
            const newDatas = statses.filter(states => states.eventId === event.eventId);
            if (newDatas.length <= 0) return event;
            const statsMap = new Map(newDatas.map(stats => [stats.participant.id, stats.participant]));
            const updateCards = (card: CardModel, prevStateCards?: CardModel[]): CardModel[] => {
                return prevStateCards?.map(prevCard => {
                    if (prevCard.cardType !== card.cardType) return prevCard
                    return updateParticipantCard(card, prevCard)
                }).filter((card): card is CardModel => card !== undefined) ?? []
            }

            return {
                ...event,
                participants: event.participants.map(prev => {
                    const participant = statsMap.get(prev.id);
                    if (!participant) return prev;
                    return {
                        ...prev,
                        ...(participant ? {
                            ...(hasValidNumber(participant.score) ? {score: participant.score!} : undefined),
                            ...(hasValidNumber(participant.corner) ? {corner: participant.corner!} : undefined),
                            ...(participant.card ? {cards: updateCards(participant.card, prev.cards)} : undefined),
                            ...(participant.extraScores ? {extraScores: updateParticipantExtraScore(participant.extraScores, prev.extraScores)} : undefined),
                        } : undefined)
                    };
                }),
            };
        };

        return events.map(updateStats);
    }, [])

    const modifyStatus = useMemo(() => (events: EventDataModel[], statuses: SubscriptionEventOddsStatusModel[]) => {
        const statusMap = new Map((statuses.map(status => [status.eventId, status])));
        const updateStatus = (event: EventDataModel) => {
            const newDatas = statusMap.get(event.eventId);
            if (!newDatas) return event;
            return {
                ...event,
                ...{eventSuspendedStatus: newDatas.eventSuspendedStatus},
                ...(newDatas.markets && newDatas.markets?.length > 0 ? {
                    oddsData: event.oddsData.map(data => {
                        const market = newDatas.markets?.find(market => market.marketId === data.marketId);
                        if (market) {
                            return {
                                ...data,
                                marketSuspendedStatus: market.marketSuspendedStatus
                            };
                        }
                        return data;
                    })
                } : undefined)
            };
        };

        return events.map(updateStatus);
    }, [])


    const updateEventList =
        (updateEvent: (events: EventDataModel[], mergedData: SubscriptionData[]) =>
            EventDataModel[], mergedData: SubscriptionData[]
        ) => {
            const newPin = updateEvent(pinEventList.current, mergedData);
            if (!isEqual(pinEventList.current, newPin)) {
                pinEventList.current = newPin;
            }

            const newContent = updateEvent(eventListRef.current.content, mergedData);
            if (!isEqual(eventListRef.current.content, newContent)) {
                eventListRef.current = {
                    ...eventListRef.current,
                    content: newContent
                };
            }
            setDisplayEventList(_ => {
                const currentEventList = displayEventListRef.current
                const newContent = updateEvent(currentEventList.content, mergedData);
                if (isEqual(currentEventList.content, newContent)) return currentEventList;
                return {
                    ...currentEventList,
                    content: newContent
                };
            });

        }

    const addOddsSubscriptions = (ids: string, marketIds: string[]) => {
        lastSubscriptionEventType.current = queryParams.eventType;
        oddsAdd(ids, marketIds, lastSubscriptionEventType.current);
    }

    const addSubscriptions = (ids: string[]) => {
        infoAdd(ids);
        statsAdd(ids);
        statusAdd(ids);
    };

    const removeSubscriptions = (ids: string[]) => {
        const lastEventType = lastSubscriptionEventType.current;
        if (!lastEventType) return
        if (previousDisplayMarketMap.current) {
            previousDisplayMarketMap.current.forEach((marketIds, eventId) => {
                if (ids.includes(eventId)) {
                    oddsRemove(eventId, marketIds, lastEventType);
                }
            })
        }
        infoRemove(ids);
        statsRemove(ids);
        statusRemove(ids);
    };

    const kickOffTimer = (previousIds: string[], currentIds: string[]) => {
        const removedIds = previousIds.filter(id => !currentIds.includes(id));
        const copy = {...timerMap.current};
        removedIds.forEach(id => {
            if (copy[id]) {
                clearTimeout(copy[id]);
                delete copy[id];
            }
        });
        timerMap.current = copy;
    }

    useEffect(() => {
        displayEventListRef.current = displayEventList
        const displayIds = displayEventList?.content?.map(event => event.eventId) || [];
        if (!isEqual(previousDisplayIds.current, displayIds)) {
            const marketMap = new Map(displayIds.length > 0 ? (displayEventList?.content?.map(event => [event.eventId, event.oddsData.map(odds => odds.marketId)]) ?? []) : [])
            removeSubscriptions(previousDisplayIds.current);
            marketMap.forEach((marketIds, eventId) => {
                addOddsSubscriptions(eventId, marketIds)
            })
            addSubscriptions(displayIds);
            kickOffTimer(previousDisplayIds.current, displayIds);
            previousDisplayIds.current = displayIds;
            previousDisplayMarketMap.current = marketMap;
        }
        if (showOtherLinesDrawer && otherLinesDrawerContent) {
            const event = displayEventList?.content?.find(event => event.eventId === otherLinesDrawerContent.eventId)
            const market = event?.oddsData.find(odd => odd.marketId === otherLinesDrawerContent.marketId)
            const newOdds = market?.odds
            if (event && market && newOdds && !isEqual(otherLinesDrawerContent.odds, newOdds)) {
                setOtherLinesDrawerContent(prevState => ({
                    ...prevState,
                    odds: newOdds,
                    marketStatus: market.marketSuspendedStatus,
                    eventStatus: event.eventSuspendedStatus
                }));
            }
        }
    }, [displayEventList]);

    useEffect(() => {
        eventTypeAdd();
        return () => {
            if (previousDisplayIds.current.length > 0) {
                const ids = [...previousDisplayIds.current];
                removeSubscriptions(ids);
                previousDisplayIds.current = [];
                previousDisplayMarketMap.current = undefined;
            }
            eventTypeRemove()
        };
    }, []);

    const handleDisplayTypeChange = (value: string) => {
        store.dispatch(setOddsDisplay(value))
    };

    const handleOnlyPinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOnlyPin(event.target.checked)
    }

    const showSuspendedDialog = useCallback((ids: string[]) => {
        const title = intl.formatMessage(
            {id: `${funType}.action.suspendTitle`, defaultMessage: 'Suspended Event'}
        );
        const content = intl.formatMessage(
            {
                id: `${funType}.action.suspendContent`, defaultMessage: ids.length > 1
                    ? 'Are you sure you want to suspend those events?\nThe client side will not display those events.'
                    : 'Are you sure you want to suspend this event?\nThe client side will not display this event.'
            },
            {count: ids.length}
        );

        const dialogProps = buildAlertDialogProps(title, content, () => setShowDialog(false), () => {
            updateEventsStatus(ids, 'SUSPENDED').then(() => {
                const message = intl.formatMessage(
                    {
                        id: `${funType}.action.suspendSuccess`, defaultMessage: ids.length > 1
                            ? 'Events have been suspended successfully!'
                            : 'Event has been suspended successfully!'
                    },
                    {count: ids.length}
                );
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'success',
                    show: true,
                    message: message
                })
                selectedClear()
            }).catch((error) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: error
                })
            })
            setShowDialog(false)
        })
        setDialogProps(dialogProps)
        setShowDialog(true)
    }, [queryParams])

    const showCloseDialog = useCallback((ids: string[]) => {
        const title = intl.formatMessage(
            {id: `${funType}.action.closeTitle`, defaultMessage: 'Close Event'}
        );
        const content = intl.formatMessage(
            {
                id: `${funType}.action.closeContent`, defaultMessage: ids.length > 1
                    ? 'Are you sure you want to close those events? Once closed, the events cannot be reopened, and the client side will not display those events.'
                    : 'Are you sure you want to close this event? Once closed, the event cannot be reopened, and the client side will not display this event.'
            },
            {count: ids.length}
        );
        const dialogProps = buildAlertDialogProps(title, content, () => setShowDialog(false), () => {
            updateEventsStatus(ids, 'CLOSE').then(() => {
                const message = intl.formatMessage(
                    {
                        id: `${funType}.action.closeSuccess`, defaultMessage: ids.length > 1
                            ? 'Events have been closed successfully!' : 'Event has been closed successfully!'
                    },
                    {count: ids.length}
                );
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'success',
                    show: true,
                    message: message
                })
                selectedClear()
            }).catch((error) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: error
                })
            })
            setShowDialog(false)
        })
        setDialogProps(dialogProps)
        setShowDialog(true)
    }, [queryParams])

    const showAutoPayoutDialog = (ids: string[], status: boolean) => {
        const title = status ?
            intl.formatMessage(
                {id: `${funType}.action.payoutOnTitle`, defaultMessage: 'Activate Auto Settlement'}
            ) :
            intl.formatMessage(
                {id: `${funType}.action.payoutOffTitle`, defaultMessage: 'Disable Auto Settlement'}
            );
        const content = status ?
            intl.formatMessage({
                    id: `${funType}.action.payoutOnContent`,
                    defaultMessage: ids.length > 1
                        ? 'Are you sure you want to activate auto settlement? The system will start processing automatic payout of those events'
                        : 'Are you sure you want to activate auto settlement? The system will start processing automatic payout of this event'
                },
                {count: ids.length}
            ) :
            intl.formatMessage({
                    id: `${funType}.action.payoutOffContent`,
                    defaultMessage: ids.length > 1
                        ? 'Are you sure you want to disable auto settlement? The system will stop processing automatic payout of those events'
                        : 'Are you sure you want to disable auto settlement? The system will stop processing automatic payout of this event'
                },
                {count: ids.length});
        const dialogProps = buildAlertDialogProps(title, content, () => setShowDialog(false), () => {
            eventRepo.updateAutoPayout(toUpdateAutoPayoutProps(ids, status ? 'ON' : 'OFF')).then(() => {
                const message = status ?
                    intl.formatMessage({
                        id: `${funType}.action.payoutOnSuccess`,
                        defaultMessage: 'Auto settlement has been activated successfully!'
                    }) :
                    intl.formatMessage({
                        id: `${funType}.action.payoutOffSuccess`,
                        defaultMessage: 'Auto settlement has been disabled successfully!'
                    });
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'success',
                    show: true,
                    message: message
                })
                selectedClear()
                getData()
            }).catch((error) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: error
                })
            })
            setShowDialog(false)
        })
        setDialogProps(dialogProps)
        setShowDialog(true)
    }

    const handleQuickAction = useCallback((id: string, label: string, status: boolean) => {
        switch (label) {
            case QuickActionLabel.PIN:
                updateEventPins([id], status).then(() => {
                    handleQueryChange({page: queryParams.page})
                })
                break;
            case QuickActionLabel.TEMPLATE:
                updateMarketSetting(id)
                setShowMarketSetting(true)
                break
            case QuickActionLabel.SUSPEND:
                if (status) {
                    showSuspendedDialog([id])
                } else {
                    updateEventsStatus([id], 'ACTIVE').then()
                }
                break
            case QuickActionLabel.CLOSE:
                if (status) {
                    showCloseDialog([id])
                } else {
                    updateEventsStatus([id], 'ACTIVE').then()
                }
                break
            case QuickActionLabel.PAYOUT:
                handleQueryChange({})
                showAutoPayoutDialog([id], status)
                break
            case QuickActionLabel.LINES: {
                setShowRightDrawer(true)
                const leagueName = eventListRef.current?.content?.find(event => event.eventId === id)?.leagueName ?? ''
                setRightDrawerProps({
                    title: intl.formatMessage({id: `${funType}.market`, defaultMessage: 'Market'}),
                    subTitle: `[${id}]${leagueName}`,
                    children:
                        <MarketDrawerContent
                            eventId={id}
                            eventType={queryParams.eventType}
                            sportId={queryParams.sportId}
                        />
                })
            }
        }
    }, [getData, queryParams, updateEventPins, updateEventsStatus]);
    const calculateDataColumns = () => {
        let displayColumns = columns(intl, funCommonType, queryParams.eventType, sportType, oddsDisplay,
            handleCopyButtonClick, handleTemplateBtnClick, handleBarChartClick, handleCollapse, isCollapse,
            configuration, handlePriceChanged, handleQuickAction, pinEventIds, handleRightDrawer, handleMoreLine)
            .filter(column => {
                return columns(intl, funCommonType, eventTypeList[defaultEventTypeIndex].key, sportType, oddsDisplay,
                    handleCopyButtonClick, handleTemplateBtnClick, handleBarChartClick, handleCollapse, isCollapse)
                    .find(checked => checked.field === column.field);
            });

        displayColumns = defaultLabels
            ? displayColumns.filter((column) =>
                (defaultLabels[sportType] ?? []).includes(column.headerName ?? "")
            )
            : displayColumns;

        const showQuickAction = rowSelectionModel.length <= 1
        const hasQuickAction = displayColumns.find(columns => columns['field'] === 'actions')
        if (showQuickAction) {
            if (!hasQuickAction) {
                const actions = columns(intl, funCommonType, queryParams.eventType, sportType, oddsDisplay,
                    handleCopyButtonClick, handleTemplateBtnClick, handleBarChartClick, handleCollapse, isCollapse,
                    configuration, handlePriceChanged, handleQuickAction, pinEventIds,
                    handleRightDrawer, handleMoreLine).find(columns => columns['field'] === 'actions')
                if (actions)
                    displayColumns.push(actions)
            }
        } else if (hasQuickAction) {
            const index = displayColumns.indexOf(hasQuickAction, 0)
            if (index > -1) {
                displayColumns.splice(index, 1)
            }
        }
        return displayColumns
    }

    const dataColumns = calculateDataColumns()

    const orderedColumns = useMemo(() => {
        const currentFields = dataColumns.map(col => col.field);

        // If no order history exists, initialize with current order
        if (!orderHistoryRef.current) {
            orderHistoryRef.current = currentFields;
            return dataColumns;
        }

        // Add any completely new fields (never seen before) to the end of order history
        const newFields = currentFields.filter(
            field => !orderHistoryRef.current!.includes(field)
        );
        if (newFields.length > 0) {
            orderHistoryRef.current = [...orderHistoryRef.current, ...newFields];
        }

        // Sort current fields based on their position in the order history
        currentFields.sort((a, b) => {
            const indexA = orderHistoryRef.current!.indexOf(a);
            const indexB = orderHistoryRef.current!.indexOf(b);
            return indexA - indexB;
        });

        // Sort dataColumns based on the final order
        return dataColumns.sort((a, b) => {
            const indexA = currentFields.indexOf(a.field);
            const indexB = currentFields.indexOf(b.field);
            return indexA - indexB;
        });
    }, [dataColumns]);
    const modifySelectedEvent = useCallback((rowSelectionModel: GridRowId[], displayEventList: EventDataModel[]) => {
        const selectedIds = rowSelectionModel as string[]
        const displayIds = displayEventList.map(event => event.eventId)
        const otherPageSelectedEvent = selectedEvent.filter(event => !displayIds.includes(event.eventId))
        const displaySelectedEvent = displayEventList
            .filter(event => event.status !== EventMarketStatus.CLOSE)
            .filter(event => selectedIds.includes(event.eventId))
        return otherPageSelectedEvent.concat(displaySelectedEvent)
    }, [selectedEvent]);

    const debounceCleanOddsBet = () => {
        debounce((event) => {
            setOtherLinesDrawerContent(() => {
                return {
                    title: '',
                    subTitle: '',
                    homeName: '',
                    awayName: '',
                    homeParticipantEnName: '',
                    awayParticipantEnName: '',
                    eventId: '',
                    marketName: '',
                    marketType: '',
                    marketId: '',
                    marketStatus: '',
                    provider: '',
                    odds: []
                }
            })
        }, 500)
    }

    useEffect(() => {
        if (showOtherLinesDrawer && otherLinesDrawerContent.marketName) {
            debounceCleanOddsBet()
        }
    }, [showOtherLinesDrawer]);

    useEffect(() => {
        const allActionSize = Object.entries(allActions).length
        const actions: Action[] = []
        if (isEditable) {
            if (selectedEvent.length > 0) {
                selectedEvent.some((event) => {
                    if (actions.length === allActionSize) {
                        return true
                    }
                    const isPinned = Boolean(pinEventList.current.find(pinEvent => pinEvent.eventId === event.eventId))
                    if (!isPinned && !actions.includes(Action.PinEvents)) {
                        actions.push(Action.PinEvents)
                    }

                    if (!actions.includes(Action.CloseAllEventMarkets))
                        actions.push(Action.CloseAllEventMarkets)

                    const isSuspended = event.status === EventMarketStatus.SUSPENDED
                    if (!isSuspended && !actions.includes(Action.SuspendedAllEventMarkets))
                        actions.push(Action.SuspendedAllEventMarkets)
                })
            }
            setActions(actions.sort((a, b) => a - b).map(a => allActions[a]))
        } else if (selectedEvent.length > 0) {
            selectedEvent.some((event) => {
                const isPinned = Boolean(pinEventList.current.find(pinEvent => pinEvent.eventId === event.eventId))
                if (!isPinned && !actions.includes(Action.PinEvents)) {
                    actions.push(Action.PinEvents)
                }
            })
        }
    }, [selectedEvent]);

    useEffect(() => {
        const locations: OptionItem[] = filterSelected['Location']
        const eventStartTime: EventStartTimeData = filterSelected['Event Start Time']
        const statuses: OptionItem[] = filterSelected['Status']

        const locationsValue = locations?.length > 0 ? locations.map(option => option.id) : undefined
        const statusesValue = statuses?.length > 0 ? statuses.map(option => option.name) : undefined
        handleQueryChange({
            locationIds: locationsValue,
            ...{
                startDate: eventStartTime.startDate,
                endDate: eventStartTime.endDate
            },
            statuses: statusesValue,
            ...((locations || (eventStartTime.startDate && eventStartTime.endDate) || statuses) ? undefined : {page: queryParams.page})
        })
    }, [filterSelected]);


    const handleColumnsSwitchChanges = useCallback((checkedLabels: Record<string, any>[]) => {
        const mappedCheckedLabels: string[] = checkedLabels.map(item => item[dataKey])
        setDefaultLabels((prev) => ({
            ...prev,
            [sportType]: mappedCheckedLabels,
        }));
    }, [handleQuickAction, pinEventIds, rowSelectionModel, isCollapse, displayEventList, handleMoreLine]);

    const onRowSelectionModelChange = useCallback((rowSelectionModel: GridRowId[]) => {
        const selectedEvent = modifySelectedEvent(rowSelectionModel, displayEventList?.content ?? [])
        setSelectedEvent(selectedEvent)
        setRowSelectionModel(selectedEvent.map(event => event.eventId))
    }, [modifySelectedEvent, displayEventList]);

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    let paramsQueue = useRef<Record<string, any>>({});

    const handleQueryChange = (params: Record<string, any>) => {
        paramsQueue.current = {
            ...paramsQueue.current,
            ...params
        };

        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        const doQuery = () => {
            const checkedParams = defaultEventQueryParamsReplace(paramsQueue.current, leagueModelsRef.current);
            const isPageChange = Boolean(paramsQueue.current['page']);

            setQueryParams(currentParams => {
                const diff = Object.entries(checkedParams).some(([key, value]) => {
                    return checkedParams[key] !== (currentParams as Record<string, any>)[key]
                })
                if (diff || isPageChange) {
                    return {
                        ...currentParams,
                        ...checkedParams,
                        ...(isPageChange ? undefined : {page: 1}),
                        sportId: sportId,
                    };
                } else {
                    return currentParams
                }
            });

            paramsQueue.current = {};
            debounceTimer = null;
        }

        if (params.eventType) {
            doQuery()
            return
        }

        debounceTimer = setTimeout(() => {
            doQuery()
        }, 500);
    };

    useEffect(() => {
        setCanClean((
            (queryParams.searchValue?.length ?? 0) +
            (queryParams.locationIds?.length ?? 0) +
            (queryParams.leagueIds?.length ?? 0) +
            (queryParams.statuses?.length ?? 0) +
            (queryParams.startDate ?? 0) +
            (queryParams.endDate ?? 0)
            > 0)
        );
        getData()
    }, [queryParams]);

    useEffect(() => {
        if (!showMarketSetting) {
            clearMarketSetting()
        }
    }, [showMarketSetting]);

    useEffect(() => {
        window.onload = function () {
            sessionStorage.setItem("isRefreshed", "false");
        };

        return window.addEventListener("beforeunload", function () {
            sessionStorage.setItem("isRefreshed", "true");
        });
    }, []);

    return {
        isEditable,
        loading,
        defaultEventTypeIndex,
        dataKey,
        searchOption,
        pageModel: {
            page: queryParams.page,
            pageSize: queryParams.pageSize
        },
        eventList: onlyPin ? {
            totalElements: pinEventList.current.length,
            content: displayEventList.content.filter(event => pinEventList.current.find(pinEvent => pinEvent.eventId === event.eventId))
        } : displayEventList,
        displayType: oddsDisplay,
        manageColumns: columns(
            intl,
            funCommonType,
            queryParams.eventType,
            sportType,
            oddsDisplay,
            handleCopyButtonClick,
            handleTemplateBtnClick,
            handleBarChartClick,
            handleCollapse,
            isCollapse,
            configuration,
            handlePriceChanged,
            handleQuickAction,
            pinEventIds,
            handleRightDrawer,
            handleMoreLine
        ).filter(columns => columns['field'] !== 'actions'),
        defaultLabels: defaultLabels ? defaultLabels[sportType] : undefined,
        dataColumns: orderedColumns,
        actions,
        eventTypeList,
        displayTypeOptions: allDisplayTypes,
        search: currentSearch.current,
        defaultSearch: queryParams.searchType && queryParams.searchValue ? {
            type: searchOption.find(item => item.key === queryParams.searchType)?.value as string,
            value: queryParams.searchValue
        } : undefined,
        leagueSelected: leagueModels.filter(league => {
            let leagueIds = queryParams.leagueIds;
            if (paramsQueue.current.leagueIds) {
                const checkedParams = defaultEventQueryParamsReplace(paramsQueue.current, leagueModels);
                leagueIds = checkedParams.leagueIds
            }
            return leagueIds?.includes(league.leagueId)
        }),
        filterSelected,
        setFilterSelected,
        dialogProps,
        canClean,
        onlyPin,
        rowSelectionModel,
        showMarketSetting, setShowMarketSetting,
        marketSettingProps,
        showDialog, setShowDialog,
        onCellClick,
        handleActionClick,
        handleEventTypeChange,
        handleDisplayTypeChange,
        handlePriceChanged,
        handleMarketActiveChange,
        handleOtherLinesContentProgressBarClick,
        handleOnlyPinChange,
        handleSearch,
        handleLeague,
        handleQueryChange,
        onRowSelectionModelChange,
        handleColumnsSwitchChanges,
        showOtherLinesDrawer,
        setShowOtherLinesDrawer,
        otherLinesDrawerContent,
        dataGridRef,
        configuration,
        intl,
        funType,
        funCommonType,
        showTemplateDialog,
        setShowTemplateDialog,
        applyTemplate,
        showRightDrawer,
        setShowRightDrawer,
        rightDrawerProps,
        eventType: queryParams.eventType,
        handleColumnOrderChange,
        disableColumnResize,
    }
}

export default useEventListViewModel