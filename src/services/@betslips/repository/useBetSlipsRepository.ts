import useApiInteractor from "@/services/@core/ApiInteractor";
import {
    BetSlipAcceptanceProps,
    BetSlipExportProps,
    BetSlipVoidBetLegsProps,
    GetBetSlipsProps
} from "@/services/@core/module/RequestDataModels";

const useBetSlipsRepository = () => {
    const apiInteractor = useApiInteractor();

    const getBetSlipList = async (requestData: GetBetSlipsProps) => {
        return await apiInteractor.getBetSlipList(requestData);
    }

    const betSlipAcceptance = async (requestData: BetSlipAcceptanceProps) => {
        return await apiInteractor.betSlipAcceptance(requestData);
    }

    const betSlipVoidBetLegs = async (requestData: BetSlipVoidBetLegsProps) => {
        return await apiInteractor.betSlipVoidBetLegs(requestData);
    }

    const betSlipExport = async (requestData: BetSlipExportProps) => {
        return await apiInteractor.betSlipExport(requestData);
    }

    return {
        getBetSlipList,
        betSlipAcceptance,
        betSlipVoidBetLegs,
        betSlipExport
    }
}

export default useBetSlipsRepository