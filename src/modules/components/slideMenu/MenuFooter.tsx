import {Box} from "@mui/material";
import React, {JSX} from "react";
import {MenuToggleProp} from "./MenuToggleProp";
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from "@mui/material/ListItemButton";
import List from '@mui/material/List';
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

const MenuFooter: React.FC<MenuToggleProp> = ({open, setOpen}): JSX.Element => {
    const toggle = () => {
        setOpen(!open)
    }
    const intl = useIntl();
    const funType = LocalizationFunctionType.SliderMenu;

    return (
        <List sx={{
                padding: `8px ${open ? '1rem' : '0px'}`,
                flexDirection: 'column',
                width: '100%'
        }}>
            <ListItem disablePadding>
                <ListItemButton
                    sx={{
                        width: 'auto',
                        padding: `8px 16px`,
                    }}
                    onClick={toggle}
                >
                    <Box display={"flex"} alignItems={"center"}
                         sx={{
                             width: '100%',
                             gap: '1.25rem',
                         }}
                    >
                        <ListItemIcon sx={{minWidth: '1.5rem', justifyContent: 'flex-start', color: "#9FA6AD"}}>
                            <MenuIcon/>
                        </ListItemIcon>
                        <ListItemText sx={{opacity: open ? 1 : 0, color: "#ffffff"}}>
                            {
                                intl.formatMessage({id: `${funType}.collapse`, defaultMessage: 'Collapse'})
                            }
                        </ListItemText>
                    </Box>
                </ListItemButton>
            </ListItem>
        </List>
    )
}

export default MenuFooter