import {
    GetConfigurationParameters,
    UpdateConfigurationParameters
} from "@/app/configuration/models/ConfigurationParameters";
import {
    GetConfigurationProps, UpdateBrandConfigurationProps,
    UpdateConfigurationProps
} from "@/services/@core/module/RequestDataModels";

export function toGetConfigurationProps(parameters: GetConfigurationParameters): GetConfigurationProps {
    const {eventType} = parameters
    return {
        query: {
            eventType: eventType
        }
    };
}

export function toUpdateConfigurationProps(parameters: UpdateConfigurationParameters): UpdateConfigurationProps {
    const {eventType, body} = parameters
    return {
        query: {
            eventType: eventType
        },
        body: body
    };
}

export function toUpdateBrandConfigurationProps(parameters: UpdateConfigurationParameters): UpdateBrandConfigurationProps {
    const {eventType, body} = parameters
    const {oddsSettings, lineSetting, defaultMargin, roundingIncrement, ...brandBody} = body
    return {
        query: {
            eventType: eventType
        },
        body: brandBody
    };
}