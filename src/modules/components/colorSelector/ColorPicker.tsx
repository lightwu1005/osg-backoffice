import React, {useEffect, useState} from 'react';
import {HexColorPicker} from "react-colorful";
import ToggleProps from "@/modules/interface/ToggleProps";
import {Typography} from '@mui/material';
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {useIntl} from 'react-intl';

/**
 * @param defaultColor default color on the color palette
 * @param onSave return the color
 * */
export interface ColorPickerProps {
    defaultColor?: string | null
    onSave: (color: string) => void
}

export const ColorPicker = ({ defaultColor, open, setOpen, onSave}: ColorPickerProps & ToggleProps) => {
    const intl = useIntl();
    const funType = LocalizationFunctionType.Common;
    const [color, setColor] = useState(defaultColor ?? '#FFFFFF');

    useEffect(() => {
        if(defaultColor)
            setColor(defaultColor)
    }, [defaultColor]);

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        onSave(color);
        setOpen(false);
    }

    const onChange = (selectedColor: string) => {
        setColor(selectedColor);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: {
                    borderRadius: 8,
                    textAlign: "center",
                }
            }}
        >
            <DialogContent>
                <HexColorPicker color={color} onChange={onChange}/>
                <Typography sx={{ textAlign: 'end' }}>
                    {color}
                </Typography>
            </DialogContent>
            <DialogActions
                sx={{
                    paddingX: 3,
                    paddingBottom: 2,
                    justifyContent: 'flex-end'
                }}
            >
                <Button size={'small'} variant={'text'} onClick={handleClose}>
                    {
                        intl.formatMessage({ id: `${funType}.cancel`, defaultMessage: 'Cancel' })
                    }
                </Button>
                <Button size={'small'} variant={'contained'} onClick={handleSave} autoFocus>
                    {
                        intl.formatMessage({ id: `${funType}.save`, defaultMessage: 'Save' })
                    }
                </Button>
            </DialogActions>
        </Dialog>
    );
}