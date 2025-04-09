import type {Args, Meta, StoryObj} from "@storybook/react";
import {expect, fn, within} from "@storybook/test";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import OtherLinesDrawerContent from "@/app/eventList/components/pageComponent/OtherLinesDrawerContent";
import {marketLineHandicap, marketLineOneXTwo, marketLineOverUnder} from "@/data/mockData/event/MockEventRowData";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const meta = {
    component: OtherLinesDrawerContent,
    decorators: [
        (Story) => (
            <ProvidersWithoutNavigation>
                <Story/>
            </ProvidersWithoutNavigation>
        )
    ],
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        onMarketStatusChange: fn(),
        onOddPriceChanged: fn(),
    },
    args: {
        subTitle: '[579c17cd-8250-40cd-976b-d61d9006466b] NBA',
        homeName: "Omiya Ardija Ventus",
        awayName: "Juventus FC",
        homeParticipantEnName: "Omiya Ardija Ventus",
        awayParticipantEnName: "Juventus FC",
    }
} satisfies Meta<typeof OtherLinesDrawerContent>;

export default meta
type Story = StoryObj<typeof meta>;

export const OneXTwo: Story = {
    args: {
        title: '1 X 2',
        ...marketLineOneXTwo,
    }, play: wrapWithLoadingCheck(async ({canvasElement, args, step} : { canvasElement: HTMLElement, args: Args, step: StepFunction }) => {
        const canvas = within(canvasElement);
        for (let item of args.odds) {
            if (item.baseLine) {
                const baseLine = canvas.getAllByText(item.baseLine)[0];
                await expect(baseLine).toBeInTheDocument();
            }
        }
    })
}

export const OverUnder: Story = {
    args: {
        title: 'Over/ Under',
        ...marketLineOverUnder
    }
}

export const Handicap: Story = {
    args: {
        title: 'Handicap',
        ...marketLineHandicap
    }
}

