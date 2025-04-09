import React, {useEffect, useState} from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import ToggleProps from "@/modules/interface/ToggleProps";
import { LocalizationFunctionType } from '@/localizedConfig/LanguageContext';
import { useIntl } from 'react-intl';

interface SaveFilterDialogProps {
    name?: string
    isEdit?: boolean
    onSave: (filterName: string) => void;
    onClose: () => void;
}

const SaveFilterDialog: React.FC<SaveFilterDialogProps & ToggleProps> = ({ open, setOpen, name, isEdit = false, onSave, onClose }) => {
    const [inputName, setInputName] = useState(name ?? '');
    const intl = useIntl();
    const funType = LocalizationFunctionType.Common;

    useEffect(() => {
        setInputName(name ?? '')
    }, [name])
    const handleSave = () => {
        const saveName = inputName
        handleClose()
        onSave(saveName);
    };

    const handleClose = () => {
        onClose()
        setOpen(false)
        setInputName('');
    }

    const saveDisabled = () => {
        const defaultRule = inputName.length === 0
        if (isEdit) {
            return inputName === name || defaultRule
        } else {
            return defaultRule
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                {
                    isEdit ?
                        intl.formatMessage({
                            id: `${funType}.filterSetting.renameFilter`, defaultMessage: 'Rename Filter'
                        }) :
                        intl.formatMessage({
                            id: `${funType}.filterSetting.saveFilterSetting`, defaultMessage: 'Save Filter Setting'
                        })
                }
            </DialogTitle>
            <DialogContent sx={{padding: '1rem 1.5rem'}}>
                <TextField
                    data-testid={'filter-name'}
                    id="filter-name"
                    label={intl.formatMessage({
                        id: `${funType}.filterSetting.filterName`, defaultMessage: 'Filter Name'
                    })}
                    variant="outlined"
                    fullWidth
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    sx={{ marginTop: 2 }}
                />
            </DialogContent>
            <DialogActions sx={{padding: '1rem 1.5rem'}}>
                <Button onClick={handleClose} >
                    {
                        intl.formatMessage({
                            id: `${funType}.cancel`, defaultMessage: 'Cancel'
                        })
                    }
                </Button>
                <Button data-testid={'filter-save'} onClick={handleSave} variant="contained" disabled={saveDisabled()}>
                    {
                        intl.formatMessage({
                            id: `${funType}.save`, defaultMessage: 'Save'
                        })
                    }
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SaveFilterDialog