import {Box} from "@mui/material";
import HeaderContainer from "@/modules/components/general/HeaderContainer";
import React from "react";
import PasswordField, {PasswordFieldProps} from "@/modules/components/TextField/PasswordField";

export const InfoPasswordComponent = ({header, tip, props, disabled}: {header: string, tip?: string, props: PasswordFieldProps, disabled?: boolean}) => {
    return (
        <Box sx={{flexGrow: 1, minWidth: 0}}>
            <HeaderContainer header={header} tip={tip}>
                <PasswordField
                    {...props}
                />
            </HeaderContainer>
        </Box>
    )
}
