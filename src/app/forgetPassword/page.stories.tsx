import type {Meta, StoryObj} from "@storybook/react";
import {expect, userEvent, within} from "@storybook/test";
import Page from "./page";
import MockApi from "@/data/mockData/MockApi";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const {
    generateTokenViaEmail
} = MockApi()

const meta = {
    component: Page,
    parameters: {
        layout: 'centered',
        mockData: [
            generateTokenViaEmail
        ],
    },
    tags: [],
    argTypes: {},
    decorators: [
        (Story) => {
            return (
                <ProvidersWithoutNavigation>
                    <Story/>
                </ProvidersWithoutNavigation>
            )
        },
    ]
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const canvas = within(canvasElement);
        const emailInput = canvas.getByLabelText('Email Address');
        await expect(emailInput).toBeInTheDocument();

        const sendEmailButton = canvas.getByText('Send Email'); // or canvas.getByRole('button', { name: /Sign in/i });
        await expect(sendEmailButton).toBeInTheDocument();
    })
}

export const InvalidFilledEmailForm: Story = {
    // Should disable the sign-in button when invalid email is entered
    play: wrapWithLoadingCheck(async ({canvasElement}: { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);
        const emailInput = canvas.getByLabelText('Email Address');
        const sendEmailButton = canvas.getByText('Send Email');

        await userEvent.type(emailInput, 'invalid-email');

        await expect(sendEmailButton).toBeDisabled();
    })
};

export const ValidFilledForm: Story = {
    play: wrapWithLoadingCheck(async ({canvasElement}: { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);
        const emailInput = canvas.getByLabelText('Email Address');
        const sendEmailButton = canvas.getByText('Send Email');

        await userEvent.type(emailInput, 'example@email.com');

        await expect(sendEmailButton).toBeEnabled();
    })
};

export const Sumbitted: Story = {
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const canvas = within(canvasElement);
        const emailInput = canvas.getByLabelText('Email Address');
        const sendEmailButton = canvas.getByText('Send Email');

        await step('Enter email', async () => {
            await userEvent.type(emailInput, 'example@email.com');
            await expect(sendEmailButton).toBeEnabled();
        });

        await step('Submit', async () => {
            await userEvent.click(sendEmailButton);
        });
    })
};