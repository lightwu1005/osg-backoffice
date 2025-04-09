import type {Meta, StoryObj} from "@storybook/react";
import MemorizedMatchStatsPage from "@/app/eventDetail/components/playLog/pageComponent/MatchStatsPage";
import MockApi from "@/data/mockData/MockApi";
import {expect, within} from "@storybook/test";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";

const {
    getMatchStats
} = MockApi()

const meta = {
    component: MemorizedMatchStatsPage,
    parameters: {
        layout: 'fullscreen',
        mockData: [
            getMatchStats
        ]
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
} satisfies Meta<typeof MemorizedMatchStatsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        eventId: "123"
    }, play: async ({canvasElement, step}) => {
        const canvas = within(canvasElement);

        const firstMatchStats = await canvas.findByText('Dangerous Attacks');
        await expect(firstMatchStats).toBeInTheDocument();
    }
}