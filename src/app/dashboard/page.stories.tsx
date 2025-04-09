import Page from "@/app/dashboard/page";
import type {Meta, StoryObj} from "@storybook/react";
import {expect, userEvent, within, fireEvent} from "@storybook/test";
import MockApi from "@/data/mockData/MockApi";
import {mockProviderInformation, mockProviders, mockSportCategories} from "@/data/mockData/common/MockRowData";
import {delay} from "@/utils/tools";
import React from "react";
import {Providers} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const {
    getPerformanceDevice,
    getPerformanceBetSlips,
    getPerformanceSports,
    getPerformanceImbalance,
    getPerformanceLeague,
    getPerformanceMarket,
    sportsCategories,
    getProvidersWithSportId,
    getProviderInformation,
    getProviderInformationWithProvider,
    getProviderInformationWithFullSearch
} = MockApi()

const meta = {
    component: Page,
    parameters: {
        layout: 'fullscreen',
        mockData: [
            getPerformanceDevice,
            {
                ...getPerformanceDevice,
                url: getPerformanceDevice.url + '&sportIds=:sportIds'
            },
            getPerformanceBetSlips,
            {
                ...getPerformanceBetSlips,
                url: getPerformanceBetSlips.url.replace('&betType=:betType', '&sportIds=:sportIds&betType=:betType')
            },
            getPerformanceSports,
            getPerformanceImbalance,
            getPerformanceLeague,
            getPerformanceMarket,
            sportsCategories,
            getProvidersWithSportId,
            getProviderInformation,
            getProviderInformationWithProvider,
            getProviderInformationWithFullSearch
        ],
        nextjs: {
            appDirectory: true,
            navigation: {
                pathname: '/dashboard'
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
        const canvas = within(document.body);

        if (process.env.FUNCTIONALITY === 'Admin') {
            const fakeTableData = mockProviderInformation;
            const fakeProviderData = mockProviders;
            const tabList = await canvas.findByTestId('table');
            await expect(tabList).toBeInTheDocument();
            const searchFields = await canvas.findAllByRole('combobox')

            await step('Type Search', async () => {
                const searchField = searchFields[0];
                await expect(searchField).toBeInTheDocument();
                await userEvent.click(searchField);
                await delay(1000);
                await fireEvent.change(searchField, {target: {value: 'p'}});
            });

            await delay(1000);
            await step('Mapping Options', async () => {

                const listBox = await canvas.findByRole('listbox');
                const options = within(listBox).getAllByRole('option');
                await expect(options).not.toHaveLength(0);
                const filteredProvider = fakeProviderData.filter(value => (value.toLowerCase().includes('p')));

                await expect(filteredProvider.length).toEqual(options.length);

                filteredProvider.forEach((value, index) => {
                    expect(options[index]).toHaveTextContent(value);
                });
                await userEvent.click(options[1]);
                await userEvent.keyboard('{Escape}');
            });

            await delay(1000);
            await step('Select Status', async () => {
                const statusField = searchFields[1];
                await expect(statusField).toBeInTheDocument();
                await userEvent.click(statusField);

                const listBox = await canvas.findByRole('listbox');
                const options = within(listBox).getAllByRole('option');
                await expect(options).not.toHaveLength(0);
                await userEvent.click(options[1]);
                await userEvent.click(statusField);
            });

            await delay(1000);
            await step('Clean input', async () => {
                const clearButton = canvas.getByTestId('clean-button');
                await expect(clearButton).toBeInTheDocument();
                await userEvent.click(clearButton);
                await delay(300)
                await expect(clearButton).not.toBeInTheDocument();
            });
        }
    })
}

export const TabFilter: Story = {
    render: (args) => (
        <Providers>
            <Page {...args} />
        </Providers>
    ),
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const canvas = within(document.body);
        if (process.env.FUNCTIONALITY === 'Admin') {
            const fakeTabData = mockSportCategories;
            const filterTab = canvas.getByTestId('FilterTab');

            await step('Tap Filter tab', async () => {
                await expect(filterTab).toBeInTheDocument();
                await userEvent.click(filterTab);
            });

            const searchField = await canvas.findByRole('textbox')
            await expect(searchField).toBeInTheDocument();

            await delay(1000);
            const searchText: string = 'll';
            await step('Input Search', async () => {
                await fireEvent.change(searchField, {target: {value: searchText}});
                const menu = await canvas.findByTestId('TabMenu');
                await expect(menu).toBeInTheDocument();
                const onlyBallData = fakeTabData.filter((item) =>
                    item.sportName.toLowerCase().includes(searchText)
                );
                onlyBallData.forEach((item) => {
                    expect(menu).toHaveTextContent(item.sportName);
                });
            });

            await delay(1000);
            await step('Clear search', async () => {
                await expect(searchField).toBeInTheDocument()
                await fireEvent.change(searchField, {target: {value: ''}});
                const allTab = await canvas.findByTestId('ItemAll');
                await expect(allTab).toBeInTheDocument();
            });

            await delay(1000);
            const displayTab = [1, 2, 5].map((index) => fakeTabData[index]);
            await step('Select Tabs', async () => {
                const allTab = await canvas.findByTestId('ItemAll');
                await userEvent.click(allTab);

                displayTab.forEach((item) => {
                    const sportNamePattern = new RegExp(`${item.sportName}`, 'i');
                    const option = canvas.getByRole('menuitem', {name: sportNamePattern});
                    expect(option).toBeInTheDocument();
                    userEvent.click(option);
                });
            });

            await delay(1000);
            await step('Check Tabs', async () => {
                const allTabs = await canvas.findAllByTestId('MuiTab');
                allTabs.shift();
                await expect(allTabs).toHaveLength(displayTab.length);
                displayTab.forEach((item, index) => {
                    const tab = allTabs[index];
                    expect(tab).toHaveTextContent(item.sportName);
                });
            });
        }
    })
}