import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {Box, Divider, IconButton, Stack, Tooltip, Typography} from '@mui/material';
import {
    AttachMoneyRounded, MoneyOffRounded,
    PauseRounded,
    PlayCircleRounded,
    PushPinRounded,
    StopCircleRounded, WebRounded,
    WysiwygRounded
} from "@mui/icons-material";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {Functionality} from "@/services/@core/module/Enum";

export enum QuickActionLabel {
    PIN = 'pin',
    TEMPLATE = 'template',
    SUSPEND = 'suspend',
    CLOSE = 'close',
    LINES = 'lines',
    PAYOUT = 'payout',
}

export type QuickButtonLabels =
    QuickActionLabel.PIN
    | QuickActionLabel.TEMPLATE
    | QuickActionLabel.SUSPEND
    | QuickActionLabel.CLOSE
    | QuickActionLabel.LINES
    | QuickActionLabel.PAYOUT
export type QuickActionCallback = (id: string, buttonName: QuickButtonLabels, status: boolean) => void;

export interface QuickActionProps {
    id: string
    editable: boolean
    isCollapsed: boolean
    pinStatus: boolean
    templateStatus: boolean
    suspendStatus: boolean
    closeStatus: boolean
    payoutStatus: boolean
    finishStatus: boolean
    onAction: QuickActionCallback
}

