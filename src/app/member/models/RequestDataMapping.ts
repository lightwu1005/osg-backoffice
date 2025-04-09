import {
    GetRiskGroupApplyingParameters,
    GetRiskGroupsParameters,
    GetRiskMembersBetSlipsParameters,
    GetRiskMembersParameters,
    GetRiskMembersPerformanceTotalAmountParameters,
    GetRiskMembersPerformanceWinLossRateParameters,
    GetTagsParameters,
    UpdateRiskGroupApplyParameters,
    UpdateTagsApplyParameters
} from "@/app/member/models/MemberParameters";
import {
    AddRiskGroupProps, DeleteRiskGroupsProps,
    GetRiskGroupDetailProps,
    GetRiskGroupsProps, GetRiskMembersBetSlipsProps, GetRiskMembersPerformanceProps,
    GetRiskMembersProps,
    GetTagsProps,
    RiskGroupsApplyingPuntersProps,
    UpdateRiskGroupApplyProps,
    UpdateRiskGroupDetailProps,
    UpdateTagsApplyProps
} from "@/services/@core/module/RequestDataModels";
import {RiskGroupDetailModel} from "@/services/@core/module/CommonDataModels";

type ParameterType = 'query' | 'body';

const createProps = <T, R>(type: ParameterType, parameters: T): R => {
    return {
        [type]: {
            ...parameters
        }
    } as R;
}

export const toGetRiskGroupsProps = (parameters: GetRiskGroupsParameters): GetRiskGroupsProps => {
    return createProps<GetRiskGroupsParameters, GetRiskGroupsProps>('query', parameters);
}

export const toDeleteRiskGroupsProps = (riskIds: string[]): DeleteRiskGroupsProps => {
    return createProps<{riskIds: string[]}, DeleteRiskGroupsProps>('body', {riskIds: riskIds});
}

export const toGetTagsProps = (parameters: GetTagsParameters): GetTagsProps => {
    return createProps<GetTagsParameters, GetTagsProps>('query', parameters);
}

export const toUpdateTagsApplyProps = (parameters: UpdateTagsApplyParameters): UpdateTagsApplyProps => {
    return createProps<UpdateTagsApplyParameters, UpdateTagsApplyProps>('body', parameters);
}

export const toUpdateRiskGroupApplyProps = (parameters: UpdateRiskGroupApplyParameters): UpdateRiskGroupApplyProps => {
    return createProps<UpdateRiskGroupApplyParameters, UpdateRiskGroupApplyProps>('body', parameters);
}

export const toGetRiskMembersProps = (parameters: GetRiskMembersParameters): GetRiskMembersProps => {
    return createProps<GetRiskMembersParameters, GetRiskMembersProps>('query', parameters);
}

export const toGetRiskMembersBetSlipsProps = (parameters: GetRiskMembersBetSlipsParameters): GetRiskMembersBetSlipsProps => {
    return createProps<GetRiskMembersBetSlipsParameters, GetRiskMembersBetSlipsProps>('query', parameters);
}

export const toGetRiskMembersPerformanceProps = (parameters: GetRiskMembersPerformanceTotalAmountParameters | GetRiskMembersPerformanceWinLossRateParameters): GetRiskMembersPerformanceProps => {
    return createProps<GetRiskMembersPerformanceTotalAmountParameters | GetRiskMembersPerformanceWinLossRateParameters, GetRiskMembersPerformanceProps>('query', parameters);
}

export const idToGetRiskMembersProps = (punterId: string): GetRiskMembersProps => {
    return {
        query: {
            page: 1,
            pageSize: 10,
            searchKey: 'PUNTER_ID',
            searchValue: punterId
        }
    }
}

export const toRiskGroupApplyingProps = (parameters: GetRiskGroupApplyingParameters): RiskGroupsApplyingPuntersProps => {
    return createProps<GetRiskGroupApplyingParameters, RiskGroupsApplyingPuntersProps>('query', parameters);
}

export const toAddRiskGroupDetail = (parameters: RiskGroupDetailModel): AddRiskGroupProps => {
  return createProps<RiskGroupDetailModel, AddRiskGroupProps>('body', parameters);
}

export const toUpdateRiskGroupDetail = (riskId: string, parameters: RiskGroupDetailModel): UpdateRiskGroupDetailProps => {
    return {
        endPoint: {
            riskId
        },
        body: {
            ...parameters
        }
    }
}

export const toGetRiskGroupDetailProps = (riskId: string): GetRiskGroupDetailProps => {
    return {
        endPoint: {
            riskId
        }
    }
}