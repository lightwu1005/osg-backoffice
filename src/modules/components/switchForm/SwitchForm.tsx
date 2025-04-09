"use client";
import React, {ChangeEvent} from "react";
import Switch from '@mui/material/Switch';
import {Grid, Stack, Tooltip, Typography} from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import {InfoInputComponent} from "@/modules/components/TextField";
import {InfoOutlined} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles({
    hiddenHeader: {
        '& .MuiStack-root > h4': {
            display: 'none',
        }
    }
});
const StyledToolTip = styled(Tooltip)(() => ({
    color: '#636B74'
}));

interface InputComponent<T> {
    label: string
    format: 'number' | 'text'
    value: T
    onChange: (value: any) => void
    header: string
    tip: string
    error: boolean
    helperText: string
    suffix?: string
    disable?: boolean
    limit?: [number, number]
}

export interface SwitchFormProps {
    header?: {
        title: string,
        tip?: string
    },
    enabled: {
        label: string
        value: boolean
        onChange: (e: boolean) => void,
        disabled?: boolean
    },
    inputArr: Array<Array<InputComponent<string> | InputComponent<number> | InputComponent<number | undefined>>>
}


function SwitchForm(props: SwitchFormProps) {
    const {header, enabled, inputArr} = props
    const className = useStyles();

    const handleEnabledChange = (event: ChangeEvent<HTMLInputElement>) => {
        enabled.onChange(event.target.checked);
    };

    const getClassForGroup = (group: Array<InputComponent<string> | InputComponent<number> | InputComponent<number | undefined>>): string => {
        const result = group.filter(item => {
            return item.tip !== '' && item.header !== ''
        })
        return result.length > 0 ? '' : className.hiddenHeader
    }

    return (
        <>
            {
                header ?
                    <Stack direction={"row"} justifyContent={"space-between"} ml={2} mt={3}>
                        <Stack direction={"row"} spacing={1} alignItems={"center"}>
                            <Typography variant={"h4"}>
                                {
                                    header.title
                                }
                            </Typography>
                            <StyledToolTip
                                title={header.tip}>
                                <InfoOutlined/>
                            </StyledToolTip>
                        </Stack>
                    </Stack>: <></>
            }
            <Grid item xs={12}>
                <FormControlLabel
                    control={<Switch checked={enabled.value} onChange={handleEnabledChange}
                                     disabled={enabled.disabled}/>}
                    labelPlacement="start" label={enabled.label} sx={{marginLeft: 0}}/>
            </Grid>
            <>
                {inputArr.map((row) => (
                    <React.Fragment key={`row_${row}`}>
                        {row.map((input, idx) => (
                            <Grid key={`${input.label}_${idx}`} item xs={12 / row.length} mb={1}>
                                <div className={getClassForGroup(row)}>
                                    <InfoInputComponent
                                        disable={input.disable}
                                        header={input.header}
                                        error={input.error}
                                        helperText={input.helperText}
                                        tip={input.tip}
                                        label={input.label}
                                        format={input.format}
                                        value={input.value}
                                        limitRange={input.limit}
                                        onChange={input.onChange}
                                    />
                                </div>
                            </Grid>
                        ))}
                    </React.Fragment>
                ))}
            </>
        </>
    );
}

export default SwitchForm