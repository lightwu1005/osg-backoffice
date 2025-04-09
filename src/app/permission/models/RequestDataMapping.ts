import {
    AddMemberProps,
    DeleteMembersProps,
    GetMemberListProps, UpdateMemberInfoProps,
} from "@/services/@core/module/RequestDataModels";
import {
    AddMemberParameters,
    MemberListParameters,
    UpdateMemberInfoParameters
} from "@/app/permission/models/PermissionParameters";

export function toMemberListProps(props: MemberListParameters): GetMemberListProps {
    const {
        page,
        pageSize,
        organization,
        search,
        roles,
        functionality,
        statuses,
        sortField,
        sortDirection
    } = props

    return {
        query: {
            page: page,
            pageSize: pageSize,
            ...(organization ? {organization: organization} : undefined),
            ...(search ? {search: search} : undefined),
            ...(roles ? {roles: roles} : undefined),
            ...(functionality ? {functionality: functionality} : undefined),
            ...(statuses ? {statuses: statuses} : undefined),
            ...(sortField ? {sortField: sortField} : undefined),
            ...(sortDirection ? {sortDirection: sortDirection} : undefined)
        }
    };
}

export function toAddMemberProps(parameters: AddMemberParameters): AddMemberProps {
    const {email, ...others} = parameters
    return {
        body: {
            userAccount: email,
            email: email,
            ...others
        }
    };
}

export function toUpdateMemberInfoProps(parameters: UpdateMemberInfoParameters): UpdateMemberInfoProps {
    const {uuid, ...others} = parameters
    return {
        endPoint: {
            uuid: uuid
        },
        body: {
            ...others
        }
    };
}

export function toDeleteMembersProps(uuids: string[]): DeleteMembersProps {
    return {
        body: {
            uuids: uuids
        }
    };
}