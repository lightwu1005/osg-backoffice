import {Args, Meta, StoryObj} from '@storybook/react';
import MarginLimitationHeader from "@/app/eventDetail/components/MarginLimitationHeader";
import {expect, within} from "@storybook/test";
import {EventStatus} from "@/services/@core/module/EventStatus";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const meta: Meta<typeof MarginLimitationHeader> = {
    component: MarginLimitationHeader,
    tags: ["autodocs"],
    argTypes: {
        startTime: { description: 'Match Start Time', control: 'number' },
        location: { description: 'Match Location', control: 'text' },
        status: {
            description: 'Match status',
            control: {
                type: 'number',
                min: 0,
                max: 3
            }
        },
    }
} as Meta<typeof MarginLimitationHeader>;
export default meta;

type Story = StoryObj<typeof meta>;

export const HeaderExample: Story = {
    args: {
        startTime: 1615961874000,
        location: 'USA',
        status: EventStatus.IN_PROGRESS,
    }, play: wrapWithLoadingCheck(async ({canvasElement, args, step } : { canvasElement: HTMLElement, args: Args, step: StepFunction }) => {
        const canvas = within(canvasElement);

        await step('check title', async () => {
            const title = canvas.getByText('Margin & Limitation');
            await expect(title).toBeInTheDocument();
        });

        await step('check sub title', async () => {
            const subTitle = canvas.getByText('Control Market’s Odds');
            await expect(subTitle).toBeInTheDocument();
        });

        await step('check start time label', async () => {
            const timeIcon = canvas.getByTestId('AccessTimeIcon');
            await expect(timeIcon).toBeInTheDocument();
        });

        await step('check location', async () => {
            const placeIcon = canvas.getByTestId('PlaceIcon');
            await expect(placeIcon).toBeInTheDocument();
            const locationText = canvas.getByText(args.location);
            await expect(locationText).toBeInTheDocument();
        });

        await step('check status chip', async () => {
            const statusChip = canvasElement.querySelector('.MuiChip-label');
            await expect(statusChip).toBeInTheDocument();
            await expect(statusChip).toHaveTextContent(statusChip!.textContent!);
        });
    })
};