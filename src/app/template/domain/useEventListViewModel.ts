import useTemplateRepository from "@/services/@template/respository/useTemplateRepository"
import {GetApplyEventsParameters} from "@/app/template/models/TemplateParameters";
import {toGetApplyEventsProps} from "@/app/template/models/RequestDataMapping"
import {useCallback, useEffect, useState} from "react";
import {GetApplyEventsDataModel} from "@/services/@core/module/ResponseDataModels";
import {GlobalController} from "@/modules/common/GlobalController";
import {ActivatingModelHeader} from "@/app/template/domain/useTemplateViewModel";

const useEventListViewModel = (currentTemplate: ActivatingModelHeader) => {
    const templateRepo = useTemplateRepository()
    const globalController = GlobalController.getInstance()

    const [queryParams, setQueryParams] = useState<GetApplyEventsParameters>({
        templateId: currentTemplate.templateId,
        eventType: currentTemplate.eventType,
        page: 1,
        pageSize: 10,
        search: '',
    });

    const [loading, setLoading] = useState(false);
    const [showEventDialog, setShowEventDialog] = useState<boolean>(false)
    const [eventList, setEventList] = useState<GetApplyEventsDataModel>();

    const getApplyEvents = useCallback(async (props: GetApplyEventsParameters): Promise<GetApplyEventsDataModel> => {
        const response =  await templateRepo.getApplyEvents(toGetApplyEventsProps(props))
        return response
    }, [templateRepo])

    const handleQueryChange = useCallback((params: Record<string, any>) => {
        const isPageChange = Boolean(params['page'])
        setQueryParams(currentParams => ({
            ...currentParams,
            ...params,
            ...(isPageChange ? undefined : {page: 1})
        }));
    }, []);

    const getApplyEventData = useCallback(async () => {
        setLoading(true)
        getApplyEvents(queryParams)
            .then((response) => {
                setEventList(response)
            })
            .catch((error) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: error
                })
            })
            .finally(() => {
                setLoading(false)
            })
    },[queryParams])

    useEffect(() => {
        getApplyEventData()
    }, [queryParams]);

    return {
        loading,
        getApplyEvents,
        showEventDialog,
        setShowEventDialog,
        refresh: getApplyEventData,
        eventList,
        pageModel: {
            page: queryParams.page,
            pageSize: queryParams.pageSize
        },
        handleQueryChange
    }
}

export default useEventListViewModel