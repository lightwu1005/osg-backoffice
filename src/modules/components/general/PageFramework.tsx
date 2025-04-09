"use client";
import React, {useEffect} from 'react';
import {GlobalController, IEventHandler} from "@/modules/common/GlobalController";
import {ApiError} from "@/services/@core/ApiErrorHandle";

function PageFramework({children}: { children: React.ReactNode }) {
    const globalController = GlobalController.getInstance()
    const [apiError, setApiError] = React.useState<ApiError>();

    const apiErrorHandler: IEventHandler<string, ApiError> = {
        key(): string {
            return GlobalController.KEY_API_ERROR;
        },
        receive(error: ApiError): void {
            setApiError(error)
        }
    }

    useEffect(() => {
        globalController.subscribe(apiErrorHandler)
        return () => {
            globalController.unsubscribe(apiErrorHandler)
        };
    }, []);

    if (apiError) {
        throw apiError
    }
    return children
}

export default PageFramework;