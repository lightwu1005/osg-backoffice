import {
    FilterItemProps,
    FilterViewModel,
    OptionItem,
    QueryParams
} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {ListResponseModel} from "@/services/@core/module/ResponseDataModels";
import RecommendRounded from "@mui/icons-material/RecommendRounded";
import {dividePage, includesIgnoreCase} from "@/utils/tools";
import {FilteredBetStatus} from "@/services/@core/module/Enum";

export class BetStatusFilterViewModel extends FilterViewModel<string> {
    betStatus = Object.entries(FilteredBetStatus).map(([_, value]) => value);

    override toOptionItem = (content: string[]): OptionItem[] => {
        return content.map((item, index) => {
            return {
                id: index.toString(),
                name: item
            }
        })
    }

    override call = async (queryParams: QueryParams): Promise<ListResponseModel<string>> => {
        const {page, pageSize,search} = queryParams
        const filtered = search ? this.betStatus.filter(status => includesIgnoreCase(status, search)) : this.betStatus
        const content = dividePage(page, pageSize, filtered)

        return Promise.resolve({
            totalElements: filtered.length,
            content: content
        });
    }

    static getFilterItemProps(): FilterItemProps {
        return {
            labelLangKey: 'status',
            label: 'Status',
            icon: RecommendRounded
        }
    }
}