import {AppDateFormat} from "@/app/DayjsConfiguration";
import {EventDateRangeModel} from "@/app/betSlip/components/FilterKeeper/FilterKeeper";
import {IntlShape} from "react-intl";
import dayjs, {Dayjs} from "dayjs";
import {DateRange} from "@mui/x-date-pickers-pro";

export const enum TimeFormat {
    Short,
    Long,
    ShortWithSeconds,
    LongWithSeconds,
    ShortWithSecondsDM
}

export const formatDateRange = (dateRange: DateRange<Dayjs> | null) => {
    if (!dateRange || (!dateRange[0] && !dateRange[1])) {
        return '';
    }

    const formatDate = (date: Dayjs | null): string => {
        return date ? date.format('YYYY/MM/DD') : '';
    };

    const startDateStr = formatDate(dateRange[0]);
    const endDateStr = formatDate(dateRange[1]);

    if (startDateStr && endDateStr && startDateStr !== endDateStr) {
        return `${startDateStr} - ${endDateStr}`;
    } else if (startDateStr) {
        return startDateStr;
    } else if (endDateStr) {
        return endDateStr;
    }
    return ''
}

export const formatLocalTimeShort = (timestamp: number): string => {
    return dayjs(timestamp * 1000).toLocalized(AppDateFormat.SHORT);
};

export const formatLocalTimeLong = (timestamp: number): string => {
    return dayjs(timestamp * 1000).toLocalized(AppDateFormat.LONG);
};

export const formatLocalTimeShortWithSeconds = (timestamp: number): string => {
    return dayjs(timestamp * 1000).toLocalized(AppDateFormat.SHORT_WITH_SECONDS);
}

export const formatLocalTimeShortWithSecondsDM = (timestamp: number): string => {
    return dayjs(timestamp * 1000).toLocalized(AppDateFormat.SHORT_WITH_SECONDS_DM);
};

export const formatLocalTimeLongWithSeconds = (timestamp: number): string => {
    return dayjs(timestamp * 1000).toLocalized(AppDateFormat.LONG_WITH_SECONDS);
}

export const getEventDateRangeDisplayValue = (eventDateRangeModel: EventDateRangeModel, intl: IntlShape, funType: string) => {
    const {startDate, endDate} = eventDateRangeModel
    return `${dayjs(startDate * 1000).tz().toLocalized(AppDateFormat.LONG_WITH_TZ)} - 
    ${dayjs(endDate * 1000).tz().toLocalized(AppDateFormat.LONG_WITH_TZ)}`;
}

export const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('en-GB', {
        style: "decimal",
        notation: "compact",
        maximumFractionDigits: 2
    }).format(value);
}

export const formatPercentage = (value: number, digits: number = 2): string => {
    return new Intl.NumberFormat('en-GB', {
        style: "percent",
        maximumFractionDigits: digits
    }).format(value);
}

export const formatSecondsToHms = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const hoursString = hours > 0 ? (hours < 10 ? '0' + hours : hours.toString()) + ':' : '';
    const minutesString = (minutes < 10 ? '0' + minutes : minutes.toString()) + ':';
    const secondsString = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds.toString();

    return hoursString + minutesString + secondsString;
}

export const formatLocalMillisecondsToHms = (milliseconds: number): string => {
    const date = new Date(milliseconds);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const pad = (num: number): string => num.toString().padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export const formatSecondsToMinutes = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return seconds === 0 ? `0'` :`${minutes}'${remainingSeconds}"`;
}

export const firstCharToUpperCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()

export const allFirstCharToUpperCase = (s: string) => {
    const words = s.replace(/_/g, ' ').split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return capitalizedWords.join(' ');
};

export const toUpperCaseWithUnderscore = (s: string) => {
    const normalizedString = s.toLowerCase().trim();
    const upperCaseWithUnderscore = normalizedString.split(' ')
        .map(word => word.toUpperCase())
        .join('_');
    return upperCaseWithUnderscore;
};