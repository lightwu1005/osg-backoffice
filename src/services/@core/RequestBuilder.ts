import {AxiosRequestConfig, CancelTokenSource} from 'axios';
import qs from 'qs';
import store from "@/modules/common/IdentityRedux";
import {getCombineSplitStringsFromCookie} from "@/services/@core/module/LongTokenHandler";


export enum Method {
    get = 'GET',
    post = 'POST',
    put = 'PUT',
    patch = 'PATCH',
    delete = 'DELETE',
}

export interface RequestConfig extends AxiosRequestConfig {
    cancelTokenSource?: CancelTokenSource;
}

interface QueryParams {
    [key: string]: string | number | string[] | number[];
}

export class RequestBuilder {
    axiosConfig: AxiosRequestConfig;
    defaultHeaders: Record<string, any> = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    };

    constructor(config: RequestConfig) {
        const authorization = getCombineSplitStringsFromCookie('a');

        const headers: Record<string, any> = {
            ...this.defaultHeaders,
            ...config.headers,
        };

        if (authorization) {
            headers['Authorization'] = `Bearer ${authorization}`;
        }

        if (!config.url?.includes('token')) {
            if (!config.headers?.hasOwnProperty('X-ChannelId')) {
                const channelValue = store.getState().cv || '';
                if (channelValue) {
                    headers['X-ChannelId'] = channelValue;
                }
            }
        }

        this.axiosConfig = {
            baseURL: config.baseURL,
            method: config.method,
            headers: headers,
            params: config.params,
            data: config.data,
            url: config.url || '/',
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        };
    }
}
