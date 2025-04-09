import useApiInteractor from '@/services/@core/ApiInteractor';
import { AuditProps } from '@/services/@core/module/RequestDataModels';

const useAuditRepository = () => {
    const apiInteractor = useApiInteractor()

    const getAuditActions = async () => {
        return await apiInteractor.getAuditActions()
    }
    const getAuditList = async (requestData: AuditProps) => {
        return await apiInteractor.getAuditList(requestData)
    }

    return {
        getAuditActions,
        getAuditList
    }
}

export default useAuditRepository