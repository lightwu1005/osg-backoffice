import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

type TargetTimeZone = {
    timezone: string,
    format: string
}
function getDateString(currentDate: dayjs.Dayjs, targetTimeZone: TargetTimeZone): string {
    const localTime = currentDate.tz(targetTimeZone.timezone).format(targetTimeZone.format);
    return localTime;
}

export {getDateString}