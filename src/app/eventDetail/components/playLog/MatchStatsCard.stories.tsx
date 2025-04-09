import {Meta, StoryObj} from "@storybook/react";
import {expect, within} from "@storybook/test";
import MatchStatsCard from "@/app/eventDetail/components/playLog/MatchStatsCard";

const meta = {
    component: MatchStatsCard,
    parameters: {},
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof MatchStatsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const titleText = 'TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTEST';
const leftValue = 10;
const rightValue = 15;

export const Default: Story = {
    args: {
        title: titleText,
        leftValue: leftValue,
        rightValue: rightValue
    },
    render: (args) => <MatchStatsCard {...args}/>,
    play: async ({ canvasElement , step}) => {
        const canvas = within(document.body);


        await step('Check title label', async () => {
            const title = canvas.getByText(titleText)
            await expect(title).toBeInTheDocument();
        });

        await step('Check Left and right value', async () => {
            const left = canvas.getByText(leftValue);
            await expect(left).toBeInTheDocument();

            const right = canvas.getByText(rightValue);
            await expect(right).toBeInTheDocument();
        });
    }
}