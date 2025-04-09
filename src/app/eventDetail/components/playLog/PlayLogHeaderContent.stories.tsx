import {Meta, StoryObj} from "@storybook/react";
import PlayLogHeaderContent from "@/app/eventDetail/components/playLog/PlayLogHeaderContent";
import {expect, userEvent, within} from "@storybook/test";
import {mockPlayLogSummary} from "@/data/mockData/event/MockPlayLogData";
import MockApi from "@/data/mockData/MockApi";
import {convertPeriodOrTypeDisplay} from "@/services/@event/useCase";
import React from "react";
import usePlayLogSummaryViewModel from "@/app/eventDetail/domain/usePlayLogSummaryViewModel";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {delay} from "@/utils/tools";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const {playLogSummary} = MockApi()

const PlayLogHeaderContentStories = () => {
    const vm = usePlayLogSummaryViewModel('123', 'SOCCER');
    return <PlayLogHeaderContent {...vm}/>
}

const meta = {
    component: PlayLogHeaderContentStories,
    parameters: {
        mockData: [
            playLogSummary
        ]
    },
    tags: ["autodocs"],
    argTypes: {},
    decorators: [
        (Story) => {
            return (
                <ProvidersWithoutNavigation>
                    <Story/>
                </ProvidersWithoutNavigation>
            )
        },
    ]
} satisfies Meta<typeof PlayLogHeaderContentStories>;


export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const canvas = within(document.body);

        await step('Check competitors', async () => {
            const leagueName = await canvas.findByText(mockPlayLogSummary.leagueName);
            await expect(leagueName).toBeInTheDocument();
            await delay(1000)
            const currentPeriodName = await canvas.findAllByText(convertPeriodOrTypeDisplay(mockPlayLogSummary.currentPeriodName));
            await expect(currentPeriodName).toHaveLength(1);

            const leftName = await canvas.findAllByText(mockPlayLogSummary.competitors.homeName);
            leftName.forEach(item => {
                expect(item).toBeInTheDocument();
            });

            const rightName = await canvas.findAllByText(mockPlayLogSummary.competitors.awayName);
            rightName.forEach(item => {
                expect(item).toBeInTheDocument();
            });
        })

        await step('Check statistic title', async () => {
            const statistics = mockPlayLogSummary.statisticCounts;
            for (const item of statistics) {
                const name = await canvas.findByText(item.name);
                await expect(name).toBeInTheDocument();
            }
        })

        await step('Check score period', async () => {
            const period = mockPlayLogSummary.periodScores;
            await delay(1000)
            for (let i = 0; i < period.length; i++) {
                const name = await canvas.findAllByText(convertPeriodOrTypeDisplay(period[i].name));
                await expect(name).toHaveLength(1);
                if (period[i].home.length) {
                    const text = convertPeriodOrTypeDisplay(period[i].home);
                    const scoreA = canvas.getAllByText(text);
                    const count = period.reduce((acc, item) =>
                        acc + (convertPeriodOrTypeDisplay(item.home) === text ? 1 : 0) + (convertPeriodOrTypeDisplay(item.away) === text ? 1 : 0), 0);
                    await expect(scoreA).toHaveLength(i === period.length - 1 ? count + 1 : count)
                }
                if (period[i].away.length) {
                    const text = convertPeriodOrTypeDisplay(period[i].away);
                    const scoreB = canvas.getAllByText(text);
                    const count = period.reduce((acc, item) =>
                        acc + (convertPeriodOrTypeDisplay(item.home) === text ? 1 : 0) + (convertPeriodOrTypeDisplay(item.away) === text ? 1 : 0), 0);
                    await expect(scoreB).toHaveLength(i === period.length - 1 ? count + 1 : count)
                }
            }
        })

        await step('Check popup', async () => {
            const videoIconButton = await canvas.findByTestId('videoIconButton');
            await expect(videoIconButton).toBeInTheDocument();
            await userEvent.click(videoIconButton);

            const videoCard = await canvas.findByTestId('videoCard');
            await expect(videoCard).toBeInTheDocument();

            const videoCloseButton = await canvas.findByTestId('videoCardCloseButton');
            await userEvent.click(videoCloseButton);
            await expect(videoCard).not.toBeInTheDocument();
        })
    })
}