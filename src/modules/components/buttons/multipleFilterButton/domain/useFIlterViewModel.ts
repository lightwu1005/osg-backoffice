import {useEffect, useState} from "react";
import {
    FilterViewModel,
    FilterItemProps,
    OptionItem,
    QueryParams, SelectedOptions
} from "@/modules/components/buttons/multipleFilterButton/models/Interface"
import {GlobalController} from "@/modules/common/GlobalController";
import * as React from "react";

function useFilterViewModel<VM extends FilterViewModel<any>>(ViewModel: { new(): VM; getFilterItemProps(): FilterItemProps }, selected?: OptionItem[], onChange?: React.Dispatch<React.SetStateAction<SelectedOptions<OptionItem[]>>>, option?: any) {
    const [viewModel] = useState(new ViewModel())
    const globalController = GlobalController.getInstance()
    const [queryParams, setQueryParams] = useState<QueryParams>(option ? {
        ...viewModel.defaultParams,
        option: option
    } : viewModel.defaultParams)
    const [totalElements, setTotalElements] = useState<number>(0)
    const [optionItems, setOptionItems] = useState<OptionItem[]>([])
    const [selectedItems, setSelectedItems] = useState<OptionItem[]>(selected ?? [])
    const [init, setInit] = useState(true)
    const {label} = ViewModel.getFilterItemProps()


    const onSearch = (s?: string) => {
        setQueryParams((prevState) => {
            return {
                ...prevState,
                page: 1,
                search: s
            }
        })
    }
    const loadPage = (page: number) => {
        setQueryParams((prevState) => {
            return {
                ...prevState,
                page: page
            }
        })
    }

    const call = () => {
        const {page} = queryParams
        viewModel.call(queryParams)
            .then(t => {
                setTotalElements(t.totalElements)
                if (page === 1) {
                    setOptionItems(prevState => viewModel.toOptionItem(t.content))
                } else {
                    setOptionItems(prevState => {
                        const newOptionItems = viewModel.toOptionItem(t.content)
                        return [...prevState, ...newOptionItems]
                    })
                }
            })
            .catch((result) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: result
                });
            })
    }

    useEffect(() => {
        call()
    }, [queryParams]);

    useEffect(() => {
        if (init) {
            setInit(false)
            return
        }
        if (onChange) {
            onChange(prevState => {
                return {
                    ...prevState,
                    [label]: [...selectedItems],
                }
            })
        }
    }, [selectedItems]);
    return {
        queryParams,
        totalElements,
        optionItems,
        selectedItems,
        setSelectedItems,
        onSearch,
        loadPage,
    };
}

export default useFilterViewModel