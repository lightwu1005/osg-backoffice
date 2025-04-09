import {GetChannelsParameters} from "@/app/channel/models/ChannelParameters";
import {
    toBrandListProps,
    toChannelListProps,
    toRemoveBrandsProps,
    toRemoveChannelsProps,
    toUpdateBrandStatusProps,
    toUpdateChannelStatusProps
} from "@/app/channel/models/RequestDataMapping";
import {ChannelStatus, Functionality} from "@/services/@core/module/Enum";
import useChannelRepository from "@/services/@channel/respository/useChannelRepository";
import {GridCellParams, GridRowId} from "@mui/x-data-grid";
import React, {useCallback, useEffect, useState} from "react";
import {ActionItem} from "@/modules/components/buttons/actionButton/ActionButton";
import {GlobalController} from "@/modules/common/GlobalController";
import {buildAlertDialogProps} from "@/modules/components/dialog/AlertDialog";
import PermissionHandler from "@/modules/common/PermissionHandler";
import IdentityHandler from "@/modules/common/IdentityHandler";
import {usePathname} from "next/navigation";
import useBrandsRepository from "@/services/@brands/repository/useBrandsRepository";
import {LocalChannelListModel, useLocalDataTranslate} from "@/app/channel/models/LocalDataTranslate";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {useIntl} from "react-intl";

const enum Action {
    Add,
    Remove,
    Suspend,
    Active,
    Maintain,
}

const shouldShowCleanButton = (locationNames?: string[], statuses?: string[], startDate?: number, endDate?: number) => {
    const hasLocationNames = Boolean(locationNames?.length);
    const hasStatuses = Boolean(statuses?.length);
    const hasValidDateRange = !!startDate || !!endDate;
    return hasLocationNames || hasStatuses || hasValidDateRange;
}

const checkStatus = (rowSelectionModel: GridRowId[], list?: LocalChannelListModel) => {
    const channelStatusArray = Object.values(ChannelStatus);
    const newSelectedStatus: ChannelStatus[] = [];

    rowSelectionModel.some((row) => {
        if (newSelectedStatus.length === Object.keys(ChannelStatus).length) {
            return true;
        }

        const channel = list?.content.find((channel) => channel.channelId === row)
        if (channel && !newSelectedStatus.includes(channel.status)) {
            newSelectedStatus.push(channel.status)
        }
    });

    return newSelectedStatus.sort((a, b) => channelStatusArray.indexOf(a) - channelStatusArray.indexOf(b));
}

