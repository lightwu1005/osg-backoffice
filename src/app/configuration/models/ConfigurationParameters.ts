import {UpdateConfigurationModel} from "@/services/@core/module/ResponseDataModels";

export interface GetConfigurationParameters {
    eventType: string
}

export interface UpdateConfigurationParameters {
    eventType: string
    body: UpdateConfigurationModel
}