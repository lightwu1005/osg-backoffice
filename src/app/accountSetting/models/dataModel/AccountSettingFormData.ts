export interface AccountSettingFormData {
    uuid: string
    status: string
    userName?: string
    jobTitle?: string
    phoneNumber?: string
}

export interface AccountInfoProps {
    [key: string]: string;
    userName: string,
    email: string,
    jobTitle: string,
    phoneNumber: string
}

export interface AccountPasswordFormData {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}