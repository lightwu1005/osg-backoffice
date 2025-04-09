import {Meta, StoryObj} from "@storybook/react";
import EventDetailPage from "@/app/eventDetail/components/pageComponent/EventDetailPage";
import {mockEventDetail} from "@/data/mockData/event/MockEventDetailData";
import MockApi from "@/data/mockData/MockApi";
import {PersistGate} from "redux-persist/integration/react";
import {expect, userEvent, waitFor, within} from "@storybook/test";
import React from "react";
import {persistor} from "@/modules/common/IdentityRedux";
import {Providers} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const {
    eventDetail,
    getConfiguration,
    eventMarketDetail,
    getEventMarketSettings,
    marketBalance,
    oddsList,
    oddsList1,
    getEventPerformanceBetSlips,
    getEventPerformanceMarket,
    updateEventsStatus,
    getTemplateDetail,
    getMarketGroups
} = MockApi()

const meta = {
    component: EventDetailPage,
    decorators: [
        (Story) => (
            <Providers>
                <PersistGate loading={null} persistor={persistor}>
                    <Story/>
                </PersistGate>
            </Providers>
        )
    ],
    parameters: {
        mockData: [
            eventDetail,
            getConfiguration,
            eventMarketDetail,
            marketBalance,
            oddsList,
            oddsList1,
            getEventPerformanceBetSlips,
            getEventPerformanceMarket,
            updateEventsStatus,
            getTemplateDetail,
            {
                ...getEventMarketSettings,
                url: getEventMarketSettings.url + '&eventType=:eventType'
            },
            getMarketGroups
        ],
        nextjs: {
            appDirectory: true,
            navigation: {
                pathname: '/eventList/1'
            }
        }
    },
    tags: ["autodocs"],
    argTypes: {
        eventId: {description: 'event id', control: 'text'},
    },
} satisfies Meta<typeof EventDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        eventType: 'inPlay',
        eventId: "12345",
        sportId: "12345"
    },
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const canvas = within(document.body);
        const detail = mockEventDetail;

        await step('Check detail info', async () => {
            await waitFor(() => {
                const leagueName = canvas.getByTestId('leagueName');
                expect(leagueName).toHaveTextContent(detail.leagueName);

                const scores = detail.participants.map(item => item.score) ?? [];
                const teamInfoItem = canvas.getByTestId('teamInfo');
                expect(teamInfoItem).toBeInTheDocument();

                for (const score of scores) {
                    expect(teamInfoItem).toHaveTextContent(`${score}`);
                }

                const marketItem = canvas.getByTestId('markets')
                expect(marketItem).toBeInTheDocument();
            }, {timeout: 3000});
        });

        await step('Check action button', async () => {
            const actionButton = canvas.getByTestId('actions');
            await expect(actionButton).toBeInTheDocument();
            await userEvent.click(actionButton);

            const paper = canvas.getByRole('menu');
            await expect(paper).toBeInTheDocument();
            await expect(paper.children.length).toBeGreaterThan(0);

            const allItems = canvas.getAllByRole('menuitem');
            await expect(allItems).toHaveLength(3);
            await userEvent.click(allItems[1]);
        });

        // The rest are not able to test because of mock api cannot support real situations.
        // await step('Check odds display', async () => {
        //     const oddsCard = canvas.getByTestId('oddsCard');
        //     await expect(oddsCard).toBeInTheDocument();
        //
        //     const addBoxRoundedIcon = canvas.getAllByTestId('AddBoxRoundedIcon');
        //     await expect(addBoxRoundedIcon).toHaveLength(2);
        //
        //     addBoxRoundedIcon.forEach(btn => {
        //        userEvent.click(btn);
        //     });
        //
        //     oddsData.forEach((item, index) => {
        //         const provider = canvas.getByText(item.provider);
        //         expect(provider).toBeInTheDocument();
        //
        //         waitFor(() => {
        //             item.odds.forEach((odds, index) => {
        //                 odds.bets.forEach(bet => {
        //                     const priceChip = canvas.getByText(bet.price.toFixed(3).toString());
        //                     expect(priceChip).toBeInTheDocument();
        //                 });
        //             });
        //         }, {timeout: 1000});
        //     });
        // });
    })
}