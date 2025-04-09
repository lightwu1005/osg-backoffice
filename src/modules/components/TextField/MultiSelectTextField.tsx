import * as React from "react";
import {useCallback, useEffect, useMemo, useState} from "react";
import {CheckBoxOutlineBlank, CheckBoxRounded, IndeterminateCheckBox} from "@mui/icons-material";
import {Autocomplete, Box, Divider, TextField} from "@mui/material";
import {MenuTextFieldProps} from "@/modules/components/TextField/MenuTextField";
import lodash, {debounce} from "lodash";
import FilterListIcon from "@mui/icons-material/FilterList";
import Chip from "@mui/material/Chip";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

export enum MultiMenuTextFieldType {
    normal,
    selectedCount,
    selectedCountWithLabel,
    renderTag,
    renderTagWithoutLabel
}

export interface AutoMultiMenuTextFieldProps extends Omit<MenuTextFieldProps, 'onChange'> {
    fixedSelectedOptions?: string[]
    initialSelectedOptions?: string[]
    isEmptyEqualSelectAll?: boolean
    showSelectAll?: boolean
    onChange?: (value: string[]) => void;
    displayType?: MultiMenuTextFieldType
    limitTags?: number
}

export function useStableValue<T>(value: T): T {
    const ref = React.useRef<T>(value)

    if (!lodash.isEqual(ref.current, value)) {
        ref.current = value
    }

    return ref.current
}

const determineOptions = (method: string, options: string[], selectAllOption: string): string[] => {
    const methodsMap: Record<string, () => any[]> = {
        includeSelectAll: () => [selectAllOption, ...options],
        excludeSelectAll: () => [...options],
        none: () => [],
    };

    return methodsMap[method]?.() || [];
}

/**
 *
 * @param isEmptyEqualSelectAll
 * @param multiMenuProps
 * @param openDebounce
 * @param id
 * @param showSelectAll
 * @constructor
 * @description Use to select multi-options
 */
