import React, {MouseEvent, useEffect, useState} from 'react';
import {
    Button,
    Divider,
    IconButton,
    ListItemIcon,
    ListItemText as MuiListItemText,
    Menu,
    MenuItem,
    Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {KeyboardArrowDownRounded} from "@mui/icons-material";
import SaveFilterDialog from "@/app/betSlip/components/FilterKeeper/SaveFilterDialog";
import {styled} from "@mui/material/styles";
import AlertDialog, {buildAlertDialogProps} from "@/modules/components/dialog/AlertDialog";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

export interface FilterDropdownProps {
    filterNames: string[]
    selectedIndex: number
    hasChanged: boolean
    handleAction: (filterName: string, index: number, action: 'selected' | 'saveAs' | 'save' | 'edit' | 'remove') => void
}

const ListItemText = styled(MuiListItemText)(({theme}) => ({
    fontSize: '16xp',
    color: 'text.primary'
}))

const FilterDropdown = ({filterNames, selectedIndex, hasChanged, handleAction}: FilterDropdownProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [hoverIndex, setHoverIndex] = useState<null | number>(null)
    const [selected, setSelected] = useState(selectedIndex)
    const [showSaveDialog, setShowSaveDialog] = useState(false)
    const [showRemoveDialog, setShowRemoveDialog] = useState(false)
    const [dialogFocusIndex, setDialogFocusIndex] = useState<null | number>(null)
    const intl = useIntl();
    const funType = LocalizationFunctionType.Common;

    const isOpen = Boolean(anchorEl);
    useEffect(() => {
        setSelected(selectedIndex)
    }, [selectedIndex]);

    const removeDialogProps = buildAlertDialogProps(
        intl.formatMessage({ id: `${funType}.filterSetting.removeFilter`,
            defaultMessage: 'Remove Filter'}),
        intl.formatMessage({ id: `${funType}.filterSetting.removeFilterDescription`,
            defaultMessage: 'Are you sure you want to remove this Filter ?'}),
        () => {
            clearFocus()
            setShowRemoveDialog(false)
        },
        () => {
            if (dialogFocusIndex !== null)
                handleAction(filterNames[dialogFocusIndex], dialogFocusIndex, 'remove')
            clearFocus()
            setShowRemoveDialog(false)
        }
    )

    const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMouseEnter = (index: number) => {
        setHoverIndex(index);
    };

    const handleMouseLeave = () => {
        setHoverIndex(null);
    };

    const handleSelected = (index: number) => {
        handleAction(filterNames[index], index, 'selected')
        handleClose();
    };

    const handleEdit = (index: number) => {
        setDialogFocusIndex(index)
        setShowSaveDialog(true)
        handleClose();
    };

    const handleDelete = (index: number) => {
        setDialogFocusIndex(index)
        setShowRemoveDialog(true)
        handleClose();
    };

    const clearFocus = () => {
        if (dialogFocusIndex !== null)
            setDialogFocusIndex(null)
    }

    const views = () => {
        if (filterNames.length > 0) {
            return <div>
                <Button
                    variant="text"
                    sx={{marginLeft: 'auto'}}
                    onClick={handleButtonClick}
                    endIcon={<KeyboardArrowDownRounded/>}
                >
                    <Typography noWrap>{filterNames[selected]}{hasChanged ? '*' : ''}</Typography>
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={isOpen}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <Typography
                        sx={{padding: '0.5rem 1rem'}}
                        fontSize={'0.875rem'}
                        color={'text.secondary'}
                    >
                        {
                            intl.formatMessage({
                                id: `${funType}.filterSetting.myFilter`, defaultMessage: 'My Filter'
                            })
                        }
                    </Typography>
                    {filterNames.map((name, index) => (
                        <MenuItem
                            key={`${index}-${name}`}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            sx={{
                                minWidth: '17.5rem',
                            }}
                            onClick={() => handleSelected(index)}
                        >
                            <ListItemText primary={name}/>
                            <ListItemIcon sx={{minWidth: '0', visibility: hoverIndex === index ? 'visible' : 'hidden'}}>
                                <IconButton onClick={(event) => {
                                    event.stopPropagation()
                                    handleEdit(index)}
                                } size="small">
                                    <EditIcon fontSize="small"/>
                                </IconButton>
                                <IconButton onClick={(event) => {
                                    event.stopPropagation()
                                    handleDelete(index)}
                                } size="small">
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                            </ListItemIcon>
                        </MenuItem>
                    ))}
                    <Divider/>
                    {hasChanged &&
                        <MenuItem key={'save'} onClick={() => {
                            handleAction(filterNames[selectedIndex], selectedIndex, 'save')
                            handleClose()
                        }}>
                            <ListItemText primary={intl.formatMessage({ id: `${funType}.save`,
                                defaultMessage: 'Save'})}/>
                        </MenuItem>
                    }
                    <MenuItem key={'saveAs'} onClick={() => {
                        setShowSaveDialog(true)
                        handleClose()
                    }}>
                        <ListItemText primary={intl.formatMessage({ id: `${funType}.saveAs`,
                            defaultMessage: 'Save as ...'})}/>
                    </MenuItem>
                </Menu>
            </div>
        } else {
            return <Button
                data-testid={'saveFilterSetting'}
                variant="text"
                sx={{marginLeft: 'auto'}}
                onClick={() => setShowSaveDialog(true)}
            >
                <Typography noWrap>
                    {intl.formatMessage({ id: `${funType}.filterSetting.saveFilterSetting`,
                        defaultMessage: 'Save Filter Setting'}).toUpperCase()}
                </Typography>
            </Button>
        }
    }
    return <div>
        {views()}
        <SaveFilterDialog
            open={showSaveDialog}
            setOpen={setShowSaveDialog}
            onSave={(filterName) => {
                handleAction(filterName, dialogFocusIndex ?? NaN,dialogFocusIndex !== null ? 'edit' : 'saveAs')
            }}
            onClose={clearFocus}
            {...(dialogFocusIndex !== null ? {
                name: filterNames[dialogFocusIndex!!],
                isEdit: true
            } : undefined)}
        />
        <AlertDialog
            {...removeDialogProps}
            open={showRemoveDialog}
            setOpen={setShowRemoveDialog}
        />
    </div>
};

export default FilterDropdown;
