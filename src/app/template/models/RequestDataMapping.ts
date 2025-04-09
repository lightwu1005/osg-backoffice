import {
    RemoveTemplatesProps,
    GetTemplateDetailProps,
    GetTemplatesProps,
    GetApplyEventsProps,
    GetTemplateDefaultConflictsProps,
    GetActivatingItemsProps
} from "@/services/@core/module/RequestDataModels";
import {
    GetTemplatesParameters,
    GetApplyEventsParameters,
    GetTemplateDefaultConflictsParameters,
    GetActivatingItemsParameters
} from "@/app/template/models/TemplateParameters";

export const toGetTemplatesProps = (props: GetTemplatesParameters): GetTemplatesProps => {
    return {
        query: props
    }
}

export const toRemoveTemplatesProps = (props: string[]): RemoveTemplatesProps => {
    return {
        body: {
            templateIds: props
        }
    }
}

export const toGetTemplateDetailProps = (prop: string): GetTemplateDetailProps => {
    return {
        endPoint: {
            templateId: prop
        }
    }
}

export const toGetApplyEventsProps = (props: GetApplyEventsParameters): GetApplyEventsProps =>{
    const { templateId, eventType, page, pageSize, search} = props

    return {
        query: {
            templateId: templateId,
            eventType: eventType,
            pageSize: pageSize,
            page: page,
            ...(search ? {search: search} : undefined),
        }
    }
}

export const toGetActivatingItemsProps = (props: GetActivatingItemsParameters): GetActivatingItemsProps => {
    const { templateId, page, pageSize, searchType, searchValue} = props

    return {
        query: {
            templateId: templateId,
            pageSize: pageSize,
            page: page,
            ...(searchType ? {searchType: searchType} : undefined),
            ...(searchValue ? {searchValue: searchValue} : undefined),
        }
    }
}

export const toGetTemplateDefaultConflictsProps = (props: GetTemplateDefaultConflictsParameters): GetTemplateDefaultConflictsProps => {
    return {
        body: props
    }
}