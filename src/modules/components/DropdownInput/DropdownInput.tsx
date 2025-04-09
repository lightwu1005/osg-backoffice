import React, {useEffect, useRef, useState} from 'react'
import {Box, InputAdornment, Menu, MenuItem, Stack, TextField, Typography} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import {Search} from "@mui/icons-material";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {useIntl} from "react-intl";

export interface DropdownSearch {
    type?: string
    value?: string
}

export interface DropdownInputProps {
    searchOptions: string[]
    shouldClear?: boolean
    onSearch?: (type: string, value: string) => void
    defaultSearch?: DropdownSearch
    search?: DropdownSearch
}

const dropdownTextStyles = {
    whiteSpace: 'nowrap' as const,
    fontFamily: 'Inter',
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '150%',
};

const DropdownInput: React.FC<DropdownInputProps> = ({searchOptions, shouldClear, onSearch, defaultSearch, search}) => {
    const defaultSearchTypeSetting = (defaultSearch?.type ?? searchOptions[0] ?? '')
    const defaultSearchValueSetting = (defaultSearch?.value ?? '')
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [searchType, setSearchType] = useState<string>(defaultSearchTypeSetting)
    const [searchValue, setSearchValue] = useState<string>(defaultSearchValueSetting)
    const [typingTimeout, setTypingTimeout] = useState<number | null>(null)
    const [elementHeight, setElementHeight] = useState<number>(0)
    const [elementWidth, setElementWidth] = useState<number>(0)
    const textRef = useRef<HTMLDivElement | null>(null)
    const intl = useIntl()
    const funType = LocalizationFunctionType.Common

    const handleDropdownClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = (value?: string) => {
        if (value) {
            setSearchType(value)
            if (searchValue !== '' && onSearch) {
                onSearch(value, searchValue)
            }
        }
        setAnchorEl(null)
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setSearchValue(newValue)
        if (typingTimeout) {
            clearTimeout(typingTimeout)
        }
        setTypingTimeout(window.setTimeout(() => {
            handleSearch(newValue)
        }, 500))
    }

    const handleSearch = (value: string) => {
        if (onSearch)
            onSearch(searchType, value)
    }

    const open = Boolean(anchorEl)

    useEffect(() => {
        const height = textRef.current?.offsetHeight;
        if (height) {
            setElementHeight(height);
        }
        calculateTextWidth(searchOptions);
    }, []);

    useEffect(() => {
        if (shouldClear && searchValue.length !== 0) {
            setSearchValue('');
            if (onSearch) {
                onSearch('', '');
            }
        }
    }, [shouldClear, searchValue.length]);

    useEffect(() => {
        if (search) {
            setSearchType(search.type ?? defaultSearchTypeSetting);
            setSearchValue(search.value ?? defaultSearchValueSetting);
        }
    }, [search]);

    const calculateTextWidth = (texts: string[]) => {
        const span = document.createElement('span');
        span.style.visibility = 'hidden';
        span.style.position = 'absolute';
        Object.assign(span.style, dropdownTextStyles);

        document.body.appendChild(span);

        let maxWidth = 0;
        texts.forEach(text => {
            span.innerText = text;
            const width = span.offsetWidth; // adding some padding for the dropdown icon
            if (width > maxWidth) {
                maxWidth = width;
            }
        });

        document.body.removeChild(span);
        setElementWidth(maxWidth);
    };

    return (
        <Box>
            <Stack direction={'row'} alignItems={'center'} borderRadius={'0.5rem'}>
                <Stack
                    aria-label={'dropdown'}
                    direction={'row'}
                    onClick={handleDropdownClick}
                    alignItems={'center'}
                    sx={{
                        padding: '8px 12px',
                        border: '1px solid',
                        borderRight: 0,
                        borderColor: 'FilledInput.hoverBg',
                        borderRadius: '8px 0 0 8px',
                        backgroundColor: '#F0F4F8',
                        '[data-mui-color-scheme="dark"] &': {
                            backgroundColor: '#171A1C',
                        },
                        height: elementHeight,
                    }}
                >
                    <Typography
                        sx={{
                            color: '#32383E',
                            '[data-mui-color-scheme="dark"] &': {
                                color: '#FBFCFE',
                            },
                            width: elementWidth,
                            ...dropdownTextStyles,
                        }}>{searchType}</Typography>
                    {open ?
                        <ArrowDropUpIcon sx={{
                            color: '#636B74',
                            '[data-mui-color-scheme="dark"] &': {
                                color: '#FBFCFE',
                            },
                        }}/> :
                        <ArrowDropDownIcon sx={{
                            color: '#636B74',
                            '[data-mui-color-scheme="dark"] &': {
                                color: '#FBFCFE',
                            },
                        }}/>
                    }
                </Stack>
                <TextField
                    ref={textRef}
                    value={searchValue}
                    onChange={handleSearchChange}
                    label={intl.formatMessage({id: `${funType}.search`, defaultMessage: 'Search'})}
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Search/>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '.MuiOutlinedInput-root': {
                            borderRadius: '0 8px 8px 0',
                        },
                    }}
                />
                <Menu
                    aria-label={'menu'}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => handleMenuClose()}
                >
                    {searchOptions.map((option) => (
                        <MenuItem key={option} onClick={() => handleMenuClose(option)}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </Stack>
        </Box>
    )
}

export default DropdownInput
