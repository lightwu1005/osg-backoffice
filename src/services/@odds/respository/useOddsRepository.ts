import useApiInteractor from "@/services/@core/ApiInteractor";
import {
    MarketBalanceProps,
    OddsListProps,
    OddsMarginCalculateProps,
    OddsMarginProps,
    OddsMarketStatusProps,
    OddsUpdateEventStatusProps,
    SetProviderPreferenceProps,
    UpdateOddsMarginProps
} from "@/services/@core/module/RequestDataModels";

const useOddsRepository = () => {
    const apiInteractor = useApiInteractor()
    const getDisplayTypes = async () => {
        const response = await apiInteractor.getDisplayTypes()
        return response
    }

    const getOddsList = async (props: OddsListProps) => {
        const response = await apiInteractor.getOddsList(props)
        return response
    }

    const getMarketBalance = async (props: MarketBalanceProps) => {
        const response = await apiInteractor.getMarketBalance(props)
        return response
    }

    const updateOddsMarketStatus = async (props: OddsMarketStatusProps) => {
        const response = await apiInteractor.updateOddsMarketStatus(props)
        return response
    }

    const setProviderPreference = async (props: SetProviderPreferenceProps) => {
        const response = await apiInteractor.setProviderPreference(props)
        return response
    }

    const updateOddsEventStatus = async (props: OddsUpdateEventStatusProps) => {
        const response = await apiInteractor.updateOddsEventStatus(props)
        return response
    }

    const getOddsMargin = async (props: OddsMarginProps) => {
        const response = await apiInteractor.getOddsMargin(props)
        return response
    }


    const updateOddsMargin = async (props: UpdateOddsMarginProps) => {
        const response = await apiInteractor.updateOddsMargin(props)
        return response
    }


    const oddsMarginCalculate = async (props: OddsMarginCalculateProps) => {
        const response = await apiInteractor.oddsMarginCalculate(props)
        return response
    }

    return {
        getDisplayTypes,
        // getOddsList,
        getMarketBalance,
        updateOddsMarketStatus,
        setProviderPreference,
        updateOddsEventStatus,
        getOddsMargin,
        updateOddsMargin,
        oddsMarginCalculate,
    }
}

export default useOddsRepository