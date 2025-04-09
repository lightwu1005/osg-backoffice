import type {Meta, StoryObj} from "@storybook/react";
import {expect, userEvent, within} from "@storybook/test";
import MockApi from "@/data/mockData/MockApi";
import Page from "@/app/permission/page";
import store, {setRole} from "@/modules/common/IdentityRedux";
import React from "react";
import {RoleType} from "@/services/@core/module/Enum";
import {Providers} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const {
    getMemberListForPermission,
    addMember,
    removeMembers,
    getMemberRoles,
    updateMembersStatus
} = MockApi()

const meta = {
    component: Page,
    parameters: {
        layout: 'fullscreen',
        mockData: [
            getMemberListForPermission,
            addMember,
            removeMembers,
            getMemberRoles,
            updateMembersStatus
        ],
        nextjs: {
            appDirectory: true,
            navigation: {
                pathname: '/permission'
            }
        }
    },
    decorators: [
        (Story) => {
            return (
                <Providers>
                    <Story/>
                </Providers>
            )
        },
    ],
    tags: [],
    argTypes: {},
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        store.dispatch(setRole(RoleType.Admin));
        const canvas = within(canvasElement);

        const allFields = Array.from(document.querySelectorAll('.MuiInputBase-input'))

        const searchField = allFields[0];
        await expect(searchField).toBeInTheDocument();

        const roleItem = allFields[1];
        await expect(roleItem).toBeInTheDocument();

        const statusItem = allFields[2];
        await expect(statusItem).toBeInTheDocument();

        // Need to delay 1s to wait for the data to be loaded
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const gridView = await canvas.findByRole('grid');
        await expect(gridView).toBeInTheDocument();

        await step('click checkbox with suspended user ', async () => {
            const checkbox = await within(gridView).findAllByRole('checkbox');
            await userEvent.click(checkbox.at(6), {
                delay: 500
            });
        });

        await step('action click', async () => {
            const actionButton = canvas.getByText('Actions');
            await expect(actionButton).toBeInTheDocument();
            await userEvent.click(actionButton, {
                delay: 500
            });
        });
        const suspended = document.getElementsByClassName('MuiMenuItem-root')[2];
        await step(`click action Suspend`, async () => {
            await userEvent.click(suspended, {
                delay: 500
            });
        });

        const modelCanvas = within(document.body);
        const confirmButton = modelCanvas.getByText('Confirm');
        await expect(confirmButton).toBeEnabled();
        await step(`click Confirm`, async () => {
            await userEvent.click(confirmButton, {
                delay: 500
            });
        });

        await step('click checkbox with active user', async () => {
            const checkbox = await within(gridView).findAllByRole('checkbox');
            await userEvent.click(checkbox.at(6), {
                delay: 500
            });
            const actionButton = canvas.getByText('Actions');
            await userEvent.click(actionButton, {
                delay: 500
            });
            const remove = document.getElementsByClassName('MuiMenuItem-root')[1];
            await expect(remove).toBeInTheDocument();
            await expect(remove).toHaveAttribute('aria-disabled', 'true');

        });
    })
}

export const AddMemberSuccess: Story = {
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        store.dispatch(setRole(RoleType.Admin));
        const canvas = within(canvasElement);
        const action = canvas.getByText('Actions');
        await step('action click', async () => {
            await userEvent.click(action, {
                delay: 500
            });
        });
        const menuItem = document.getElementsByClassName('MuiMenuItem-root')[0];
        await step(`click action Add`, async () => {
            await userEvent.click(menuItem, {
                delay: 500
            });
        });

        const allFields = Array.from(document.querySelectorAll('.MuiInputBase-input'))

        const nameField = allFields[4];
        const emailField = allFields[5];
        const organizationField = allFields[7];
        const roleField = document.getElementById('input-textField-role')

        await userEvent.type(nameField, 'TestName');
        await userEvent.type(emailField, 'test@example.com');
        await userEvent.type(organizationField, 'test company');
        await userEvent.click(roleField);

        const option = document.getElementsByClassName('MuiAutocomplete-option')[0];
        await step(`click first option`, async () => {
            await userEvent.click(option, {
                delay: 500
            });
        });

        const publishButton = document.getElementById('publish');

        await expect(publishButton).toBeEnabled();
        await userEvent.click(publishButton);
    })
}
