import {NotificationListModel, NotificationUnreadNumberModel} from "@/services/@core/module/ResponseDataModels";

export const mockNotificationUnreadNumber: NotificationUnreadNumberModel = {
    "totalUnread": 123
}
export const mockNotificationListData: NotificationListModel = {
    "totalElements": 999,
    "content": [
        {
            "id": "0",
            "notificationId": "123456789",
            "notificationType": "ODDS",
            "notificationName": "test notificatioin #1",
            "notificationTime": 1703471869,
            "eventId": "12345678",
            "readStatus": true,
            "description": "Current main line is unbalance, change main line to xxx"
        },
        {
            "id": "1",
            "notificationId": "223344556",
            "notificationType": "ODDS",
            "notificationName": "Main line moving",
            "notificationTime": 1703471869,
            "eventId": "12345679",
            "readStatus": false,
            "description": "Current main line is unbalance, change main line to yyy"
        },
        {
            "id": "2",
            "notificationId": "987654321",
            "notificationType": "ODDS",
            "notificationName": "test notificatioin #2",
            "notificationTime": 1703471869,
            "eventId": "12345680",
            "readStatus": false,
            "description": "Current main line is unbalance, change main line to zzz"
        }
    ]
}