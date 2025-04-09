import {NotificationListProps, NotificationReadStatusProps} from "@/services/@core/module/RequestDataModels";
import {GetNotificationsParameters} from "@/app/notification/models/NotificationParameters";

export function toNotificationListProps(parameters: GetNotificationsParameters): NotificationListProps {
    const {read, startDate, endDate, ...other} = parameters

    let status: number | undefined = undefined
    if (read !== undefined) {
        if (read) {
            status = 1
        } else {
            status = 0
        }
    }

    return {
        query: {
            ...other,
            ...(read !== undefined ? {status: status} : undefined),
            ...(startDate && endDate && !isNaN(startDate) && !isNaN(endDate) ? {
                startDate: startDate,
                endDate: endDate
            } : undefined),
        }
    };
}

export function toNotificationReadStatusProps(isAll: boolean, notificationId?: string): NotificationReadStatusProps {
    return {
        body: {
            type: isAll ? 'ALL' : 'SINGLE',
            ...(notificationId ? {notificationId: notificationId} : undefined),
        }
    };
}