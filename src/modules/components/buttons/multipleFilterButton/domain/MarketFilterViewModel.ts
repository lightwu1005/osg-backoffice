import useCommonRepository from "@/services/@common/repository/useCommonRepository";
import {toGetMarketsProps} from "@/modules/components/buttons/multipleFilterButton/models/RequestDataMapping";
import {
    FilterItemProps,
    FilterViewModel,
    OptionItem,
    QueryParams
} from "@/modules/components/buttons/multipleFilterButton/models/Interface"
import {ListResponseModel, MarketModel} from "@/services/@core/module/ResponseDataModels";
import ContrastIcon from "@mui/icons-material/Contrast";

export class MarketFilterViewModel extends FilterViewModel<MarketModel>{
    commonRepo = useCommonRepository()
    override toOptionItem = (content: MarketModel[]): OptionItem[] => {
        return content.map(item => {
            return {
                id: item.marketId,
                name: item.marketName
            }
        })
    }

    override call = async (queryParams: QueryParams) => {
        return this.commonRepo.getMarkets(toGetMarketsProps(queryParams))
    }

    static getFilterItemProps(): FilterItemProps {
        return {
            labelLangKey: 'market',
            label: 'Market',
            icon: ContrastIcon
        }
    }

}
