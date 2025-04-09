import {LoginResponseDataModel} from "@/services/@core/module/ResponseDataModels";
import useApiInteractor from "../../@core/ApiInteractor";
import {LoginProps, LogoutProps} from "@/services/@core/module/RequestDataModels";
import {cleanIdentityInfo, setupIdentityInfoByLogin} from "@/modules/common/IdentityHandler";
import {storeSplitStringToCookie} from "@/services/@core/module/LongTokenHandler";
import {GlobalWebSocket} from "@/modules/common/GlobalWebSocket";

const useLoginRepository = () => {
    const apiInteractor = useApiInteractor();
    const userLogin = async (requestData: LoginProps): Promise<LoginResponseDataModel> => {
        cleanIdentityInfo();
        const response = await apiInteractor.userLogin(requestData)
        storeSplitStringToCookie('a', response.access_token);
        if (response.user_info) {
            setupIdentityInfoByLogin(response.user_info);
        }
        return response
    }

    const userLogout = async (requestData: LogoutProps) => {
        await apiInteractor.userLogout(requestData);
        GlobalWebSocket.clearInstance()
        cleanIdentityInfo();
    }

    return { userLogin, userLogout }
}

export default useLoginRepository