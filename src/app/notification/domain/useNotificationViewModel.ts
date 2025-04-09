import {toNotificationListProps, toNotificationReadStatusProps} from "@/app/notification/models/RequestDataMapping";
import {NotificationListModel} from "@/services/@core/module/ResponseDataModels";
import {GetNotificationsParameters} from "@/app/notification/models/NotificationParameters";
import useNotificationRepository from "@/services/@notification/repository/useNotificationRepository";
import {useCallback, useEffect, useState} from "react";
import {GlobalController} from "@/modules/common/GlobalController";
import {GridCellParams} from "@mui/x-data-grid-pro";

const useNotificationInteractor = () => {
    const notificationRepo = useNotificationRepository()

    const getNotificationList = async (parameters: GetNotificationsParameters): Promise<NotificationListModel> => {
        return await notificationRepo.getNotificationList(toNotificationListProps(parameters));
    }

    const read = async (notificationId: string) => {
        return await notificationRepo.notificationRead(toNotificationReadStatusProps(false, notificationId));
    }

    const readAll = async () => {
        return await notificationRepo.notificationRead(toNotificationReadStatusProps(true));
    }

    const [loading, setLoading] = useState(false);
    const [canClean, setCanClean] = useState(false);
    const [notificationsData, setNotificationsData] = useState<NotificationListModel>();
    const [queryParams, setQueryParams] = useState<GetNotificationsParameters>({
        page: 1,
        pageSize: 10,
        read: undefined,
        eventId: undefined,
        startDate: undefined,
        endDate: undefined,
        sortField: undefined,
        sortDirection: undefined,
    });
    const globalController = GlobalController.getInstance()

    const handleCellClick = (params: GridCellParams) => {
        const {field, row} = params
        if (field !== 'readStatus') return
        const {id, readStatus} = row
        if (!readStatus) {
            read(id).then(resp => {
                if (resp.isSuccess) {
                    const updatedNotificationsData = {
                        totalElements: notificationsData?.totalElements ?? 0,
                        pageSize: queryParams.pageSize,
                        content: notificationsData?.content.map(notification =>
                            notification.id === id ? {...notification, readStatus: true} : notification
                        ) ?? []
                    };
                    setNotificationsData(updatedNotificationsData)
                    globalController.dispatch(GlobalController.KEY_UNREAD_MESSAGE, undefined)
                } else {
                    globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                        severity: 'error',
                        show: true,
                        message: resp.result
                    });
                }
            })
        }
    }

    const handleReadAll = () => {
        readAll().then(resp => {
            if (resp.isSuccess) {
                const updatedNotificationsData = {
                    totalElements: notificationsData?.totalElements ?? 0,
                    pageSize: queryParams.pageSize,
                    content: notificationsData?.content.map(notification =>
                        !notification.readStatus ? {...notification, readStatus: true} : notification
                    ) ?? []
                };
                setNotificationsData(updatedNotificationsData)
                globalController.dispatch(GlobalController.KEY_UNREAD_MESSAGE, undefined)
            } else {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: resp.result
                });
            }
        })
    }

    const handleQueryChange = useCallback((params: Record<string, any>) => {
        const isPageChange = Boolean(params['page'])
        setQueryParams(currentParams => ({
            ...currentParams,
            ...params,
            ...(isPageChange ? undefined : {page: 1})
        }));
    }, []);

    const shouldShowCleanButton = (eventId?: string, startDate?: number, endDate?: number, read?: boolean) => {
        const hasEventId = (eventId ?? '').length > 0
        const hasValidDateRange = !!startDate || !!endDate;
        const hasReadValue = read !== undefined
        return hasEventId || hasValidDateRange || hasReadValue
    }

    useEffect(() => {
        setCanClean(shouldShowCleanButton(queryParams.eventId, queryParams.startDate, queryParams.endDate, queryParams.read))
    }, [queryParams]);

    const getData = () => {
        setLoading(true);
        getNotificationList(queryParams)
            .then((response) => {
                setNotificationsData(response)
            })
            .catch((result) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: result
                });
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getData()
    }, [queryParams]);

    return {
        loading,
        notificationsData,
        canClean,
        pageModel: {
            page: queryParams.page,
            pageSize: queryParams.pageSize
        },
        handleCellClick,
        handleQueryChange,
        handleReadAll,
    }
}

export default useNotificationInteractor