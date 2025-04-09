import React, {useCallback} from 'react';
import {firstCharToUpperCase} from "@/modules/common/DisplayFormatConverter";

type AnyObject = Record<string, any>;


/**
 * @description use to update the object with model path and value, like submit value
 * @param setState
 */
export function useDynamicValueUpdater<T extends AnyObject>(setState: React.Dispatch<React.SetStateAction<T | undefined>>) {
    return useCallback((path: string) => (value: any) => {
        setState(prev => {
            if (prev === undefined) return prev;
            const keys = path.split('.');
            const result: T = { ...prev };

            let current: any = result;
            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                if (!(key in current)) {
                    current[key] = {};
                } else if (typeof current[key] !== 'object') {
                    console.error('Invalid path for handleDynamicChange:', path);
                    return prev;
                }
                current = current[key];
            }

            const finalKey = keys[keys.length - 1];
            const isEvent = value instanceof Event || (typeof value === 'object' && value !== null && 'target' in value);

            let finalValue = isEvent ? (value.target as HTMLInputElement).value : value;
            if (isEvent && !isNaN(finalValue) && finalValue.trim() !== '') {
                finalValue = Number(finalValue);
            }

            current[finalKey] = finalValue;

            return result;
        });
    }, [setState]);
}

/**
 * @description these two function use to get value or key by Enum structure
 * @param enumObj
 * @param value
 */
export const getEnumKeyByValue = (enumObj: any, value?: string | null): string | undefined => {
    return Object.keys(enumObj).find(key => enumObj[key] === value)
}

export const getEnumValueByKey = (enumObj: any, key: string): string | undefined => {
    return enumObj[key]
}

/**
 * @description this use to sort the value by defined enum, the usage scenario would like multi-options selected
 * @param array
 * @param enumObj
 */
export const sortByEnumValues = (array: string[], enumObj: any) => {
    const enumValues = Object.values(enumObj)
    return array.sort((a, b) => enumValues.indexOf(a) - enumValues.indexOf(b))
}

/**
 * @description use to check the object that has empty string or not
 */

export const hasEmptyStringFields = (obj: any): boolean => {
    if (typeof obj === 'string') {
        return obj.trim() === '';
    }
    if (typeof obj === 'object' && obj !== null) {
        if ('belowMargin' in obj) {
            const {belowMargin, ...other} = obj
            return Object.values(other).some(value => hasEmptyStringFields(value));
        } else {
            return Object.values(obj).some(value => hasEmptyStringFields(value));
        }
    }
    if(typeof obj === 'number') {
        return obj <= 0
    }
    return false;
};

/**
 * Use to convert the Sever key to display string
 */
export function formatWithSpace(input: string): string {
    return input.split('_')
        .map(word => firstCharToUpperCase(word))
        .join(' ');
}

/**
 * Converts a server response string array to a Record with formatted keys.
 * This function modifies the provided target record.
 *
 * @param array - The array of strings from the server response that needs to be converted.
 * @param target - The target record where the converted key-value pairs will be stored.
 */
export function serverKeyTypeConvert(array: string[], target: Record<string, string>): void {
    array.forEach((item) => {
        target[item] = formatWithSpace(item);
    });
}

/**
 * Converts a server response string array to a Record with formatted keys.
 * This function returns a new record with the converted key-value pairs.
 *
 * @param array - The array of strings from the server response that needs to be converted.
 * @returns A record with formatted keys.
 */
export function convertArrayToRecord(array: string[]): Record<string, string> {
    const result: Record<string, string> = {};
    serverKeyTypeConvert(array, result);
    return result;
}

/**
 * Extracts the value from an event or returns the value itself.
 *
 * @param value - The input value, which can be an event or any other type.
 * @returns The extracted or original value.
 */
export function extractValue(value: any): any {
    const isEvent = value instanceof Event || (typeof value === 'object' && value !== null && 'target' in value);
    return isEvent ? value.target.value : value;
}

/**
 * Determines if a value exceeds the specified range.
 *
 * @param value - The number to check.
 * @param range - An array with two numbers representing the minimum and maximum limits.
 * @returns True if the value is outside the range, otherwise false.
 */
export function hasOverLimit(value: number, range: [number, number]): boolean {
    if (!range) return false;
    const [min, max] = range;
    return value < min || value > max;
}
