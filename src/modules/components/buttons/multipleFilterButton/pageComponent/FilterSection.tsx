import {MultipleBlock} from "@/modules/components/buttons/multipleFilterButton/components/Multiple";
import {
    FilterSectionProps,
    FilterViewModel,
    FilterVMProps,
    OptionItem
} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import useFilterViewModel from "@/modules/components/buttons/multipleFilterButton/domain/useFIlterViewModel";

export const FilterSection = <VM extends FilterViewModel<any>>({ViewModel, selected, onChange, clearLabel, option, isSingleSelect}: FilterSectionProps<OptionItem[]> & FilterVMProps<VM>) => {
    const options = Array.isArray(selected) ? selected : undefined
    const {
        queryParams,
        totalElements,
        optionItems,
        selectedItems,
        setSelectedItems,
        onSearch,
        loadPage,
    } = useFilterViewModel(ViewModel, options, onChange, option)
    const {labelLangKey, label} = ViewModel.getFilterItemProps()

    return <MultipleBlock
        selected={selectedItems}
        setSelected={setSelectedItems}
        clearLabel={clearLabel}
        labelLangKey={labelLangKey}
        label={label}
        onSearch={onSearch}
        queryParams={queryParams}
        loadNextPage={loadPage}
        totalElement={totalElements}
        options={optionItems}
        isSingleSelect={isSingleSelect}
    />
}