import useCommonRepository from "@/services/@common/repository/useCommonRepository";
import React, {useEffect, useState} from "react";
import {TabProps} from "@/modules/components/tabs/Tabs";
import {SportsDataModel} from "@/services/@core/module/ResponseDataModels";
import {
    DownhillSkiingRounded,
    IceSkatingRounded,
    KitesurfingRounded,
    PoolRounded,
    RollerSkatingRounded,
    RowingRounded,
    SailingRounded,
    SnowmobileRounded,
    SnowshoeingRounded,
    SportsBarRounded,
    SportsBaseballRounded,
    SportsBasketballRounded,
    SportsCricketRounded,
    SportsFootballRounded,
    SportsGolfRounded,
    SportsGymnasticsRounded,
    SportsHandballRounded,
    SportsHockeyRounded,
    SportsKabaddiRounded,
    SportsMartialArtsRounded,
    SportsMmaRounded,
    SportsMotorsportsRounded,
    SportsRugbyRounded,
    SportsSoccerRounded,
    SportsTennisRounded,
    SportsVolleyballRounded
} from "@mui/icons-material";
import {useMemorizeState} from "@/utils/useMemorizeState";
import {useStateContext} from "@/utils/StateContext";
import { datadogLogs } from "@/config/Datadog";

const sportIconsMapping = (sportName: string): React.ReactElement => {
    const sportIcons: Record<string, React.ReactElement> = {
        soccer: <SportsSoccerRounded/>,
        basketball: <SportsBasketballRounded/>,
        baseball: <SportsBaseballRounded/>,
        cricket: <SportsCricketRounded/>,
        football: <SportsFootballRounded/>,
        golf: <SportsGolfRounded/>,
        gymnastics: <SportsGymnasticsRounded/>,
        handball: <SportsHandballRounded/>,
        hockey: <SportsHockeyRounded/>,
        bar: <SportsBarRounded/>,
        kabaddi: <SportsKabaddiRounded/>,
        martialarts: <SportsMartialArtsRounded/>,
        mma: <SportsMmaRounded/>,
        motorsports: <SportsMotorsportsRounded/>,
        rugby: <SportsRugbyRounded/>,
        tennis: <SportsTennisRounded/>,
        volleyball: <SportsVolleyballRounded/>,
        snowmobile: <SnowmobileRounded/>,
        snowshoeing: <SnowshoeingRounded/>,
        sailing: <SailingRounded/>,
        downhillskiing: <DownhillSkiingRounded/>,
        iceskating: <IceSkatingRounded/>,
        kitesurfing: <KitesurfingRounded/>,
        pool: <PoolRounded/>,
        rollerskating: <RollerSkatingRounded/>,
        rowing: <RowingRounded/>
    }

    // Find the first keyword that is present in the sportName
    const foundKey = Object.keys(sportIcons).find(key =>
        sportName.replace(/ /g, '').toLowerCase().includes(key))

    // Return the corresponding icon or the default one
    return foundKey ? sportIcons[foundKey] : <SportsSoccerRounded/>
}

const useTabViewModel = () => {

    const commonRepo = useCommonRepository();

    const getSportsCategories = async () => {
        return await commonRepo.getSportsCategories()
    }

    const {update, remove} = useStateContext();
    const [labels, setLabels] = useState<TabProps[]>([]);
    const [sportCategories, setSportCategories] = useState<SportsDataModel[]>([]);
    const [allSportIds, setAllSportIds] = useState<string[]>([])
    const [selectedSportId, setSelectedSportId] = useMemorizeState<string>('selectedSport')
    const [selectedIndex, setSelectedIndex] = useState<number>(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getSportsCategories();
                const items: TabProps[] = response.map((data) => (
                    {
                        icon: sportIconsMapping(data.sportType),
                        label: data.sportName
                    }
                ));
                const sportIds = response.map((data) => data.sportId)
                setSportCategories(response);
                setLabels(items);
                setAllSportIds(sportIds)
                if (selectedSportId) {
                    const defaultIndex = sportIds.indexOf(selectedSportId)
                    const index = defaultIndex > -1 ? defaultIndex : 0
                    setSelectedIndex(index)
                } else {
                    setSelectedSportId(sportIds[0])
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
                datadogLogs.logger.error('Error fetching data', {}, error instanceof Error ? error : new Error(String(error)));
            }
        };

        fetchData();

    }, []);


    const handleTabChange = (index: number) => {
        setSelectedSportId(allSportIds[index])
    }

    useEffect(() => {
        if (selectedSportId) {
            update('selectedSport', selectedSportId)
        } else {
            remove('selectedSport')
        }
    }, [selectedSportId]);
    return {
        labels,
        sportCategories,
        allSportIds,
        selectedIndex,
        handleTabChange
    }
}

export default useTabViewModel