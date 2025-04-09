import InfoHeaderInput, {InfoHeaderInputProps} from "@/modules/components/infoHeaderInput/InfoHeaderInput";
import {Box} from "@mui/material";
import React from "react";

export const InfoInputComponent = ({header, label, tip, format, error, helperText, value, onChange, ...others}: InfoHeaderInputProps) => {
    return (
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <InfoHeaderInput
                {...others}
                header={header}
                label={label}
                error={error}
                format={format}
                value={value}
                helperText={helperText}
                tip={tip}
                regex={others.regex}
                suffix={others.suffix}
                prefix={others.prefix}
                onChange={onChange}
                disable={others.disable}
            />
        </Box>
    )
}
