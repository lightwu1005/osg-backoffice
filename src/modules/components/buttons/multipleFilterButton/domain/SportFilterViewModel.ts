import useCommonRepository from "@/services/@common/repository/useCommonRepository";
import {
    FilterItemProps,
    FilterViewModel,
    OptionItem,
    QueryParams
} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {SportsDataModel} from "@/services/@core/module/ResponseDataModels";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import {dividePage, includesIgnoreCase} from "@/utils/tools";

export class SportFilterViewModel extends FilterViewModel<SportsDataModel>{
    commonRepo = useCommonRepository()
    override toOptionItem = (content: SportsDataModel[]): OptionItem[] => {
        return content.map(item => {
            return {
                id: item.sportId,
                name: item.sportName
            }
        })
    }

    override call = async (queryParams: QueryParams) => {
        return this.commonRepo.getSportsCategories().then(res => {
            const {page, pageSize,search} = queryParams
            const filtered = search ? res.filter(model => includesIgnoreCase(model.sportName, search)) : res
            const content = dividePage(page, pageSize, filtered)
            return {
                totalElements: filtered.length,
                content: content
            }
        })
    }

    static getFilterItemProps(): FilterItemProps {
        return {
            labelLangKey: 'sport',
            label: 'Sport',
            icon: SportsSoccerIcon
        }
    }
}