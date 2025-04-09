import * as React from 'react';
import {TextField} from "@mui/material";
import {InputAdornment} from "@mui/material";
import {ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import {debounce} from "lodash";
import {SvgIconComponent} from "@mui/icons-material";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {useIntl} from "react-intl";


/**
 * @regex Provide the Regex to test the value fit the role
 * @shoyldClear If true then clear the value
 * @openDebounce Default is false, and if turn it on, then provide debounce function
 */
export interface CommonTextFieldProps {
    id?: string;
    helperText?: string
    width?: string;
    label?: string;
    value?: string;
    placeholder?:string;
    regex?: RegExp;
    onChange?: (value: string) => void;
    endAdornment?:ReactNode;
    iconComponent?: SvgIconComponent;
    shouldClear?: boolean;
    openDebounce?: boolean;
    prefix?: string;
}

export function CommonTextField({openDebounce = false, id, ...props}: CommonTextFieldProps){
    const [text, setText] = useState('')
    const [regexError, setRegexError] = useState('')
    const {shouldClear, onChange, regex, helperText} = props
    const intl = useIntl()
    const funType = LocalizationFunctionType.Common

    useEffect(() => {
        if (shouldClear) {
            setText('')
            if(onChange){
                onChange('')
                if (regex) {
                    setRegexError('')
                }
            }
        }
    }, [shouldClear, regex])

    const debouncedOnChange = useMemo(() => debounce((value) => {
        if (onChange) onChange(value);
    }, 500), [onChange])

    useEffect(() => {
        return () => debouncedOnChange.cancel()
    }, [debouncedOnChange])

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setText(newValue)
        if (regex && !regex.test(newValue)) {
            setRegexError(helperText ?? intl.formatMessage({
                id: `${funType}.invalidInput`, defaultMessage: 'Invalid input'
            }))
        } else {
            setRegexError('')
            if (openDebounce) {
                debouncedOnChange(newValue)
            } else {
                if (onChange) onChange(newValue)
            }
        }
    },[regex, openDebounce, debouncedOnChange, helperText, onChange])

    const componentId = `input-textField-${(id ?? props.label ?? props.placeholder)?.replace(/[^a-zA-Z0-9]/g, '-')}`;

    return (
        <TextField
            id={componentId}
            data-testid={componentId}
            fullWidth={true}
            label={props.label}
            variant="outlined"
            placeholder={props.placeholder}
            value={text}
            error={regexError.length > 0}
            onChange={handleChange}
            InputProps={{
                endAdornment: props.endAdornment ? (
                    <InputAdornment position="end">
                        {props.endAdornment}
                    </InputAdornment>
                ) : undefined,
            }}
                SelectProps={{
                IconComponent: props.iconComponent ? props.iconComponent : undefined,
            }}
            helperText={regexError}
        />
    );
}

