import {QueryableSelectViewModel, QueryParams} from "@/modules/components/TextField/QueryableSelectTextField/QueryableSelectTextField";
import {RiskGroupDataModel} from "@/services/@core/module/ResponseDataModels";
import {OptionItem} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import useRiskGroupRepository from "@/services/@riskGroups/repository/useRiskGroupsRepository";
import {toGetRiskGroupsProps} from "@/app/member/models/RequestDataMapping";
import {GetRiskGroupsParameters} from "@/app/member/models/MemberParameters";

export class TagSelectionViewModel extends QueryableSelectViewModel<RiskGroupDataModel> {
    riskGroupRepo = useRiskGroupRepository();

    override toOptionItem = (content: RiskGroupDataModel[]): OptionItem[] => {
        return content.map(item => {
            return {
                id: item.riskId,
                name: item.riskName
            }
        })
    }

    override call = async (queryParams: QueryParams) => {
        const params: GetRiskGroupsParameters = {
            page: queryParams.page,
            pageSize: queryParams.pageSize
        };
        return await this.riskGroupRepo.getRiskGroups(toGetRiskGroupsProps(params))
    }
}