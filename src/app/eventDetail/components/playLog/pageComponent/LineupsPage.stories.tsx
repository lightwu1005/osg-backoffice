import type {Meta, StoryObj} from "@storybook/react";
import MemorizedLineupsPage from "@/app/eventDetail/components/playLog/pageComponent/LineupsPage";
import MockApi from "@/data/mockData/MockApi";
import {expect, within} from "@storybook/test";
import {mockLineupsData} from "@/data/mockData/event/MockPlayLogData";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";

const {
    getLineups
} = MockApi()

const meta = {
    component: MemorizedLineupsPage,
    parameters: {
        layout: 'fullscreen',
        mockData: [
            getLineups
        ]
    },
    decorators: [
        (Story) => {
            return (
                <ProvidersWithoutNavigation>
                    <Story />
                </ProvidersWithoutNavigation>
            )
        },
    ]
} satisfies Meta<typeof MemorizedLineupsPage>;


export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        eventId: "123"
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const tables = await canvas.findAllByRole('table');
        await expect(tables).toHaveLength(2);

        const firstPlayerName = await canvas.findAllByText(mockLineupsData.home.players[0].name!);
        await expect(firstPlayerName.shift()).toBeInTheDocument();

        const secondPlayerName = await canvas.findAllByText(mockLineupsData.home.players[1].name!);
        await expect(secondPlayerName.shift()).toBeInTheDocument();
    }
}