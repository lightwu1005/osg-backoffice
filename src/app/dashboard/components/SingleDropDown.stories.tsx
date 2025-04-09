import type {Meta, StoryObj} from "@storybook/react";
import SingleDropDown from "@/app/dashboard/components/SingleDropDown";


const meta = {
    component: SingleDropDown,
    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'centered',
    },
} satisfies Meta<typeof SingleDropDown>;


export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        list: ["Single", "Parlay"]
    }
}