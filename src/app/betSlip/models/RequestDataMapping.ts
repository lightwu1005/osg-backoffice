import {BetSlipExportProps} from "@/services/@core/module/RequestDataModels";
import {BetSlipsExportParameters} from "@/app/betSlip/models/BetSlipsParameters";

export function toBetSlipExportProps(query: BetSlipsExportParameters): BetSlipExportProps {
    const {startDate, endDate} = query;

    return {
        body: {
            startDate: startDate!,
            endDate: endDate!
        }
    };
}