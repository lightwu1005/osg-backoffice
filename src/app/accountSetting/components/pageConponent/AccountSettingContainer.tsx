import React, { ReactNode } from 'react';
import { Stack } from '@mui/material';

interface AccountSettingContainerProps {
    children: ReactNode;
}

const AccountSettingContainer: React.FC<AccountSettingContainerProps> = ({ children}) => {
    return (
        <Stack spacing={4}>
            {children}
        </Stack>
    );
};

export default AccountSettingContainer;
