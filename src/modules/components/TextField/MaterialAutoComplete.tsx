import React, {useState, useEffect, useCallback} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import FilterListIcon from '@mui/icons-material/FilterList';
import {useTheme} from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import {MenuTextFieldProps} from "@/modules/components/TextField/MenuTextField";

/**
 * @param menuProps
 * @constructor
 * @description Single Menu Selection
 */
export function AutoMenuTextField(menuProps: MenuTextFieldProps) {
    const [selectedOption, setSelectedOption] = useState(menuProps.value || '');
    const theme = useTheme();
    const {shouldClear, onChange, value, error, helperText} = menuProps
    useEffect(() => {
        if (selectedOption !== '') {
            setSelectedOption('');
            if (onChange) {
                onChange('');
            }
        }
    }, [shouldClear]);

    useEffect(() => {
        setSelectedOption(value ?? '')
    }, [value]);

    const handleOptionChange = useCallback((
        event: React.SyntheticEvent<Element, Event>,
        newValue: unknown
    ) => {
        const newSelectedOption = newValue as string || ''
        setSelectedOption(newSelectedOption)
        if (onChange) {
            onChange(newSelectedOption)
        }
    },[onChange])

    const componentId = `input-textField-${(menuProps.id ?? menuProps.label ?? menuProps.placeholder)?.replace(/[^a-zA-Z0-9]/g, '-')}`;

    return (
        <Autocomplete
            id={componentId}
            disableClearable
            options={menuProps.options}
            loading={menuProps.isLoading}
            disabled={menuProps.disabled}
            autoHighlight
            getOptionLabel={(option) => option as string}
            renderOption={(props, option, { selected }) => {
                const {key, ...otherProps} = props as  React.HTMLAttributes<HTMLLIElement> & {key: React.Key};
                const optionString = option as string
                return (
                    <li
                        key={key}
                        {...otherProps}>
                        {selected ? <CheckIcon fontSize="small" /> : null}
                        {optionString}
                    </li>
                )
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    error={error}
                    helperText={helperText}
                    label={menuProps.placeholder}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: menuProps.prefix,
                        endAdornment: (
                            <>
                                {menuProps.isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                    sx={{
                        "& .MuiAutocomplete-listbox": {
                            zIndex: theme.zIndex.modal,
                        },
                        "& .MuiAutocomplete-input": {
                            padding: '7.5px 4px !important'
                        }
                    }}
                />
            )}
            onChange={handleOptionChange}
            value={selectedOption}
            popupIcon={menuProps.endAdornment ?? <FilterListIcon />}
        />
    );
}
