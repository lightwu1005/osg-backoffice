import React, {useCallback, useEffect, useRef, useState} from "react";
import useEventRepository from "@/services/@event/repository/useEventRepository";
import {toEventListProps} from "@/app/eventList/models/RequestDataMapping";
import store, {setOddsDisplay} from "@/modules/common/IdentityRedux";
import {
    ConfigurationModel,
    EventDataModel,
    EventListModel,
    OddDataModel
} from "@/services/@core/module/ResponseDataModels";
import useChannelRepository from "@/services/@channel/respository/useChannelRepository";
import {toGetConfigurationProps} from "@/app/configuration/models/RequestDataMapping";
import lodash from "lodash";
import IdentityHandler from "@/modules/common/IdentityHandler";
import {EventQueryParameters} from "@/app/eventList/models/EventQueryParameters";
import {columns} from "@/app/testPlaceBet/components/columns";
import {OddsLinePriceProps} from "@/app/testPlaceBet/components/otherLineColumns";
import {TestPlaceBetParameters} from "@/app/testPlaceBet/models/TestPlaceBetParameters";
import useTestPlaceBetRepository from "@/services/@testPlaceBet/repository/useTestPlaceBetRepository";
import {toTestPlaceBetProps} from "@/app/testPlaceBet/models/RequestDataMapping";
import {GlobalController} from "@/modules/common/GlobalController";
import {useGridApiRef} from "@mui/x-data-grid-pro";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {DefaultEventTypes, filterNewAndUpdatedOdds, setNewAndUpdatedOdds} from "@/services/@event/useCase";
import {ActionItem} from "@/modules/components/buttons/actionButton/ActionButton";
import useOddsSubscription, {SubscriptionOddsModel} from "@/services/@odds/socket/events/OddsSubscriptionProvider";

export interface TestPunterData {
    env: string,
    punterId: string,
    punterName: string,
    punterAccount: string,
    channelId: string,
    brandId: string,
}

export interface PlaceBetData extends Omit<TestPlaceBetParameters, 'channelId' | 'brandId' | 'ip'> {
    sportsId: string,
}

