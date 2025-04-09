import {Search} from "@mui/icons-material";
import * as React from "react";
import {CommonTextField, CommonTextFieldProps} from "@/modules/components/TextField/CommonTextField";

export function SearchTextField(props: CommonTextFieldProps){
    return(
        <CommonTextField
            {...props}
            endAdornment={<Search/>}
        />
    )
}