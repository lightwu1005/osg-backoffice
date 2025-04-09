import MockApi from "@/data/mockData/MockApi";
import type {Meta, StoryObj} from "@storybook/react";
import AccountSettingDialog from "@/app/accountSetting/components/pageConponent/AccountSetting";
import {expect, userEvent, waitFor, within} from "@storybook/test";
import {mockSingleMember} from "@/data/mockData/common/MockRowData";
import {MemoryRouter} from "react-router-dom";
import React from "react";
import {delay} from "@/utils/tools";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const {
    getSingleMemberInfoWithoutID,
    updateMemberInfo
} = MockApi()

const meta = {
    component: AccountSettingDialog,
    parameters: {
        mockData: [
            getSingleMemberInfoWithoutID,
            updateMemberInfo
        ]
    }, decorators: [
        (Story) => (
            <ProvidersWithoutNavigation>
                <MemoryRouter initialEntries={['/']}>
                    <Story/>
                </MemoryRouter>
            </ProvidersWithoutNavigation>
        ),
    ],
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof AccountSettingDialog>;

export default meta
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        open: true
    },
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        // const canvas = within(canvasElement);
        const canvas = within(document.body);
        const fakeData = mockSingleMember

        await waitFor(() => {
            const userNameField = canvas.getByDisplayValue(fakeData.userName!);
            expect(userNameField).toBeInTheDocument();

            const emailField = canvas.getByDisplayValue(fakeData.email!);
            expect(emailField).toBeInTheDocument();

            const jobTitleField = canvas.getByDisplayValue(fakeData.jobTitle!);
            expect(jobTitleField).toBeInTheDocument();

            const submitButton = canvas.getByTestId('submitButton');
            expect(submitButton).toBeDisabled();
        }, {timeout: 1000});

        await delay(1500);
        await step('Type in', async () => {
            const userNameField = canvas.getByDisplayValue(fakeData.userName!);
            await expect(userNameField).toBeInTheDocument();
            await userEvent.type(userNameField, 'John');
        });

        await delay(500);
        await step('Check button enable', async () => {
            const submitButton = canvas.getByTestId('submitButton');
            await expect(submitButton).toBeEnabled();
        });

        await delay(500);
        await step('Click on submit', async () => {
            const submitButton = canvas.getByTestId('submitButton');
            await userEvent.click(submitButton);
        });
    })
}