import useApiInteractor from "@/services/@core/ApiInteractor";
import {GetPerformanceProps} from "@/services/@core/module/RequestDataModels";

const usePerformanceRepository = () => {
    const apiInteractor = useApiInteractor()

    const getPerformance = async (props: GetPerformanceProps) => {
        return await apiInteractor.getPerformance(props)
    }

    return {
        getPerformance
    }
}

export default usePerformanceRepository