import {Args, Meta, StoryObj} from "@storybook/react";
import {expect, fn, within} from "@storybook/test";
import React from "react";
import MarketLineContainer from "@/app/eventList/components/pageComponent/MarketLineContainer";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {marketLineHandicap, marketLineOneXTwo, marketLineOverUnder} from "@/data/mockData/event/MockEventRowData";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const meta = {
    component: MarketLineContainer,
    decorators: [
        (Story) => (
            <ProvidersWithoutNavigation>
                <Story />
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
        homeParticipantEnName: 'Home',
        awayParticipantEnName: 'Away'
    }
} satisfies Meta<typeof MarketLineContainer>;

export default meta
type Story = StoryObj<typeof meta>;

export const OneXTwo: Story = {
    args: {
        ...marketLineOneXTwo,
    },
    play: wrapWithLoadingCheck(async ({canvasElement, args, step}: { canvasElement: HTMLElement, args: Args, step: StepFunction }) => {
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
        ...marketLineOverUnder
    }
}

export const Handicap: Story = {
    args: {
       ...marketLineHandicap
    }
}

