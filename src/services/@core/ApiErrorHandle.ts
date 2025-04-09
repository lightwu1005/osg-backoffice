import {AxiosError} from "axios";
import {GlobalController} from "@/modules/common/GlobalController";
import {cleanIdentityInfo} from "@/modules/common/IdentityHandler";
import {GlobalWebSocket} from "@/modules/common/GlobalWebSocket";

/**
 * Osg Service Error Format.
 * e.g.
 * {
 *     "service": "osg-oauth-service",
 *     "error": {
 *         "message": "Authentication failed",
 *         "code": 8604
 *     }
 * }
 * */
interface OsgServiceError {
    service?: string,
    error?: {
        message?: string,
        code?: number
    }
}

/**
 * If [error.response] and [error.status] are undefined,
 * using [error.message] to get the error code.
 * e.g. error.message = 'Request failed with status code 401'
 * */
const extractErrorCodeFromErrorMessage = (str: string) => {
    const numericString = str.replace(/\D/g, '');
    return numericString ? Number(numericString) : 0;
}

export class ApiError extends Error {
    status: number;
    errorCode: number;

    constructor(message: string, status: number = 0, errorCode: number = 0) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.errorCode = errorCode;
    }
}

export function isApiError(error: any): error is ApiError {
    return error
        && typeof error.name === 'string'
        && error.name === 'ApiError'
        && typeof error.status === 'number'
        && typeof error.errorCode === 'number'
}

const handleError = (error: AxiosError, returnError: boolean) => {
    const globalController = GlobalController.getInstance()
    const axiosStatusCode = error.response?.status
        ?? error.status
        ?? extractErrorCodeFromErrorMessage(error.message)

    const throwError = (key: any, args: ApiError) => {
        if( axiosStatusCode === 401 ) {
            GlobalWebSocket.clearInstance()
            cleanIdentityInfo();
        }

        if (returnError) {
            throw args;
        } else {
            globalController.dispatch(key, {
                severity: 'error',
                show: true,
                message: args.message
            })
        }
    }

    if (error.response) { // server response
        const responseData = error.response.data as OsgServiceError;
        const errorCode = responseData.error?.code ?? 0
        const apiError = new ApiError(
            responseData.error?.message ?? error.message,
            axiosStatusCode,
            errorCode)
        
        switch (axiosStatusCode) {
            case 404: {
                throwError(GlobalController.KEY_API_ERROR, apiError)
                break;
            }
            default: {
                throwError(GlobalController.KEY_TOAST_ALERT, apiError);
                break;
            }
        }
    } else { // unknown error
        const apiError = new ApiError(error.message, axiosStatusCode)
        throwError(GlobalController.KEY_API_ERROR, apiError)
    }
}

export { handleError };
