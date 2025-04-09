import {Meta, StoryObj} from "@storybook/react";
import PlayByPlayLogPage from "@/app/eventDetail/components/pageComponent/PlayByPlayLogPage";
import MockApi from "@/data/mockData/MockApi";
import {expect, within} from "@storybook/test";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const {
    playLogSummary,
    getEventPlayLogTimeline,
    timelineStatuses,
    getMatchStats,
    getLineups
} = MockApi()

const meta: Meta<typeof PlayByPlayLogPage> = {
    component: PlayByPlayLogPage,
    parameters: {
        layout: 'fullscreen',
        mockData: [
            playLogSummary,
            getEventPlayLogTimeline,
            timelineStatuses,
            getMatchStats,
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
} as Meta<typeof PlayByPlayLogPage>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        eventId: '12345',
        sportType: 'SOCCER',
    }
}
export const UITest: Story = {
    args: {
        eventId: '12345',
        sportType: 'SOCCER'
    },
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const canvas = within(canvasElement);
        const summarySection = canvas.getByTestId('summary-section');
        const playLogTabs = canvas.getByTestId('play-log-tabs');

        await expect(summarySection).toBeInTheDocument();
        await expect(playLogTabs).toBeInTheDocument();


        await step('Click tab', async () => {
            const tabs = canvas.getAllByRole('tab');
            for (let index = 0; index < tabs.length; index++) {
                tabs[index].click()
                await new Promise(resolve => setTimeout(resolve, 1000));
                if (index === 0) {
                    await expect(canvas.getByTestId('timeline-page')).toBeInTheDocument();
                } else if (index === 1 ) {
                    await expect(canvas.getByTestId('match-stats-page')).toBeInTheDocument();
                } else if (index === 2) {
                    await expect(canvas.getByTestId('line-ups-page')).toBeInTheDocument();
                }
            }
        });

        await step('Scroll page to display top bar', async () => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            canvasElement.ownerDocument.defaultView?.scrollTo({
                top: canvasElement.ownerDocument.body.scrollHeight,
                behavior: 'smooth',
            });
            await new Promise((resolve) => setTimeout(resolve, 500));

            // const topBarSection = canvas.getByTestId('top-bar-section');
            // await expect(topBarSection).toBeInTheDocument();
        });
    })
}