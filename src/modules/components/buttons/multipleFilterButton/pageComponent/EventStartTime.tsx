import {FilterSectionProps} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {DateRange, pickersLayoutClasses, StaticDateRangePicker} from "@mui/x-date-pickers-pro";
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {getCurrentTimeZone} from "@/app/DayjsConfiguration";

export interface EventStartTimeData {
    startDate?: number,
    endDate?: number,
}

export const EventStartTime = ({selected, onChange}: FilterSectionProps<EventStartTimeData>) => {
    const [date, setDate] = useState<EventStartTimeData>({})
    useEffect(() => {
        if (selected) {
            setDate(selected);
        }
    }, [selected]);

    const handleDateAccept = useCallback((newDates: DateRange<Dayjs>) => {
        if (onChange) {
            const startDate = newDates?.[0]?.unix();
            const endDate = (newDates?.[1] ?? newDates?.[0])?.tz()?.endOf("day")?.unix()
            onChange(startDate && endDate
                ? {key: {startDate, endDate}}
                : {}
            );
        }
    }, [])

    const toDateRange = (date: EventStartTimeData): DateRange<Dayjs> | undefined => {
        if (date.startDate && date.endDate) {
            const start = dayjs(date.startDate * 1000)
            const end = dayjs(date.endDate * 1000)
            return [start, end]
        } else {
            return undefined
        }
    }

    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDateRangePicker
            timezone={getCurrentTimeZone()}
            slots={{
                toolbar: () => null,
            }}
            slotProps={{
                actionBar: {actions: ['clear', 'accept']}
            }}
            calendars={1}
            value={toDateRange(date)}
            sx={{
                [`.${pickersLayoutClasses.contentWrapper}`]: {
                    alignItems: 'center',
                },
            }}

            onAccept={handleDateAccept}
        />
    </LocalizationProvider>
}