import useTestPlaceBetRepository from "@/services/@testPlaceBet/repository/useTestPlaceBetRepository";
import {
    TestDangerBallState,
    TestDangerBallTriggerParameters,
} from "@/app/testPlaceBet/models/TestPlaceBetParameters";
import {toTestDangerBallTriggerProps} from "@/app/testPlaceBet/models/RequestDataMapping";
import {useCallback, useEffect, useState} from "react";
import {GlobalController} from "@/modules/common/GlobalController";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {StatusItem} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup";

const useDangerBallTriggerViewModel = () => {

    const useTestPlaceBetRepo = useTestPlaceBetRepository();

    const triggerDangerBall = async (requestData: TestDangerBallTriggerParameters) => {
        return await useTestPlaceBetRepo.triggerDangerBall(toTestDangerBallTriggerProps(requestData));
    }
    const getVendorEventId = async (canonicalId: string) => {
        return await useTestPlaceBetRepo.getVendorEventId(canonicalId);
    }

    const dangerBallStateOptions: StatusItem[] = Object.keys(TestDangerBallState).map(key => ({
        key: key,
        text: key.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' '),
        type: key
    }));
    const globalController = GlobalController.getInstance()
    const [canSubmit, setCanSubmit] = useState<boolean>(false);
    const [dangerBallData, setDangerBallData] = useState<TestDangerBallTriggerParameters>({
        fixtureId: '',
        timestampUtc: '',
        dangerState: ''
    });

    const validData = () => {
        return Boolean(dangerBallData.fixtureId);

    }

    const handleEventSelected = useCallback((text: string) => {
        const key = text.split(': ')[1];
        getVendorEventId(key).then((response) => {
            setDangerBallData({
                ...dangerBallData,
                fixtureId: response.eventId
            })
        }).catch((error) => {
            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                severity: 'error',
                show: true,
                message: error
            });
        });
    }, [dangerBallData]);

    const handleDangerBallStateChange = useCallback((text: string) => {
        const key = dangerBallStateOptions.find(state => state.text === text)?.key ?? '';
        if (!key) return;

        dayjs.extend(utc)
        const utcTime = dayjs.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        setDangerBallData({
            ...dangerBallData,
            timestampUtc: utcTime,
            dangerState: key
        });
    }, [dangerBallData]);

    const handleDangerBallTrigger = useCallback(() => {
        triggerDangerBall(dangerBallData)
            .then((response) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'success',
                    show: true,
                    message: '危險球已觸發'
                });
            }).catch((error) => {
            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                severity: 'error',
                show: true,
                message: error
            });
        });
    }, [dangerBallData, triggerDangerBall]);

    useEffect(() => {
        setCanSubmit(validData());
    }, [dangerBallData]);

    return {
        canSubmit,
        dangerBallStateOptions,
        handleDangerBallTrigger,
        handleEventSelected,
        handleDangerBallStateChange
    }
}

export default useDangerBallTriggerViewModel;