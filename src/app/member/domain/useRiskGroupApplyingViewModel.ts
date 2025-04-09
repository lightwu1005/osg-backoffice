import {GlobalController} from "@/modules/common/GlobalController";
import React, {useCallback, useEffect, useState} from "react";
import {
    GetRiskGroupApplyingParameters,
    UpdateRiskGroupApplyParameters
} from "@/app/member/models/MemberParameters";
import useRiskGroupsRepository from "@/services/@riskGroups/repository/useRiskGroupsRepository";
import {toRiskGroupApplyingProps, toUpdateRiskGroupApplyProps} from "@/app/member/models/RequestDataMapping";
import {
    RiskGroupsApplyingPuntersListModel
} from "@/services/@core/module/ResponseDataModels";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {ActionItem} from "@/modules/components/buttons/actionButton/ActionButton";
import {DateRange} from "@mui/x-date-pickers-pro";
import {Dayjs} from "dayjs";
import {isSafeDateRange} from "@/utils/tools";
import {AlertDialogProps, buildAlertDialogProps} from "@/modules/components/dialog/AlertDialog";
import {GridRowId} from "@mui/x-data-grid";
import {useMemberLocalization} from "@/services/@member/useCase";

const enum Action {
    Add,
    Remove
}

const useRiskGroupApplyingViewModel = (riskId: string) => {
    const intl = useIntl()
    const langType = LocalizationFunctionType.Member
    const langCommonType = LocalizationFunctionType.Common
    const riskGroupsRepository = useRiskGroupsRepository()

    const getRiskGroupsApplyingPunters = async (params: GetRiskGroupApplyingParameters) => {
        return await riskGroupsRepository.getRiskGroupsApplyingPunters(toRiskGroupApplyingProps(params))
    }

    const updateRiskGroupApply = async (params: UpdateRiskGroupApplyParameters) => {
        return await riskGroupsRepository.updateRiskGroupApply(toUpdateRiskGroupApplyProps(params))
    }

    const globalController = GlobalController.getInstance()
    const [loading, setLoading] = useState(false);
    const [queryParams, setQueryParams] = useState<GetRiskGroupApplyingParameters>({
        riskId: riskId,
        page: 1,
        pageSize: 10,
        searchKey: undefined,
        searchValue: undefined,
        startDate: undefined,
        endDate: undefined,
        sortField: undefined,
        sortDirection: undefined
    })
    const [list, setList] = useState<RiskGroupsApplyingPuntersListModel>()
    const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowId[]>([]);
    const [canClean, setCanClean] = useState(false)
    const [showAddRiskMemberDialog, setShowAddRiskMemberDialog] = useState(false)
    const [showAlertDialog, setShowAlertDialog] = useState(false)
    const [dialogProps, setDialogProps] = useState<AlertDialogProps>({
        title: "", content: "", actions: []
    })
    const memberLocalization = useMemberLocalization()
    const searchOption: ActionItem[] = memberLocalization.DefaultMemberSearchOptionTypes()

    const allActions: { [n: number]: ActionItem } = {
        0: {
            key: Action.Add,
            value: intl.formatMessage({id: `${langType}.actionAdd`, defaultMessage: 'Add Member'}),
        },
        1: {
            key: Action.Remove,
            value: intl.formatMessage({id: `${langType}.actionRemove`, defaultMessage: 'Remove Member'}),
        }
    }
    const [actions, setActions] = useState<ActionItem[]>([allActions[Action.Add]])
    const showRemoveDialog = (ids: string[]) => {
        const title = intl.formatMessage(
            {
                id: `${langType}.removeDialogTitle`,
                defaultMessage: 'Remove Member'
            })

        const content = intl.formatMessage(
            {
                id: `${langType}.removeDialogContent`,
                defaultMessage: 'Are you sure you want to remove this member from this group?'
            })

        const dialogProps = buildAlertDialogProps(
            title,
            content,
            () => setShowAlertDialog(false),
            () => {
            // remove member to risk group
            updateRiskGroupApply({riskId: undefined, punterIds: ids}).then((response) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: response.failureIds.length > 0 ? 'warning' : 'success',
                    show: true,
                    message: response.failureIds.length > 0
                        ? intl.formatMessage({
                            id: `${langType}.removePartiallySuccess`,
                            defaultMessage: 'Partial success, Please try {ids} again later.'
                        }, {
                            ids: response.failureIds.join(', ')
                        })
                        : intl.formatMessage({
                            id: `${langType}.removeSuccess`,
                            defaultMessage: 'Member has been removed successfully!'
                        })
                })
                selectedClear()
                getData()
            }).catch((error) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: error
                })
            }).finally(() => {
                setShowAlertDialog(false)
            })
        })
        setDialogProps(dialogProps)
        setShowAlertDialog(true)
    }

    const handleQueryChange = (params: Record<string, any>) => {
        const isPageChange = Boolean(params['page'])
        setQueryParams(currentParams => ({
            ...currentParams,
            ...params,
            ...(isPageChange ? undefined : {page: 1})
        }));
    }

    const handleActionClick = useCallback((item: ActionItem) => {
        switch (item.key) {
            case Action.Add:
                setShowAddRiskMemberDialog(true)
                break;
            case Action.Remove:
                showRemoveDialog(rowSelectionModel as string[])
                break;
        }
    }, [rowSelectionModel]);

    const handleSearch = useCallback((type: string, value: string) => {
        handleQueryChange({
            searchType: (value !== '') ? searchOption.find(item => item.value === type)?.key : undefined,
            searchValue: (value !== '') ? value : undefined,
        })
    }, []);

    const handleDateRange = useCallback((dateRange: DateRange<Dayjs> | null) => {
        if (isSafeDateRange(dateRange)) {
            handleQueryChange({
                startDate: dateRange?.[0]?.unix(),
                endDate: dateRange?.[1]?.unix(),
            })
        }
    }, [])

    const onRowSelectionModelChange = (rowSelectionModel: GridRowId[]) => {
        setRowSelectionModel(rowSelectionModel)
    }
    const selectedClear = () => {
        setRowSelectionModel([])
    }

    const getData = useCallback(() => {
        setLoading(true)
        getRiskGroupsApplyingPunters(queryParams)
            .then((response) => {
                console.log(response)
                setList(response)
            })
            .catch((error) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: error
                })
            })
            .finally(() => {
                setLoading(false)
            })
    }, [queryParams]);

    useEffect(() => {
        const actions = [allActions[Action.Add]];
        if (rowSelectionModel.length > 0) {
            actions.push(allActions[Action.Remove])
        }
        setActions(actions)
    }, [rowSelectionModel]);

    useEffect(() => {
        setCanClean((
            (queryParams.searchValue?.length ?? 0) +
            (queryParams.startDate ?? 0) +
            (queryParams.endDate ?? 0) > 0
        ))
        getData()
    }, [queryParams]);

    return {
        intl,
        langCommonType,
        loading,
        list,
        canClean,
        actions,
        searchOption,
        handleQueryChange,
        handleActionClick,
        handleSearch,
        handleDateRange,
        pageModel: {
            page: queryParams.page,
            pageSize: queryParams.pageSize
        },
        showAddRiskMemberDialog,
        setShowAddRiskMemberDialog,
        showAlertDialog,
        setShowAlertDialog,
        dialogProps,
        selectedClear,
        onRowSelectionModelChange,
    }
}

export default useRiskGroupApplyingViewModel