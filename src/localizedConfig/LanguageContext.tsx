'use client'
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import {IntlProvider} from 'react-intl'
import loadMessages from "@/localizedConfig/loadMessaged"
import Loading from "@/app/loading";

export enum LocalizationFunctionType {
    API = 'api',
    Login = 'login',
    ForgetPassword = 'forgetPassword',
    ChangePassword = 'changePassword',
    EmailVerification = 'emailVerification',
    AccountSetting = 'accountSetting',
    SliderMenu = 'sliderMenu',
    LoggedInFrame = 'loggedInFrame',
    Dashboard = 'dashboard',
    Channel = 'channel',
    Permission = 'permission',
    Configuration = 'configuration',
    BetSlip = 'betSlip',
    Template = 'template',
    Event = 'event',
    Common = 'common',
    Member = 'member'
}

interface LanguageContextType {
    locale: string
    isLoaded: boolean
    switchLocale: (newLocale: string) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function getCurrentTranslationVersion() {
    return process.env.NEXT_PUBLIC_TRANSLATION_VERSION ?? '2.0'
}

function getLanguages() {
    return ['en', 'zh']
}

interface LanguageProviderProps {
    children: ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [locale, setLocale] = useState(() => {
        // If we are in the browser, check if the user has a saved locale
        if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
            const savedLocale = localStorage.getItem('appLocale');
            if (savedLocale) return savedLocale;

            // If not, use the browser's default locale
            let defaultLocale = navigator.language ?? 'en';
            defaultLocale = defaultLocale.split('-')[0];

            return getLanguages().includes(defaultLocale) ? defaultLocale : 'en';
        }
        return 'en';
    });
    const [messages, setMessages] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        document.documentElement.lang = locale

        const savedLocale = localStorage.getItem('appLocale') ?? locale
        const savedVersion = localStorage.getItem('translationVersion')
        const currentVersion = getCurrentTranslationVersion()

        const cacheKey = `${currentVersion}_${savedLocale}_messages`;
        const cachedMessages = localStorage.getItem(cacheKey)

        if (cachedMessages && savedVersion !== currentVersion) {
            setMessages(JSON.parse(cachedMessages))
            setIsLoaded(true)
        } else {
            loadMessages(savedLocale).then(loadedMessages => {
                localStorage.setItem(cacheKey, JSON.stringify(loadedMessages))
                localStorage.setItem('translationVersion', currentVersion)
                setMessages(loadedMessages)
                setIsLoaded(true)
            }).catch(e => {
                setError(`Error loading messages for locale ${savedLocale}: ${e.message}`)
                setIsLoaded(false)
            })
        }
    }, [locale]);

    const switchLocale = (newLocale: string) => {
        localStorage.setItem('appLocale', newLocale);
        setLocale(newLocale);
    };

    return (
        <LanguageContext.Provider value={{ locale, isLoaded, switchLocale }}>
            {/*/!* Only render the locale when the messages are ready*!/*/}
            {isLoaded ? (
                <IntlProvider locale={locale} messages={messages}>
                    {children}
                </IntlProvider>
            ) : (
                <Loading/>
            )}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
