import * as React from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {Stack, Tooltip, Typography} from "@mui/material";
import {SportsSoccerRounded} from "@mui/icons-material";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

export enum DangerBallType {
    GOAL = 'GOAL',
    PENALTY_AWARDED = 'PENALTY_AWARDED',
    PENALTY_RISK = 'PENALTY_RISK',
    DANGEROUS_FREE_KICK = 'DANGEROUS_FREE_KICK',
    DANGEROUS_ATTACK = 'DANGEROUS_ATTACK',
    CORNER_DANGER = 'CORNER_DANGER',
    CORNER = 'CORNER',
    FREE_KICK_ATTACK = 'FREE_KICK_ATTACK'
}

export interface DangerBallProps {
    dangerType: DangerBallType
}

const dangerBallTypeToIcon = (dangerType: DangerBallType) => {
    switch (dangerType) {
        case DangerBallType.GOAL:
            return <SportsSoccerRounded fontSize={'small'} sx={{color: '#EA9A3E'}}/>
        case DangerBallType.PENALTY_AWARDED:
        case DangerBallType.PENALTY_RISK:
        case DangerBallType.DANGEROUS_FREE_KICK:
        case DangerBallType.DANGEROUS_ATTACK:
        case DangerBallType.CORNER_DANGER:
        case DangerBallType.CORNER:
        case DangerBallType.FREE_KICK_ATTACK:
        default:
            return <WarningAmberIcon fontSize={'small'} sx={{color: '#EF5350'}}/>
    }
}

export const DangerBall = ({dangerType}: DangerBallProps) => {
    const intl = useIntl();
    const funcType = `${LocalizationFunctionType.Common}.dangerBallKey`;
    const displayText = intl.formatMessage({
        id: `${funcType}.${dangerType}`,
        defaultMessage: dangerType.toString()
    });

    return (
        <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
            <Tooltip arrow placement="top-start" title={displayText}>
                {dangerBallTypeToIcon(dangerType)}
            </Tooltip>
            <Typography sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'inline-block'
            }} variant={'body2'} color={'text.secondary'}>
                {displayText}
            </Typography>
        </Stack>
    )
}