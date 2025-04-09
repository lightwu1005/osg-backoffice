import useCommonRepository from "@/services/@common/repository/useCommonRepository";
import {
    FilterItemProps,
    FilterViewModel,
    OptionItem,
    QueryParams
} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {LocationModel} from "@/services/@core/module/ResponseDataModels";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {toLocationsProps} from "@/app/dashboard/models/RequestDataMapping";
import {dividePage, includesIgnoreCase} from "@/utils/tools";

export class LocationFilterViewModel extends FilterViewModel<LocationModel>{
    commonRepo = useCommonRepository()
    override toOptionItem = (content: LocationModel[]): OptionItem[] => {
        return content.map(item => {
            return {
                id: item.locationId,
                name: item.locationName
            }
        })
    }

    override call = async (queryParams: QueryParams) => {
        if(queryParams.option?.['sportId']) {
            const sportId = queryParams.option['sportId']
            return this.commonRepo.getLocations(toLocationsProps(sportId)).then(res => {
                const {page, pageSize,search} = queryParams
                const filtered = search ? res.filter(model => includesIgnoreCase(model.locationName, search)) : res
                const content = dividePage(page, pageSize, filtered)
                return {
                    totalElements: filtered.length,
                    content: content
                }
            })
        } else {
            return {
                totalElements: 0,
                content: []
            }
        }
    }

    static getFilterItemProps(): FilterItemProps {
        return {
            labelLangKey: 'location',
            label: 'Location',
            icon: LocationOnIcon
        }
    }
}