import {Box, Button, Dialog, DialogActions, DialogContent} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import DialogContentText from "@mui/material/DialogContentText";
import ToggleProps from "@/modules/interface/ToggleProps";
import {
    QueryableSelectTextField,
    QueryableSelectViewModel,
    QueryableSelectVMProps
} from "@/modules/components/TextField";
import {OptionItem} from "@/modules/components/buttons/multipleFilterButton/models/Interface";

export interface SelectionContentDialogProps<VM extends QueryableSelectViewModel<any>> extends ToggleProps, QueryableSelectVMProps<VM> {
    title: string;
    subTitle?: string;
    label?: string;
    placeholder?: string;
    onClose: (value?: string) => void;
    onValueChange?: (value: OptionItem[]) => void;
}

const SelectionContentDialog = <VM extends QueryableSelectViewModel<any>>(props: SelectionContentDialogProps<VM>) => {
    const {title, subTitle, label, placeholder, onClose, onValueChange, open, setOpen, ViewModel} = props
    const [selectedValue, setSelectedValue] = React.useState<OptionItem[]>([]);
    const [disabled, setDisabled] = React.useState<boolean>(true);

    const handleConfirm = () => {
        setOpen(false);
        if (onValueChange) {
            onValueChange(selectedValue);
        }
    }

    const handleCancel = () => {
        onClose();
        setSelectedValue([]);
        setOpen(false);
    }

    const onChange = (value: OptionItem[]) => {
        if (value.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
        setSelectedValue(value);
    }

    return (
        <Box>
            <Dialog open={open} sx={{'& .MuiDialog-paper': {width: '80%'}}}>
                <DialogTitle variant={'h4'}>
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText paddingBottom={4}>{subTitle}</DialogContentText>
                    <QueryableSelectTextField label={label ?? ''} placeholder={placeholder}
                                              onChange={(option) => onChange(option)}
                                              ViewModel={ViewModel}/>
                </DialogContent>
                <DialogActions>
                    <Box alignItems={'center'}>
                        <Button sx={{marginRight: 2}} onClick={handleCancel}>CANCEL</Button>
                        <Button variant="contained" disabled={disabled} onClick={handleConfirm}>SAVE</Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default SelectionContentDialog;