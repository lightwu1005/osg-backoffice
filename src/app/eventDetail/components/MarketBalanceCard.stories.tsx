import { Meta, StoryObj } from '@storybook/react';
import MarketBalanceCard from "@/app/eventDetail/components/MarketBalanceCard";

const meta: Meta<typeof MarketBalanceCard> = {
    component: MarketBalanceCard,
    tags: ["autodocs"],
} as Meta<typeof MarketBalanceCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        data: [
            {
                label: "Home",
                value: 5000
            },
            {
                label: "Draw",
                value: 4000
            },
            {
                label: "Away",
                value: 1000
            }
        ]
    }
};