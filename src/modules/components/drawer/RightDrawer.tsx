import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from "@mui/material/IconButton";
import {Close} from "@mui/icons-material";
import { Typography } from '@mui/material';
import ToggleProps from "@/modules/interface/ToggleProps";

export interface RightDrawerProps extends ToggleProps {
    title?: string;
    subTitle?: string;
    children: React.ReactNode;
}

const RightDrawer = ({open, setOpen, title, subTitle, children}: RightDrawerProps) => {
    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setOpen(open)
    };

    return (
        <Drawer
            PaperProps={{
                sx: { width: {xs: '100%', md: '50rem'}}
            }}
            anchor={'right'}
            open={open}
            onClose={toggleDrawer( false)}
        >
            <Box sx={{ display: 'flex', p: '1rem', justifyContent: 'space-between', alignItems: 'start' }}>
                <Box>
                    {title && (
                        <Typography variant="h6" sx={{ flex: 1 }}>
                            {title}
                        </Typography>
                    )}
                    {subTitle && (
                        <Typography variant="body2" sx={{ flex: 1 }}>
                            {subTitle}
                        </Typography>
                    )}
                </Box>
                <IconButton onClick={toggleDrawer( false)}>
                    <Close />
                </IconButton>
            </Box>
            {children}
        </Drawer>
    )
}

RightDrawer.displayName = "RightDrawer";
export default RightDrawer;