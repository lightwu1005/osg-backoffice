import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import {Stack, Typography} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import StyledToolTip from "@/modules/components/general/StyledToolTip";
import {InfoOutlined} from "@mui/icons-material";

interface DropDown {
    readonly selected: string[]
    readonly header?: string,
    readonly label?: string,
    readonly tip?: string
    readonly list: List[],
    readonly onChange: (e: string[]) => void,
    readonly disabled?: boolean
    readonly isMarketSetting?: boolean
}

export interface List {
    id: string
    name: string
}

export default function MultipleDropDown({selected, header, label, list, onChange, disabled, tip, isMarketSetting}: DropDown) {
    const handleChange = (event: SelectChangeEvent<typeof selected>) => {
        const {target: {value},} = event;
        if (value[value.length - 1] === "all") {
            onChange(selected.length === list.length ? [] : list.map(item => item.id));
            return;
        }
        onChange(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const renderValue = (selected: string[]) => {
        if(isMarketSetting) return `Markets(${selected.length})`;

        if (!selected || selected.length === 0) {
            return '';
        } else if (selected.length === list.length) {
            return `Select all ${label} (${selected.length})`;
        } else {
            return `Markets(${selected.length})`;
        }
    };

    return (
        <>
            <Stack direction="row" alignItems='center' mb={2}>
                <Typography variant={'h4'}>{header}</Typography>
                {tip ? <StyledToolTip title={tip} arrow>
                    <InfoOutlined/>
                </StyledToolTip> : <></>}
            </Stack>
            <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select
                    label={label}
                    multiple
                    value={selected}
                    disabled={disabled}
                    onChange={isMarketSetting ? undefined : handleChange}
                    renderValue={renderValue}
                    variant={"outlined"}
                    sx={{
                        "& .MuiSelect-select": {
                            padding: '8px 14px !important'
                        }
                    }}
                >
                    {
                        isMarketSetting ?
                            <></>
                            :
                            <MenuItem key="select-all" value="all">
                                <Checkbox checked={selected.length === list.length}/>
                                <ListItemText primary={`Select all ${label}`}/>
                            </MenuItem>
                    }
                    {list.map(({name, id}, index) => (
                        <MenuItem key={id} value={id}>
                            {
                                isMarketSetting ?
                                    <ListItemText primary={name}/>
                                    :
                                    <>
                                        <Checkbox
                                            checked={list.filter(item =>
                                                selected.includes(item.id)).map(
                                                item => item.name).includes(name)}/>
                                        <ListItemText primary={name}/>
                                    </>
                            }
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}