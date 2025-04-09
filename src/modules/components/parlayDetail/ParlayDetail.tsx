import * as React from "react";
import {Button, Stack, Tooltip, Typography} from "@mui/material";
import ToggleProps from "@/modules/interface/ToggleProps";
import {columns} from "@/modules/components/parlayDetail/ParlayDetailColumns";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {DataGridPro} from "@mui/x-data-grid-pro/DataGridPro";
import {AnimationRounded, DevicesRounded, ListAltRounded, LocalAtmOutlined} from "@mui/icons-material";
import {BetPartLegsModel, Legs} from "@/services/@core/module/ResponseDataModels";
import {EventStatus} from "@/services/@core/module/EventStatus";
import PaidIcon from "@mui/icons-material/Paid";
import {moneyFormat} from "@/utils/tools";
import ActionButton from "@/modules/components/buttons/actionButton/ActionButton";
import SimpleBetNumberCard from "@/app/betSlip/components/SimpleBetNumberCard";
import ConfirmationDialog from "@/modules/components/dialog/ConfirmationDialog";
import useParlayDetailViewModel from "@/modules/components/parlayDetail/domain/useParlayDetailViewModel";

export interface ParlayDetailProps {
    parlayId: string
    betAmount: number
    legs: BetPartLegsModel[] | Legs[]
    device: string
    maxPayout: number
}

interface InfoItemProps {
    icon: React.ReactNode
    text: string
    tips?: string
}

const InfoItem = ({icon, text, tips}: Readonly<InfoItemProps>) => (
    <Tooltip title={tips} placement={'top'} arrow>
        <Stack direction="row" spacing={1} alignItems="center">
            {React.cloneElement(icon as React.ReactElement, {sx: {color: '#636B74', fontSize: 24}})}
            <Typography variant="body1">{text}</Typography>
        </Stack>
    </Tooltip>
)

function ParlayDetail({parlayId, betAmount, legs, device, maxPayout}: Readonly<ParlayDetailProps>) {
    const {
        rowSelectionModel,
        onRowSelectionModelChange,
        handleOptionClick,
        actions,
        handleActionItemClick,
        confirmationDialog,
        intl,
        commonLang,
        data
    } = useParlayDetailViewModel({parlayId, betAmount, legs, device, maxPayout})

    const legsWithIds = data.map((leg, index) => {
        const {eventStatus, ...other} = leg
        return {
            eventStatus: EventStatus[eventStatus],
            id: leg.betId,
            ...other
        }
    })

    return (
        <Stack spacing={3}>
            <Stack direction={'row'} spacing={2} alignItems="center" justifyContent={'space-between'}>
                <Stack direction="row" spacing={2} justifyItems={'start'}>
                    <InfoItem icon={<ListAltRounded/>} text={parlayId}/>
                    <InfoItem icon={<LocalAtmOutlined/>} text={`$ ${moneyFormat(betAmount)}`}
                              tips={intl.formatMessage({id: `${commonLang}.betAmount`, defaultMessage: 'Bet Amount'})}
                    />
                    <InfoItem
                        icon={<AnimationRounded/>}
                        text={`
                        ${legsWithIds.length} 
                        ${intl.formatMessage({id: `${commonLang}.leg`, defaultMessage: 'Leg'})}
                    `}
                    />
                    <InfoItem icon={<DevicesRounded/>} text={device}/>
                    <InfoItem icon={<PaidIcon/>} text={`$ ${moneyFormat(maxPayout)}`}
                              tips={intl.formatMessage({id: `${commonLang}.maximumPayout`, defaultMessage: 'Maximum Payout'})}
                    />
                </Stack>
                <Stack justifyItems={'end'}>
                    <ActionButton
                        label={intl.formatMessage({id: `${commonLang}.actions`, defaultMessage: 'Actions'})}
                        list={actions}
                        onItemClick={(item)=> handleActionItemClick(item)}
                    />
                </Stack>
            </Stack>
            <DataGridPro
                data-testid={'table'}
                rowHeight={100}
                disableColumnMenu
                sx={{
                    border: 0,
                    '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
                        '&:focus': {
                            outline: 0,
                        },
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#F0F4F8',
                        '[data-mui-color-scheme="dark"] &': {
                            backgroundColor: '#0A2744'
                        },
                    },
                    '& .MuiDataGrid-footerContainer': {
                        display: 'none',
                    },
                }}
                columns={columns(intl, commonLang, handleOptionClick)}
                rows={legsWithIds}
                rowCount={legsWithIds.length}
                checkboxSelection
                disableRowSelectionOnClick
                rowSelectionModel={rowSelectionModel}
                onRowSelectionModelChange={onRowSelectionModelChange}
            />
            <ConfirmationDialog
                id={confirmationDialog.id}
                title={confirmationDialog.title}
                subTitle={confirmationDialog.subTitle}
                options={confirmationDialog.options}
                checkBox={confirmationDialog.checkBox}
                contentCard={<SimpleBetNumberCard singleBets={confirmationDialog.singleBets}
                                                  parlayBets={confirmationDialog.parlayBets}/>}
                onClose={confirmationDialog.onClose}
                open={confirmationDialog.open}
                setOpen={confirmationDialog.setOpen}
            />
        </Stack>
    )
}

export default function ParlayDetailDialog({open, setOpen, ...parlayProps}: ParlayDetailProps & ToggleProps) {
    const {
        intl,
        betSlipLang,
        commonLang
    } = useParlayDetailViewModel(parlayProps)

    const onClose = () => {
        setOpen(false)
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>
                {
                    intl.formatMessage({id: `${betSlipLang}.parlayDetail`, defaultMessage: 'Parlay Detail'})
                }
            </DialogTitle>
            <DialogContent>
                <ParlayDetail {...parlayProps}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="contained">
                    {
                        intl.formatMessage({id: `${commonLang}.close`, defaultMessage: 'Close'})
                    }
                </Button>
            </DialogActions>
        </Dialog>
    )
}