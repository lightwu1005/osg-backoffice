import useChangePasswordAction from "@/app/changePassword/domain/useChangePasswordAction"
import {toResetPasswordProps} from "@/app/changePassword/models/RequestDataMapping"
import Cookies from "js-cookie"
import * as React from "react"
import {useCallback, useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {GlobalController} from "@/modules/common/GlobalController"
import {ChangePasswordFormData} from "@/app/changePassword/page"
import {useSearchParams} from "next/dist/client/components/navigation"
import {getCombineSplitStringsFromCookie} from "@/services/@core/module/LongTokenHandler";
import {Functionality} from "@/services/@core/module/Enum";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

const useChangePasswordViewModel = (isResetPassword: boolean) => {
    const searchParams = useSearchParams()
    const changePasswordAction = useChangePasswordAction()
    const loginQuery = searchParams.get('c') ?? Cookies.get('c') ?? undefined
    const useLoginQuery = loginQuery && loginQuery !== 'undefined' && process.env.FUNCTIONALITY !== Functionality.Admin
    const intl = useIntl();
    const funType = LocalizationFunctionType.ChangePassword;

    const resetPassword = async (newPwd: string) => {
        let token = searchParams.get('token')
        if (useLoginQuery) Cookies.set('c', loginQuery)
        const auth = token ?? getCombineSplitStringsFromCookie('a') ?? ''
        return await changePasswordAction.resetPassword(toResetPasswordProps(newPwd, auth, loginQuery))
    }

    const [isLoading, setIsLoading] = useState(false)
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('')
    const [formData, setFormData] = useState<ChangePasswordFormData>({
        password: '',
        confirmPassword: ''
    })
    const router = useRouter()
    const globalController = GlobalController.getInstance()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isChangePasswordEnabled, setIsChangePasswordEnabled] = useState(false)
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false)

    const handleClickShowPassword = (field: string) => {
        if (field === 'password') {
            setShowPassword((prev) => !prev)
        } else if (field === 'confirmPassword') {
            setShowConfirmPassword((prev) => !prev)
        }
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const handleChange = useCallback((field: keyof ChangePasswordFormData) => (value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }))

        setConfirmPasswordErrorMessage('')
    },[])

    const handlePasswordValidation = (field: keyof ChangePasswordFormData) =>  (validation: boolean) => {
        switch (field) {
            case 'password':
                setIsPasswordValid(validation)
                break
            case 'confirmPassword':
                setIsConfirmPasswordValid(validation)
                break
            default:
                break

        }
    }

    useEffect(() => {
        const isEnable =
            (formData.password && formData.password.length >= 8 && isPasswordValid) &&
            (formData.confirmPassword && formData.confirmPassword.length >= 8 && isConfirmPasswordValid)

        setIsChangePasswordEnabled(Boolean(isEnable))
    }, [formData, isPasswordValid]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isChangePasswordEnabled) {
            if (formData.password !== formData.confirmPassword) {
                setIsChangePasswordEnabled(false)
                setConfirmPasswordErrorMessage(intl.formatMessage({
                    id: `${funType}.passwordNotMatch`,
                    defaultMessage: 'Passwords do not match'
                }))
                return
            }
        }

        const newPwd = formData.password as string
        setIsLoading(true)
        resetPassword(newPwd).then((resp) => {
            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                severity: resp.isSuccess ? 'success' : 'error',
                show: true,
                message: resp.result
            })
        }).finally(() => {
            setTimeout(() => {
                setIsLoading(false)
                if (useLoginQuery) {
                    router.push(`/login?c=${loginQuery}`)
                } else {
                    router.push('/login')
                }
            }, 3000)
        })
    }

    return {
        isLoading,
        formData,
        confirmPasswordErrorMessage,
        isChangePasswordEnabled,
        handleChange,
        handlePasswordValidation,
        handleSubmit,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        showConfirmPassword,
        title: intl.formatMessage({
            id: isResetPassword ? `${funType}.titleResetYourPassword` : `${funType}.titleSetYourPassword`,
            defaultMessage: isResetPassword ? 'Reset Your Password' : 'Set Your Password'
        }),
        yourPassword: intl.formatMessage({
            id: `${funType}.yourPassword`,
            defaultMessage: 'Your Password'
        }),
        confirmPassword: intl.formatMessage({
            id: `${funType}.confirmPassword`,
            defaultMessage: 'Confirm Password'
        }),
        setPassword: intl.formatMessage({
            id: `${funType}.setPassword`,
            defaultMessage: 'Set Password'
        })
    }
}

export default useChangePasswordViewModel
