import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { Button } from "@mui/material";
import ToggleProps from "@/modules/interface/ToggleProps";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

interface SimpleContentDialogProps extends ToggleProps {
    title?: string
    content: string
}

const SimpleContentDialog = ({title, content, open, setOpen}: SimpleContentDialogProps) => {
    const intl = useIntl()
    const funType = LocalizationFunctionType.Common

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth={'sm'}
            open={open}
            onClose={handleClose}
        >
            <DialogTitle sx={{ fontSize: 20, fontWeight: 500 }}>
                {title}
            </DialogTitle>
            <DialogContent sx={{ fontSize: 16, fontWeight: 400, wordWrap: 'break-word' }}>
                <DialogContentText>
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ paddingX: 3, paddingY: 2 }}>
                <Button variant={'contained'} onClick={handleClose}>
                    {
                        intl.formatMessage({id: `${funType}.close`, defaultMessage: 'Close'})
                    }
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SimpleContentDialog