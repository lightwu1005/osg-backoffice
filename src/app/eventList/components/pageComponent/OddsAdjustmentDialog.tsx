import {Box} from "@mui/material";
import OddsAdjustmentTable from "@/app/eventList/components/pageComponent/OddsAdjustmentTable"
import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import {ConfigurationModel, OddModel} from "@/services/@core/module/ResponseDataModels";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {useIntl} from "react-intl";

interface OddsBetData {
    title: string
    market: string
    odds: OddModel[]
}

interface OddsAdjustmentDialogProps {
    open: boolean
    setShowOddsBet: React.Dispatch<React.SetStateAction<boolean>>
    data: OddsBetData | undefined
    configuration?: ConfigurationModel
    handlePriceChanged: (betId: string, price: number, originalPrice: number) => void
    viewOnly?: boolean
}

const OddsAdjustmentDialog = (props: OddsAdjustmentDialogProps) => {
    const {open, setShowOddsBet, data, configuration, handlePriceChanged} = props
    const intl = useIntl()
    const funType = LocalizationFunctionType.Common

    return (
        <>
            <Dialog
                open={open}
                onClose={() => setShowOddsBet(false)}
                fullWidth={false}
                maxWidth={'lg'}
            >
                <Box p={2}>
                    <DialogTitle textAlign={'center'}>{data?.title}</DialogTitle>
                    {data ? <OddsAdjustmentTable marketName={data.market} odds={data.odds} configuration={configuration}
                                                 handlePriceChanged={handlePriceChanged} viewOnly={props.viewOnly}/> : <></>}
                    <DialogActions>
                        <Button variant={'contained'} onClick={() => setShowOddsBet(false)}>
                            {
                                intl.formatMessage({id: `${funType}.close`, defaultMessage: 'Close'})
                            }
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}

export default OddsAdjustmentDialog