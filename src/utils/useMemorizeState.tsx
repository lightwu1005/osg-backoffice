import {useCallback, useEffect, useState} from 'react';
import {useStateContext} from './StateContext';

export function useMemorizeState<T>(key: string, initialValue?: T, shouldInitialize?: () => boolean): [T, (value: T | ((prevState: T) => T)) => void] {
    const { pageState, update } = useStateContext();
    const [localState, setLocalState] = useState<T>(() => {
        if (shouldInitialize?.()) {
            return initialValue;
        } else {
            return (pageState && key in pageState) ? pageState[key] : initialValue;
        }
    });

    useEffect(() => {
        if (pageState && key in pageState) {
            setLocalState(pageState[key]);
        }
    }, [pageState, key]);

    const setValue = useCallback((value: T | ((prevState: T) => T)) => {
        let newValue = value instanceof Function ? value(localState) : value;
        setLocalState(newValue);
        update(key, newValue);
    }, [key, localState, update]);

    return [localState, setValue];
}