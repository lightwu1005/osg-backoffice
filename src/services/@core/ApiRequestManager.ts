// src/services/@core/RequestManager.ts
import {CancelTokenSource} from 'axios';
import {delay} from "@/utils/tools";

interface TokenSource {
    cancelTokenSource: CancelTokenSource;
    timestamp: number;
}
class ApiRequestManager {
    private static instance: ApiRequestManager;
    private static readonly DEBOUNCE_TIME = 900;
    private requests: Map<string, TokenSource>;
    private pendingRequests: Map<string, CancelTokenSource>;

    private constructor() {
        this.requests = new Map();
        this.pendingRequests = new Map();
    }

    public static getInstance(): ApiRequestManager {
        if (!ApiRequestManager.instance) {
            ApiRequestManager.instance = new ApiRequestManager();
        }
        return ApiRequestManager.instance;
    }

    public generateRequestKey(method: string, url: string, params?: any): string {
        return `${method}-${url}-${JSON.stringify(params)}`;
    }

    public async addRequest(key: string, cancelTokenSource: CancelTokenSource) {
        const previousTokenSource = this.requests.get(key);
        const timestamp = Date.now();
        if (previousTokenSource) {
            const gap = timestamp - previousTokenSource.timestamp;
            if (gap < ApiRequestManager.DEBOUNCE_TIME) {
                const previousPending = this.pendingRequests.get(key);
                if (previousPending) {
                    previousPending.cancel('Request canceled due to a new request with the same parameters.');
                }
                this.pendingRequests.set(key, cancelTokenSource);
                await delay(ApiRequestManager.DEBOUNCE_TIME - gap);
                if (this.pendingRequests.get(key) === cancelTokenSource) {
                    this.pendingRequests.delete(key);
                } else {
                    return Promise.resolve(false);
                }
            }
            previousTokenSource.cancelTokenSource.cancel('Request canceled due to a new request with the same parameters.');
        }
        this.requests.set(key, {cancelTokenSource: cancelTokenSource, timestamp: timestamp});
        return Promise.resolve(true);
    }

    public removeRequest(key: string) {
        this.requests.delete(key);
    }

    public cancelAllRequests() {
        this.requests.forEach((tokenSource) => {
            tokenSource.cancelTokenSource.cancel('Request canceled due to logout or other reasons.');
        });
        this.requests.clear();
    }
}

export default ApiRequestManager;