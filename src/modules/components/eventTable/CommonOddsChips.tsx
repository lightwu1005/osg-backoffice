import React from "react";
import Chip from "@mui/material/Chip";
import { Box } from "@mui/material";

export interface OddsChipDataModel {
    index: number;
    label: string;
    className: string;
    clickable: boolean;
    onClick?: () => void;
}

interface CommonOddsChipsProps {
    chipsData: OddsChipDataModel[]
}

const CommonOddsChips: React.FC<CommonOddsChipsProps> = (
    {
        chipsData = []
    }) => {

    return <Box sx={{ display: 'flex', gap: 1 }}>
        { chipsData.sort((chipsData) => {
            return chipsData.index;
        }).map((chipsData) => {
            return <Chip
                onClick={chipsData.onClick}
                key={chipsData.index}
                label={chipsData.label}
                className={chipsData.className}
                clickable={chipsData.clickable}
            />
        })}
    </Box>
}

export default CommonOddsChips