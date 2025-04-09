import {Box, Stack, Typography} from "@mui/material";
import React from "react";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

const styles = {
    homeTeamName: {
        fontSize: '30px',
        color: 'text.primary',
        fontWeight: 700,
        textAlign: 'right',
        lineHeight: '2.5rem',
    },
    awayTeamName: {
        fontSize: '30px',
        color: 'text.primary',
        fontWeight: 700,
        lineHeight: '2.5rem',
        textAlign: 'left'
    },
    gameState: {
        fontSize: '1.25rem',
        color: '#555E68',
        '[data-mui-color-scheme="dark"] &': {
            color: '#9FA6AD',
        },
        fontWeight: 500,
        lineHeight: '32px'
    },
    score: {
        fontSize: '48px',
        color: '#0A2744',
        '[data-mui-color-scheme="dark"] &': {
            color: '#E3EFFB',
        },
        fontWeight: 700,
        lineHeight: '80px'
    },
    line: {
        fontSize: '48px',
        color: 'text.primary',
        fontWeight: 700,
        lineHeight: '80px'
    },
    clubName: {
        color: '#555E68',
        '[data-mui-color-scheme="dark"] &': {
            color: '#9FA6AD',
        },
        fontWeight: 700,
    },
    container: {
        alignItems: 'center',
        flex: 1
    },
    homeText: {
        color: '#0B6BCB',
        fontWeight: 700,
        marginLeft: '0.5rem'
    },
    awayText: {
        color: '#C41C1C',
        fontWeight: 700,
        marginRight: '0.5rem'
    },
    penaltyScore: {
        fontSize: '2.215rem',
        fontWeight: 600,
        family: 'Inter',
        color: 'text.secondaryChannel'
    }
};

export interface ParticipantProps {
    teamName: string
    clubName: string
    score: number
    penaltyScore?: number
}

export interface TeamScoreCardProps {
    leagueName: string
    gameState: string
    displayType: string
    home: ParticipantProps
    away: ParticipantProps
}

const TeamScoreCard: React.FC<TeamScoreCardProps> = (
    {
        leagueName, gameState, displayType, home, away
    }) => {

    const intl = useIntl();
    const funType = LocalizationFunctionType.Event;

    let homeTitle = ''
    let awayTitle = ''

    switch (displayType) {
        case 'team':
            homeTitle = intl.formatMessage({id: `${funType}.home`, defaultMessage: 'Home'});
            awayTitle = intl.formatMessage({id: `${funType}.away`, defaultMessage: 'Away'});
            break;
        case 'player':
            break;
    }

    const getPenaltyScore = (penaltyScore: number | undefined) => {
        if (penaltyScore === undefined || isNaN(penaltyScore)) {
            return ''
        }
        return `(${penaltyScore})`
    }

    return (
        <Stack textAlign={'center'}>
            <Typography mb={2} sx={{
                fontSize: '1.25rem',
                fontWeight: 500,
                lineHeight: '32px',
                color: '#555E68',
                '[data-mui-color-scheme="dark"] &': {
                    color: '#9FA6AD',
                }
            }}>{leagueName}</Typography>
            <Stack direction='row' alignItems='center'>
                <Box sx={{...styles.container}}>
                    <Stack justifyContent='flex-end' direction='row'>
                        <Box sx={{...styles.clubName}}>{home.clubName}</Box>
                        <Box sx={{...styles.homeText}}>{homeTitle}</Box>
                    </Stack>
                    <Box sx={{...styles.homeTeamName}}>{home.teamName}</Box>
                </Box>
                <Box sx={{
                    textAlign: 'center',
                    margin: '0 40px'
                }}>

                    <Typography sx={styles.gameState}>{gameState}</Typography>
                    <Stack direction={'row'} alignItems={'center'} spacing={2}>
                        <Typography mb={2} sx={styles.penaltyScore}>{getPenaltyScore(home.penaltyScore)}</Typography>
                        <Typography mb={2} sx={styles.score}>{home.score}</Typography>
                        <Typography mb={2} sx={styles.line}>-</Typography>
                        <Typography mb={2} sx={styles.score}>{away.score}</Typography>
                        <Typography mb={2} sx={styles.penaltyScore}>{getPenaltyScore(away.penaltyScore)}</Typography>
                    </Stack>
                </Box>
                <Box sx={{...styles.container}}>
                    <Stack direction='row'>
                        <Box sx={{...styles.awayText}}>{awayTitle}</Box>
                        <Box sx={{...styles.clubName}}>{away.clubName}</Box>
                    </Stack>
                    <Box sx={{...styles.awayTeamName}}>{away.teamName}</Box>
                </Box>
            </Stack>
        </Stack>

    )
}

export default TeamScoreCard