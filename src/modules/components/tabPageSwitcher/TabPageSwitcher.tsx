import {StatusButtonGroup, StatusButtonGroupProps} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup"
import {Box} from "@mui/material"
import React, {useState} from "react"

export interface TabPageSwitcherProps {
    tabs: StatusButtonGroupProps['items']
    contents: ChildrenWithKey[]
}

export interface ChildrenWithKey {
    key: string
    item: React.ReactNode
}

export const TabPageSwitcher = ({tabs, contents}: TabPageSwitcherProps) => {
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0)

    const handleTabClick = (index: number, key: string) => {
        setSelectedTabIndex(index)
    }

    return (
        <>
            <StatusButtonGroup items={tabs} selectedIndex={selectedTabIndex} onClick={handleTabClick}/>
            <Box sx={{
                marginTop: '24px',
                marginBottom: '24px',
                padding: '0 10px',
            }}>
                {contents[selectedTabIndex].item}
            </Box>
        </>
    )
}