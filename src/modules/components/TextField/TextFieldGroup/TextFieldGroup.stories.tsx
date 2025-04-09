import React from 'react';
import {Meta, StoryObj} from '@storybook/react';
import {
    AutoMenuTextField,
    AutoMultiMenuTextField,
    MenuTextField,
    MultiMenuTextFieldType,
    SearchTextField,
    SingleDateTimePicker,
    SingleInputDateRangePicker,
    TextFieldsContainer,
    TextFieldsContainerProps
} from "@/modules/components/TextField";
import {daysShortType} from "@/modules/components/TextField/ShortcutsItems";
import {Stack} from "@mui/material";
import dayjs from "dayjs";
import {ProvidersWithoutNavigation} from "@/utils/Providers";

const meta: Meta<typeof TextFieldsContainer> = {
    component: TextFieldsContainer,
    decorators: [
        (Story) => {
            return (
                <ProvidersWithoutNavigation>
                    <Story />
                </ProvidersWithoutNavigation>
            )
        },
    ]
} as Meta<typeof TextFieldsContainer>;

export default meta;

type Story = StoryObj<TextFieldsContainerProps>;

export const TextFieldsContainerDemo: Story = {

    render: (args) => (
        <Stack direction={"column"} spacing={2}> &apos;Normal&apos;
            <TextFieldsContainer {...args}>
                <SearchTextField
                    label='event name or team'
                    placeholder={"Enter the event name or team"}
                    regex={/^[A-Za-z0-9]+$/}
                    helperText={'輸入錯誤囉'}
                />
                <SingleInputDateRangePicker
                    daysType={
                        [
                            daysShortType.today,
                            daysShortType.tomorrow,
                            daysShortType.thisWeek
                        ]}
                    label={"Date"}
                    minTimestamp={dayjs().add(-2, 'day').unix()}
                    maxTimestamp={dayjs().add(2, 'day').unix()}
                    onChange={(_) => {}}
                />
                <SingleDateTimePicker
                    label={"Date"}
                    onChange={(_) => {}}
                />
                <MenuTextField
                    label='All Location'
                    options={['Location 1', 'Location 2', 'Location 3']}
                />
            </TextFieldsContainer>
            <TextFieldsContainer {...args}>
                <AutoMenuTextField
                    label='All Location'
                    placeholder='All Location'
                    options={["usa", "asia", 'tokyo', 'hot']}
                />
                <AutoMultiMenuTextField
                    label='All Location'
                    placeholder='All Location with count'
                    displayType={MultiMenuTextFieldType.selectedCount}
                    options={["usa", "asia", 'tokyo', 'hot']}
                />
                <AutoMultiMenuTextField
                    label='All Location'
                    placeholder='All Location without count'
                    displayType={MultiMenuTextFieldType.normal}
                    options={["usa", "asia", 'tokyo', 'hot']}
                />
                <AutoMultiMenuTextField
                    label='All Location'
                    placeholder='All Location with tag'
                    displayType={MultiMenuTextFieldType.renderTag}
                    limitTags={3}
                    options={["usa", "asia", 'tokyo', 'hot', 'asdafsf', 'ewrwtwt', 'efw341', '134dsfdfsga', '23fdsgh54', 'dfgbdvdo']}
                />
            </TextFieldsContainer>
        </Stack>
    ),
};
