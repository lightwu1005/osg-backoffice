import {
    FilterItemProps,
    FilterViewModel,
    OptionItem,
    QueryParams
} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import {BetType} from "@/services/@core/module/Enum";
import {firstCharToUpperCase} from "@/modules/common/DisplayFormatConverter"
import {dividePage, includesIgnoreCase} from "@/utils/tools";

export class BetTypeFilterViewModel extends FilterViewModel<string> {
    betType = Object.keys(BetType)

    override toOptionItem = (content: string[]): OptionItem[] => {
        return content.map((item, index) => {
            return {
                id: index.toString(),
                name: firstCharToUpperCase(item)
            }
        })
    }

    override call = async (queryParams: QueryParams) => {
        const {page, pageSize, search} = queryParams
        const filtered = search ? this.betType.filter(type => includesIgnoreCase(type, search)) : this.betType
        const content = dividePage(page, pageSize, filtered)

        return {
            totalElements: filtered.length,
            content: content
        }
    }

    static getFilterItemProps(): FilterItemProps {
        return {
            labelLangKey: 'betType',
            label: 'BetSlip Type',
            icon: DensityMediumIcon
        }
    }
}