import {useEffect, useState} from "react";
import {OptionItem} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {
    QueryableSelectViewModel,
    QueryParams
} from "@/modules/components/TextField/QueryableSelectTextField/QueryableSelectTextField";

const useQueryableSelectTextField = <VM extends QueryableSelectViewModel<any>>(ViewModel: new () => VM, option?: any) => {
    const viewModel = new ViewModel();
    const [queryParams, setQueryParams] = useState<QueryParams>(option ? {
        ...viewModel.defaultParams,
        option: option
    } : viewModel.defaultParams)
    const [totalElements, setTotalElements] = useState<number>(0);
    const [optionItems, setOptionItems] = useState<OptionItem[]>([]);

    const loadPage = (page: number) => {
        setQueryParams((prevState) => {
            return {
                ...prevState,
                page: page
            }
        })
    }

    const callAPI = () => {
        viewModel.call(queryParams)
            .then(response => {
                setTotalElements(response?.totalElements ?? 0)
                setOptionItems(prevState => {
                    const newOptionItems = viewModel.toOptionItem(response?.content ?? [])
                    return [...prevState, ...newOptionItems]
                })
            })
    }

    const onSearch = (s?: string) => {
        setQueryParams((prevState) => {
            return {
                ...prevState,
                page: 1,
                search: s
            }
        })
    }

    useEffect(() => {
        callAPI()
    }, [queryParams]);

    return {
        queryParams,
        totalElements,
        optionItems,
        loadPage,
        onSearch
    }
}

export default useQueryableSelectTextField;