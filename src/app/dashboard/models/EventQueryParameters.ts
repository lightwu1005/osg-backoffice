import {BarchartDataSet} from "@/modules/components/charts/CommonHorizontalBarchart";
import {PerformanceDataModel} from "@/services/@core/module/ResponseDataModels";
import {SortDirection} from "@/services/@core/module/Enum";

/**
 * @param page Page number.
 * @param size Page size.
 * @param sportId To represent sport ID.
 * @param search Search username.
 * @param status To represent provider connection status.
 * @param sortField The column to proceed sorting.
 * @param sortDirection The direction of sorting.
 **/
export interface ProviderInfoQueryParameters {
    page: number;
    pageSize: number;
    sportId: string;
    search?: string[];
    status?: string[];
    sortField?: string;
    sortDirection?: SortDirection;
}

export interface GetPerformanceParameters {
    infoType: string
    startDate: number
    endDate: number
    sportIds?: string[]
    betType?: string
}

export interface BarChartProps {
    title: string;
    subTitle: string;
    dataType: 'money' | 'percentage' | 'number';
    data: BarchartDataSet[];
    height: number;
    labels: string[];
    infoIds: string[];
    colors: string[];
}

export interface PieChartProps {
    infoId: string
    infoTitle: string
    totalNumber: number
    infoData: { label: string, value: number }[]
}

export interface toBarchartParameters {
    title: string
    subTitle: string
    dataType: 'money' | 'percentage' | 'number'
    data: PerformanceDataModel[]
}

export interface QueryChangeParameters {
    infoType: string
    startDate?: number
    endDate?: number
    sportIds?: string[]
    betType?: string
}

export interface LeagueQueryParameters {
    page: number;
    pageSize: number;
    sportIds?: string[];
    eventType?: string;
    search?: string;
}
