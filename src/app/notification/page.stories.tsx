import type {Meta, StoryObj} from "@storybook/react";
import Page from "@/app/notification/page";
import MockApi from "@/data/mockData/MockApi";
import {expect, waitFor, within} from "@storybook/test";
import {mockNotificationListData} from "@/data/mockData/notifications/NotificationListData";
import {Functionality} from "@/services/@core/module/Enum";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const {
    getNotificationList,
    readStatus
} = MockApi()

const meta = {
    component: Page,
    parameters: {
        layout: 'fullscreen',
        mockData: [
            getNotificationList,
            readStatus
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
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const fakeData = mockNotificationListData
        const userFunctionality = process.env.FUNCTIONALITY ?? '';

        const canvas = within(canvasElement);

        const status = canvas.getByLabelText('Status', {selector: 'input'});
        await expect(status).toBeInTheDocument();

        await waitFor(() => {
            const table = canvas.getByTestId('table');
            expect(table).toBeInTheDocument();
            fakeData.content.forEach((item) => {
                expect(table).toHaveTextContent(item.description);
            })
        }, {timeout: 3000});

        if (userFunctionality === Functionality.Odds) {
            const eventIdHeader = canvas.getByTestId("input-textField-eventId");
            await expect(eventIdHeader).toBeInTheDocument();
        }
    })
}