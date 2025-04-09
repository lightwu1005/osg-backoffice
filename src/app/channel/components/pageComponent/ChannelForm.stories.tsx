import type {Meta, StoryObj} from '@storybook/react';
import {expect, userEvent, within} from "@storybook/test";
import ChannelForm from "@/app/channel/components/pageComponent/ChannelForm";
import MockApi from "@/data/mockData/MockApi";
import store, {setRole} from "@/modules/common/IdentityRedux";
import {delay} from "@/utils/tools";
import {RoleType} from "@/services/@core/module/Enum";
import React from "react";
import {Providers} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const {
    addChannel,
    getMemberListForChannel,
    displayTypes,
    getProviders,
    getChannelDetail,
    updateChannel,
    getAvailableOwners,
    getConfiguration
} = MockApi();

const meta = {
    component: ChannelForm,
    parameters: {
        layout: 'fullscreen',
        mockData: [
            addChannel,
            getMemberListForChannel,
            displayTypes,
            getProviders,
            getChannelDetail,
            updateChannel,
            getAvailableOwners,
            getConfiguration
        ],
        nextjs: {
            appDirectory: true,
            navigation: {
                pathname: '/channel'
            }
        }
    },
    tags: [],
    argTypes: {},
    decorators: [
        (Story) => {
            return (
                <Providers>
                    <Story />
                </Providers>
            )
        },
    ]
} satisfies Meta<typeof ChannelForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const onHandleClose = () => {
};

export const CreateChannel: Story = {
    args: {
        open: true,
        onFinished: onHandleClose
    },
    render: (args) => {
        store.dispatch(setRole(RoleType.ChannelAdmin))
        return (
            <Providers>
                <ChannelForm {...args} />
            </Providers>
        )
    },
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const allFields = Array.from(document.querySelectorAll('.MuiInputBase-input'))
        const canvas = within(document.body);

        await step('Channel Name', async () => {
            const channelNameField = allFields[0]
            await userEvent.type(channelNameField, 'Channel No1');
            await delay(500);
        })

        await step('Location', async () => {
            const locationField = allFields[1];
            await userEvent.click(locationField);

            await delay(500);
            const locationOption = await within(document.body).findByText('TAIWAN');
            await userEvent.click(locationOption);
            await userEvent.keyboard('{Escape}')

            await delay(500);
        })

        await step('Odds Format', async () => {
            const oddsFormatTextField = allFields[2];
            await userEvent.click(oddsFormatTextField);
            const formatOption = await within(document.body).findByText('Select All')
            await userEvent.click(formatOption);
            await userEvent.keyboard('{Escape}')

            await delay(500);
        })

        await step('Owner Name', async () => {
            const ownerNameField = allFields[3];
            await userEvent.click(ownerNameField);
            const ownerNameOption = await within(document.body).findByText('Test user 003');
            await userEvent.click(ownerNameOption);
            await userEvent.keyboard('{Escape}');
        })

        await delay(500);

        if (process.env.FUNCTIONALITY === 'Admin') {
            // Odds Providers
            const oddsProvidersTextField = allFields[5]
            await userEvent.click(oddsProvidersTextField);
            await delay(500);
            const providerOption1 = await within(document.body).findByText('LSports');
            await userEvent.click(providerOption1);
            await userEvent.keyboard('{Escape}');

            // Line setting
            const lineSettingsField = allFields[6]
            await userEvent.click(lineSettingsField);
            await delay(500);
            const lineSettingsOption = await within(document.body).findByText('No Limit');
            await delay(500);
            await userEvent.click(lineSettingsOption);

            const button = await canvas.findByTestId('channel-form-submit');
            await expect(button).toBeInTheDocument();

        }
    })
};

export const EditChannel: Story = {
    args: {
        open: true,
        channelId: '67890',
        onFinished: onHandleClose
    },
    render: (args) => {
        store.dispatch(setRole(RoleType.ChannelAdmin))
        return (
            <Providers>
                <ChannelForm {...args} />
            </Providers>
        )
    },
    play: wrapWithLoadingCheck(async ({canvasElement}: { canvasElement: HTMLElement }) => {
        await delay(500);

        // Channel Name
        const channelNameField = document.getElementById('info-textField-channelName');
        await userEvent.clear(channelNameField);
        await delay(500);
        await userEvent.type(channelNameField, 'Channel No2');

        // Owner Name
        const ownerNameField = document.getElementById('input-textField-ownerName');
        await userEvent.click(ownerNameField);
        await delay(500);
        const ownerNameOption = await within(document.body).findByText('Test user 003');
        await userEvent.click(ownerNameOption);
        await userEvent.click(ownerNameField);

        if (process.env.FUNCTIONALITY === 'Odds') {
            const marginField = document.getElementById('info-textField-margin');
            await userEvent.clear(marginField);
            await userEvent.type(marginField, '10');
            await expect(marginField).toHaveValue(10);
        }
    })
};
