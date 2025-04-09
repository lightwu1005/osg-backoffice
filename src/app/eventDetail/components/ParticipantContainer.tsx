import {Avatar, Box, Stack, Typography} from "@mui/material";
import React from "react";
import {CardModel, ExtraScore} from "@/services/@core/module/ResponseDataModels";
import {PenaltyIcon} from "@/app/eventDetail/components/playLog/PenaltyIcon";
import {formatSecondsToHms} from "@/modules/common/DisplayFormatConverter";
import {ExtraScoreType} from "@/services/@core/module/Enum";

/**
 * @param home Represent the home team data
 * @param away Represent the away team data
 * @param periodName Represent the name of the period
 * @param duration Represent the duration of the period
 * @param switchToHomeTeam Represent the state of switching to home team (used for socket to change the UI status)
 * @param switchToAwayTeam Represent the state of switching to away team (used for socket to change the UI status)
 * @param isFixedToTop Used for fixed top bar (e.g. in play by play log page)
 * */
export interface ParticipantContainerProps {
    home: Participant
    away: Participant
    periodName?: string
    duration?: number
    switchToHomeTeam?: boolean
    switchToAwayTeam?: boolean
    isFixedToTop?: boolean
}

export interface Participant {
    name: string
    score: number
    cards?: CardModel[]
    extraScores?: ExtraScore[]
}

const ParticipantSection = ({name, cards, isHomeTeam}: Participant & { isHomeTeam: boolean }) => {
    let items;
    items = [
        <Avatar key={`${name}-avatar`}
                sx={{backgroundColor: isHomeTeam ? '#0B6BCB' : '#C41C1C', color: '#FFFFFF'}}
        >
            {isHomeTeam ? 'H' : 'A'}
        </Avatar>,
        <Typography data-testid='participantName' key={`${name}-team`} variant='h4' color='text.secondary'>
            {name}
        </Typography>
    ]

    if (cards) {
        items.push(
            <Stack key={`${name}-cards`} direction={'row'} alignItems='center'>
                {
                    cards.toSorted((a, b) => a.cardType.localeCompare(b.cardType)).map((card) => (
                        <Box key={`cards-${card.cardType}`} sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 0.5,
                        }}>
                            <PenaltyIcon key={card.cardType} type={card.cardType}/>
                            <Box paddingRight={0.5}></Box>
                            <Typography variant={'body1'}>{card.cardCount}</Typography>
                        </Box>
                    ))
                }
            </Stack>
        )
    }

    return (
        <Stack spacing={1} alignItems={'center'} direction={'row'}>
            {isHomeTeam ? items : items.toReversed()}
        </Stack>
    );
}

type TypographyType = 'score' | 'divider' | 'period' | 'timer' | 'extraScore'

function EventStateTypography({ text, type = 'score' }: { readonly text: any, readonly type?: TypographyType }) {
    const getStyle = () => {
        switch (type) {
            case 'score':
            case 'divider':
                return {
                    fontSize: '3rem',
                    fontWeight: 700,
                    color: type === 'score' ? '#12467B' : '#555E68'
                }
            case 'extraScore':
                return {
                    fontSize: '2.215rem',
                    fontWeight: 600,
                    family: 'Inter',
                    color: 'text.secondaryChannel'
                }
            case 'period':
                return {
                    fontSize: '1.25rem',
                    fontWeight: 500,
                    color: '#555E68'
                }
            case 'timer':
            default:
                return {
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    color: 'text.secondary'
                }
        }
    }

    return (<Typography sx={getStyle}>{text}</Typography>)
}

const EventStateSection = ({home, away, periodName, duration }: ParticipantContainerProps) => {
    const homePenaltyScore = (home.extraScores ?? []).find(extraScore => extraScore.type === ExtraScoreType.PENALTIES)?.score
    const awayPenaltyScore = (away.extraScores ?? []).find(extraScore => extraScore.type === ExtraScoreType.PENALTIES)?.score
    return (
        <Stack spacing={0.5} alignItems='center' justifyContent='center'>
            <Stack data-testid='score' spacing={1} direction='row' display={"flex"} alignItems={"center"}>
                <EventStateTypography text={homePenaltyScore !== undefined ? `(${homePenaltyScore})` : ''} type={'extraScore'}/>
                <EventStateTypography text={home.score}/>
                <EventStateTypography text={'-'} type={'divider'}/>
                <EventStateTypography text={away.score}/>
                <EventStateTypography text={awayPenaltyScore !== undefined ?`(${awayPenaltyScore})` : ''} type={'extraScore'}/>
            </Stack>
            <Stack spacing={1} direction='row' alignItems='center' justifyContent='center'>
                <EventStateTypography text={periodName} type={'period'}/>
                {duration ? <Typography variant={'h5'}>{formatSecondsToHms(duration)}</Typography> : null}
            </Stack>
        </Stack>
    );
}

const ParticipantContainer = ({home, away, periodName, duration, switchToHomeTeam, switchToAwayTeam, isFixedToTop}: ParticipantContainerProps) => {
    return (
        <Stack data-testid={'top-bar-section'}
               direction={'row'}
               sx={{
                   backgroundColor: '#FFFFFF',
                   '[data-mui-color-scheme="dark"] &': {
                       backgroundColor: '#0B121F',
                   },
                   display: 'flex',
                   justifyContent: "space-between",
                   alignItems: "center",
                   width: '-webkit-fill-available',
                   paddingY: isFixedToTop ? 2 : 1,
                   ...isFixedToTop && {
                       zIndex: 999,
                       position: 'fixed',
                       top: 0,
                       boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.16)'
                   }
               }}
        >
            <Stack direction={'row'} sx={{paddingLeft: 3, alignItems: 'center', flex: 1, justifyContent: 'flex-start'}}
                 borderLeft={switchToHomeTeam ? '5px solid #0B6BCB' : undefined}>
                <ParticipantSection {...home} isHomeTeam={true}/>
            </Stack>
            <Box>
                <EventStateSection home={home} away={away} periodName={periodName} duration={duration}/>
            </Box>
            <Stack direction={'row'} sx={{paddingRight: 3, alignItems: 'center', flex: 1, justifyContent: 'flex-end'}}
                 borderRight={switchToAwayTeam ? '5px solid #C41C1C' : undefined}>
                <ParticipantSection {...away} isHomeTeam={false}/>
            </Stack>
        </Stack>
    )
}

export default ParticipantContainer