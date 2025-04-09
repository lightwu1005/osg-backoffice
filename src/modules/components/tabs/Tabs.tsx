"use client"
import React, {useEffect, useState} from 'react';
import MuiTabs from '@mui/material/Tabs';
import Box from "@mui/material/Box";
import MuiTab from "@mui/material/Tab";
import {FilterList} from "@mui/icons-material";
import {Checkbox, Popover, Stack} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {SearchTextField} from "@/modules/components/TextField";

export interface TabProps {
    icon?: string | React.ReactElement
    id?: string
    label: React.ReactNode
}

export interface FilterTabProps {
    searchLabel: string
    filterLabel: string
}

export interface TabsProps {
    labels: TabProps[]
    labelsOnly?: boolean
    filterTab?: FilterTabProps | null
    children: React.ReactNode
    defaultSelected?: number
    selected?: number
    variant?: 'standard' | 'scrollable' | 'fullWidth'
    onTabChange?: (index: number) => void
}

interface TabPanelProps {
    children: React.ReactNode
    index: number
    value: number
}

function TabPanel({children, value, index}: TabPanelProps) {
    if (value === index) {
        return (
            <div style={{
                flexGrow: 1, display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
            }}>
                {children}
            </div>
        );
    }
    return undefined
}

export default Tabs

function Tabs({
                  labels,
                  labelsOnly = false,
                  filterTab,
                  children,
                  defaultSelected = 0,
                  selected,
                  variant = 'scrollable',
                  onTabChange
              }: Readonly<TabsProps>) {
    if (!labelsOnly && labels.length !== React.Children.count(children))
        throw Error('labels and children quantities are inconsistent.')

    const [value, setValue] = React.useState(defaultSelected);
    const [search, setSearch] = useState('')
    const [selectedOptions, setSelectedOptions] = useState<TabProps[]>(labels);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);
    const isFilterTab = Boolean(filterTab);

    const reformSelections = (item: TabProps): TabProps[] => {
        if (selectedOptions.includes(item)) {
            if (selectedOptions.length !== 1) {
                const index = selectedOptions.indexOf(item);
                if (index === value) {
                    return selectedOptions
                } else if (index < value && value > 0) {
                    setValue(value - 1)
                }
                return selectedOptions.filter((option) =>
                    item !== option
                )
            } else {
                setValue(0);
                return selectedOptions
            }
        } else {
            const sortedOptions = [item, ...selectedOptions]
            const filterOptions = labels.filter(label => sortedOptions.some(item => item.label === label.label))
            const index = filterOptions.indexOf(item);
            if (index <= value) setValue(value + 1)
            return filterOptions
        }
    }

    const handleChange = (event: React.SyntheticEvent, newIndex: number) => {
        setValue(newIndex);
        if (onTabChange) {
            onTabChange(newIndex);
        }
    };

    const handleInputOnChange = (value: string) => {
        setSearch(value.toLowerCase());
    }

    const filterTabOnClick = (event: React.MouseEvent<HTMLElement>) => {
        setSearch('');
        setAnchorEl(event.currentTarget);
    }

    const handleSelectAll = (event: React.MouseEvent<HTMLElement>) => {
        const item = selectedOptions[value];
        if (selectedOptions.length === labels.length) {
            const index = labels.indexOf(item);
            setSelectedOptions([labels[index]]);
            setValue(0);
        } else {
            const sortedOptions = labels;
            const index = sortedOptions.indexOf(item);
            setSelectedOptions(sortedOptions);
            setValue(index);
        }
    }

    const handleMenuItemOnclick = (item: TabProps) => {
        setSelectedOptions(reformSelections(item));
    }

    const handleMenuOnClose = () => {
        setAnchorEl(null);
    }

    useEffect(() => {
        setSelectedOptions(labels);
    }, [labels]);

    useEffect(() => {
        if (selected !== undefined) {
            setValue(selected);
        }
    }, [selected]);

    const selectedChildren = selectedOptions.map(option => {
        const index = labels.indexOf(option);
        return React.Children.toArray(children)[index];
    });

    return (
        <Box sx={{
            width: '100%',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
        }}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-evenly'}>
                {
                    isFilterTab &&
                    <Box>
                        <MuiTab
                            sx={{
                                whiteSpace: 'nowrap',
                                fontWeight: 800,
                                textTransform: 'none'
                            }}
                            data-testid={'FilterTab'}
                            key={'filter'}
                            icon={<FilterList/>}
                            iconPosition={'start'}
                            label={filterTab?.filterLabel ?? ''}
                            onClick={filterTabOnClick}
                        />
                        <Popover data-testid={'TabMenu'}
                                 open={menuOpen}
                                 anchorOrigin={{
                                     vertical: 'bottom',
                                     horizontal: 'left',
                                 }}
                                 transformOrigin={{
                                     vertical: 'top',
                                     horizontal: 'left',
                                 }}
                                 anchorEl={anchorEl}
                                 onClose={handleMenuOnClose}
                        >
                            <MenuItem key={'TabSearchField'}
                                      sx={{
                                          paddingTop: 2,
                                          '&.Mui-focusVisible': {
                                              backgroundColor: 'transparent',
                                          }
                                      }}
                            >
                                <SearchTextField
                                    label={filterTab?.searchLabel ?? ''}
                                    value={search}
                                    onChange={(value) => handleInputOnChange(value)}
                                />
                            </MenuItem>
                            {
                                (search === '') ? (
                                    <MenuItem
                                        data-testid={'ItemAll'}
                                        key={'ALL'}
                                        onClick={handleSelectAll}
                                        divider={true}
                                    >
                                        <Checkbox checked={selectedOptions.length === labels.length}/>
                                        {'Select All'}
                                    </MenuItem>
                                ) : <Box></Box>
                            }
                            {
                                labels.filter((item) =>
                                    (item.label as string).toLowerCase().includes(search)
                                ).map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        onClick={() => {
                                            handleMenuItemOnclick(item)
                                        }}
                                    >
                                        <Checkbox checked={selectedOptions.includes(item)}/>
                                        {item.label}
                                    </MenuItem>
                                ))
                            }
                        </Popover>
                    </Box>
                }
                <MuiTabs
                    sx={{width: '100vw'}}
                    value={value}
                    onChange={handleChange}
                    variant={variant}
                    visibleScrollbar
                    scrollButtons={false}
                >
                    {
                        selectedOptions.map(({icon, label}, index) => (
                            <MuiTab data-testid={'MuiTab'} key={index} icon={icon} iconPosition="start" label={label}/>
                        ))
                    }
                </MuiTabs>
            </Stack>
            {
                selectedChildren.map(
                    (child, index) => (
                        <TabPanel value={value} index={index} key={index}>
                            {child}
                        </TabPanel>
                    )).filter((child) => child !== undefined)
            }
        </Box>
    );
}
