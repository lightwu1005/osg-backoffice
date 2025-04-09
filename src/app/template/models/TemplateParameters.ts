import {GetTemplates, PostTemplate, UpdateTemplateDetail} from "@/services/@core/module/CommonDataModels";

export interface GetTemplatesParameters extends GetTemplates {
}

export interface AddTemplateParameters extends PostTemplate {
}

export interface UpdateTemplateDetailParameters extends UpdateTemplateDetail {
    templateId: string,
    eventType: string
}

export interface GetApplyEventsParameters {
    templateId: string
    eventType: string
    page: number
    pageSize: number
    search?: string
}

export interface GetTemplateDefaultConflictsParameters {
    sportId: string
    eventType: string
    templateId?: string
    leagueIds?: string[]
    marketIds?: string[]
}

export interface GetActivatingItemsParameters {
    page: number
    pageSize: number
    templateId: string
    searchType?: string
    searchValue?: string
}