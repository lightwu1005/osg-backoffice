import {Meta, StoryObj} from "@storybook/react";
import MatchStatsBar from "@/app/eventDetail/components/playLog/MatchStatsBar";
import {within} from "@storybook/test";

const meta = {
    component: MatchStatsBar,
    parameters: {},
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof MatchStatsBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        value: 75,
        maxValue: 800,
        barColor: '#C41C1C',
        direction: 'right'
    },
    render: (args) => <MatchStatsBar {...args}/>,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
    }
}