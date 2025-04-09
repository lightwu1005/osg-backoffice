import {
    FilterItemProps,
    FilterViewModel,
    OptionItem,
    QueryParams
} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import DevicesRounded from '@mui/icons-material/DevicesRounded';
import {firstCharToUpperCase} from "@/modules/common/DisplayFormatConverter"
import {Device} from "@/services/@core/module/Enum";
import {dividePage, includesIgnoreCase} from "@/utils/tools";

export class DeviceFilterViewModel extends FilterViewModel<string>{
    devices = Object.keys(Device)
    override toOptionItem = (content: string[]): OptionItem[] => {
        return content.map((item, index) => {
            return {
                id: index.toString(),
                name: item === 'IOS' ? 'iOS' : firstCharToUpperCase(item)
            }
        })
    }

    override call = async (queryParams: QueryParams) => {
        const {page, pageSize,search} = queryParams
        const filtered = search ? this.devices.filter(device => includesIgnoreCase(device, search)) : this.devices
        const content = dividePage(page, pageSize, filtered)

        return {
            totalElements: filtered.length,
            content: content
        }
    }

    static getFilterItemProps(): FilterItemProps {
        return {
            labelLangKey: 'device',
            label: 'Device',
            icon: DevicesRounded
        }
    }
}