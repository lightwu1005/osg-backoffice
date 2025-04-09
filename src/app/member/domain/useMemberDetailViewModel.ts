import useRiskMemberRepository from "@/services/@riskMembers/repository/useRiskMemberRepository";
import React, {useCallback, useEffect, useState} from "react";
import {
    idToGetRiskMembersProps,
    toGetRiskMembersBetSlipsProps,
    toGetRiskMembersPerformanceProps,
    toUpdateRiskGroupApplyProps
} from "@/app/member/models/RequestDataMapping";
import {
    RiskGroupDataModel,
    RiskMembersBetSlipsListModel,
    RiskMembersModel
} from "@/services/@core/module/ResponseDataModels";
import {defaultRiskMembersModel} from "@/services/@core/module/DefaultResponseData";
import {
    GetRiskMembersBetSlipsParameters,
    GetRiskMembersPerformanceTotalAmountParameters,
    GetRiskMembersPerformanceWinLossRateParameters,
    UpdateRiskGroupApplyParameters
} from "@/app/member/models/MemberParameters";
import {getThisMonthRange, getThisWeekRange, getTodayRange} from "@/utils/tools";
import useRiskGroupRepository from "@/services/@riskGroups/repository/useRiskGroupsRepository";
import {
    OptionItem as QueryableOptionItem
} from "@/modules/components/TextField/QueryableSelectTextField/QueryableSelectTextField";
import {GlobalController} from "@/modules/common/GlobalController";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {DataSet} from "@/modules/components/charts/CommonLineChart";
import {PieData} from "@/modules/components/charts/CommonPieChart";
import {DateOption} from "@/app/member/[id]/models/DateOption";
import {DateRange} from "@mui/x-date-pickers-pro";
import {Dayjs} from "dayjs";
import {FilteredBetStatus} from "@/services/@core/module/Enum";
import {OptionItem as FilterButtonOptionItem} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {ParlayDetailProps} from "@/modules/components/parlayDetail/ParlayDetail";
import {MemberListColumns} from "@/app/member/components/memberDetailColumn";
import {datadogLogs} from "@/config/Datadog";

const today: DateOption = {
    name: 'Today',
    range: getTodayRange()
};

const thisWeek: DateOption = {
    name: 'This Week',
    range: getThisWeekRange()
};

const thisMonth: DateOption = {
    name: 'This Month',
    range: getThisMonthRange()
};

const defaultCustom: DateOption = {
    name: 'Custom',
    range: [null, null]
};

