import {useCallback, useEffect, useRef, useState} from "react";
import {StatusItem} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup";
import {
    EditMemberTagsParameters,
    GetRiskGroupsParameters,
    GetRiskMembersParameters,
    LocalizedMemberParameters,
    UpdateRiskGroupApplyParameters
} from "@/app/member/models/MemberParameters";
import {
    toDeleteRiskGroupsProps,
    toGetRiskGroupsProps,
    toGetRiskMembersProps,
    toUpdateRiskGroupApplyProps
} from "@/app/member/models/RequestDataMapping";
import useRiskMemberRepository from "@/services/@riskMembers/repository/useRiskMemberRepository";
import {
    RiskGroupDataModel,
    RiskGroupListModel,
    RiskMembersListModel,
    TagModel
} from "@/services/@core/module/ResponseDataModels";
import {GridCellParams, GridRowId} from "@mui/x-data-grid";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {DateRange} from "@mui/x-date-pickers-pro";
import {Dayjs} from "dayjs";
import {isSafeDateRange} from "@/utils/tools";
import {useIntl} from "react-intl";
import {ActionItem} from "@/modules/components/buttons/actionButton/ActionButton";
import {useMemberLocalization} from "@/services/@member/useCase";
import useRiskGroupRepository from "@/services/@riskGroups/repository/useRiskGroupsRepository";
import {debounce} from "lodash";
import {GlobalController} from "@/modules/common/GlobalController";
import {MuiEvent} from "@mui/x-data-grid-pro";
import {GridCallbackDetails} from "@mui/x-data-grid/models/api";
import {
    OptionItem as QueryableOptionItem
} from "@/modules/components/TextField/QueryableSelectTextField/QueryableSelectTextField";
import {OptionItem as FilterButtonOptionItem} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {useNavigationProvider} from "@/utils/NavigationProvider";
import {usePathname} from "next/navigation";

export enum MemberTableType {
    MemberList = 'Member List',
    MemberLevelSetting = 'Member Level Setting',
}

export enum MemberListActions {
    ChangeRiskLevel = 'Change Risk Level',
    CreateRiskLevel = 'Create Risk Level',
    RemoveRiskLevel = 'Remove Risk Level',
}

