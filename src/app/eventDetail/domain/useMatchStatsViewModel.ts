import {useEffect, useState} from "react";
import UseEventRepository from "@/services/@event/repository/useEventRepository";
import {toGetEventPlayLogMatchStatsProps} from "@/app/eventDetail/models/RequestDataMapping";
import {MatchStatsPageProps} from "@/app/eventDetail/components/playLog/pageComponent/MatchStatsPage";
import {GlobalController} from "@/modules/common/GlobalController";
import {PlayLogStatisticModel} from "@/services/@core/module/ResponseDataModels";
import {ApiError} from "@/services/@core/ApiErrorHandle";

function useMatchStatsViewModel(props: MatchStatsPageProps) {
    const {eventId} = props
    const {getEventPlayLogMatchStats} = UseEventRepository()
    const [matches, setMatches] = useState<PlayLogStatisticModel[]>([])
    const globalController = GlobalController.getInstance()

    useEffect(() => {
        getEventPlayLogMatchStats(toGetEventPlayLogMatchStatsProps(eventId))
            .then(response => {
                setMatches(response)
            })
            .catch((e: ApiError) => {
                // ignore 404 error because the ticket [FE-683]
                if (e.status !== 404) {
                    globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                        severity: 'error',
                        show: true,
                        message: e.message
                    })
                }
            })
    }, [eventId]);

    return {
        matches
    }
}

export default useMatchStatsViewModel
