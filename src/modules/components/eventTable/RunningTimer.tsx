import React, {useEffect} from "react";
import {Typography} from "@mui/material";
import {formatSecondsToHms} from "@/modules/common/DisplayFormatConverter";
import {useClockDuration} from "@/utils/useClockDuration";

interface RunningTimerProps {
    sportType: string
    runningTime: number
    isClockRunning: boolean
    fontSize?: string | number
}

const RunningTimer = ({sportType, runningTime, isClockRunning, fontSize}: RunningTimerProps) => {
    const {eventDuration, setDuration, setIsClockRunning} = useClockDuration({sportType});

    useEffect(() => {
        setIsClockRunning(isClockRunning);
        setDuration(prevState => {
            if (prevState !== runningTime) {
                return runningTime;
            }
            return prevState
        });
    }, [isClockRunning, runningTime]);

    return (
        <Typography variant={'h5'} fontSize={fontSize}>{formatSecondsToHms(eventDuration)}</Typography>
    );
}

export default RunningTimer