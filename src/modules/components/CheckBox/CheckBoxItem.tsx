import React, {useEffect} from 'react';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';

export interface CheckBoxItemProps {
    isChecked: boolean
    label?: string
    onChange?:(isChecked: boolean) => void,
    disabled?: boolean
}
function CheckBoxItem({isChecked, label, onChange, disabled = false}: CheckBoxItemProps) {
    const [checked, setChecked] = React.useState(isChecked);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = event.target.checked;
        setChecked(newChecked);
        if (onChange)
            onChange(newChecked);
    };

    useEffect(() => {
        setChecked(isChecked)
    }, [isChecked]);

    return (
        <div>
            <FormControlLabel
                control={
                    <Checkbox
                        disabled={disabled}
                        checked={checked}
                        onChange={handleChange}
                        color="primary"
                    />
                }
                label={<Typography variant="body1">{label}</Typography>}
            />
        </div>
    );
}

export default CheckBoxItem