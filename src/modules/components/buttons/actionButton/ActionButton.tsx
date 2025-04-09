import React from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {Stack, Tooltip} from "@mui/material";
import {InfoOutlined} from '@mui/icons-material';

export interface ActionButtonProps {
    label: string | React.ReactNode
    list: ActionItem[]
    onItemClick: (item: ActionItem, index: number) => void,
    sx?: SxProps<Theme>;
}

/**
 * @param disabled: disable the item
 * @param tips: show the tips when hover the item
 * */
export interface ActionItem {
    key: any,
    value: string | React.ReactNode
    disabled?: boolean
    tips?: string
}
function ActionButton({label, list, onItemClick, sx}: ActionButtonProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Button
                data-testid={'actions'}
                sx={sx}
                variant={typeof label === 'string' ? 'contained' : 'text'}
                disableElevation
                disabled={list.length === 0}
                onClick={handleClick}
            >
                {label}
            </Button>
            <Menu
                sx={{marginTop: 1}}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {
                    list.map((item, index) => (
                        <Tooltip key={item.key} arrow placement="left" title={item.tips}>
                            <Stack direction={'row'} width={'100%'}>
                                <MenuItem
                                    key={item.key}
                                    sx={{width: '100%'}}
                                    disabled={item.disabled}
                                    onClick={() => {
                                        handleClose()
                                        onItemClick(item, index)
                                    }}
                                >
                                    {item.value}
                                    {item.tips && <InfoOutlined sx={{marginLeft: 1, fontSize: 20}}/>}
                                </MenuItem>
                            </Stack>
                        </Tooltip>
                    ))
                }
            </Menu>
        </Box>
    );
}

export default ActionButton