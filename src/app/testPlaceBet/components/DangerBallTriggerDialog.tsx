import ToggleProps from "@/modules/interface/ToggleProps";
import {Box, Button, Grid} from "@mui/material";
import {FullScreenDialog} from "@/modules/components/dialog/FullScreenDialog";
import React from "react";
import useDangerBallTriggerViewModel from "@/app/testPlaceBet/domain/useDangerBallTriggerViewModel";
import {StatusButtonGroup, StatusItem} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup";
import {InfoSelectComponent} from "@/modules/components/TextField";

export interface DangerBallTriggerProps extends ToggleProps{
    eventList: StatusItem[]
}

export default function DangerBallTriggerDialog(props: DangerBallTriggerProps) {
    const {open, setOpen} = props
    return <FullScreenDialog
        open={open}
        setOpen={setOpen}
        content={
            <DangerBallBox {...props}/>
        }
    />
}

export const DangerBallBox = (props: DangerBallTriggerProps) => {
    const {eventList} = props
    const {
        canSubmit,
        dangerBallStateOptions,
        handleDangerBallTrigger,
        handleEventSelected,
        handleDangerBallStateChange
    } = useDangerBallTriggerViewModel();

    return (
        <Grid container mt={3} spacing={3} alignItems={'flex-end'} justifyContent={'space-between'}>
            <Grid item xs>
                <InfoSelectComponent header={'賽事選擇'}
                                     menu={
                    {
                        label: '選擇要觸發危險球的賽事',
                        options: eventList.map(eventList => eventList.text + ': ' + eventList.key),
                        onChange: handleEventSelected
                    }
                }/>
            </Grid>
            <Grid item xs>
                <InfoSelectComponent header={'狀況選擇'}
                                     menu={
                    {
                        label: '選擇要觸發的危險球情況',
                        options: dangerBallStateOptions.map(state => state.text),
                        onChange: handleDangerBallStateChange
                    }
                }/>
            </Grid>
            <Grid item xs={2}>
                <Button
                    sx={{height: '53px'}}
                    fullWidth
                    variant={'outlined'}
                    onClick={handleDangerBallTrigger}
                    disabled={!canSubmit}
                >
                    觸發危險球
                </Button>
            </Grid>
        </Grid>
    )
}
