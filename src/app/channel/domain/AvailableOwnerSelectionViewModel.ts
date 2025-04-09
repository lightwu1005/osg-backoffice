import {
    QueryableSelectViewModel
} from "@/modules/components/TextField/QueryableSelectTextField/QueryableSelectTextField";
import useChannelRepository from "@/services/@channel/respository/useChannelRepository";
import {AvailableOwnerContent} from "@/services/@core/module/ResponseDataModels";
import {Functionality} from "@/services/@core/module/Enum";
import useBrandsRepository from "@/services/@brands/repository/useBrandsRepository";
import {toGetAvailableOwners} from "../models/RequestDataMapping";
import {OptionItem, QueryParams} from "@/modules/components/buttons/multipleFilterButton/models/Interface";

export interface OptionModelItem extends OptionItem {
    model?: AvailableOwnerContent
}

export class AvailableOwnerSelectionViewModel extends QueryableSelectViewModel<AvailableOwnerContent> {
    channelRepo = useChannelRepository();
    brandRepo = useBrandsRepository();

    override toOptionItem = (content: AvailableOwnerContent[]): OptionModelItem[] => {
        return content.map(model => {
            return {
                id: model.uuid,
                name: model.userName,
                model: model
            }
        })
    }

    override call = async (queryParams: QueryParams) => {
        const params = {
            page: queryParams.page,
            pageSize: queryParams.pageSize
        };

        const userFunctionality = process.env.FUNCTIONALITY || '';

        if (userFunctionality === Functionality.Admin) {
            return await this.channelRepo.getAvailableOwners(toGetAvailableOwners(params.page, params.pageSize));
        } else {
            return await this.brandRepo.getAvailableOwners(toGetAvailableOwners(params.page, params.pageSize));
        }
    }
}