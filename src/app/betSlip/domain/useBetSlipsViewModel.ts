import {useNavigationProvider} from "@/utils/NavigationProvider"
import React, {useCallback, useEffect, useRef, useState} from "react"
import {CommonPieChartRecord} from "@/modules/components/charts/CommonPieChart"
import useBetSlipsRepository from "@/services/@betslips/repository/useBetSlipsRepository"
import {toBetSlipAcceptanceProps, toGetBetSlipListProps} from "@/app/betSlip/components/models/RequestDataMapping"
import {
    BetSlipAcceptanceParameter,
    GetBetSlipsParameter,
    GetBetSlipsFromEvent
} from "@/app/betSlip/components/models/BetSlipParameters"
import {
    BetResult,
    BetSettlement,
    BetSlipEventType,
    BetStatus,
    BetType,
    Device,
    EventType,
    InfoType
} from "@/services/@core/module/Enum"
import {GlobalController} from "@/modules/common/GlobalController";
import {BetSlipsListModel} from "@/services/@core/module/ResponseDataModels";
import {OptionItem, SelectedOptions} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {ParlayDetailProps} from "@/modules/components/parlayDetail/ParlayDetail";
import {columns} from "@/app/betSlip/components/columns";
import {GridColDef, GridRowId} from "@mui/x-data-grid";
import {ActionItem} from "@/modules/components/buttons/actionButton/ActionButton";
import {ConfirmationDialogProps} from "@/modules/components/dialog/ConfirmationDialog";
import {AlertDialogProps} from "@/modules/components/dialog/AlertDialog";
import ToggleProps from "@/modules/interface/ToggleProps";
import {
    allFirstCharToUpperCase,
    firstCharToUpperCase,
    toUpperCaseWithUnderscore
} from "@/modules/common/DisplayFormatConverter";
import {NumberConditionSettings} from "@/services/@core/module/CommonDataModels";
import {RiskLevel} from "@/modules/components/buttons/riskButton/RiskButton";
import {BetSlipEventTypes} from "@/services/@event/useCase";
import useFilterMemory from "@/app/betSlip/domain/useFilterMemory";
import {getEnumKeyByValue, hasOverLimit} from "@/modules/common/DataProcessUnit";
import {BetAmountOptionsType} from "@/app/betSlip/components/NumberRangeTextField";
import PermissionHandler from "@/modules/common/PermissionHandler";
import IdentityHandler from "@/modules/common/IdentityHandler";
import {usePathname} from "next/navigation";
import lodash, {debounce} from "lodash";
import dayjs from "dayjs";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import useAPIFiringHandler from "@/modules/common/useAPIFiringHandler";
import {datadogLogs} from "@/config/Datadog";

const findActionItem = (actionList: ActionItem[], status: BetStatus): ActionItem | undefined => {
    return actionList.find(action => action.key === status);
};

enum BetSlipOption {
    BetSlipType = "BetSlip Type",
    Sport = "Sport",
    League = "League",
    Market = "Market",
    EventStartTime = "Event Start Time",
    Status = "Status",
    MaximumPayout = "Maximum Payout",
    Payout = "Payout",
    Device = "Device",
    OddsFeed = "Odds Feed",
    BettingType = "Betting Type",
    BetSlipStatus = "Bet Slip Status",
    Result = "Result"
}

