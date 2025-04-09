import useMemberInfoRepository from "@/services/@member/repository/useMemberInfoRepository";
import {ResetPasswordProps} from "@/services/@core/module/RequestDataModels";

const useChangePasswordAction = () => {
    const memberRepo = useMemberInfoRepository()

    const resetPassword = async (props: ResetPasswordProps) => {
        return await memberRepo.resetPassword(props)
    }

    return {
        resetPassword
    }
}

export default useChangePasswordAction