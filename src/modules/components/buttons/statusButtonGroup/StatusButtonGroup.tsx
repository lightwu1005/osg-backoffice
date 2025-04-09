import React, {useEffect, useState} from "react";
import {Box, Button, IconButton} from "@mui/material";
import isEqual from "lodash/isEqual";
import {KeyboardDoubleArrowDown, KeyboardDoubleArrowUp} from "@mui/icons-material";
import ButtonGroup from "@mui/material/ButtonGroup";

export interface StatusButtonGroupProps {
    items: StatusItem[];
    selectedIndex?: number;
    ableToDeselect?: boolean;
    onClick?: (index: number, key: string, deselected: boolean) => void;
    borderRadius?: "0.5rem" | "1rem";
    isShowGroupBackgroundColor?: boolean;
    isCollapsedStyle?: boolean;
}

export interface StatusItem {
    key: string;
    text: string;
    type: string;
}

const StatusButtonDeselectedIndex = -1;

export const StatusButtonGroup: React.FC<StatusButtonGroupProps> = ({
                                                                        items,
                                                                        selectedIndex = 0,
                                                                        ableToDeselect = false,
                                                                        onClick,
                                                                        borderRadius = "1rem",
                                                                        isShowGroupBackgroundColor = true,
                                                                        isCollapsedStyle = false,
                                                                    }) => {
    const [selectedButton, setSelectedButton] = useState<StatusItem | undefined>(items[selectedIndex]);
    const [isExpanded, setIsExpanded] = useState(false);
    const rowHeight = 40;

    useEffect(() => {
        if (items.length > 0 && selectedIndex >= 0 && selectedIndex < items.length) {
            setSelectedButton(items[selectedIndex]);
        } else {
            setSelectedButton(undefined);
        }
    }, [selectedIndex, items]);

    const handleClick = (index: number, key: string) => {
        const selectedIndex = items.findIndex((item) => isEqual(item, selectedButton));
        const deselected = ableToDeselect && index === selectedIndex;
        const actualIndex = deselected ? StatusButtonDeselectedIndex : index;
        if (actualIndex === selectedIndex) return;
        setSelectedButton(items[actualIndex]);
        if (onClick) {
            onClick(actualIndex, key, deselected);
        }
    };

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const CollapseView = () => (
        <Box
            sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.5rem",
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexWrap: "wrap",
                    overflow: "hidden",
                    maxHeight: isExpanded ? "none" : `${rowHeight}px`,
                    transition: "max-height 0.3s ease",
                    gap: "0.5rem",
                }}
            >
                {items.map((item, index) => {
                    const itemIsSelected = isEqual(selectedButton?.key, item.key);
                    const groupBackgroundColor = isShowGroupBackgroundColor ? "#F0F4F8" : "transparent";
                    const lightModeBackgroundColor = itemIsSelected ? "#E3EFFB" : groupBackgroundColor;

                    const darkGroupBackgroundColor = isShowGroupBackgroundColor ? "#171A1C" : "transparent";
                    const darkModeBackgroundColor = itemIsSelected ? "#0A2744" : darkGroupBackgroundColor;

                    return (
                        <Button
                            key={item.key}
                            sx={{
                                fontSize: 14,
                                fontFamily: "Inter",
                                fontWeight: 600,
                                textTransform: "none",
                                backgroundColor: lightModeBackgroundColor,
                                color: itemIsSelected ? "#12467B" : "#9FA6AD",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "100%",
                                "[data-mui-color-scheme='dark'] &": {
                                    backgroundColor: darkModeBackgroundColor,
                                    color: itemIsSelected ? "#C7DFF7" : "#636B74",
                                },
                            }}
                            onClick={() => handleClick(index, item.key)}
                        >
                            {item.text}
                        </Button>
                    );
                })}
            </Box>
            {isCollapsedStyle && (
                <IconButton
                    onClick={handleToggleExpand}
                    sx={{
                        flexShrink: 0,
                        alignSelf: "flex-start",
                        color: "#636B74",
                        "[data-mui-color-scheme='dark'] &": {
                            color: "#C7DFF7",
                        },
                    }}
                >
                    {isExpanded ? <KeyboardDoubleArrowUp/> : <KeyboardDoubleArrowDown/>}
                </IconButton>
            )}
        </Box>
    );

    const ScrollableStatusButtonView = () => (
        <Box sx={{
            display: 'inline-flex',
            overflowX: 'auto',
            '& > *': {
                m: 1,
            },
        }}>
            <ButtonGroup
                data-testid={'status-button-group'}
                aria-label='status button group'
                size='medium'
                sx={{
                    display: 'flex',
                    borderRadius: borderRadius,
                    border: 0,
                    gap: 1,
                    whiteSpace: 'nowrap',
                    '& .MuiButtonGroup-grouped': {
                        borderRadius: borderRadius,
                        border: 0,
                    },
                    '& .MuiButtonGroup-grouped: hover': {
                        borderRadius: borderRadius,
                        border: 0,
                    },
                    background: isShowGroupBackgroundColor ? '#FBFCFE' : 'transparent',
                    '[data-mui-color-scheme="dark"] &': {
                        background: isShowGroupBackgroundColor ? '#0B121F' : 'transparent'
                    },
                }}
            >
                {items.map((item, index) => {
                    const itemIsSelected = isEqual(selectedButton?.key, item.key);
                    const groupBackgroundColor = isShowGroupBackgroundColor ? '#F0F4F8' : 'transparent';
                    const lightModeBackgroundColor = itemIsSelected
                        ? '#E3EFFB'
                        : groupBackgroundColor;

                    const darkGroupBackgroundColor = isShowGroupBackgroundColor ? '#171A1C' : 'transparent';
                    const darkModeBackgroundColor = itemIsSelected
                        ? '#0A2744'
                        : darkGroupBackgroundColor;

                    return (
                        <Button
                            key={item.key}
                            sx={{
                                fontSize: 14,
                                fontFamily: 'Inter',
                                fontWeight: 600,
                                wordWrap: 'break-word',
                                textTransform: 'none',
                                backgroundColor: lightModeBackgroundColor,
                                color: itemIsSelected ? '#12467B' : '#9FA6AD',
                                '[data-mui-color-scheme="dark"] &': {
                                    backgroundColor: darkModeBackgroundColor,
                                    color: itemIsSelected ? '#C7DFF7' : '#636B74',
                                },
                            }}
                            onClick={() => handleClick(index, item.key)}
                        >
                            {item.text}
                        </Button>
                    )
                })}
            </ButtonGroup>
        </Box>
    );

    return isCollapsedStyle ? <CollapseView/> : <ScrollableStatusButtonView/>;
};

export const MemoizedStatusButtonGroup = React.memo(StatusButtonGroup, (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
})
MemoizedStatusButtonGroup.displayName = 'StatusButtonGroup'