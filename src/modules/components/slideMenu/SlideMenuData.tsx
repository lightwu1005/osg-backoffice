import React from "react";
import {
    AccountTreeRounded,
    ConstructionRounded,
    DashboardRounded,
    FeedRounded,
    HistoryRounded,
    ListAltRounded,
    ManageAccountsRounded,
    NotificationsNoneRounded,
    SplitscreenRounded,
    TrafficRounded,
    WebRounded,
    Money
} from "@mui/icons-material";
import {PageType} from "@/services/@core/module/Enum";

/**
 * @param localizationKey - The key to be used for localization, need to be unique and same as the key in the language file
 * */
export interface MenuDataItem {
    id?: string
    path: string | null
    icon?: React.ReactNode
    title: string
    hide?: boolean
    children?: MenuDataItem[]
    localizationKey: string
}

const SliderMenuItems: MenuDataItem[] = [
    {
        path: PageType.EventList,
        icon: <SplitscreenRounded/>,
        title: "Event List",
        localizationKey: 'eventList'
    },
    {
        path: PageType.Dashboard,
        icon: <DashboardRounded/>,
        title: "Dashboard",
        localizationKey: 'dashboard'
    },
    {
        path: PageType.Channel,
        icon: <TrafficRounded/>,
        title: "Channel Management",
        localizationKey: 'channel'
    },
    {
        path: PageType.Permission,
        icon: <AccountTreeRounded/>,
        title: "Permission",
        localizationKey: 'permission'
    },
    {
        path: PageType.Audit,
        icon: <HistoryRounded/>,
        title: "Audit",
        localizationKey: 'audit'
    },
    {
        path: PageType.Notification,
        icon: <NotificationsNoneRounded/>,
        title: "Notification Center",
        localizationKey: 'notification'
    },
    {
        path: PageType.Cms,
        icon: <WebRounded/>,
        title: "CMS",
        localizationKey: 'cms'
    },
    {
        path: PageType.Configuration,
        icon: <ConstructionRounded/>,
        title: "Configuration",
        localizationKey: 'configuration'
    },
    {
        path: PageType.Template,
        icon: <FeedRounded/>,
        title: "Template",
        localizationKey: 'template'
    },
    {
        path: PageType.BetSlip,
        icon: <ListAltRounded/>,
        title: "Bet Slip",
        localizationKey: 'betSlip'
    },
    {
        path: PageType.Member,
        icon: <ManageAccountsRounded/>,
        title: "Member Management",
        localizationKey: 'member'
    }
    // Temporarily hidden, remove if unused. by PM
    // {
    //     path: PageType.TestPlaceBet,
    //     icon: <Money/>,
    //     title: "Test Place Bet",
    //     localizationKey: 'testPlaceBet'
    // }
]

export default SliderMenuItems
