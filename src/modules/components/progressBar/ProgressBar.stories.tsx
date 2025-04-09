import {Meta, StoryObj} from "@storybook/react";
import ProgressBar from "@/modules/components/progressBar/ProgressBar";
import {ProvidersWithoutNavigation} from "@/utils/Providers";

const meta: Meta<typeof ProgressBar> = {
    component: ProgressBar,
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <ProvidersWithoutNavigation>
                <Story/>
            </ProvidersWithoutNavigation>
        )
    ]
} as Meta<typeof ProgressBar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        data: {
            "accept": 1,
            "acceptAmount": 0,
            "pending": 0,
            "pendingAmount": 0
        }
    }
};

export const Horizontal: Story = {
    args: {
        layout: 'horizontal',
        data: {
            "accept": 10000,
            "acceptAmount": 1836493,
            "pending": 1200,
            "pendingAmount": 34829
        }
    }
};