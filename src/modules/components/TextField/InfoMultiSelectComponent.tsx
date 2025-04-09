import {
    AutoMultiMenuTextField,
    AutoMultiMenuTextFieldProps,
    MultiMenuTextFieldType
} from "@/modules/components/TextField/index";
import {Box} from "@mui/material";
import HeaderContainer from "@/modules/components/general/HeaderContainer";
import React from "react";

export const InfoMultiSelectComponent = ({disabled, header, tip, showSelectAll, menu}: {disabled?: boolean, header: string, tip?: string, showSelectAll?: boolean, menu: AutoMultiMenuTextFieldProps}) => {

    return (
        <Box sx={{flexGrow: 1, minWidth: 0}}>
            <HeaderContainer header={header} tip={tip}>
                <AutoMultiMenuTextField
                    id={menu.label}
                    label={menu.label}
                    placeholder={menu.placeholder}
                    displayType={menu.displayType ?? MultiMenuTextFieldType.renderTag}
                    options={menu.options}
                    isEmptyEqualSelectAll={false}
                    fixedSelectedOptions={menu.fixedSelectedOptions}
                    initialSelectedOptions={menu.initialSelectedOptions}
                    onChange={menu.onChange}
                    limitTags={menu.limitTags}
                    disabled={disabled}
                    endAdornment={menu.endAdornment}
                    showSelectAll={showSelectAll}
                />
            </HeaderContainer>
        </Box>
    )
}
