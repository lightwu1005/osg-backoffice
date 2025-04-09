import {AuditProps} from "@/services/@core/module/RequestDataModels";
import {SearchAuditParameters} from "@/app/audit/models/AuditParameters";

export function toAuditProps(query: SearchAuditParameters): AuditProps {
    const {search, actions, startDate,
        endDate, ...other} = query;

    return {
        query: {
            ...other,
            ...(search ? { search: search } : undefined),
            ...(actions && actions.length > 0 ? { actions: actions } : undefined),
            ...(startDate && !isNaN(startDate) ? { startDate: startDate } : undefined),
            ...(endDate && !isNaN(endDate) ? { endDate: endDate } : undefined)
        }
    };
}