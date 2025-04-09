import axios, {AxiosResponse} from "axios";
import {RequestBuilder} from './RequestBuilder';
import {handleError} from "./ApiErrorHandle";
import ApiRequestManager from "@/services/@core/ApiRequestManager";
import {ApiPromise} from "@/utils/ApiPromise";

interface ResponseAdapter {
    convert: (rowData: AxiosResponse<any, any>) => any
}

export const REQUEST_CANCELED = 'Request canceled';

interface SubscribeRequests {
    [key: string]: any[]
}

const subscribeRequest: SubscribeRequests = {}

function getSubscribeRequest(key: string) {
    if (!subscribeRequest[key]) {
        subscribeRequest[key] = []
    }
    return subscribeRequest[key]
}

function setSubscribeRequest(key: string, value: {
    resolve: (value: unknown) => void,
    reject: (reason?: any) => void
}) {
    getSubscribeRequest(key).push(value);
}

function clear(key: string) {
    delete subscribeRequest[key];
}

function resolve(key: string, value: unknown) {
    getSubscribeRequest(key).forEach(({resolve}) =>
        resolve(value)
    );
    clear(key);
}

function reject(key: string, reason?: any) {
    getSubscribeRequest(key).forEach(({reject}) =>
        reject(reason)
    );
    clear(key);
}

const _sendRequest = async (requestBuilder: RequestBuilder, defaultResponse?: any, adapter?: ResponseAdapter, returnError?: boolean) => {
    const cancelTokenSource = axios.CancelToken.source();
    const config = requestBuilder.axiosConfig
    config.cancelToken = cancelTokenSource.token;
    const requestKey = ApiRequestManager.getInstance().generateRequestKey(
        config.method ?? '',
        config.url ?? '',
        JSON.stringify(config.params)
    );

    const sendRequest = await ApiRequestManager.getInstance().addRequest(requestKey, cancelTokenSource)

    if (!sendRequest) {
        return new Promise((resolve, reject) => {
            setSubscribeRequest(requestKey, {resolve, reject});
        });
    }

    return axios.request(config)
        .then((response) => {
            if (response.data && response.data.hasOwnProperty('data')) {
                const responseData = response.data.data;
                const result = adapter ? adapter.convert({...response, data: responseData}) : responseData
                resolve(requestKey, result)
                return result;
            } else {
                const result = adapter ? adapter.convert(response) : response.data;
                resolve(requestKey, result)
                return result;
            }
        })
        .catch((error) => {
            if (!axios.isCancel(error)) {
                handleError(error, returnError === true);
                resolve(requestKey, defaultResponse)
                return defaultResponse;
            }
                reject(requestKey, REQUEST_CANCELED)
            return Promise.reject(REQUEST_CANCELED);
        })
        .finally(() => ApiRequestManager.getInstance().removeRequest(requestKey));
};

const sendRequest = async (requestBuilder: RequestBuilder, defaultResponse?: any, adapter?: ResponseAdapter, returnError?: boolean) => {
    return ApiPromise.from(_sendRequest(requestBuilder, defaultResponse, adapter, returnError));
}
export default sendRequest;
