import React, {useCallback, useEffect, useState} from "react";
import {
    toGetRiskMembersProps,
    toUpdateRiskGroupApplyProps
} from "@/app/member/models/RequestDataMapping";
import {
    GetRiskMembersParameters,
    UpdateRiskGroupApplyParameters
} from "@/app/member/models/MemberParameters";
import {GlobalController} from "@/modules/common/GlobalController";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import lodash from "lodash";
import useRiskGroupRepository from "@/services/@riskGroups/repository/useRiskGroupsRepository";
import {ActionItem} from "@/modules/components/buttons/actionButton/ActionButton";
import {GridRowId} from "@mui/x-data-grid";
import useRiskMemberRepository from "@/services/@riskMembers/repository/useRiskMemberRepository";
import {RiskMembersListModel} from "@/services/@core/module/ResponseDataModels";
import {useMemberLocalization} from "@/services/@member/useCase";

const useAddMemberModelViewModel = (riskId: string) => {
    const riskGroupRepo = useRiskGroupRepository()
    const riskMemberRepo = useRiskMemberRepository()
    const intl = useIntl()
    const funCommonType = LocalizationFunctionType.Common
    const funType = LocalizationFunctionType.Member;
    const globalController = GlobalController.getInstance()

    const getRiskMembers = useCallback(async (prop: GetRiskMembersParameters) => {
        return await riskMemberRepo.getRiskMembers(toGetRiskMembersProps(prop))
    }, [riskMemberRepo])

    const updateRiskGroupApply = useCallback(async (prop: UpdateRiskGroupApplyParameters) => {
        return await riskGroupRepo.updateRiskGroupApply(toUpdateRiskGroupApplyProps(prop))
    }, [riskGroupRepo])

    const [queryParams, setQueryParams] = useState<GetRiskMembersParameters>({
        page: 1,
        pageSize: 10,
    });

    const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowId[]>([]);
    const [loading, setLoading] = useState(false);
    const [riskMembers, setRiskMembers] = useState<RiskMembersListModel>()
    const memberLocalization = useMemberLocalization()

    const searchOption: ActionItem[] = memberLocalization.DefaultMemberSearchOptionTypes()

    const handleQueryChange = useCallback((params: Record<string, any>) => {
        setQueryParams(prevParams => ({
            ...prevParams,
            ...params,
        }));
    }, []);

    const onRowSelectionModelChange = (rowSelectionModel: GridRowId[]) => {
        setRowSelectionModel(rowSelectionModel)
    }

    const getRiskMembersData = useCallback((request: GetRiskMembersParameters) => {
        setLoading(true)
        getRiskMembers(request).then(response => {
            setRiskMembers(prevState => {
                if (lodash.isEqual(prevState, response)) return prevState
                return response
            })
        }).catch((error) => {
            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                severity: 'error',
                show: true,
                message: error
            })
        }).finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        getRiskMembersData(queryParams)
    }, [queryParams]);

    const onClickPublish = useCallback(() => {
        const requestData: UpdateRiskGroupApplyParameters = {
            riskId: riskId,
            punterIds: rowSelectionModel as string[]
        }

        updateRiskGroupApply(requestData).then(response => {
            const isSuccess = response.failureIds.length === 0
            if (isSuccess) setRowSelectionModel([])
            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                severity: isSuccess ? 'success' : 'error',
                show: true,
                message: isSuccess ?
                    intl.formatMessage({ id: `${funType}.addMemberSuccessMsg`, defaultMessage: 'Member added to the group successfully!' }) :
                    intl.formatMessage({ id: `api.defaultErrorMsg`, defaultMessage: 'Oops, something went wrong; please try again later.' })
            })
        })
    }, [rowSelectionModel, riskId])


    return {
        searchOption,
        handleQueryChange,
        intl,
        funCommonType,
        funType,
        rowSelectionModel,
        onRowSelectionModelChange,
        loading,
        pageModel: {
            page: queryParams.page,
            pageSize: queryParams.pageSize
        },
        riskMembers,
        onClickPublish,
        isEditable: rowSelectionModel.length > 0
    }
}

export default useAddMemberModelViewModel