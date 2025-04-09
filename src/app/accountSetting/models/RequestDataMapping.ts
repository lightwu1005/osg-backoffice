import {
    GetSingleMemberInfoProps,
    UpdateMemberInfoProps,
    UpdateMemberStatusProps
} from "@/services/@core/module/RequestDataModels";
import {UpdateMemberInfoParameter} from "@/app/accountSetting/models/UpdateMemberInfoParameter";
import {MemberStatus} from "@/services/@core/module/Enum";

export function toSingleMemberInfoProps(uuid: string): GetSingleMemberInfoProps {
    return {
        endPoint: {
            uuid: uuid
        }
    };
}

export function toUpdateSingleMemberInfoProps(parameters: UpdateMemberInfoParameter): UpdateMemberInfoProps {
    const {uuid, ...body} = parameters
    return {
        endPoint: {
            uuid: uuid
        },
        body: body
    }
}

export function toUpdateMembersStatusProps(uuids: string[], status: MemberStatus): UpdateMemberStatusProps {
    return {
        body: {
            uuids: uuids,
            status: status
        }
    };
}
