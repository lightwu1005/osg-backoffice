import useApiInteractor from "@/services/@core/ApiInteractor";
import {GetTagsProps, UpdateTagsApplyProps} from "@/services/@core/module/RequestDataModels";
import {TagsListModel} from "@/services/@core/module/ResponseDataModels";

const useTagsRepository = () => {
    const apiInteractor = useApiInteractor()

    const getTags = async (props: GetTagsProps): Promise<TagsListModel> => {
        return await apiInteractor.getTags(props)
    }

    const updateTagsApply = async (props: UpdateTagsApplyProps) => {
        return await apiInteractor.updateTagsApply(props)
    }

    return {
        getTags,
        updateTagsApply
    }
}

export default useTagsRepository