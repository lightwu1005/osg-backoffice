import {
    FilterItemProps,
    FilterViewModel,
    OptionItem,
    QueryParams
} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {ListResponseModel} from "@/services/@core/module/ResponseDataModels";
import {dividePage, includesIgnoreCase} from "@/utils/tools";
import {EventStatus} from "@/services/@core/module/EventStatus";
import { AutorenewRounded } from "@mui/icons-material";

export class EventStatusFilterViewModel extends FilterViewModel<string> {
    statuses = Object.values(EventStatus)

    override toOptionItem = (content: string[]): OptionItem[] => {
        return content.map((item, index) => {
            return {
                id: item,
                name: item
            }
        })
    }

    override call = async (queryParams: QueryParams): Promise<ListResponseModel<string>> => {
        const {page, pageSize, search} = queryParams
        const filtered = search ? this.statuses.filter(type => includesIgnoreCase(type, search)) : this.statuses
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
            icon: AutorenewRounded
        }
    }
}
