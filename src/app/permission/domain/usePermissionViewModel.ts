import {toDeleteMembersProps, toMemberListProps} from "@/app/permission/models/RequestDataMapping";
import {MemberListParameters} from "@/app/permission/models/PermissionParameters";
import {toUpdateMembersStatusProps} from "@/app/accountSetting/models/RequestDataMapping";
import {Action, Functionality, MemberStatus, RoleType} from "@/services/@core/module/Enum";
import useMemberInfoRepository from "@/services/@member/repository/useMemberInfoRepository";
import {GridCellParams, GridRowId} from "@mui/x-data-grid";
import {MemberInfoListResponseDataModel} from "@/services/@core/module/ResponseDataModels";
import React, {useCallback, useEffect, useState} from "react";
import {ActionItem} from "@/modules/components/buttons/actionButton/ActionButton";
import {GlobalController} from "@/modules/common/GlobalController";
import {AlertDialogProps} from "@/modules/components/dialog/AlertDialog";
import {MuiEvent} from "@mui/x-data-grid-pro";
import {GridCallbackDetails} from "@mui/x-data-grid/models/api";
import PermissionHandler from "@/modules/common/PermissionHandler";
import IdentityHandler from "@/modules/common/IdentityHandler";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {useIntl} from "react-intl";
import {without} from "lodash";

