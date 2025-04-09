import store, {persistor, setRole} from "@/modules/common/IdentityRedux";
import {PersistGate} from "redux-persist/integration/react";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import Page from "@/app/betSlip/page";
import MockApi from "@/data/mockData/MockApi";
import {expect, within} from "@storybook/test";
import {PageType, RoleType} from "@/services/@core/module/Enum";
import {Providers} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const {
    getBetSlipList,
    betSlipExport,
    getMarkets,
    getMarketsWithSearch,
    sportsCategories,
    locations,
    getLeagues
} = MockApi()

const meta = {
    component: Page,
    parameters: {
        layout: 'fullscreen',
        mockData: [
            getBetSlipList,
            betSlipExport,
            getMarkets,
            getMarketsWithSearch,
            sportsCategories,
            locations,
            getLeagues
        ],
        nextjs: {
            appDirectory: true,
            navigation: {
                pathname: PageType.BetSlip
            }
        }
    },
    decorators: [
        (Story) => {
            store.dispatch(setRole(RoleType.ChannelAdmin))
            return (
                <Providers>
                    <PersistGate loading={null} persistor={persistor}>
                        <Story/>
                    </PersistGate>
                </Providers>
            )
        },
    ],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {}

export const UITest: Story = {
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const canvas = within(canvasElement);

        const statusButtonGroup = canvas.getByRole('group');
        const manageColumns = canvas.getByTestId('SwitchListButton');
        const exportButton = canvas.getByRole('button', {name: /Export/i});
        const actionButton = canvas.getByText('Actions');

        await expect(statusButtonGroup).toBeInTheDocument();
        await expect(manageColumns).toBeInTheDocument();
        await expect(exportButton).toBeInTheDocument();
        await expect(actionButton).toBeInTheDocument();
        await expect(actionButton).toBeDisabled();

        const searchField = canvas.getByLabelText('Search', {selector: 'input'});
        const betAmountField = canvas.getByLabelText('Bet Amount', {selector: 'input'});
        const timeField = canvas.getByLabelText('Bet Time', {selector: 'input'});
        const filterButton = canvas.getByText('Filter');

        await expect(searchField).toBeInTheDocument();
        await expect(betAmountField).toBeInTheDocument();
        await expect(timeField).toBeInTheDocument();
        await expect(filterButton).toBeInTheDocument();

        const gridView = await canvas.findByRole('grid');
        await expect(gridView).toBeInTheDocument();
    })
}