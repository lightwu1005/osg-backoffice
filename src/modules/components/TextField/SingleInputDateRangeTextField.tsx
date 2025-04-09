import {useCallback, useEffect, useState} from "react";
import {DateRange} from "@mui/x-date-pickers-pro";
import dayjs, {Dayjs} from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateRangePicker} from "@mui/x-date-pickers-pro/DateRangePicker";
import {SingleInputDateRangeField} from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import {InputAdornment} from "@mui/material";
import {DateRangeOutlined} from "@mui/icons-material";
import {daysShortType, shortcutsOptions} from "@/modules/components/TextField/ShortcutsItems";
import * as React from "react";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {isSafeDateRange} from "@/utils/tools";
import {getCurrentTimeZone} from "@/app/DayjsConfiguration";

dayjs.extend(utc);
dayjs.extend(timezone);

export interface SingleInputDateRangePickerProps {
    label?: string
    format?: string
    daysType?: daysShortType[]
    value?: DateRange<Dayjs>
    onChange?: (selectedDates: DateRange<Dayjs> | null) => void
    shouldClear?: boolean
    minTimestamp?: number
    maxTimestamp?: number
    shouldShowClearButton?: boolean
    sx?: SxProps<Theme>
}

/**
 *
 * @param props
 * @constructor
 * @description Display Date range picker in one textField
 */
export function SingleInputDateRangePicker(props: SingleInputDateRangePickerProps) {
    const [key, setKey] = useState(Math.random());
    const {onChange, shouldClear} = props

    useEffect(() => {
        if (shouldClear) {
            if (onChange)
                onChange(null)
            setKey(Math.random())
        }
    }, [shouldClear])

    const handleDateChange = useCallback((newDates: DateRange<Dayjs> | null) => {
        if (onChange && isSafeDateRange(newDates)) {
            const [startDate, endDate] = newDates ?? [null, null]
            const adjustedEndDate = endDate ? endDate.tz().endOf('day') : null
            const adjustedStartDate = startDate ? startDate.tz().startOf('day') : null
            onChange([adjustedStartDate, adjustedEndDate]);
        }
    },[onChange])

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
                key={key}
                sx={props.sx}
                slots={{ field: SingleInputDateRangeField }}
                timezone={getCurrentTimeZone()}
                name="allowedRange"
                format={props.format ? props.format : 'YYYY/MM/DD'}
                minDate={props.minTimestamp ? dayjs.unix(props.minTimestamp) : undefined}
                maxDate={props.maxTimestamp ? dayjs.unix(props.maxTimestamp) : undefined}
                slotProps={{
                    textField: {
                        InputProps: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <DateRangeOutlined/>
                                </InputAdornment>
                            ),
                        },
                    },
                    shortcuts: {
                        items: shortcutsOptions(props.daysType ?? [])
                    },
                    actionBar: {actions: props.shouldShowClearButton ? ['clear'] : []}
                }}
                value={props.value}
                label={props.label}
                onChange={handleDateChange}
            />
        </LocalizationProvider>
    );
}