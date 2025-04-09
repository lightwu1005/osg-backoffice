import * as React from "react";
import {ReactElement} from "react";
import {SvgIconComponent} from "@mui/icons-material";
import {ListResponseModel} from "@/services/@core/module/ResponseDataModels";

export interface MultipleFilterButtonProps {
    selected: SelectedOptions<any>
    setSelected: React.Dispatch<React.SetStateAction<SelectedOptions<any>>>
    children: ReactElement<FilterVM> | ReactElement<FilterVM>[]
    onClean?: () => void
    canClean?: boolean
}

export interface OptionItem {
    name: string
    id: string
}

export interface SelectedOptions<T> {
    [key: string]: T
}

export interface MultipleBlockProp {
    labelLangKey: string
    label: string
    queryParams: QueryParams
    onSearch: (s?: string) => void
    options: OptionItem[]
    totalElement: number
    loadNextPage?: (page: number) => void
    selected: OptionItem[]
    setSelected: React.Dispatch<React.SetStateAction<OptionItem[]>>
    clearLabel?: () => void
    isSingleSelect?: boolean
}

const DefaultPageSize = 20
export interface QueryParams {
    page: number,
    pageSize: number,
    search?: string
    option?: Record<string, any>
}

export type FilterVM = React.ComponentType<FilterVMProps<any> | FilterCustomVMProps>;
export type FilterSectionElement = React.ReactElement<FilterSectionProps<any>>;
export interface FilterItemProps {
    readonly labelLangKey: string,
    readonly label: string,
    readonly icon: SvgIconComponent
}

export interface FilterVMProps<VM extends FilterViewModel<any>> {
    ViewModel: { new(): VM; getFilterItemProps(): FilterItemProps };
}

export interface FilterCustomVMProps {
    ItemProps: { getFilterItemProps(): FilterItemProps };
}

export interface FilterSectionProps<T> {
    onChange?: React.Dispatch<React.SetStateAction<SelectedOptions<T>>>
    clearLabel?: () => void
    selected?: T
    option?: Record<string, any>
    isSingleSelect?: boolean
}

export interface IFilterViewModel<T>{
    defaultParams: QueryParams,
    toOptionItem: (content: T[]) => OptionItem[]
    call: (queryParams: QueryParams) => Promise<ListResponseModel<T>>
}

export abstract class FilterViewModel<T> implements IFilterViewModel<T> {
    defaultParams: QueryParams = {page: 1, pageSize: DefaultPageSize};
    abstract toOptionItem: (content: T[]) => OptionItem[]
    abstract call: (queryParams: QueryParams) => Promise<ListResponseModel<T>>
}
