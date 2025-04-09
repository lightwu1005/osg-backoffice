import {
    QueryableSelectTextField,
    QueryableSelectTextFieldProps,
    QueryableSelectViewModel,
    QueryableSelectVMProps
} from "@/modules/components/TextField/index";
import {Box} from "@mui/material";
import HeaderContainer from "@/modules/components/general/HeaderContainer";
import React from "react";

export const InfoQueryableSelectTextField = <VM extends QueryableSelectViewModel<any>>({id, header, tip, menu, disabled}: {
    id?: string
    header: string,
    tip?: string,
    menu: QueryableSelectTextFieldProps<any> & QueryableSelectVMProps<VM>,
    disabled?: boolean,
}) => {

    return (
        <Box sx={{flexGrow: 1, minWidth: 0}}>
            <HeaderContainer header={header} tip={tip}>
                <QueryableSelectTextField
                    id={id}
                    disabled={disabled}
                    {...menu}
                />
            </HeaderContainer>
        </Box>
    )
}
