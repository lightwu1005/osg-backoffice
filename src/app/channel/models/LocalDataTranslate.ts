import {
    BrandDetailModel,
    BrandListModel,
    ChannelDetailModel,
    ChannelListModel,
    ListResponseModel
} from "@/services/@core/module/ResponseDataModels";
import {ChannelStatus, Functionality} from "@/services/@core/module/Enum";
import {defaultRounding} from "@/app/channel/domain/useChannelFormViewModel";
import {ConfigurationRounding} from "@/services/@core/module/CommonDataModels";
import {UpdateBrandParameters} from "@/app/channel/models/BrandParameters";
import {UpdateChannelParameters} from "@/app/channel/models/ChannelParameters";

export interface LocalChannelListModel extends ListResponseModel<LocalChannelModel>{}
export interface LocalChannelModel {
    id?: string;
    channelName: string;
    channelId: string;
    ownerName: string;
    ownerId: string;
    margin?: number
    email: string;
    locationName: string;
    oddsFormat: string[];
    regTime: number;
    status: ChannelStatus
}

export interface LocalChannelFormModel {
    channelId?: string;
    channelName: string;
    ownerName: string;
    ownerId: string;
    email: string;
    locationName: string;
    oddsFormat: string[];
    margin?: number;
    configuration?: {
        oddsProviders: string[];
        oddsSettings: {
            minimum: number;
            maximum: number;
            difference: number;
        };
        lineSettings: string;
        rounding: ConfigurationRounding[];
    };
}

export const useLocalDataTranslate = () => {
    const userFunctionality = process.env.FUNCTIONALITY ?? '';
    const defaultValues: LocalChannelFormModel = {
        channelId: '',
        channelName: '',
        ownerName: '',
        ownerId: '',
        email: '',
        locationName: '',
        oddsFormat: [],
        margin: 0,
        configuration: {
            oddsProviders: [],
            oddsSettings: {
                minimum: 0,
                maximum: 0,
                difference: 0
            },
            lineSettings: '',
            rounding: defaultRounding
        }
    };

    const toLocalList = (listData: ChannelListModel | BrandListModel) => {
        if (userFunctionality === Functionality.Odds) {
            const brandListData = listData as BrandListModel
            const translatedData: LocalChannelListModel = {
                totalElements: brandListData.totalElements,
                content: brandListData.content.map(brand => ({
                    id: brand.id,
                    channelName: brand.brandName,
                    channelId: brand.brandId,
                    ownerName: brand.ownerName,
                    ownerId: brand.ownerId,
                    margin: brand.margin,
                    email: brand.email,
                    locationName: brand.locationName,
                    oddsFormat: brand.oddsFormat,
                    regTime: brand.regTime,
                    status: brand.status
                }))
            }

            return translatedData
        }else {
            return listData as ChannelListModel
        }
    }

    const toLocalChannelForm = (formData: ChannelDetailModel | BrandDetailModel): LocalChannelFormModel => {
        const channelName = "channelName" in formData ? formData.channelName : formData.brandName;
        const margin = "margin" in formData ? formData.margin : 0;
        const channelId = "channelId" in formData
            ? (formData as ChannelDetailModel).channelId
            : (formData as BrandDetailModel).brandId;

        return {
            channelId: channelId,
            channelName: channelName,
            ownerName: formData.ownerName,
            ownerId: formData.ownerId,
            email: formData.email,
            locationName: formData.locationName,
            oddsFormat: formData.oddsFormat,
            margin: margin,
            configuration: "configuration" in formData ? formData.configuration : undefined
        }
    };


    const toBrandDetailData = (formData: LocalChannelFormModel) => {
        const brandDetailData: UpdateBrandParameters = {
            brandId: formData.channelId ?? '',
            body: {
                brandName: formData.channelName,
                ownerName: formData.ownerName,
                ownerId: formData.ownerId,
                email: formData.email,
                locationName: formData.locationName,
                oddsFormat: formData.oddsFormat,
                margin: formData.margin ?? 0
            }
        }

        return brandDetailData
    }

    const toChannelDetailData = (formData: LocalChannelFormModel) => {
        const channelDetailData: UpdateChannelParameters = {
            channelId: formData.channelId ?? '',
            body: {
                channelName: formData.channelName,
                ownerName: formData.ownerName,
                ownerId: formData.ownerId,
                email: formData.email,
                locationName: formData.locationName,
                oddsFormat: formData.oddsFormat,
                configuration: formData.configuration ?? {
                    oddsProviders: [],
                    oddsSettings: {
                        minimum: 0,
                        maximum: 0,
                        difference: 0
                    },
                    lineSettings: '',
                    rounding: defaultRounding
                }
            }
        }

        return channelDetailData
    }

    return {
        toLocalList,
        toLocalChannelForm,
        toBrandDetailData,
        toChannelDetailData,
        defaultValues
    }
}