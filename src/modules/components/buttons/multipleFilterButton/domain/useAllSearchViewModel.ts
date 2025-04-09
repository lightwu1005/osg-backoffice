import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {
    FilterSectionProps,
    FilterViewModel,
    FilterVMProps,
    OptionItem,
    QueryParams,
} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {GlobalController} from "@/modules/common/GlobalController";
import {AllSearchBlockProps, SearchLabel} from "@/modules/components/buttons/multipleFilterButton/components/AllSearch";

interface VMLabel {
    [label: string]: FilterViewModel<any>
}

interface SearchLabels {
    [label: string]: SearchLabel
}

interface OtherProps {
    [label: string]: any
}

const useAllSearchViewModel = ({search, children, onChange, onClose}: AllSearchBlockProps) => {
    const globalController = GlobalController.getInstance()
    const [searchLabels, setSearchLabels] = useState<SearchLabels>({})
    const [labelIndexes, setLabelIndexes] = useState<string[]>([])
    const [VMs] = useState<VMLabel>(React.Children.map(children, (child) => {
        if (React.isValidElement<FilterVMProps<any>>(child) && child.props.ViewModel) {
            const {label} = child.props.ViewModel.getFilterItemProps()
            return {[label]: new child.props.ViewModel()}
        }
    }).reduce((acc, curr) => {
        const [key, value] = Object.entries(curr)[0];
        return {...acc, [key]: value};
    }, {}))
    const [otherProps] = useState<OtherProps>(React.Children.map(children, (child) => {
        if (React.isValidElement<FilterVMProps<any>>(child) && React.isValidElement<FilterSectionProps<any>>(child) && child.props.option) {
            const {label} = child.props.ViewModel.getFilterItemProps()
            return {[label]: child.props.option}
        }
    }).reduce((acc, curr) => {
        const [key, value] = Object.entries(curr)[0];
        return {...acc, [key]: value};
    }, {}))

    const call = useCallback((queryParams: QueryParams, label: string, viewModel: FilterViewModel<any>) => {
        viewModel.call({
            ...queryParams,
            ...(otherProps[label] ? {option: otherProps[label]} : undefined)
        })
            .then(t => {
                if (t.content.length === 0) {
                    setSearchLabels(prevState => {
                        const {[label]: _, ...otherLabels} = prevState
                        return otherLabels
                    })
                    return
                }
                const searchLabel: SearchLabel = {
                    label: label,
                    totalElement: t.totalElements,
                    options: viewModel.toOptionItem(t.content)
                }
                setSearchLabels(prevState => {
                    const newState: SearchLabels = {
                        ...prevState,
                        ...{
                            [label]: (queryParams.page === 1 ? searchLabel : {
                                label: label,
                                totalElement: searchLabel.totalElement,
                                options: [...prevState[label].options, ...searchLabel.options]
                            })
                        }
                    }
                    return newState
                })
            })
            .catch((result) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: result
                });
            })
    }, [])

    const loadNextPage = useCallback((label: string) => {
        const vm = VMs[label]
        const {pageSize} = vm.defaultParams
        const currentPage = searchLabels[label].options.length / pageSize
        call({
            page: currentPage + 1,
            pageSize: pageSize,
            search: search
        }, label, vm)
    }, [VMs, call, search, searchLabels])

    useEffect(() => {
        if (search.length > 0) {
            Object.entries(VMs).forEach(([label, vm]) => {
                call({
                    ...vm.defaultParams,
                    search: search
                }, label, vm)
            })
        }
    }, [search]);

    useEffect(() => {
        setLabelIndexes(Object.keys(VMs))
    }, [VMs]);

    const handleClick = (label: string, option: OptionItem) => {
        const {id, name} = option
        onChange(prevState => {
            const currentOptions = prevState[label] as OptionItem[];
            const isSelected = currentOptions.some(item => item.id === id);

            if (isSelected) {
                return {
                    ...prevState,
                    [label]: currentOptions?.filter(item => item.id !== id),
                };
            } else {
                return {
                    ...prevState,
                    [label]: [...currentOptions, {name, id}],
                };
            }
        });
        onClose()
    }

    return {handleClick, loadNextPage, labelIndexes, searchLabels}
}

export default useAllSearchViewModel