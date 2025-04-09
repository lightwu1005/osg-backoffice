import {LoginFormData} from "@/app/login/models/LoginFormData"
import {toLoginProps} from "@/app/login/models/RequestDataMapping"
import useLoginRepository from "@/services/@login/repository/useLoginRepository"
import {PublicClientApplication} from "@azure/msal-browser"
import {msalConfig} from "@/app/login/config/authConfig"
import * as React from "react"
import {ReactNode, useCallback, useEffect, useState} from "react"
import {GlobalController} from "@/modules/common/GlobalController"
import {isValidEmail} from "@/modules/common/CommonRegexChecker"
import Link from "@mui/material/Link";
import {useNavigationProvider} from "@/utils/NavigationProvider";
import {Functionality, PageType} from "@/services/@core/module/Enum";
import {useSearchParams} from "next/dist/client/components/navigation";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

const useLoginInteractor = () => {
    const {userLogin} = useLoginRepository()
    const searchParams = useSearchParams();
    const loginQuery = searchParams.get('c') ?? undefined;
    const useLoginQuery = loginQuery && loginQuery !== 'undefined' && process.env.FUNCTIONALITY !== Functionality.Admin
    const intl = useIntl();
    const funType = LocalizationFunctionType.Login;

    if (loginQuery) Cookies.set('c', loginQuery);

    const login = async (formData: LoginFormData) => {
        return await userLogin(toLoginProps(formData))
    }

    const msalInstance = new PublicClientApplication(msalConfig)
    const [formData, setFormData] = React.useState<LoginFormData>({
        userAccount: '',
        password: '',
        loginType: 0,
        customerId: '',
        functionality: ''
    })

    // Display handling
    const [isEmailBlurred, setIsEmailBlurred] = useState(false)
    const [isPasswordBlurred, setIsPasswordBlurred] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | ReactNode>('')
    const globalController = GlobalController.getInstance()
    const [showPassword, setShowPassword] = useState(false)
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const {normalProvider} = useNavigationProvider()

    // Sign Checker
    const showEmailError = Boolean(
        (isEmailBlurred && formData.userAccount.trim() !== '' && !isValidEmail(formData.userAccount))
    )
    const showPasswordError = Boolean(
        (isPasswordBlurred &&
            formData.password &&
            formData.password.trim() !== '')
    )

    const [isSignInEnabled, setIsSignInEnabled] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const isEnable = isValidEmail(formData.userAccount) && (formData.password.length >= 8 && isPasswordValid);
        setIsSignInEnabled(isEnable);
    }, [formData, isPasswordValid])

    useEffect(() => {
        if (isSignInEnabled && errorMessage) setErrorMessage('');
    }, [isSignInEnabled])

    const handleForgetPassword = () => {
        router.push('/forgetPassword')
    }

    const handlePasswordValidation = (validation: boolean) => {
        return setIsPasswordValid(validation)
    }

    const handleChange = useCallback((field: keyof LoginFormData) => (value: string) => {
        if (field === 'userAccount') setIsEmailBlurred(false)
        if (field === 'password') setIsPasswordBlurred(false)
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
        if (errorMessage) setErrorMessage('');
    }, [errorMessage])

    const handleBlur = useCallback((field: keyof LoginFormData) => (value: string) => {
        if (field === 'userAccount') setIsEmailBlurred(true)
        if (field === 'password') setIsPasswordBlurred(true)
    },[])

    const handleMSonTokenChange = async (accessToken?: string, userAccount?: string) => {

        if (accessToken && userAccount) {
            setIsLoading(true)
            const currentFormData: LoginFormData = {
                ...formData,
                userAccount: userAccount,
                password: accessToken,
                loginType: 1
            }

            await sendLoginRequest(currentFormData)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Won't process anything before form filled in correctly.
        if (!isSignInEnabled) return

        setIsLoading(true);

        const currentFormData = {
            ...formData,
            ...(useLoginQuery ? {customerId: loginQuery} : undefined),
            functionality: process.env.FUNCTIONALITY ?? '',
            timestamp: Date.now()
        }

        await sendLoginRequest(currentFormData);
    }

    const sendLoginRequest = async (requestData: LoginFormData) => {
        login(requestData).then((response) => {
            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                show: true,
                message: intl.formatMessage({
                    id: `${funType}.loginSuccess`,
                    defaultMessage: 'Woo~hoo! Welcome to OllehSports!'
                }),
                severity: 'success'
            });
            normalProvider.normalNavigation(PageType.Dashboard)
        })
        .catch((error: {needToContactSupport: boolean, message: string}) => {
            if (error.needToContactSupport) {
                setErrorMessage(
                    <>
                        {error.message}
                        {', '}
                        {intl.formatMessage(
                            {
                                id: `${funType}.contactUs`,
                                defaultMessage: 'please contact {link}'
                            },
                            {
                                link: (
                                    <Link color="error" target="_blank" href="mailto:it@ollehsports.com">
                                        {
                                            intl.formatMessage({
                                                id: `${funType}.support`, defaultMessage: 'support'
                                            })
                                        }
                                    </Link>
                                ),
                            }
                        )}
                    </>
                )
            } else {
                setErrorMessage(error.message)
            }
        })
        .finally(() => setIsLoading(false))
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    return {
        isLoading,
        formData,
        msalInstance,
        errorMessage,
        showEmailError,
        showPasswordError,
        isSignInEnabled,
        handleSubmit,
        handleChange,
        handleBlur,
        handlePasswordValidation,
        handleMSonTokenChange,
        handleForgetPassword,
        handleClickShowPassword,
        showPassword,
        handleMouseDownPassword,
        title: intl.formatMessage({id: `${funType}.title`, defaultMessage: 'Login into OllehSports'}),
        emailAddress: intl.formatMessage({id: `${funType}.emailAddress`, defaultMessage: 'Email Address'}),
        password: intl.formatMessage({id: `${funType}.password`, defaultMessage: 'Password'}),
        signIn: intl.formatMessage({id: `${funType}.signIn`, defaultMessage: 'SIGN IN'}),
        forgetPassword: intl.formatMessage({id: `${funType}.forgetPassword`, defaultMessage: 'Forget Password'}),
        invalidEmailAddress: intl.formatMessage({id: `${funType}.invalidEmailAddress`, defaultMessage: 'Invalid email address'}),
    }
}

export default useLoginInteractor