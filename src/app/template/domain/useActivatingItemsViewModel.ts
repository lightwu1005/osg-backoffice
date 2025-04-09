import useTemplateRepository from "@/services/@template/respository/useTemplateRepository"
import {GetActivatingItemsParameters} from "@/app/template/models/TemplateParameters";
import {toGetActivatingItemsProps} from "@/app/template/models/RequestDataMapping"
import {useCallback, useEffect, useState} from "react";
import {GetActivatingItemsDataModel} from "@/services/@core/module/ResponseDataModels";
import {GlobalController} from "@/modules/common/GlobalController";
import {ActivatingModelHeader} from "@/app/template/domain/useTemplateViewModel";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

const useActivatingItemsViewModel = (currentTemplate: ActivatingModelHeader) => {
    const templateRepo = useTemplateRepository()
    const globalController = GlobalController.getInstance()
    const intl = useIntl()
    const funType = LocalizationFunctionType.Template

    const [queryParams, setQueryParams] = useState<GetActivatingItemsParameters>({
        templateId: currentTemplate.templateId,
        page: 1,
        pageSize: 10,
        searchType: currentTemplate.searchType,
        searchValue: ''
    });

    const [loading, setLoading] = useState(false);
    const [showEventDialog, setShowEventDialog] = useState<boolean>(false)
    const [activatingList, setActivatingList] = useState<GetActivatingItemsDataModel>();

    const getActivatingItems = useCallback(async (props: GetActivatingItemsParameters): Promise<GetActivatingItemsDataModel> => {
        const response =  await templateRepo.getActivatingItems(toGetActivatingItemsProps(props))
        return response
    }, [templateRepo])

    const handleQueryChange = useCallback((params: Record<string, any>) => {
        const isPageChange = Boolean(params['page'])
        setQueryParams(currentParams => ({
            ...currentParams,
            ...params,
            ...(isPageChange ? undefined : {page: 1})
        }))
    }, [])

    const getData = useCallback(async () => {
        setLoading(true)
        getActivatingItems(queryParams)
            .then((response) => {
                setActivatingList(response)
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
        getData()
    }, [queryParams])

    return {
        loading,
        getData,
        showEventDialog,
        setShowEventDialog,
        refresh: getData,
        activatingList,
        pageModel: {
            page: queryParams.page,
            pageSize: queryParams.pageSize
        },
        handleQueryChange,
        intl,
        funType
    }
}

export default useActivatingItemsViewModel