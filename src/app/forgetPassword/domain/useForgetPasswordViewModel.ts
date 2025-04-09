import * as React from "react";
import {isValidEmail} from "@/modules/common/CommonRegexChecker";
import {GlobalController} from "@/modules/common/GlobalController";
import useForgetPasswordAction from "@/app/forgetPassword/domain/useForgetPasswordAction";
import {toGenerateTokenViaEmailProps} from "@/app/forgetPassword/models/RequestDataMapping";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

const useForgetPasswordViewModel = () => {
    const forgetPasswordAction = useForgetPasswordAction()
    const intl = useIntl()
    const funType = LocalizationFunctionType.ForgetPassword

    const generateTokenViaEmail = async (email: string) => {
        return await forgetPasswordAction.generateTokenViaEmail(toGenerateTokenViaEmailProps(email))
    }

    const [isEmailBlurred, setIsEmailBlurred] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [email, setEmail] = React.useState<string>('');
    const showEmailError = Boolean(
        (isEmailBlurred && email.trim() !== '' && !isValidEmail(email))
    )
    const [isSendEmailEnabled, setIsSendEmailEnabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false);
    const globalController = GlobalController.getInstance()
    const [seconds, setSeconds] = React.useState<number>(60);
    const [isActive, setIsActive] = React.useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setEmail(value);
        setIsSendEmailEnabled(isValidEmail(value));
        setIsEmailBlurred(false);
        if (errorMessage) setErrorMessage('')
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const {name} = e.target;
        if (name === 'email') setIsEmailBlurred(true);
    };

    const sendAgain = React.useCallback(async () => {
        await setSeconds(60)
        setIsActive(false)
        setIsSendEmailEnabled(true)
    }, [seconds])

    const startTimer = React.useCallback(async () => {
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => {
                const newSeconds = prevSeconds - 1;
                if (newSeconds === 0) {
                    clearInterval(intervalId);
                    sendAgain();
                }
                return newSeconds;
            });
        }, 1000);
    }, [seconds]);

    const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        generateTokenViaEmail(email).then((resp) => {
            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                severity: resp.isSuccess ? 'success' : 'error',
                show: true,
                message: resp.result,
            })
        }).finally(() => setLoading(false))

        setTimeout(() => {
            setIsSendEmailEnabled(false)
            setIsActive(true)
        }, 1000);

        startTimer().then(() => {
            sendAgain()
        })

    }

    return {
        loading,
        email,
        errorMessage,
        isSendEmailEnabled,
        isEmailBlurred,
        showEmailError,
        handleChange,
        handleBlur,
        isActive,
        sendEmail,
        title: intl.formatMessage({id: `${funType}.title`, defaultMessage: 'Forget Password'}),
        emailAddress: intl.formatMessage({id: `${funType}.emailAddress`, defaultMessage: 'Email Address'}),
        sendAgainInSeconds: intl.formatMessage({id: `${funType}.sendAgainInSeconds`,
            defaultMessage: 'Send it again in ({seconds})'}, {seconds: seconds}),
        sendEmailText: intl.formatMessage({
            id: `${funType}.sendEmail`, defaultMessage: 'Send Email'
        }),
        helperText: intl.formatMessage({
            id: `${funType}.helperText`, defaultMessage: 'The email format incorrect or cannot find your email'
        }),
    }
}

export default useForgetPasswordViewModel