const useTestPlaceBetViewModel = (sportId: string, sportType: string) => {

    const isDevDomain = window.location.hostname.startsWith('localhost') || window.location.hostname.startsWith('dev');
    const isStageDomain = window.location.hostname.startsWith('stage');

    const eventRepo = useEventRepository();
    const channelRepo = useChannelRepository();
    const {oddsDisplay} = IdentityHandler();
    const placeBetRepo = useTestPlaceBetRepository();
    const {add, remove, odds} = useOddsSubscription();
    const globalController = GlobalController.getInstance()

    const getEventList = async (params: EventQueryParameters) => {
        return await eventRepo.getEventList(toEventListProps(params));
    }
    const getConfiguration = async (eventType: string) => {
        return await channelRepo.getConfiguration(toGetConfigurationProps({eventType}))
    }
    const testPlaceBet = async (data: TestPlaceBetParameters) => {
        return await placeBetRepo.placeBet(toTestPlaceBetProps(data));
    }
    const getUserIPAddress = async () => {
        return await placeBetRepo.getUserIPAddress();
    }

    const intl = useIntl();
    const funType = LocalizationFunctionType.Event;
    const funCommonType = LocalizationFunctionType.Common;

    const eventTypeList = DefaultEventTypes(intl);
    const [queryParams, setQueryParams] = useState<EventQueryParameters>({
        eventType: eventTypeList[0].key,
        sportId: sportId,
        page: 1,
        pageSize: 10,
        searchType: undefined,
        searchValue: undefined,
        locationIds: undefined,
        leagueIds: undefined,
        statuses: undefined,
        startDate: undefined,
        endDate: undefined,
        sortField: undefined,
        sortDirection: undefined
    });
    const [eventList, setEventList] = useState<EventListModel>();
    const [eventType, setEventType] = useState<string>(eventTypeList[0].key);
    const [allDisplayTypes, setAllDisplayTypes] = useState<string[]>([]);
    const [configuration, setConfiguration] = useState<ConfigurationModel>();
    const [selectedPunter, setSelectedPunter] = useState<TestPunterData>();
    const [placeBetData, setPlaceBetData] = useState<PlaceBetData[]>([]);
    const [openBetSlip, setOpenBetSlip] = useState(false);
    const [openDangerBall, setOpenDangerBall] = useState(false);
    const [loading, setLoading] = useState(false);
    const {channelId} = IdentityHandler()
    const dataGridRef = useGridApiRef();
    const lastRequestKey = useRef<number>(0)
    const punterData: TestPunterData[] = [
        {
            "env": "dev",
            "punterId": "8f3e245a-4274-4bed-9cbd-060fb577c4f8",
            "punterName": "bbinTester1",
            "punterAccount": "901",
            "channelId": "bdc42c08-dead-45e4-9752-b4066c3ba2c2",
            "brandId": "0f612abb-fca7-424e-b854-3c2b02921d9e"
        },
        {
            "env": "dev",
            "punterId": "d06be4b5-89cd-47a0-8586-01fcbab91ea7",
            "punterName": "bbinTester2",
            "punterAccount": "902",
            "channelId": "bdc42c08-dead-45e4-9752-b4066c3ba2c2",
            "brandId": "0f612abb-fca7-424e-b854-3c2b02921d9e"
        },
        {
            "env": "dev",
            "punterId": "0245f3c6-434b-4ed5-bcbe-afaaa74fb9aa",
            "punterName": "bbinTester3",
            "punterAccount": "903",
            "channelId": "85b1ac8e-9cdf-4e75-8c97-aa25aa60ffeb",
            "brandId": "4d2f5481-b0eb-4743-ac88-49d392abc782"
        },
        {
            "env": "dev",
            "punterId": "d4711fb3-6b20-4a08-8f8d-2b6fba84b9b4",
            "punterName": "bbinTester4",
            "punterAccount": "904",
            "channelId": "85b1ac8e-9cdf-4e75-8c97-aa25aa60ffeb",
            "brandId": "4d2f5481-b0eb-4743-ac88-49d392abc782"
        },
        {
            "env": "stage",
            "punterId": "4e6ff100-1c6f-45b1-9dbb-613f405f23b6",
            "punterName": "bbinTester1",
            "punterAccount": "457599398",
            "channelId": "0cf331be-61dd-4694-aa8f-b864919e2c3d",
            "brandId": "ad19ce46-bc0f-44b6-9d23-17950490962e"
        },
        {
            "env": "stage",
            "punterId": "6c45812b-16f2-4802-8dd6-b549c1bbba2d",
            "punterName": "bbinTester2",
            "punterAccount": "457599398",
            "channelId": "0bdb041f-b0ba-4ea4-88e5-6631e104d3ec",
            "brandId": "d713b12b-be01-4f08-8943-4b54a714f163"
        },
        {
            "env": "sl",
            "punterId": "1d4af668-da3e-4f5d-83a8-6d634d6dbb8f",
            "punterName": "bbinTester1",
            "punterAccount": "901",
            "channelId": "2a008775-71e4-49ef-bd28-71b7b055da4b",
            "brandId": "21f6a13b-3e00-4f3b-b4aa-53074bc7b4bf"
        },
        {
            "env": "sl",
            "punterId": "4c374fa0-6710-480e-89dc-a80bd6f2027b",
            "punterName": "bbinTester11",
            "punterAccount": "911",
            "channelId": "2a008775-71e4-49ef-bd28-71b7b055da4b",
            "brandId": "21f6a13b-3e00-4f3b-b4aa-53074bc7b4bf"
        },
        {
            "env": "sl",
            "punterId": "de63a365-612a-44b2-a7ca-967e89080e32",
            "punterName": "bbinTester2",
            "punterAccount": "902",
            "channelId": "1b32163a-a1d6-4a40-8149-b0a2c60bd88c",
            "brandId": "7a175460-3f5e-4a9e-8279-47d3108ce528"
        },
        {
            "env": "sl",
            "punterId": "5f46e642-8c8a-4035-9722-ea55c3ae0e61",
            "punterName": "bbinTester21",
            "punterAccount": "921",
            "channelId": "1b32163a-a1d6-4a40-8149-b0a2c60bd88c",
            "brandId": "7a175460-3f5e-4a9e-8279-47d3108ce528"
        },
        {
            "env": "sl",
            "punterId": "66f44c59-306a-4bed-9bc6-b1c1c8688b20",
            "punterName": "bbinTester31",
            "punterAccount": "931",
            "channelId": "a7476b1e-2b84-4323-a9ec-42c4a193921f",
            "brandId": "fd259dba-1a13-4ba0-a618-e39b931a01a7"
        },
        {
            "env": "sl",
            "punterId": "1470ece4-9735-43ee-a4be-1fbcfc97d4db",
            "punterName": "bbinTester32",
            "punterAccount": "932",
            "channelId": "a7476b1e-2b84-4323-a9ec-42c4a193921f",
            "brandId": "fd259dba-1a13-4ba0-a618-e39b931a01a7"
        },
        {
            "env": "sl",
            "punterId": "b40e7aef-dd06-42e1-bd10-536cea3ecbf2",
            "punterName": "bbinTester41",
            "punterAccount": "941",
            "channelId": "4454dc2c-4b0f-4dea-b1ac-e0d47cf6a4d4",
            "brandId": "a6a68581-1ccd-4e56-8b49-8a4e97afbdb4"
        },
        {
            "env": "sl",
            "punterId": "90d6d6a0-2931-40dc-8ee0-4e9ba1b8299c",
            "punterName": "bbinTester42",
            "punterAccount": "942",
            "channelId": "4454dc2c-4b0f-4dea-b1ac-e0d47cf6a4d4",
            "brandId": "a6a68581-1ccd-4e56-8b49-8a4e97afbdb4"
        }
    ]

    const searchOption: ActionItem[] = [{
        key: 'EVENT', value: intl.formatMessage({id: `${funType}.searchEvent`, defaultMessage: 'Event'})
    }, {
        key: 'EVENT_ID', value: intl.formatMessage({id: `${funType}.searchEventID`, defaultMessage: 'Event ID'})
    }]

    const getData = useCallback(() => {
        setLoading(true);
        const randomKey = Math.random()
        lastRequestKey.current = randomKey
        Promise.all([getEventList(queryParams), getConfiguration(queryParams.eventType)])
            .then(([eventList, config]) => {
                if (lastRequestKey.current !== randomKey) return
                setConfiguration(prevState => {
                    if (lodash.isEqual(prevState, config)) return prevState
                    return config
                })
                if (!oddsDisplay || oddsDisplay === '') {
                    store.dispatch(setOddsDisplay(config.oddsFormat.display[0] || 'Decimal'))
                }
                setAllDisplayTypes(config.oddsFormat.display)
                setEventList(eventList)

            })
            .catch()
            .finally(() => {
                if (lastRequestKey.current !== randomKey) return
                setLoading(false)
            })
    }, [queryParams, configuration, eventType]);

    const handleDisplayTypeChange = useCallback((value: string) => {
        store.dispatch(setOddsDisplay(value))
    }, []);

    const handleEventTypeChange = useCallback((_: number, key: string) => {
        handleQueryChange({
            eventType: key,
        })
        setEventType(key);
    }, []);

    const handleQueryChange = useCallback((params: Record<string, any>) => {
        const isPageChange = Boolean(params['page'])
        setQueryParams(currentParams => ({
            ...currentParams,
            ...params,
            ...(isPageChange ? undefined : {page: 1})
        }));
    }, []);

    const handleSearch = useCallback((type: string, value: string) => {
        handleQueryChange({
            searchType: (value !== '') ? searchOption.find(item => item.value === type)?.key : undefined,
            searchValue: (value !== '') ? value : undefined,
        })
    }, []);

    const handleCopyButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, text: string) => {
        event.stopPropagation();
        navigator.clipboard.writeText(text)
    }

    const [dataColumns, setDataColumns] = useState(columns(intl, funCommonType, eventType, sportType, handleCopyButtonClick, []));

    const handleOddsOnClick = (prop: OddsLinePriceProps) => {
        if (!prop.bet) return
        const {eventId, bet, marketType} = prop;
        const {betId, line, price} = bet

        const existingEventBet = placeBetData.find(bet =>
            (bet.sportsId === sportId)
        );

        if (!existingEventBet) {
            const newBet: PlaceBetData = {
                sportsId: sportId,
                punterAccount: '',
                stack: 0,
                betType: 'SINGLE',
                market: marketType,
                parts: [
                    {
                        partNo: 1,
                        eventId: eventId,
                        oddsId: betId,
                        odds: price,
                        oddsType: eventType,
                        line: line,
                    }
                ]
            };
            setPlaceBetData(prevState => [...prevState, newBet]);
        } else {
            const existingBetPart = existingEventBet.parts.find(part => part.oddsId === betId);
            if (!existingBetPart) {
                const updatedPlaceBetData = [...placeBetData];
                const newPart = {
                    partNo: existingEventBet.parts.length + 1,
                    eventId: eventId,
                    oddsId: betId,
                    oddsType: eventType,
                    odds: price,
                    line: line,
                };
                existingEventBet.parts = [...existingEventBet.parts, newPart];
                existingEventBet.betType = existingEventBet.parts.length > 1 ? 'PARLAY' : 'SINGLE';
                setPlaceBetData(updatedPlaceBetData);
            } else {
                setPlaceBetData(prevState =>
                    prevState
                        .map(bet => ({
                            ...bet,
                            parts: bet.parts
                                .filter(part => part.oddsId !== betId)
                                .map((part, index) => ({
                                    ...part,
                                    partNo: index + 1,
                                })),
                            betType: bet.parts.length - 1 > 1 ? 'PARLAY' : 'SINGLE'
                        }))
                        .filter(bet => bet.parts.length > 0)
                );
            }
        }
    };

    const handlePunterChange = useCallback((account: string) => {
        const punterId = account.split(': ')[1];
        const punter = punterData.find(punter => punter.punterId === punterId);
        setSelectedPunter(punter);
    }, []);

    const handlePlaceBet = useCallback((data: PlaceBetData) => {
        if (!selectedPunter) {
            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                severity: 'error',
                show: true,
                message: '請選擇下注帳號'
            });
            return
        }
        if (data.stack <= 0) {
            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                severity: 'error',
                show: true,
                message: '下注金額必須大於0'
            });
            return;
        }
        getUserIPAddress().then(ip => {
            testPlaceBet({
                ...data,
                punterAccount: selectedPunter.punterAccount,
                channelId: selectedPunter.channelId,
                brandId: selectedPunter.brandId,
                ip: ip
            }).then(response => {
                if (response?.betSlipId) {
                    setPlaceBetData(prevState => prevState.filter(bet => bet.parts !== data.parts));
                    globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                        severity: 'success',
                        show: true,
                        message: '完成下注'
                    });
                }
            }).catch((result) => {
                const is8517Error = result.message.includes('Odds Status Error');
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: is8517Error ? '下注失敗，該盤口被暫時/永久關閉' : result.message
                });
            });
        })
    }, [selectedPunter]);

    const handleClearBet = useCallback((clearType: string) => {
        if (clearType.startsWith('ALL')) {
            setPlaceBetData([]);
        } else {
            const index = clearType.split('-')[1];
            setPlaceBetData(prevState => prevState.filter((_, i) => i !== Number(index)));
        }
    }, []);

    const onOddsSubscript = useCallback((oddsModels: SubscriptionOddsModel[]) => {
        const modifyPrice = (currentEvents: EventDataModel[]) => {
            const updateOddsData = (originalData: OddDataModel, newDatas: SubscriptionOddsModel[]) => {
                const {newLines, updateLines, newStatus} = filterNewAndUpdatedOdds(newDatas, originalData.odds)
                return {
                    ...originalData,
                    ...(newStatus ? {marketSuspendedStatus: newStatus} : undefined),
                    odds: setNewAndUpdatedOdds(newLines, updateLines, newStatus, originalData.odds)
                }
            };

            return currentEvents.map(event => {
                if (!oddsModels.some(odds => odds.eventId)) return event;
                const newDatas = oddsModels.filter(odds => odds.eventId === event.eventId);
                const homeName = newDatas.find(data => data.homeName)?.homeName;
                const awayName = newDatas.find(data => data.awayName)?.awayName;
                return {
                    ...event,
                    oddsData: event.oddsData.map(data => {
                        const newData = newDatas.filter(newData => newData.marketId === data.marketId)
                        if (newData) {
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
        };

        if (eventList) {
            const modifiedEventList = modifyPrice(eventList.content);
            if (modifiedEventList) {
                setEventList({
                    ...eventList,
                    content: modifiedEventList
                });
            }
        }

    }, [eventList])

    useEffect(() => {
        if(odds.length > 0) {
            onOddsSubscript(odds)
        }
    }, [odds]);
    useEffect(() => {
        if (!eventList) return
        const content = eventList.content
        const displayIds = content.map(event => event.eventId)
        if (displayIds) {
            displayIds.forEach(displayId => {
                const marketIds = content.find(event => event.eventId === displayId)?.oddsData.map(odd => odd.marketId) ?? []
                add(displayId, marketIds, eventType)
            })
        }
        return () => {
            displayIds.forEach(displayId => {
                const marketIds = content.find(event => event.eventId === displayId)?.oddsData.map(odd => odd.marketId) ?? []
                remove(displayId, marketIds, eventType)
            })
        }
    }, [eventList])

    useEffect(() => {
        if (configuration) {
            // Not sure why but have to use setTimeout to make it work, otherwise when goes into renderOddsBaseLinePriceDisplay,
            // the configuration is still undefined, it seems the thread problem of useEffect and useSate
            setTimeout(() => {
                const displayColumns = columns(
                    intl,
                    funCommonType,
                    eventType,
                    sportType,
                    handleCopyButtonClick,
                    placeBetData.map(bet => bet.parts).flat(),
                    configuration,
                    handleOddsOnClick
                ).filter(column => {
                    return dataColumns.find(checked => checked.field === column.field);
                });
                setDataColumns(displayColumns);
            }, 0);
        }
    }, [oddsDisplay, configuration, placeBetData]);

    useEffect(() => {
        getData()
    }, [sportId, eventType, queryParams, openDangerBall, openBetSlip]);

    useEffect(() => {
        setSelectedPunter(undefined)
    }, [open]);

    return {
        loading,
        dataGridRef,
        openBetSlip,
        setOpenBetSlip,
        openDangerBall,
        setOpenDangerBall,
        eventType,
        eventTypeList,
        dataColumns,
        eventList,
        placeBetData,
        displayType: oddsDisplay,
        displayTypeOptions: allDisplayTypes,
        punterData: punterData.filter(punter => punter.env === (isDevDomain ? 'dev' : isStageDomain ? 'stage' : 'sl') && punter.channelId === channelId),
        configuration,
        pageModel: {
            page: queryParams.page,
            pageSize: queryParams.pageSize
        },
        handleEventTypeChange,
        handleQueryChange,
        handleSearch,
        handleDisplayTypeChange,
        handleOddsOnClick,
        handlePunterChange,
        handlePlaceBet,
        handleClearBet,
        searchOption
    }
}

export default useTestPlaceBetViewModel;