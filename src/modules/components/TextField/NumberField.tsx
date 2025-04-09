import React from 'react'
import {NumericFormat, NumericFormatProps} from 'react-number-format';

export interface NumberFieldProps {
    onChange: (value: string) => void;
    prefix?: string;
}

export const NumberField = React.forwardRef((props: NumericFormatProps & NumberFieldProps, ref) => {
    const {onChange, ...other} = props;
    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange(values.value);
            }}
            thousandSeparator
            valueIsNumericString
            {...(props.prefix ? {prefix: `${props.prefix} `} : undefined)}
        />
    );
});

NumberField.displayName = "NumberField"