const useBetSlipsViewModel = () => {

    // API calls
    const betSlipsRepository = useBetSlipsRepository()

    const getBetSlipList = useCallback(async (params: GetBetSlipsParameter) => {
        return await betSlipsRepository.getBetSlipList(toGetBetSlipListProps(params))
    }, [betSlipsRepository])

    const betSlipAcceptance = useCallback(async (params: BetSlipAcceptanceParameter) => {
        return await betSlipsRepository.betSlipAcceptance(toBetSlipAcceptanceProps(params))
    }, [betSlipsRepository])

    // UI states
    const intl = useIntl();
    const funType = LocalizationFunctionType.BetSlip;
    const funCommonType = LocalizationFunctionType.Common;
    const {isEditable: checkEdit} = PermissionHandler();
    const {userRole} = IdentityHandler();
    const pathname = usePathname();
    const currentPathName = pathname ? pathname.split('/').pop() : '';
    const isEditable = checkEdit(userRole, currentPathName ?? '');
    const filterMemory = useFilterMemory()
    const [loading, setLoading] = useState<boolean>(false)
    const {chartProvider, betSlipProvider} = useNavigationProvider()
    const [obtainFinished, setObtainFinished] = useState<boolean>(false)
    const betSlipTypes = BetSlipEventTypes(intl).filter(type => type.key !== BetSlipEventType.startingSoon);
    const [showExportDialog, setShowExportDialog] = useState<boolean>(false)
    const [showParlayDialog, setShowParlayDialog] = useState<boolean>(false)
    const globalController = GlobalController.getInstance()
    const selectedBetSlipEventType = useRef(BetSlipEventType.all)
    const [betSlipList, setBetSlipList] = useState<BetSlipsListModel>()
    const [queryParams, setQueryParams] = useState<GetBetSlipsParameter>({
        page: 1,
        pageSize: 10
    });
    const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowId[]>([]);
    const [canClean, setCanClean] = useState(false);
    const [isRejection, setIsRejection] = useState(false);
    const [filterSelected, setFilterSelected] = useState<SelectedOptions<any>>(Object.entries(filterMemory.filters)[filterMemory.index]?.[1] ?? {});
    const lastRequestKey = useRef<number>(0)
    const templateBettingType = useRef<BetSlipEventType>()

    // BetStatus.Pending can accept, hold, reject
    // BetStatus.Accepted can reject
    // Others can't do anything
    const actionList: ActionItem[] = [{
        key: BetStatus.ACCEPTED,
        value: intl.formatMessage({id: `${funType}.actionAccept`, defaultMessage: 'Accept'})
    }, {
        key: BetStatus.PENDING,
        value: intl.formatMessage({id: `${funType}.actionHold`, defaultMessage: 'Hold'})
    }, {
        key: BetStatus.REJECTED,
        value: intl.formatMessage({id: `${funType}.actionReject`, defaultMessage: 'Reject'})
    }, {
        key: BetStatus.VOID,
        value: intl.formatMessage({id: `${funType}.actionDelete`, defaultMessage: 'Delete'})
    }]

    const searchOption: ActionItem[] = [{
        key: 'BET_ID', value: intl.formatMessage({id: `${funType}.searchBetID`, defaultMessage: 'Bet ID'})
    }, {
        key: 'ACCOUNT', value: intl.formatMessage({id: `${funType}.searchAccount`, defaultMessage: 'Account'})
    }, {
        key: 'EVENT_ID', value: intl.formatMessage({id: `${funType}.searchEventID`, defaultMessage: 'Event ID'})
    }, {
        key: 'IP_ADDRESS', value: intl.formatMessage({id: `${funType}.searchIP`, defaultMessage: 'IP'})
    }]

    const [riskLevels, setRiskLevels] = useState<RiskLevel[]>([
        {key: '1', text: 'Level 1'},
        {key: '2', text: 'Level 2'},
        {key: '3', text: 'Level 3'},
        {key: '4', text: 'Level 4'},
        {key: '5', text: 'Level 5'},
    ]) // Replace the values when API ready

    const [confirmationDialog, setConfirmationDialog] = useState<ConfirmationDialogProps & {
        singleBets: number,
        parlayBets: number,
    }>({
        id: 'RejectDialog',
        title: isRejection
            ? intl.formatMessage({id: `${funType}.rejectTitle`, defaultMessage: 'Reject Confirmation'})
            : intl.formatMessage({id: `${funType}.deleteTitle`, defaultMessage: 'Delete Confirmation'}),
        subTitle: isRejection
            ? intl.formatMessage({
                id: `${funType}.rejectDescription`,
                defaultMessage: 'Please select the reason for rejection'
            })
            : intl.formatMessage({
                id: `${funType}.deleteDescription`,
                defaultMessage: 'Please select the reason for deletion'
            }),
        contentCard: '',
        options: [
            intl.formatMessage({
                id: `${funType}.leagueOrParticipantsChange`,
                defaultMessage: 'Changes in league or participants'
            }),
            intl.formatMessage({id: `${funType}.matchStartTimeChange`, defaultMessage: 'Changes in match start time'}),
            intl.formatMessage({id: `${funType}.matchInterruption`, defaultMessage: 'Match interruption'}),
            intl.formatMessage({id: `${funType}.handicapError`, defaultMessage: 'Handicap error'}),
            intl.formatMessage({id: `${funType}.illegalBetting`, defaultMessage: 'Illegal betting'}),
            intl.formatMessage({id: `${funType}.other`, defaultMessage: 'Other'})
        ],
        open: false,
        setOpen: (value) => {
            setConfirmationDialog(prev => ({...prev, open: value}))
        },
        checkBox: {
            title: intl.formatMessage({
                id: `${funType}.sendPrivateMessage`,
                defaultMessage: 'Send private message to member'
            }),
            checkBoxOnCheck: (value) => {
                setBetSlipAcceptanceParameter(prev => ({...prev, sendMsg: value}))
            }
        },
        onClose: (value?: string) => {
            if (value) {
                setBetSlipAcceptanceParameter(prev => ({...prev, description: value}))
            }
            setConfirmationDialog(prev => ({...prev, open: false}))
        },
        singleBets: 0,
        parlayBets: 0
    })

    const [alertDialog, setAlertDialog] = useState<AlertDialogProps & ToggleProps>({
        title: '',
        content: '',
        actions: [
            {
                type: 'cancel',
                text: intl.formatMessage({
                    id: `${funCommonType}.cancel`,
                    defaultMessage: 'Cancel'
                }),
                onClick: () => {
                    setBetSlipAcceptanceParameter(prev => ({...prev, betSlipIds: [], status: ''}))
                    setAlertDialog(prev => ({...prev, open: false}))
                }
            },
            {
                type: 'confirm',
                text: intl.formatMessage({
                    id: `${funCommonType}.confirm`,
                    defaultMessage: 'Confirm'
                }),
                autoFocus: true,
                onClick: () => {
                    setAlertDialog(prev => ({...prev, open: false}))
                }
            },
        ],
        open: false,
        setOpen: (value) => {
            setAlertDialog(prev => ({...prev, open: value}))
        }
    })

    const [betSlipAcceptanceParameter, setBetSlipAcceptanceParameter] = useState<BetSlipAcceptanceParameter>({
        betSlipIds: [],
        status: '',
        sendMsg: false,
        description: undefined
    })

    const [
        parlayDetailProps, setParlayDetailProps
    ] = useState<ParlayDetailProps>({
        parlayId: '',
        betAmount: 0,
        legs: [],
        device: '',
        maxPayout: 0
    })
    const [actions, setActions] = useState<ActionItem[]>([])
    betSlipTypes.unshift({
        key: EventType.all,
        text: intl.formatMessage({id: `${funCommonType}.all`, description: 'All'}),
        type: EventType.all
    })
    const parseSelectedOptions = (selectedOptions: SelectedOptions<any>): Partial<GetBetSlipsParameter> => {
        const parsedParams: Partial<GetBetSlipsParameter> = {};

        const mapOptionItemsToIds = (optionItems: OptionItem[]): string[] => {
            return optionItems.map(item => item.id);
        };

        const parseEnum = <T extends object>(optionItems: OptionItem[], enumType: T): (T[keyof T])[] => {
            const formattedNames = optionItems.map(item => item.name.replace(/ /g, '_').toUpperCase());
            return formattedNames.filter(name => Object.values(enumType).includes(name as unknown as T[keyof T])) as (T[keyof T])[];
        };

        if (selectedOptions[BetSlipOption.BetSlipType]) {
            parsedParams.betTypes = parseEnum(selectedOptions[BetSlipOption.BetSlipType], BetType);
        }
        if (selectedOptions[BetSlipOption.Sport]) {
            parsedParams.sportIds = mapOptionItemsToIds(selectedOptions[BetSlipOption.Sport]);
        }
        if (selectedOptions[BetSlipOption.League]) {
            parsedParams.leagueIds = mapOptionItemsToIds(selectedOptions[BetSlipOption.League]);
        }
        if (selectedOptions[BetSlipOption.Market]) {
            parsedParams.marketIds = mapOptionItemsToIds(selectedOptions[BetSlipOption.Market]);
        }
        if (selectedOptions[BetSlipOption.Status]) {
            parsedParams.statuses = parseEnum(selectedOptions[BetSlipOption.Status], BetStatus);
        }
        if (selectedOptions[BetSlipOption.MaximumPayout]) {
            const {condition, firstAmount, secondAmount} = selectedOptions[BetSlipOption.MaximumPayout];
            if (firstAmount === '' || isNaN(Number(firstAmount))) {
                parsedParams.maximumPayout = undefined
            } else {
                const enumKey = getEnumKeyByValue(BetAmountOptionsType, condition)!
                parsedParams.maximumPayout = {
                    condition: enumKey,
                    amount1: Number(firstAmount),
                    ...(secondAmount !== undefined && Number(secondAmount) !== 0 && {amount2: Number(secondAmount)})
                } as NumberConditionSettings;
            }
        }
        if (selectedOptions[BetSlipOption.Payout]) {
            const {condition, firstAmount, secondAmount} = selectedOptions[BetSlipOption.Payout];
            if (firstAmount === '' || isNaN(Number(firstAmount))) {
                parsedParams.payout = undefined
            } else {
                const enumKey = getEnumKeyByValue(BetAmountOptionsType, condition)!
                parsedParams.payout = {
                    condition: enumKey,
                    amount1: Number(firstAmount),
                    ...(secondAmount !== undefined && Number(secondAmount) !== 0 && {amount2: Number(secondAmount)})
                } as NumberConditionSettings;
            }
        }
        if (selectedOptions[BetSlipOption.Device]) {
            parsedParams.devices = parseEnum(selectedOptions[BetSlipOption.Device], Device);
        }
        if (selectedOptions[BetSlipOption.OddsFeed]) {
            parsedParams.providerNames = selectedOptions[BetSlipOption.OddsFeed];
        }
        if (selectedOptions[BetSlipOption.BettingType]) {
            const bettingTypes = (selectedOptions[BetSlipOption.BettingType] as OptionItem[]).map(item => item.id) as BetSlipEventType[];

            if (selectedBetSlipEventType.current === BetSlipEventType.all) {
                templateBettingType.current = bettingTypes[0]
            }
            parsedParams.eventType = bettingTypes[0]
        }
        if (selectedOptions[BetSlipOption.BetSlipStatus]) {
            parsedParams.settlements = parseEnum(selectedOptions[BetSlipOption.BetSlipStatus], BetSettlement);
        }
        if (selectedOptions[BetSlipOption.Result]) {
            parsedParams.results = parseEnum(selectedOptions[BetSlipOption.Result], BetResult);
        }
        if (selectedOptions[BetSlipOption.EventStartTime]) {
            const {startDate, endDate} = selectedOptions[BetSlipOption.EventStartTime];
            parsedParams.eventStartDate = startDate
            parsedParams.eventEndDate = endDate
        }
        return parsedParams;
    };

    const makeRequestDataAfterObtained = useCallback((chartParams?: CommonPieChartRecord) => {
        let obtainedRequest = queryParams

        const infoLabel = chartParams?.filterCondition.infoLabel

        if (infoLabel && Object.keys(BetSettlement).includes(toUpperCaseWithUnderscore(infoLabel))) {
            const value = BetSettlement[toUpperCaseWithUnderscore(infoLabel) as keyof typeof BetSettlement]
            obtainedRequest.settlements = [value]
        }

        if (infoLabel && Object.keys(BetResult).includes(toUpperCaseWithUnderscore(infoLabel ?? '') as BetResult)) {
            const value = BetResult[toUpperCaseWithUnderscore(infoLabel) as keyof typeof BetResult]
            obtainedRequest.results = [value]
        }

        if (chartParams) {
            if (chartParams.dateRange) {
                const [startDate, endDate] = chartParams.dateRange
                obtainedRequest.startDate = startDate
                obtainedRequest.endDate = endDate
            }
            if (chartParams.eventId) {
                obtainedRequest.search = {
                    searchType: 'EVENT_ID',
                    searchValue: chartParams.eventId
                }
            }
            switch (chartParams.infoType) {
                case InfoType.Device:
                    obtainedRequest.devices = [chartParams.filterCondition.infoLabel?.toUpperCase() ?? Device.IOS]
                    break
                case InfoType.Sports:
                    obtainedRequest.sportIds = chartParams?.options.map(option => option.id)
                    break
                case InfoType.BetSlips:
                    obtainedRequest.betTypes = chartParams.options.map(option => option.name.toUpperCase()) as BetType[]
                    break
                case InfoType.Market:
                    obtainedRequest.marketIds = chartParams.filterCondition.infoId
                        ? [chartParams.filterCondition.infoId]
                        : []
                    obtainedRequest.sportIds = chartParams?.options.map(option => option.id)
                    break
                case InfoType.League:
                    obtainedRequest.leagueIds = chartParams.filterCondition.infoId
                        ? [chartParams.filterCondition.infoId]
                        : []
                    obtainedRequest.sportIds = chartParams?.options.map(option => option.id)
                    break
            }
        }

        setFilterSelected({
            'BetSlip Type': obtainedRequest.betTypes?.map(type => ({id: type, name: allFirstCharToUpperCase(type)})),
            'Sport': ((chartParams?.infoType ?? InfoType.Sports) !== InfoType.BetSlips) ? chartParams?.options ?? [] : [],
            'League': obtainedRequest.leagueIds?.map(leagueId => ({
                id: leagueId,
                name: allFirstCharToUpperCase(infoLabel ?? '')
            })),
            'Market': obtainedRequest.marketIds?.map(marketId => ({
                id: marketId,
                name: allFirstCharToUpperCase(infoLabel ?? '')
            })),
            'Status': obtainedRequest.statuses?.map(status => ({id: status, name: allFirstCharToUpperCase(status)})),
            'Device': obtainedRequest.devices?.map(device => ({id: device, name: allFirstCharToUpperCase(device)})),
            'Bet Slip Status': obtainedRequest.settlements?.map(settlement => ({
                id: settlement,
                name: allFirstCharToUpperCase(settlement)
            })),
            'Result': obtainedRequest.results?.map(result => ({id: result, name: allFirstCharToUpperCase(result)})),
        })
        handleQueryChange({
            ...obtainedRequest
        })
    }, [])


    function isObjectEmpty(obj: any) {
        return lodash.every(obj, value => lodash.isNil(value) || value === '' || lodash.isEmpty(value))
    }

    const fetchBetSlipData = useCallback(() => {
        return new Promise<void>((resolve, reject) => {
            debounce(() => {
                const searchObj = isObjectEmpty(queryParams.search);
                const { search, ...other } = queryParams;

                setLoading(true);
                const randomKey = Math.random();
                lastRequestKey.current = randomKey;

                getBetSlipList(queryParams.search && searchObj ? other : queryParams)
                    .then(response => {
                        if (lastRequestKey.current !== randomKey) return;
                        setBetSlipList(response);
                        resolve();
                    })
                    .catch(e => {
                        console.log(`Error fetching bet slip list: ${e}`);
                        reject(e);
                    })
                    .finally(() => {
                        if (lastRequestKey.current !== randomKey) return;
                        setLoading(false);
                    });
            }, 500)();
        });
    }, [getBetSlipList, queryParams]);

    const checkActions = useCallback((rowSelectionModel: GridRowId[]) => {
        const dynamicActions: ActionItem[] = []

        if (!betSlipList?.content) {
            return dynamicActions;
        }

        const statuses = betSlipList.content
            .filter(betSlip => rowSelectionModel.includes(betSlip.id ?? ''))
            .map(betSlip => betSlip.statusPart.status);

        const enableAccept = statuses.length > 0 && statuses.every(status => status === BetStatus.PENDING)
        const enableReject = statuses.length > 0 && statuses.every(
            status => status === BetStatus.PENDING || status === BetStatus.ACCEPTED
        )
        const enableDelete = statuses.length > 0 && statuses.every(status => status !== BetStatus.VOID)

        if (enableAccept) {
            const actionItem = findActionItem(actionList, BetStatus.ACCEPTED);
            if (actionItem) dynamicActions.push(actionItem);
        }
        if (enableReject) {
            const actionItem = findActionItem(actionList, BetStatus.REJECTED);
            if (actionItem) dynamicActions.push(actionItem);
        }
        if (enableDelete) {
            const actionItem = findActionItem(actionList, BetStatus.VOID);
            if (actionItem) dynamicActions.push(actionItem);
        }

        return dynamicActions
    }, [betSlipList]);

    const onRowSelectionModelChange = useCallback((rowSelectionModel: GridRowId[]) => {
        setRowSelectionModel(rowSelectionModel)
        setActions(checkActions(rowSelectionModel))
    }, [checkActions]);

    const handleColumnsSwitchChanges = useCallback((checkedLabels: Record<string, any>[]) => {
        const displayColumns = checkedLabels as GridColDef[]
        if (rowSelectionModel.length <= 1) {
            const actions = columns(intl, funCommonType, handleRiskButtonClick, handleCopyButtonClick,
                handleParlayDetail, handleOptionClick, riskLevels)
                .find(columns => columns['field'] === 'option')
            if (actions)
                displayColumns.push(actions)
        }
        setDataColumns(displayColumns)
    }, [rowSelectionModel]);

    function getLast7Days(): { startDate: number, endDate: number } {
        const endDate = dayjs().tz().endOf('day').unix();
        const startDate = dayjs().tz().subtract(6, 'day').startOf('day').unix();

        return {
            startDate: startDate,
            endDate: endDate
        };
    }

    const handleDateRange = (params: Record<string, any>) => {
        if (selectedBetSlipEventType.current === BetSlipEventType.settled) {
            const dateRange = getLast7Days();
            params.eventType = undefined;
            params.startDate = params.startDate ?? dateRange.startDate;
            params.endDate = params.endDate ?? dateRange.endDate;
        } else {
            params.startDate = params.startDate ?? undefined;
            params.endDate = params.endDate ?? undefined;
        }
    };

    const preProcessingQueryParams = useCallback((params: Record<string, any>): Record<string, any> => {
        handleDateRange(params);

        const bettingTypeOption = templateBettingType.current ? {
            id: templateBettingType.current,
            name: firstCharToUpperCase(BetSlipEventType[templateBettingType.current])
        } : undefined;

        const isAllEventType = selectedBetSlipEventType.current === BetSlipEventType.all;

        if (isAllEventType) {
            params.eventType = bettingTypeOption?.id
        }

        return params;
    }, [templateBettingType.current]);

    const handleQueryChange = useCallback((params: Record<string, any>) => {
        const isPageChange = Boolean(params['page']);
        const isChangeDate = params.hasOwnProperty('startDate') && params.hasOwnProperty('endDate');
        const isCleanDate = isChangeDate && params['startDate'] === undefined && params['endDate'] === undefined;

        const processedParams = preProcessingQueryParams(params);
        const defaultEventType =
            selectedBetSlipEventType.current === BetSlipEventType.settled ||
            selectedBetSlipEventType.current === BetSlipEventType.all
                ? undefined
                : selectedBetSlipEventType.current;
        const defaultSettlement = selectedBetSlipEventType.current === BetSlipEventType.settled ? [BetSettlement.SETTLED, BetSettlement.EARLY_SETTLED, BetSettlement.RESETTLED] : undefined;
        const updatedParams = {
            ...processedParams,
            eventType: processedParams['eventType'] || defaultEventType,
            settlements: processedParams['settlements'] || defaultSettlement,
        }

        setQueryParams(prevParams => {
            if (lodash.isEqual(prevParams, processedParams)) {
                return prevParams;
            }

            return {
                ...prevParams,
                ...updatedParams,
                ...(isPageChange ? undefined : {page: 1}),
                ...(!isChangeDate ? {startDate: prevParams.startDate, endDate: prevParams.endDate} : undefined),
                ...(isCleanDate ? {startDate: undefined, endDate: undefined} : undefined),
            };
        })

    }, [filterSelected]);

    const handleBetAmountChanged = useCallback(debounce((condition: string, firstAmount: string, secondAmount?: string) => {
        const {betAmount} = queryParams
        const enumKey = getEnumKeyByValue(BetAmountOptionsType, condition)!

        if (
            betAmount?.condition === condition &&
            betAmount?.amount1?.toString() === firstAmount &&
            betAmount?.amount2?.toString() === secondAmount
        ) return

        if (firstAmount === '' || isNaN(Number(firstAmount))) {
            handleQueryChange({betAmount: undefined})
            setCanClean(false)
        } else {
            handleQueryChange({
                betAmount: {
                    condition: enumKey,
                    amount1: Number(firstAmount),
                    amount2: Number(secondAmount)
                }
            })
        }
    }, 500), [])

    const handleParlayDetail = (props: ParlayDetailProps) => {
        setParlayDetailProps(props)
        setShowParlayDialog(true)
    }

    const handleRiskButtonClick = (account: string, option: RiskLevel) => {
        //TODO: manage member risk when function ready.
        console.log('Risk button clicked', account, option)
    }

    const betSlipAcceptanceProcess = useCallback(async () => {
        if (betSlipAcceptanceParameter.betSlipIds.length > 0) {
            betSlipAcceptance(betSlipAcceptanceParameter)
                .then(response => {
                    setRowSelectionModel([])
                    fetchBetSlipData()
                    globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                        severity: response.failureIds.length > 0 ? 'warning' : 'success',
                        show: true,
                        message: response.failureIds.length > 0
                            ? intl.formatMessage({
                                id: `${funType}.acceptancePartialSuccess`,
                                defaultMessage: 'Partial success, Please try {ids} again later'
                            }, {ids: response.failureIds.join(', ')})
                            : intl.formatMessage({
                                id: `${funType}.acceptanceSuccess`,
                                defaultMessage: 'Updated successfully!'
                            })
                    });
                })
                .catch((result) => {
                    globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                        severity: 'error',
                        show: true,
                        message: result
                    });
                }).finally(() => {
                setBetSlipAcceptanceParameter(prev => ({
                    ...prev,
                    betSlipIds: [], status: '', sendMsg: false, description: undefined
                }))
            })
        }
    }, [betSlipAcceptanceParameter])

    const handleActionItemClick = (item: ActionItem) => {
        const betSlipIds = betSlipList?.content
            .filter(betSlip => rowSelectionModel.includes(betSlip.id ?? ''))
            .map(betSlip => betSlip.betSlipId) ?? []

        const singleBets = betSlipList?.content
            .filter(betSlip => rowSelectionModel.includes(betSlip.id ?? ''))
            .filter(betSlip => betSlip.betPart.betType === BetType.SINGLE) ?? []

        const parlayBets = betSlipList?.content
            .filter(betSlip => rowSelectionModel.includes(betSlip.id ?? ''))
            .filter(betSlip => betSlip.betPart.betType === BetType.PARLAY) ?? []

        if (betSlipIds.length === 0) return

        applyBetSlipAcceptance(
            betSlipIds,
            item.key,
            singleBets.length,
            parlayBets.length
        )
    }

    const handleCopyButtonClick = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Text copied to clipboard: ', text);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                datadogLogs.logger.error('Failed to copy text', {text: text}, err instanceof Error ? err : new Error(String(err)));
            });
    }
    const handleOptionClick = (betSlipId: string, betType: BetType, betStatus: BetStatus) => {
        applyBetSlipAcceptance(
            [betSlipId],
            betStatus,
            betType === BetType.SINGLE ? 1 : 0,
            betType === BetType.PARLAY ? 1 : 0
        )
    }

    const applyBetSlipAcceptance = (betSlipIds: string[], betStatus: BetStatus, singleBets: number, parlayBets: number) => {
        setBetSlipAcceptanceParameter(prev => ({
            ...prev,
            betSlipIds: betSlipIds,
            status: betStatus,
            sendMsg: false
        }))

        switch (betStatus) {
            case BetStatus.ACCEPTED:
            case BetStatus.PENDING:
                setAlertDialog(prev => ({
                    ...prev,
                    title: betStatus === BetStatus.ACCEPTED ? intl.formatMessage({
                        id: `${funType}.acceptTitle`,
                        defaultMessage: 'Accept Confirmation'
                    }) : intl.formatMessage({
                        id: `${funType}.holdTitle`,
                        defaultMessage: 'Hold Confirmation'
                    }),
                    content: betStatus === BetStatus.ACCEPTED ? intl.formatMessage({
                        id: `${funType}.acceptDescription`,
                        defaultMessage: 'Are you sure you want to accept the selected bet slips?'
                    }) : intl.formatMessage({
                        id: `${funType}.holdDescription`,
                        defaultMessage: 'Are you sure you want to hold the selected bet slips?'
                    }),
                    open: true
                }))
                break;
            case BetStatus.REJECTED:
                setIsRejection(true)
                setConfirmationDialog(prev => ({
                    ...prev,
                    open: true,
                    title: intl.formatMessage({id: `${funType}.rejectTitle`, defaultMessage: 'Reject Confirmation'}),
                    subTitle: intl.formatMessage({
                        id: `${funType}.rejectDescription`,
                        defaultMessage: 'Please select the reason for rejection'}),
                    singleBets: singleBets,
                    parlayBets: parlayBets,
                }))
                break;
            case BetStatus.VOID:
                setIsRejection(false)
                setConfirmationDialog(prev => ({
                    ...prev,
                    open: true,
                    title: intl.formatMessage({id: `${funType}.deleteTitle`, defaultMessage: 'Delete Confirmation'}),
                    subTitle: intl.formatMessage({
                        id: `${funType}.deleteDescription`,
                        defaultMessage: 'Please select the reason for deletion'}),
                    singleBets: singleBets,
                    parlayBets: parlayBets,
                }))
                break;
        }
    }

    const [fireSeconds, setFireSeconds] = useState<number>(5);
    const {startFire, cancelFire, stopFire, isFiring} = useAPIFiringHandler({
        apiFunction: fetchBetSlipData,
        interval: fireSeconds*1000
    })

    const handleRealTimeSwitchChange = (value: boolean) => {
        if (value && !isFiring) {
            startFire()
        } else {
            stopFire()
        }
    }

    const handleRealTimeUpdateIntervalChange = (value: number) => {
        if (!isNaN(value) && value > 0) {
            setFireSeconds(value)
        }
    }

    const [selectedIndex, setSelectedIndex] = useState<number>(0)

    const makeBetSlipRequestDataAfterObtained = useCallback((betSlipParams?: GetBetSlipsFromEvent) => {
        let obtainedRequest = queryParams

        if (betSlipParams?.eventType) {
            const index = betSlipTypes.findIndex(item => item.key === betSlipParams.eventType)
            if (index !== -1) setSelectedIndex(index)
        }

        if (betSlipParams) {
            if (betSlipParams.sportIds) {
                obtainedRequest.sportIds = [betSlipParams.sportIds?.sportId]
            }

            obtainedRequest.startDate = betSlipParams.startDate
            obtainedRequest.endDate = betSlipParams.endDate
            obtainedRequest.marketIds = betSlipParams.marketIds?.map(item => item.marketId)
            obtainedRequest.providerNames = betSlipParams.providerNames
        }

        if (betSlipParams?.eventId) {
            setQueryParams(prevState => {
                return {
                    ...prevState,
                    search: {
                        searchType: 'EVENT_ID',
                        searchValue: betSlipParams.eventId
                    }
                } as GetBetSlipsParameter
            })
        }

        setFilterSelected({
            ...(betSlipParams?.sportIds ? {
                'Sport': [{id: betSlipParams?.sportIds?.sportId, name: betSlipParams?.sportIds?.sportName}],
            } : {}),
            'Market': betSlipParams?.marketIds?.map(item => ({id: item.marketId, name: item.marketName})),
            ...(obtainedRequest.startDate && obtainedRequest.endDate ? {
                'Event Start Time': {
                    startDate: obtainedRequest.startDate,
                    endDate: obtainedRequest.endDate
                }
            } : {}),
            ...(obtainedRequest.providerNames ? {
                'Odds Feed': obtainedRequest.providerNames.map(name => ({id: name, name: name}))
            } : {})

        })

        handleQueryChange({
            ...obtainedRequest
        })
    }, [])

    useEffect(() => {
        const obtainChartParams = async () => {
            try {
                const record = chartProvider.obtainChartRecord(true);

                if (record) {
                    makeRequestDataAfterObtained(record);
                }
            } catch (e) {
                console.log(`Error: ${e}`)
            } finally {
                setObtainFinished(true);
            }
        }

        const obtainBetSlipParams = async () => {
            try {
                const record = await betSlipProvider.obtainBetSlipRecord(true);
                if (record) makeBetSlipRequestDataAfterObtained(record);
            } catch (e) {
                console.log(`Error: ${e}`)
            } finally {
                setObtainFinished(true);
            }
        }

        obtainChartParams();
        obtainBetSlipParams();
    }, [])

    const amountRange: [number, number] = [1, 999999999]

    useEffect(() => {
        let isValid = true
        if (queryParams.betAmount?.condition === 'B' && queryParams.betAmount.amount2) {
            const isAmount1Over = hasOverLimit(queryParams.betAmount.amount1, amountRange)
            const isAmount2Over = hasOverLimit(queryParams.betAmount.amount2, amountRange)
            isValid = isValid && !isAmount1Over && !isAmount2Over
        } else {
            const isAmount1Over = queryParams.betAmount && hasOverLimit(queryParams.betAmount.amount1, amountRange)
            isValid = isValid && !isAmount1Over
        }

        if (obtainFinished && isValid) {
            cancelFire()
            fetchBetSlipData()
        }
    }, [obtainFinished, queryParams])

    useEffect(() => {
        handleQueryChange({
            ...parseSelectedOptions(filterSelected),
        })
    }, [filterSelected]);

    useEffect(() => {
        setCanClean(
            (queryParams.search?.searchValue?.length ?? 0) +
            (queryParams.betAmount?.amount1 ?? 0) +
            (queryParams.startDate ?? 0) +
            (queryParams.endDate ?? 0)
            > 0
        );
    }, [queryParams]);

    useEffect(() => {
        if (betSlipAcceptanceParameter.description || (!alertDialog.open && betSlipAcceptanceParameter.status))
            betSlipAcceptanceProcess();
    }, [betSlipAcceptanceParameter.description, alertDialog.open]);

    const [dataColumns, setDataColumns] = useState(columns(intl, funCommonType, handleRiskButtonClick,
        handleCopyButtonClick, handleParlayDetail, handleOptionClick, riskLevels))

    return {
        isEditable,
        betSlipTypes,
        showExportDialog, setShowExportDialog,
        parlayDetailProps, handleParlayDetail,
        showParlayDialog, setShowParlayDialog,
        searchOption,
        dataKey: 'headerName',
        manageColumns: columns(
            intl,
            funCommonType,
            handleRiskButtonClick,
            handleCopyButtonClick,
            handleParlayDetail,
            handleOptionClick,
            riskLevels
        ).filter(columns => columns['field'] !== 'option'),
        pageModel: {
            page: queryParams.page,
            pageSize: queryParams.pageSize
        },
        dateRange: {
            startDate: queryParams.startDate ? dayjs(queryParams.startDate * 1000) : null,
            endDate: queryParams.endDate ? dayjs(queryParams.endDate * 1000) : null
        },
        dataColumns,
        rowSelectionModel,
        onRowSelectionModelChange,
        handleColumnsSwitchChanges,
        betSlipList,
        handleQueryChange,
        loading,
        filterSelected,
        setFilterSelected,
        handleBetAmountChanged,
        handleRiskButtonClick,
        handleCopyButtonClick,
        handleOptionClick,
        actions,
        canClean,
        handleActionItemClick,
        confirmationDialog,
        alertDialog,
        intl,
        funCommonType,
        queryParams,
        selectedBetSlipEventType,
        handleRealTimeSwitchChange,
        handleRealTimeUpdateIntervalChange,
        isFiring,
        fireSeconds,
        fireSecondOptions: [1, 2, 3, 4, 5],
        selectedIndex
    }
}

export default useBetSlipsViewModel
