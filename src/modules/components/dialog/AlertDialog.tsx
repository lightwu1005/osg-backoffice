import React from 'react';
import Button, {ButtonProps} from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ToggleProps from "@/modules/interface/ToggleProps";
import {alpha} from "@mui/material";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

export interface AlertDialogProps {
    title: string | React.ReactNode
    content: string | React.ReactNode
    actions: ActionProps[]
    titleAlignment?: 'left' | 'right' | 'center'
    buttonWidth?: number | string
    buttonsAlignment?: 'left' | 'right' | 'center'
}

export interface ActionProps {
    type: "cancel" | "confirm" | "warning"
    text: string
    autoFocus?: boolean
    onClick: () => void
    buttonWidth?: number | string
}

export const buildAlertDialogProps = (
    title: string | React.ReactNode, content: string | React.ReactNode,
    cancelClick?: () => void, confirmClick?: () => void, warningClick?: () => void,
): AlertDialogProps => {
    const actions: ActionProps[] = []
    if (cancelClick) {
        actions.push({
            type: 'cancel',
            text: 'Cancel',
            onClick: () => cancelClick()
        })
    }
    if (warningClick) {
        actions.push({
            type: 'cancel',
            text: 'Cancel',
            onClick: () => warningClick()
        })
    }
    if (confirmClick) {
        actions.push({
            type: 'confirm',
            text: 'Confirm',
            autoFocus: true,
            onClick: () => confirmClick()
        })
    }
    return {
        title: title,
        content: content,
        actions: actions
    }
}

function getButtonStyle(type: ActionProps['type'], buttonWidth?: number | string): ButtonProps {
    let color: 'primary' | 'secondary' | 'inherit' | 'success' | 'error' | 'info' | 'warning' = 'inherit';
    let variant: 'text' | 'outlined' | 'contained' = 'outlined';

    if (type === 'confirm') {
        color = 'primary';
        variant = 'contained';
    } else if (type === 'warning') {
        color = 'warning';
        variant = 'contained';
    }

    return {
        color: color,
        variant: variant,

        sx: {
            width: buttonWidth,
            paddingY: 1,
            marginX: 1,
            ...(type === 'cancel' && {
                color: '#32383E',
                borderColor: '#32383E',
                '&:hover': {
                    backgroundColor: alpha('#32383E', 0.1),
                    borderColor: '#32383E',
                },
            }),
        },
    };
}

function Action({type, text, autoFocus, onClick, buttonWidth}: ActionProps) {
    const buttonStyle = getButtonStyle(type, buttonWidth)
    const intl = useIntl()
    const funType = LocalizationFunctionType.Common

    return (
        <Button {...buttonStyle} onClick={onClick} autoFocus={autoFocus}>
            {
                intl.formatMessage({id: `${funType}.${text.toLowerCase()}`, defaultMessage: text})
            }
        </Button>
    );
}

function AlertDialog({title, content, actions, open, setOpen, titleAlignment, buttonsAlignment, buttonWidth}: AlertDialogProps & ToggleProps) {
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Dialog
            open={open}
            onClose={() => handleClose()}
            PaperProps={{
                style: {
                    borderRadius: 24,
                    padding: 16,
                    textAlign: "center",
                    width: '40vw'
                },
            }}
        >
            <DialogTitle variant={'h4'} sx={{ textAlign: titleAlignment ?? "center" }}>
                {title}
            </DialogTitle>
            <DialogContent>

                <DialogContentText>
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: (theme) => {
                        switch (buttonsAlignment) {
                            case 'left': return 'flex-start'
                            case 'right': return 'flex-end'
                            case 'center': return 'center'
                            default: return 'center'
                        }
                    },
                    '& > *': {
                        flex: buttonsAlignment ? 'none' : 1,
                    },
                }}
            >
                {actions.map((item, index) => (
                    <Action
                        key={index}
                        type={item.type}
                        text={item.text}
                        autoFocus={item.autoFocus}
                        buttonWidth={buttonWidth}
                        onClick={() => {
                            item.onClick();
                            handleClose();
                        }}
                    />
                ))}
            </DialogActions>
        </Dialog>
    );
}

export default AlertDialog