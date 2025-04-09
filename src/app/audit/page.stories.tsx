import type {Meta, StoryObj} from "@storybook/react";
import {expect, userEvent, within} from "@storybook/test";
import MockApi from "@/data/mockData/MockApi";
import Page from "@/app/audit/page";
import {delay} from "@/utils/tools";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const {
    getAuditActions,
    getAuditList,
    getAuditListWithSearchActions,
    getAuditListWithSearchDate,
    getAuditListWithSearchActionsAndDate
} = MockApi()

const meta = {
    component: Page,
    parameters: {
        mockData: [
            getAuditActions,
            getAuditList,
            getAuditListWithSearchActions,
            getAuditListWithSearchDate,
            getAuditListWithSearchActionsAndDate
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
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {}
export const SearchFields: Story = {
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const canvas = within(canvasElement);
        const searchField = canvas.getByTestId('input-textField-userName');
        const actionField = canvas.getByTestId('input-textField-action');
        const timeField = canvas.getByPlaceholderText('YYYY/MM/DD – YYYY/MM/DD');
        await expect(searchField).toBeInTheDocument();
        await expect(actionField).toBeInTheDocument();
        await expect(timeField).toBeInTheDocument();

        await step('type search', async () => {
            await userEvent.type(searchField, 'Test');
        });

        await delay(1000);
        await step('click action and selected', async () => {
            const dropdownButton = canvas.getByRole('button', { name: /Open/i });
            await userEvent.click(dropdownButton);

            const option1 = canvasElement.ownerDocument.querySelector('[data-option-index="1"]');
            await userEvent.click(option1);
            const option2 = canvasElement.ownerDocument.querySelector('[data-option-index="2"]');
            await userEvent.click(option2);
        });

        await delay(1000);
        await step('set time', async () => {
            await userEvent.click(timeField);
            const dateToSelectStart = canvasElement.ownerDocument.querySelector('[aria-rowindex="2"] [aria-colindex="5"]');
            await userEvent.click(dateToSelectStart);

            const dateToSelectEnd = canvasElement.ownerDocument.querySelector('[aria-rowindex="2"] [aria-colindex="6"]');
            await userEvent.click(dateToSelectEnd);
        });

        await delay(1000);
        await step('click clean button', async () => {
            const cleanButton = canvas.getByRole('button', { name: /Clean/i });
            await expect(cleanButton).toBeInTheDocument();
            await userEvent.click(cleanButton);
        });
    })
}