const usePermissionViewModel = () => {
    const memberRepo = useMemberInfoRepository()

    const getMemberList = useCallback(async (props: MemberListParameters) => {
        return await memberRepo.getMemberList(toMemberListProps(props))
    }, [memberRepo])

    const deleteMembers = useCallback(async (uuids: string[]) => {
        return await memberRepo.deleteMembers(toDeleteMembersProps(uuids))
    }, [memberRepo])

    const updateMembersStatus = useCallback(async (uuids: string[], status: MemberStatus) => {
        const response = await memberRepo.updateMembersStatus(toUpdateMembersStatusProps(uuids, status))
        return response
    }, [memberRepo])

    const intl = useIntl()
    const funType = LocalizationFunctionType.Permission
    const funCommonType = LocalizationFunctionType.Common
    const allActions: { [n: number]: ActionItem } = {
        0: {
            key: Action.Add,
            value: intl.formatMessage({id: `${funType}.actionAdd`, defaultMessage: "Add User"})
        },
        1: {
            key: Action.Remove,
            value: intl.formatMessage({id: `${funType}.actionRemove`, defaultMessage: "Remove User"})
        },
        2: {
            key: Action.Suspend,
            value: intl.formatMessage({id: `${funType}.actionSuspend`, defaultMessage: "Suspend User"})
        },
        3: {
            key: Action.Active,
            value: intl.formatMessage({id: `${funType}.actionActive`, defaultMessage: "Active User"})
        }
    }

    const checkStatus = useCallback((rowSelectionModel: GridRowId[], list?: MemberInfoListResponseDataModel) => {
        const newSelectedStatus: MemberStatus[] = []
        rowSelectionModel.some((row) => {
            if (newSelectedStatus.length === Object.keys(MemberStatus).length) {
                return true
            }
            const member = list?.content.find((member) => member.uuid === row)
            if (member && !newSelectedStatus.includes(member.status)) {
                newSelectedStatus.push(member.status)
            }
        })
        return newSelectedStatus.sort((a, b) => a.localeCompare(b))
    },[])

    const checkRole = useCallback((rowSelectionModel: GridRowId[], list?: MemberInfoListResponseDataModel) => {
        const newSelectedRoles: string[] = []
        rowSelectionModel.some((row) => {
            if (newSelectedRoles.length === Object.keys(RoleType).length) {
                return true
            }
            const member = list?.content.find((member) => member.uuid === row)
            if (member && !newSelectedRoles.includes(member.role)) {
                newSelectedRoles.push(member.role)
            }
        })
        return newSelectedRoles.sort((a, b) => a.localeCompare(b))
    },[])

    const [loading, setLoading] = useState(false);
    const [actions, setActions] = useState<ActionItem[]>([allActions[Action.Add]]);
    const [memberRoleOptions, setMemberRoleOptions] = useState<string[]>([])
    const [modelRoleOptions, setModelRoleOptions] = useState<string[]>([])
    const [list, setList] = useState<MemberInfoListResponseDataModel>();
    const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowId[]>([]);
    const [showMemberDialog, setShowMemberDialog] = React.useState<boolean>(false)
    const [memberFormUUID, setMemberFormUUID] = useState('')
    const [selectedStatus, setSelectedStatus] = React.useState<string[]>([]);
    const [selectedRoles, setSelectedRoles] = React.useState<string[]>([]);
    const globalController = GlobalController.getInstance()
    const [isAlertDialogOpen, setAlertDialogOpen] = useState(false);
    const [canClean, setCanClean] = useState(false);
    const [alertDialogProps, setAlertDialogProps] = useState<AlertDialogProps>({
        title: '',
        content: '',
        actions: []
    })
    const [queryParams, setQueryParams] = useState<MemberListParameters>({
        page: 1,
        pageSize: 10,
        organization: undefined,
        roles: undefined,
        functionality: undefined,
        statuses: undefined,
        sortField: undefined,
        sortDirection: undefined,
    });
    const {userRole, currentPathName} = IdentityHandler();
    const userFunctionality = process.env.FUNCTIONALITY ?? Functionality.None;
    const {roleOptionsMap} = PermissionHandler()
    const {isEditable: checkEdit, isControlAble: checkControl} = PermissionHandler();
    const isEditable = checkEdit(userRole, currentPathName);

    const handleDialogPropsChange = useCallback((params: Record<string, any>) => {
        setAlertDialogProps(currentParams => ({
            ...currentParams,
            ...params
        }));
    }, []);

    const createAlertDialogActions = useCallback((fn: Function) => {
        handleDialogPropsChange({
            actions: [
                {
                    type: 'cancel',
                    text: intl.formatMessage({id: `${funCommonType}.cancel`, defaultMessage: 'Cancel'}),
                    onClick: () => {
                        setAlertDialogOpen(false)
                    },
                },
                {
                    type: 'confirm',
                    text: intl.formatMessage({id: `${funCommonType}.confirm`, defaultMessage: 'Confirm'}),
                    autoFocus: true,
                    onClick: () => {
                        fn();
                    },
                }
            ]
        })
    },[setAlertDialogOpen, handleDialogPropsChange])

    const alertDialogClean = useCallback(() => {
        setAlertDialogOpen(false)
        handleDialogPropsChange({
            title: '',
            content: ''
        })
    },[handleDialogPropsChange])

    const getData = useCallback(() => {
        setLoading(true)
        getMemberList(queryParams)
            .then((response) => {
                setList(response)
            })
            .catch((result) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: result
                })
            })
            .finally(() => setLoading(false))
    },[getMemberList, globalController, queryParams])

    const onRowClick = (params: GridCellParams, event: MuiEvent, details: GridCallbackDetails) => {
        if (params.field !== '__check__') {
            setMemberFormUUID(params.id.toString())
        }
    }

    useEffect(() => {
        if (memberFormUUID) {
            setShowMemberDialog(true);
        }
    }, [memberFormUUID]);

    useEffect(() => {
        if (!showMemberDialog) {
            setMemberFormUUID('');
        }
    }, [showMemberDialog]);

    useEffect(() => {
        const createModelRoleOptions = (functionality: string, allOption: string[]): string[] => {
            switch (functionality) {
                case 'Odds':
                    return without(allOption, RoleType.ChannelAdmin)
                case 'Bets':
                    return without(allOption, RoleType.BetsAdmin)
                default:
                    return allOption
            }
        }

        const roleOptions = roleOptionsMap[userFunctionality as Functionality] ?? [];
        setMemberRoleOptions(roleOptions)
        setModelRoleOptions(createModelRoleOptions(userFunctionality, roleOptions))
        getData()
    }, [globalController, userFunctionality]);

    const handleActionClick = useCallback((item: ActionItem) => {
        switch (item.key) {
            case Action.Add:
                setShowMemberDialog(true)
                break
            case Action.Active:
                updateMembersStatus(rowSelectionModel as string[], MemberStatus.Active)
                    .then(res => {
                        setRowSelectionModel([])
                        getData();
                        globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                            severity: res.isSuccess ? 'success' : 'error',
                            show: true,
                            message: res.result
                        })
                    })
                break
            case Action.Remove:
                handleDialogPropsChange({
                    title: intl.formatMessage({id: `${funType}.removeUser`, defaultMessage: 'Remove User'}),
                    content: intl.formatMessage({
                        id: `${funType}.removeUserDescription`,
                        defaultMessage: 'This action cannot be undone. Are you sure you want to remove this user ?'
                    })
                })
                setAlertDialogOpen(true)
                const removeHandleConfirm = () => {
                    deleteMembers(rowSelectionModel as string[])
                        .then((response) => {
                            setSelectedStatus([])
                            setSelectedRoles([])
                            setRowSelectionModel([])
                            getData()
                            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                                severity: response.failureIds.length > 0 ? 'warning' : 'success',
                                show: true,
                                message: response.failureIds.length > 0
                                    ? intl.formatMessage({
                                        id: `${funType}.removeUserPartiallySuccess`,
                                        defaultMessage: 'Partial success, Please try {ids} again later.'
                                    }, {ids: response.failureIds.join(', ')})
                                    : intl.formatMessage({
                                        id: `${funType}.removeUserSuccess`,
                                        defaultMessage: 'User has been removed successfully!'
                                    })
                            });
                        })
                        .catch((result) => {
                            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                                severity: 'error',
                                show: true,
                                message: result
                            });
                        })
                        .finally(() => {
                            alertDialogClean()
                            setLoading(false)
                        })
                }
                createAlertDialogActions(removeHandleConfirm)
                break
            case Action.Suspend:
                handleDialogPropsChange({
                    title: intl.formatMessage({id: `${funType}.suspendUser`, defaultMessage: 'Suspended User'}),
                    content: intl.formatMessage({
                        id: `${funType}.suspendUserDescription`,
                        defaultMessage: 'This action cannot be undone. Are you sure you want to suspended this user ?'
                    })
                })
                setAlertDialogOpen(true)
                const suspendHandleConfirm = () => {
                    updateMembersStatus(rowSelectionModel as string[], MemberStatus.Suspended)
                        .then(res => {
                            setRowSelectionModel([])
                            getData();
                            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                                severity: res.isSuccess ? 'success' : 'error',
                                show: true,
                                message: res.result
                            })
                        })
                    alertDialogClean()
                }
                createAlertDialogActions(suspendHandleConfirm)
                break
        }
    },[alertDialogClean, createAlertDialogActions, deleteMembers, getData, globalController, handleDialogPropsChange, rowSelectionModel, updateMembersStatus])

    const onRowSelectionModelChange = (rowSelectionModel: GridRowId[]) => {
        setSelectedStatus(checkStatus(rowSelectionModel, list));
        setSelectedRoles(checkRole(rowSelectionModel, list));
        setRowSelectionModel(rowSelectionModel)
    }

    const checkCleanButton = useCallback(() => {
        const hasSearchCompany = (queryParams.organization?.length ?? 0) > 0;
        const hasRoleSelected = (queryParams.roles?.length ?? 0) > 0;
        const hasStatusSelected = (queryParams.statuses?.length ?? 0) > 0;
        const shouldShowCleanButton = hasSearchCompany || hasRoleSelected || hasStatusSelected;
        setCanClean(shouldShowCleanButton);
    },[queryParams.organization?.length, queryParams.roles?.length, queryParams.statuses?.length])

    useEffect(() => {
        checkCleanButton()
        getData()
    }, [queryParams, checkCleanButton]);

    useEffect(() => {
        const actions: ActionItem[] = []
        const content = list?.content
        if (!content) return

        /**
         * @description Frontend Display Options Rules (For All Users in Admin and Odds BO)
         * @define
         * **Add User Action:**
         * - Always enable
         *
         * **Remove User Action:**
         * - Disable: The selected member's status does not include SUSPENDED or VERIFYING, or the role level is not lower than the current user.
         * - Tips: "Active users cannot be removed."
         *
         * **Suspend User Action:**
         * - Disable: The selected member's status does not include ACTIVE, or the role level is not lower than the current user.
         *
         * **Active User Action:**
         * - Disable: The selected member's status does not include SUSPENDED or VERIFYING
         * */
        actions.push(allActions[Action.Add])
        // canControl will be false if one of the selected roles is not lower than the current user's role
        const canControl = !selectedRoles.some(role => !checkControl(userRole, role))
        if (selectedStatus.length > 0) {
            actions.push({
                ...allActions[Action.Remove],
                disabled: !canControl ||
                    (!selectedStatus.includes(MemberStatus.Suspended) && !selectedStatus.includes(MemberStatus.Verifying)),
                tips: intl.formatMessage({
                    id: `${funType}.actionRemoveTips`,
                    defaultMessage: 'It includes non-removable users.'
                })
            })
            actions.push({
                ...allActions[Action.Suspend],
                disabled: !canControl ||
                    (!selectedStatus.includes(MemberStatus.Active))
            })
            actions.push({
                ...allActions[Action.Active],
                disabled:!canControl ||
                    (!selectedStatus.includes(MemberStatus.Suspended) && !selectedStatus.includes(MemberStatus.Verifying))
            })
        }
        setActions(actions)
    }, [selectedStatus, list?.content]);

    const handleQueryChange = useCallback((params: Record<string, any>) => {
        const obj = Object.entries(params)
        const checkedParams = Object.fromEntries(obj.map(o => {
            const [key, value] = o
            let newValue = value
            switch (key) {
                case "organization":
                case "roles":
                    if ((value?.length ?? 0) === 0) {
                        newValue = undefined
                    }
                    break
                case "statuses":
                    if ((value?.length ?? 0) === 0) {
                        newValue = undefined
                    } else {
                        newValue = (value as (keyof typeof MemberStatus)[]).map(statusKey =>
                            MemberStatus[statusKey]
                        );

                    }
                    break;
            }
            return [key, newValue]
        }))
        const isPageChange = Boolean(params['page'])
        setQueryParams(currentParams => ({
            ...currentParams,
            ...checkedParams,
            ...(isPageChange ? undefined : {page: 1})
        }));
    }, []);

    const rowsUnSelectableWithIds = () => {
        return list?.content?.[0]?.role === RoleType.SuperAdmin ? [list.content[0].id] : [];
    };

    return {
        isEditable,
        loading,
        list,
        actions,
        memberFormUUID,
        refresh: getData,
        memberRoleOptions,
        modelRoleOptions,
        statusOptions: Object.keys(MemberStatus),
        canClean,
        pageModel: {
            page: queryParams.page,
            pageSize: queryParams.pageSize
        },
        rowSelectionModel,
        rowsUnSelectableWithIds,
        alertDialogProps,
        isAlertDialogOpen,
        setAlertDialogOpen,
        showMemberDialog,
        setShowMemberDialog,
        onRowClick,
        onRowSelectionModelChange,
        handleActionClick,
        handleQueryChange,
        userFunctionality,
        intl,
        funCommonType
    }
}

export default usePermissionViewModel