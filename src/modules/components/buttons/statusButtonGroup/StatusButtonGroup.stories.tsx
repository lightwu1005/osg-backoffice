import React, {useState} from 'react';
import {type Args, Meta, StoryObj} from '@storybook/react';
import {StatusButtonGroup, StatusButtonGroupProps} from './StatusButtonGroup';
import {expect, userEvent, within} from "@storybook/test";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";

const meta: Meta<typeof StatusButtonGroup> = {
    component: StatusButtonGroup,
    tags: ['autodocs'],
    decorators: [
        (Story) => {
            return (
                <ProvidersWithoutNavigation>
                    <Story/>
                </ProvidersWithoutNavigation>
            )
        },
    ]
} as Meta<typeof StatusButtonGroup>;
export default meta;

type Story = StoryObj<StatusButtonGroupProps>;

const StatusButtonGroupWithState: React.FC<StatusButtonGroupProps> = (props) => {
    const [selected, setSelected] = useState(0);
    const onClick = (index: number, key: string) => {
        setSelected(index);
    };

    return <StatusButtonGroup items={props.items} selectedIndex={selected} onClick={onClick}/>;
};

export const MatchStatus: Story = {
    args: {
        items: [{key: 'in', text: 'In-Play', type: 'in'}, {key: 'pre', text: 'Pre-Match', type: 'pre'}],
    },
    render: (args) => <StatusButtonGroupWithState {...args} />,
    play: wrapWithLoadingCheck(async ({canvasElement, args}: { canvasElement: HTMLElement, args: Args }) => {
        const canvas = within(canvasElement);

        const btnRole = await canvas.findAllByRole('button');
        await expect(btnRole).toHaveLength(args.items.length);

        for (const item of args.items) {
            const itemButton = await canvas.findByText(item.text);
            await expect(itemButton).toBeInTheDocument();
            await userEvent.click(itemButton);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    })
};

export const MarketTypes: Story = {
    args: {
        items: [
            {key: 'moneyline', text: 'Moneyline', type: 'moneyline'},
            {key: 'spread', text: 'Spread', type: 'spread'},
            {key: 'ou', text: 'Under/ Over', type: 'ou'},
            {key: 'etc', text: 'etc', type: 'etc'},
        ],
    },
    render: (args) => <StatusButtonGroupWithState {...args} />
};