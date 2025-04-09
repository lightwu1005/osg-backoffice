import useCommonRepository from "@/services/@common/repository/useCommonRepository";
import {
    FilterItemProps,
    FilterViewModel,
    OptionItem,
    QueryParams
} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {LeagueModel} from "@/services/@core/module/ResponseDataModels";
import EmojiEventsRounded from '@mui/icons-material/EmojiEventsRounded';
import {toLeaguesProps} from "@/app/dashboard/models/RequestDataMapping";

export class LeagueFilterViewModel extends FilterViewModel<LeagueModel>{
    commonRepo = useCommonRepository()

    override toOptionItem = (content: LeagueModel[]): OptionItem[] => {
        return content.map(item => {
            return {
                id: item.leagueId,
                name: item.leagueName
            }
        })
    }

    override call = async (queryParams: QueryParams) => {
        return this.commonRepo.getLeagues(toLeaguesProps({
            sportIds: queryParams.option?.sportIds?.length ? queryParams.option.sportIds : undefined,
            eventType: queryParams.option?.eventType,
            ...queryParams,
        }))
    }

    static getFilterItemProps(): FilterItemProps {
        return {
            labelLangKey: 'league',
            label: 'League',
            icon: EmojiEventsRounded
        }
    }
}