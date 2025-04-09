import useApiInteractor from "@/services/@core/ApiInteractor";
import {NotificationListProps, NotificationReadStatusProps} from "@/services/@core/module/RequestDataModels";
import {NotificationListModel} from "@/services/@core/module/ResponseDataModels";


const useNotificationRepository = () => {
    const apiInteractor = useApiInteractor()

    const getNotificationList = async (requestData: NotificationListProps): Promise<NotificationListModel> => {
        return await apiInteractor.getNotificationList(requestData)
    }
    const notificationRead = async (requestData: NotificationReadStatusProps) => {
        return await apiInteractor.notificationRead(requestData)
    }
    const getNotificationUnreadNumber = async () => {
        return await apiInteractor.getNotificationUnreadNumber()
    }

    return {
        getNotificationList,
        notificationRead,
        getNotificationUnreadNumber
    }
}

export default useNotificationRepository