const QuickAction = (props: QuickActionProps) => {
    const {id, pinStatus, isCollapsed, templateStatus, suspendStatus, closeStatus, payoutStatus, finishStatus, onAction} = props
    const [pinBtnStatus, setPinBtnStatus] = useState(pinStatus)
    const [templateBtnStatus, setTemplateBtnStatus] = useState(templateStatus)
    const [suspendBtnStatus, setSuspendBtnStatus] = useState(suspendStatus)
    const [closeBtnStatus, setCloseBtnStatus] = useState(closeStatus)
    const [payoutBtnStatus, setPayoutBtnStatus] = useState(payoutStatus)

    const intl = useIntl()
    const funType = LocalizationFunctionType.Event
    const pinTip = intl.formatMessage({ id: `${funType}.action.pinTip`, defaultMessage: 'Pin events' });
    const templateTip = intl.formatMessage({ id: `${funType}.action.templateTip`, defaultMessage: 'Select template' });
    const suspendOffTip = intl.formatMessage({ id: `${funType}.action.suspendOffTip`, defaultMessage: 'Suspended all event markets' });
    const suspendOnTip = intl.formatMessage({ id: `${funType}.action.suspendOnTip`, defaultMessage: 'Open all event markets' });
    const closeOffTip = intl.formatMessage({ id: `${funType}.action.closeOffTip`, defaultMessage: 'Close all event markets' });
    const marketTip = intl.formatMessage({ id: `${funType}.action.marketTip`, defaultMessage: 'Market' });
    const payoutOnTip = intl.formatMessage({ id: `${funType}.action.payoutOnTip`, defaultMessage: 'Active auto settlement' });
    const payoutOffTip = intl.formatMessage({ id: `${funType}.action.payoutOffTip`, defaultMessage: 'Disable auto settlement' });
    const widget = intl.formatMessage({ id: `${funType}.action.widget`, defaultMessage: 'Monitoring Widget' });
    const control = intl.formatMessage({ id: `${funType}.action.control`, defaultMessage: 'Market Control' });

    const isBetsBO = process.env.FUNCTIONALITY === Functionality.Bets

    const handleClicked = useCallback((quickButtonLabel: QuickButtonLabels) => {
        let newStatus = false

        switch (quickButtonLabel) {
            case QuickActionLabel.PIN:
                newStatus = !pinBtnStatus
                break
            case QuickActionLabel.TEMPLATE:
                if (templateBtnStatus) return
                newStatus = true
                break
            case QuickActionLabel.SUSPEND:
                newStatus = !suspendBtnStatus
                break
            case QuickActionLabel.CLOSE:
                newStatus = !closeBtnStatus
                break
            case QuickActionLabel.PAYOUT:
                newStatus = !payoutBtnStatus
                break
        }

        onAction(id, quickButtonLabel, newStatus)
    }, [
        pinBtnStatus,
        suspendBtnStatus,
        closeBtnStatus,
        payoutStatus,
        onAction,
        id
    ])

    useEffect(() => {
        setPinBtnStatus(pinStatus)
    }, [pinStatus]);

    useEffect(() => {
        setTemplateBtnStatus(templateStatus)
    }, [templateStatus]);

    useEffect(() => {
        setSuspendBtnStatus(suspendStatus)
    }, [suspendStatus]);

    useEffect(() => {
        setCloseBtnStatus(closeStatus)
    }, [closeStatus]);

    useEffect(() => {
        setPayoutBtnStatus(payoutStatus)
    }, [payoutStatus]);

    return (
        isCollapsed ? (
            <Stack direction={'column'} alignItems={'center'} spacing={1}>
                <Tooltip title={pinTip} placement={'top'}>
                    <IconButton
                        size={'small'}
                        sx={{
                            color: pinBtnStatus ? '#0B6BCB' : 'inherit',
                            '&.Mui-disabled': {
                                color: '#9FA6AD',
                            },
                            ':hover': {
                                bgcolor: 'action.hover',
                            }
                        }}
                        onClick={(event) => {
                            event.stopPropagation()
                            handleClicked(QuickActionLabel.PIN)
                        }}
                        disabled={finishStatus}
                    >
                        <PushPinRounded/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={marketTip}>
                    <IconButton
                        size={'small'}
                        onClick={(event) => {
                            event.stopPropagation()
                            handleClicked(QuickActionLabel.LINES)
                        }}
                        disabled={finishStatus}
                    >
                        <WebRounded/>
                    </IconButton>
                </Tooltip>
            </Stack>
            ) : (
            <Stack direction={'column'}>
                <Typography variant={'inherit'}>{widget}</Typography>
                <Stack direction={'row'}>
                    <Tooltip title={pinTip} placement={'top'}>
                        <IconButton
                            size={'small'}
                            sx={{
                                color: pinBtnStatus ? '#0B6BCB' : 'inherit',
                                '&.Mui-disabled': {
                                    color: '#9FA6AD',
                                },
                                ':hover': {
                                    bgcolor: 'action.hover',
                                }
                            }}
                            onClick={(event) => {
                                event.stopPropagation()
                                handleClicked(QuickActionLabel.PIN)
                            }}
                            disabled={finishStatus}
                        >
                            <PushPinRounded/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={marketTip} placement={'top'}>
                        <IconButton
                            size={'small'}
                            onClick={(event) => {
                                event.stopPropagation()
                                handleClicked(QuickActionLabel.LINES)
                            }}
                            disabled={finishStatus}
                        >
                            <WebRounded/>
                        </IconButton>
                    </Tooltip>
                </Stack>
                {props.editable && !isBetsBO && <Divider/>}
                {props.editable && !isBetsBO && <Typography mt={1.5} variant={'inherit'}>{control}</Typography>}
                <Stack direction={'row'}>
                    {props.editable && !isBetsBO && <Tooltip title={payoutBtnStatus ? payoutOffTip : payoutOnTip}>
                        <Box>
                            <IconButton
                                size={'small'}
                                sx={{
                                    color: payoutBtnStatus ? 'inherit' : '#FF4724',
                                    '&.Mui-disabled': {
                                        color: '#9FA6AD',
                                    },
                                    ':hover': {
                                        bgcolor: 'action.hover',
                                    }
                                }}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    handleClicked(QuickActionLabel.PAYOUT)
                                }}
                                disabled={finishStatus}
                            >
                                {payoutBtnStatus ? <AttachMoneyRounded/> : <MoneyOffRounded/>}
                            </IconButton>
                        </Box>
                    </Tooltip>}
                    {props.editable && <Tooltip title={suspendBtnStatus ? suspendOnTip : suspendOffTip}>
                        <Box>
                            <IconButton
                                size={'small'}
                                sx={{
                                    color: suspendBtnStatus ? '#51BC51' : 'inherit',
                                    '&.Mui-disabled': {
                                        color: '#9FA6AD',
                                    },
                                    ':hover': {
                                        bgcolor: 'action.hover',
                                    }
                                }}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    handleClicked(QuickActionLabel.SUSPEND)
                                }}
                                disabled={finishStatus}
                            >
                                {suspendBtnStatus ? <PlayCircleRounded/> : <PauseRounded/>}
                            </IconButton>
                        </Box>
                    </Tooltip>}
                    {props.editable && <Tooltip title={closeBtnStatus ? suspendOnTip : closeOffTip}>
                        <Box>
                            <IconButton
                                size={'small'}
                                sx={{
                                    color: closeBtnStatus ? '#51BC51' : '#FF4724',
                                    '&.Mui-disabled': {
                                        color: '#9FA6AD',
                                    },
                                    ':hover': {
                                        bgcolor: 'action.hover',
                                    }
                                }}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    handleClicked(QuickActionLabel.CLOSE)
                                }}
                                disabled={finishStatus}
                            >
                                {closeBtnStatus ? <PlayCircleRounded/> : <StopCircleRounded/>}
                            </IconButton>
                        </Box>
                    </Tooltip>}
                    {props.editable && !isBetsBO && <Tooltip title={templateTip}>
                        <Box>
                            <IconButton
                                size={'small'}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    handleClicked(QuickActionLabel.TEMPLATE)
                                }}
                                disabled={finishStatus}
                            >
                                <WysiwygRounded/>
                            </IconButton>
                        </Box>
                    </Tooltip>}
                </Stack>
            </Stack>
        )
    )
}


export default QuickAction