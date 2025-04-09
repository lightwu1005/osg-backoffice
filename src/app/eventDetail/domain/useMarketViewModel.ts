import {toOddsMarketStatusProps, toSetProviderPreferenceProps} from "@/app/eventDetail/models/RequestDataMapping";
import {OddsMarketStatusParameter} from "@/app/eventDetail/models/OddsMarketStatusParameter";
import {ConfigurationModel, OddsListModel} from "@/services/@core/module/ResponseDataModels";
import useOddsRepository from "@/services/@odds/respository/useOddsRepository";
import {useCallback, useEffect, useRef, useState, useMemo} from "react";
import {OddsContentProps} from "@/app/eventDetail/components/OddsContent";
import {EventDetailOddsDataModel} from "@/app/eventDetail/models/dataModel/EventDetailOddsDataModel";
import useChannelRepository from "@/services/@channel/respository/useChannelRepository";
import {toGetConfigurationProps} from "@/app/configuration/models/RequestDataMapping";
import IdentityHandler from "@/modules/common/IdentityHandler";
import useOddsAdjustment from "@/services/@odds/socket/useOddsAdjustment";
import {debounce} from "lodash";
import {buildAlertDialogProps} from "@/modules/components/dialog/AlertDialog";
import isEqual from "lodash/isEqual";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {filterNewAndUpdatedOdds, markMostBalance, oddsSort, setNewAndUpdatedOdds} from "@/services/@event/useCase";
import useEventOddsStatusSubscription, {
    SubscriptionEventOddsStatusModel
} from "@/services/@odds/socket/events/useEventOddsStatusSubscription";
import {EventMarketStatus} from "@/services/@core/module/Enum";
import {DataBuffer} from "@/utils/DataBuffer";
import {SubscriptionOddsModel, useOddsSubscription} from "@/services/@odds/socket/events/OddsSubscriptionProvider";

interface Statuses {
    [key: string]: string
}

interface SubscriptionData {
    odds?: SubscriptionOddsModel[],
    status?: SubscriptionEventOddsStatusModel
}

