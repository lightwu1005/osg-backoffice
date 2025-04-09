import useTagsRepository from "@/services/@tags/repository/useTagsRepository";
import {useCallback, useState} from "react";
import {toUpdateTagsApplyProps} from "@/app/member/models/RequestDataMapping";
import {UpdateTagsApplyParameters} from "@/app/member/models/MemberParameters";
import {GlobalController} from "@/modules/common/GlobalController";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import lodash from "lodash";
import {OptionItem} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {EditMemberTagsProps} from "@/app/member/components/pageComponent/EditMemberTagsDialog";

const useEditTagsModelViewModel = ({punterId, setOpen, onFinished}: EditMemberTagsProps) => {
    const tagsRepo = useTagsRepository()
    const intl = useIntl()
    const funCommonType = LocalizationFunctionType.Common
    const globalController = GlobalController.getInstance()

    const updateTagsApply = useCallback(async (prop: UpdateTagsApplyParameters) => {
        return await tagsRepo.updateTagsApply(toUpdateTagsApplyProps(prop))
    }, [tagsRepo])

    const [isSubmitEnable, setIsSubmitEnable] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [tagsSetting, setTagsSetting] = useState<OptionItem[]>()

    const handleQueryableSelectedValue = useCallback((options?: OptionItem[]) => {
        if (options) {
            handleTagsChanged(options)
        }
    }, [])

    const handleTagsChanged = useCallback((ids?: OptionItem[]) => {
        setTagsSetting(prevState => {
            if (lodash.isEqual(ids, prevState)) return prevState
            return ids
        })
    }, [])

    const updateTagsApplyData = useCallback(() => {
        const requestData: UpdateTagsApplyParameters = {
            punterId,
            tagIds: tagsSetting?.map(item => item.id) || []
        }

        setIsLoading(true)
        updateTagsApply(requestData)
            .then((response) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'success',
                    show: true,
                    message: response.result
                })
                setIsSubmitEnable(false)
            })
            .catch(error => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: error.message || error.result
                })
            })
            .finally(() => {
                setIsLoading(false)
                setOpen(false)
                onFinished()
            })
    }, [tagsSetting, punterId])

    return {
        isLoading,
        intl,
        funCommonType,
        handleQueryableSelectedValue,
        isSubmitEnable,
        updateTagsApplyData,
        tagsSetting,
        open,
        setOpen
    }
}

export default useEditTagsModelViewModel