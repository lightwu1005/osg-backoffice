import React from 'react';
import {FormGroup, Stack} from '@mui/material';
import CheckBoxItem from "@/modules/components/CheckBox/CheckBoxItem";

export interface CheckBoxCroupProps {
    items: CheckBoxGroupItemProps[]
    disabled?: boolean,
    onChange?: (label: string, checked: boolean) => void,
}

export interface CheckBoxGroupItemProps {
    label: string,
    checked: boolean
}

function CheckBoxGroup({items, disabled, onChange}: CheckBoxCroupProps) {

    return (
        <Stack direction={"row"} gap={1} flexWrap={'wrap'}>
            {items.map(item =>
                <CheckBoxItem
                    key={item.label}
                    isChecked={item.checked}
                    label={item.label}
                    disabled={disabled}
                    onChange={(isChecked) => {
                        if (onChange)
                            onChange(item.label, isChecked)
                    }}/>
            )}
        </Stack>
    );
}

export default CheckBoxGroup