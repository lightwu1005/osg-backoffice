import {CommonTextFieldProps} from "@/modules/components/TextField/CommonTextField";
import Autocomplete from "@mui/material/Autocomplete";
import {Search} from "@mui/icons-material";
import * as React from "react";
import {InputAdornment, TextField} from "@mui/material";
import {useCallback, useEffect, useState} from "react";

export interface AutoSearchFieldProps extends CommonTextFieldProps {
    options: string[];
}

export function AutoSearchTextField(props: AutoSearchFieldProps) {
    const [text, setText] = useState(props.value || '');
    const id = `input-textField-${props.id?.replace(/[^a-zA-Z0-9]/g, '_')}`;
    const {onChange, shouldClear} = props

    const handleChange = useCallback(( event: React.SyntheticEvent<Element, Event>, newValue: unknown) => {
        const newValueString = newValue as string
        setText(newValueString ?? '');
        if (onChange) {
            onChange(newValueString ?? '');
        }
    },[onChange])

    useEffect(() => {
        if (shouldClear) {
            setText('')
            if(onChange){
                onChange('')
            }
        }
    }, [shouldClear]);

    return (
        <Autocomplete
            id={id}
            data-testid={'AutoSearchInput'}
            disableClearable
            fullWidth={true}
            options={props.options}
            value={text}
            onChange={handleChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    helperText={props.helperText}
                    id={id}
                    placeholder={props.placeholder}
                    label={props.label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <InputAdornment position="end">
                                {<Search sx={{mr: -5}}/>}
                            </InputAdornment>
                        ),
                    }}
                />
            )}
        />
    );
}