const useMemberDetailViewModel = (punterId: string) => {

    const intl = useIntl()
    const funMember = LocalizationFunctionType.Member
    const globalController = GlobalController.getInstance()
    const riskMemberRepo = useRiskMemberRepository()
    const riskGroupRepo = useRiskGroupRepository()

    const getRiskMember = useCallback(async (punterId: string) => {
        return await riskMemberRepo.getRiskMembers(idToGetRiskMembersProps(punterId)).then(res => {
            return res.content[0]
        })
    }, [riskMemberRepo])

    const updateMemberRiskLevel = useCallback(async (prop: UpdateRiskGroupApplyParameters) => {
        return await riskGroupRepo.updateRiskGroupApply(toUpdateRiskGroupApplyProps(prop)).then(res => {
            return res.successIds.length > 0
        })
    }, [riskGroupRepo])

    const getRiskMembersBetSlips = useCallback(async (query: GetRiskMembersBetSlipsParameters) => {
        return await riskMemberRepo.getRiskMembersBetSlips(toGetRiskMembersBetSlipsProps(query))
    }, [riskMemberRepo])

    const getRiskMembersPerformanceTotalAmount = useCallback(async (query: GetRiskMembersPerformanceTotalAmountParameters) => {
        return await riskMemberRepo.getRiskMembersPerformanceTotalAmount(toGetRiskMembersPerformanceProps(query))
    }, [riskMemberRepo])

    const getRiskMembersPerformanceWinLossRate = useCallback(async (query: GetRiskMembersPerformanceWinLossRateParameters) => {
        return await riskMemberRepo.getRiskMembersPerformanceWinLossRate(toGetRiskMembersPerformanceProps(query))
    }, [riskMemberRepo])

    const defaultDateRange = getTodayRange()
    const [riskMember, setRiskMember] = useState<RiskMembersModel>(defaultRiskMembersModel)
    const [betSlipsQueryParams, setBetSlipsQueryParams] = useState<GetRiskMembersBetSlipsParameters>({
        punterId: punterId,
        page: 1,
        pageSize: 10,
        startDate: defaultDateRange[0]?.unix() ?? Date.now(),
        endDate: defaultDateRange[1]?.unix() ?? Date.now(),
    });
    const [totalAmountQueryParams, setTotalAmountQueryParams] = useState<GetRiskMembersPerformanceTotalAmountParameters>({
        punterId: punterId,
        startDate: defaultDateRange[0]?.unix() ?? Date.now(),
        endDate: defaultDateRange[1]?.unix() ?? Date.now(),
        dimensions: 'HOUR'
    });
    const [winLossRateQueryParams, setWinLossRateQueryParams] = useState<GetRiskMembersPerformanceWinLossRateParameters>({
        punterId: punterId,
        startDate: defaultDateRange[0]?.unix() ?? Date.now(),
        endDate: defaultDateRange[1]?.unix() ?? Date.now(),
    });

    const [betSlips, setBetSlips] = useState<RiskMembersBetSlipsListModel>()
    const [totalAmount, setTotalAmount] = useState<DataSet[]>([])
    const [winLossRate, setWinLossRate] = useState<PieData[]>([])
    const [totalCustomDateRange, setTotalCustomDateRange] = useState<DateOption>(defaultCustom)
    const [winLossCustomDateRange, setWinLossCustomDateRange] = useState<DateOption>(defaultCustom)
    const [betSlipDateRange, setBetSlipDateRange] = useState<DateRange<Dayjs>>();
    const [canClean, setCanClean] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showParlayDialog, setShowParlayDialog] = useState<boolean>(false)
    const [parlayDetailProps, setParlayDetailProps] = useState<ParlayDetailProps>({
        parlayId: '',
        betAmount: 0,
        legs: [],
        device: '',
        maxPayout: 0
    })

    const getData = useCallback(() => {
        setLoading(true)
        Promise.all([
            getRiskMembersBetSlips(betSlipsQueryParams),
            getRiskMembersPerformanceTotalAmount(totalAmountQueryParams),
            getRiskMembersPerformanceWinLossRate(winLossRateQueryParams)
        ])
            .then(([betSlips, totalAmount, winLossRate]) => {
                setBetSlips(betSlips)
                const totalAmountData = totalAmount.infoData.map(data => {
                    return {label: data.dataName, value: data.dataNumber}
                })
                setTotalAmount(totalAmountData)
                const winLossRateData = winLossRate.infoData.map(data => {
                    return {label: data.dataName, value: data.dataNumber}
                })
                setWinLossRate(winLossRateData)
            })
            .finally(() => {
              setLoading(false)
            })
    }, [betSlipsQueryParams, totalAmountQueryParams, winLossRateQueryParams])

    const handleQueryChange = useCallback((params: Record<string, any>) => {
        const isPageChange = Boolean(params['page']);
        setBetSlipsQueryParams(currentParams => ({
            ...currentParams,
            ...params,
            ...(isPageChange ? undefined : {page: 1})
        }));
    }, []);

    const handleLeague = (leagueIds: string[]) => {
        handleQueryChange({leagueIds: leagueIds.length > 0 ? leagueIds: undefined})
    }

    const handleMarket = (options?: FilterButtonOptionItem[]) => {
        if (options) {
            const ids = options.map(option => option.id)
            handleQueryChange({
                marketIds: ids.length > 0 ? ids : undefined
            })
        }
    }

    const handleStatus = (statuses: string[]) => {
        handleQueryChange({statuses: statuses.length > 0 ? statuses : undefined})
    }

    const handleDateRangeChange = (dateRange: DateRange<Dayjs> | null) => {
        setBetSlipDateRange(dateRange ?? undefined)
        const range = dateRange ?? getTodayRange()
        handleQueryChange({
            startDate: range[0]?.unix(),
            endDate: range[1]?.unix()
        })
    }

    const handleRiskChange = (options: QueryableOptionItem<RiskGroupDataModel>[]) => {
        if (options) {
            const ids = options.map(option => option.id)
            updateMemberRiskLevel({
                punterIds: [punterId],
                riskId: ids[0]
            }).then((isSuccess) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: isSuccess ? 'success' : 'error',
                    show: true,
                    message: isSuccess ?
                        intl.formatMessage({
                            id: `${funMember}.addMemberSuccessMsg`,
                            defaultMessage: 'Member added to the group successfully!'
                        }) :
                        intl.formatMessage({
                            id: `api.defaultErrorMsg`,
                            defaultMessage: 'Oops, something went wrong; please try again later.'
                        })
                })
                if (!isSuccess) {
                    //reverse level UI
                }
            })
        }
    };

    const handleTotalAmountDate = (dateOption: DateOption) => {
        const [startDate, endDate] = dateOption.range.map(date => date!)
        let dimensions: 'HOUR' | 'HALF_DAY' | 'DAY' | 'WEEK' | 'MONTH' | undefined = undefined
        let customDate = defaultCustom
        if (dateOption.name === 'Today') {
            dimensions = 'HOUR'
        } else if (dateOption.name === 'This Week') {
            dimensions = 'HALF_DAY'
        } else if (dateOption.name === 'This Month') {
            dimensions = 'DAY'
        } else {
            customDate = dateOption
            const dayDiff = endDate?.diff(startDate, 'days') ?? 0
            const monthDiff = endDate?.diff(startDate, 'month') ?? 0
            if (dayDiff <= 1) {
                dimensions = 'HOUR'
            } else if (dayDiff < 7) {
                dimensions = 'HALF_DAY'
            } else if (monthDiff <= 1) {
                dimensions = 'DAY'
            } else if (monthDiff <= 6) {
                dimensions = 'WEEK'
            } else {
                dimensions = 'MONTH'
            }
        }
        setTotalCustomDateRange(customDate)
        setTotalAmountQueryParams({
            punterId: punterId,
            startDate: startDate?.unix() ?? Date.now(),
            endDate: endDate?.unix() ?? Date.now(),
            dimensions: dimensions
        })
    }

    const handleWinLossRateDate = (dateOption: DateOption) => {
        const [startDate, endDate] = dateOption.range
        if (dateOption.name !== 'Today' && dateOption.name !== 'This Week' && dateOption.name !== 'This Month') {
            setWinLossCustomDateRange(dateOption)
        } else {
            setWinLossCustomDateRange(defaultCustom)
        }
        setWinLossRateQueryParams({
            punterId: punterId,
            startDate: startDate?.unix() ?? Date.now(),
            endDate: endDate?.unix() ?? Date.now()
        })
    }

    const handleCopyButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, text: string) => {
        event.stopPropagation();
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Text copied to clipboard: ', text);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                datadogLogs.logger.error('Failed to copy text', {}, err instanceof Error ? err : new Error(String(err)));
            });
    }

    const handleParlayDetail = (props: ParlayDetailProps) => {
        setParlayDetailProps(props)
        setShowParlayDialog(true)
    }

    useEffect(() => {
        getRiskMember(punterId).then(res => {
            setRiskMember(res)
        })
    }, []);

    useEffect(() => {
        if (riskMember.punterId.length > 0) {
            getData()
        }
    }, [riskMember]);

    useEffect(() => {
        if (totalAmountQueryParams) {
            getRiskMembersPerformanceTotalAmount(totalAmountQueryParams).then(res => {
                const totalAmountData = res.infoData.map(data => {
                    return {label: data.dataName, value: data.dataNumber}
                })
                setTotalAmount(totalAmountData)
            })
        }
    }, [totalAmountQueryParams]);

    useEffect(() => {
        if (winLossRateQueryParams) {
            getRiskMembersPerformanceWinLossRate(winLossRateQueryParams).then(res => {
                const winLossRateData = res.infoData.map(data => {
                    return {label: data.dataName, value: data.dataNumber}
                })
                setWinLossRate(winLossRateData)
            })
        }
    }, [winLossRateQueryParams]);

    useEffect(() => {
        setCanClean(
            (betSlipsQueryParams.ipAddress?.length ?? 0) +
            (betSlipsQueryParams.leagueIds?.length ?? 0) +
            (betSlipsQueryParams.marketIds?.length ?? 0) +
            (betSlipsQueryParams.statuses?.length ?? 0) +
            (betSlipDateRange?.length ?? 0)
            > 0
        );
        getRiskMembersBetSlips(betSlipsQueryParams).then(res => {
            setBetSlips(res)
        })
    }, [betSlipsQueryParams]);

    return {
        loading,
        columns: MemberListColumns(handleCopyButtonClick, handleParlayDetail),
        riskMember,
        betSlips,
        totalAmount,
        winLossRate,
        totalCustomDateRange,
        winLossCustomDateRange,
        statuses: Object.entries(FilteredBetStatus).map(([_, value]) => value),
        betSlipDateRange,
        canClean,
        dateOptions: [today, thisWeek, thisMonth],
        betSlipsPageModel: {
            page: betSlipsQueryParams.page,
            pageSize: betSlipsQueryParams.pageSize,
        },
        parlayDetailProps,
        showParlayDialog, setShowParlayDialog,
        handleQueryChange,
        handleLeague,
        handleMarket,
        handleStatus,
        handleDateRangeChange,
        handleRiskChange,
        handleTotalAmountDate,
        handleWinLossRateDate
    }
}
export default useMemberDetailViewModel;