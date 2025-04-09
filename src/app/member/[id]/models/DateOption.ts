import {DateRange} from "@mui/x-date-pickers-pro";
import {Dayjs} from "dayjs";

export interface DateOption {
    readonly name: string
    readonly range: DateRange<Dayjs>
}