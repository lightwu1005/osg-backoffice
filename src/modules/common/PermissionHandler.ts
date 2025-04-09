import {Functionality, PageType, RoleType} from "@/services/@core/module/Enum";

const PermissionHandler = () => {

    // Adjust here for permissions of Create/Update/Delete in the page
    const editableMap: { [key in RoleType]: PageType[] } = {
        [RoleType.SuperAdmin]: [PageType.Dashboard, PageType.Channel, PageType.Permission],
        [RoleType.Admin]: [PageType.Dashboard, PageType.Channel, PageType.Permission],
        [RoleType.Maintainer]: [PageType.Permission],
        [RoleType.ChannelAdmin]: [
            PageType.Dashboard, PageType.Configuration, PageType.Permission,
            PageType.EventList, PageType.Template, PageType.Cms,
            PageType.BetSlip, PageType.Member, PageType.Channel
        ],
        [RoleType.Manager]: [
            PageType.Dashboard, PageType.Configuration, PageType.Permission,
            PageType.EventList, PageType.Template, PageType.Cms,
            PageType.BetSlip, PageType.Member, PageType.Channel
        ],
        [RoleType.Trader]: [
            PageType.Dashboard, PageType.EventList, PageType.Template,
            PageType.Cms, PageType.BetSlip, PageType.Member
        ],
        [RoleType.Viewer]: [],
        [RoleType.BetsAdmin]: [
            PageType.Dashboard, PageType.Permission, PageType.EventList, PageType.Cms,
            PageType.BetSlip, PageType.Configuration, PageType.Member
        ],
        [RoleType.TeamLead]: [
            PageType.Dashboard, PageType.Permission, PageType.EventList, PageType.Cms,
            PageType.BetSlip, PageType.Configuration, PageType.Member
        ],
        [RoleType.Operator]: [
            PageType.Dashboard, PageType.Permission, PageType.EventList, PageType.Cms,
            PageType.BetSlip, PageType.Member
        ],
        [RoleType.NoRole]: []
    };

    const permissionControlMap: { [key in RoleType]: RoleType[] } = {
        [RoleType.SuperAdmin]: [RoleType.Admin, RoleType.Maintainer, RoleType.ChannelAdmin],
        [RoleType.Admin]: [RoleType.Maintainer, RoleType.ChannelAdmin],
        [RoleType.Maintainer]: [RoleType.ChannelAdmin],
        [RoleType.ChannelAdmin]: [
            RoleType.Manager,
            RoleType.Trader,
            RoleType.Viewer,
            RoleType.BetsAdmin
        ],
        [RoleType.Manager]: [RoleType.Trader, RoleType.Viewer, RoleType.BetsAdmin],
        [RoleType.Trader]: [],
        [RoleType.Viewer]: [],
        [RoleType.BetsAdmin]: [RoleType.TeamLead, RoleType.Operator],
        [RoleType.TeamLead]: [RoleType.Operator],
        [RoleType.Operator]: [],
        [RoleType.NoRole]: []
    };

    const accessMap: { [key in Functionality]: PageType[] } = {
        [Functionality.Admin]: [PageType.Dashboard, PageType.Channel, PageType.Permission, PageType.Audit, PageType.Notification],
        [Functionality.Odds]: [
            PageType.Dashboard,
            PageType.EventList,
            PageType.Configuration,
            PageType.Channel,
            PageType.Permission,
            PageType.Template,
            // PageType.Cms,
            PageType.BetSlip,
            PageType.Member,
            PageType.Audit,
            PageType.Notification,
            PageType.TestPlaceBet
        ],
        [Functionality.Bets]: [
            PageType.Dashboard,
            PageType.EventList,
            PageType.Permission,
            PageType.Configuration,
            PageType.Cms,
            PageType.BetSlip,
            PageType.Member,
            PageType.Audit,
            PageType.Notification
        ],
        [Functionality.None]: []
    };

    const roleOptionsMap: { [key in Functionality]: RoleType[] } = {
        [Functionality.Admin]: [RoleType.SuperAdmin, RoleType.Admin, RoleType.Maintainer, RoleType.ChannelAdmin],
        [Functionality.Odds]: [RoleType.ChannelAdmin, RoleType.Manager, RoleType.Trader, RoleType.Viewer, RoleType.BetsAdmin],
        [Functionality.Bets]: [RoleType.BetsAdmin, RoleType.TeamLead, RoleType.Operator],
        [Functionality.None]: []
    };

    function isEditable (userRole: string, pathName: string): boolean {
        return editableMap[userRole as RoleType].includes(pathName as PageType);
    }

    function isAccessAble (userFunctionality: string, pathName: string): boolean {
        return (userFunctionality && pathName) ? accessMap[userFunctionality as Functionality].includes(pathName as PageType) : false;
    }

    function isControlAble(userRole: string, targetRole: string): boolean {
        return permissionControlMap[userRole as RoleType].includes(targetRole as RoleType);
    }

    return {
        accessMap,
        roleOptionsMap,
        isEditable,
        isAccessAble,
        isControlAble
    }
}

export default PermissionHandler