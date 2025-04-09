import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import React from "react";
import useBetSlipsExportViewModel from "@/app/betSlip/domain/useBetSlipsExportViewModel";
import {Button} from "@mui/material";
import {SingleInputDateRangePicker} from "@/modules/components/TextField";
import ToggleProps from "@/modules/interface/ToggleProps";
import PageFramework from "@/modules/components/general/PageFramework";
import LoadingAnimation from "@/modules/components/general/LoadingAnimation";

const ExportDialog = ({open, setOpen}: ToggleProps) => {
    const {
        isLoading,
        dateRange,
        setFieldsValues,
        isSubmitEnabled,
        submitExport,
        intl,
        funType,
        funCommonType
    } = useBetSlipsExportViewModel()

    return (
        <PageFramework>
            <Dialog
                open={open}
                onClose={setOpen}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        width: '40vw'
                    },
                }}
            >
                <DialogTitle variant={'h6'}>
                    {
                        intl.formatMessage({
                            id: `${funType}.exportSetting`,
                            defaultMessage: 'Export Setting'
                        })
                    }
                </DialogTitle>
                <DialogContent sx={{ paddingTop: 4 }}>
                    <SingleInputDateRangePicker
                        sx={{ marginTop: 1 }}
                        label={intl.formatMessage({
                            id: `${funCommonType}.dateRange`,
                            defaultMessage: 'Date Range'
                        })}
                        value={[dateRange?.startDate, dateRange?.endDate]}
                        onChange={(dateRange) => {
                            setFieldsValues({
                                startDate: dateRange?.[0]?.unix() ?? null,
                                endDate: dateRange?.[1]?.unix() ?? null,
                            })
                        }}
                    />
                </DialogContent>
                <DialogActions
                    sx={{
                        justifyContent: 'flex-end',
                        margin: '1rem'
                    }}
                >
                    <Button variant={'text'} onClick={() => setOpen(false)}>
                        { intl.formatMessage({id: `${funCommonType}.cancel`, defaultMessage: 'Cancel'}) }
                    </Button>
                    <Button data-testid={'export-button'}
                            variant={'contained'} disabled={!isSubmitEnabled} onClick={submitExport}>
                        { intl.formatMessage({id: `${funCommonType}.export`, defaultMessage: 'Export'}) }
                    </Button>
                </DialogActions>
                <LoadingAnimation isLoading={isLoading}/>
            </Dialog>
        </PageFramework>
    )
}

export default ExportDialog