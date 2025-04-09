import type {Meta, StoryObj} from "@storybook/react";
import MockApi from "@/data/mockData/MockApi";
import {expect} from "@storybook/test";
import TimelinePage from "@/app/eventDetail/components/playLog/pageComponent/TimelinePage";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";

const {
    getEventPlayLogTimeline,
    timelineStatuses
} = MockApi()

const meta = {
    component: TimelinePage,
    parameters: {
        layout: 'fullscreen',
        mockData: [
            getEventPlayLogTimeline,
            timelineStatuses
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
} satisfies Meta<typeof TimelinePage>;


export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        eventId: "123",
        sportType: "SOCCER"
    },
    play: wrapWithLoadingCheck(async () => {
        const states = document.getElementById('input-textField-select-the-states');
        const teams = document.getElementById("input-textField-select-the-teams");
        await expect(states).toBeInTheDocument();
        await expect(teams).toBeInTheDocument();
    })
}