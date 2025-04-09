import useApiInteractor from "@/services/@core/ApiInteractor";
import {
    GetRiskMembersBetSlipsProps,
    GetRiskMembersPerformanceProps,
    GetRiskMembersProps
} from "@/services/@core/module/RequestDataModels";

const useRiskMemberRepository = () => {
    const apiInteractor = useApiInteractor()

    const getRiskMembers = async (props: GetRiskMembersProps) => {
        return await apiInteractor.getRiskMembers(props)
    }

    const getRiskMembersBetSlips = async (props: GetRiskMembersBetSlipsProps) => {
        return await apiInteractor.getRiskMembersBetSlips(props)
    }

    const getRiskMembersPerformanceTotalAmount = async (props: GetRiskMembersPerformanceProps) => {
        return await apiInteractor.getRiskMembersPerformanceTotalAmount(props)
    }

    const getRiskMembersPerformanceWinLossRate = async (props: GetRiskMembersPerformanceProps) => {
        return await apiInteractor.getRiskMembersPerformanceWinLossRate(props)
    }

    return {
        getRiskMembers,
        getRiskMembersBetSlips,
        getRiskMembersPerformanceTotalAmount,
        getRiskMembersPerformanceWinLossRate
    }
}

export default useRiskMemberRepository