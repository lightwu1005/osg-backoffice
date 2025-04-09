import {
    FilterItemProps,
    FilterViewModel,
    OptionItem,
    QueryParams
} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {dividePage, includesIgnoreCase} from "@/utils/tools";
import {CategoryRounded} from "@mui/icons-material";
import useCommonRepository from "@/services/@common/repository/useCommonRepository";
import {toProvidersProps} from "@/app/dashboard/models/RequestDataMapping";

export class ProviderFilterViewModel extends FilterViewModel<string>{
    commonRepo = useCommonRepository()

    override toOptionItem = (content: string[]): OptionItem[] => {
        return content.map((item, index) => {
            return {
                id: index.toString(),
                name: item
            }
        })
    }

    override call = async (queryParams: QueryParams) => {
        return this.commonRepo.getProviders(toProvidersProps(queryParams.option?.['sportId'])).then(res => {
            const {page, pageSize, search} = queryParams
            const filtered = search ? res.filter(model => includesIgnoreCase(model, search)) : res
            const content = dividePage(page, pageSize, filtered)
            return {
                totalElements: filtered.length,
                content: content
            }
        })
    }

    static getFilterItemProps(): FilterItemProps {
        return {
            labelLangKey: 'oddsFeed',
            label: 'Odds Feed',
            icon: CategoryRounded
        }
    }
}