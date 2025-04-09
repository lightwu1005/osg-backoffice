import {
    LeagueModel, ListResponseModel,
    LocationModel, MarketsModel,
    SportsDataModel
} from "@/services/@core/module/ResponseDataModels";
import useApiInteractor from "@/services/@core/ApiInteractor";
import {
    GetMarketsProps,
    LeaguesProps,
    LocationsProps,
    ProviderInformationProps,
    ProvidersProps
} from "@/services/@core/module/RequestDataModels";

const useCommonRepository = () => {
    const apiInteractor = useApiInteractor()
    const getSportsCategories = async (): Promise<SportsDataModel[]> => {
        return await apiInteractor.getSportsCategories()
    }

    const getLeagues = async (requestData: LeaguesProps): Promise<ListResponseModel<LeagueModel>> => {
        return await apiInteractor.getLeagues(requestData)
    }

    const getLocations = async (requestData: LocationsProps): Promise<LocationModel[]> => {
        return await apiInteractor.getLocations(requestData)
    }

    const getProviders = async (requestData: ProvidersProps): Promise<string[]> => {
        return await apiInteractor.getProviders(requestData)
    }

    const getProviderInformation = async (requestData: ProviderInformationProps) => {
        return await apiInteractor.getProviderInformation(requestData)
    }

    const getEventStatus = async () => {
        return await apiInteractor.getEventStatus()
    }

    const getDangerBalls = async (): Promise<string[]> => {
        return await apiInteractor.getDangerBalls()
    }

    const getMarkets = async (requestData: GetMarketsProps): Promise<MarketsModel> => {
        return await apiInteractor.getMarkets(requestData)
    }

    return {
        getSportsCategories,
        getLeagues,
        getLocations,
        getProviders,
        getProviderInformation,
        getEventStatus,
        getDangerBalls,
        getMarkets
    }
}

export default useCommonRepository