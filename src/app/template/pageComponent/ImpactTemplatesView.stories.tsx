import type {Meta, StoryObj} from '@storybook/react';
import React from "react";
import {MemorizedImpactTemplatesView} from "@/app/template/pageComponent/ImpactTemplatesView";
import {mockTemplateDetail, mockTemplateDetailA, mockTemplateDetailB} from "@/data/mockData/template/MockTemplateList";
import {expect, userEvent, within} from "@storybook/test";
import {delay} from "@/utils/tools";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const meta = {
    component: MemorizedImpactTemplatesView,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
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
} satisfies Meta<typeof MemorizedImpactTemplatesView>;

export default meta
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        newTemplates: [mockTemplateDetail],
        oldTemplates: [mockTemplateDetailA, mockTemplateDetailB],
    },
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const canvas = within(document.body);
        const pageSwitcher = canvas.getByTestId('status-button-group');
        const pageChildren = pageSwitcher.children;
        await expect(pageChildren.length).toBe(3);

        await step('Check General Setting Count', async () => {
            const tabs = canvas.getAllByRole('tab');
            await expect(tabs.length).toBe(4);

            await delay(500)

            await step('Click tab 1', async () => {
                const tabs = canvas.getAllByRole('tab');
                await userEvent.click(tabs[1]);
                const label = await canvas.findByText('No Limit');
                await expect(label).toBeInTheDocument();
            });

            await delay(500)

            await step('Click tab 2', async () => {
                const tabs = canvas.getAllByRole('tab');
                await userEvent.click(tabs[2]);
                const label = await canvas.findByText('Follow Provider');
                await expect(label).toBeInTheDocument();
            });

            await delay(500)

            await step('Click tab 3', async () => {
                const tabs = canvas.getAllByRole('tab');
                await userEvent.click(tabs[3]);
                const label = await canvas.findAllByText('Manual');
                await expect(label.length).toBeGreaterThan(0);
            });

            await delay(500)

            await step('Click tab 4', async () => {
                const tabs = canvas.getAllByRole('tab');
                await userEvent.click(tabs[4]);
                const label = await canvas.findAllByText('Manual');
                await expect(label.length).toBeGreaterThan(0);
            });
        });
    })
}