"use client"
import React, {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import {Avatar, Stack, Typography} from "@mui/material";
import SlideMenu from "@/modules/components/slideMenu/SlideMenu";
import {usePathname} from "next/navigation";
import SliderMenuItems, {MenuDataItem} from "@/modules/components/slideMenu/SlideMenuData";
import store, {persistor} from "@/modules/common/IdentityRedux";
import ToastAlert, {ToastAlertInfo} from "@/modules/components/snackbar/ToastAlert";
import ActionButton, {ActionItem} from "@/modules/components/buttons/actionButton/ActionButton";
import LoadingAnimation from "@/modules/components/general/LoadingAnimation";
import AccountSetting from "@/app/accountSetting/components/pageConponent/AccountSetting";
import {GlobalController, IEventHandler} from "@/modules/common/GlobalController";
import {PersistGate} from "redux-persist/integration/react";
import {useTheme} from "@/app/ThemeWrapper";
import useLoginRepository from "@/services/@login/repository/useLoginRepository";
import {toLogoutProps} from "@/app/login/models/RequestDataMapping";
import Cookies from "js-cookie";
import MultipleNotificationSnackbar from "@/modules/components/snackbar/MultipleNotificationSnackbar";
import {useNavigationProvider} from "@/utils/NavigationProvider";
import {Functionality, PageType} from "@/services/@core/module/Enum";
import PermissionHandler from "@/modules/common/PermissionHandler";
import {getCombineSplitStringsFromCookie} from "@/services/@core/module/LongTokenHandler";
import {IntlShape, useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {Providers} from "@/utils/Providers";
import {
    AppDateFormat,
    getUtcOffsetInHours,
    initTimeZone,
} from "@/app/DayjsConfiguration";
import dayjs from "dayjs";
import SocketTestFloating from "@/modules/common/SocketTestFloating";

const flattenMenu = (menu: MenuDataItem[]): MenuDataItem[] => {
    const flatMenu: MenuDataItem[] = [];

    menu.forEach(item => {
        flatMenu.push({...item, children: undefined});

        if (item.children) {
            flatMenu.push(...flattenMenu(item.children));
        }
    });

    return flatMenu;
};

const RealTimeClock = ({intl}: { intl: IntlShape }) => {
    const [currentTime, setCurrentTime] = useState<string>(() => {
        return dayjs.tz().toLocalized(AppDateFormat.LONG_WITH_SECONDS)
    });
    const currentUtcOffsetInHours = getUtcOffsetInHours();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(dayjs.tz().toLocalized(AppDateFormat.LONG_WITH_SECONDS));
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Typography>
            {
                intl.formatMessage({
                    id: `${LocalizationFunctionType.LoggedInFrame}.utcTime`,
                    defaultMessage: 'UTC {offset}: {time}'
                }, {
                    offset: currentUtcOffsetInHours,
                    time: currentTime
                })
            }
        </Typography>
    );
};

function LoggedInFrame({children}: { children: React.ReactNode }) {
    return <Providers>
        <ProvidedLoggedInFrame>
            {children}
        </ProvidedLoggedInFrame>
    </Providers>
}

function ProvidedLoggedInFrame({children}: Readonly<{ children: React.ReactNode }>) {
    const intl = useIntl();
    const funType = LocalizationFunctionType.LoggedInFrame;
    const funMenuType = LocalizationFunctionType.SliderMenu;
    const flatMenuItems = flattenMenu(SliderMenuItems);
    const pathname = usePathname();
    const {toggleTheme} = useTheme();
    const [isSlideMenuOpen, setIsSlideMenuOpen] = useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    const [alertInfo, setAlertInfo] = React.useState<ToastAlertInfo>({severity: 'error', show: false, message: ''});
    const [showDialog, setShowDialog] = React.useState<boolean>(false);
    const currentPaths = pathname ? pathname.split('/') : [];
    const currentMenuItem = flatMenuItems.find(item => currentPaths.includes(item.path as string));
    const currentPageName = currentMenuItem?.title ?? currentPaths.pop();
    const isFunctionPages = flatMenuItems.map((item) => item.title).includes(currentPageName ?? '') || currentPageName === '';
    const [isAccessAblePage, setIsAccessAblePage] = useState<boolean>(false);
    const globalController = GlobalController.getInstance();
    const {userLogout} = useLoginRepository();
    const {normalProvider} = useNavigationProvider();

    const logout = async () => {
        return await userLogout(toLogoutProps(getCombineSplitStringsFromCookie('a') || ''))
    }

    const toastAlertHandler: IEventHandler<string, ToastAlertInfo> = {
        key(): string {
            return GlobalController.KEY_TOAST_ALERT;
        },
        receive(alertInfo: ToastAlertInfo): void {
            if (alertInfo.message) {
                setAlertInfo(alertInfo)
            }
        }
    }

    enum AvatarOptions {
        Edit = 0,
        Logout,
        Mode
    }

    const AvatarOptionItems = [
        {
            key: 'edit',
            value: intl.formatMessage({id: `${funType}.accountSetting`, defaultMessage: 'Account Setting'})
        },
        {
            key: 'logout',
            value: intl.formatMessage({id: `${funType}.signOut`, defaultMessage: 'Sign out'})
        },
        {
            key: 'mode',
            value: intl.formatMessage({id: `${funType}.lightDarkMode`, defaultMessage: 'Light/ Dark Mode'})
        }
    ]


    const stringToColor = (string: string) => {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    };

    const stringAvatar = (name: string) => {
        // Split the string by spaces
        const parts = name.trim().split(/\s+/);

        // If the string contains spaces, return the first character of the first and last part.
        // If there is no space, return the first character of the string.
        const nameAvatar = (parts.length > 1) ? parts[0][0] + parts[parts.length - 1][0] : parts[0][0];

        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: nameAvatar.toUpperCase(),
        };
    };

    const handleAvatarClick = async (item: ActionItem, index: number) => {
        setAlertInfo({severity: 'error', show: false, message: ''});
        setIsLoading(true);

        switch (index) {
            case AvatarOptions.Edit:
                setIsLoading(false);
                setShowDialog(true)
                break;
            case AvatarOptions.Logout: {
                const loginQuery = Cookies.get('c') ?? undefined;
                const useLoginQuery = loginQuery && loginQuery !== 'undefined' && process.env.FUNCTIONALITY !== Functionality.Admin
                try {
                    await logout();
                } finally {
                    setIsLoading(false);
                    if (useLoginQuery) {
                        normalProvider.normalNavigation(PageType.Login, {'c': loginQuery});
                    } else {
                        normalProvider.normalNavigation(PageType.Login);
                    }
                    setAlertInfo({
                        severity: 'success',
                        show: true,
                        message: intl.formatMessage({
                            id: `${funType}.signOutSuccess`,
                            defaultMessage: 'Sign out successfully!'
                        })
                    });
                    setTimeout(() => {
                        setAlertInfo(prev => ({...prev, show: false}));
                    }, 1000);
                }
            }
                break;
            case AvatarOptions.Mode: {
                setIsLoading(false);
                toggleTheme();
            }
                break;
        }
    };

    const avatarActionButton = () => {
        return (
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography data-testid="usernameDisplay" noWrap>
                    {store.getState().un}
                </Typography>
                <Avatar data-testid="avatarActionButton" {...stringAvatar(`${store.getState().un}`)}/>
            </Stack>
        )
    }

    useEffect(() => {
        initTimeZone()
    }, []);

    useEffect(() => {
        globalController.subscribe(toastAlertHandler)
    }, []);

    useEffect(() => {
        const handleStateChange = () => {
            const functionality = process.env.FUNCTIONALITY ?? '';
            const {isAccessAble: checkAccess} = PermissionHandler();
            const pageName = pathname.split('/')[1];

            const access = checkAccess(functionality, pageName);
            setIsAccessAblePage(access);
        };
        handleStateChange();

        const unsubscribe = store.subscribe(handleStateChange);

        return () => unsubscribe();
    }, [pathname, store]);

    return (
        <Box>
            {(!isFunctionPages || !isAccessAblePage) ?
                <PersistGate loading={null} persistor={persistor}>
                    <Stack direction="column" sx={{flexGrow: 1, p: 3, pt: 2}}>
                        <Box component="main">
                            {children}
                        </Box>
                    </Stack>
                </PersistGate>
                :
                <>
                    <PersistGate loading={null} persistor={persistor}>
                        <SlideMenu open={isSlideMenuOpen} setOpen={setIsSlideMenuOpen}/>
                        <Stack direction="column" sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            ml: (isSlideMenuOpen ? '256px' : '65px'),
                            transition: 'margin-left 0.3s'
                        }}>
                            <Box component="main" sx={{
                                paddingLeft: 2,
                                height: '100vh',
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                <Stack sx={{paddingX: 3}} direction="row" justifyContent="space-between"
                                       alignItems="center">
                                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                        <Typography data-testid="pageTitle" variant="h4" noWrap>
                                            {
                                                intl.formatMessage({
                                                    id: `${funMenuType}.${currentMenuItem?.localizationKey}`,
                                                    defaultMessage: currentPageName
                                                })
                                            }
                                        </Typography>
                                        <RealTimeClock intl={intl}/>
                                    </Stack>
                                    <ActionButton label={avatarActionButton()} list={AvatarOptionItems}
                                                  onItemClick={handleAvatarClick}/>
                                </Stack>

                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        minHeight: 0,
                                    }}
                                >
                                    {children}
                                </Box>
                            </Box>
                        </Stack>
                        <AccountSetting
                            open={showDialog}
                            setOpen={setShowDialog}/>
                        <LoadingAnimation isLoading={isLoading}/>
                    </PersistGate>
                </>
            }
            <ToastAlert
                alertInfo={alertInfo}
                position={{vertical: 'top', horizontal: 'center'}}
                closeAlert={() => setAlertInfo({...alertInfo, show: false})}/>
            <MultipleNotificationSnackbar/>
            <SocketTestFloating/>
        </Box>
    );
}

export default LoggedInFrame;
