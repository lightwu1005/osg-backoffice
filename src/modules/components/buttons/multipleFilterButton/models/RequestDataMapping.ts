import {GetMarketsProps} from "@/services/@core/module/RequestDataModels"
import {QueryParams} from "@/modules/components/buttons/multipleFilterButton/models/Interface";

export const toGetMarketsProps = (queryParams: QueryParams): GetMarketsProps => {

    return {
        query: {
            ...queryParams
        }
    }
}