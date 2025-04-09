import {toSingleMemberInfoProps} from "@/app/accountSetting/models/RequestDataMapping";
import {SingleMemberInfoResponseDataModel} from "@/services/@core/module/ResponseDataModels";
import useMemberInfoRepository from "@/services/@member/repository/useMemberInfoRepository";
import {useCallback, useEffect, useState} from "react";
import {StatusItem} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup";
import IdentityHandler from "@/modules/common/IdentityHandler";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

const useAccountSettingViewModel = () => {
    const memberInfoRepo = useMemberInfoRepository();
    const {userUUID} = IdentityHandler();
    const intl = useIntl();
    const funType = LocalizationFunctionType.AccountSetting;
    const funTypeGeneral = `${funType}.general`;
    const funTypeSecurity = `${funType}.security`;

    const getSingleMemberInfo = async (uuid: string): Promise<SingleMemberInfoResponseDataModel> => {
        const response = await memberInfoRepo.getSingleMember(toSingleMemberInfoProps(uuid))
        return response
    }

    const title: string = intl.formatMessage({id: `${funType}.title`, defaultMessage: 'Account Setting'})
    const [status, setStatus] = useState('general')
    const [isLoading, setIsLoading] = useState(false);
    const statusItems: StatusItem[] = [
        {
            key: 'general',
            text: intl.formatMessage({
                id: `${funTypeGeneral}.title`,
                defaultMessage: 'General'
            }),
            type: ''
        },
        {
            key: 'security',
            text: intl.formatMessage({
                id: `${funTypeSecurity}.title`,
                defaultMessage: 'Security'
            }),
            type: ''
        },
    ]
    const [userInfo, setUserInfo] = useState<SingleMemberInfoResponseDataModel | undefined>()

    const getData = async () => {
        const response = await getSingleMemberInfo(userUUID);
        return response
    }

    useEffect(() => {
        handleDataUpdated()
    }, []);

    const handleDataUpdated = () => {
        setIsLoading(true);
        getData().then((response) => {
            setUserInfo(response)
            setIsLoading(false)
        }).finally(() => {
            setIsLoading(false)
        });
    };


    const handleSettingFormChange = useCallback((key: string) => {
        setStatus(key);
    }, []);

    return {
        isLoading,
        title,
        status,
        statusItems,
        userInfo,
        handleSettingFormChange,
        handleDataUpdated
    }
}

export default useAccountSettingViewModel