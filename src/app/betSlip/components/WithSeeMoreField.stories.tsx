import {Meta, StoryObj} from "@storybook/react";
import WithSeeMoreField from "@/app/betSlip/components/WithSeeMoreField";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";

const meta = {
    component: WithSeeMoreField,
    parameters: {},
    tags: ["autodocs"],
    argTypes: {},
    decorators: [
        (Story) => {
            return (
                <ProvidersWithoutNavigation>
                    <Story />
                </ProvidersWithoutNavigation>
            )
        },
    ]
} satisfies Meta<typeof WithSeeMoreField>;

export default meta;
type Story = StoryObj<typeof meta>;

const handleClick = () => {
    console.log('click on see more button');
}

export const League: Story = {
    args: {
        data: ['Premiership Development League', 'League2', 'League3', 'League4', 'League5'],
        limitItem: 2,
        displayType: 'plus-number',
        computedWidth: 200,
        onClick: handleClick
    }
}

export const Leg: Story = {
    args: {
        data: ['Newcastle Jets FC', 'Newcastle Jets FC2', 'Newcastle Jets FC3', 'Newcastle Jets FC4', 'Newcastle Jets FC5'],
        limitItem: 1,
        displayType: 'leg',
        computedWidth: 200,
        onClick: handleClick
    }
}

export const OnlyNumber: Story = {
    args: {
        data: ['Newcastle Jets FC', 'Newcastle Jets FC2', 'Newcastle Jets FC3', 'Newcastle Jets FC4', 'Newcastle Jets FC5'],
        limitItem: 1,
        displayType: 'number',
        computedWidth: 200,
        onClick: handleClick
    }
}
