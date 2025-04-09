import {Box} from "@mui/material";
import React from "react";

export type PenaltyType = 'red' | 'yellow';
export const PenaltyIcon = ({type}: {type: PenaltyType}) => {
    return <Box data-testid='cardIcon' sx={{
        width: 15,
        height: 20,
        backgroundColor: type === 'red' ? '#C41C1C' : '#EA9A3E',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0.5
    }}/>
}