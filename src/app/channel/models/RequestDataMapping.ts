import {
    AddChannelProps,
    ChannelListProps,
    GetChannelDetailProps,
    LocationsProps,
    RemoveChannelsProps,
    UpdateChannelStatusProps,
    UpdateChannelProps,
    GetAvailableOwnerProps,
    AddBrandProps,
    BrandListProps,
    RemoveBrandProps,
    UpdateBrandStatusProps,
    GetBrandDetailProps,
    UpdateBrandProps
} from "@/services/@core/module/RequestDataModels";
import {GetChannelsParameters, UpdateChannelParameters} from "@/app/channel/models/ChannelParameters";
import {ChannelStatus} from "@/services/@core/module/Enum";
import {BrandDetailModel, ChannelDetailModel} from "@/services/@core/module/ResponseDataModels";
import {GetBrandsParameters, UpdateBrandParameters} from "@/app/channel/models/BrandParameters";

export function toAddChannelProps(parameters: ChannelDetailModel): AddChannelProps {
    const {ownerName, email, ... other} = parameters
    return {
        body: {
            ...other
        }
    };
}

export function toChannelListProps(parameters: GetChannelsParameters): ChannelListProps {
    const {locationNames, statuses, startDate, endDate, ...other} = parameters
    return {
        query: {
            ...other,
            ...(locationNames ? { locationNames: locationNames } : undefined),
            ...(statuses ? { statuses: statuses } : undefined),
            ...(startDate && endDate && !isNaN(startDate) && !isNaN(endDate) ? {
                startDate: startDate,
                endDate: endDate
            } : undefined ),
        }
    };
}

export function toRemoveChannelsProps(channelIds: string[]): RemoveChannelsProps {
    return {
        body: {
            channelIds: channelIds
        }
    };
}

export function toUpdateChannelStatusProps(channelIds: string[], status: ChannelStatus): UpdateChannelStatusProps {
    return {
        body: {
            channelIds: channelIds,
            status: status
        }
    };
}

export function toLocationsProps(sportId: string): LocationsProps {
    return {
        query: {
            sportId: sportId
        }
    };
}

export function toGetChannelDetail(channelId: string): GetChannelDetailProps {
    return {
        endPoint: {
            channelId: channelId
        }
    }
}

export function toUpdateChannel(parameters: UpdateChannelParameters): UpdateChannelProps {
    return {
        endPoint: {
            channelId: parameters.channelId
        },
        body: parameters.body
    };
}

export function toGetAvailableOwners(page: number, pageSize: number): GetAvailableOwnerProps {
    return {
        query: {
            page: page,
            pageSize: pageSize,
            functionality: process.env.FUNCTIONALITY || ''
        }
    }
}

// Brand
export function toAddBrandProps(parameters: BrandDetailModel): AddBrandProps {
    const {ownerName, email, ... other} = parameters
    return {
        body: {
            ...other
        }
    };
}

export function toBrandListProps(parameters: GetBrandsParameters): BrandListProps {
    const {locationNames, statuses, startDate, endDate, ...other} = parameters
    return {
        query: {
            ...other,
            sortField: other.sortField?.startsWith('channel') ? other.sortField?.replace('channel', 'brand') : other.sortField,
            ...(locationNames ? { locationNames: locationNames } : undefined),
            ...(statuses ? { statuses: statuses } : undefined),
            ...(startDate && endDate && !isNaN(startDate) && !isNaN(endDate) ? {
                startDate: startDate,
                endDate: endDate
            } : undefined ),
        }
    };
}

export function toRemoveBrandsProps(brandIds: string[]): RemoveBrandProps {
    return {
        body: {
            brandIds: brandIds
        }
    };
}

export function toUpdateBrandStatusProps(brandIds: string[], status: ChannelStatus): UpdateBrandStatusProps {
    return {
        body: {
            brandIds: brandIds,
            status: status
        }
    };
}

export function toGetBrandDetail(brandId: string): GetBrandDetailProps {
    return {
        endPoint: {
            brandId: brandId
        }
    }
}

export function toUpdateBrand(parameters: UpdateBrandParameters): UpdateBrandProps {
    return {
        endPoint: {
            brandId: parameters.brandId
        },
        body: parameters.body
    }
}