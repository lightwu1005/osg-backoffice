import useTemplateRepository from "@/services/@template/respository/useTemplateRepository"
import {
    GetTemplatesParameters,
    GetApplyEventsParameters
} from "@/app/template/models/TemplateParameters";
import {
    toRemoveTemplatesProps, toGetTemplateDetailProps,
    toGetTemplatesProps, toGetApplyEventsProps
} from "@/app/template/models/RequestDataMapping"
import React, {useCallback, useEffect, useRef, useState} from "react";
import {
    GetApplyEventsDataModel,
    GetTemplateDetailModel,
    GetTemplateListDataModel
} from "@/services/@core/module/ResponseDataModels";
import {StatusButtonGroupProps, StatusItem} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup"
import {ActionItem} from "@/modules/components/buttons/actionButton/ActionButton";
import {GlobalController} from "@/modules/common/GlobalController";
import {GridCellParams, GridRowId} from "@mui/x-data-grid";
import {MuiEvent} from "@mui/x-data-grid-pro";
import {GridCallbackDetails} from "@mui/x-data-grid/models/api";
import {AlertDialogProps, buildAlertDialogProps} from "@/modules/components/dialog/AlertDialog";
import useTabViewModel from "@/viewModels/useTabViewModel";
import {EventType, SortDirection} from "@/services/@core/module/Enum";
import {DefaultEventTypes} from "@/services/@event/useCase";
import PermissionHandler from "@/modules/common/PermissionHandler";
import IdentityHandler from "@/modules/common/IdentityHandler";
import {usePathname} from "next/navigation";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

const enum Action {
    Add,
    Duplicate,
    Remove
}

enum SettingLevel {
    SPORT = 'Sport',
    LEAGUE = 'League'
}

export interface SearchTemplatesParameters {
    eventType: string
    page: number
    pageSize: number
    search?: string
    settingLevels?: string[]
    sportNames?: string[]
    sortField?: string
    sortDirection?: SortDirection
}

export interface ActivatingModelHeader {
    templateName: string
    eventNumber: string
    templateId: string
    eventType: string
    searchType?: string
    totalNumber?: number
}

