import {toResetPasswordWithOldProps} from "@/app/changePassword/models/RequestDataMapping"
import {GlobalController} from "@/modules/common/GlobalController"
import * as React from "react"
import {useCallback, useEffect, useRef, useState} from "react"
import {AccountPasswordFormData} from "@/app/accountSetting/models/dataModel/AccountSettingFormData"
import useMemberInfoRepository from "@/services/@member/repository/useMemberInfoRepository"
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

const useSecurityAccountSettingFormViewModel = () => {
    const domainAction = useMemberInfoRepository()
    const intl = useIntl();
    const funType = `${LocalizationFunctionType.AccountSetting}.security`;

    const resetPwdWithOld = async (oldPwd: string, newPwd: string) => {
        return await domainAction.resetPwdWithOld(toResetPasswordWithOldProps(oldPwd, newPwd))
    }

    const globalController = GlobalController.getInstance()
    const userInfo = useRef<AccountPasswordFormData>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [formData, setFormData] = useState<AccountPasswordFormData>(userInfo.current)
    const [isLoading, setIsLoading] = useState(false)
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('')
    const [isConfirmPasswordBlurred, setIsConfirmPasswordBlurred] = useState(false)

    const handleInputChange = useCallback((field: keyof AccountPasswordFormData) => (value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }))

        setConfirmPasswordErrorMessage('')
    }, [formData])

    const [checkIsSubmitEnabled, setCheckIsSubmitEnabled] = useState(false)

    useEffect(() => {
        const isEnable =
            formData.currentPassword.length > 0 &&
            formData.newPassword.length > 0 &&
            formData.confirmPassword.length > 0 &&
            formData.newPassword.length > 0 &&
            formData.currentPassword.length > 0

        setCheckIsSubmitEnabled(isEnable)
    }, [formData]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (checkIsSubmitEnabled) {

            if (formData.newPassword !== formData.confirmPassword) {
                setIsConfirmPasswordBlurred(true)
                setConfirmPasswordErrorMessage(
                    intl.formatMessage({
                        id: `${funType}.passwordsDoNotMatch`,
                        defaultMessage: 'Passwords do not match'
                    })
                )
                return
            }
        }

        const oldPwd = formData.currentPassword as string
        const newPwd = formData.newPassword as string

        setIsLoading(true)
        resetPwdWithOld(oldPwd, newPwd)
            .then((resp) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: resp.isSuccess ? 'success' : 'error',
                    show: true,
                    message: resp.result
                })
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const handleClickShowPassword = (field: string) => {
        if (field === 'currentPassword') {
            setShowCurrentPassword((prev) => !prev)
        } else if (field === 'newPassword') {
            setShowNewPassword((prev) => !prev)
        } else if (field === 'confirmPassword') {
            setShowConfirmPassword((prev) => !prev)
        }
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const showConfirmPasswordError = Boolean(
        isConfirmPasswordBlurred &&
        formData.confirmPassword.trim() !== '' &&
        formData.newPassword !== formData.confirmPassword
    )

    return {
        isLoading,
        checkIsSubmitEnabled,
        formData,
        confirmPasswordErrorMessage,
        handleInputChange,
        handleSubmit,
        showCurrentPassword,
        showNewPassword,
        showConfirmPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        showConfirmPasswordError,
        currentPassword: intl.formatMessage({id: `${funType}.currentPassword`, defaultMessage: 'Current Password'}),
        newPassword: intl.formatMessage({id: `${funType}.newPassword`, defaultMessage: 'New Password'}),
        confirmPassword: intl.formatMessage({id: `${funType}.confirmPassword`, defaultMessage: 'Confirm Password'}),
        save: intl.formatMessage({id: `${funType}.save`, defaultMessage: 'Save'})
    }
}

export default useSecurityAccountSettingFormViewModel
