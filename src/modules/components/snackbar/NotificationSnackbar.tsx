import React, {useEffect, useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import {styled} from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import {Box, SnackbarContent, Stack, Typography} from '@mui/material';
import ToggleProps from "@/modules/interface/ToggleProps";

export interface NotificationSnackbarContentProps {
    id: string,
    title: string;
    content: string;
    onClick?: (id: string) => void;
    onClose?: () => void;
}

export interface NotificationSnackbarProps extends NotificationSnackbarContentProps, ToggleProps {
    show?: boolean
    position?: Position;
}

export const defaultNotificationSnackbarProps = {
    show: false,
    title: '',
    content: ''
}

export interface Position {
    vertical: 'top' | 'bottom',
    horizontal: 'center' | 'right' | 'left',
}

const CloseButton = styled(IconButton)({
    position: 'absolute',
    right: '1rem',
    top: '1rem',
    zIndex: 1,
});

const TitleTypography = styled(Typography)({
    fontWeight: '700',
    fontFamily: 'Inter',
    fontSize: '1.25rem',
    color: '#0B6BCB',
    paddingRight: '0.5rem'
});

const ContentTypography = styled(Typography)({
    fontWeight: '400',
    fontFamily: 'Inter',
    fontSize: '1.125rem',
    color: '#32383E',
    paddingTop: '0.5rem'
});

export const NotificationSnackbarContent = React.memo(function NotificationSnackbarContent({id, title, content, onClick, onClose}: NotificationSnackbarContentProps) {
        const [timeId, setTimeId] = useState<NodeJS.Timeout>()
        const handleClose = () => {
            if (onClose) {
                onClose()
                if (timeId)
                    clearTimeout(timeId)
            }
        }
        useEffect(() => {
            if (onClose) {
                const id = setTimeout(() => {
                    handleClose()
                }, 3000);
                setTimeId(id)
            }
        }, [onClose]);
        return (
            <SnackbarContent
                onClick={() => {
                    if (onClick)
                        onClick(id)
                    handleClose()
                }}
                sx={{
                    width: '30%',
                    '& .MuiPaper-root': {
                        borderRadius: '0.5rem',

                    },
                    flexWrap: 'nowrap',
                    alignItems: 'baseline'
                }}
                message={
                    <Box display={'flex'} padding={'0.5rem'}>
                        <Stack>
                            <TitleTypography>{title}</TitleTypography>
                            <ContentTypography>{content}</ContentTypography>
                        </Stack>
                    </Box>
                }
                action={
                    <IconButton onClick={handleClose}>
                        <CloseIcon fontSize={'small'} sx={{color: '#636B74'}}/>
                    </IconButton>
                }
            />
        );
    },
    (prevProps, nextProps) => {
        return (
            prevProps.title === nextProps.title &&
            prevProps.content === nextProps.content
        );
    })
NotificationSnackbarContent.displayName = 'NotificationSnackbarContent';

const NotificationSnackbar = ({id, open, setOpen, title, content, position, onClick, onClose}: NotificationSnackbarProps) => {
    const handleClose = () => {
        setOpen(!open);
        if (onClose) onClose()
    };

    return (
        <Snackbar
            ContentProps={{
                sx: {
                    background: '#FBFCFE'
                }
            }}
            sx={{width: '30%', '& .MuiPaper-root': {borderRadius: '0.5rem', flexWrap: 'nowrap', alignItems: 'baseline'}}}
            anchorOrigin={{vertical: position?.vertical || 'top', horizontal: position?.horizontal || 'right'}}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={
                <Box display={'flex'} padding={'0.5rem'}>
                    <Stack>
                        <TitleTypography>{title}</TitleTypography>
                        <ContentTypography>{content}</ContentTypography>
                    </Stack>

                </Box>
            }
            action={
                <IconButton onClick={handleClose}>
                    <CloseIcon fontSize={'small'} sx={{color: '#636B74'}}/>
                </IconButton>
            }
            onClick={() => {
                if (onClick)
                    onClick(id)
                handleClose()
            }}
        />
    );
};

export default NotificationSnackbar;