const useChannelViewModel = () => {
    const userFunctionality = process.env.FUNCTIONALITY ?? '';
    const channelRepo = useChannelRepository();
    const brandRepo = useBrandsRepository()
    const {toLocalList} = useLocalDataTranslate()
    const intl = useIntl()
    const funType = LocalizationFunctionType.Channel
    const funCommonType = LocalizationFunctionType.Common
    const allActions: { [n: number]: ActionItem } = {
        0: {
            key: Action.Add,
            value: intl.formatMessage({id: `${funType}.actionAdd`, defaultMessage: 'Add Channel'}),
        },
        1: {
            key: Action.Remove,
            value: intl.formatMessage({id: `${funType}.actionRemove`, defaultMessage: 'Remove Channel'}),
        },
        2: {
            key: Action.Suspend,
            value: intl.formatMessage({id: `${funType}.actionSuspend`, defaultMessage: 'Suspend Channel'}),
        },
        3: {
            key: Action.Active,
            value: intl.formatMessage({id: `${funType}.actionActive`, defaultMessage: 'Active Channel'}),
        },
        4: {
            key: Action.Maintain,
            value: intl.formatMessage({id: `${funType}.actionMaintain`, defaultMessage: 'Maintain Channel'}),
        }
    }

    const getChannelList = useCallback(async (parameters: GetChannelsParameters) => {
        if (userFunctionality === Functionality.Admin) {
            return await channelRepo.getChannelList(toChannelListProps(parameters))
        } else {
            return await brandRepo.getBrandList(toBrandListProps(parameters))
        }
    }, [channelRepo, brandRepo])

    const removeChannels = useCallback(async (ids: string[]) => {
        if (userFunctionality === Functionality.Admin) {
            return await channelRepo.removeChannels(toRemoveChannelsProps(ids))
        } else {
            return await brandRepo.removeBrands(toRemoveBrandsProps(ids))
        }
    }, [channelRepo, brandRepo])

    const updateChannelStatus = useCallback(async (ids: string[], status: ChannelStatus) => {
        if (userFunctionality === Functionality.Admin) {
            return await channelRepo.updateChannelStatus(toUpdateChannelStatusProps(ids, status))
        } else {
            return await brandRepo.updateBrandStatus(toUpdateBrandStatusProps(ids, status))
        }
    }, [channelRepo, brandRepo])

    const [loading, setLoading] = useState(false);
    const [actions, setActions] = useState<ActionItem[]>([allActions[Action.Add]]);
    const [canClean, setCanClean] = useState(false);
    const [queryParams, setQueryParams] = useState<GetChannelsParameters>({
        page: 1,
        pageSize: 10,
        locationNames: undefined,
        statuses: undefined,
        startDate: undefined,
        endDate: undefined,
        sortField: undefined,
        sortDirection: undefined,
    });
    const [list, setList] = useState<LocalChannelListModel>();
    const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowId[]>([]);
    const [selectedStatus, setSelectedStatus] = React.useState<ChannelStatus[]>([]);
    const [showChannelDialog, setShowChannelDialog] = React.useState<boolean>(false);
    const [channelFormId, setChannelFormId] = useState('')
    const [showMaintainDialog, setShowMaintainDialog] = useState(false);
    const [maintainChannel, setMaintainChannel] = useState(false)
    const [showRemoveDialog, setShowRemoveDialog] = useState(false)
    const [removeChannel, setRemoveChannel] = useState(false)
    const removeAlertDialogProps = buildAlertDialogProps(
        intl.formatMessage({id: `${funType}.removeChannel`, defaultMessage: 'Remove Channel'}),
        intl.formatMessage({
            id: `${funType}.removeChannelDescription`,
            defaultMessage: 'This action cannot be undone. Are you sure you want to remove this channel ?'
        }),
        () => setShowRemoveDialog(false),
        () => {
            setRemoveChannel(true)
            setShowRemoveDialog(false)
        }
    )

    const maintainAlertDialogProps = buildAlertDialogProps(
        intl.formatMessage({id: `${funType}.maintainChannel`, defaultMessage: 'Maintain Channel'}),
        intl.formatMessage({
            id: `${funType}.maintainChannelDescription`,
            defaultMessage: 'This action cannot be undone. Are you sure you want to maintain this channel ?'
        }),
        () => setShowMaintainDialog(false),
        () => {
            setMaintainChannel(true)
            setShowMaintainDialog(false);
        }
    )
    const globalController = GlobalController.getInstance()
    const {isEditable: checkEdit} = PermissionHandler();
    const {userRole} = IdentityHandler();
    const pathname = usePathname();
    const currentPathName = pathname ? pathname.split('/').pop() : '';
    const isEditable = checkEdit(userRole, currentPathName ?? '');

    const getData = useCallback(() => {
        setLoading(true);
        getChannelList(queryParams)
            .then((response) => {
                if (response) setList(toLocalList(response))
            })
            .catch((result) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: result
                });
            })
            .finally(() =>
                setLoading(false))
    }, [getChannelList, globalController, queryParams])

    const removeChannelsFn = useCallback(() => {
        setLoading(true)
        removeChannels(rowSelectionModel as string[])
            .then((response) => {
                setSelectedStatus([])
                setRowSelectionModel([])
                getData()
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: response.failureIds.length > 0 ? 'warning' : 'success',
                    show: true,
                    message: response.failureIds.length > 0
                        ? intl.formatMessage({
                            id: `${funType}.removeChannelPartiallySuccess`,
                            defaultMessage: 'Partial success, Please try {ids} again later.'
                        }, {
                            ids: response.failureIds.join(', ')
                        })
                        : intl.formatMessage({
                            id: `${funType}.removeChannelSuccess`,
                            defaultMessage: 'Channel has been removed successfully!'
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
                setRemoveChannel(false)
                setLoading(false)
            })
    }, [setLoading, removeChannels, rowSelectionModel, setSelectedStatus, setRowSelectionModel, globalController, getData])

    const updateChannelsFn = (status: ChannelStatus) => {
        setLoading(true)
        updateChannelStatus(rowSelectionModel as string[], status)
            .then((response) => {
                setSelectedStatus([])
                setRowSelectionModel([])
                getData()

                let severity = 'success'
                let message = intl.formatMessage({
                    id: `${funType}.updateChannelStatusSuccess`,
                    defaultMessage: 'Channel has been {status} successfully!'
                }, {
                    status: status.toLowerCase()
                })

                if (response.failureIds.length > 0) {
                    severity = 'warning'
                    const failureChannels = list?.content.filter(item =>
                            response.failureIds.includes(item.channelId))
                            .map((item) => `"${item.channelName}"`)
                        ?? response.failureIds

                    if (failureChannels.length > 3) {
                        message = intl.formatMessage(
                            {
                                id: `${funType}.updateChannelStatusPartiallySuccess.moreThanThree`,
                                defaultMessage: 'Partial success, please try again later on {ids}, and other {count}...'
                            },
                            {
                                ids: failureChannels.slice(0, 3).join(', '),
                                count: failureChannels.length - 3
                            }
                        )
                    } else {
                        message = intl.formatMessage(
                            {
                                id: `${funType}.updateChannelStatusPartiallySuccess.lessThanThree`,
                                defaultMessage: 'Partial success, please try {ids} again later.'
                            },
                            {
                                ids: failureChannels.join(', ')
                            }
                        )
                    }
                }

                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: severity,
                    show: true,
                    message: message
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
                setMaintainChannel(false)
                setLoading(false)
            })
    }

    const handleActionClick = (item: ActionItem) => {
        switch (item.key) {
            case Action.Add:
                setShowChannelDialog(true)
                break
            case Action.Remove:
                setShowRemoveDialog(true)
                break
            case Action.Suspend:
                updateChannelsFn(ChannelStatus.Suspended)
                break
            case Action.Active:
                updateChannelsFn(ChannelStatus.Active)
                break
            case Action.Maintain:
                setShowMaintainDialog(true);
                break
        }
    }

    const checkCleanButton = useCallback(() => {
        setCanClean(shouldShowCleanButton(queryParams.locationNames, queryParams.statuses, queryParams.startDate, queryParams.endDate));
    }, [queryParams.locationNames, queryParams.statuses, queryParams.startDate, queryParams.endDate])

    const onRowSelectionModelChange = (rowSelectionModel: GridRowId[]) => {
        setSelectedStatus(checkStatus(rowSelectionModel, list))
        setRowSelectionModel(rowSelectionModel)
    }

    useEffect(() => {
        if (channelFormId) {
            setShowChannelDialog(true);
        }
    }, [channelFormId]);

    useEffect(() => {
        if (!showChannelDialog) {
            setChannelFormId('');
        }
    }, [showChannelDialog]);

    const onCellClick = (params: GridCellParams) => {
        if (params.field !== '__check__') {
            setChannelFormId(params.id.toString())
        }
    }

    useEffect(() => {
        checkCleanButton()
        getData()
    }, [queryParams, checkCleanButton]);

    useEffect(() => {
        const actions: ActionItem[] = [];
        const content = list?.content;
        if (!content) return;

        if (isEditable) actions.push(allActions[Action.Add]);
        if (selectedStatus.length > 0) {
            actions.push(allActions[Action.Remove]);
            selectedStatus.forEach((status) => {
                switch (status) {
                    case ChannelStatus.Active:
                        actions.push(allActions[Action.Suspend]);
                        actions.push(allActions[Action.Maintain]);
                        break;
                    case ChannelStatus.Suspended:
                        actions.push(allActions[Action.Active]);
                        actions.push(allActions[Action.Maintain]);
                        break;
                    case ChannelStatus.Maintained:
                        actions.push(allActions[Action.Active]);
                        actions.push(allActions[Action.Suspend]);
                        break;
                }
            });
        }

        const uniqueActions = Array.from(new Set(actions));

        const order = [Action.Add, Action.Remove, Action.Suspend, Action.Active, Action.Maintain];
        const sortedActions = uniqueActions.sort((a, b) => {
            return order.indexOf(a.key) - order.indexOf(b.key);
        });

        setActions(sortedActions);
    }, [selectedStatus, list?.content]);

    const handleQueryChange = useCallback((params: Record<string, any>) => {
        const isPageChange = Boolean(params['page'])
        setQueryParams(prevParams => ({
            ...prevParams,
            ...params,
            ...(isPageChange ? undefined : {page: 1})
        }));
    }, []);

    useEffect(() => {
        if (removeChannel) {
            removeChannelsFn()
        }
    }, [removeChannel])

    useEffect(() => {
        if (maintainChannel) {
            updateChannelsFn(ChannelStatus.Maintained)
        }
    }, [maintainChannel]);

    return {
        isEditable,
        loading,
        list,
        pageModel: {
            page: queryParams.page,
            pageSize: queryParams.pageSize
        },
        rowSelectionModel,
        channelFormId,
        showChannelDialog,
        setShowChannelDialog,
        showRemoveDialog,
        setShowRemoveDialog,
        actions,
        refresh: getData,
        canClean,
        removeAlertDialogProps,
        handleQueryChange,
        handleActionClick,
        onCellClick,
        onRowSelectionModelChange,
        showMaintainDialog,
        setShowMaintainDialog,
        maintainAlertDialogProps,
        intl,
        funCommonType
    }
}

export default useChannelViewModel