const useMemberViewModel = () => {
    const intl = useIntl()
    const langType = LocalizationFunctionType.Member

    const riskMemberRepo = useRiskMemberRepository()
    const riskGroupRepo = useRiskGroupRepository()
    const pathname = usePathname();
    const {normalProvider} = useNavigationProvider()

    const getRiskMembers = useCallback(async (prop: GetRiskMembersParameters) => {
        return await riskMemberRepo.getRiskMembers(toGetRiskMembersProps(prop))
    }, [riskMemberRepo])

    const updateMembersRiskLevel = useCallback(async (prop: UpdateRiskGroupApplyParameters) => {
        return await riskGroupRepo.updateRiskGroupApply(toUpdateRiskGroupApplyProps(prop))
    }, [riskGroupRepo])

    const getRiskGroup = useCallback(async (prop: GetRiskGroupsParameters) => {
        return await riskGroupRepo.getRiskGroups(toGetRiskGroupsProps(prop))
    }, [riskGroupRepo])

    const deleteMemberRiskLevel = useCallback(async (prop: string[]) => {
        return await riskGroupRepo.deleteRiskGroups(toDeleteRiskGroupsProps(prop))
    }, [riskGroupRepo])

    const memberLocalization = useMemberLocalization()
    const memberTableTypes = memberLocalization.DefaultMemberTableTypes
    const searchOptionTypes = memberLocalization.DefaultMemberSearchOptionTypes

    const langCommonType = LocalizationFunctionType.Common
    const funType = LocalizationFunctionType.Member
    const [tableType, setTableType] = useState<StatusItem>(memberTableTypes()[0])
    const [memberTableType, setMemberTableType] = useState<MemberTableType>(MemberTableType.MemberList)
    const [canClean, setCanClean] = useState<boolean>(false)
    const searchOption = searchOptionTypes()
    const [queryParams, setQueryParams] = useState<LocalizedMemberParameters>({
        page: 1,
        pageSize: 10
    });
    const [riskMembers, setRiskMembers] = useState<RiskMembersListModel>()
    const [riskGroups, setRiskGroups] = useState<RiskGroupListModel>()
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowId[]>([]);
    const [loading, setLoading] = useState(false);
    const [punterIds, setPunterIds] = useState<string[]>([])
    const [openChangeRiskLevelDialog, setOpenChangeRiskLevelDialog] = useState(false)
    const updatedRiskLevelRef = useRef<string[]>([])
    const globalController = GlobalController.getInstance()
    const [openRiskGroupFormDialog, setOpenRiskGroupFormDialog] = useState(false)
    const riskGroupFormRiskIdRef = useRef<string | undefined>()
    const selectedRiskGroup = useRef<RiskGroupDataModel>()
    const [openRiskGroupApplyDialog, setOpenRiskGroupApplyDialog] = useState(false)
    const [openEditMemberTagsDialog, setOpenEditMemberTagsDialog] = useState(false)
    const editMemberTagsPunterIdRef = useRef<EditMemberTagsParameters>()

    const allActions: { [n: number]: ActionItem } = {
        0: {
            key: MemberListActions.ChangeRiskLevel,
            value: intl.formatMessage({id: `${langType}.changeRiskLevel`, defaultMessage: 'Change Risk Level'}),
            disabled: true
        },
        1: {
            key: MemberListActions.CreateRiskLevel,
            value: intl.formatMessage({id: `${langType}.createRiskLevel`, defaultMessage: 'Create Risk Level'}),
        },
        2: {
            key: MemberListActions.RemoveRiskLevel,
            value: intl.formatMessage({id: `${langType}.removeRiskLevel`, defaultMessage: 'Remove Risk Level'}),
            disabled: true
        }
    }

    const [actions, setActions] = useState<ActionItem[]>([allActions[0]])

    const handleActionClick = useCallback((item: ActionItem) => {
        if (memberTableType === MemberTableType.MemberList) {
            setOpenChangeRiskLevelDialog(true);
        } else if (item.key === MemberListActions.CreateRiskLevel) {
            riskGroupFormRiskIdRef.current = undefined;
            setOpenRiskGroupFormDialog(true);
        } else {
            deleteMemberRiskLevel(rowSelectionModel as string[])
                .then((response) => {
                    const isSuccess = response.failureIds.length === 0
                    if (isSuccess) setRowSelectionModel([])
                    globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                        severity: isSuccess ? 'success' : 'error',
                        show: true,
                        message: isSuccess ?
                            intl.formatMessage({ id: `${funType}.removeRiskLevelSuccessMsg`, defaultMessage: 'Risk level removed successfully!' }) :
                            intl.formatMessage({ id: `api.defaultErrorMsg`, defaultMessage: 'Oops, something went wrong; please try again later.' })
                    })
                })
                .finally(() => {
                    refreshData();
                });
        }
    }, [memberTableType, rowSelectionModel]);

    const refreshData = () => {
        setQueryParams(prevState => {
           return {
               ...prevState,
               page: 1,
               pageSize: 10
           }
        });
    }

    const handleTableTypeChange = (index: number) => {
        setTableType(memberTableTypes()[index])
        setMemberTableType(
            index === 0 ? MemberTableType.MemberList : MemberTableType.MemberLevelSetting
        )
        setRowSelectionModel([])
        refreshData();
    }

    useEffect(() => {
        if (memberTableType === MemberTableType.MemberList) {
            setActions([allActions[0]]);
        } else {
            setActions([allActions[1], allActions[2]]);
        }
    }, [memberTableType]);

    const debouncedUpdateActions = useCallback(
        debounce((rowSelectionModel: GridRowId[]) => {
            const updatedActions: ActionItem[] = [];

            if (memberTableType === MemberTableType.MemberList) {
                const action: ActionItem = {...allActions[0], disabled: rowSelectionModel.length === 0};
                updatedActions.push(action);
            } else if (memberTableType === MemberTableType.MemberLevelSetting) {
                const action1: ActionItem = {...allActions[1], disabled: false};
                const action2: ActionItem = {...allActions[2], disabled: rowSelectionModel.length === 0}
                updatedActions.push(action1, action2);
            }

            setActions(updatedActions);
        }, 300), [memberTableType, rowSelectionModel]);

    useEffect(() => {
        debouncedUpdateActions(rowSelectionModel);
    }, [rowSelectionModel, debouncedUpdateActions]);

    useEffect(() => {
        if (memberTableType === MemberTableType.MemberList) {
            fetchData(queryParams).then()
        } else {
            fetchData({
                page: 1,
                pageSize: 10,
                sortDirection: queryParams.sortDirection,
                sortField: queryParams.sortField,
            }).then()
        }
    }, [memberTableType]);

    const handleSearch = useCallback((type: string, value: string) => {
        handleQueryChange({
            searchType: (value !== '') ? searchOption.find(item => item.value === type)?.key : undefined,
            searchValue: (value !== '') ? value : undefined,
        })
    }, []);

    const onRowSelectionModelChange = (rowSelectionModel: GridRowId[]) => {
        setRowSelectionModel(rowSelectionModel)
        if (memberTableType === MemberTableType.MemberList) {
            setPunterIds(rowSelectionModel as string[])
        }
    }

    const onRowClick = (params: GridCellParams, event: MuiEvent, details: GridCallbackDetails) => {
        if (params.field !== '__check__') {
            if (memberTableType === MemberTableType.MemberList) {
                normalProvider.normalNavigation(`${pathname}/${params.row.punterId}`)
            } else {
                riskGroupFormRiskIdRef.current = params.id.toString()
                setOpenRiskGroupFormDialog(true)
            }
        }
    }

    const handlePunterNumberClick = (riskId: string) => {
        selectedRiskGroup.current = riskGroups?.content.find(risk => risk.riskId === riskId)
        setOpenRiskGroupApplyDialog(true)
    }

    const handleQueryChange = useCallback((params: Record<string, any>) => {
            const isPageChange = Boolean(params['page']);
            setQueryParams(currentParams => ({
                ...currentParams,
                ...params,
                ...(isPageChange ? undefined : {page: 1})
            }));
        }, []);

    const handleDateRange = useCallback((dateRange: DateRange<Dayjs> | null) => {
        if (isSafeDateRange(dateRange)) {
            handleQueryChange({
                startDate: dateRange?.[0]?.unix(),
                endDate: dateRange?.[1]?.unix(),
            })
        }
    }, [])

    const handleQueryableSelectedValue = useCallback((path: string) => (options?: FilterButtonOptionItem[]) => {
        if (options) {
            const ids = options.map(option => option.id)

            handleQueryChange({
                [path]: ids.length > 0 ? ids : undefined
            })
        }
    }, [])

    const handleOnChange = (punterId: string, options: QueryableOptionItem<RiskGroupDataModel>[]) => {
        if (options) {
            const ids = options.map(option => option.id)
            updateMembersRiskLevel({
                punterIds: [punterId],
                riskId: ids[0]
            }).then((response) => {
                const isSuccess = response.failureIds.length === 0
                if (isSuccess) setRowSelectionModel([])
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: isSuccess ? 'success' : 'error',
                    show: true,
                    message: isSuccess ?
                        intl.formatMessage({
                            id: `${funType}.addMemberSuccessMsg`,
                            defaultMessage: 'Member added to the group successfully!'
                        }) :
                        intl.formatMessage({
                            id: `api.defaultErrorMsg`,
                            defaultMessage: 'Oops, something went wrong; please try again later.'
                        })
                })
            }).finally(() => {
                refreshData();
            })
        }
    };

    const handleTagEditClick = (id: string, tags: TagModel[]) => {
        editMemberTagsPunterIdRef.current = {
            punterId: id,
            tags: tags.map(tag => {
                return {id: tag.tagId, name: tag.tagName}
            })
        }

        setOpenEditMemberTagsDialog(true)
    }

    const fetchData = useCallback(async (request: LocalizedMemberParameters) => {
        try {
            setLoading(true);

            let response: RiskMembersListModel | RiskGroupListModel;

            if (memberTableType === MemberTableType.MemberList) {
                response = await getRiskMembers(request as GetRiskMembersParameters);
            } else {
                response = await getRiskGroup(request as GetRiskGroupsParameters);
            }

            if (memberTableType === MemberTableType.MemberList) {
                setRiskMembers(response as RiskMembersListModel);
            } else {
                setRiskGroups(response as RiskGroupListModel);
            }
        } catch (error) {
            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                severity: 'error',
                show: true,
                message: (error as Error).message || 'Error fetching data'
            });
        } finally {
            setLoading(false);
        }
    }, [memberTableType]);

    useEffect(() => {
        setCanClean((
            (queryParams.searchValue?.length ?? 0) +
            (queryParams.riskIds?.length ?? 0) +
            (queryParams.tagIds?.length ?? 0) +
            (queryParams.startDate ?? 0) +
            (queryParams.endDate ?? 0) > 0
        ))

        fetchData(queryParams).then()
    }, [queryParams]);

    const handleUpdatedRiskLevel = useCallback((value: string[]) => {
        updatedRiskLevelRef.current = value

        updateMembersRiskLevel({
            punterIds: punterIds,
            riskId: value[0]
        }).then((response) => {
            const isSuccess = response.failureIds.length === 0
            if (isSuccess) setRowSelectionModel([])
            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                severity: isSuccess ? 'success' : 'error',
                show: true,
                message: isSuccess ?
                    intl.formatMessage({
                        id: `${funType}.addMemberSuccessMsg`,
                        defaultMessage: 'Member added to the group successfully!'
                    }) :
                    intl.formatMessage({
                        id: `api.defaultErrorMsg`,
                        defaultMessage: 'Oops, something went wrong; please try again later.'
                    })
            })
        }).finally(() => {
            refreshData();
        })
    }, [punterIds])

    return {
        MemberTableType,
        memberTableType,
        handleTableTypeChange,
        tableType,
        canClean,
        searchOption,
        handleSearch,
        riskMembers,
        rowSelectionModel,
        onRowSelectionModelChange,
        handleQueryChange,
        memberListPageModel: {
            page: queryParams.page,
            pageSize: queryParams.pageSize,
        },
        loading,
        langCommonType,
        funType,
        handleDateRange,
        handleQueryableSelectedValue,
        memberTableTypes,
        searchOptionTypes,
        riskGroups,
        actions,
        handleActionClick,
        openChangeRiskLevelDialog,
        setOpenChangeRiskLevelDialog,
        updatedRiskLevel: updatedRiskLevelRef,
        handleUpdatedRiskLevel,
        openRiskGroupFormDialog,
        setOpenRiskGroupFormDialog,
        riskGroupFormRiskId: riskGroupFormRiskIdRef,
        onRowClick,
        handlePunterNumberClick,
        openRiskGroupApplyDialog,
        setOpenRiskGroupApplyDialog,
        selectedRiskGroup,
        handleOnChange,
        openEditMemberTagsDialog,
        setOpenEditMemberTagsDialog,
        handleTagEditClick,
        editMemberTagsPunterIdRef,
        refreshData
    }
}

export default useMemberViewModel