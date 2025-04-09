import {MemberStatus, SortDirection} from "@/services/@core/module/Enum";


/**
 * @param channelId only for Odds Bo.
 **/

export interface MemberFormFields {
    userName: string
    email: string
    role: string
    organization: string
    channelId?: string
}
export interface AddMemberParameters extends MemberFormFields {}

export interface UpdateMemberInfoParameters extends MemberFormFields {
    uuid: string
}

/**
 * @param page Page number.
 * @param size Page size.
 * @param organization To represent member's company.
 * @param roles To represent member's role.
 * @param functionlidy To represent this member able to access which BO.
 * @param statuses Member's status.
 * @param sortField The column to proceed sorting.
 * @param sortDirection The direction of sorting.
 **/
export interface MemberListParameters {
    page: number;
    pageSize: number;
    search?: string
    organization?: string;
    roles?: string[];
    functionality?: string;
    statuses?: MemberStatus[];
    sortField?: string;
    sortDirection?: SortDirection;
}