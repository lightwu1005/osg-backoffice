import {ProviderInfoQueryParameters} from "@/app/dashboard/models/EventQueryParameters";
import {toProviderInformationProps, toProvidersProps} from "@/app/dashboard/models/RequestDataMapping";
import {ProviderInformationListModel} from "@/services/@core/module/ResponseDataModels";
import useCommonRepository from "@/services/@common/repository/useCommonRepository";
import {useCallback, useEffect, useState} from "react";
import {debounce} from "lodash";
import {GlobalController} from "@/modules/common/GlobalController";
import {getEnumKeyByValue} from "@/modules/common/DataProcessUnit";

export enum StatusListType {
    RUNNING = 'Running',
    LOST_CONNECTION = 'Lost Connection'
}

const useAdminTabContentViewModel = (sportId: string) => {
    const commonRepo = useCommonRepository();

    const getProviders = useCallback(async (sportId?: string): Promise<string[]> => {
        return await commonRepo.getProviders(toProvidersProps(sportId));
    }, [commonRepo])

    const getProviderInformation = useCallback(async (parameters: ProviderInfoQueryParameters): Promise<ProviderInformationListModel> => {
        return await commonRepo.getProviderInformation(toProviderInformationProps(parameters))
    }, [commonRepo])

    const [loading, setLoading] = useState(false);
    const [canClean, setCanClean] = useState(false);
    const [providers, setProviders] = useState<string[]>([]);
    const [list, setList] = useState<ProviderInformationListModel>();
    const [queryParams, setQueryParams] = useState<ProviderInfoQueryParameters>({
        page: 1,
        pageSize: 10,
        sportId: sportId,
        search: undefined,
        status: undefined,
        sortField: undefined,
        sortDirection: undefined,
    });
    const globalController = GlobalController.getInstance()

    const getData = useCallback(() => {
        setLoading(true);
        getProviderInformation(queryParams).then((response) => {
            setList(response);
        })
        .catch((result) => {
            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                severity: 'error',
                show: true,
                message: result
            });
        })
        .finally(() => {
            setLoading(false)
        });
    }, [queryParams, globalController, getProviderInformation])

    useEffect(() => {
        getProviders(sportId)
            .then(providers => setProviders(providers))
            .catch((result) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: result
                });
            })
        getData()
    }, []);


    useEffect(() => {
        const debouncedGetProviderInfoList = debounce(() => {
            getData();
        }, 500);

        setCanClean((queryParams.search?.length ?? 0) + (queryParams.status?.length ?? 0) > 0);
        debouncedGetProviderInfoList();
        return () => {
            debouncedGetProviderInfoList.cancel();
        };
    }, [queryParams]);

    const handleQueryChange = useCallback((params: Record<string, any>) => {
        const obj = Object.entries(params)
        const checkedParams = Object.fromEntries(obj.map(o => {
            const [key, value] = o
            let newValue = value
            switch (key) {
                case "search":
                    if ((value?.length ?? 0) === 0) {
                        newValue = undefined
                    } else {
                        newValue = value
                    }
                    break;
                case "status":
                    if ((value?.length ?? 0) === 0) {
                        newValue = undefined
                    } else {
                        newValue = (value as string[]).map(val => getEnumKeyByValue(StatusListType, val)).filter(Boolean)
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

    return {
        loading,
        pageModel: {
            page: queryParams.page,
            pageSize: queryParams.pageSize
        },
        providerInfoList: list,
        providers,
        canClean,
        handleQueryChange
    }
}

export default useAdminTabContentViewModel