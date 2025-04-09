import {useEffect, useState} from "react";
import ApiUrlBuilder from "@/services/@core/module/ApiUrlBuilder";
import {PushNotificationSSEModel} from "@/services/@core/module/ResponseDataModels";
import {GlobalController} from "@/modules/common/GlobalController";
import IdentityHandler from "@/modules/common/IdentityHandler";
import {EventSourcePolyfill} from "event-source-polyfill";
import {getCombineSplitStringsFromCookie} from "@/services/@core/module/LongTokenHandler";
import { datadogLogs } from "@/config/Datadog";

const useSSEClient = () => {
    const {userUUID} = IdentityHandler();
    const [eventSource, setEventSource] = useState<EventSource>();
    const globalController = GlobalController.getInstance()

    const start = () => {
        const apiUrl = ApiUrlBuilder.getApiUrlByEnvironment()
        const eventSource = new EventSourcePolyfill(ApiUrlBuilder.getPath(apiUrl.pushNotification), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getCombineSplitStringsFromCookie('a') || ''}`
            }
        });
        setEventSource(eventSource);

        eventSource.onmessage = (event) => {
            const sseModel = event.data as PushNotificationSSEModel
            const notification = sseModel.data.data
            globalController.dispatch(GlobalController.KEY_NOTIFICATION_SNACKBAR, {
                id: notification.notificationId,
                title: notification.notificationName,
                content: notification.description
            })
        };

        eventSource.onerror = (error) => {
            console.error('SSE error:', error);
            datadogLogs.logger.error('SSE error', {}, error instanceof Error ? error : new Error(String(error)));
        };
    };

    const stop = () => {
        if (eventSource)
            eventSource.close();
        setEventSource(undefined)
    }


    useEffect(() => {
        if (userUUID != null && !eventSource) {
            start()
        } else if (userUUID == null && eventSource) {
            stop()
        }
    }, [userUUID]);

    return {eventSource}
}

export default useSSEClient