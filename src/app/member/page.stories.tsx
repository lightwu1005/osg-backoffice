import type {Meta, StoryObj} from "@storybook/react";
import {userEvent, within} from "@storybook/test";
import MockApi from "@/data/mockData/MockApi";
import Page from "@/app/member/page";
import {persistor} from "@/modules/common/IdentityRedux";
import React from "react";
import {PersistGate} from "redux-persist/integration/react";
import {delay} from "@/utils/tools";
import {Providers} from "@/utils/Providers";

const {
    getRiskGroupDetail,
    getRiskMembers,
    getTagsWithRandomData,
    getRiskGroupsWithRandomData,
} = MockApi()

const meta = {
    component: Page,
    parameters: {
        layout: 'fullscreen',
        mockData: [
            getRiskGroupDetail,
            getRiskMembers,
            getTagsWithRandomData,
            getRiskGroupsWithRandomData
        ],
        nextjs: {
            appDirectory: true,
            navigation: {
                pathname: '/member'
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
    play: async ({canvasElement, step}) => {
        const canvas = within(canvasElement);

        await delay(300)
        await step('Switch "Status Buttons"', async () => {
            const memberLevelRiskButton = canvas.getAllByRole('button')[1];
            await userEvent.click(memberLevelRiskButton);
            await delay(300)

            const memberListButton = canvas.getAllByRole('button')[0];
            await userEvent.click(memberListButton);
            await delay(300)
        });
    }
}