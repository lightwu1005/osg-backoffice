import useApiInteractor from "@/services/@core/ApiInteractor"
import {
    RemoveTemplatesProps,
    GetTemplateDetailProps,
    GetTemplatesProps, UpdateTemplateDetailProps,
    AddTemplateProps,
    GetApplyEventsProps,
    GetTemplateMarketsProps,
    GetTemplateDefaultConflictsProps,
    GetActivatingItemsProps
} from "@/services/@core/module/RequestDataModels";
import {
    GetApplyEventsDataModel,
    GetTemplateDetailModel,
    GetTemplateListDataModel,
    GetTemplateMarketsDataModel,
    GetActivatingItemsDataModel
} from "@/services/@core/module/ResponseDataModels";

const useTemplateRepository = () => {
    const apiInteractor = useApiInteractor()

    const getTemplates = async (props: GetTemplatesProps): Promise<GetTemplateListDataModel> => {
        return await apiInteractor.getTemplates(props)
    }

    const addTemplate = async (requestData: AddTemplateProps) => {
        return await apiInteractor.addTemplate(requestData)
    }

    const removeTemplates = async (requestData: RemoveTemplatesProps) => {
        return await apiInteractor.removeTemplates(requestData)
    }

    const getTemplateDetail = async (props: GetTemplateDetailProps): Promise<GetTemplateDetailModel> => {
        return await apiInteractor.getTemplateDetail(props)
    }

    const updateTemplateDetail = async (requestData: UpdateTemplateDetailProps) => {
        return await apiInteractor.updateTemplateDetail(requestData)
    }

    const getApplyEvents = async (props: GetApplyEventsProps): Promise<GetApplyEventsDataModel> => {
        return await apiInteractor.getApplyEvents(props)
    }

    const getTemplateMarkets = async (props: GetTemplateMarketsProps): Promise<GetTemplateMarketsDataModel> => {
        return await apiInteractor.getTemplateMarkets(props)
    }
    
    const getTemplateDefaultConflicts = async (props: GetTemplateDefaultConflictsProps): Promise<GetTemplateDetailModel[]> => {
        return await apiInteractor.getTemplateDefaultConflicts(props)
    }

    const getActivatingItems = async (props: GetActivatingItemsProps): Promise<GetActivatingItemsDataModel> => {
        return await apiInteractor.getActivatingItems(props)
    }

    return {
        getTemplates,
        addTemplate,
        removeTemplates,
        getTemplateDetail,
        updateTemplateDetail,
        getApplyEvents,
        getTemplateMarkets,
        getTemplateDefaultConflicts,
        getActivatingItems
    }
}

export default useTemplateRepository