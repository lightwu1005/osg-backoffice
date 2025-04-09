import {Box, Menu} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {LazyMenuItem, LazyMenuItemType} from "@/modules/components/MenuItem/LazyMenuItem";
import {
    QueryableSelectTextFieldProps,
    QueryableSelectViewModel,
    QueryableSelectVMProps
} from "@/modules/components/TextField";
import {CustomChip} from "@/modules/components/chip/CustomChip";
import {useQueryableSelect} from "@/modules/components/chip/ChipDropdown/domain/useQueryableSelect";
import {ChipColor} from "@/modules/components/chip/MuiChipsStyled";
import {OptionItem} from "@/modules/components/TextField/QueryableSelectTextField/QueryableSelectTextField";
import {RiskGroupDataModel} from "@/services/@core/module/ResponseDataModels";

export const DropdownChip = <VM extends QueryableSelectViewModel<any>>(fieldProps: QueryableSelectTextFieldProps<RiskGroupDataModel> & QueryableSelectVMProps<VM>) => {
    const {
        componentId,
        setIsListboxOpen,
        isListboxOpen,
        handleOptionChange,
        selectedItems,
        displayItems,
    } = useQueryableSelect(fieldProps);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleChipClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget);
        setIsMenuOpen(!isListboxOpen);
    };

    const handleClose = () => {
        setIsMenuOpen(false);
        setAnchorEl(null);
    };

    const handleOptionClick = (event: React.MouseEvent<HTMLElement>, option: OptionItem<any>) => {
        event.stopPropagation()
        handleOptionChange(event, option.name);
        setIsMenuOpen(false);
        setAnchorEl(null);
    };

    const currentColor = selectedItems[0]?.data?.riskColor ?? fieldProps.currentValues?.[0]?.data?.riskColor ?? ChipColor.default;
    const currentLabel = selectedItems[0]?.name ?? fieldProps.currentValues?.[0]?.data?.riskName ?? '';
    const key = `${componentId}-${selectedItems[0]?.id}`;
    return (
        <>
            <Box my={2} onClick={(e) => e.stopPropagation()}>
                {(selectedItems.length > 0 || fieldProps.currentValues) && (
                    <CustomChip
                        key={key}
                        color={currentColor}
                        label={currentLabel}
                        shouldShowArrow={true}
                        isArrowUpExternal={isListboxOpen}
                        onClick={handleChipClick}
                    />
                )}
            </Box>
            <Menu
                key={key}
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleClose}
                TransitionProps={{
                    onEntered: () => setIsListboxOpen(true),
                    onExit: () => setIsListboxOpen(false),
                }}
                slotProps={{
                    paper: {
                        style: {
                            maxHeight: '300px',
                            overflow: 'auto',
                        },
                    }
                }}
            >
                {displayItems.map((option, index) => {
                    const isSelected = selectedItems.some(item => item.id === option.id || item.name?.toLowerCase().includes(option.name?.toLowerCase()));
                    const id = `${componentId}-option-${index}`
                    return (
                        <LazyMenuItem
                            key={id}
                            id={id}
                            itemType={LazyMenuItemType.Normal}
                            option={option}
                            selected={isSelected}
                            onChange={handleOptionClick}
                        />
                    );
                })}
            </Menu>
        </>
    );
}