const useTemplateViewModel = () => {
    const templateRepo = useTemplateRepository()
    const {sportCategories} = useTabViewModel()
    const globalController = GlobalController.getInstance()
    const intl = useIntl()
    const funType = LocalizationFunctionType.Template
    const funCommonType = LocalizationFunctionType.Common
    const levelList: StatusItem[] = DefaultEventTypes(intl)

    const allActions: { [n: number]: ActionItem } = {
        0: {
            key: Action.Add,
            value: intl.formatMessage({id: `${funType}.actionAdd`, defaultMessage: 'Add Template'}),
        },
        1: {
          key: Action.Duplicate,
          value: intl.formatMessage({id: `${funType}.actionDuplicate`, defaultMessage: 'Duplicate Template'}),
        },
        2: {
            key: Action.Remove,
            value: intl.formatMessage({id: `${funType}.actionRemove`, defaultMessage: 'Remove Template'}),
        }
    }

    const [templateQueryParams, setTemplateQueryParams] = useState<SearchTemplatesParameters>({
        eventType: EventType.inPlay,
        page: 1,
        pageSize: 10,
        search: undefined,
        settingLevels: undefined,
        sportNames: undefined,
        sortField: undefined,
        sortDirection: undefined
    });

    const [removeTemplate, setRemoveTemplate] = useState(false)
    const [loading, setLoading] = useState(false);
    const [canClean, setCanClean] = useState(false);
    const [showEventDialog, setShowEventDialog] = useState<boolean>(false)
    const [showTemplateModelDialog, setShowTemplateModelDialog] = useState<boolean>(false)
    const [editTemplateId, setEditTemplateId] = useState<string>('')
    const [actions, setActions] = useState<ActionItem[]>([allActions[Action.Add]]);
    const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowId[]>([]);
    const [templateList, setTemplateList] = useState<GetTemplateListDataModel>();
    const [currentActivatingHeader, setCurrentActivatingHeader] = useState<ActivatingModelHeader>({
        templateName: '',
        eventNumber: '',
        eventType: 'inPlay',
        templateId: '',
        searchType: '',
        totalNumber: 0
    })
    const [showRemoveDialog, setShowRemoveDialog] = useState(false)
    const [showActiveItemDialog, setShowActiveItemDialog] = useState(false)
    const [alertDialogProps, setAlertDialogProps] = useState<AlertDialogProps>(buildAlertDialogProps(
        intl.formatMessage({id: `${funType}.removeTemplate`, defaultMessage: 'Remove Template'}),
        intl.formatMessage({id: `${funType}.removeTemplateDescription`,
            defaultMessage: 'This action cannot be undone. Are you sure you want to remove these templates ?'}),
        () => setShowRemoveDialog(false),
        () => {
            setRemoveTemplate(true)
            setShowRemoveDialog(false)
        }
    ))
    const [isDuplicate, setIsDuplicate] = useState<boolean>(false)
    const lastRequestKey = useRef<number>(0)
    const {isEditable: checkEdit} = PermissionHandler();
    const {userRole} = IdentityHandler();
    const pathname = usePathname();
    const currentPathName = pathname ? pathname.split('/').pop() : '';
    const isEditable = checkEdit(userRole, currentPathName ?? '');

    const getTemplates = useCallback(async (props: GetTemplatesParameters): Promise<GetTemplateListDataModel> => {
        return await templateRepo.getTemplates(toGetTemplatesProps(props))
    }, [templateRepo])

    const removeTemplates = useCallback(async (props: string[]) => {
        return await templateRepo.removeTemplates(toRemoveTemplatesProps(props))
    }, [templateRepo])

    const getTemplateDetail = useCallback(async (prop: string): Promise<GetTemplateDetailModel> => {
        return await templateRepo.getTemplateDetail(toGetTemplateDetailProps(prop))
    }, [templateRepo])

    const getApplyEvents = useCallback(async (props: GetApplyEventsParameters): Promise<GetApplyEventsDataModel> => {
        return await templateRepo.getApplyEvents(toGetApplyEventsProps(props))
    }, [templateRepo])

    const handleActionClick = useCallback((item: ActionItem) => {
        switch (item.key) {
            case Action.Add:
                setIsDuplicate(false)
                setEditTemplateId('')
                setShowTemplateModelDialog(true)
                break
            case Action.Remove:
                setShowRemoveDialog(true)
                break
            case Action.Duplicate:
                setIsDuplicate(true)
                setEditTemplateId(rowSelectionModel[0] as string)
                setShowTemplateModelDialog(true)
                break
        }
    }, [rowSelectionModel])

    const handleQueryChange = useCallback((params: Record<string, any>) => {
        const obj = Object.entries(params)
        const checkedParams = Object.fromEntries(obj.map(o => {
            const [key, value] = o
            let newValue = value
            switch (key) {
                case "eventType":
                    setCurrentActivatingHeader(prevState => {
                        return {
                            ...prevState,
                            eventType: value
                        }
                    })
                    break
                case "search":
                case "settingLevels":
                case "sportNames":
                    if ((value?.length ?? 0) === 0) {
                        newValue = undefined
                    }
                    break
                case "sortField":
                    if (newValue === "oddsSettings")
                        newValue = "maximum" // on oddsSettings, maximum is the key of sortField
            }
            return [key, newValue]
        }))
        const isPageChange = Boolean(params['page'])
        setTemplateQueryParams(currentParams => ({
            ...currentParams,
            ...checkedParams,
            ...(isPageChange ? undefined : {page: 1})
        }));
    }, []);

    const onRowSelectionModelChange = (rowSelectionModel: GridRowId[]) => {
        setRowSelectionModel(rowSelectionModel)
    }

    useEffect(() => {
        const actions: ActionItem[] = []
        const content = templateList?.content
        if (!content) return
        if (isEditable) actions.push(allActions[Action.Add])
        if (rowSelectionModel.length === 1) {
            actions.push(allActions[Action.Duplicate])
        }
        if (rowSelectionModel.length > 0) {
            actions.push(allActions[Action.Remove])
        }
        setActions(actions)
    }, [rowSelectionModel, templateList?.content]);

    const onCellClick = async (params: GridCellParams, event: MuiEvent, details: GridCallbackDetails) => {
        if (params.field === '__check__') return

        const currentTemplate = templateList?.content.find(item => item.templateId === params.id)
        if (!currentTemplate) return // If currentTemplate is null, do nothing

        const { eventNumber, templateName, settingLevel } = params.row;
        const { templateId } = currentTemplate;
        switch (params.field) {
            case 'eventNumber':
                setCurrentActivatingHeader(prevState => {
                    return {
                        ...prevState,
                        eventNumber: eventNumber,
                        templateName: templateName,
                        templateId: templateId,
                        searchType: settingLevel.level,
                        totalNumber: settingLevel.totalNumber
                    }
                })
                setShowEventDialog(true)
                break
            case 'settingLevel':
                setCurrentActivatingHeader(prevState => {
                    return {
                        ...prevState,
                        templateName: templateName,
                        templateId: templateId,
                        searchType: settingLevel.level,
                        totalNumber: settingLevel.totalNumber
                    }
                })
                setShowActiveItemDialog(true)
                break
            default:
                setIsDuplicate(false)
                setEditTemplateId(currentTemplate!.templateId)
                setShowTemplateModelDialog(true)
                break
        }
    }

    const getTemplateData = useCallback(() => {
        setLoading(true)
        const randomKey = Math.random()
        lastRequestKey.current = randomKey
        let selectedIds
        let selectedLevels
        if (templateQueryParams.sportNames) {
            selectedIds = []
            for (let name of templateQueryParams.sportNames) {
                const sportId = sportCategories.find(item => item.sportName === name)?.sportId
                if (sportId) {
                    selectedIds.push(sportId)
                }
            }
        }
        if (templateQueryParams.settingLevels) {
            selectedLevels = []
            for (let name of templateQueryParams.settingLevels) {
                selectedLevels.push(name.toUpperCase())
            }
        }
        const requestParams: GetTemplatesParameters = {
            eventType: templateQueryParams.eventType,
            page: templateQueryParams.page,
            pageSize: templateQueryParams.pageSize,
            search: templateQueryParams.search,
            sportIds: selectedIds,
            settingLevel: selectedLevels,
            sortField: templateQueryParams.sortField,
            sortDirection: templateQueryParams.sortDirection
        }

        getTemplates(requestParams)
            .then((response) => {
                if (lastRequestKey.current !== randomKey) return
                setTemplateList(response)
            })
            .catch((error) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: error
                })
            })
            .finally(() => {
                if (lastRequestKey.current !== randomKey) return
                setLoading(false)
            })
    }, [templateQueryParams, lastRequestKey.current])

    useEffect(() => {
        setCanClean((
            (templateQueryParams.search?.length ?? 0) +
            (templateQueryParams.settingLevels?.length ?? 0) +
            (templateQueryParams.sportNames?.length ?? 0)
            > 0)
        );
        getTemplateData()
    }, [templateQueryParams]);

    const removeTemplateFn = useCallback(() => {
        setLoading(true)
        removeTemplates(rowSelectionModel as string[])
            .then((response) => {
                setRowSelectionModel([])
                getTemplateData()
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: response.failures.length > 0 ? 'warning' : 'success',
                    show: true,
                    message: response.failures.length > 0
                        ? intl.formatMessage({id: `${funType}.removeTemplatePartiallySuccess`,
                            defaultMessage: 'Partial success, Please try {ids} again later.'}, {
                            ids: response.failures.map(item => item.templateName).join(', ')})
                        : intl.formatMessage({id: `${funType}.removeTemplateSuccess`,
                            defaultMessage: 'Template has been removed successfully!'}),
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
                setRemoveTemplate(false)
                setLoading(false)
            })
    }, [setLoading, removeTemplate, rowSelectionModel, setRowSelectionModel, globalController, getTemplateData])

    useEffect(() => {
        if (removeTemplate) {
            removeTemplateFn()
        }
    }, [removeTemplate])

    const statusButtonGroup: StatusButtonGroupProps = {
        items: levelList,
        selectedIndex: levelList.findIndex(type =>
            type.key === templateQueryParams.eventType),
        onClick: (_: number, key: string) => {
            handleQueryChange({
                eventType: key,
            })
        }
    }

    return {
        SettingLevel,
        loading,
        isEditable,
        getTemplates,
        removeTemplates,
        getTemplateDetail,
        getApplyEvents,
        sportCategories,
        statusButtonGroup,
        handleActionClick,
        actions,
        templateList,
        canClean,
        pageModel: {
            page: templateQueryParams.page,
            pageSize: templateQueryParams.pageSize
        },
        onRowSelectionModelChange,
        handleQueryChange,
        rowSelectionModel,
        onCellClick,
        showEventDialog,
        setShowEventDialog,
        currentActivatingHeader,
        showRemoveDialog,
        setShowRemoveDialog,
        alertDialogProps,
        showTemplateModelDialog,
        setShowTemplateModelDialog,
        editTemplateId,
        templateQueryParams,
        refresh: getTemplateData,
        intl,
        funType,
        funCommonType,
        showActiveItemDialog,
        setShowActiveItemDialog,
        isDuplicate
    }
}

export default useTemplateViewModel