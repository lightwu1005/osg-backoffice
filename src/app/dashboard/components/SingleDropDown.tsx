"use client";
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {styled} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const BootstrapInput = styled(InputBase)(({theme}) => ({
    '& .MuiInputBase-input': {
        position: 'relative',
        '&:focus': {
            backgroundColor: 'transparent'
        },
    },
}));

export interface SingleDropDownProps {
    list: string[];
    onOptionsSelected?: (option: string[]) => void;
}

export default function SingleDropDown(props: SingleDropDownProps) {
    const {list, onOptionsSelected} = props;
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleChange = (event: SelectChangeEvent) => {
        const newIndex = list.indexOf(event.target.value);
        setSelectedIndex(newIndex);
        if (onOptionsSelected) {
            onOptionsSelected([event.target.value]);
        }
    };

    const handleCustomChange = (value: string) => {
        const newIndex = list.indexOf(value);
        setSelectedIndex(newIndex);
        if (onOptionsSelected) {
            onOptionsSelected([value]);
        }
    };

    return (
        <FormControl variant="standard">
            <Select
                value={list[selectedIndex]}
                onChange={handleChange}
                input={<BootstrapInput/>}
                renderValue={(selected) => selected}
            >
                {list.map((item, index) => (
                    index !== list.length - 1 ?
                        <MenuItem value={item} key={index}>{item}</MenuItem> :
                    <MenuItem
                        value={item}
                        key={index}
                        onClick={() => handleCustomChange(item)}
                    >
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
