import type {Meta, StoryObj} from "@storybook/react";
import {DangerBall, DangerBallType} from "@/modules/components/IconBall/DangerBall";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";

const meta = {
    component: DangerBall,
    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'centered',
    },
    decorators: [
        (Story) => {
            return (
                <ProvidersWithoutNavigation>
                    <Story />
                </ProvidersWithoutNavigation>
            )
        },
    ]
} satisfies Meta<typeof DangerBall>;


export default meta;
type Story = StoryObj<typeof meta>;

export const GOAL: Story = {
    args: {
        dangerType: DangerBallType.GOAL
    }
}

export const CORNER_DANGER: Story = {
    args: {
        dangerType: DangerBallType.CORNER_DANGER
    }
}