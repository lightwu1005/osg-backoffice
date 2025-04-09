import type {Meta, StoryObj} from '@storybook/react';
import {expect, userEvent, within} from "@storybook/test";
import MemberFormDialog from "@/app/permission/components/pageComponent/MemberForm";
import MockApi from "@/data/mockData/MockApi";
import store, {persistor, setChannelId, setRole, setUuid} from "@/modules/common/IdentityRedux";
import React from "react";
import {Functionality, RoleType} from "@/services/@core/module/Enum";
import {PersistGate} from "redux-persist/integration/react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";

const {
    getSingleMemberInfo
} = MockApi()

const meta = {
    component: MemberFormDialog,
    parameters: {
        layout: 'fullscreen',
        mockData: [
            getSingleMemberInfo,
        ]
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
} satisfies Meta<typeof MemberFormDialog>;

export default meta
type Story = StoryObj<typeof meta>;

export const DefaultAddMember: Story = {
    args: {
        open: true,
        roleList: ['Super Admin', 'Admin', 'Maintainer', 'Channel Admin'],
        uuid: ''
    },
    render: (args) => (
        <ProvidersWithoutNavigation>
            <MemberFormDialog {...args} />
        </ProvidersWithoutNavigation>
    ),
    play: wrapWithLoadingCheck(async () => {
        const userFunctionality = process.env.FUNCTIONALITY ?? '';
        if (userFunctionality === Functionality.Odds) {
            store.dispatch(setChannelId('123'));
        }

        const canvas = within(document.body);
        const title = canvas.getByText('Add User');
        await expect(title).toBeInTheDocument()

        const userNameField = document.getElementById('info-textField-userName');
        await userEvent.type(userNameField, 'TestName');

        const emailField = document.getElementById('info-textField-email');
        await userEvent.type(emailField, 'test@example.com');

        const roleField = document.getElementById('input-textField-role')
        await userEvent.click(roleField);
        const option = await within(document.body).findByText('Channel Admin');
        await userEvent.click(option);

        const companyField = document.getElementById('info-textField-companyName');
        await userEvent.type(companyField, 'Ollehsports');
        const publishButton = document.getElementById('publish');

        await userEvent.click(document.body);
        await expect(publishButton).toBeEnabled();
    })
}

export const DefaultEditMember: Story = {
    args: {
        open: true,
        roleList: ['Admin', 'Maintainer', 'Channel Admin'],
        uuid: '0823e683-ac06-4ec1-8da3-8940101ff0da'
    },
    render: (args) => {
        store.dispatch(setUuid('0823e683-ac06-4ec1-8da3-8940101ff0da'));
        store.dispatch(setRole(RoleType.SuperAdmin));
        return (
            <ProvidersWithoutNavigation>
                <PersistGate persistor={persistor}>
                    <MemberFormDialog {...args} />
                </PersistGate>
            </ProvidersWithoutNavigation>
        )
    },
    play: async ({step}) => {

        const canvas = within(document.body);
        const saveButton = await canvas.findByText('Save');

        await step('Check detail info', async () => {
            const title = await canvas.findByText('Edit User');
            await expect(title).toBeInTheDocument()
            await expect(saveButton).toBeDisabled();
        });

        await step('Check save button to be enabled', async () => {
            const roleField = document.getElementById('input-textField-role')
            await userEvent.click(roleField);
            const menu = await canvas.findByRole('listbox');
            const options = await within(menu).findAllByRole('option');
            const option = options[1];
            await userEvent.click(option);
            await userEvent.click(document.body);
            await expect(saveButton).toBeEnabled();
        });

        await step('Check save button to be disabled', async () => {
            const emailField = document.getElementById('info-textField-email');
            await userEvent.clear(emailField);
            await expect(saveButton).toBeDisabled();
        });
    }
}