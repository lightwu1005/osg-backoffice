import {useCallback, useEffect, useRef, useState} from 'react';
import {StatusItem} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup";
import {AutoMultiMenuTextFieldProps} from "@/modules/components/TextField";
import {MarketGroupModel} from "@/services/@core/module/ResponseDataModels";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {LocalMarketGroupModel} from "@/app/eventDetail/models/dataModel/MarketSettingDataModel";
import lodash, {debounce} from "lodash";
import {defaultMarket} from "@/app/eventDetail/domain/useEventDetailViewModel";
import {EventType} from "@/services/@core/module/Enum";

export interface MarketsComponentViewModelProps {
    title: string;
    subTitle: string;
    allMarketStatusItems: StatusItem[];
    marketProps: AutoMultiMenuTextFieldProps;
    marketGroups: MarketGroupModel[]
    providerProps: AutoMultiMenuTextFieldProps;
    marketSelectedResult?: (markets: string[]) => void;
    providerSelectedResult?: (providers: string[]) => void;
    statusButtonOnClick?: (statusItem: StatusItem | undefined) => void;
    isBets: boolean;
    sportType: string;
    eventType: string;
}

export enum Action {
    MARKETS = 'markets',
    PROVIDERS = 'providers',
    STATUS_ITEM = 'statusItem'
}

