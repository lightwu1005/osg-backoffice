import {QueryableSelectViewModel, QueryParams} from "@/modules/components/TextField/QueryableSelectTextField/QueryableSelectTextField";
import {TagsDataModel} from "@/services/@core/module/ResponseDataModels";
import {OptionItem} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {toGetTagsProps} from "@/app/member/models/RequestDataMapping";
import {GetTagsParameters} from "@/app/member/models/MemberParameters";
import useTagsRepository from "@/services/@tags/repository/useTagsRepository";

export class TagsListViewModel extends QueryableSelectViewModel<TagsDataModel> {
    tagsRepo = useTagsRepository()

    override toOptionItem = (content: TagsDataModel[]): OptionItem[] => {
        return content.map(item => {
            return {
                id: item.tagId,
                name: item.tagName
            }
        })
    }

    override call = async (queryParams: QueryParams) => {
        const params: GetTagsParameters = {
            page: queryParams.page,
            pageSize: queryParams.pageSize
        };
        return await this.tagsRepo.getTags(toGetTagsProps(params))
    }
}