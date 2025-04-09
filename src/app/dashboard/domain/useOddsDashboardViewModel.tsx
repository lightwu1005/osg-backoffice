import {useCallback, useEffect, useRef, useState} from "react";
import {
    BarChartProps,
    GetPerformanceParameters,
    PieChartProps,
    QueryChangeParameters,
    toBarchartParameters
} from "@/app/dashboard/models/EventQueryParameters";
import {toGetPerformanceProps} from "@/app/dashboard/models/RequestDataMapping";
import {toBarchartProps, toPieChartProps} from "@/services/@dashboard/useCase";
import usePerformanceRepository from "@/services/@performance/respository/usePerformanceRepository";
import {PerformanceDataModel, SportsDataModel} from "@/services/@core/module/ResponseDataModels";
import {InfoType, PageType} from "@/services/@core/module/Enum";
import {GlobalController} from "@/modules/common/GlobalController";
import {CommonPieChartRecord} from "@/modules/components/charts/CommonPieChart";
import useCommonRepository from "@/services/@common/repository/useCommonRepository";
import {useNavigationProvider} from "@/utils/NavigationProvider";
import lodash from "lodash";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {getTodayRange} from "@/utils/tools";

export function SportIdsFromOptions(options: string[], sportsList: SportsDataModel[]): string[] {
    return options.map(option => {
        const sport = sportsList?.find(sport => sport.sportName === option);
        return sport ? sport.sportId : null;
    }).filter(sportId => sportId !== null) as string[];
}

