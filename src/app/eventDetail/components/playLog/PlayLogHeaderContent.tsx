import {Box, Card, CardMedia, IconButton, Stack, Typography,} from "@mui/material";
import TeamScoreCard from "@/app/eventDetail/components/playLog/TeamScoreCard";
import GameSectionScoreboard, {PeriodScore} from "@/app/eventDetail/components/playLog/GameSectionScoreboard";
import StatisticSummary, {StatisticSummaryProps} from "@/app/eventDetail/components/playLog/StatisticSummary";
import {PlayLogSummaryModel} from "@/services/@core/module/ResponseDataModels";
import TimeClockChip from "@/app/eventDetail/components/playLog/TimeClockChip";
import VideocamIcon from '@mui/icons-material/Videocam';
import CloseIcon from '@mui/icons-material/Close';
import React, {useEffect, useState} from "react";
import Draggable, {DraggableData, DraggableEvent, DraggableEventHandler} from 'react-draggable';
import LoadingAnimation from "@/modules/components/general/LoadingAnimation";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {PlayLogPeriodType} from "@/services/@core/module/Enum";

interface PlayLogHeaderContentProps {
    isLoading: boolean
    summaryData?: PlayLogSummaryModel
    statistics: StatisticSummaryProps[]
    scores: PeriodScore[]
    duration?: number
}

const PlayLogHeaderContent = ({
                                  isLoading,
                                  summaryData,
                                  statistics,
                                  scores,
                                  duration,
                              }: PlayLogHeaderContentProps) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [position, setPosition] = useState({x: 0, y: 0});
    const [homeScore, setHomeScore] = useState(0);
    const [awayScore, setAwayScore] = useState(0);
    const [homePenalty, setHomePenalty] = useState<number>()
    const [awayPenalty, setAwayPenalty] = useState<number>()

    const open = Boolean(anchorEl);

    const intl = useIntl();
    const funType = LocalizationFunctionType.Event;

    const handleButtonOnClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setPosition(({x: 0, y: 0}))
    };
    const handleDragStop: DraggableEventHandler = (e: DraggableEvent, data: DraggableData) => {
        setPosition({x: data.x, y: data.y});
    };
    const handleClose = () => {
        setAnchorEl(null);
        setPosition(({x: 0, y: 0}))
    };

    useEffect(() => {
        const getLastPeriodScores = (summaryData: PlayLogSummaryModel | undefined) => {
            const lastPeriod = summaryData?.periodScores.at(-1);
            const homeScore = Number(lastPeriod?.home ?? 0);
            const awayScore = Number(lastPeriod?.away ?? 0);
            return {homeScore, awayScore};
        };

        const {homeScore, awayScore} = getLastPeriodScores(summaryData);
        setHomeScore(homeScore);
        setAwayScore(awayScore);

        const getPenaltyScores = (summaryData: PlayLogSummaryModel | undefined) => {
            const penaltyScores = summaryData?.periodScores.find(period => period.name === PlayLogPeriodType.PENALTIES)
            const homePenaltyScore = Number(penaltyScores?.home)
            const awayPenaltyScore = Number(penaltyScores?.away)
            return {homePenaltyScore, awayPenaltyScore}
        }

        const {homePenaltyScore, awayPenaltyScore} = getPenaltyScores(summaryData)
        setHomePenalty(homePenaltyScore)
        setAwayPenalty(awayPenaltyScore)

    }, [summaryData]);
    return (
        <Stack direction={'column'}
               sx={{
                   backgroundColor: '#F0F4F8',
                   '[data-mui-color-scheme="dark"] &': {
                       backgroundColor: '#0B121F',
                   },
               }}
               paddingY={5}
               spacing={2}
        >
            <Box sx={{position: 'absolute', right: 36}}>
                <TimeClockChip seconds={duration ?? summaryData?.eventDuration ?? 0} />
                {summaryData?.animationLink &&
                    <IconButton
                        data-testid={'videoIconButton'}
                        sx={{
                            color: '#636B74',
                            backgroundColor: '#FEFFFF',
                            '[data-mui-color-scheme="dark"] &': {
                                color: '#9FA6AD',
                                backgroundColor: '#092A52',
                            },
                            width: 32,
                            height: 32,
                            marginLeft: 2
                        }}
                        onClick={handleButtonOnClick}
                    >
                        <VideocamIcon/>
                    </IconButton>
                }
            </Box>
            <TeamScoreCard
                leagueName={summaryData?.leagueName ?? ''}
                displayType={summaryData?.competitors.type.toLowerCase() ?? 'team'}
                gameState={summaryData?.currentPeriodName ?? ''}
                home={{
                    teamName: summaryData?.competitors.homeName ?? '',
                    clubName: summaryData?.competitors.homeClubName ?? '',
                    score: homeScore,
                    penaltyScore: homePenalty
                }}
                away={{
                    teamName: summaryData?.competitors.awayName ?? '',
                    clubName: summaryData?.competitors.awayClubName ?? '',
                    score: awayScore,
                    penaltyScore: awayPenalty
                }}
            />
            <StatisticSummary data={statistics}/>
            <GameSectionScoreboard
                homeName={summaryData?.competitors.type.toLowerCase() === 'team'
                    ? intl.formatMessage({id: `${funType}.h`, defaultMessage: 'H'})
                    : summaryData?.competitors.homeName ?? ''}
                awayName={summaryData?.competitors.type.toLowerCase() === 'team'
                    ? intl.formatMessage({id: `${funType}.a`, defaultMessage: 'A'})
                    : summaryData?.competitors.awayName ?? ''}
                periods={scores}
            />
            {(open && summaryData?.animationLink) && (
                <Draggable
                    position={position}
                    onStop={handleDragStop}
                >
                    <Card data-testid={'videoCard'} sx={{position: 'absolute', zIndex: 1500}}>
                        <Box marginLeft={2}
                             flexDirection={'row'}
                             alignItems={'center'}
                             justifyContent={'space-between'}
                             sx={{display: 'flex'}}
                        >
                            <Typography>{summaryData?.eventName}</Typography>
                            <IconButton data-testid={'videoCardCloseButton'} onClick={handleClose}>
                                <CloseIcon/>
                            </IconButton>
                        </Box>
                        <CardMedia
                            sx={{padding: 1, borderWidth: 0}}
                            component="iframe"
                            height="300"
                            src={summaryData?.animationLink}
                        />
                    </Card>
                </Draggable>
            )}
            <LoadingAnimation isLoading={isLoading}/>
        </Stack>
    )
}

export default PlayLogHeaderContent