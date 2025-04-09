import {BrandDetailModel} from "@/services/@core/module/ResponseDataModels";
import {SortDirection} from "@/services/@core/module/Enum";

export interface UpdateBrandParameters {
    brandId: string;
    body: BrandDetailModel;
}

/**
 * @param page Page number.
 * @param size Page size.
 * @param locationNames Selecting location names.
 * @param statuses Selecting status options.
 * @param startDate The logTime after startDate.
 * @param endDate The logTime before endDate.
 * @param sortField The column to proceed sorting.
 * @param sortDirection The direction of sorting.
 **/
export interface GetBrandsParameters {
    page: number;
    pageSize: number;
    locationNames?: string[];
    statuses?: string[];
    startDate?: number;
    endDate?: number;
    sortField?: string;
    sortDirection?: SortDirection;
}