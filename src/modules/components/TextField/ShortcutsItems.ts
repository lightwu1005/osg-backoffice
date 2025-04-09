import {PickersShortcutsItem} from "@mui/x-date-pickers";
import {DateRange} from "@mui/x-date-pickers-pro";
import dayjs, {Dayjs} from "dayjs";

export enum daysShortType {
    today,
    tomorrow,
    thisWeek,
    lastWeek,
    last7Days,
    currentMonth,
    nextMonth,
}
export const shortcutsOptions = (daysType: daysShortType[]): PickersShortcutsItem<DateRange<Dayjs>>[] => {
    const today = dayjs();

    const options = daysType.map((type) => {
        switch (type) {
            case daysShortType.today:
                return {
                    label: "Today",
                    getValue: () => [today, today] as DateRange<Dayjs>,
                };
            case daysShortType.tomorrow:
                const tomorrow = today.add(1, 'day');
                return {
                    label: "Tomorrow",
                    getValue: () => [tomorrow, tomorrow] as DateRange<Dayjs>,
                };
            case daysShortType.thisWeek:
                return {
                    label: "This Week",
                    getValue: () => [today.startOf('week'), today.endOf('week')] as DateRange<Dayjs>,
                };
            default:
                return {
                    label: "Reset",
                    getValue: () => [null, null] as DateRange<Dayjs>,
                };
        }
    });

    return options;
};
