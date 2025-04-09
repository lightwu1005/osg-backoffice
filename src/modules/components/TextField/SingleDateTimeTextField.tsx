import * as React from "react";
import dayjs, {Dayjs} from "dayjs";
import {useEffect, useState} from "react";
import {
    DateTimeField,
    DateTimePicker,
    DateTimeValidationError,
    PickerChangeHandlerContext
} from "@mui/x-date-pickers-pro";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {SingleInputDateRangePickerProps} from "@/modules/components/TextField/SingleInputDateRangeTextField";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {getCurrentTimeZone} from "@/app/DayjsConfiguration";

dayjs.extend(utc);
dayjs.extend(timezone);

export interface SingleDateTimePickerProps extends Omit<SingleInputDateRangePickerProps, 'onChange'> {
    isAmPm?: boolean
    onChange?: (selectedDates: dayjs.Dayjs | null) => void;
}

/**
 *
 * @param isAmPm
 * @param shouldShowClearButton
 * @param props
 * @constructor
 *
 * @description Display date and time picker
 */
export function SingleDateTimePicker({isAmPm = false, shouldShowClearButton = false, ...props}: SingleDateTimePickerProps) {
    const [selectedDates, setSelectedDates] = React.useState<Dayjs | null>(null)

    useEffect(() => {
        if (props.shouldClear) {
            setSelectedDates(null);
            if (props.onChange)
                props.onChange(null);
        }
    }, [props]);

    const handleDateChange = (value: unknown, context: PickerChangeHandlerContext<DateTimeValidationError>) => {
        const newDates = value as dayjs.Dayjs | null;
        setSelectedDates(newDates);
        if (props.onChange)
            props.onChange(newDates);
    };

    const handleOpen = () => {
        const currentDateTime = dayjs()

        setSelectedDates( selectedDates ?? currentDateTime)
        if (props.onChange)
            props.onChange(selectedDates ?? currentDateTime);
    }

    const [key, setKey] = useState(Math.random());

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                timezone={getCurrentTimeZone()}
                label={props.label}
                slots={{field: DateTimeField}}
                ampm={isAmPm}
                format={props.format ?? (isAmPm ? 'DD/MM/YYYY hh:mm A' : 'DD/MM/YYYY HH:mm')}
                timeSteps={{minutes:1}}
                minDateTime={props.minTimestamp ? dayjs.unix(props.minTimestamp) : undefined}
                maxDateTime={props.maxTimestamp ? dayjs.unix(props.maxTimestamp) : undefined}
                slotProps={{
                    shortcuts: {
                        items: []
                    },
                    actionBar: {actions: shouldShowClearButton ? ['clear'] : []}
                }}
                value={selectedDates}
                onOpen={handleOpen}
                onChange={handleDateChange}
            />
        </LocalizationProvider>
    );
}
