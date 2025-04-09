import {Method, RequestBuilder, RequestConfig} from "@/services/@core/RequestBuilder";
import {UrlInterface} from "@/services/@core/module/ApiUrlBuilder";
import {ApiProps} from "@/services/@core/module/RequestDataModels";

const transformQueryParams = (query?: Record<string, any>): Record<string, any> | undefined => {
    if (!query) return undefined;

    const transformedQuery: Record<string, any> = {};
    for (const key in query) {
        if (Array.isArray(query[key])) {
            transformedQuery[key] = query[key].join(',');
        } else {
            transformedQuery[key] = query[key];
        }
    }
    return transformedQuery;
}

export const createRequest = (url: UrlInterface, method: Method, props?: ApiProps): RequestBuilder => {
    const config: RequestConfig = {
        baseURL: url.baseUrl,
        method: method.toString(),
        url: setEndPoints(url.url, props?.endPoint),
        params: transformQueryParams(props?.query),
        data: props?.body ?? undefined,
        headers: props?.headers ?? undefined,
    };

    return new RequestBuilder(config);
}

export const setEndPoints = (url: string, props?: Record<string, any>): string => {
    if (!props) return url

    const regex = /\{(.*?)\}/g;
    const matches = url.match(regex);
    let newUrl = url;
    if (matches) {
        matches.forEach((prop) => {
            const key = prop.substring(1, prop.length - 1)
            newUrl = newUrl.replace(prop, props[key])
        })
    }
    return newUrl
}