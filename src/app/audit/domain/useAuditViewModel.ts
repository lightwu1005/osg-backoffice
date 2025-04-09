import {toAuditProps} from '@/app/audit/models/RequestDataMapping';
import {SearchAuditParameters} from '@/app/audit/models/AuditParameters';
import useAuditRepository from "@/services/@audit/repository/useAuditRepository";
import React, {useCallback, useEffect, useState} from "react";
import {AuditModel} from "@/services/@core/module/ResponseDataModels";
import {debounce} from "lodash";
import {GlobalController} from "@/modules/common/GlobalController";
import {DateRange} from "@mui/x-date-pickers-pro";
import {Dayjs} from "dayjs";
import {isSafeDateRange} from "@/utils/tools";

const useAuditViewModel = () => {
    const auditRepo = useAuditRepository();
    const getAuditActions = useCallback(async () => {
        return await auditRepo.getAuditActions()
    }, [auditRepo])
    const getAuditList = useCallback(async (params: SearchAuditParameters) => {
        return await auditRepo.getAuditList(toAuditProps(params))
    }, [auditRepo])

    const shouldShowCleanButton = useCallback((search?: string, actions?: string[], startDate?: number, endDate?: number) => {
        const hasSearchOrActions = Boolean(search?.length || actions?.length);
        const hasValidDateRange = !!startDate || !!endDate;
        return hasSearchOrActions || hasValidDateRange;
    }, [])

    const [loading, setLoading] = React.useState<boolean>(false);
    const [canClean, setCanClean] = useState(false);
    const [queryParams, setQueryParams] = useState<SearchAuditParameters>({
        page: 1,
        pageSize: 10,
        search: '',
        actions: [],
        startDate: undefined,
        endDate: undefined,
        sortField: undefined,
        sortDirection: undefined,
    });
    const [actions, setActions] = useState<string[]>([])
    const [list, setList] = useState<AuditModel>();
    const globalController = GlobalController.getInstance();
    const [openDialog, setOpenDialog] = useState<{ open: boolean, content: string }>({
        open: false,
        content: ''
    });

    const handleDialogChange = ((content: string) => {
        setOpenDialog({open: true, content: content})
    })

    // Using debounce for search delay.
    const debouncedGetAuditList = useCallback(debounce(async (
        {
            queryParams,
            setLoading,
            callback
        }: {
            queryParams: SearchAuditParameters;
            setLoading: (isLoading: boolean) => void;
            callback: (response: AuditModel) => void;
        }) => {
        setLoading(true);
        getAuditList(queryParams)
            .then((response) => {
                callback(response);
            })
            .finally(() =>
                setLoading(false)
            )
    }, 500), [])

    const checkCleanButton = useCallback(() => {
        setCanClean(shouldShowCleanButton(queryParams.search, queryParams.actions, queryParams.startDate, queryParams.endDate));
    }, [shouldShowCleanButton, queryParams.search, queryParams.actions, queryParams.startDate, queryParams.endDate])

    const handleDateRange = useCallback((dateRange: DateRange<Dayjs> | null) => {
        if (isSafeDateRange(dateRange)) {
            handleQueryChange({
                startDate: dateRange?.[0]?.unix(),
                endDate: dateRange?.[1]?.unix(),
            })
        }
    }, [])

    const handleQueryChange = useCallback((params: Record<string, any>) => {
        const isPageChange = Boolean(params['page'])
        setQueryParams(currentParams => ({
            ...currentParams,
            ...params,
            ...(isPageChange ? undefined : {page: 1})
        }));
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            getAuditActions()
                .then((response) => {
                    setActions(response ?? [])
                })
                .catch((result) => {
                    globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                        severity: 'error',
                        show: true,
                        message: result
                    });
                })
            getAuditList(queryParams)
                .then((response) => {
                    setList(response ?? {} as AuditModel);
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
        };

        fetchData();
    }, [])

    useEffect(() => {
        checkCleanButton();
        debouncedGetAuditList({
            queryParams,
            setLoading,
            callback: (response: AuditModel) => {
                setList(response);
            },
        });
    }, [queryParams, checkCleanButton, debouncedGetAuditList])

    return {
        loading, list, actions, canClean,
        pageModel: {
            page: queryParams.page,
            pageSize: queryParams.pageSize
        },
        queryParams, handleQueryChange, handleDateRange, openDialog, setOpenDialog,
        handleDialogChange
    }
}

export default useAuditViewModel