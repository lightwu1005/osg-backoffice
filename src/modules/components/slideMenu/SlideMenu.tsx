"use client";
import React, {JSX, useEffect, useState} from 'react';
import MuiDrawer from '@mui/material/Drawer';
import {CSSObject, styled, Theme} from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {MenuDataItem} from "./SlideMenuData";
import {Badge, Box, Collapse, Stack} from "@mui/material";
import MenuHeader from "./MenuHeader";
import MenuFooter from "./MenuFooter";
import {usePathname, useRouter} from "next/navigation";
import useSlideMenuViewModel from "@/modules/components/slideMenu/SlideMenuViewModel";
import {GlobalController, IEventHandler} from "@/modules/common/GlobalController";
import {useNavigationProvider} from "@/utils/NavigationProvider";
import {ArrowDropDown} from "@mui/icons-material";
import Cookies from "js-cookie";
import {Functionality} from "@/services/@core/module/Enum";
import {useStateContext} from "@/utils/StateContext";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

export const SLIDE_MENU_WIDTH = 270;

const openedMixin = (theme: Theme): CSSObject => ({
    width: SLIDE_MENU_WIDTH,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    background: "#051423"
});

const closedMixin = (theme: Theme): CSSObject => ({
    width: `calc(${theme.spacing(7)} + 1px)`,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(10)} + 1px)`,
    },
    padding: '0px 12px',
    background: "#051423"
});

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: SLIDE_MENU_WIDTH,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

interface MenuItemProp {
    item: MenuDataItem
    open: boolean,
    message?: string | number,
    parentPath?: string | null,
    layer?: number
    onClick?: (item: MenuDataItem) => void
}


const MenuItem: React.FC<MenuItemProp> = ({item, open, message, parentPath, layer = 0, onClick}): JSX.Element => {
    const intl = useIntl()
    const funType = LocalizationFunctionType.SliderMenu;
    const [show, setShow] = useState(false)
    const pathname = usePathname()
    const path = parentPath ? `${parentPath}/${item.path}` : item.path
    const children = item.children?.filter((item) => !item.hide)
    const hasChildren = children && children.length > 0
    const isSelected = `/${path}` == pathname
    const router = useRouter();
    const ChildrenList = (): JSX.Element[] => {
        return children!!.map((item) => (
            <MenuItem key={item.title} item={item} open={open} onClick={onClick} parentPath={path} layer={layer + 1}/>
        ))
    }

    const Item = (): JSX.Element => {
        return <ListItem key={item.title} disablePadding>
            <ListItemButton
                data-testid={'listItemButton'}
                selected={isSelected}
                sx={{
                    borderRadius: open ? 1 : 8,
                    width: 'auto',
                    padding: `0.5rem 1rem`,
                    marginY: '0.25rem',
                    ...(children && children?.map(item => item.path).includes(pathname.slice(1)) ? { backgroundColor: '#90CAF929' } : {}),
                    '&:hover': {
                        ...(children && children?.map(item => item.path).includes(pathname.slice(1)) ? { backgroundColor: '#90CAF929' } : {})
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'transparent',
                        ...( layer === 0 && !hasChildren ? { backgroundColor: '#90CAF929' } : {}),
                    },
                }}
                onClick={() => {
                    if (item.children) {
                        setShow(!show)
                    } else {
                        router.push(`/${path}`);
                    }

                    if (onClick) {
                        onClick(item)
                    }
                }}
            >
                <Stack spacing={2} direction={'row'} flex={1}>
                    <ListItemIcon sx={{
                        minWidth: '1.5rem',
                        color: isSelected || children?.map(item => item.path).includes(pathname.slice(1)) ? '#F0F4F8' : '#636B74',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',}}>
                        <Badge color="error" variant="dot" invisible={!(!open && message)}>
                            {item.icon}
                        </Badge>
                    </ListItemIcon>
                    {
                        open &&
                        <ListItemText
                            primary={intl.formatMessage({
                                id: `${funType}.${item.localizationKey}`,
                                defaultMessage: item.title}
                            )}
                            sx={{
                                color: isSelected ? '#F0F4F8' : '#FFFFFF99',
                                '& .MuiTypography-root': { fontSize: '1rem' },
                            }}
                        />
                    }
                    {message && open &&
                        <ListItemIcon>
                            <Box
                                component="span"
                                sx={{
                                    bgcolor: '#F44336',
                                    width: 20,
                                    height: 20,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#FFFFFF',
                                    fontSize: '0.75rem'
                                }}
                            >
                                {message}
                            </Box>
                        </ListItemIcon>}
                </Stack>
                {hasChildren && open &&
                    <ArrowDropDown sx={{
                        color: '#FFFFFF99',
                        transform: show ? 'rotate(-180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease-in-out',
                        textAlign: 'end'
                    }}/>
                }
            </ListItemButton>
        </ListItem>
    }

    return <>
        <Item/>
        {hasChildren &&
            <Collapse in={show} sx={{width: '100%'}}>
                <ChildrenList/>
            </Collapse>
        }
    </>
}

const SlideMenu: React.FC<{ open: boolean, setOpen: (open: boolean) => void }> = ({open, setOpen}): JSX.Element => {
    const viewModel = useSlideMenuViewModel()
    const globalController = GlobalController.getInstance()
    const {clear: clearPageState} = useStateContext()
    const {normalProvider} = useNavigationProvider()
    const loginQuery = Cookies.get('c') ?? undefined
    const useLoginQuery = loginQuery && loginQuery !== 'undefined' && process.env.FUNCTIONALITY !== Functionality.Admin

    const menuClickHandler = (_: MenuDataItem) => {
        clearPageState()
        viewModel.update(true)
    }

    useEffect(() => {
        if (!viewModel.userIsValid) {
            if (useLoginQuery) {
                normalProvider.normalNavigation('/login', {'c': loginQuery})
            } else {
                normalProvider.normalNavigation('/login')
            }
        }

        const unreadHandler:IEventHandler<string, void> = {
            key(): string {
                return GlobalController.KEY_UNREAD_MESSAGE;
            },
            receive(): void {
                viewModel.update(false)
            }
        }

        globalController.subscribe(unreadHandler)

        return () => {
            globalController.unsubscribe(unreadHandler)
        };

    }, [globalController, viewModel]);

    return (
        <Drawer variant="permanent" open={open}
                sx={{
                    zIndex: (theme) => theme.zIndex.appBar + 1,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}
        >
            <MenuHeader open={open}/>
            <List
                component="nav"
                sx={{
                    padding: `0.5rem ${open ? '1rem' : '0px'}`,
                    flexDirection: 'column',
                    position: 'relative',
                    overflowY: 'auto',
                    flex: 1
                }}>
                {viewModel.slideMenuItems.filter((item) => !item.hide).map((item) => (
                    <MenuItem
                        key={item.path}
                        item={item}
                        open={open}
                        onClick={menuClickHandler}
                        {...(item.path === 'notification' ? {message: viewModel.unreadNumber > 0 ? viewModel.unreadNumber : undefined} : undefined)}
                    />
                ))}
            </List>
            <MenuFooter open={open} setOpen={setOpen}/>
        </Drawer>
    )
}

export default SlideMenu