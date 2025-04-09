import React, {createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import isEqual from "lodash/isEqual";
import IdentityHandler from "@/modules/common/IdentityHandler";
import store, {setPageState} from "@/modules/common/IdentityRedux";
import {usePathname} from "next/navigation";

const TAG = 'tag';
export interface PageState {
    [key: string]: any;
}

interface StateContextType {
    readonly pageState: PageState;
    get: (key: string) => string | PageState | undefined;
    update: (key: string, value: any) => void;
    remove: (key: string | string[]) => void;
    clear: () => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider = ({children}: { children: ReactNode }) => {
    const pathname = usePathname();
    const {pageState} = IdentityHandler();
    const tag = useRef(pathname)
    const [_pageState, _setPageState] = useState<PageState>(() => {
        if (typeof window !== 'undefined') {
            const isRefresh = sessionStorage.getItem(TAG) === tag.current
            if (isRefresh) {
                store.dispatch(setPageState({}));
                return {};
            } else {
                return pageState;
            }
        }
        return {};
    });

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            sessionStorage.setItem(TAG, tag.current);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        if (isEqual(_pageState, pageState)) return
        store.dispatch(setPageState(_pageState));
    }, [_pageState]);

    const get = useCallback((key: string): string | PageState | undefined => {
        return _pageState?.[tag.current]?.[key]
    }, [_pageState]);

    const update = useCallback((key: string, value: any) => {
        _setPageState(prevState => {
            return {
                ...prevState,
                [tag.current]: {
                    ...prevState[tag.current],
                    [key]: value
                }
            };
        });
    }, []);

    const remove = useCallback((keys: string | string[]) => {
        _setPageState(prevState => {
            const newState = {...prevState[tag.current]};
            if (Array.isArray(keys)) {
                keys.forEach(key => delete newState[key]);
            } else {
                delete newState[keys];
            }
            return {
                ...prevState,
                [tag.current]: newState
            };
        });
    }, []);

    const clear = useCallback(() => {
        _setPageState(pageState => {
            if (isEqual(pageState, {})) {
                return pageState;
            }
            store.dispatch(setPageState({}));
            return {};
        });
    }, []);

    useEffect(() => {
        tag.current = pathname
    }, [pathname]);

    const contextValue = useMemo(() => ({
        pageState: _pageState[tag.current],
        get,
        update,
        remove,
        clear
    }), [_pageState, get, update, remove, clear]);

    return <StateContext.Provider value={contextValue}>
        {children}
    </StateContext.Provider>

};

export const useStateContext = (): StateContextType => {
    const context = useContext(StateContext);
    if (context === undefined) {
        throw new Error('useStateContext must be used within a StateProvider');
    }
    return context;
};