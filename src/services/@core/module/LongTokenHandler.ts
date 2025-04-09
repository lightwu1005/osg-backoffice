import Cookies from "js-cookie";
import {NextRequest} from "next/server";

export const MAX_COOKIE_SIZE = 4000;

export const storeSplitStringToCookie = (key: string, str: string, partSize?: number) => {
    const parts = [];
    const size = partSize ?? MAX_COOKIE_SIZE;
    for (let i = 0; i < str.length; i += size) {
        parts.push(str.slice(i, i + size));
        Cookies.set(`${key}_part${i / size}`, parts[parts.length - 1]);
    }
};

export const getCombineSplitStringsFromCookie = (key: string, request?: NextRequest) => {
    let combinedString = '';
    let i = 0;
    while (true) {
        const part = (request ? request.cookies.get(`${key}_part${i}`) : Cookies.get(`${key}_part${i}`)) as string;
        if (!part) break;
        combinedString += part;
        i++;
    }
    return combinedString;
};

export const clearSplitStringsFromCookie = (key: string) => {
    let i = 0;
    while (true) {
        const part = Cookies.get(`${key}_part${i}`);
        if (!part) break;
        Cookies.remove(`${key}_part${i}`);
        i++;
    }
}