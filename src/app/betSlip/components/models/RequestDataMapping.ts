import {
    BetSlipAcceptanceParameter,
    BetSlipExportParameter, BetSlipVoidBetLegsParameter,
    GetBetSlipsParameter
} from "@/app/betSlip/components/models/BetSlipParameters";
import {
    BetSlipAcceptanceProps,
    BetSlipExportProps, BetSlipVoidBetLegsProps,
    GetBetSlipsProps
} from "@/services/@core/module/RequestDataModels";

export function toGetBetSlipListProps(parameter: GetBetSlipsParameter): GetBetSlipsProps {
    const body = Object.entries(parameter)
        .filter(([_, value]) => value !== undefined && value !== "" && !(Array.isArray(value) && value.length === 0))
        .reduce((acc, [key, value]) => {
            acc[key as keyof GetBetSlipsParameter] = value;
            return acc;
        }, {} as Partial<GetBetSlipsParameter>);

    return {
        body: body as GetBetSlipsProps["body"]
    };
}

export function toBetSlipAcceptanceProps(parameter: BetSlipAcceptanceParameter): BetSlipAcceptanceProps {
    return {
        body: parameter
    }
}

export function toBetSlipVoidBetLegsProps(parameter: BetSlipVoidBetLegsParameter): BetSlipVoidBetLegsProps {
    return {
        body: parameter
    }
}

export function toBetSlipExportProps(parameter: BetSlipExportParameter): BetSlipExportProps {
    return {
        body: parameter
    }
}
