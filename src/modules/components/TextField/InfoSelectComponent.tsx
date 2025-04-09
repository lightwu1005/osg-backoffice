import {
    MenuTextFieldProps,
    AutoMenuTextField
} from "@/modules/components/TextField/index";
import {Box} from "@mui/material";
import HeaderContainer from "@/modules/components/general/HeaderContainer";
import {ExpandMore} from "@mui/icons-material";
import React from "react";

export const InfoSelectComponent = ({id, header, tip, menu, disabled, error, helperText}: {id?: string, header: string, tip?: string, menu: MenuTextFieldProps, disabled?: boolean, error?: boolean, helperText?: string}) => {
    return (
        <Box sx={{flexGrow: 1, minWidth: 0}}>
            <HeaderContainer header={header} tip={tip}>
                <AutoMenuTextField
                    id={id}
                    placeholder={menu.label} options={menu.options} endAdornment={<ExpandMore/>}
                    onChange={menu.onChange}
                    prefix={menu.prefix}
                    value={menu.value}
                    disabled={disabled}
                    error={error}
                    helperText={helperText}
                />
            </HeaderContainer>
        </Box>
    )
}
