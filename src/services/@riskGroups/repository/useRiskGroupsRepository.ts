import useApiInteractor from "@/services/@core/ApiInteractor";
import {
    AddRiskGroupProps,
    DeleteRiskGroupsProps,
    GetRiskGroupDetailProps,
    GetRiskGroupsProps,
    RiskGroupsApplyingPuntersProps, UpdateRiskGroupApplyProps,
    UpdateRiskGroupDetailProps
} from "@/services/@core/module/RequestDataModels";

const useRiskGroupRepository = () => {
    const apiInteractor = useApiInteractor()

    const getRiskGroups = async (props: GetRiskGroupsProps) => {
        return await apiInteractor.getRiskGroups(props)
    }

    const addRiskGroup = async (props: AddRiskGroupProps) => {
        return await apiInteractor.addRiskGroup(props)
    }

    const deleteRiskGroups = async (props: DeleteRiskGroupsProps) => {
        return await apiInteractor.deleteRiskGroups(props)
    }

    const getRiskGroupDetail = async (props: GetRiskGroupDetailProps) => {
        return await apiInteractor.getRiskGroupDetail(props)
    }

    const updateRiskGroupDetail = async (props: UpdateRiskGroupDetailProps) => {
        return await apiInteractor.updateRiskGroupDetail(props)
    }

    const getRiskGroupsApplyingPunters = async (props: RiskGroupsApplyingPuntersProps) => {
        return await apiInteractor.getRiskGroupsApplyingPunters(props)
    }

    const updateRiskGroupApply = async (props: UpdateRiskGroupApplyProps) => {
        return await apiInteractor.updateRiskGroupApply(props)
    }

    return {
        getRiskGroups,
        addRiskGroup,
        deleteRiskGroups,
        getRiskGroupDetail,
        updateRiskGroupDetail,
        getRiskGroupsApplyingPunters,
        updateRiskGroupApply
    }
}

export default useRiskGroupRepository