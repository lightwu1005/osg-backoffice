import React from 'react';
import { useSortable } from "@dnd-kit/sortable";
import {Box, Stack, Typography} from "@mui/material";
import {Star, DragHandleRounded} from "@mui/icons-material";
import { CSS } from "@dnd-kit/utilities";

export interface SortedCardProps {
    isFirst: boolean
    id: string
    disabled?: boolean
}

export const SortedCard: React.FC<SortedCardProps> = ({ isFirst, id, disabled }) => {
    const { setNodeRef, listeners, transform, transition } = useSortable({id});

    const styles = {
        transform: CSS.Transform.toString(transform),
        transition,
        marginTop: "0.625rem"
    };

    return (
        <Box sx={{ width: '100%', margin: '10px 0'}} ref={setNodeRef} {...listeners} style={styles}>
            <Stack direction={"row"}
                   justifyContent="space-between"
                   alignItems="center"
                   sx={{
                       backgroundColor: '#F0F4F8',
                       '[data-mui-color-scheme="dark"] &': {
                           backgroundColor: '#0a1625',
                       },
                       padding: '1.5rem',
                       borderRadius: '0.5rem'
                   }}
            >
                <Stack direction={"row"} spacing={2}>
                    {
                        isFirst &&
                        <Star sx={{
                            padding: '0.25rem',
                            borderRadius: '50%',
                            backgroundColor: '#E3EFFB',
                            '[data-mui-color-scheme="dark"] &': {
                                backgroundColor: '#0A2744',
                                color: '#C7DFF7'
                            },
                            color: '#12467B',
                            fontSize: '28px'
                        }}/>
                    }
                    <Typography variant={'h4'}>{id}</Typography>
                </Stack>
                {!disabled && <DragHandleRounded sx={{ position: 'relative', top: '-7.5px', pointerEvents: 'auto'}} />}
            </Stack>
        </Box>
    );
}