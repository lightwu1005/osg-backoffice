import {
    FilterItemProps,
    FilterViewModel,
    OptionItem,
    QueryParams
} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {firstCharToUpperCase} from "@/modules/common/DisplayFormatConverter"
import {BetSlipEventType} from "@/services/@core/module/Enum";
import {dividePage, includesIgnoreCase} from "@/utils/tools";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {InsertDriveFileRounded} from "@mui/icons-material";

export class BettingTypeFilterViewModel extends FilterViewModel<string>{
    shouldRemovedItems = [BetSlipEventType.all, BetSlipEventType.startingSoon, BetSlipEventType.settled]
    bettingTypes = Object.values(BetSlipEventType).filter(type => !this.shouldRemovedItems.includes(type));

    intl = useIntl()
    funType = LocalizationFunctionType.Common

    override toOptionItem = (content: string[]): OptionItem[] => {
        return content.map((item, index) => {
            return {
                id: this.bettingTypes[index],
                name: firstCharToUpperCase(item)
            }
        })
    }

    override call = async (queryParams: QueryParams) => {
        const {page, pageSize,search} = queryParams
        const filtered = search ? this.bettingTypes.filter(type => includesIgnoreCase(type, search)) : this.bettingTypes
        const content = dividePage(page, pageSize, filtered)

        return {
            totalElements: filtered.length,
            content: content
        }
    }

    static getFilterItemProps(): FilterItemProps {
        return {
            labelLangKey: 'bettingType',
            label: 'Betting Type',
            icon: InsertDriveFileRounded
        }
    }
}