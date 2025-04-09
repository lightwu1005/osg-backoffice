import React, {useEffect} from 'react';
import {Box, Stack} from '@mui/material';
import {
    NotificationSnackbarContent,
    NotificationSnackbarContentProps,
} from "@/modules/components/snackbar/NotificationSnackbar";
import {GlobalController, IEventHandler} from "@/modules/common/GlobalController";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import './NotificationAnimation.css'
import {useNavigationProvider} from "@/utils/NavigationProvider";
import {PageType} from "@/services/@core/module/Enum";

export const MultipleNotificationSnackbar = () => {
    const [notifications, setNotifications] = React.useState<NotificationSnackbarContentProps[]>([]);
    const globalController = GlobalController.getInstance()
    const {normalProvider} = useNavigationProvider()

    const push = (props: NotificationSnackbarContentProps) => {
        setNotifications((prevNotifications) => [{
            ...props
        }, ...prevNotifications])
    }

    const pop = (notificationProps: NotificationSnackbarContentProps) => {
        setNotifications((prevNotifications) => prevNotifications.filter(item => item !== notificationProps))
    }

    const notificationHandler: IEventHandler<string, NotificationSnackbarContentProps> = {
        key(): string {
            return GlobalController.KEY_NOTIFICATION_SNACKBAR;
        },
        receive(props: NotificationSnackbarContentProps): void {
            push(props)
        }
    }

    const handleClick = (id: string) => {
        normalProvider.normalNavigation(`${PageType.EventList}/${id}`)
    }

    useEffect(() => {
        globalController.subscribe(notificationHandler)

        return () => {
            globalController.unsubscribe(notificationHandler)
        }
    }, []);

    useEffect(() => {
        console.log(`${notifications}`)
    }, [notifications]);

    return <Stack alignItems={"flex-end"} sx={{
        position: 'absolute',
        right: 10,
        top: 10,
    }}>
        <TransitionGroup>
            {
                notifications.map((props, index) => (
                    <CSSTransition
                        key={props.id}
                        timeout={300}
                        unmountOnExit
                        classNames="notification"
                    >
                        <Box sx={{display: 'flex', justifyContent: 'flex-end', marginBottom: 1 }}>
                            <NotificationSnackbarContent
                                {...props}
                                onClick={handleClick}
                                onClose={() => pop(props)}
                            />
                        </Box>
                    </CSSTransition>
                ))
            }
        </TransitionGroup>
    </Stack>
};

export default MultipleNotificationSnackbar;
