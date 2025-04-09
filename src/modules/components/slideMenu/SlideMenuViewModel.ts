import useNotificationRepository from "@/services/@notification/repository/useNotificationRepository";
import {useCallback, useEffect, useState} from "react";
import IdentityHandler from "@/modules/common/IdentityHandler";
import {Functionality, PageType} from "@/services/@core/module/Enum";
import SliderMenuItems, {MenuDataItem} from "@/modules/components/slideMenu/SlideMenuData";
import PermissionHandler from "@/modules/common/PermissionHandler";
import {debounce} from "lodash";

const useSlideMenuViewModel = () => {
    const notificationRepo = useNotificationRepository();
    const {userUUID} = IdentityHandler();
    const userFunctionality = process.env.FUNCTIONALITY ?? '';
    const {accessMap} = PermissionHandler()
    const [userIsValid, setUserIsValid] = useState(true);
    const [unreadNumber, setUnreadNumber] = useState(0);
    const [slideMenuItems, setSlideMenuItems] = useState<MenuDataItem[]>([]);
    const [retryCount, setRetryCount] = useState(0);
    const maxRetries = 1;

    const updateUnreadNumber = useCallback(() => {
        if (retryCount >= maxRetries) {
            return;
        }
        notificationRepo.getNotificationUnreadNumber()
            .then((resp) => {
                setUnreadNumber(resp.totalUnread);
                setRetryCount(0);
            })
            .catch(() => {
                setUnreadNumber(0);
                setRetryCount(prev => prev + 1);
            });
    }, [notificationRepo]);

    const update = useCallback(debounce((reset: boolean) => {
        if (reset) {
            setRetryCount(0);
        }
        updateUnreadNumber();
    }, 1000), [updateUnreadNumber]);

    useEffect(() => {
        if (userUUID) {
            update(true);
        } else {
            setUserIsValid(false);
        }
        return () => {
            update.cancel();
        };

    }, [userUUID]);

    const generateLocalizationTitle = (item: MenuDataItem) => {
        return {
            ...item,
            title: item.title,
            children: item.children ? item.children.map(child => ({
                ...child,
                title: child.title
            })) : undefined
        }
    }

    const reloadSlideMenuItems = (userFunctionality: Functionality) => {
        const accessiblePages = accessMap[userFunctionality] || [];
        return SliderMenuItems.filter(item => {
            if (accessiblePages.includes(item.path as PageType)) {
                return true;
            }
            if (item.children) {
                return item.children.some(child => accessiblePages.includes(child.path as PageType));
            }
            return false;
        }).map(item => {
            if (item.children && item.children.some(child => accessiblePages.includes(child.path as PageType))) {
                return generateLocalizationTitle(item);
            }
            return generateLocalizationTitle(item);
        });
    }

    useEffect(() => {
        setSlideMenuItems(reloadSlideMenuItems(userFunctionality as Functionality));
    }, [userFunctionality]);

    return {
        userIsValid,
        unreadNumber,
        update,
        slideMenuItems
    };
};

export default useSlideMenuViewModel;
