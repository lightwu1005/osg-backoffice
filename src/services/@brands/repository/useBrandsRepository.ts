import useApiInteractor from "@/services/@core/ApiInteractor";
import {
    AddBrandProps,
    BrandListProps, GetAvailableOwnerProps,
    GetBrandDetailProps, GetConfigurationProps,
    RemoveBrandProps, UpdateBrandConfigurationProps,
    UpdateBrandProps,
    UpdateBrandStatusProps,
} from "@/services/@core/module/RequestDataModels";

const useBrandsRepository = () => {
    const apiInteractor = useApiInteractor();

    const addBrand = async (requestData: AddBrandProps) => {
        return await apiInteractor.addBrand(requestData);
    }

    const updateBrand = async (requestData: UpdateBrandProps) => {
        return await apiInteractor.updateBrand(requestData);
    }

    const getBrandList = async (requestData: BrandListProps) => {
        return await apiInteractor.getBrandList(requestData);
    }

    const removeBrands = async (requestData: RemoveBrandProps) => {
        return await apiInteractor.removeBrands(requestData);
    }

    const updateBrandStatus = async (requestData: UpdateBrandStatusProps) => {
        return await apiInteractor.updateBrandStatus(requestData);
    }

    const getBrandDetail = async (requestData: GetBrandDetailProps) => {
        return await apiInteractor.getBrandDetail(requestData);
    }

    const getConfiguration = async (requestData: GetConfigurationProps) => {
        return await apiInteractor.getBrandConfiguration(requestData)
    }

    const updateConfiguration = async (requestData: UpdateBrandConfigurationProps) => {
        return await apiInteractor.updateBrandConfiguration(requestData)
    }

    const getAvailableOwners = async (requestData: GetAvailableOwnerProps) => {
        return await apiInteractor.getAvailableOwners(requestData)
    }

    return {
        addBrand,
        updateBrand,
        getBrandList,
        getBrandDetail,
        removeBrands,
        updateBrandStatus,
        getConfiguration,
        updateConfiguration,
        getAvailableOwners
    }
}

export default useBrandsRepository;