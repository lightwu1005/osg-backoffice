import {
    FilterItemProps,
    FilterViewModel,
    OptionItem,
    QueryParams
} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {ListResponseModel} from "@/services/@core/module/ResponseDataModels";
import {BetSettle} from "@/services/@core/module/BetSettle";
import ListAltRounded from "@mui/icons-material/ListAltRounded";
import {dividePage, includesIgnoreCase} from "@/utils/tools";

export class BetSlipStatusFilterViewModel extends FilterViewModel<string> {
    betSettle = Object.entries(BetSettle).map(([_, value]) => value);

    override toOptionItem = (content: string[]): OptionItem[] => {
        return content.map((item, index) => {
            return {
                id: index.toString(),
                name: item
            }
        })
    }

    override call = async (queryParams: QueryParams): Promise<ListResponseModel<string>> => {
        const {page, pageSize, search} = queryParams
        const filtered = search ? this.betSettle.filter(type => includesIgnoreCase(type, search)) : this.betSettle
        const content = dividePage(page, pageSize, filtered)
        return Promise.resolve({
            totalElements: filtered.length,
            content: content
        });
    }

    static getFilterItemProps(): FilterItemProps {
        return {
            labelLangKey: 'betSlipStatus',
            label: 'Bet Slip Status',
            icon: ListAltRounded
        }
    }
}