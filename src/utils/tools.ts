import {DateRange} from "@mui/x-date-pickers-pro";
import dayjs, {Dayjs} from "dayjs";
import crypto from 'crypto';
import {randomBytes} from "crypto";
import { datadogLogs } from "@/config/Datadog";

export const moneyFormat = (n: number, digits: number = 0) => n?.toLocaleString(
    'en-US',
    { minimumFractionDigits: digits }
)

export const numberFormat = (n: number, digits: number = 0) => {
    if (n >= 1000000) {
        return (n / 1000000).toFixed(digits) + 'M';
    } else if (n >= 1000) {
        return (n / 1000).toFixed(digits) + 'K';
    } else {
        return n.toString();
    }
}

export function isBase64(str: string): boolean {
    const isValidLength = str.length % 4 === 0;
    const isValidBase64Chars = /^[A-Za-z0-9+/=]+$/.test(str);
    return isValidLength && isValidBase64Chars;
}

function convertToBuffer(key: string): Buffer {
    if (isBase64(key)) {
        return Buffer.from(key, 'base64');
    } else {
        return Buffer.from(key, 'hex');
    }
}

export function aes256Encrypt(text: string, key: string): string {
    const keyBuffer = convertToBuffer(key);
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', keyBuffer, iv);
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();

    const encryptedMessage = Buffer.concat([iv, encrypted, tag]);
    return encryptedMessage.toString('base64');
}

export function aes256Decrypt(encryptedText: string, key: string) {
    const encryptedMessage = Buffer.from(encryptedText, 'base64');
    const keyBuffer = convertToBuffer(key);

    const iv = encryptedMessage.subarray(0, 12);
    const tag = encryptedMessage.subarray(encryptedMessage.length - 16);
    const encryptedBytes = encryptedMessage.subarray(12, encryptedMessage.length - 16);

    const decipher = crypto.createDecipheriv('aes-256-gcm', keyBuffer, iv);
    decipher.setAuthTag(tag);

    const decrypted = Buffer.concat([decipher.update(encryptedBytes), decipher.final()]);
    return decrypted.toString('utf8');
}

export function dividePage<T>(page: number, pageSize: number, array: T[]) {
    const total = array.length
    const firstIndex = Number(page - 1) * Number(pageSize)
    const lastIndex = Math.min(total, firstIndex + Number(pageSize))
    return array.slice(firstIndex, lastIndex)
}

export function includesIgnoreCase(str: string, searchStr: string): boolean {
    return str.toLowerCase().includes(searchStr.toLowerCase());
}

export const isSafeDateRange = (dateRange: DateRange<Dayjs> | null): boolean => {
    return (dateRange?.filter(Boolean).length !== 1)
}

export const getTodayRange = (): DateRange<Dayjs> => {
    const start = dayjs().tz().startOf('day');
    const end = dayjs().tz().endOf('day');
    return [start, end];
};

export const getYesterdayRange = (): DateRange<Dayjs> => {
    const start = dayjs().tz().subtract(1, 'day').startOf('day');
    const end = dayjs().tz().subtract(1, 'day').endOf('day');
    return [start, end];
};

export const getThisWeekRange = (): DateRange<Dayjs> => {
    const start = dayjs().tz().startOf('week');
    const end = dayjs().tz().endOf('week');
    return [start, end];
};

export const getThisMonthRange = (): DateRange<Dayjs> => {
    const start = dayjs().tz().startOf('month');
    const end = dayjs().tz().endOf('month');
    return [start, end];
};

export const getThisYearRange = (): DateRange<Dayjs> => {
    const start = dayjs().tz().startOf('year');
    const end = dayjs().tz().endOf('year');
    return [start, end];
};

export function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}
export async function getUserIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP:', error);
        datadogLogs.logger.error('Error fetching IP', {}, error instanceof Error ? error : new Error(String(error)));
        return '';
    }
}

export function generateRandomStringForKeyOrId(length: number = 10): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charsetLength = charset.length;
    let result = '';
    const randomValues = randomBytes(length);

    for (let i = 0; i < length; i++) {
        result += charset.charAt(randomValues[i] % charsetLength);
    }

    return result;
}

export function hashDataWith(material: any): string {
    return crypto.createHash('sha256').update(material
        .toString()).digest('hex');
}

const colorRegex = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;
export function isValidColor(color: string): boolean {
    return colorRegex.test(color);
}

export function colorNameToHex(colorName: string): string | null {
    const tempDiv = document.createElement('div')
    tempDiv.style.color = colorName

    document.body.appendChild(tempDiv)

    const computedColor = getComputedStyle(tempDiv).color
    document.body.removeChild(tempDiv)

    const rgbMatch = computedColor.match(/\d+/g)
    if (!rgbMatch) return null

    const hex = rgbMatch.slice(0, 3)
        .map((value) => {
            const hexValue = parseInt(value, 10).toString(16)
            return hexValue.length === 1 ? '0' + hexValue : hexValue
        })
        .join('')

    return `#${hex.toUpperCase()}`
}

export function toMoneyFormat(amount: number | string) {
    const _amount = typeof amount === 'string' ? parseFloat(amount) : amount;
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return formatter.format(_amount);
}

export function hasValidNumber(value?: any): boolean {
    return value !== null && value !== undefined && !Number.isNaN(value);
}