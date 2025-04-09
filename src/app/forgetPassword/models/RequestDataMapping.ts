import {GenerateTokenViaEmailProps} from "@/services/@core/module/RequestDataModels"

export function toGenerateTokenViaEmailProps(email: string): GenerateTokenViaEmailProps {
    return {
        headers: {
            "X-Functionality":  process.env.FUNCTIONALITY ?? '',
        },
        endPoint: {
            email: email
        }
    };
}