export const useMarketsComponentViewModel = (props: MarketsComponentViewModelProps) => {
    const {
        marketGroups,
        allMarketStatusItems,
        marketProps,
        marketSelectedResult,
        providerSelectedResult,
        statusButtonOnClick,
        sportType,
        eventType
    } = props;
    const funCommonType = LocalizationFunctionType.Common
    const intl = useIntl()
    const allMarketGroups: MarketGroupModel[] = [{
        groupId: 'all',
        groupName: intl.formatMessage({
            id: `${funCommonType}.all`,
            defaultMessage: 'All'
        }),
        marketIds: allMarketStatusItems.map(item => item.key),
        status: ''
    }, ...marketGroups];

    const [markets, setMarkets] = useState<string[] | undefined>();
    const [providers, setProviders] = useState<string[]>([]);
    const [item, setItem] = useState<StatusItem>();
    const marketGroupsRef = useRef<LocalMarketGroupModel[]>([])
    const [currentMarketGroup, setCurrentMarketGroup] = useState<LocalMarketGroupModel>();
    const [marketPropsState, setMarketPropsState] = useState<AutoMultiMenuTextFieldProps>(marketProps);
    const [statusButtonGroupState, setStatusButtonGroupState] = useState<StatusItem[]>([]);
    const [selected, setSelected] = useState<number>(0);
    const defaultMarkets = defaultMarket(sportType, eventType === EventType.inPlay);
    const defaultItems = useRef<StatusItem[]>([])
    const [statusButtonSelectedIndex, setStatusButtonSelectedIndex] = useState<number>(0);

    const getMarketStatusItems = (group: MarketGroupModel, allMarketStatusItems: StatusItem[]) => {
        return (group.marketIds ?? [])
            .map((id) => allMarketStatusItems.find((item) => item.key === id))
            .filter((item): item is StatusItem => item !== undefined);
    };

    const getGroupInitialItems = (marketStatusItems: StatusItem[]) => {
        const initialItems = marketStatusItems
            .filter(item => item !== undefined)
            .filter((item) =>
                defaultItems.current.some((selectedItem) => selectedItem?.text === (item?.text ?? ''))
            )

        return initialItems.length > 0 ? initialItems : marketStatusItems.slice(0, 1);
    };

    useEffect(() => {
        if (allMarketStatusItems.length === 0) return;
        defaultItems.current = defaultMarkets.map((market) => allMarketStatusItems.find((item) => item.type.toLowerCase() === market) as StatusItem);
        marketGroupsRef.current = allMarketGroups.map((group, index) => {
            if (index === 0) {
                const groupInitialItems = getGroupInitialItems(defaultItems.current);
                const groupMarketProps: AutoMultiMenuTextFieldProps = {
                    ...marketProps,
                    initialSelectedOptions: groupInitialItems.map((item) => item?.text ?? ''),
                };

                return {
                    ...group,
                    marketStatusItems: allMarketStatusItems,
                    marketProps: groupMarketProps,
                    statusButtonGroupItems: groupInitialItems,
                };
            }

            const marketStatusItems = getMarketStatusItems(group, allMarketStatusItems);
            const groupInitialItems = getGroupInitialItems(marketStatusItems);
            const groupMarketProps: AutoMultiMenuTextFieldProps = {
                ...marketProps,
                options: marketStatusItems.map((item) => item.text),
                initialSelectedOptions: groupInitialItems.map((item) => item.text),
            };

            return {
                ...group,
                marketStatusItems,
                marketProps: groupMarketProps,
                statusButtonGroupItems: groupInitialItems,
            };
        });

        setCurrentMarketGroup((prevState) => {
            if (lodash.isEqual(prevState, marketGroupsRef.current[selected])) {
                return prevState;
            }
            return marketGroupsRef.current[selected];
        });

        setMarkets(
            marketGroupsRef.current[selected].statusButtonGroupItems.map((item) => item.text)
        );
    }, [allMarketStatusItems]);


    const handleFilterChange = useCallback((key: string, value: string[] | StatusItem) => {
        switch (key) {
            case Action.MARKETS:
                setMarkets(prevState => {
                    if (prevState && lodash.isEqual(prevState, value)) {
                        return prevState;
                    }

                    const items = value as string[];
                    const prevItems = prevState ?? currentMarketGroup?.statusButtonGroupItems ?? [];
                    if (prevItems.length === 0) {
                        setItem(currentMarketGroup?.marketStatusItems.find(item => item.text === items[0]) as StatusItem);
                    } else if (items.length === 0) {
                        setItem({key: '', text: '', type: ''});
                    } else if (items.findIndex(i => i === item?.text) === -1) {
                        const newItem = currentMarketGroup?.marketStatusItems.find(item => item.text === items[0]) as StatusItem;
                        setItem(newItem);
                    }

                    const marketToStatusItems = mapMarketsToStatusItems(items, allMarketStatusItems);
                    setStatusButtonGroupState(marketToStatusItems);

                    return items;
                });
                break;
            case Action.PROVIDERS:
                setProviders(value as string[]);
                break;
            case Action.STATUS_ITEM:
                setItem(value as StatusItem);
                break;
            default:
                break;
        }
    }, [props, item]);

    const debouncedHandleTabChange = useCallback(
        debounce((index: number) => {
            setSelected(index);
            setCurrentMarketGroup(marketGroupsRef.current[index]);
        }, 300),
        []
    );

    const handleTabChange = useCallback(
        (index: number) => {
            debouncedHandleTabChange(index);
        },
        [debouncedHandleTabChange]
    );

    const mapMarketsToStatusItems = (markets: string[], allMarketStatusItems: StatusItem[]): StatusItem[] => {
        return markets
            .map((market) => allMarketStatusItems.find((item) => item.text === market))
            .filter((item): item is StatusItem => !!item);
    };

    useEffect(() => {
        if (marketSelectedResult && markets) {
            marketSelectedResult(markets);
        }
    }, [markets]);

    useEffect(() => {
        if (providerSelectedResult) {
            providerSelectedResult(providers);
        }
    }, [providers, props]);

    useEffect(() => {
        if (statusButtonOnClick) {
            statusButtonOnClick(item);
        }
    }, [item]);

    useEffect(() => {
        const index = (statusButtonGroupState ?? []).findIndex((statusItem) => statusItem.text === item?.text) ?? 0;
        setStatusButtonSelectedIndex(index);
    }, [item, markets, statusButtonGroupState]);

    useEffect(() => {
        if (currentMarketGroup) {
            setMarketPropsState(currentMarketGroup.marketProps);
            setStatusButtonGroupState(currentMarketGroup.statusButtonGroupItems);
            if (currentMarketGroup.statusButtonGroupItems.length > 0) {
                const item = currentMarketGroup.statusButtonGroupItems[0];
                setItem(item);
                setStatusButtonSelectedIndex(0);
            } else {
                setMarkets([])
                setItem({key: '', text: '', type: ''});
                setStatusButtonSelectedIndex(-1);
            }
        }
    }, [currentMarketGroup]);

    return {
        allMarketGroups,
        markets,
        providers,
        marketPropsState,
        statusButtonGroupState,
        item,
        handleFilterChange,
        handleTabChange,
        selected,
        statusButtonSelectedIndex
    };
};
