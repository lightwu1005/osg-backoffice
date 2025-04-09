import {useEffect, useState} from "react";
import * as React from "react";
import {InputAdornment, TextField} from "@mui/material";
import {FilterList} from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";
import {CommonTextFieldProps} from "@/modules/components/TextField/CommonTextField";

/**
 * @param options string[]
 * @param isLoading boolean?
 */
export interface MenuTextFieldProps extends CommonTextFieldProps {
    options: string[];
    isLoading?: boolean,
    disabled?: boolean
    error?: boolean
    helperText?: string
}

export function MenuTextField(props: MenuTextFieldProps) {
    const [selectedOption, setSelectedOption] = useState(props.value ?? '');
    const {shouldClear, onChange} = props

    useEffect(() => {
        if (shouldClear) {
            setSelectedOption('')
            if (onChange) {
                onChange('')
            }
        }
    }, [shouldClear])

    useEffect(() => {
        if (props.value && props.options.includes(props.value)) {
            setSelectedOption(props.value);
        }
    }, [props.value]);

    const handleOptionChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setSelectedOption(newValue);

        if (props.onChange) {
            props.onChange(newValue);
        }
    };

    const id = `input-textField-${(props.id ?? props.label ?? props.placeholder)?.replace(/[^a-zA-Z0-9]/g, '-')}`;

    return (
        <TextField
            fullWidth={true}
            helperText={props.helperText}
            id={id}
            select
            prefix={props.prefix}
            placeholder={props.placeholder}
            label={props.label}
            value={selectedOption}
            onChange={handleOptionChange}
            InputProps={{
                endAdornment: props.endAdornment ? (
                    <InputAdornment position="end">
                        {props.endAdornment ?? <FilterList/>}
                    </InputAdornment>
                ) : undefined
            }}
            SelectProps={{
                IconComponent: props.iconComponent ? props.iconComponent : FilterList,
            }}
            sx={{
                height: 40
            }}
        >
            {props.options.map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
    );
}
