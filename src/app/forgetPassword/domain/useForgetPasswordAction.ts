import useMemberInfoRepository from "@/services/@member/repository/useMemberInfoRepository";
import {
    GenerateTokenViaEmailProps
} from "@/services/@core/module/RequestDataModels";

const useForgetPasswordAction = () => {
    const memberRepo = useMemberInfoRepository()

    const generateTokenViaEmail = async (prop: GenerateTokenViaEmailProps) => {
        const resp = await memberRepo.generateTokenViaEmail(prop)
        return resp
    }

    return {
        generateTokenViaEmail
    }
}

export default useForgetPasswordAction