import {Avatar, Box, Divider, Stack, Typography} from "@mui/material";
import React from "react";
import MarketLineContainer, {MarketLineContainerProps} from "@/app/eventList/components/pageComponent/MarketLineContainer";

export interface OtherLinesDrawerContentProps extends MarketLineContainerProps {
    title: string
    subTitle: string
    homeName: string
    awayName: string
}

const TeamInfo = ({name, isHomeTeam}: {name: string, isHomeTeam: boolean}) => {
    return (
        <Stack spacing={1} alignItems={'center'} direction={'row'}>
            <Avatar key={`${name}-avatar`}
                    sizes={'small'}
                    sx={{ width: '1.5rem', height: '1.5rem', backgroundColor: isHomeTeam ? '#0B6BCB' : '#C41C1C', color: '#FFFFFF'}}
            >
                <Typography key={`${name}-key`}>
                    {isHomeTeam ? 'H' : 'A'}
                </Typography>
            </Avatar>
            <Typography key={`${name}-team`} color={'text.secondary'}>
                {name}
            </Typography>
        </Stack>
    )
}
const OtherLinesDrawerContent = (props : OtherLinesDrawerContentProps) => {
    const { homeName, awayName } = props

    return (<Box>
        <Stack direction={'row'} spacing={1} padding={2}>
            <TeamInfo name={homeName ?? ''} isHomeTeam={true}/>
            <TeamInfo name={awayName ?? ''} isHomeTeam={false}/>
        </Stack>
        <Divider/>
        <MarketLineContainer defaultExpanded={true} stopExpandedChange={true} {...props}/>
    </Box>)
}

export default OtherLinesDrawerContent;