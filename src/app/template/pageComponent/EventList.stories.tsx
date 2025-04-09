import type {Meta, StoryObj} from "@storybook/react";
import {expect, within} from "@storybook/test";
import MockApi from "@/data/mockData/MockApi";
import EventListDialog from "@/app/template/pageComponent/EventList";
import React from "react";
import {Providers} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";

const {
    getApplyEvents
} = MockApi()

const meta = {
    component: EventListDialog,
    parameters: {
        layout: 'fullscreen',
        mockData: [
            getApplyEvents
        ],
        nextjs: {
            appDirectory: true,
        }
    },
    tags: [],
    argTypes: {},
    decorators: [
        (Story) => {
            return (
                <Providers>
                    <Story />
                </Providers>
            )
        },
    ]
} satisfies Meta<typeof EventListDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        open: true,
        setOpen: () => {},
        currentTemplate: { templateName: 'template1', eventNumber: '1000', eventType: 'inPlay', templateId:'1122334455'},
    },
    play: wrapWithLoadingCheck(async ({ canvasElement } : { canvasElement: HTMLElement }) => {

        const canvas = within(document.body);
        const searchField = canvas.getByLabelText('Search a location, league or events');
        await expect(searchField).toBeInTheDocument();

        const gridView = await canvas.findByRole('grid');
        await expect(gridView).toBeInTheDocument();
    })
}