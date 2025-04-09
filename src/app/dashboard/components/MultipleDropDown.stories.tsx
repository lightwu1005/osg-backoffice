import type {Meta, StoryObj} from "@storybook/react";
import MultipleDropDown from "@/app/dashboard/components/MultipleDropDown";
import {mockSportCategories} from "@/data/mockData/common/MockRowData";
import React from "react";
import {Providers} from "@/utils/Providers";

const meta = {
    component: MultipleDropDown,
    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'centered',
    },
    decorators: [
        (Story) => {
            return (
                <Providers>
                    <Story/>
                </Providers>
            )
        },
    ]
} satisfies Meta<typeof MultipleDropDown>;


export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        list: mockSportCategories.map(item => item.sportName)
    }
}