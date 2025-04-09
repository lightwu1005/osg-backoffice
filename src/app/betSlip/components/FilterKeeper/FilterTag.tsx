import React from 'react';
import {Box, IconButton, Typography} from '@mui/material';
import {CloseRounded} from "@mui/icons-material";

export interface TagProps {
    id: string;
    label: string;
    value: string;
}

const FilterTag: React.FC<TagProps & OnRemoveListener<TagProps, void>> = (props) => {
    const {onRemove, ...tagProps} = props
    const {label, value} = tagProps
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderRadius: '0.25rem',
                padding: '0.25rem 0.5rem',
                gap: '0.25rem',
                alignSelf: 'stretch'
            }}
        >
            <Typography
                sx={{opacity: 0.6}}
                fontSize={'0.875rem'}
                fontFamily={'Roboto'}
                fontStyle={'normal'}
                fontWeight={'400'}
                lineHeight={'1.125rem'}
                letterSpacing={'0.01rem'}
                noWrap
            >
                {label}:
            </Typography>
            <Typography
                sx={{opacity: 0.87}}
                fontSize={'0.875rem'}
                fontFamily={'Roboto'}
                fontStyle={'normal'}
                fontWeight={'400'}
                lineHeight={'1.125rem'}
                letterSpacing={'0.01rem'}
                noWrap
            >
                {value}
            </Typography>
            <IconButton
                size="small"
                onClick={() => {
                    onRemove(tagProps)
                }}
                sx={{marginLeft: 'auto', padding: '0.25rem'}}
            >
                <CloseRounded sx={{color: '#636B74', opacity: 0.26}} fontSize="small"/>
            </IconButton>
        </Box>
    );
};
const MemoFilterTag =
    React.memo(FilterTag, (prevProps, nextProps) => (
        prevProps.id === nextProps.id &&
        prevProps.label === nextProps.label &&
        prevProps.value === nextProps.value
    ))
MemoFilterTag.displayName = 'FilterTag'
export default MemoFilterTag;
