import type {Meta, StoryObj} from '@storybook/react';
import {expect, userEvent, within} from "@storybook/test";
import Page from "./page"
import {StepFunction} from "@storybook/types";
import React from "react";
import {Providers} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    component: Page,
    decorators: [(Story) => (
        <Providers>
            <Story/>
        </Providers>
    )],
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
        nextjs: {
            appDirectory: true,
        },
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: [],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {},
    excludeStories: /.*Component$/,
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultForm: Story = {
    // Should render the login form
    play: wrapWithLoadingCheck(async ({canvasElement}: { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);
        const emailInput = canvas.getByLabelText('Email Address');
        const passwordInput = canvas.getByLabelText('Password');
        const signInButton = canvas.getByText('SIGN IN'); // or canvas.getByRole('button', { name: /Sign in/i });
        const forgetPasswordButton = canvas.getByText('Forget Password');

        await expect(emailInput).toBeInTheDocument();
        await expect(passwordInput).toBeInTheDocument();
        await expect(signInButton).toBeInTheDocument();
        await expect(forgetPasswordButton).toBeInTheDocument();
    })
};

export const ValidFilledForm: Story = {
    // Should enable the sign-in button when valid email and password are entered
    play: wrapWithLoadingCheck(async ({canvasElement}: { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);
        const emailInput = canvas.getByLabelText('Email Address');
        const passwordInput = canvas.getByLabelText('Password');
        const signInButton = canvas.getByText('SIGN IN');

        await userEvent.type(emailInput, 'example@email.com');
        await userEvent.type(passwordInput, 'Asdf!234');

        await expect(signInButton).toBeEnabled();
    })
};

export const InvalidFilledEmailForm: Story = {
    // Should disable the sign-in button when invalid email is entered
    play: wrapWithLoadingCheck(async ({canvasElement}: { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);
        const emailInput = canvas.getByLabelText('Email Address');
        const passwordInput = canvas.getByLabelText('Password');
        const signInButton = canvas.getByText('SIGN IN');

        await userEvent.type(emailInput, 'invalid-email');
        await userEvent.type(passwordInput, 'Asdf!234');

        await expect(signInButton).toBeDisabled();
    })
};

export const InvalidFilledPasswordForm: Story = {
    // Should disable the sign-in button when invalid email is entered
    play: wrapWithLoadingCheck(async ({canvasElement}: { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);
        const emailInput = canvas.getByLabelText('Email Address');
        const passwordInput = canvas.getByLabelText('Password');
        const signInButton = canvas.getByText('SIGN IN');

        await userEvent.type(emailInput, 'example@email.com');
        await userEvent.type(passwordInput, 'short');
        await userEvent.unhover(passwordInput);

        await expect(signInButton).toBeDisabled();
    })
};

export const Submitted: Story = {
    // Should call normalLogin when valid credentials are submitted
    play: wrapWithLoadingCheck(async ({canvasElement, step} : { canvasElement: HTMLElement, step: StepFunction }) => {
        await SumbittedComponent(canvasElement, step)
    })
};

async function SumbittedComponent(canvasElement: HTMLElement, step: StepFunction) {
    const canvas = within(canvasElement);
    const emailInput = canvas.getByLabelText('Email Address');
    const passwordInput = canvas.getByLabelText('Password');
    const signInButton = canvas.getByText('SIGN IN');

    await step('Enter email and password', async () => {
        await userEvent.type(emailInput, 'example@email.com');
        await userEvent.type(passwordInput, 'Asdf!234');
        await expect(signInButton).toBeEnabled();
    });

    await step('Submit', async () => {
        await userEvent.click(signInButton);
    });
}

export {SumbittedComponent}