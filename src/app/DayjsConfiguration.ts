import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/en-gb'
import 'dayjs/locale/zh-tw'

dayjs.extend(utc);
dayjs.extend(timezone);

const DEFAULT_TIMEZONE = 'America/Caracas'; // UTC-4

let initialized = false;

export enum AppDateFormat {
    SHORT = 'MM/DD HH:mm',
    LONG = 'YYYY-MM-DD HH:mm',
    SHORT_WITH_SECONDS = 'MM/DD HH:mm:ss',
    LONG_WITH_SECONDS = 'YYYY-MM-DD HH:mm:ss',
    LONG_WITH_TZ = 'YYYY-MM-DDTHH:mm:ss[Z]',
    SHORT_WITH_SECONDS_DM = 'DD MMM HH:mm:ss',
}

declare module 'dayjs' {
    interface Dayjs {
        toLocalized(format: AppDateFormat): string;
    }
}

// Here we add a new method to the Dayjs prototype, to be able to format the date in the user's timezone, Cooooool
dayjs.prototype.toLocalized = function (format: AppDateFormat): string {
    const timeZone = getFromLocalStorage('appTimeZone') ?? DEFAULT_TIMEZONE;
    return this.tz(timeZone).format(format);
};

const getFromLocalStorage = (key: string): string | null => {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
        return localStorage.getItem(key);
    }
    return null;
};

export const initTimeZone = () => {
    if (!initialized) {
        const savedTimeZone = getFromLocalStorage('appTimeZone') ?? DEFAULT_TIMEZONE;
        dayjs.tz.setDefault(savedTimeZone);
        dayjs.locale(navigator.language.startsWith('zh') ? 'zh-tw' : 'en-gb');
        initialized = true;
    }
};

export const switchTimeZone = (newTimeZone: string): void => {
    localStorage.setItem('appTimeZone', newTimeZone);

    dayjs.tz.setDefault(newTimeZone);
};

export const getCurrentTimeZone = (): string => {
    return getFromLocalStorage('appTimeZone') ?? DEFAULT_TIMEZONE;
};

export const getUtcOffsetInHours = (): string => {
    const utcOffsetInHours = dayjs().tz(getCurrentTimeZone()).utcOffset() / 60;
    return utcOffsetInHours > 0 ? `+${utcOffsetInHours}` : utcOffsetInHours.toString();
};