import type {Meta, StoryObj} from "@storybook/react";
import {expect, within} from "@storybook/test";
import PerformanceDateSelection from "@/app/dashboard/components/PerformanceDateSelection";
import React from "react";
import {Providers} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const meta = {
    component: PerformanceDateSelection,
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
} satisfies Meta<typeof PerformanceDateSelection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const canvas = within(canvasElement);

        const todayButton = canvas.getByText('Today');
        await expect(todayButton).toBeInTheDocument();
        const yesterdayButton = canvas.getByText('Yesterday');
        await expect(yesterdayButton).toBeInTheDocument();
        const thisMonthButton = canvas.getByText('This Month');
        await expect(thisMonthButton).toBeInTheDocument();
    })
}
