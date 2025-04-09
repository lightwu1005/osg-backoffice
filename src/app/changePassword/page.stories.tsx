import type {Meta, StoryObj} from "@storybook/react";
import {expect, userEvent, waitFor, within} from "@storybook/test";
import MockApi from "@/data/mockData/MockApi";
import Page from "./page";
import React from "react";
import {Providers} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const {
    resetPassword
} = MockApi()

const meta = {
    component: Page,
    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'centered',
        mockData: [
            resetPassword
        ]
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
} satisfies Meta<typeof Page>;


export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        params: {
            isResetPassword: false
        },
    },
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const canvas = within(canvasElement);
        const passwordInput = canvas.getByLabelText('Your Password');
        await expect(passwordInput).toBeInTheDocument();
        const confirmPasswordsInput = canvas.getByLabelText('Confirm Password');
        await expect(confirmPasswordsInput).toBeInTheDocument();

        const sendButton = canvas.getByText('Set Password');
        await expect(sendButton).toBeInTheDocument();
    })
}

export const InvalidFilledForm: Story = {
    args: {
        params: {isResetPassword: false},
    },
    play: wrapWithLoadingCheck(async ({canvasElement}: { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);

        const passwordInput = canvas.getByLabelText('Your Password');
        const confirmPasswordsInput = canvas.getByLabelText('Confirm Password');
        const sendButton = canvas.getByText('Set Password');


        await userEvent.type(passwordInput, 'abc');
        await userEvent.type(confirmPasswordsInput, 'abc');

        await expect(sendButton).toBeDisabled();
    })
};

export const ValidFilledForm: Story = {
    args: {
        params: {isResetPassword: false},
    },
    play: wrapWithLoadingCheck(async ({canvasElement}: { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);
        const passwordInput = canvas.getByLabelText('Your Password');
        const confirmPasswordsInput = canvas.getByLabelText('Confirm Password');
        const sendButton = canvas.getByText('Set Password');


        await userEvent.type(passwordInput, 'abcdefgH');
        await userEvent.type(confirmPasswordsInput, 'abcdefgH');

        await waitFor(() => {
            expect(sendButton).toBeDisabled();
        }, {timeout: 1000});
    })
};

export const Sumbitted: Story = {
    args: {
        params: {isResetPassword: false},
    },
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const canvas = within(canvasElement);
        const passwordInput = canvas.getByLabelText('Your Password');
        const confirmPasswordsInput = canvas.getByLabelText('Confirm Password');
        const sendButton = canvas.getByText('Set Password');

        await step('Enter email', async () => {
            await userEvent.type(passwordInput, 'Asdf!234');
            await userEvent.type(confirmPasswordsInput, 'Asdf!234');
            await expect(sendButton).toBeEnabled();
        });

        await step('Submit', async () => {
            await userEvent.click(sendButton);
        });
    })
};