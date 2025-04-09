import {UpdateMemberInfoParameter} from "@/app/accountSetting/models/UpdateMemberInfoParameter";
import {toUpdateSingleMemberInfoProps} from "@/app/accountSetting/models/RequestDataMapping";
import {GlobalController} from "@/modules/common/GlobalController";
import * as React from "react";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {AccountInfoProps, AccountSettingFormData} from "@/app/accountSetting/models/dataModel/AccountSettingFormData";
import store, {setUsername} from "@/modules/common/IdentityRedux";
import {GeneralAccountSettingFormProps} from "@/app/accountSetting/components/pageConponent/GeneralAccountSettingForm";
import useMemberInfoRepository from "@/services/@member/repository/useMemberInfoRepository";
import IdentityHandler from "@/modules/common/IdentityHandler";
import {RegexPatterns} from "@/modules/common/CommonRegexChecker";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

const useGeneralAccountSettingFormViewModel = ({initialData, onUpdated}: GeneralAccountSettingFormProps) => {
    const domainAction = useMemberInfoRepository()
    const {userUUID} = IdentityHandler();
    const intl = useIntl();
    const funType = `${LocalizationFunctionType.AccountSetting}.general`;

    const updateSingleMemberInfo = async (requestData: UpdateMemberInfoParameter) => {
        return await domainAction.updateMemberInfo(toUpdateSingleMemberInfoProps(requestData))
    }

    const globalController = GlobalController.getInstance()
    const userInfo = useRef<AccountInfoProps>({
        userName: initialData?.userName ?? '',
        email: initialData?.email ?? '',
        jobTitle: initialData?.jobTitle ?? '',
        phoneNumber: initialData?.phoneNumber ?? ''
    })
    const [formData, setFormData] = useState<AccountSettingFormData>({
        uuid: userUUID,
        userName: initialData?.userName ?? '',
        jobTitle: initialData?.jobTitle ?? '',
        phoneNumber: initialData?.phoneNumber ?? '',
        status: initialData?.status ?? ''
    });

    const [formError, setFormDataError] = useState({
        userName: false,
        jobTitle: false,
        phoneNumber: false
    })

    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

    const handleInputChange = useCallback((field: keyof AccountSettingFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // Phone numbers need to block input of unqualified RegexPatterns
        if (e.target.value !== '' &&  field === 'phoneNumber' && !(RegexPatterns.PhoneNumber.test(e.target.value))) {
            return
        }

        setFormData(prev => ({
            ...prev,
            [field]: e.target === undefined ? e : e.target.value,
        }));
    }, []);

    const handleErrorChange = useCallback((field: keyof AccountSettingFormData) => (isError: boolean) => {
        setFormDataError(prev => ({
            ...prev,
            [field]: isError,
        }));
    }, []);

    const checkSubmitProperties = useMemo(() => {
        const checkExists = (value: string | undefined): boolean => {
            return value !== '' && value !== null && value !== undefined
        }

        const userNameExists = checkExists(formData.userName)
        const userNameChanged = userInfo.current.userName !== formData.userName
        const userJobExists = checkExists(formData.jobTitle)
        const userJobChanged = userInfo.current.jobTitle !== formData.jobTitle
        const userPhoneExists = checkExists(formData.phoneNumber)
        const userPhoneChanged = userInfo.current.phoneNumber !== formData.phoneNumber

        const isFormFieldError = formError.userName || formError.jobTitle || formError.phoneNumber

        return !isFormFieldError && ((userNameExists && userNameChanged) || (userJobExists && userJobChanged) || (userPhoneExists && userPhoneChanged))
    }, [formData, formError])

    useEffect(() => {
        setIsSubmitEnabled(checkSubmitProperties)
    }, [checkSubmitProperties]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isSubmitEnabled) return;

        try {
            setIsLoading(true);
            await updateSingleMemberInfo({
                ...formData
            }).then(result => {
                if (result) {
                    store.dispatch(setUsername(result.userName ?? ''));
                    onUpdated();
                }
            })
        } catch (e) {
            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                severity: 'error',
                show: true,
                message: e
            });
        } finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        formData,
        userInfo,
        isSubmitEnabled,
        handleInputChange,
        handleSubmit,
        formError,
        handleErrorChange,
        userName: intl.formatMessage({id: `${funType}.userName`, defaultMessage: 'User Name'}),
        userNameHelperText: intl.formatMessage({id: `${funType}.userNameHelperText`, defaultMessage: 'Please enter a valid user name'}),
        email: intl.formatMessage({id: `${funType}.email`, defaultMessage: 'Email'}),
        jobTitle: intl.formatMessage({id: `${funType}.jobTitle`, defaultMessage: 'Job Title'}),
        jobTitleHelperText: intl.formatMessage({id: `${funType}.jobTitleHelperText`, defaultMessage: 'Please enter a valid title'}),
        phoneNumber: intl.formatMessage({id: `${funType}.phoneNumber`, defaultMessage: 'Phone Number'}),
        phoneNumberHelperText: intl.formatMessage({id: `${funType}.phoneNumberHelperText`, defaultMessage: 'Please enter a valid phone number'}),
        save: intl.formatMessage({id: `${funType}.save`, defaultMessage: 'Save'})
    }
}

export default useGeneralAccountSettingFormViewModel