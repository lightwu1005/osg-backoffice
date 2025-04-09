import { useCallback, useEffect, useRef, useState } from "react";
import { datadogLogs } from "@/config/Datadog";

/**
 * @param apiFunction - Function that will be called on each interval
 * @param interval - Interval in milliseconds
 * @param autoStart - If true, the function will start firing immediately
 */
interface UseAPIFiringHandlerProps {
    apiFunction: () => Promise<void>;
    interval: number;
    autoStart?: boolean;
}

const useAPIFiringHandler = ({
                                 apiFunction,
                                 interval,
                                 autoStart = false
                             }: UseAPIFiringHandlerProps) => {
    const [isFiring, setIsFiring] = useState(autoStart);
    const fireIdRef = useRef<NodeJS.Timeout | null>(null);
    const isRunningRef = useRef(false);
    const isFiringRef = useRef(isFiring);
    const cancelNextFireRef = useRef(false);

    const fire = useCallback(async () => {
        if (isRunningRef.current) return;
        if (cancelNextFireRef.current) {
            cancelNextFireRef.current = false;
            return;
        }
        isRunningRef.current = true;

        try {
            await apiFunction();
        } catch (error) {
            console.error("Error during API call:", error);
            datadogLogs.logger.error("Error during API call", {}, error instanceof Error ? error : new Error(String(error)));
        } finally {
            isRunningRef.current = false;
            if (isFiringRef.current) {
                fireIdRef.current = setTimeout(fire, interval);
            }
        }
    }, [apiFunction, interval]);

    const startFire = useCallback(() => {
        if (fireIdRef.current) return;
        setIsFiring(true);
        fire();
    }, [fire]);

    const cancelFire = useCallback(() => {
        cancelNextFireRef.current = true;
        if (fireIdRef.current) {
            clearTimeout(fireIdRef.current);
            fireIdRef.current = null;
        }
    }, []);

    const stopFire = useCallback(() => {
        if (fireIdRef.current) {
            clearTimeout(fireIdRef.current);
            fireIdRef.current = null;
        }
        setIsFiring(false);
    }, []);

    useEffect(() => {
        isFiringRef.current = isFiring;
    }, [isFiring]);

    useEffect(() => {
        if (isFiring) {
            if (fireIdRef.current) {
                clearTimeout(fireIdRef.current);
            }
            fireIdRef.current = setTimeout(fire, interval);
        }
        return () => {
            if (fireIdRef.current) {
                clearTimeout(fireIdRef.current);
            }
        };
    }, [interval, isFiring, fire]);

    return { startFire, cancelFire, stopFire, isFiring };
};

export default useAPIFiringHandler;