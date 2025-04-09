import { useRef, useEffect } from 'react';
import { useStateContext } from './StateContext';

export function useMemorizeRef<T>(key: string, initialValue?: T): { current: T } {
    const { pageState, update } = useStateContext();
    const localRef = useRef<T | undefined>(initialValue);

    useEffect(() => {
        if (pageState && key in pageState) {
            localRef.current = pageState[key];
        } else {
            update(key, initialValue);
        }
    }, []);

    const refProxy = new Proxy(localRef, {
        get(target, prop) {
            if (prop === 'current') {
                return key in pageState ? pageState[key] : target.current;
            }
            return Reflect.get(target, prop);
        },
        set(target, prop, value) {
            if (prop === 'current') {
                update(key, value);
                target.current = value;
                return true;
            }
            return Reflect.set(target, prop, value);
        }
    });

    return refProxy as { current: T };
}