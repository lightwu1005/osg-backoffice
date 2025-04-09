import * as React from "react";
import {useCallback, useEffect, useRef, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {Popover} from "@mui/material";
import {DateRange, pickersLayoutClasses, StaticDateRangePicker} from "@mui/x-date-pickers-pro";
import {getCurrentTimeZone} from "@/app/DayjsConfiguration";
import ToggleProps from "@/modules/interface/ToggleProps";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

dayjs.extend(utc);
dayjs.extend(timezone);

interface DateRangeDialogProps extends ToggleProps{
    readonly date?: DateRange<Dayjs>
    readonly anchorEl:  React.RefObject<HTMLSpanElement> | undefined;
    readonly onDateChange: (dateRange: DateRange<Dayjs>) => void;
}

export function DateRangeDialog({ date, anchorEl, open, setOpen, onDateChange }: DateRangeDialogProps) {
    const dateRange = useRef(date)
    const [_anchorEl, setAnchorEl] = useState<React.RefObject<HTMLSpanElement> | undefined | null>(anchorEl);

    useEffect(() => {
        setAnchorEl(anchorEl);
    }, [anchorEl]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleDateAccept = useCallback((newDates: DateRange<Dayjs>) => {
        if (onDateChange) {
            if (newDates[0] && !newDates[1]) {
                newDates[1] = newDates[0];
            }
            onDateChange(newDates);
            handleClose();
        }
    }, [])

    return <Popover
        open={open}
        anchorEl={_anchorEl?.current}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
    >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDateRangePicker
                timezone={getCurrentTimeZone()}
                slots={{
                    toolbar: () => null,
                }}
                slotProps={{
                    actionBar: {actions: ['clear', 'accept']}
                }}
                calendars={1}
                value={dateRange.current}
                sx={{
                    [`.${pickersLayoutClasses.contentWrapper}`]: {
                        alignItems: 'center',
                    },
                }}
                onAccept={handleDateAccept}
            />
        </LocalizationProvider>
    </Popover>
}