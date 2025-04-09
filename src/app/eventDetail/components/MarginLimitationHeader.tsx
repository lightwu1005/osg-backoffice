import React from 'react';
import {Stack, Typography} from '@mui/material';
import {AccessTime, Place} from '@mui/icons-material';
import {MatchStatusChip} from '@/modules/components/chip/MatchStatusChip';
import {formatLocalTimeLong} from '@/modules/common/DisplayFormatConverter';

export interface MarginLimitationHeaderProps {
    startTime: number
    location: string
    status: string
}

function MarginLimitationHeader({startTime, location, status}: MarginLimitationHeaderProps) {
    const localStartTime = formatLocalTimeLong(startTime);

    return (
        <Stack gap={1} alignContent={'start'} justifyContent={'center'} alignItems={'start'}>
            <Typography variant={'h4'}>Margin & Limitation</Typography>
            <Stack
                direction={'row'}
                spacing={1}
                justifyContent={'center'}
            >
                <Typography variant={'body1'}>Control Market’s Odds</Typography>
                <Stack
                    direction={'row'}
                    spacing={1}
                    justifyContent={'center'}
                >
                    <AccessTime color={'action'}/>
                    <Typography variant={'body1'}>Start time: {localStartTime}</Typography>
                </Stack>
                <Stack
                    direction={'row'}
                    spacing={1}
                    justifyContent={'center'}
                >
                    <Place color={'action'}/>
                    <Typography variant={'body1'}>{location}</Typography>
                </Stack>
            </Stack>
            <MatchStatusChip status={status}/>
        </Stack>
    );
}

export default MarginLimitationHeader