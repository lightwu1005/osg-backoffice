import type {Meta, StoryObj} from '@storybook/react';
import React, {useState} from 'react';
import {StatusItem} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup";
import {AutoMultiMenuTextFieldProps} from "@/modules/components/TextField/MultiSelectTextField";
import MarketsComponent from "@/app/eventDetail/components/MarketsComponent";
import {Box} from "@mui/material";
import {expect, userEvent, within} from "@storybook/test";
import {EventType, Functionality} from "@/services/@core/module/Enum";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {MarketsComponentViewModelProps} from "@/app/eventDetail/domain/useMarketsComponentViewModel";
import {delay} from "@/utils/tools";
import {wrapWithLoadingCheck} from "@/utils/testUtils";

const defaultProps: MarketsComponentViewModelProps = {
    title: 'Market',
    subTitle: 'You can control specific markets here.',
    allMarketStatusItems: [
        {key: 'match result', text: 'match result', type: 'match result'},
        {
            key: 'rest of match asian handicap',
            text: 'rest of match asian handicap',
            type: 'rest of match asian handicap'
        },
        {key: 'total goals over / under', text: 'total goals over / under', type: 'total goals over / under'},
        {key: 'half-time result', text: 'half-time result', type: 'half-time result'},
        {
            key: 'rest of first half asian handicap',
            text: 'rest of first half asian handicap',
            type: 'rest of first half asian handicap'
        },
        {
            key: 'half-time total goals over / under',
            text: 'half-time total goals over / under',
            type: 'half-time total goals over / under'
        }
    ],
    marketProps: {
        id: "match result",
        placeholder: "Markets",
        options: ["match result", "rest of match asian handicap", "total goals over / under", "half-time result"],
        initialSelectedOptions: ["half-time result", "match result"],
        isEmptyEqualSelectAll: false,
    },
    marketGroups: [
        {
            groupId: 'group-1',
            groupName: 'Group 1',
            marketIds: ['match result', 'half-time result'],
            status: 'OPEN'
        },
        {
            groupId: 'group-2',
            groupName: 'Group 2',
            marketIds: ['match result', 'total goals over / under'],
            status: 'OPEN'
        }
    ],
    providerProps: {
        id: "provider-id",
        label: "Provider",
        placeholder: "Provider",
        initialSelectedOptions: [],
        options: ["Jack", "Dojo", "Qoo", "Lala"],
        width: "100%",
    },
    isBets: process.env.FUNCTIONALITY === Functionality.Bets,
    eventType: EventType.inPlay,
    sportType: 'Soccer'
};

function DefaultMarketsComponent() {
    const [selected, setSelected] = useState(0);
    const onClick = (index: number, key: string) => {
        setSelected(index);
    };

    const title = 'Market'
    const subTitle = 'You can control specific markets here.'
    const marketAutoProps: AutoMultiMenuTextFieldProps = {
        id: "market-id",
        placeholder: "Markets",
        options: ["usa", "asia", "tokyo", "hot", 'taiwan', 'cold'],
    };

    const providerAutoProps: AutoMultiMenuTextFieldProps = {
        id: "provider-id",
        label: "Provider",
        placeholder: "Provider",
        options: ["Jack", "Dojo", "Qoo", "Lala"],
        width: "100%"
    };

    const handleMarketSelectedResult = (markets: string[]) => {
        console.log('Selected markets:', markets);

    };

    const handleProviderSelectedResult = (providers: string[]) => {
        console.log('Selected providers:', providers);
    }

    const handleStatusButtonOnClick = (statusItem: StatusItem | undefined) => {
        console.log('Selected status item:', statusItem);
    };

    return (
        <MarketsComponent
            title={defaultProps.title}
            allMarketStatusItems={defaultProps.allMarketStatusItems}
            subTitle={defaultProps.subTitle}
            marketProps={defaultProps.marketProps}
            marketGroups={defaultProps.marketGroups}
            providerProps={defaultProps.providerProps}
            marketSelectedResult={handleMarketSelectedResult}
            providerSelectedResult={handleProviderSelectedResult}
            statusButtonOnClick={handleStatusButtonOnClick}
            isBets={defaultProps.isBets}
            eventType={EventType.inPlay}
            sportType={'Soccer'}
        />
    )
}

const meta = {
    component: DefaultMarketsComponent,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => {
            return (
                <ProvidersWithoutNavigation>
                    <Story/>
                </ProvidersWithoutNavigation>
            )
        },
    ]
} satisfies Meta<typeof DefaultMarketsComponent>;

export default meta
type Story = StoryObj<typeof meta>;

export const marketsComponent: Story = {
    render: (args) => (
        <Box sx={{width: '90vw'}}>
            <DefaultMarketsComponent/>
        </Box>
    ),
    play: wrapWithLoadingCheck(async ({canvasElement}: { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement)
        await userEvent.click(canvas.getByPlaceholderText('Markets (2)'))
        await delay(300)
        await userEvent.keyboard('{arrowdown}');
        await delay(300)
        await userEvent.keyboard('{enter}');
        await delay(300)
        await expect(canvas.getByPlaceholderText('Markets (5)')).toBeInTheDocument()
    }),
    args: {
        defaultProps
    }
}
