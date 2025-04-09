import {Box, Stack} from "@mui/material";
import FilterTag, {TagProps} from "@/app/betSlip/components/FilterKeeper/FilterTag";
import React, {useEffect, useState} from "react";
import FilterDropdown from "@/app/betSlip/components/FilterKeeper/FilterDropdown";
import store, {setBetSlipFilters, setBetSlipLastFilter} from "@/modules/common/IdentityRedux";
import {OptionItem, SelectedOptions} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {
    BetAmountModel,
    getConditionDisplayValue
} from "@/app/betSlip/components/NumberRangeTextField";
import isEqual from 'lodash/isEqual';
import useFilterMemory from "@/app/betSlip/domain/useFilterMemory";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {useIntl} from "react-intl";
import {BetSlipExportParameter} from "@/app/betSlip/components/models/BetSlipParameters";
import {getEventDateRangeDisplayValue} from "@/modules/common/DisplayFormatConverter";

export interface FilterKeeperProps {
    data: SelectedOptions<any>
    onSelected: (selectedOptions: SelectedOptions<any>) => void
}

export interface BetSlipFiltersData {
    [key: string]: SelectedOptions<any>;
}

const compareSelectedOptions = (options1: SelectedOptions<any>, options2: SelectedOptions<any>) => {
    return isEqual(options1, options2);
}

const isBetAmountModel = (items: any): items is BetAmountModel => {
    return items && typeof items === 'object' && 'condition' in items && 'firstAmount' in items;
}

export interface EventDateRangeModel extends BetSlipExportParameter {}

const isEventDateRange = (items: any): items is EventDateRangeModel => {
    const isItems = items && typeof items === 'object' && 'startDate' in items && 'endDate' in items;
    const isNumber = isItems && typeof items.startDate === 'number' && typeof items.endDate === 'number';
    return isItems && isNumber;
}

