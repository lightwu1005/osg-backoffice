import MockApi from "@/data/mockData/MockApi";
import type {Meta, StoryObj} from "@storybook/react";
import ExportDialog from "@/app/betSlip/components/pageComponent/ExportDialog";
import {expect, userEvent, within} from "@storybook/test";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";

const {
    betSlipExport
} = MockApi()

const meta = {
    component: ExportDialog,
    parameters: {
        layout: 'fullscreen',
        mockData: [
            betSlipExport
        ]
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
} satisfies Meta<typeof ExportDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSubmit: Story = {
    args: {
        open: true,
        setOpen: (value) => {
        }
    }, play: wrapWithLoadingCheck(async ({canvasElement}: { canvasElement: HTMLElement }) => {
        const canvas = within(document.body);
        const dateField = canvas.getByPlaceholderText('YYYY/MM/DD – YYYY/MM/DD');
        await expect(dateField).toBeInTheDocument()

        const submitButton = canvas.getByTestId('export-button');
        await expect(submitButton).toBeEnabled()
    })
}

export const DisableSubmit: Story = {
    args: {
        open: true,
        setOpen: (value) => {
        }
    }, play: wrapWithLoadingCheck(async ({canvasElement}: { canvasElement: HTMLElement }) => {
        const canvas = within(document.body);
        const dateField = canvas.getByPlaceholderText('YYYY/MM/DD – YYYY/MM/DD');
        await expect(dateField).toBeInTheDocument()

        await userEvent.clear(dateField);

        const submitButton = canvas.getByTestId('export-button');
        await expect(submitButton).toBeDisabled()
    })
}