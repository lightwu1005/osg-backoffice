import type {Meta, StoryObj} from "@storybook/react";
import {expect, within} from "@storybook/test";
import Page from "./page";
import React from "react";
import {Providers} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const meta = {
    component: Page,
    parameters: {
        layout: 'centered',
        nextjs: {
            appDirectory: true,
        },
    },
    decorators: [
        (Story) => {
            return (
                <Providers>
                    <Story />
                </Providers>
            )
        },
    ]
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const canvas = within(canvasElement);
        const setPasswordButton = canvas.getByText('Set Your Password');
        await expect(setPasswordButton).toBeInTheDocument();
    })
}