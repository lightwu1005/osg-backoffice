import {LoginFormData} from "@/app/login/models/LoginFormData";
import {LoginProps, LogoutProps} from "@/services/@core/module/RequestDataModels";

export function toLoginProps(data: LoginFormData): LoginProps {
    const key = `${process.env.NEXT_PUBLIC_LOGIN_ENCRYPTION_KEY_ID}:${process.env.NEXT_PUBLIC_LOGIN_ENCRYPTION_KEY_SECRET}`;
    const buffer = Buffer.from(key, 'utf-8');
    const encodedKey = buffer.toString('base64');

    return {
        headers: {
            Authorization: `Basic ${encodedKey}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
            grant_type: 'password',
            customerId: data.customerId,
            functionality: data.functionality,
            user_account: data.userAccount,
            ...(data.loginType === 1 ? {msToken: data.password} : {password: data.password})
        }
    };
}

export function toLogoutProps(auth: string): LogoutProps {
    return {
        headers: {
            Authorization: `Bearer ${auth}`
        }
    };
}
