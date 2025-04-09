import {
    OptionItem,
    QueryableSelectViewModel, QueryParams
} from "@/modules/components/TextField/QueryableSelectTextField/QueryableSelectTextField";
import {RiskGroupDataModel} from "@/services/@core/module/ResponseDataModels";
import useRiskGroupRepository from "@/services/@riskGroups/repository/useRiskGroupsRepository";
import {toGetRiskGroupsProps} from "@/app/member/models/RequestDataMapping";

export class DropdownChipViewModel extends QueryableSelectViewModel<RiskGroupDataModel> {
    riskGroupRepo = useRiskGroupRepository();

    override toOptionItem = (content: RiskGroupDataModel[]): OptionItem<RiskGroupDataModel>[] => {
        return content.map(model => {
            return {
                id: model.riskId,
                name: model.riskName,
                data: model
            }
        })
    }

    override call = async (queryParams: QueryParams) => {
        const params = {
            page: queryParams.page,
            pageSize: queryParams.pageSize
        };

        return await this.riskGroupRepo.getRiskGroups(toGetRiskGroupsProps(params))
    }
}