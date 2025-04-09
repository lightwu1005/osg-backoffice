import {ResetPasswordProps, ResetPasswordWithOldProps} from "@/services/@core/module/RequestDataModels"
import {Functionality} from "@/services/@core/module/Enum";

export function toResetPasswordProps(newPwd: string, auth: string, c?: string): ResetPasswordProps {
    return {
        headers: {
            "X-Functionality":  process.env.FUNCTIONALITY ?? '',
        },
        body: {
            token: auth,
            newPwd: newPwd,
            ...((c && c !== 'undefined' && process.env.FUNCTIONALITY !== Functionality.Admin) ? {c: c} : undefined)
        }
    };
}

export function toResetPasswordWithOldProps(oldPwd: string, newPwd: string): ResetPasswordWithOldProps {
    return {
        body: {
            oldPwd: oldPwd,
            newPwd: newPwd
        }
    };
}