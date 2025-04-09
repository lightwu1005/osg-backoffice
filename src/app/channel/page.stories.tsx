import type {Meta, StoryObj} from "@storybook/react";
import {expect, userEvent, within} from "@storybook/test";
import MockApi from "@/data/mockData/MockApi";
import Page from "@/app/channel/page";
import store, {setRole} from "@/modules/common/IdentityRedux";
import {Functionality, RoleType} from "@/services/@core/module/Enum";
import React from "react";
import {Providers} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const {
    displayTypes,
    getProviders,
    getAvailableOwners,
    getChannelList,
    getChannelListWithLocation,
    getChannelListWithDate,
    getChannelListWithLocationDate,
    removeChannels,
    updateChannelsStatus,
    getBrandList,
    getBrandListWithLocation,
    getBrandListWithDate,
    getBrandListWithLocationDate,
    removeBrands,
    updateBrandsStatus,
    getConfiguration
} = MockApi()

const meta = {
    component: Page,
    parameters: {
        layout: 'fullscreen',
        mockData: [
            displayTypes,
            getProviders,
            getAvailableOwners,
            getChannelList,
            getChannelListWithLocation,
            getChannelListWithDate,
            getChannelListWithLocationDate,
            removeChannels,
            updateChannelsStatus,
            getBrandList,
            getBrandListWithLocation,
            getBrandListWithDate,
            getBrandListWithLocationDate,
            removeBrands,
            updateBrandsStatus,
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
                    <Story/>
                </Providers>
            )
        },
    ]
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <Providers>
            <Page {...args} />
        </Providers>
    ),
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        store.dispatch(setRole(RoleType.Admin));
        const canvas = within(canvasElement);

        const location = canvas.getByLabelText('Location', {selector: 'input'});
        await expect(location).toBeInTheDocument();

        const actionButton = canvas.getByTestId('actions');
        await step('action click', async () => {
            await userEvent.click(actionButton, {
                delay: 500
            });
        });
        const menuItem = document.getElementsByClassName('MuiMenuItem-root')[0];
        await step(`click action Add}`, async () => {
            await userEvent.click(menuItem, {
                delay: 500
            });
        });
    })
}

//If you want to test this, should set the env Functionality to Odds
export const BrandDefault: Story = {
    render: (args) => (
        <Providers>
            <Page {...args} />
        </Providers>
    ),

    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const userFunctionality = process.env.FUNCTIONALITY ?? '';
        const canvas = within(canvasElement);

        if (userFunctionality === Functionality.Odds) {
            const marginHeader = canvas.getByText(/margin/i);
            await expect(marginHeader).toBeInTheDocument();
        }
    })
}