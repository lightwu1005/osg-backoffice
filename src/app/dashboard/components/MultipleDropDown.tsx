"use client";
import * as React from 'react';
import {useEffect} from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {styled} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { LocalizationFunctionType } from '@/localizedConfig/LanguageContext';
import { useIntl } from 'react-intl';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const BootstrapInput = styled(InputBase)(({theme}) => ({
    '& .MuiInputBase-input': {
        position: 'relative',
        '&:focus': {
            backgroundColor: 'transparent'
        },
    },
}));

export interface MultipleDropDownProps {
    list: string[];
    type?: 'sport' | 'league';
    atLeastOne?: boolean;
    onOptionsSelected?: (options: string[]) => void;
}

export default function MultipleDropDown(props: MultipleDropDownProps) {
    const {list, onOptionsSelected} = props
    const [options, setOptions] = React.useState<string[]>([]);
    const [selected, setSelected] = React.useState<string[]>(list);
    const intl = useIntl();
    const funType = LocalizationFunctionType.Common;

    useEffect(() => {
        setOptions(prevState => {
            if (prevState.length === list.length) return prevState
            return list
        })

        setSelected(prevState => {
            if (prevState.length === list.length) return prevState
            return list
        })
    }, [list]);

    const handleChange = (event: SelectChangeEvent<typeof selected>) => {
        const {
            target: {value},
        } = event;

        const items = typeof value === 'string' ? value.split(',') : value;

        if (items.length === 0 && props.atLeastOne) return;

        const lastItem = items[items.length - 1];
        const isAllSelected = lastItem === 'all';
        const isFullySelected = selected.length === options.length;

        let newSelected: string[] = [];
        if (isAllSelected) {
            if (props.atLeastOne) {
                newSelected = isFullySelected ? [options[0]] : options;
            } else {
                newSelected = isFullySelected ? [] : options;
            }
        } else {
            newSelected = items;
        }
        setSelected(newSelected);

        onOptionsSelected?.(newSelected);
    };


    const renderValue = (selected: string[]) => {
        if (selected.length === options.length || !selected || selected.length === 0) {
            return props.type === 'sport' ?
                intl.formatMessage({id: `${funType}.allSports`, defaultMessage: 'All Sports'})
                :
                intl.formatMessage({id: `${funType}.allLeagues`, defaultMessage: 'All Leagues'})
        } else {
            return props.type === 'sport' ? intl.formatMessage({
                    id: `${funType}.sportOfCounts`,
                    defaultMessage: 'Sport({count})'},
                {
                    count: selected.length
                }) : intl.formatMessage({
                    id: `${funType}.leagueOfCounts`,
                    defaultMessage: 'League({count})'},
                {
                    count: selected.length
                });
        }
    };

    return (
        <FormControl variant="standard">
            <Select
                multiple
                displayEmpty
                defaultValue={options.slice(0, 2)}
                value={selected}
                onChange={handleChange}
                input={<BootstrapInput/>}
                renderValue={renderValue}
                MenuProps={MenuProps}
            >
                <MenuItem key="select-all" value="all">
                    <Checkbox checked={selected.length === options.length}/>
                    <ListItemText primary={props.type === 'sport' ?
                            intl.formatMessage({
                                id: `${funType}.allSports`,
                                defaultMessage: 'All Sports'
                            })
                            :
                            intl.formatMessage({
                                id: `${funType}.allLeagues`,
                                defaultMessage: 'All Leagues'
                            })}
                    />
                </MenuItem>
                {list.map((name) => (
                    <MenuItem key={name} value={name}>
                        <Checkbox checked={selected.indexOf(name) > -1}/>
                        <ListItemText primary={name}/>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}