import {Autocomplete, Paper, TextField} from "@mui/material";
import {ListResponseModel} from "@/services/@core/module/ResponseDataModels";
import React, {HTMLProps, ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import {useQueryableSelect} from "@/modules/components/chip/ChipDropdown/domain/useQueryableSelect";
import {debounce} from "lodash";

/**
 * @param option - The queryParam to be passed to the ViewModel call method
 */
export interface QueryParams {
    page: number;
    pageSize: number;
    option?: Record<string, any>;
}

export interface QueryableSelectVMProps<VM extends QueryableSelectViewModel<any>> {
    ViewModel: new () => VM;
}

export interface OptionItem<T> {
    name: string;
    id: string;
    data?: T;
}

export abstract class QueryableSelectViewModel<T> implements GeneralQueryableSelectViewModel<T> {
    defaultParams: QueryParams = {page: 1, pageSize: 20};
    abstract toOptionItem: (content: T[]) => OptionItem<any>[];
    abstract call: (queryParams: QueryParams) => Promise<ListResponseModel<T>>;
}

export interface GeneralQueryableSelectViewModel<T> {
    defaultParams: QueryParams;
    toOptionItem: (content: T[]) => OptionItem<any>[];
    call: (queryParams: QueryParams) => Promise<ListResponseModel<T>>;
}

export enum DisplayType {
    Chip = 'chip',
    Count = 'select',
}

/**
 * @param option - The queryParam to be passed to the ViewModel call method,
 *                 referenced to QueryParams of MultipleFilterButton
 * @param bottomOptions - The options to be displayed at the bottom of the list
 * @param error - The error state of the input field
 */
export interface QueryableSelectTextFieldProps<T> {
    id?: string,
    label: string;
    placeholder?: string;
    multiple?: boolean;
    limitTags?: number;
    disableClearable?: boolean;
    initialSelectedItems?: OptionItem<T>[];
    currentValues?: OptionItem<T>[];
    extraItems?: OptionItem<T>[];
    onChange?: (options: OptionItem<T>[]) => void;
    option?: Record<string, any>;
    bottomOptions?: ReactNode[]
    error?: boolean;
    shouldClear?: boolean
    endAdornment?: ReactNode
    displayType?: DisplayType
    disabled?: boolean
}

interface CustomPaperComponentProps {
    children: React.ReactNode;
    bottomOptions: React.ReactNode[];
}

const CustomPaperComponent: React.FC<CustomPaperComponentProps> = ({children, bottomOptions}) => {
    return (
        <Paper>
            {children}
            {bottomOptions.map((element, index) => (
                <div key={`bottom-${Math.random() * 10}`}>
                    {element}
                </div>
            ))}
        </Paper>
    );
}

export const QueryableSelectTextField = <VM extends QueryableSelectViewModel<any>, T>(fieldProps: QueryableSelectTextFieldProps<any> & QueryableSelectVMProps<VM> & {
    displayType?: DisplayType
}) => {
    const {
        componentId,
        setIsListboxOpen,
        handleOptionChange,
        selectedItems,
        displayItems,
        onSearch,
    } = useQueryableSelect(fieldProps);

    const displayType = fieldProps.displayType ?? DisplayType.Chip;
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const memoizedPaperComponent = useMemo(() => {
        const MemoizedPaperComponent: React.FC<HTMLProps<HTMLDivElement>> = (props) => {
            return (
                <CustomPaperComponent bottomOptions={fieldProps.bottomOptions ?? []}>
                    {props.children}
                </CustomPaperComponent>
            );
        };

        MemoizedPaperComponent.displayName = 'MemoizedPaperComponent';
        return MemoizedPaperComponent;
    }, [fieldProps.bottomOptions]);

    const displaySelectedItems = useMemo(() =>
            displayItems.filter(item => selectedItems.some(selected => selected.id === item.id)),
        [selectedItems, displayItems]
    )


    const [searchTerm, setSearchTerm] = useState<string>('');
    const debouncedSearch = useCallback(
        debounce((s) => {
            onSearch(s);
        }, 500),
        []
    );

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        debouncedSearch(value);
    };

    useEffect(() => {
        if (fieldProps.shouldClear) {
            handleOptionChange({} as React.SyntheticEvent<Element, Event>, []);
        }
    }, [fieldProps.shouldClear, handleOptionChange]);

    useEffect(() => {
        let id = 0;
        if (isMenuOpen) {
            id = requestAnimationFrame(() => {
                setIsListboxOpen(true);
            });
        }

        return () => {
            if (!isMenuOpen && id) {
                cancelAnimationFrame(id);
            }
        }
    }, [isMenuOpen]);


    return (
        <Autocomplete
            id={componentId}
            data-testid={componentId}
            freeSolo
            multiple={fieldProps.multiple ?? false}
            onOpen={() => setIsMenuOpen(true)}
            onClose={() => setIsListboxOpen(false)}
            disableCloseOnSelect={fieldProps.multiple ?? false}
            disableClearable={fieldProps.disableClearable ?? false}
            ListboxProps={{style: {maxHeight: 200, overflow: 'auto'}}}
            PaperComponent={memoizedPaperComponent}
            getOptionLabel={(option) => {
                if (Array.isArray(option)) {
                    return option[0] ?? [];
                } else {
                    return option;
                }
            }}
            limitTags={fieldProps.limitTags ?? -1}
            renderInput={(params) => {
                let label;
                if (displayType === DisplayType.Chip) {
                    label = fieldProps.label;
                } else {
                    label = (selectedItems.length > 0 || selectedItems.length === displayItems.length)
                        ? `${fieldProps.label} (${selectedItems.length})`
                        : fieldProps.label;
                }
                return <TextField
                    {...params}
                    label={label}
                    placeholder={fieldProps.placeholder}
                    error={fieldProps.error}
                />
            }}
            renderOption={(props, option, {selected}) => {
                const {key, ...otherProps} = props as React.HTMLAttributes<HTMLLIElement> & { key: React.Key };

                if (fieldProps.multiple) {
                    return (
                        <li key={key} {...otherProps}>
                            <Checkbox checked={selected}/>
                            <div style={{paddingLeft: '0.5rem'}}>{option}</div>
                        </li>
                    );
                } else {
                    return (
                        <li key={key} {...otherProps}>
                            {option}
                        </li>
                    );
                }
            }}
            renderTags={(value, getTagProps) => {
                if (displayType === DisplayType.Chip && fieldProps.multiple) {
                    return value.map((option, index) => (
                        <Chip
                            sx={{margin: '1px'}}
                            key={`tag-${index}`}
                            variant="filled"
                            size="small"
                            label={option}
                            onDelete={getTagProps({index}).onDelete}
                        />
                    ));
                } else {
                    return null;
                }
            }}
            defaultValue={fieldProps.initialSelectedItems?.map((item) => item.name) ?? []}
            options={displayItems.map((option) => option.name)}
            disabled={fieldProps.disabled}
            value={displaySelectedItems.map((item) => item.name) ?? []}
            onChange={(event, newValue) => {
                handleOptionChange(event, newValue);
            }}
            inputValue={searchTerm}
            isOptionEqualToValue={(option, value) => option === value}
            onInputChange={(event, newInputValue) => {
                handleSearchChange(newInputValue);
            }}
            {...(fieldProps.endAdornment ? {popupIcon: fieldProps.endAdornment} : undefined)}
        />
    );
};