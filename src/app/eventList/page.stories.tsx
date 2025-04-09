import type {Meta, StoryObj} from "@storybook/react";
import {expect, within} from "@storybook/test";
import MockApi from "@/data/mockData/MockApi";
import Page from "@/app/eventList/page";
import {persistor} from "@/modules/common/IdentityRedux";
import React from "react";
import {PersistGate} from "redux-persist/integration/react";
import {Providers} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const {
    eventList,
    eventPins,
    updateEventsStatus,
    updateEventPints,
    leagues,
    locations,
    displayTypes,
    sportsCategories,
    getConfiguration
} = MockApi()

const meta = {
    component: Page,
    parameters: {
        layout: 'fullscreen',
        mockData: [
            eventList,
            {
                ...eventList,
                ...{
                    url: `${eventList.url}&leagueId[0]=:leagueId[0]`
                }
            },
            eventPins,
            updateEventsStatus,
            updateEventPints,
            leagues,
            locations,
            displayTypes,
            sportsCategories,
            getConfiguration
        ],
        nextjs: {
            appDirectory: true,
            navigation: {
                pathname: '/eventList'
            }
        }
    },
    decorators: [
        (Story) => {
            return (
                <Providers>
                    <PersistGate loading={null} persistor={persistor}>
                        <Story/>
                    </PersistGate>
                </Providers>
            )
        },
    ],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        // !!! Very Important !!!
        // Because of storybook cannot simulate the url path correctly with <MemoryRouter> or even <RouterContext.Provider>, so cannot test editable permission correctly.
        // So the action button and the quick action buttons are display incorrect in storybook, and cannot test.

        const canvas = within(canvasElement);

        const tabList = canvas.getByRole('tablist');
        await expect(tabList).toBeInTheDocument();

    })

}