import React from 'react';
import {Box, Stack, Typography} from '@mui/material';
import {MemoizedStatusButtonGroup} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup";
import {MultiMenuTextFieldType} from "@/modules/components/TextField";
import {
    Action,
    MarketsComponentViewModelProps,
    useMarketsComponentViewModel
} from "@/app/eventDetail/domain/useMarketsComponentViewModel";
import Tabs from "@/modules/components/tabs/Tabs";
import {MemoizedAutoMultiMenuTextField} from "@/modules/components/TextField/MultiSelectTextField";

const MarketsComponent = (props: MarketsComponentViewModelProps) => {
    const
        {
            statusButtonSelectedIndex,
            selected,
            handleFilterChange,
            allMarketGroups,
            handleTabChange,
            marketPropsState,
            statusButtonGroupState
        } = useMarketsComponentViewModel(props);

    return (
        <Box>
            <Stack direction={"column"} spacing={2}>
                <Stack direction={"column"} spacing={0.5}>
                    <Typography variant={'h4'} sx={{
                        color: '#171A1C',
                        '[data-mui-color-scheme="dark"] &': {
                            color: '#9FA6AD'
                        },
                        fontSize: 20,
                        fontFamily: 'Inter',
                        fontWeight: '600',
                    }}>
                        {props.title}
                    </Typography>
                    <Typography sx={{
                        color: '#32383E',
                        '[data-mui-color-scheme="dark"] &': {
                            color: '#9FA6AD'
                        },
                        fontSize: 16,
                        fontFamily: 'Roboto',
                        fontWeight: '400',
                    }}>
                        {props.subTitle}
                    </Typography>
                </Stack>
                <Box sx={{width: '100%'}}>
                    <Tabs
                        labels={
                            allMarketGroups.map(label => ({
                                label: label.groupName
                            }))
                        }
                        labelsOnly={true}
                        defaultSelected={0}
                        selected={selected}
                        onTabChange={handleTabChange}
                    >
                        {null}
                    </Tabs>
                </Box>
                <Stack direction={"row"} justifyContent={"space-between"} spacing={2}>
                    <MemoizedAutoMultiMenuTextField
                        options={marketPropsState.options}
                        placeholder={marketPropsState.placeholder}
                        isEmptyEqualSelectAll={marketPropsState.isEmptyEqualSelectAll}
                        initialSelectedOptions={marketPropsState.initialSelectedOptions}
                        fixedSelectedOptions={marketPropsState.fixedSelectedOptions}
                        displayType={MultiMenuTextFieldType.selectedCount}
                        onChange={(value: string[]) => handleFilterChange(Action.MARKETS, value)}
                    />
                    {
                        !props.isBets && <MemoizedAutoMultiMenuTextField
                            options={props.providerProps.options}
                            placeholder={props.providerProps.placeholder}
                            isEmptyEqualSelectAll={props.providerProps.isEmptyEqualSelectAll}
                            initialSelectedOptions={props.providerProps.initialSelectedOptions}
                            fixedSelectedOptions={props.providerProps.fixedSelectedOptions}
                            displayType={MultiMenuTextFieldType.selectedCount}
                            onChange={(value: string[]) => handleFilterChange(Action.PROVIDERS, value)}
                        />
                    }
                </Stack>
                {statusButtonGroupState.length > 0 &&
                    <MemoizedStatusButtonGroup
                        isCollapsedStyle={true}
                        items={statusButtonGroupState}
                        selectedIndex={statusButtonSelectedIndex}
                        ableToDeselect={false}
                        onClick={(index: number, key: string, deselected: boolean) => {
                            if (deselected) {
                                handleFilterChange(Action.STATUS_ITEM, {key: '', text: '', type: ''});
                            } else {
                                const value = statusButtonGroupState[index];
                                handleFilterChange(Action.STATUS_ITEM, value);
                            }
                        }}
                    />
                }
            </Stack>
        </Box>
    );
};

export default MarketsComponent;
