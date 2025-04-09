import React from "react";
import {TransitionProps} from "@mui/material/transitions";
import {Box, Slide} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {styled} from "@mui/material/styles";
import ToggleProps from "@/modules/interface/ToggleProps";

interface FullScreenDialogProps extends ToggleProps{
    content: React.ReactNode;
    onClose?: () => void;
}

const CloseButton = styled(IconButton)({
    position: 'absolute',
    right: '1.25rem',
    top: '1.25rem',
    zIndex: 1,
});

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function FullScreenDialog({open, setOpen, content, onClose}: FullScreenDialogProps) {
    const handleClose = () => {
        setOpen(false);
        if (onClose) onClose()
    };

    return (
        <Dialog fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                sx={{marginTop: 4}}
                PaperProps={{
                    style: {
                        borderTopLeftRadius: 32,
                        borderTopRightRadius: 32
                    },
                }}
        >
            <Box padding={4} sx={{height: '100%'}}>
                <CloseButton onClick={handleClose}>
                    <CloseIcon/>
                </CloseButton>
                {content}
            </Box>
        </Dialog>
    )
}