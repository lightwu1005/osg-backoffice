import React from 'react';
import {Alert, AlertColor, Portal, Snackbar} from '@mui/material';

export interface ToastAlertInfo {
    show: boolean;
    message: string;
    severity: AlertColor;
}

export interface ToastAlertPosition {
    vertical: 'top',
    horizontal: 'center',
}

export interface ToastAlertProps {
    alertInfo: ToastAlertInfo;
    position: ToastAlertPosition;
    closeAlert: () => void;
}

const ToastAlert: React.FC<ToastAlertProps> = ({ alertInfo, position, closeAlert }) => {
    return (
        <Portal>
            <Snackbar
                anchorOrigin={{ vertical: position.vertical, horizontal: position.horizontal }}
                open={alertInfo.show}
                autoHideDuration={5000}
                onClose={closeAlert}>
                <Alert severity={alertInfo.severity} onClose={closeAlert} sx={{ mb: 2 }}>
                    {alertInfo.message}
                </Alert>
            </Snackbar>
        </Portal>
    );
};

export default ToastAlert;
