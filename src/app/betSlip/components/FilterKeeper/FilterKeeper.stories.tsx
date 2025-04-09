import {Meta, StoryObj} from "@storybook/react";
import FilterKeeper, {BetSlipFiltersData} from "@/app/betSlip/components/FilterKeeper/FilterKeeper";
import {userEvent, within} from "@storybook/test";
import store, {setBetSlipFilters, setBetSlipLastFilter} from "@/modules/common/IdentityRedux";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";

const meta = {
    component: FilterKeeper,
    parameters: {},
    tags: ["autodocs"],
    argTypes: {},
    decorators: [
        (Story) => {
            return (
                <ProvidersWithoutNavigation>
                    <Story />
                </ProvidersWithoutNavigation>
            )
        },
    ]
} satisfies Meta<typeof FilterKeeper>;

export default meta;
type Story = StoryObj<typeof meta>;

const fakeData: BetSlipFiltersData = {
    'Test': {
        league: [
            {id: '1', name: 'league1'},
            {id: '2', name: 'league2'},
            {id: '3', name: 'league3'}
        ],
        market: [
            {id: '4', name: 'market1'},
            {id: '5', name: 'market2'},
            {id: '6', name: 'market3'}
        ]
    },
    'A': {
        leagueA1: [
            {
                id: '1',
                name: 'LA1-1'
            },
            {
                id: '2',
                name: 'LA1-2'
            }
        ],
        marketA1: [
            {
                id: '1',
                name: 'MA1-1'
            },
            {
                id: '2',
                name: 'MA1-2'
            }
        ]
    },
    'B': {
        leagueB1: [
            {
                id: '1',
                name: 'LB1-1'
            },
            {
                id: '2',
                name: 'LB1-2'
            }
        ],
        marketB1: [
            {
                id: '1',
                name: 'MB1-1'
            },
            {
                id: '2',
                name: 'MB1-2'
            }
        ]
    }
}

export const SaveTheFilter: Story = {
    args: {
        data: fakeData['Test']
    },
    render: (args) => {
        store.dispatch(setBetSlipFilters({}))
        store.dispatch(setBetSlipLastFilter(0))
        return (
            <ProvidersWithoutNavigation>
                <FilterKeeper {...args}/>
            </ProvidersWithoutNavigation>
        )
    },
    play: async ({canvasElement, step}) => {
        const canvas = within(canvasElement);
        await step('wait for the page to load', async () => {
            await new Promise((resolve) => setTimeout(resolve, 700));
            const saveButton = canvas.getByTestId('saveFilterSetting');
            await userEvent.click(saveButton);
        });

        await step('MATCH STATS click', async () => {
            const body = within(document.body);
            const input = document.getElementById('filter-name') as HTMLInputElement
            const save = body.getByTestId('filter-save')
            await userEvent.type(input, 'TTTTest')
            await userEvent.click(save)
        });
    }
}

export const Dropdown: Story = {
    args: {
        data: fakeData['B']
    },
    render: (args) => {
        store.dispatch(setBetSlipFilters(fakeData))
        store.dispatch(setBetSlipLastFilter(2))
        return (
            <ProvidersWithoutNavigation>
                <FilterKeeper {...args}/>
            </ProvidersWithoutNavigation>
        )
    }
}
