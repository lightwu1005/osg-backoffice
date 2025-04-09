import {Meta, StoryObj} from "@storybook/react";
import QuickAction from "@/modules/components/eventTable/QuickAction";
import {expect, within} from "@storybook/test";
import {Providers} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const meta: Meta<typeof QuickAction> = {
    component: QuickAction,
    parameters: {
        nextjs: {
            appDirectory: true
        }
    },
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <Providers>
                <Story />
            </Providers>
        )
    ]
} as Meta<typeof QuickAction>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        pinStatus: false,
        editable: true,
        templateStatus: false,
        suspendStatus: false,
        closeStatus: false,
        payoutStatus: false,
        isCollapsed: false,
    },
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const canvas = within(canvasElement);
        const buttons = canvas.getAllByRole('button');
        await expect(buttons).toHaveLength(6);
    })
};

export const NonEditable: Story = {
    args: {
        pinStatus: false,
        editable: false,
        templateStatus: false,
        suspendStatus: false,
        closeStatus: false,
        payoutStatus: false,
        isCollapsed: false,
    },
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const canvas = within(canvasElement);
        const buttons = canvas.getAllByRole('button');
        await expect(buttons).toHaveLength(2);
    })
};