"use client"
import React from 'react'
import {Stack, Typography} from "@mui/material";
import {InfoOutlined} from "@mui/icons-material";
import {OverridableStringUnion} from "@mui/types";
import {Variant} from "@mui/material/styles/createTypography";
import {TypographyPropsVariantOverrides} from "@mui/material/Typography/Typography";
import StyledToolTip from "@/modules/components/general/StyledToolTip";

export interface HeaderContainerProps {
    header: string
    variant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>
    tip?: string
    children: React.ReactNode
}

function HeaderContainer({header, variant, tip, children}: HeaderContainerProps) {

    return (
        <Stack spacing={2}>
            {
                header &&
                <Stack direction="row" spacing={'0.5rem'} alignItems='center'>
                    <Typography variant={'h4'}>{header}</Typography>
                    {tip ? <StyledToolTip title={tip} arrow>
                        <InfoOutlined/>
                    </StyledToolTip> : <></>}
                </Stack>
            }
            {children}
        </Stack>

    );
}

export default HeaderContainer;
