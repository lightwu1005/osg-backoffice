import type {Meta, StoryObj} from "@storybook/react";
import StatisticSummary from "@/app/eventDetail/components/playLog/StatisticSummary";
import {ProvidersWithoutNavigation} from "@/utils/Providers";


const meta = {
    component: StatisticSummary,
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <ProvidersWithoutNavigation>
                <Story/>
            </ProvidersWithoutNavigation>
        )
    ]
} satisfies Meta<typeof StatisticSummary>;


export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        data: [
            {
                name: "Dangerous Attacks",
                home: 20,
                away: 20,
                sequence: 0
            },
            {
                name: "Dangerous Free Kicks",
                home: 0,
                away: 2,
                sequence: 1
            },
            {
                name: "Penalties",
                home: 0,
                away: 20,
                sequence: 2
            },
            {
                name: "Fouls",
                home: 20,
                away: 4,
                sequence: 3
            },
            {
                name: "Red Cards",
                home: 20,
                away: 20,
                sequence: 4
            }
        ]
    }
}