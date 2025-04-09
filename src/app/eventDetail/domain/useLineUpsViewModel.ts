import {useEffect, useState} from "react";
import {LineupsPageProps} from "@/app/eventDetail/components/playLog/pageComponent/LineupsPage";
import UseEventRepository from "@/services/@event/repository/useEventRepository";
import {LineupsModel} from "@/services/@core/module/ResponseDataModels";
import {LineupTableProps} from "@/app/eventDetail/components/playLog/LineupTable";
import {toGetLineupProps} from "@/app/eventDetail/models/RequestDataMapping";
import {GlobalController} from "@/modules/common/GlobalController";
import {ApiError} from "@/services/@core/ApiErrorHandle";
import useLiveDataSubscription, {
    LineUpModel,
    LiveDataModel
} from "@/services/@odds/socket/useLiveDataMixedSubscription";

function useLineUpsViewModel(props: LineupsPageProps) {
    const {eventId} = props
    const {getLineups} = UseEventRepository()
    const [lineup, setLineup] = useState<LineupsModel>()
    const [lineupTables, setLineTables] = useState<LineupTableProps[]>()
    const globalController = GlobalController.getInstance()
    const {add, remove, sportSubscription} = useLiveDataSubscription()

    useEffect(() => {
        if (eventId) {
            getLineups(toGetLineupProps(
                eventId
            )).then(response => {
                setLineup(response)
            }).catch((e: ApiError) => {
                // ignore 404 error because the ticket [FE-683]
                if (e.status !== 404) {
                    globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                        severity: 'error',
                        show: true,
                        message: e.message
                    })
                }
            })

            const onSubscript = (liveData: LiveDataModel) => {
                if (liveData.dataType === 'LINEUP') {
                    const lineups = liveData.data as LineUpModel
                    setLineup(lineups)
                }
            }

            add(eventId)
            sportSubscription.current = {
                onSubscript: onSubscript
            }
        }

        return () => {
            if (eventId) {
                remove(eventId)
            }
        }
    }, [eventId])

    useEffect(() => {
        if (lineup) {
            let tables: LineupTableProps[] = []

            const homeLineup = lineup.home
            const awayLineup = lineup.away

            tables.push({
                type: "home",
                players: homeLineup.players,
                substitutes: homeLineup.substitutes,
            })

            tables.push({
                type: "away",
                players: awayLineup.players,
                substitutes: awayLineup.substitutes
            })

            setLineTables(tables)
        }
    }, [lineup])

    return{
        lineupTables
    }
}

export default useLineUpsViewModel