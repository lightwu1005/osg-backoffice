"use client"
import React from 'react'
import HeaderContainer from "@/modules/components/general/HeaderContainer";
import {ResponsiveStyleValue} from "@mui/system";
import {OutlinedInputProps} from "@mui/material/OutlinedInput";
import {InfoTextField} from "@/modules/components/TextField";

export interface InfoHeaderInputProps {
    id?: string
    header: string
    tip?: string
    error: boolean
    handleErrorChange?: (error: boolean) => void
    regex?: RegExp
    label: string
    helperText: string
    format?: ResponsiveStyleValue<'text' | 'money' | 'number' | 'options' | 'numeric'>
    onChange?: OutlinedInputProps['onChange']
    onBlurChange?: (event: React.FocusEvent<HTMLInputElement>) => void
    prefix?: string
    suffix?: string
    step?: number
    value: any
    disable?: boolean
    limitRange?: [number, number]
    type?: React.HTMLInputTypeAttribute | undefined
}

function InfoHeaderInput(props: InfoHeaderInputProps) {
    const {
        header,
        tip,
        ...infoTextFieldProps
    } = props;

    return (
        <HeaderContainer header={header} tip={tip}>
            <InfoTextField
                {...infoTextFieldProps}
            />
        </HeaderContainer>
    );
}

export default InfoHeaderInput;
