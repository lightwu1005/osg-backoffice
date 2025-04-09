import React from 'react';
import { Box, CircularProgress } from '@mui/material';

interface LoadingAnimationProps {
    isLoading: boolean;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="fixed"
            top={0}
            left={0}
            width="100%"
            height="100%"
            bgcolor="rgba(255, 255, 255, 0.7)"
            zIndex={999}
        >
            <CircularProgress />
        </Box>
    );
};

export default LoadingAnimation;
