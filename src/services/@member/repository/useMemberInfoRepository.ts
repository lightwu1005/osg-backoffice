import useApiInteractor from "@/services/@core/ApiInteractor";
import {
    AddMemberProps,
    ResetPasswordProps,
    DeleteMembersProps,
    GenerateTokenViaEmailProps,
    GetMemberListProps,
    GetSingleMemberInfoProps,
    UpdateMemberInfoProps,
    UpdateMemberStatusProps, ResetPasswordWithOldProps
} from "@/services/@core/module/RequestDataModels";
import {SingleMemberInfoResponseDataModel} from "@/services/@core/module/ResponseDataModels";

const useMemberInfoRepository = () => {

    const apiInteractor = useApiInteractor()
    const getSingleMember = async (requestData: GetSingleMemberInfoProps): Promise<SingleMemberInfoResponseDataModel> => {
        return await apiInteractor.getSingleMemberInfo(requestData)
    }

    const getMemberList = async (requestData: GetMemberListProps) => {
        return await apiInteractor.getMemberList(requestData)
    }

    const updateMemberInfo = async (requestData: UpdateMemberInfoProps) => {
        return await apiInteractor.updateMemberInfo(requestData)
    }

    const addMember = async (requestData: AddMemberProps) => {
        return await apiInteractor.addMembers(requestData)
    }

    const deleteMembers = async (requestData: DeleteMembersProps) => {
        return await apiInteractor.deleteMembers(requestData)
    }

    const getMemberRoles = async () => {
        return await apiInteractor.getMemberRoles()
    }

    const updateMembersStatus = async (requestData: UpdateMemberStatusProps) => {
        return await apiInteractor.updateMembersStatus(requestData)
    }

    const resetPassword = async (requestData: ResetPasswordProps) => {
        return await apiInteractor.resetPassword(requestData)
    }

    const generateTokenViaEmail = async (requestData: GenerateTokenViaEmailProps) => {
        return await apiInteractor.generateTokenViaEmail(requestData)
    }


    const resetPwdWithOld = async (requestData: ResetPasswordWithOldProps) => {
        return await apiInteractor.resetPwdWithOld(requestData)
    }

    return {
        getSingleMember,
        getMemberList,
        addMember,
        deleteMembers,
        getMemberRoles,
        updateMemberInfo,
        updateMembersStatus,
        resetPassword,
        resetPwdWithOld,
        generateTokenViaEmail
    }
}

export default useMemberInfoRepository