const useMarketViewModel = ({eventType, eventId, selectedMarket, marketStatusItems, providers}: OddsContentProps) => {

    const oddsRepo = useOddsRepository();
    const channelRepo = useChannelRepository();
    const {adjustment} = useOddsAdjustment()
    const {add: oddsAdd, remove: oddsRemove, odds} = useOddsSubscription()
    const {add: statusAdd, remove: statusRemove, statusSubscription} = useEventOddsStatusSubscription()
    const {oddsDisplay} = IdentityHandler()

    const updateOddsMarketStatus = useCallback(async (parameter: OddsMarketStatusParameter) => {
        return await oddsRepo.updateOddsMarketStatus(toOddsMarketStatusProps(parameter))
    },[oddsRepo])

    const setProviderPreference = useCallback(async (eventId: string, provider: string, marketId: string) => {
        return await oddsRepo.setProviderPreference(toSetProviderPreferenceProps(eventId, provider, marketId))
    },[oddsRepo])

    const getConfiguration = useCallback(async (eventType: string) => {
        return await channelRepo.getConfiguration(toGetConfigurationProps({eventType}))
    },[channelRepo])

    const [statuses, setStatuses] = useState<Statuses>({});
    const [configuration, setConfiguration] = useState<ConfigurationModel>();
    const subscriptionOdds = useRef<SubscriptionOddsModel[]>([])
    const oddsDataRef = useRef<EventDetailOddsDataModel[]>([])
    const [oddsData, setOddsData] = useState<EventDetailOddsDataModel[]>([]);
    const [displayOddsData, setDisplayOddsData] = useState<EventDetailOddsDataModel[]>([])
    const [settingOpen, setSettingOpen] = useState(false);
    const [showSetPreferenceDialog, setShowSetPreferenceDialog] = useState(false)
    const [preference, setPreference] = useState<{ provider: string, marketId: string } | undefined>(undefined)
    const [marketIds, setMarketIds] = useState<string[]>([]);
    const [displayMarketIds, setDisplayMarketIds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const prevSelectedMarketIdRef = useRef<string[]>();
    const lastRequestKey = useRef<number>(0)

    const subscriptBuffer = new DataBuffer<SubscriptionData>(
        (newData, buffer) => {
            return [...buffer, newData]
        },
        (mergedData) => {
            const updateData = (oddsData: EventDetailOddsDataModel[], mergedData: SubscriptionData[]) => {
                let modifiedOddsData = oddsData
                mergedData.forEach(data => {
                    if (data.odds) {
                        modifiedOddsData = modifyOdds(modifiedOddsData, data.odds)
                    }
                    if (data.status) {
                        modifiedOddsData = modifyStatus(modifiedOddsData, data.status)
                    }
                })
                return modifiedOddsData
            }
            setOddsData(_ => updateData(oddsDataRef.current, mergedData))
        },
        300
    )

    const intl = useIntl()
    const funType = LocalizationFunctionType.Event

    const setPreferenceAlertDialogProps = buildAlertDialogProps(
        intl.formatMessage({
            id: `${funType}.setAsPreference`,
            defaultMessage: 'Set as preference'
        }),
        intl.formatMessage({
            id: `${funType}.switchFeederWarning`,
            defaultMessage: 'When you switch feeder, all pending bets will be automatically canceled. Are you sure you want to do this?'
        }),
        () => {
            setShowSetPreferenceDialog(false);
            setPreference(undefined)
        },
        () => {
            confirmSetPreference();
            setShowSetPreferenceDialog(false);
        }
    )

    const refactorToFilterProviders = () => {
        return oddsData.map((item) => {
            return {
                ...item,
                listModel: item.listModel.filter(odds => providers.includes(odds.provider))
            }
        });
    }

    const handleBetPriceChange = useMemo(
        () => debounce(
            (betId: string, price: number, originalPrice: number) => {
                adjustment({eventType, betId, price, originalPrice});
            },
            500
        ),
        [adjustment, eventType]
    )

    const handleActiveChange = useCallback((status: string, marketId: string) => {
        setIsLoading(true);
        const marketOddsData = oddsData.find(item => item.marketId === marketId);
        const providers = marketOddsData?.listModel.map(oddsList => oddsList.provider) ?? [];
        const requestProps: OddsMarketStatusParameter = {
            eventId: eventId,
            marketId: marketId,
            providers: providers,
            status: status,
        }
        updateOddsMarketStatus(requestProps).then(data => {
            const newOddsData = oddsData.map((listModel) => {
                const _marketId = listModel.marketId ?? '';
                if (_marketId === marketId) {
                    return {
                        ...listModel,
                        listModel: listModel.listModel.map(oddsList => ({
                            ...oddsList,
                            ...(providers.includes(oddsList.provider) ? {
                                odds: markMostBalance(oddsSort(oddsList.odds.map(odd => ({
                                    ...odd,
                                    oddsSuspendedStatus: status
                                }))))
                            } : undefined),

                        }))
                    };
                }
                return listModel;
            });

            setOddsData(newOddsData);
        }).finally(() => setIsLoading(false));
    }, [eventId, oddsData, updateOddsMarketStatus]);

    const handleMarketSettingOnCLick = () => {
        setSettingOpen(true)
    }

    const handleSetPreferenceOnClick = useCallback((provider: string, marketId?: string) => {
        setPreference({provider, marketId: marketId ?? ''});
        setShowSetPreferenceDialog(true);
    }, [])

    const confirmSetPreference = useCallback(() => {
        if (preference) {
            setIsLoading(true);
            setProviderPreference(eventId, preference.provider, preference.marketId).finally(() => setIsLoading(false))
        }
    }, [preference, setProviderPreference, eventId])

    useEffect(() => {
        const displayMarketIds = displayOddsData.map(item => item.listModel.find(oddsList => oddsList.odds.length > 0)?.odds[0].marketId ?? '')
        const selectedMarketIds = selectedMarket.key === '' ? marketIds : [selectedMarket.key]
        if (isEqual(displayMarketIds, selectedMarketIds)) {
            return
        }
        // If the selection is empty but the array contains more than one option, it indicates a "deselect all" case and no API call should be made.
        if (selectedMarket.key === '' && marketIds.length > 1) {
            return
        }
        // if selectedMarketIds is different from the previous one, then fetch data
        const {current: prevSelectedMarketIds} = prevSelectedMarketIdRef;
        if (prevSelectedMarketIds && isEqual(prevSelectedMarketIds, selectedMarketIds)) {
            return;
        }
        prevSelectedMarketIdRef.current = selectedMarketIds;

        setIsLoading(true);
        const randomKey = Math.random();
        lastRequestKey.current = randomKey;
        getConfiguration(eventType)
            .then(config => {
                setConfiguration(config)
            })
            .catch()
            .finally(() => {
                if (lastRequestKey.current !== randomKey) return;
                setIsLoading(false)
            })
    }, [marketIds, selectedMarket]);

    useEffect(() => {
        if (!isLoading) setIsLoading(true)
        const newDisplayOddsData = refactorToFilterProviders();
        setDisplayOddsData(newDisplayOddsData);
        setIsLoading(false)
    }, [providers, oddsData, configuration]);

    const modifyOdds = (oddsData: EventDetailOddsDataModel[], newDatas: SubscriptionOddsModel[]) => {
        const calculateMostBalanced = (oddsList: OddsListModel, newDatas: SubscriptionOddsModel[]) => {
            const {newLines, updateLines, newStatus} = filterNewAndUpdatedOdds(newDatas, oddsList.odds)
            return {
                ...oddsList,
                odds: setNewAndUpdatedOdds(newLines, updateLines, newStatus, oddsList.odds)
            }
        }

        return oddsData.map(listModel => {
            const newMarketDatas = newDatas.filter(data => data.marketId === listModel.marketId)
            return {
                ...listModel,
                listModel: listModel.listModel.map(oddsList => ({
                    ...oddsList,
                    ...(newMarketDatas.length > 0 ? calculateMostBalanced(oddsList, newMarketDatas) : undefined),
                }))
            }
        });
    }
    const onOddsSubscript = useCallback((oddsModels: SubscriptionOddsModel[]) => {
        const newDatas = oddsModels.filter(odds => odds.eventId === eventId)
        subscriptBuffer.addData({odds: newDatas})
    }, [oddsData, displayOddsData]);

    const modifyStatus = (oddsData: EventDetailOddsDataModel[], newStatus: SubscriptionEventOddsStatusModel) => {
        const {eventSuspendedStatus, markets} = newStatus
        return oddsData.map(listModel => {
            const targetId = listModel.marketId ?? '';
            const subscriptionMarketModels = markets?.filter(market => market.marketId === targetId)
            const providerMarketStatusMap = new Map(subscriptionMarketModels?.map(market => [market.provider, market.marketSuspendedStatus]))
            return {
                ...listModel,
                listModel: listModel.listModel.map(oddsList => {
                    const marketStatus = providerMarketStatusMap.get(oddsList.provider) ?? eventSuspendedStatus
                    return {
                        ...oddsList,
                        ...{
                            odds: oddsList.odds.map(odd => ({
                                ...odd,
                                oddsSuspendedStatus: marketStatus
                            }))
                        },
                    }
                })
            }
        })
    }
    const onStatusSubscript = useCallback((statuses: SubscriptionEventOddsStatusModel[]) => {
        const newStatus = statuses.find(status => status.eventId === eventId);
        if (!newStatus) return;
        subscriptBuffer.addData({status: newStatus})
    }, [oddsData, displayOddsData]);

    useEffect(() => {
        if (isEqual(oddsDataRef.current, oddsData)) return
        oddsDataRef.current = oddsData
        if (subscriptionOdds.current.length > 0) {
            onOddsSubscript(subscriptionOdds.current)
        }
    }, [oddsData]);

    useEffect(() => {
        const actives: Statuses = {}
        displayOddsData.forEach(data => {
            const marketId = data.marketId
            const listModel = oddsData.find(odds => odds.marketId === marketId)?.listModel;
            const active = listModel?.some(oddsList =>
                oddsList.odds.some(odd => odd.oddsSuspendedStatus !== EventMarketStatus.SUSPENDED && odd.oddsSuspendedStatus !== EventMarketStatus.CLOSE)
            );
            if (active) {
                actives[marketId] = EventMarketStatus.ACTIVE
                return
            }
            const suspened = listModel?.some(oddsList =>
                oddsList.odds.some(odd => odd.oddsSuspendedStatus === EventMarketStatus.SUSPENDED)
            );
            if (suspened) {
                actives[marketId] = EventMarketStatus.SUSPENDED
                return
            }
            actives[marketId] = EventMarketStatus.CLOSE
        });
        setStatuses(actives)
    }, [displayOddsData]);

    const addSubscriptions = (id: string, marketIds: string[]) => {
        const ids = [id];
        oddsAdd(ids, marketIds, eventType);
        statusAdd(ids);
    };

    const removeSubscriptions = (id: string, marketIds: string[]) => {
        const ids = [id];
        oddsRemove(ids, marketIds, eventType);
        statusRemove(ids)
    };

    useEffect(() => {
        const marketIds = marketStatusItems.map(item => item.key)
        const displayMarketIds = selectedMarket.key === '' ? marketIds : [selectedMarket.key]
        setMarketIds(prevState => {
            if (isEqual(prevState, marketIds)) return prevState
            return marketIds
        })
        setDisplayMarketIds(prevState => {
            if (isEqual(prevState, displayMarketIds)) return prevState
            return displayMarketIds
        })
    }, [selectedMarket, marketStatusItems]);

    useEffect(() => {
        setOddsData(displayMarketIds.map(marketId => {
            const statusItem = marketStatusItems.find(market => market.key === marketId)
            return {
                marketId: marketId,
                marketName: statusItem?.text ?? '',
                marketType: statusItem?.type ?? '',
                listModel: providers.map(provider => ({
                    provider: provider,
                    isPreferred: provider === 'GENIUS', //TODO: temporary workaround, remove after new solution is implemented
                    odds: []
                }))
            }
        }))

        if (eventId && displayMarketIds.length > 0) {
            statusSubscription.current = {onSubscript: onStatusSubscript}
            addSubscriptions(eventId, displayMarketIds)
        }
        return () => {
            if (eventId && displayMarketIds.length > 0) {
                statusSubscription.current = undefined
                removeSubscriptions(eventId, displayMarketIds)
            }
        }
    }, [displayMarketIds])

    const checkOddsData = async () => {
        return new Promise((resolve) => {
            if (oddsDataRef.current.length > 0) {
                resolve(oddsDataRef.current);
            } else {
                const interval = setInterval(() => {
                    if (oddsDataRef.current.length > 0) {
                        clearInterval(interval);
                        resolve(oddsDataRef.current);
                    }
                }, 200);
            }
        });
    }

    useEffect(() => {
        subscriptionOdds.current = odds
        checkOddsData().then(() => {
            onOddsSubscript(odds);
        });
    }, [odds])

    return {
        isLoading,
        displayOddsData,
        statuses,
        settingOpen,
        showSetPreferenceDialog,
        setShowSetPreferenceDialog,
        setPreferenceAlertDialogProps,
        setSettingOpen,
        handleBetPriceChange,
        handleActiveChange,
        handleMarketSettingOnCLick,
        handleSetPreferenceOnClick,
        configuration,
        oddsDisplay,
        intl,
        funType,
        selectedMarket
    }
}

export default useMarketViewModel