const FilterKeeper = ({data, onSelected}: FilterKeeperProps) => {
    const [defaultData, setDefaultData] = useState(data)
    const [tags, setTags] = useState<React.ReactNode[]>([])
    const [hasChanged, setHasChanged] = useState(false)
    const {filters, setFilters, index: currentIndex, setIndex} = useFilterMemory()
    const intl = useIntl()
    const funType = LocalizationFunctionType.Common

    useEffect(() => {
        setDefaultData(data);
    }, [data]);

    useEffect(() => {
        const [_, selectedData] = Object.entries(filters)[currentIndex] ?? [undefined, undefined]
        if (selectedData) {
            const isSame = compareSelectedOptions(defaultData, selectedData)
            setHasChanged(!isSame)
        }
    }, [defaultData, currentIndex, filters]);

    useEffect(() => {
        setTags(createFilterTags(defaultData));
        onSelected(defaultData);
    }, [defaultData, onSelected]);

    const createFilterTags = (data: SelectedOptions<any>) => {
        const filterTags: React.ReactNode[] = [];
        Object.keys(data).forEach((key) => {
            const items = data[key];
            if (isBetAmountModel(items)) {
                filterTags.push(createBetAmountTag(key, items));
            } else if (Array.isArray(items)) {
                filterTags.push(...createOptionItemTags(key, items));
            } else if (isEventDateRange(items)) {
                filterTags.push(createEventDateRangeTag(key, items));
            }
        });
        return filterTags;
    }

    const createBetAmountTag = (key: string, item: BetAmountModel) => (
        <FilterTag
            key={`${key}-${item.condition}`}
            id={item.condition}
            label={key}
            value={getConditionDisplayValue(item, intl, funType)}
            onRemove={removeItem}
        />
    )

    const createEventDateRangeTag = (key: string, item: EventDateRangeModel) => (
        <FilterTag
            key={`${key}-${item.startDate}-${item.endDate}`}
            id={item.startDate.toString()}
            label={key}
            value={getEventDateRangeDisplayValue(item, intl, funType)}
            onRemove={removeItem}
        />
    )

    const createOptionItemTags = (key: string, items: OptionItem[]) => (
        items.map((item, index) => (
            <FilterTag
                key={`${key}-${index}-${item.name}`}
                id={item.id}
                label={key}
                value={item.name}
                onRemove={removeItem}
            />
        ))
    )

    const removeItem = ({id, label, value}: TagProps) => {
        setDefaultData(prevData => {
            return getUpdatedData(prevData, label, id, value);
        });
    }

    const getUpdatedData = (prevData: SelectedOptions<any>, label: string, id: string, value: string): SelectedOptions<any> => {
        const entries = Object.entries(prevData);
        const newEntries = entries.map(([key, options]) =>
            updateOptions(key, options, label, id, value));
        return Object.fromEntries(newEntries);
    }

    const updateOptions = (key: string, options: any, label: string, id: string, value: string) => {
        if (label === key) {
            if (Array.isArray(options)) {
                return [key, filterOptions(options, id, value)];
            } else {
                return [key, []];
            }
        }
        return [key, options];
    }

    const filterOptions = (options: OptionItem[], id: string, value: string): OptionItem[] => {
        return options.filter(option => !(option.name === value && option.id === id));
    }

    const selectedIndex = (index: number) => {
        if (currentIndex === index) return
        setIndex(index)
        store.dispatch(setBetSlipLastFilter(index))
        const data = Object.entries(filters)[index][1];
        setDefaultData(data)
        onSelected(data)
    }

    function updateFilter(index: number) {
        setFilters(prevState => {
            const entries = Object.entries(prevState);
            if (index >= 0 && index < entries.length) {
                const [key, _] = entries[index];
                entries[index] = [key, defaultData];
            }
            const newFilter = Object.fromEntries(entries);
            store.dispatch(setBetSlipFilters(newFilter))
            return newFilter
        })
    }

    function updateFilterName(index: number, newKey: string) {
        setFilters(prevState => {
            const entries = Object.entries(prevState);
            if (index >= 0 && index < entries.length) {
                const [_, value] = entries[index];
                entries[index] = [newKey, value];
            }
            const newFilter = Object.fromEntries(entries);
            store.dispatch(setBetSlipFilters(newFilter))
            return newFilter
        })
    }

    function createFilter(key: string) {
        setFilters(prevState => {
            const entries = Object.entries(prevState);
            entries.push([key, defaultData])
            const newFilter = Object.fromEntries(entries);
            store.dispatch(setBetSlipFilters(newFilter))
            setIndex(entries.length - 1)
            return newFilter
        })
    }

    function removeFilter(index: number, key: string) {
        setFilters(prevState => {
            const entries = Object.entries(prevState);
            const newEntries = entries.filter((_, _index) => index !== _index)
            const newFilterNames = Object.fromEntries(newEntries);
            store.dispatch(setBetSlipFilters(newFilterNames))
            if (newEntries.length === 0) {
                setTags([])
                setDefaultData({})
            } else if (index === currentIndex) {
                if (index === 0) {
                    const [_, data] = newEntries[0]
                    setDefaultData(data)
                } else {
                    selectedIndex(0)
                }
            } else {
                setIndex(prevState => {
                    if (index < prevState) {
                        return prevState - 1
                    } else {
                        return prevState
                    }
                })
            }
            return newFilterNames
        })
    }

    const handleAction = (filterName: string, index: number, action: 'selected' | 'saveAs' | 'save' | 'edit' | 'remove') => {
        switch (action) {
            case "selected":
                selectedIndex(index)
                break
            case "save":
                updateFilter(index)
                break;
            case "saveAs":
                createFilter(filterName)
                break;
            case "edit":
                updateFilterName(index, filterName)
                break
            case "remove":
                removeFilter(index, filterName)
                break
        }
    }

    return (
        <div>
            {(Object.keys(filters).length > 0 || tags.length > 0) &&
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '0.5rem',
                        borderRadius: '0.25rem',
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            overflowX: 'auto',
                            '&::-webkit-scrollbar': {
                                display: 'none',
                            },
                        }}
                    >
                        {tags}
                    </Stack>

                    <FilterDropdown filterNames={Object.keys(filters)} hasChanged={hasChanged}
                                    selectedIndex={currentIndex} handleAction={handleAction}/>
                </Box>
            }
        </div>
    )
}

export default FilterKeeper