import {SortDirection} from "@/services/@core/module/Enum";

/**
 * @param page Page number.
 * @param size Page size.
 * @param search Search username.
 * @param actions The actions of audits.
 * @param startDate The logTime after startDate.
 * @param endDate The logTime before endDate.
 * @param sortField The column to proceed sorting.
 * @param sortDirection The direction of sorting.
 **/
export interface SearchAuditParameters {
    page: number
    pageSize: number
    search?: string
    actions?: string[]
    startDate?: number
    endDate?: number
    sortField?: string
    sortDirection?: SortDirection
}