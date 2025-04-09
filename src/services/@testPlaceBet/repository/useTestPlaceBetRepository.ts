import useApiInteractor from "@/services/@core/ApiInteractor";
import {TestDangerBallTriggerProps, TestPlaceBetProps} from "@/app/testPlaceBet/models/TestPlaceBetParameters";
import {getUserIP} from "@/utils/tools";
import {toTestGetVendorEventIdProps} from "@/app/testPlaceBet/models/RequestDataMapping";

const useTestPlaceBetRepository = () => {
    const apiInteractor= useApiInteractor()

    const placeBet = async (testPlaceBetProps: TestPlaceBetProps) => {
        return await apiInteractor.placeBet(testPlaceBetProps)
    }
    const getUserIPAddress = async () => {
        return await getUserIP()
    }
    const triggerDangerBall = async (testDangerBallTriggerProps: TestDangerBallTriggerProps) => {
        return await apiInteractor.triggerDangerBall(testDangerBallTriggerProps)
    }
    const getVendorEventId = async (canonicalId: string) => {
        return await apiInteractor.getVendorEventId(toTestGetVendorEventIdProps(canonicalId))
    }

    return {
        placeBet,
        getUserIPAddress,
        triggerDangerBall,
        getVendorEventId
    }
}

export default useTestPlaceBetRepository