import React from 'react';
import {Box, Stack, Typography} from "@mui/material";
import {PenaltyIcon, PenaltyType} from "@/app/eventDetail/components/playLog/PenaltyIcon";
import {formatSecondsToHms} from "@/modules/common/DisplayFormatConverter";

export interface TimelineEventCardProps {
    color?: 'grey' | 'green' | 'brown' | 'red'
    name: string
    description?: string
    penaltyType?: PenaltyType
    periodName?: string
    periodTime?: number
    isConfirmed: boolean
}

const cardStyled = (color: 'grey' | 'green' | 'brown' | 'red') => {
    switch (color) {
        case 'green':
            return {
                backgroundColor: '#E3FBE3',
                '[data-mui-color-scheme="dark"] &': {
                    backgroundColor: '#0A470A',
                },
            };
        case 'brown':
            return {
                backgroundColor: '#FCE1C2',
                '[data-mui-color-scheme="dark"] &': {
                    backgroundColor: '#72430D',
                },
            };
        case 'red':
            return {
                backgroundColor: '#FCE4E4',
                '[data-mui-color-scheme="dark"] &': {
                    backgroundColor: '#7D1212',
                },
            };
        case 'grey':
        default:
            return {
                backgroundColor: '#F0F4F8',
                '[data-mui-color-scheme="dark"] &': {
                    backgroundColor: '#FFFFFF29',
                },
            };
    }
}

const textStyled = (color: 'grey' | 'green' | 'brown' | 'red') => {
    switch (color) {
        case 'green':
            return {
                color: '#1F7A1F',
                '[data-mui-color-scheme="dark"] &': {
                    color: '#C7F7C7'
                }
            };
        case 'brown':
            return {
                color: '#9A5B13',
                '[data-mui-color-scheme="dark"] &': {
                    color: '#FDF0E1'
                }
            };
        case 'red':
            return {
                color: '#C41C1C',
                '[data-mui-color-scheme="dark"] &': {
                    color: '#F7C5C5'
                }
            };
        case 'grey':
        default:
            return {
                color: '#555E68',
                '[data-mui-color-scheme="dark"] &': {
                    color: '#9FA6AD'
                }
            };
    }
}
function TimelineEventCard({index, color = 'grey', name, description, penaltyType, periodName, periodTime, isConfirmed}: Readonly<TimelineEventCardProps> & {index: number}) {
    const bgStyled = cardStyled(color);
    const contentStyled = textStyled(color);

    return (
        <Box sx={{width: '100%'}}>
            <Stack p={2} borderRadius={2} gap={1} display={'flex'} sx={bgStyled}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} gap={1}>
                        <Typography sx={{
                            color: 'text.primary',
                            fontSize: '16x',
                            fontWeight: 400
                        }}>
                            #{index} {name} {isConfirmed && '- Confirmed'}
                        </Typography>
                        {penaltyType && <PenaltyIcon type={penaltyType}/>}
                    </Stack>
                    <Stack direction={'row'} gap={1}>
                        <Typography sx={{
                            color: '#555E68',
                            '[data-mui-color-scheme="dark"] &': {
                                color: '#9FA6AD',
                            },
                            fontSize: '0.75rem',
                            fontWeight: 400
                        }}>
                            {periodName}
                        </Typography>
                        <Typography sx={{
                            color: '#555E68',
                            '[data-mui-color-scheme="dark"] &': {
                                color: '#9FA6AD',
                            },
                            fontSize: '0.75rem',
                            fontWeight: 400
                        }}>
                            {periodTime && formatSecondsToHms(periodTime)}
                        </Typography>
                    </Stack>
                </Stack>
                {
                    description &&
                    <Typography sx={contentStyled} fontSize={'1rem'} fontWeight={500}>{description}</Typography>
                }
            </Stack>
        </Box>
    );
}

export default TimelineEventCard