export function AutoMultiMenuTextField({
                                           isEmptyEqualSelectAll = true,
                                           openDebounce = true,
                                           id,
                                           showSelectAll = true,
                                           ...multiMenuProps
                                       }: AutoMultiMenuTextFieldProps) {
    const intl = useIntl()
    const funType = LocalizationFunctionType.Common
    const [selectedValue, setSelectedValue] = useState<string[]>(multiMenuProps.fixedSelectedOptions ?? multiMenuProps.initialSelectedOptions ?? [])
    const [selectedAllOn, setSelectedAllOn] = useState(false)
    const selectAll = intl.formatMessage({id: `${funType}.selectAll`, defaultMessage: 'Select All'})
    const displayType: MultiMenuTextFieldType = multiMenuProps.displayType ?? MultiMenuTextFieldType.normal
    const {shouldClear, onChange, fixedSelectedOptions, options} = multiMenuProps

    const allOptions = useMemo(() => {
        let method = ''
        if (showSelectAll) method = 'includeSelectAll'
        if (multiMenuProps.options.length > 0 && !showSelectAll) method = 'excludeSelectAll'

        return determineOptions(method, multiMenuProps.options, selectAll)
    }, [showSelectAll, multiMenuProps.options, selectAll]);

    const [inputValue, setInputValue] = useState<string>('')

    useEffect(() => {
        if (shouldClear && selectedValue.length !== 0) {
            setSelectedValue([]);
            if (onChange) {
                onChange([]);
            }
        }
    }, [shouldClear, selectedValue.length, onChange]);

    useEffect(() => {
        if (lodash.isEmpty(multiMenuProps.initialSelectedOptions) && lodash.isEmpty(multiMenuProps.fixedSelectedOptions)) {
            setSelectedAllOn(false)
            setSelectedValue([])
        }
    }, [multiMenuProps.fixedSelectedOptions, multiMenuProps.initialSelectedOptions]);

    useEffect(() => {
        if (multiMenuProps.fixedSelectedOptions && multiMenuProps.fixedSelectedOptions?.length !== 0) {
            setSelectedValue(multiMenuProps.fixedSelectedOptions)
        }
    }, [multiMenuProps.fixedSelectedOptions]);

    useEffect(() => {
        if (multiMenuProps.initialSelectedOptions) {
            setSelectedValue(multiMenuProps.initialSelectedOptions ?? []);
            const isAllSelected = multiMenuProps.initialSelectedOptions.length === allOptions.length - 1;
            setSelectedAllOn(isAllSelected);
        }
    }, [multiMenuProps.initialSelectedOptions, allOptions.length]);

    const debouncedOnChange = useMemo(() => debounce((value) => {
        if (onChange) {
            onChange(value);
        }
    }, 500), [onChange]);

    const handleOptionChange = useCallback(
        (event: React.SyntheticEvent, newValue: string[] | null) => {
            event.preventDefault();
            event.stopPropagation();

            requestAnimationFrame(() => {
                let newSelectedValue: string[] = [];

                if (newValue?.includes(selectAll)) {
                    if (selectedAllOn) {
                        newSelectedValue = fixedSelectedOptions?.length === 0 ? [] : (fixedSelectedOptions ?? []);
                    } else {
                        newSelectedValue = allOptions;
                    }
                    setSelectedAllOn(!selectedAllOn);
                } else {
                    if (selectedAllOn && newValue?.length === 1) {
                        newSelectedValue = allOptions.filter((option) => option !== newValue[0]);
                    } else {
                        if (newValue?.length === 0 && fixedSelectedOptions?.length !== 0) {
                            newSelectedValue = fixedSelectedOptions ?? []
                        } else {
                            newSelectedValue = newValue ?? [];
                        }
                    }

                    const isAllSelected = newValue?.length === allOptions.length - 1;
                    setSelectedAllOn(isAllSelected);
                    if (isAllSelected) {
                        newSelectedValue = allOptions;
                    }
                }

                let resultValue = newSelectedValue
                    .filter(option => option !== selectAll)
                    .sort((a, b) => options.indexOf(a) - options.indexOf(b));

                if (resultValue.length === options.length) {
                    resultValue = isEmptyEqualSelectAll ? [] : resultValue;
                }

                setSelectedValue(resultValue);

                if (openDebounce) {
                    debouncedOnChange(resultValue)
                } else {
                    if (onChange) {
                        onChange(resultValue)
                    }
                }
            });
        },
        [options, selectAll, debouncedOnChange, onChange, openDebounce, allOptions, isEmptyEqualSelectAll, selectedAllOn, fixedSelectedOptions]
    );

    useEffect(() => {
        return () => debouncedOnChange.cancel()
    }, [debouncedOnChange])

    const memoizedSelectedValue = useMemo(() => selectedValue, [selectedValue]);

    const renderIcon = useCallback((option: string, selected: boolean) => {
        const isSelectedValue = selectedAllOn ? true : selected

        if (option === selectAll) {
            if (memoizedSelectedValue.length === 0) {
                return isSelectedValue ? <CheckBoxRounded color="primary"/> :
                    <CheckBoxOutlineBlank color={'disabled'}/>;
            } else {
                return isSelectedValue ? <CheckBoxRounded color="primary"/> : <IndeterminateCheckBox color="primary"/>;
            }
        } else {
            return isSelectedValue ? <CheckBoxRounded color="primary"/> : <CheckBoxOutlineBlank color={'disabled'}/>;
        }
    }, [selectedAllOn, memoizedSelectedValue, selectAll])


    const getDisplayText = (text: string, length: number, displayType: MultiMenuTextFieldType, allOptionsLength: number) => {
        const displayText = length === 0 ? text : `${text} (${length})`;

        switch (displayType) {
            case MultiMenuTextFieldType.normal:
            case MultiMenuTextFieldType.selectedCountWithLabel:
                return displayText;
            case MultiMenuTextFieldType.selectedCount:
                return length === 0 && isEmptyEqualSelectAll
                    ? `${text} (${allOptionsLength - 1})`
                    : displayText;
            case MultiMenuTextFieldType.renderTag:
                return text;
            case MultiMenuTextFieldType.renderTagWithoutLabel:
                return length === 0 ? text : '';
            default:
                return text;
        }
    };

    const label = (() => {
        const text = multiMenuProps.label
        if (!text) return ''
        return getDisplayText(text, selectedValue.length, displayType, allOptions.length);
    })();

    const placeHolder = (() => {
        const text = multiMenuProps.placeholder
        if (!text) return ''
        return getDisplayText(text, selectedValue.length, displayType, allOptions.length);
    })();

    const rawValue = useMemo(() => {
        const isAllSelected = selectedValue.length === allOptions.filter((option) => option !== selectAll).length;
        const displayAllText = displayType < MultiMenuTextFieldType.selectedCountWithLabel ? [] : selectedValue;

        return isAllSelected ? displayAllText : selectedValue;
    }, [displayType, selectedValue, allOptions, selectAll]);

    const value = useStableValue(rawValue)

    const componentId = `input-textField-${(id ?? multiMenuProps.label ?? multiMenuProps.placeholder)?.replace(/[^a-zA-Z0-9]/g, '-')}`;

    const OptionItemComponent = ({ props, option, selected }: {
        props: React.HTMLAttributes<HTMLLIElement>,
        option: string,
        selected: boolean
    }) => {
        return (
            <>
                <li {...props}>
                    {renderIcon(option, selected)}
                    <div style={{ paddingLeft: "0.5rem" }}>{option}</div>
                </li>
                {option === selectAll && <Divider sx={{ marginX: 1 }} />}
            </>
        );
    };

    const OptionItem = React.memo(OptionItemComponent, (prev, next) => {
        return (
            prev.option === next.option &&
            prev.selected === next.selected
        )
    })

    OptionItem.displayName = "OptionItem"

    return (
        <Autocomplete
            id={componentId}
            data-testid={componentId}
            clearOnBlur={false}
            multiple
            disableClearable
            disableCloseOnSelect
            disabled={multiMenuProps.disabled}
            options={allOptions}
            loading={multiMenuProps.isLoading ? multiMenuProps.isLoading : false}
            autoHighlight
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                // Only update the input value when the user types in the input field or when the input field loses focus
                if (event?.type === 'change' || event?.type === 'blur') {
                    setInputValue(newInputValue);
                }
            }}
            getOptionLabel={(option) => option}
            renderOption={(props: React.HTMLAttributes<HTMLLIElement>, option: string, {selected}: {selected: boolean}) => {
                return <OptionItem props={props} option={option} selected={selected} />
            }}
            isOptionEqualToValue={(option, value) => option === value}
            renderTags={(value, getTagProps) => {
                const renderChips = () => value.map((option, index) => (
                    <Chip
                        sx={{margin: '1px'}}
                        key={`tag-${index}`}
                        variant="filled"
                        size="small"
                        label={option}
                        disabled={multiMenuProps.disabled}
                        onDelete={getTagProps({index}).onDelete}
                    />
                ));
                if (displayType < MultiMenuTextFieldType.renderTag) {
                    if (displayType === MultiMenuTextFieldType.selectedCountWithLabel) {
                        return <Box sx={{marginX: 0.5}}>{label}</Box>
                    } else {
                        return null
                    }
                } else {
                    return renderChips()
                }
            }}
            limitTags={multiMenuProps.limitTags ?? -1}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder={placeHolder}
                    label={label}
                />
            )}
            onChange={handleOptionChange}
            value={value}
            popupIcon={multiMenuProps.endAdornment ?? <FilterListIcon/>}
        />
    );
}

export const MemoizedAutoMultiMenuTextField = React.memo(AutoMultiMenuTextField, (prevProps, nextProps) => {
    return (
        lodash.isEqual(prevProps.options, nextProps.options) &&
        lodash.isEqual(prevProps.value, nextProps.value) &&
        lodash.isEqual(prevProps.id, nextProps.id) &&
        prevProps.onChange === nextProps.onChange &&
        lodash.isEqual(prevProps.initialSelectedOptions, nextProps.initialSelectedOptions) &&
        lodash.isEqual(prevProps.fixedSelectedOptions, nextProps.fixedSelectedOptions)
    )
})
MemoizedAutoMultiMenuTextField.displayName = 'AutoMultiMenuTextField'