import React from "react";
import {Timer} from "@mui/icons-material";
import {Typography} from "@mui/material";
import {CustomChip} from "@/modules/components/chip/CustomChip";
import {ChipColor} from "@/modules/components/chip/MuiChipsStyled";
import {formatSecondsToHms} from "@/modules/common/DisplayFormatConverter";

interface TimeClockChipProps {
    seconds: number
}

const TimeClockChip = ({seconds}: TimeClockChipProps) => {

    const timeLabel = `${formatSecondsToHms(seconds)}`;
    return (
        <CustomChip
            sx={{
                paddingX: '0.25rem',
                color: '#636B74',
                backgroundColor: '#FEFFFF',
                '[data-mui-color-scheme="dark"] &': {
                    color: '#9FA6AD',
                    backgroundColor: '#092A52',
                },
            }}
            color={ChipColor.grey}
            icon={<Timer />}
            label={<Typography variant={'h5'}>{timeLabel}</Typography>}
        />
    );
}

export default TimeClockChip