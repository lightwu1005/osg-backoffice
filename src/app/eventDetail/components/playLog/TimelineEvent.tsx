import React from 'react';
import {Box, Divider, Stack, Typography} from '@mui/material';
import {PenaltyIcon} from './PenaltyIcon';
import {FiberManualRecordRounded} from '@mui/icons-material';
import TimelineEventCard, {TimelineEventCardProps} from './TimelineEventCard';
import {grey} from '@mui/material/colors';
import {formatLocalMillisecondsToHms} from '@/modules/common/DisplayFormatConverter';

export type DisplayType = 'left' | 'middle' | 'right'

export interface TimelineEventProps {
    clockTime: number
    systemTime: number
    displayType: DisplayType
    detail: TimelineEventCardProps
}

const VerticalDivider = ({ height }: { height?: string }) => (
    <Divider sx={{ borderWidth: '1px', height, borderColor: '#BDBDBD' }} orientation="vertical" variant="middle" flexItem />
)

const MiddleDetails = ({index, detail} : {index: number, detail: TimelineEventCardProps}) => (
    <>
        <Stack display={'flex'} justifyContent={'center'}>
            <Stack justifyContent={'center'} direction="row">
                <VerticalDivider height={'50px'}/>
            </Stack>
            <Stack justifyContent={'center'} alignItems="center" direction="row" gap={1}>
                <Typography sx={{color: 'text.primary', fontSize: '1rem', fontWeight: 500}}>
                    #{index} {detail.name}
                </Typography>
                {detail.penaltyType && <PenaltyIcon type={detail.penaltyType}/>}
                <Typography sx={{color: 'text.secondary', fontSize: '0.75rem', fontWeight: 400}}>
                    {detail.periodName}
                </Typography>
            </Stack>
            <Stack justifyContent={'center'} direction="row">
                {
                    detail.description &&
                    <Typography sx={{color: 'text.primary', fontSize: '1rem', fontWeight: 500}}>
                        {detail.description}
                    </Typography>
                }
            </Stack>
        </Stack>
    </>
);
const TimelineEvent: React.FC<TimelineEventProps & {index: number}> =  React.memo(({ index, clockTime, systemTime, displayType, detail }) => {
    const eventDescription = (systemTime && systemTime !== 0) ?
        `EventId: ${index} | System Received@${formatLocalMillisecondsToHms(systemTime)}` : `EventId: ${index}`
    return (
        <Stack gap={1} justifyContent="center">
            <Stack direction="row" justifyContent="center" gap={2}>
                {displayType === 'left' && <>
                    <TimelineEventCard index={index} {...detail} />
                    <VerticalDivider />
                    <Box width="100%" />
                </>}
                {displayType === 'middle' && <MiddleDetails index={index} detail={detail} />}
                {displayType === 'right' && <>
                    <Box width="100%" />
                    <VerticalDivider />
                    <TimelineEventCard index={index} {...detail} />
                </>}
            </Stack>
            <Stack direction="row" gap={2}>
                <Box sx={{ width: '100%' }} textAlign="end">
                    <Typography variant="body2" color="text.secondary">{eventDescription}</Typography>
                </Box>
                <FiberManualRecordRounded fontSize="small" sx={{ color: grey[400] }} />
                <Box sx={{ width: '100%' }} textAlign="start">
                    <Typography variant="body2" color="text.primary">{formatLocalMillisecondsToHms(clockTime)}</Typography>
                </Box>
            </Stack>
        </Stack>
    );
});
TimelineEvent.displayName = 'TimelineEvent'

export default TimelineEvent
