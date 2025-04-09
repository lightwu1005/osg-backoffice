import MockApi from "@/data/mockData/MockApi";
import {persistor} from "@/modules/common/IdentityRedux";
import {PersistGate} from "redux-persist/integration/react";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import Page from "@/app/testPlaceBet/page";
import {Providers} from "@/utils/Providers";

const {
    eventList,
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
            displayTypes,
            sportsCategories,
            getConfiguration
        ],
        nextjs: {
            appDirectory: true,
            navigation: {
                pathname: '/testPlaceBet'
            }
        }
    },
    decorators: [
        (Story) => {
            return (
                <Providers>
                    <PersistGate loading={null} persistor={persistor}>
                        <Story />
                    </PersistGate>
                </Providers>
            )
        },
    ],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    play: async ({canvasElement, step}) => {

    }
}