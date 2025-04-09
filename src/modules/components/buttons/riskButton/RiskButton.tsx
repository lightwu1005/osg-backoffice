import {Box, Menu, MenuItem, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {LocalOfferRounded} from "@mui/icons-material";
import React, { useState } from "react";

export interface RiskButtonProps {
    index?: string;
    riskColor: string;
    hover: string;
    onClick?: (index?: string) => void;
    menuItems?: RiskLevel[];
    onMenuClick?: (option: RiskLevel) => void;
}

export interface RiskLevel {
    key: string;
    text: string;
}

const RiskButton = (props: RiskButtonProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        if (props.onClick) {
            props.onClick(props.index)
        }
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleMenuClick = (option: RiskLevel) => {
        if (props.onMenuClick) {
            props.onMenuClick(option)
        }
    }

    return (
        <Box key={props.index}>
            <Tooltip title={props.hover} arrow placement="top-start">
                <IconButton
                    sx={{
                        color: props.riskColor
                    }}
                    onClick={handleClick}
                >
                    <LocalOfferRounded fontSize={'small'}/>
                </IconButton>
            </Tooltip>
            {
                props.menuItems &&
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    slotProps={{
                        paper: {
                            style: {
                                minWidth: '20ch',
                            },
                        },
                    }}
                >
                    {props.menuItems.map((option, index) => (
                        <MenuItem key={`${index}-${option.key}`} onClick={()=> handleMenuClick(option)}>
                            {option.text}
                        </MenuItem>
                    ))}
                </Menu>}
        </Box>
    )
}

export default RiskButton