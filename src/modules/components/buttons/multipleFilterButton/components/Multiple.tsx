import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {Box, Stack, TextField, Typography} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {Search} from "@mui/icons-material";
import {MultipleBlockProp, OptionItem} from "@/modules/components/buttons/multipleFilterButton/models/Interface"
import {debounce} from "lodash";
import {LazyMenuItem} from "@/modules/components/MenuItem/LazyMenuItem";
import { useIntl } from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";


export const MultipleBlock: React.FC<MultipleBlockProp> = ({
                                                               selected,
                                                               setSelected,
                                                               labelLangKey,
                                                               label,
                                                               options,
                                                               clearLabel,
                                                               queryParams,
                                                               onSearch,
                                                               loadNextPage,
                                                               totalElement,
                                                               isSingleSelect = false
                                                           }) => {
    // const [filterList, setFilterList] = useState<OptionItem[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (queryParams && loadNextPage && totalElement) {
                            const page = queryParams.page;
                            const pageSize = queryParams.pageSize;
                            const totalItemLoaded = page * pageSize;
                            if (totalItemLoaded < totalElement && options.length === totalItemLoaded) loadNextPage(page + 1);
                        }
                    }
                });
            },
            {
                root: document.getElementById('scroll-container')
            }
        );

        const lastItem = document.querySelector('.lazy-list-item:nth-last-child(2)') as Element
        if (lastItem) observer.observe(lastItem);

        return () => {
            if (lastItem) observer.unobserve(lastItem)
        }
    }, [options, loadNextPage, queryParams, totalElement]);

    const handleOptionClick = (event: React.MouseEvent<HTMLElement>, option: OptionItem) => {
        event.stopPropagation();
        if (!options) return;
        setSelected(prevState => {
            const isSelected = selected.some(item => item.id === option.id)
            if (isSelected) {
                return selected.filter(item => item.id !== option.id)
            } else {
                return isSingleSelect ? [option] : [...prevState, option]
            }
        });
    }

    const debouncedSearch = useCallback(
        debounce((s) => {
            onSearch(s);
        }, 500),
        []
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        debouncedSearch(e.target.value);
    };

    const intl = useIntl();
    const funType = LocalizationFunctionType.Common;
    const translateText = (key: string, label: string) => {
        return intl.formatMessage({ id: `${funType}.${key}`, defaultMessage: label });
    }

    return (
        <>
            <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'}
                   sx={{cursor: 'pointer'}}
                   onClick={() => {
                       if (clearLabel) clearLabel()
                   }}>
                <ArrowBackIosNewIcon sx={{width: '0.75rem', margin: '8px 6px'}}/>
                <Typography variant={'subtitle2'} sx={{fontWeight: 800}}>
                    {translateText(labelLangKey, label)}
                </Typography>
            </Stack>
            <Box my={2}>
                <TextField
                    sx={{height: '2.5rem'}}
                    placeholder={`${translateText('search', 'Search')}${translateText(labelLangKey, label)}`}
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: <Search/>
                    }}
                />
            </Box>
            <Box maxHeight={'300px'} overflow={'auto'} id={'scroll-container'}>
                {
                    options.map((option, index) => {
                        const isSelected = Boolean(selected.find(item =>
                            item.id === option.id || item.name.toLowerCase() === option.name.toLowerCase()))
                        return <LazyMenuItem
                            key={`options_${option.id}`}
                            option={option}
                            selected={isSelected}
                            onChange={handleOptionClick}
                        />
                    })
                }
            </Box>
        </>
    )
}