const useOddsDashboardViewModel = () => {
    const performanceRepo = usePerformanceRepository();
    const commonRepo = useCommonRepository();
    const globalController = GlobalController.getInstance();
    const {chartProvider} = useNavigationProvider();
    const intl = useIntl();
    const funType = `${LocalizationFunctionType.Dashboard}.odds`;

    const getPerformance = async (props: GetPerformanceParameters): Promise<PerformanceDataModel[]> => {
        return await performanceRepo.getPerformance(toGetPerformanceProps(props));
    }

    const getSportsCategories = async () => {
        return await commonRepo.getSportsCategories();
    }

    const [marketPerformance, setMarketPerformance] = useState<PerformanceDataModel[]>([]);
    const [imbalancePerformance, setImbalancePerformance] = useState<PerformanceDataModel[]>([]);
    const [devicePerformance, setDevicePerformance] = useState<PerformanceDataModel[]>([]);
    const [sportPerformance, setSportPerformance] = useState<PerformanceDataModel[]>([]);
    const [betSlipPerformance, setBetSlipPerformance] = useState<PerformanceDataModel[]>([]);
    const [leaguePerformance, setLeaguePerformance] = useState<PerformanceDataModel[]>([]);
    const [marketBarData, setMarketBarData] = useState<BarChartProps>();
    const [imbalanceBarData, setImbalanceBarData] = useState<BarChartProps>();
    const [deviceBarData, setDeviceBarData] = useState<PieChartProps[]>();
    const [sportBarData, setSportBarData] = useState<PieChartProps[]>();
    const [betSlipBarData, setBetSlipBarData] = useState<PieChartProps[]>();
    const [leagueBarData, setLeagueBarData] = useState<BarChartProps>();
    const [sportList, setSportList] = useState<SportsDataModel[]>([]);
    const todayRange = getTodayRange();
    const [queryParams, setQueryParams] = useState<GetPerformanceParameters>({
        infoType: '',
        startDate: todayRange?.[0]?.unix() ?? 0,
        endDate: todayRange?.[1]?.unix() ?? 0,
        sportIds: [],
        betType: ""
    });
    const [infoTypeWithSelectedOption, setInfoTypeWithSelectedOption] = useState<Record<string, any>>({
        [InfoType.Sports]: [],
        [InfoType.BetSlips]: '',
        [InfoType.Market]: [],
        [InfoType.League]: [],
        [InfoType.Imbalance]: []
    });
    const previousQueryParams = useRef<GetPerformanceParameters>();
    const initialLoad = useRef(true);
    const fetchCategoriesCalled = useRef(false);

    const handleQueryChange = useCallback((params: QueryChangeParameters) => {
        setQueryParams(currentParams => ({
            ...currentParams,
            ...params
        }));
    }, []);

    const fetchSpecificData = useCallback(async () => {
        if (lodash.isEqual(queryParams, previousQueryParams.current)) return;

        try {
            let response: PerformanceDataModel[] = []
            switch (queryParams.infoType) {
                case InfoType.BetSlips:
                    response = await getPerformance({
                        ...queryParams,
                        infoType: queryParams.infoType,
                        betType: queryParams.betType,
                        sportIds: []
                    })
                    break
                case InfoType.Sports:
                case InfoType.Market:
                case InfoType.League:
                case InfoType.Imbalance:
                    response = await getPerformance({
                        ...queryParams,
                        infoType: queryParams.infoType,
                        betType: '',
                        sportIds: queryParams.sportIds
                    })
                    break
                case InfoType.Device:
                    response = await getPerformance({
                        ...queryParams,
                        infoType: InfoType.Device,
                        betType: '',
                        sportIds: []
                    })
                    break
            }

            setInfoTypeWithSelectedOption(currentState => ({
                ...currentState,
                [queryParams.infoType]: queryParams.infoType === InfoType.BetSlips ? queryParams.betType : queryParams.sportIds
            }))

            switch (queryParams.infoType) {
                case InfoType.Device:
                    setDevicePerformance(response);
                    break;
                case InfoType.Market:
                    setMarketPerformance(response);
                    break;
                case InfoType.League:
                    setLeaguePerformance(response);
                    break;
                case InfoType.Imbalance:
                    setImbalancePerformance(response);
                    break;
                case InfoType.Sports:
                    setSportPerformance(response);
                    break;
                case InfoType.BetSlips:
                    setBetSlipPerformance(response);
                    break;
            }
            previousQueryParams.current = lodash.clone(queryParams);
        } catch (error) {
            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                severity: 'error',
                show: true,
                message: error
            });
        }
    }, [queryParams, getPerformance]);

    const fetchAllData = useCallback(async () => {
        if (!initialLoad.current && lodash.isEqual(queryParams, previousQueryParams.current)) return

        try {
            const [deviceData, marketData, leagueData, imbalanceData, sportsData, betSlipData] = await Promise.all([
                getPerformance({...queryParams, infoType: InfoType.Device}),
                getPerformance({
                    ...queryParams,
                    infoType: InfoType.Market,
                    sportIds: infoTypeWithSelectedOption[InfoType.Market]
                }),
                getPerformance({
                    ...queryParams,
                    infoType: InfoType.League,
                    sportIds: infoTypeWithSelectedOption[InfoType.League]
                }),
                getPerformance({
                    ...queryParams,
                    infoType: InfoType.Imbalance,
                    sportIds: infoTypeWithSelectedOption[InfoType.Imbalance]
                }),
                getPerformance({
                    ...queryParams,
                    infoType: InfoType.Sports,
                    sportIds: infoTypeWithSelectedOption[InfoType.Sports]
                }),
                getPerformance({
                    ...queryParams,
                    infoType: InfoType.BetSlips,
                    betType: infoTypeWithSelectedOption[InfoType.BetSlips].length === 0 ?
                        'SINGLE' :
                        infoTypeWithSelectedOption[InfoType.BetSlips]
                }),
            ])
            setDevicePerformance(deviceData);
            setMarketPerformance(marketData);
            setLeaguePerformance(leagueData);
            setImbalancePerformance(imbalanceData);
            setSportPerformance(sportsData);
            setBetSlipPerformance(betSlipData);
            previousQueryParams.current = lodash.clone(queryParams);
            initialLoad.current = false;
        } catch (error) {
            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                severity: 'error',
                show: true,
                message: error
            });
        }
    }, [queryParams, getPerformance]);

    const fetchCategoriesAndData = async () => {
        getSportsCategories()
            .then(result => {
                setSportList(prevState => {
                    if (lodash.isEqual(prevState, result)) return prevState
                    return result
                })

            })
            .catch(error => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: error
                });
            })
    };

    useEffect(() => {
        if (!fetchCategoriesCalled.current) {
            fetchCategoriesCalled.current = true;
            fetchCategoriesAndData();
        }
    }, [fetchAllData]);

    useEffect(() => {
        setQueryParams(prevState => ({
            ...prevState,
            sportIds: sportList.map(sport => sport.sportId.toString())
        }))
    }, [sportList]);

    useEffect(() => {
        if (sportList.length === 0) return
        if (queryParams.infoType === '') {
            fetchAllData();
        } else {
            fetchSpecificData();
        }
    }, [queryParams, fetchAllData, fetchSpecificData]);

    useEffect(() => {
        const parameters: toBarchartParameters = {
            title: intl.formatMessage({id: `${funType}.eventName`, defaultMessage: 'Event Name'}),
            subTitle: intl.formatMessage({id: `${funType}.imbalancePercentage`, defaultMessage: 'Imbalance Percentage'}),
            dataType: 'percentage',
            data: imbalancePerformance
        }
        setImbalanceBarData(toBarchartProps(parameters));
    }, [imbalancePerformance, toBarchartProps]);

    useEffect(() => {
        const parameters: toBarchartParameters = {
            title: intl.formatMessage({id: `${funType}.leagueName`, defaultMessage: 'League Name'}),
            subTitle: intl.formatMessage({id: `${funType}.totalBetCNY`, defaultMessage: 'Total Bet (CNY)'}),
            dataType: 'money',
            data: leaguePerformance
        }
        setLeagueBarData(toBarchartProps(parameters));
    }, [leaguePerformance, toBarchartProps]);

    useEffect(() => {
        const parameters: toBarchartParameters = {
            title: intl.formatMessage({id: `${funType}.marketName`, defaultMessage: 'Market Name'}),
            subTitle: intl.formatMessage({id: `${funType}.numberOfBets`, defaultMessage: 'Number of Bets'}),
            dataType: 'number',
            data: marketPerformance
        }
        setMarketBarData(toBarchartProps(parameters));
    }, [marketPerformance, toBarchartProps]);

    useEffect(() => {
        setDeviceBarData(toPieChartProps(devicePerformance));
    }, [devicePerformance, toPieChartProps]);

    useEffect(() => {
        setSportBarData(toPieChartProps(sportPerformance));
    }, [sportPerformance, toPieChartProps]);

    useEffect(() => {
        setBetSlipBarData(toPieChartProps(betSlipPerformance));
    }, [betSlipPerformance, toPieChartProps]);

    const onChartSelected = useCallback((navigationType: PageType) => (params: CommonPieChartRecord) => {
        const newParams: CommonPieChartRecord = queryParams.startDate ? {...params, dateRange: [queryParams.startDate, queryParams.endDate]} : params
        switch (navigationType) {
            case PageType.BetSlip:
                chartProvider.chartNavigation(newParams, PageType.BetSlip)
                break
            case PageType.EventList:
                chartProvider.chartNavigation(newParams, `${PageType.EventList}/${params.filterCondition.infoId}`);
                break;
        }
    }, [chartProvider, queryParams]);

    const onDateRangeSelected = (startDate: number, endDate: number) => {
        const localStartDate = lodash.get(queryParams, 'startDate');
        const localEndDate = lodash.get(queryParams, 'endDate');
        if (endDate < startDate) return;

        setQueryParams(prevState => {
            if (lodash.isEqual(localStartDate, startDate) && lodash.isEqual(localEndDate, endDate)) return prevState;
            return {
                ...prevState,
                infoType: '',
                startDate: startDate,
                endDate: endDate
            };
        });
    }

    return {
        imbalanceBarData,
        leagueBarData,
        marketBarData,
        deviceBarData,
        sportBarData,
        betSlipBarData,
        onChartSelected,
        sportList,
        onDateRangeSelected,
        handleQueryChange,
        intl,
        funType
    }
}

export default useOddsDashboardViewModel;
