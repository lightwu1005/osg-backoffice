import * as React from 'react';
import {ChangeEvent, ReactElement, useCallback, useEffect, useState} from 'react';
import {Box, Button, Chip, Popover, Stack, TextField, Typography} from "@mui/material";
import {FilterList, Search} from "@mui/icons-material";
import {
    FilterCustomVMProps,
    FilterSectionProps,
    FilterVM,
    FilterVMProps,
    MultipleFilterButtonProps,
} from "@/modules/components/buttons/multipleFilterButton/models/Interface"
import {AllSearchBlock} from "@/modules/components/buttons/multipleFilterButton/components/AllSearch";
import {debounce} from "lodash";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {useIntl} from "react-intl";

export const MultipleFilterButton = ({children, selected, setSelected, onClean, canClean}: MultipleFilterButtonProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [focusedLabel, setFocusedLabel] = useState<React.ReactNode>()
    const [search, setSearch] = useState<string>('')
    const [allSearch, setAllSearch] = useState<string>('')
    const [selectedAmount, setSelectedAmount] = useState<number>(0)
    const [updatedChildren, setUpdatedChildren] = useState<ReactElement<FilterVM> | ReactElement<FilterVM>[]>([])
    const open = Boolean(anchorEl);
    const intl = useIntl()
    const funType = LocalizationFunctionType.Common

    const handleFilterButtonOnClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setFocusedLabel('')
        setSearch('')
        setAllSearch('')
    };
    const handleClean = () => {
        setSelected({})
        setSearch('')
        setAllSearch('')
        setFocusedLabel('')
        if (onClean && canClean) {
            onClean()
        }
    }
    const handleSearch = (s: string) => {
        setSearch(s)
        debouncedSearch(s)
    }

    const debouncedSearch = useCallback(debounce((search: string) => {
        setAllSearch(search)
    }, 500), []);

    useEffect(() => {
        const flatArr = Object.values(selected).flat().filter(value => value);
        setSelectedAmount(flatArr.length)
    }, [selected]);

    useEffect(() => {
        const updatedChildren = React.Children.map(children, (child) => {
            let label
            if (React.isValidElement<FilterVMProps<any>>(child) && child.props.ViewModel !== undefined) {
                label = child.props.ViewModel.getFilterItemProps().label
            } else if (React.isValidElement<FilterCustomVMProps>(child) && child.props.ItemProps !== undefined) {
                label = child.props.ItemProps.getFilterItemProps().label
            }
            if (label && React.isValidElement<FilterSectionProps<any>>(child)) {
                if (selected[label] === undefined) {
                    selected[label] = []
                }
                const cloneChild = React.cloneElement(child, {
                    onChange: setSelected,
                    clearLabel: () => setFocusedLabel(undefined),
                    selected: selected[label],
                    key: label,
                });
                return cloneChild
            }
            return child;
        });
        setUpdatedChildren(updatedChildren)
    }, [children, selected]);

    return (<Box>
        <Button
            sx={{
                height: 52,
                minWidth: 'auto',
                border: '1px solid',
                borderColor: 'FilledInput.hoverBg',
                ":hover": { borderColor: 'FilledInput.hoverBg' },
                textTransform: 'none',
                color: 'text.secondary',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                backgroundColor: 'FilledInput.bg'
            }}
            startIcon={<FilterList/>}
            variant={'outlined'}
            onClick={handleFilterButtonOnClick}
        >
            {intl.formatMessage({id: `${funType}.filter`, defaultMessage: 'Filter'})}
            {selectedAmount > 0 &&
                <Chip label={selectedAmount} size="small"
                      sx={{backgroundColor: '#0B6BCB', color: '#FFFFFF', marginLeft: '5px'}}/>}
        </Button>
        <Popover open={open}
                 onClose={handleClose}
                 anchorEl={anchorEl}
                 anchorOrigin={{
                     vertical: 'bottom',
                     horizontal: 'left',
                 }}
        >
            <Box padding={2} minWidth={350}>
                {!focusedLabel &&
                    <>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <Typography fontWeight={'600'} variant={'body2'}>
                                { intl.formatMessage({id: `${funType}.filter`, defaultMessage: 'Filter'}) }
                            </Typography>
                            <Button disabled={!(selectedAmount > 0 || canClean)}
                                    onClick={handleClean}>
                                { intl.formatMessage({id: `${funType}.clean`, defaultMessage: 'Clean'}) }
                            </Button>
                        </Stack>
                        <Box my={2}>
                            <TextField
                                sx={{height: '2.5rem'}}
                                placeholder={intl.formatMessage({id: `${funType}.search`, defaultMessage: 'Search'})}
                                variant="outlined"
                                value={search}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
                                InputProps={{
                                    endAdornment: <Search/>
                                }}
                            />
                        </Box>
                    </>
                }
                {
                    focusedLabel || (
                        allSearch.length > 0 ?
                            <AllSearchBlock search={allSearch} onChange={setSelected} onClose={handleClose}>
                                {children}
                            </AllSearchBlock>
                            :
                            <Box maxHeight={'300px'} overflow={'auto'}>
                                {
                                    React.Children.map(updatedChildren, (child, index) => {
                                        let getFilterItemProps
                                        if (React.isValidElement<FilterVMProps<any>>(child) && child.props.ViewModel !== undefined) {
                                            getFilterItemProps = child.props.ViewModel.getFilterItemProps
                                        } else if (React.isValidElement<FilterCustomVMProps>(child) && child.props.ItemProps !== undefined) {
                                            getFilterItemProps = child.props.ItemProps.getFilterItemProps
                                        }
                                        if (getFilterItemProps) {
                                            const {labelLangKey, label, icon: Icon} = getFilterItemProps()
                                            const selectedItem = selected[label]
                                            return (
                                                <Stack direction={'row'} justifyContent={'flex-start'}
                                                       alignItems={'center'}
                                                       mb={1} sx={{cursor: 'pointer'}}
                                                       onClick={() => setFocusedLabel(child)}
                                                       key={index}
                                                >
                                                    <Icon sx={{width: '1.25rem', margin: '0.5rem', color: '#636B74'}}/>
                                                    <Typography variant="subtitle2">
                                                        {intl.formatMessage({id: `${funType}.${labelLangKey}`, defaultMessage: label})}
                                                        {selectedItem && (
                                                            Array.isArray(selectedItem) ?
                                                                (selectedItem.length > 0 &&
                                                                    <span style={{ color: '#2196F3' }}> ({selectedItem.length})</span>
                                                                ) :
                                                                <span style={{ color: '#2196F3' }}> (1)</span>
                                                        )}
                                                    </Typography>
                                                </Stack>
                                            )
                                        }
                                    })
                                }
                            </Box>
                    )
                }
            </Box>
        </Popover>
    </Box>)
}