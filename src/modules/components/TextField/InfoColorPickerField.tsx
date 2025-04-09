import {Box} from "@mui/material";
import HeaderContainer from "@/modules/components/general/HeaderContainer";
import React from "react";
import ColorSelector, {ColorSelectorProps} from "@/modules/components/colorSelector/ColorSelector";

export const InfoColorPickerField = ({header, tip, props}: {
    header: string,
    tip?: string,
    props: ColorSelectorProps,
}) => {
    return (
        <Box sx={{flexGrow: 1, minWidth: 0}}>
            <HeaderContainer header={header} tip={tip}>
                <ColorSelector
                    {...props}
                />
            </HeaderContainer>
        </Box>
    )
}
