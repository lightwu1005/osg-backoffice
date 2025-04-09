import {SortDirection} from "@/services/@core/module/Enum";

/**
 * @param page Page number.
 * @param size Page size.
 * @param read The read/unread status of this msg.
 * @param startDate The logTime after startDate.
 * @param endDate The logTime before endDate.
 * @param sortField The column to proceed sorting.
 * @param sortDirection The direction of sorting.
 **/
export interface GetNotificationsParameters {
    page: number,
    pageSize: number,
    read?: boolean,
    eventId?: string,
    startDate?: number,
    endDate?: number,
    sortField?: string,
    sortDirection?: SortDirection
}