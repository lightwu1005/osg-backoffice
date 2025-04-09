import {useEffect, useRef, useState} from "react";
import {countdownTimerSports} from "@/app/eventDetail/models/EventDetailUtils";
import {Timeout} from "react-number-format/types/types";

interface TimerProps {
    duration: number;
    isClockRunning: boolean;
    countdown?: boolean;
}

export interface ClockDurationProps {
    sportType?: string;
    initialDuration?: number;
    initialIsClockRunning?: boolean;
}

const useTimer = ({ duration, isClockRunning, countdown = true }: TimerProps) => {
    const [eventDuration, setEventDuration] = useState<number>(duration);
    const timerRef = useRef<Timeout | null>(null);

    const clearTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    useEffect(() => {
        if (isClockRunning) {
            clearTimer();
            timerRef.current = setInterval(() => {
                setEventDuration((prev) =>
                    countdown ? Math.max(prev - 1, 0) : prev + 1
                );
            }, 1000);
        } else if (timerRef.current) {
            clearTimer();
        }

        return () => clearTimer();
    }, [isClockRunning, countdown]);

    useEffect(() => {
        setEventDuration(duration); // Reset duration on initialDuration change
    }, [duration]);

    return eventDuration;
};

export const useClockDuration = ({initialDuration = 0, sportType = '', initialIsClockRunning = false}: ClockDurationProps) => {
    const [isClockRunning, setIsClockRunning] = useState(initialIsClockRunning);
    const [duration, setDuration] = useState(initialDuration);
    const [isCountdown, setIsCountdown] = useState<boolean>(false)

    const eventDuration = useTimer({
        duration,
        isClockRunning,
        countdown: isCountdown,
    });

    useEffect(() => {
        if (sportType.length > 0) {
            setIsCountdown(countdownTimerSports.some(item => item === sportType.toUpperCase()))
        }
    }, [sportType]);

    // Restart timer when duration changes
    useEffect(() => {
        if (isClockRunning) {
            setIsClockRunning(false); // Pause the timer
            setTimeout(() => setIsClockRunning(true), 0); // Restart it with the new duration
        }
    }, [duration, isClockRunning]);

    return {eventDuration, setDuration, isClockRunning, setIsClockRunning};
}