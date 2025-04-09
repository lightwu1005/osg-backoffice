import React from "react";
import store from "@/modules/common/IdentityRedux";
import {Provider} from "react-redux";
import {StateProvider} from "@/utils/StateContext";
import {LanguageProvider} from "@/localizedConfig/LanguageContext";
import {NavigationProvider} from "@/utils/NavigationProvider";
import {OddsSubscriptionProvider} from "@/services/@odds/socket/events/OddsSubscriptionProvider";

export interface ProvidersProps {
    children: React.ReactNode;
    withProvider?: boolean
    withState?: boolean
    withLanguage?: boolean
    withNavigation?: boolean
}

export function ProvidersWithoutNavigation({children}: Readonly<{ children: React.ReactNode }>) {
    return <Providers withNavigation={false}>
        {children}
    </Providers>
}

export function Providers({
                              children,
                              withProvider = true,
                              withState = true,
                              withLanguage = true,
                              withNavigation = true
                          }: Readonly<ProvidersProps>) {
    const ThoughtProvider = ({children}: { children: React.ReactNode }) => {
        return withProvider ? <Provider store={store}>
            {children}
        </Provider> : children
    }
    const ThoughtState = ({children}: { children: React.ReactNode }) => {
        return withState ? <StateProvider>
            {children}
        </StateProvider> : children
    }
    const ThoughtLanguage = ({children}: { children: React.ReactNode }) => {
        return withLanguage ? <LanguageProvider>
            {children}
        </LanguageProvider> : children
    }

    const ThoughtNavigation = ({children}: { children: React.ReactNode }) => {
        return withNavigation ? <NavigationProvider>
            {children}
        </NavigationProvider> : children
    }
    return <ThoughtProvider>
        <ThoughtState>
            <ThoughtLanguage>
                <ThoughtNavigation>
                    <OddsSubscriptionProvider>
                        {children}
                    </OddsSubscriptionProvider>
                </ThoughtNavigation>
            </ThoughtLanguage>
        </ThoughtState>
    </ThoughtProvider>
}