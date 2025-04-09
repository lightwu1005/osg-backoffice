import React, {useEffect, useRef, useState} from 'react';
import {InputAdornment, TextField} from "@mui/material";
import {NumberField} from "@/modules/components/TextField/NumberField";
import {InfoHeaderInputProps} from "@/modules/components/infoHeaderInput/InfoHeaderInput";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import lodash from "lodash";

export interface InfoTextFieldProps extends Omit<InfoHeaderInputProps, 'header' | 'tip'> {}

const numberBlock = ['e', 'E', '+', '.'];
const numericBlock = ['e', 'E', '+', '/'];

/**
 * @param error Compare two values for greater or smaller.
 * @param isRangeError The field's upper and lower limits.
 */

export const InfoTextField: React.FC<InfoTextFieldProps> = ({
                                                                id,
                                                                error,
                                                                handleErrorChange,
                                                                format,
                                                                prefix,
                                                                suffix,
                                                                helperText,
                                                                regex,
                                                                value,
                                                                onChange,
                                                                onBlurChange,
                                                                disable,
                                                                step,
                                                                limitRange = format === 'money' ? [1, 999999999] as [number, number] : undefined,
                                                                ...other
                                                            }) => {
    const [isRangeError, setIsRangeError] = useState(false);
    const [isRegexError, setIsRegexError] = useState(false);
    const [resolvedHelperText, setResolvedHelperText] = useState<string>('')
    const intl = useIntl();
    const funCommonType = LocalizationFunctionType.Common
    const helper: string = intl.formatMessage({
        id: `${funCommonType}.inputValueLimit`,
        defaultMessage: 'The value cannot exceed the limit.'
    })
    const [refValue, setRefValue] = useState<string | number | undefined>(value)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let newValue = event.target.value;
        const maxLength = step ? getDecimalPlaces(step) : 0
        const isValidDecimal = isDecimalLengthExceeded(Number(newValue), maxLength)
        if (isValidDecimal) return value

        if (newValue.includes('.')) {
            const [integerPart, decimalPart] = newValue.split('.');
            if (decimalPart) {
                if (!/^0+$/.test(decimalPart)) {
                    newValue = integerPart + '.' + decimalPart.replace(/0+$/, '');
                } else {
                    newValue = integerPart + '.' + decimalPart;
                }
            }
        }

        if (newValue.length > 1 && newValue.startsWith('0') && !newValue.startsWith('0.')) {
            newValue = newValue.replace(/^0+/, '');
        }

        setRefValue(newValue)
        checkFieldValid(newValue)

        if (onChange) {
            onChange(event);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const blockList = format === 'numeric' ? numericBlock : format === 'number' ? numberBlock : []
        if (blockList.includes(event.key)) {
            event.preventDefault();
        }
    };

    const handleBlurChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let newValue = event.target.value;
        checkFieldValid(newValue)
    }

    const getDecimalPlaces = (num: number): number => {
        const numStr = num.toString();
        const decimalIndex = numStr.indexOf('.');
        return decimalIndex === -1 ? 0 : numStr.length - decimalIndex - 1;
    }

    const isDecimalLengthExceeded = (number: number, maxLength: number): boolean => {
        const decimalPart = number.toString().split('.')[1];
        if (!decimalPart) {
            return false;
        }
        return decimalPart.length > maxLength;
    }

    const checkFieldValid = (value: string) => {
        if (!value) return
        const isValidRegex = !(regex && !regex.test(value) && value !== '')
        const isValidRange = !(limitRange && (Number(value) > limitRange[1] || Number(value) < limitRange[0]))

        if (format === 'text') setIsRegexError(!isValidRegex)
        if (!isValidRange || !isValidRegex) {
            setIsRangeError(true)
            if (handleErrorChange) {
                handleErrorChange(true)
            }
        } else {
            setIsRangeError(false)
            if (handleErrorChange) {
                handleErrorChange(false)
            }
        }
    }

    useEffect(() => {
        if (error || isRegexError) {
            setResolvedHelperText(helperText)
        } else if (isRangeError) {
            setResolvedHelperText(helper)
        } else {
            setResolvedHelperText('')
        }
    }, [error, isRangeError]);

    useEffect(() => {
        if (!lodash.isNil(value)) {
            setRefValue(lodash.defaultTo(value, ''))
        }

        if (!value && value !== 0) {
            setIsRegexError(false)
            setIsRangeError(false)
        } else {
            checkFieldValid(value)
        }
    }, [value]);

    return (
        <div>
            {format === 'money' ? (
                <TextField
                    id={`info-textField-${id}`}
                    data-testid={`info-textField-${id}`}
                    type={"Number"}
                    disabled={disable}
                    {...other}
                    onChange={handleInputChange}
                    InputProps={{
                        inputComponent: NumberField as any,
                        inputProps: {
                            prefix: prefix
                        }
                    }}
                />
            ) : (
                <TextField
                    id={`info-textField-${id}`}
                    data-testid={`info-textField-${id}`}
                    disabled={disable ?? false}
                    error={error || isRangeError}
                    helperText={resolvedHelperText}
                    placeholder={other.label}
                    onKeyDown={format === 'number' || format === 'numeric' ? handleKeyDown : undefined}
                    onChange={handleInputChange}
                    value={refValue ?? value}
                    onBlur={handleBlurChange}
                    type={format === 'number' || format === 'numeric' ? 'Number' : undefined}
                    inputProps={
                        format === 'number' || format === 'numeric' ?
                            {
                                step: step
                            } :
                            undefined
                    }
                    InputProps={{
                        ...(prefix ? { startAdornment: <InputAdornment position="start">{prefix}</InputAdornment> } : {}),
                        ...(suffix ? { endAdornment: <InputAdornment position="end">{suffix}</InputAdornment> } : {}),
                    }}
                    {...other}
                />
            )}
        </div>
    );
};