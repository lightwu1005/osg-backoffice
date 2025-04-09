import {
    FilterItemProps,
    FilterViewModel,
    OptionItem,
    QueryParams
} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {ListResponseModel} from "@/services/@core/module/ResponseDataModels";
import LightbulbRounded from "@mui/icons-material/LightbulbRounded";
import {firstCharToUpperCase} from "@/modules/common/DisplayFormatConverter";
import {dividePage, includesIgnoreCase} from "@/utils/tools";

const filteredBetResult = [
    'UNSETTLED',
    'WIN',
    'LOSE',
    'DRAW',
    'VOID'
]

export class BetResultFilterViewModel extends FilterViewModel<string> {
    betResult = Object.entries(filteredBetResult).map(([_, value]) => value);

    override toOptionItem = (content: string[]): OptionItem[] => {
        return content.map((item, index) => {
            return {
                id: index.toString(),
                name: firstCharToUpperCase(item)
            }
        })
    }

    override call = async (queryParams: QueryParams): Promise<ListResponseModel<string>> => {
        const {page, pageSize, search} = queryParams
        const filtered = search ? this.betResult.filter(result => includesIgnoreCase(result, search)) : this.betResult
        const content = dividePage(page, pageSize, filtered)

        return Promise.resolve({
            totalElements: filtered.length,
            content: content
        });
    }

    static getFilterItemProps(): FilterItemProps {
        return {
            labelLangKey: 'result',
            label: 'Result',
            icon: LightbulbRounded
        }
    }
}