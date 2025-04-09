import React from "react";
import {Box} from "@mui/material";
import {ImpactTemplatesViewProps, MemorizedImpactTemplatesView} from "@/app/template/pageComponent/ImpactTemplatesView";
import Dialog from "@mui/material/Dialog";

interface ImpactTemplateDialogProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    data: ImpactTemplatesViewProps
}

const ImpactTemplateDialog = (props: Readonly<ImpactTemplateDialogProps>) => {
    const {open, setOpen, data} = props

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth={false}
            maxWidth={false}
            sx={{
                '& .MuiDialog-paper': {
                    width: '80%',
                    height: '80%',
                    maxWidth: 'none'
                }
            }}
        >
            <Box p={2}>
                <MemorizedImpactTemplatesView
                    newTemplates={data.newTemplates}
                    oldTemplates={data.oldTemplates}
                    onFinished={data.onFinished}
                />
            </Box>
        </Dialog>    )
}

const MemoizedImpactTemplateDialog = React.memo(ImpactTemplateDialog)
MemoizedImpactTemplateDialog.displayName = 'ImpactTemplateDialog'

export default MemoizedImpactTemplateDialog