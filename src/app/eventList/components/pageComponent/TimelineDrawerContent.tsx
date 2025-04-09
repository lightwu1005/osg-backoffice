import {Box, Divider, Stack} from "@mui/material";
import React from "react";
import TimelinePage, {TimelinePageProps} from "@/app/eventDetail/components/playLog/pageComponent/TimelinePage";

const TimelineDrawerContent = (props: TimelinePageProps) => {
    // default state is 'Goals' for soccer, 'Points' for basketball as required
    const defaultStates = props.sportType.toLowerCase() === 'soccer' ? 'Goals' : 'Points';

    return (<Box>
        <Divider/>
        <Stack spacing={1} padding={2}>
            <TimelinePage {...props} defaultStates={[defaultStates]}/>
        </Stack>
    </Box>);
}

TimelineDrawerContent.displayName = 'TimelineDrawerContent';
export default TimelineDrawerContent;