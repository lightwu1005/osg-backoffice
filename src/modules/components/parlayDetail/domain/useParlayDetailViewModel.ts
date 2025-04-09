import React, {useCallback, useEffect, useState} from "react"
import useBetSlipsRepository from "@/services/@betslips/repository/useBetSlipsRepository"
import {toBetSlipVoidBetLegsProps} from "@/app/betSlip/components/models/RequestDataMapping"
import {BetSlipVoidBetLegsParameter} from "@/app/betSlip/components/models/BetSlipParameters"
import {
    BetStatus,
} from "@/services/@core/module/Enum"
import {GlobalController} from "@/modules/common/GlobalController";
import {ParlayDetailProps} from "@/modules/components/parlayDetail/ParlayDetail";
import {GridRowId} from "@mui/x-data-grid";
import {ActionItem} from "@/modules/components/buttons/actionButton/ActionButton";
import {ConfirmationDialogProps} from "@/modules/components/dialog/ConfirmationDialog";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {ManualSettleBetLegVoid} from "@/services/@core/module/CommonDataModels";

const useParlayDetailViewModel = (props: ParlayDetailProps) => {
    const {parlayId, legs} = props

    // API calls
    const betSlipsRepository = useBetSlipsRepository()

    const betSlipVoidBetLegs = useCallback(async (params: BetSlipVoidBetLegsParameter) => {
        return await betSlipsRepository.betSlipVoidBetLegs(toBetSlipVoidBetLegsProps(params))
    }, [betSlipsRepository])

    // UI states
    const intl = useIntl()
    const betSlipLang = LocalizationFunctionType.BetSlip
    const commonLang = LocalizationFunctionType.Common
    const globalController = GlobalController.getInstance()

    const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowId[]>([]);
    const [data, setData] = useState(legs)

    const actionList: ActionItem[] = [{
        key: BetStatus.VOID,
        value: intl.formatMessage({
            id: `${betSlipLang}.actionDelete`, defaultMessage: 'Delete'})
    }]

    const [confirmationDialog, setConfirmationDialog] = useState<ConfirmationDialogProps & {
        singleBets: number,
        parlayBets: number
    }>({
        id: 'DeleteParlayIdsDialog',
        title: intl.formatMessage({id: `${betSlipLang}.deleteTitle`, defaultMessage: 'Delete Confirmation'}),
        subTitle: intl.formatMessage({
            id: `${betSlipLang}.deleteDescription`,
            defaultMessage: 'Please select the reason for delete'
        }),
        contentCard: '',
        options: [
            intl.formatMessage({
                id: `${betSlipLang}.leagueOrParticipantsChange`,
                defaultMessage: 'Changes in league or participants'
            }),
            intl.formatMessage({id: `${betSlipLang}.matchStartTimeChange`, defaultMessage: 'Changes in match start time'}),
            intl.formatMessage({id: `${betSlipLang}.matchInterruption`, defaultMessage: 'Match interruption'}),
            intl.formatMessage({id: `${betSlipLang}.handicapError`, defaultMessage: 'Handicap error'}),
            intl.formatMessage({id: `${betSlipLang}.illegalBetting`, defaultMessage: 'Illegal betting'}),
            intl.formatMessage({id: `${betSlipLang}.other`, defaultMessage: 'Other'})
        ],
        open: false,
        setOpen: (value) => {
            setConfirmationDialog(prev => ({...prev, open: value}))
        },
        checkBox: {
            title: intl.formatMessage({
                id: `${betSlipLang}.sendPrivateMessage`,
                defaultMessage: 'Send private message to member'
            }),
            checkBoxOnCheck: (value) => {
                setBetSlipVoidBetLegsParameter(prev => ({...prev, sendMsg: value}))
            }
        },
        onClose: (value?: string) => {
            if (value) {
                setBetSlipVoidBetLegsParameter(prev => ({...prev, description: value}))
            }
            setConfirmationDialog(prev => ({...prev, open: false}))
        },
        singleBets: 0,
        parlayBets: 0
    })

    const [betSlipVoidBetLegsParameter, setBetSlipVoidBetLegsParameter] = useState<BetSlipVoidBetLegsParameter>({
        betSlipId: '',
        manualSettleBetLegVoList: [],
        sendMsg: false,
        description: undefined
    })

    const [actions, setActions] = useState<ActionItem[]>([])

    const onRowSelectionModelChange = useCallback((rowSelectionModel: GridRowId[]) => {
        setRowSelectionModel(rowSelectionModel)
    }, [])

    useEffect(() => {
        if (rowSelectionModel.length > 0) {
            setActions(actionList)
        } else {
            setActions([])
        }
    }, [rowSelectionModel])

    const betSlipVoidBetLegsProcess = useCallback(async () => {
        if (betSlipVoidBetLegsParameter.manualSettleBetLegVoList.length > 0) {
            betSlipVoidBetLegs(betSlipVoidBetLegsParameter)
                .then(() => {
                    setRowSelectionModel([])

                    // Remove already void legs from UI.
                    const manualVoidBetLegsIds = new Set(
                        betSlipVoidBetLegsParameter.manualSettleBetLegVoList.map(legVoid => legVoid.betId)
                    );
                    const updatedLegs = data.filter(leg => !manualVoidBetLegsIds.has(leg.betId));
                    setData(updatedLegs)

                    globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                        severity: 'success',
                        show: true,
                        message: intl.formatMessage({
                            id: `${betSlipLang}.acceptanceSuccess`,
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
                    setBetSlipVoidBetLegsParameter(prev => ({
                        ...prev,
                        betSlipId: '', manualSettleBetLegVoList: [], sendMsg: false, description: undefined
                    }))
                })
        }
    }, [betSlipVoidBetLegsParameter])

    const handleOptionClick = (betId: string, optionType: BetStatus) => {
        const manualSettleBetLegVoList: ManualSettleBetLegVoid[] = data.filter(leg => leg.betId === betId).map(leg => {
            return {
                eventId: leg.eventId,
                oddsType: leg.eventType,
                betId: leg.betId,
                line: leg.line,
                odds: leg.odds
            }
        })

        // Reserved for future processing if there are options other than VOID
        if (optionType === BetStatus.VOID) {
            applyBetSlipVoidBetLegs(parlayId, manualSettleBetLegVoList)
        }
    }

    const handleActionItemClick = (item: ActionItem) => {
        const manualSettleBetLegVoList = legs
            .filter(leg => rowSelectionModel.includes(leg.betId ?? ''))
            .map(leg => {
                return {
                    eventId: leg.eventId,
                    oddsType: leg.eventType,
                    betId: leg.betId,
                    line: leg.line,
                    odds: leg.odds
                }
            }) ?? []

        if (manualSettleBetLegVoList.length === 0) return

        // Reserved for future processing if there are options other than VOID
        if (item.key === BetStatus.VOID) {
            applyBetSlipVoidBetLegs(parlayId, manualSettleBetLegVoList)
        }
    }
    const applyBetSlipVoidBetLegs = (betSlipId: string, manualSettleBetLegVoList: ManualSettleBetLegVoid[]) => {
        setBetSlipVoidBetLegsParameter(prev => ({
            ...prev,
            betSlipId: betSlipId,
            manualSettleBetLegVoList: manualSettleBetLegVoList,
            sendMsg: false
        }))
        setConfirmationDialog(prev => ({
            ...prev,
            open: true,
            singleBets: 0,
            parlayBets: 1,
        }))
    }

    useEffect(() => {
        if (betSlipVoidBetLegsParameter.description || betSlipVoidBetLegsParameter.manualSettleBetLegVoList.length > 0) {
            betSlipVoidBetLegsProcess();
        }
    }, [betSlipVoidBetLegsParameter.description]);

    return {
        rowSelectionModel,
        onRowSelectionModelChange,
        handleOptionClick,
        actions,
        handleActionItemClick,
        confirmationDialog,
        intl,
        betSlipLang,
        commonLang,
        data
    }
}

export default useParlayDetailViewModel
