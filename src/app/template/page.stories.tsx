import type {Meta, StoryObj} from "@storybook/react";
import {expect, userEvent, within} from "@storybook/test";
import MockApi from "@/data/mockData/MockApi";
import Page from "@/app/template/page";
import store, {setRole} from "@/modules/common/IdentityRedux";
import React from "react";
import {RoleType} from "@/services/@core/module/Enum";
import {Providers} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const {
    sportsCategories,
    getTemplates,
    getApplyEvents
} = MockApi()

const meta = {
    component: Page,
    parameters: {
        layout: 'fullscreen',
        mockData: [
            sportsCategories,
            getTemplates,
            getApplyEvents
        ],
        nextjs: {
            appDirectory: true,
            navigation: {
                pathname: '/template'
            }
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
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <Providers>
            <Page {...args} />
        </Providers>
    ),
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        store.dispatch(setRole(RoleType.ChannelAdmin));

        const canvas = within(canvasElement);

        const searchField = canvas.getByLabelText('Template Name', { selector: 'input' });
        await expect(searchField).toBeInTheDocument();

        const roleItem = canvas.getByLabelText('Setting Level', { selector: 'input' });
        await expect(roleItem).toBeInTheDocument();

        const statusItem = canvas.getByLabelText('Sport', { selector: 'input' });
        await expect(statusItem).toBeInTheDocument();

        const gridView = await canvas.findByRole('grid');
        await expect(gridView).toBeInTheDocument();

        await step('click checkbox', async () => {
            const rows = within(gridView).getAllByRole('row');
            const checkbox = await within(rows[0]).findByRole('checkbox')
            await expect(checkbox).toBeInTheDocument();
            await userEvent.click(checkbox,{
                delay: 500
            })
        });
    })
}