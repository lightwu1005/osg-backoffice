import {useCallback, useEffect, useRef, useState} from "react";
import lodash from "lodash";
import useQueryableSelectTextField
    from "@/modules/components/TextField/QueryableSelectTextField/useQueryableSelectTextField";
import {
    QueryableSelectTextFieldProps,
    QueryableSelectViewModel,
    QueryableSelectVMProps
} from "@/modules/components/TextField";
import {OptionItem} from "@/modules/components/TextField/QueryableSelectTextField/QueryableSelectTextField";

export const useQueryableSelect = <VM extends QueryableSelectViewModel<any>, T>(
    fieldProps: QueryableSelectTextFieldProps<T> & QueryableSelectVMProps<VM>
) => {
    const {queryParams, totalElements, optionItems, loadPage, onSearch} = useQueryableSelectTextField(
        fieldProps.ViewModel,
        fieldProps.option
    );

    const queryParamsRef = useRef(queryParams);
    const totalElementsRef = useRef(totalElements);
    const optionItemsRef = useRef(optionItems);
    const componentId = `input-textField-${(fieldProps.id ??fieldProps.label ?? fieldProps.placeholder)?.replace(/[^a-zA-Z0-9]/g, "-") ?? ""}`;
    const [isListboxOpen, setIsListboxOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<OptionItem<T>[]>(fieldProps.initialSelectedItems ?? []);
    const [displayItems, setDisplayItems] = useState<OptionItem<T>[]>([]);

    useEffect(() => {
        setSelectedItems(fieldProps.currentValues ?? []);
    }, [fieldProps.currentValues]);

    const handleOptionChange = useCallback(
        (event: React.SyntheticEvent<Element, Event>, value: string | string[] | null) => {
            if (fieldProps.onChange) {
                const items = value ? (Array.isArray(value) ? value : [value]) : [];
                const filteredItems = !fieldProps.multiple && items.length > 1 ? [items[0]] : items;
                const selectedOptions = optionItemsRef.current.filter(option =>
                    filteredItems.some(item => item === option.name)
                );
                if (!lodash.isEqual(selectedItems, selectedOptions)) {
                    setSelectedItems(selectedOptions);
                    fieldProps.onChange(selectedOptions);
                }
            }
        },
        [fieldProps.onChange, selectedItems]
    );

    useEffect(() => {
        totalElementsRef.current = totalElements;
        setDisplayItems((prevState) => {
            const tempItems = lodash.unionBy(fieldProps.extraItems, optionItems, "id");
            if (lodash.isEqual(prevState, tempItems)) return prevState;
            return tempItems;
        });
        queryParamsRef.current = queryParams;
    }, [totalElements, optionItems, queryParams, fieldProps.extraItems]);

    useEffect(() => {
        optionItemsRef.current = displayItems;
    }, [displayItems]);

    useEffect(() => {
        if (!isListboxOpen || !displayItems.length) return
        const totalElement = totalElementsRef.current
        const options = optionItemsRef.current
        if (options.length === totalElement)
            return
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const page = queryParamsRef.current.page;
                        const pageSize = queryParamsRef.current.pageSize;
                        const totalItemLoaded = page * pageSize;
                        if (totalItemLoaded < totalElement && options.length === totalItemLoaded) loadPage(page + 1);
                    }
                });
            }
        );

        const lastItem = document.querySelector(`#${componentId}-option-${displayItems.length - 1}`)
        if (lastItem) observer.observe(lastItem);

        return () => {
            if (lastItem) observer.unobserve(lastItem)
        }
    }, [isListboxOpen, displayItems]);

    return {
        componentId,
        isListboxOpen,
        setIsListboxOpen,
        handleOptionChange,
        selectedItems,
        displayItems,
        onSearch
    };
};
