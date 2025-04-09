import type {Meta, StoryObj} from "@storybook/react";
import {OddsBaseLinePrice} from "@/modules/components/NumberModifier/OddsBaseLinePrice";
import {Providers} from "@/utils/Providers";


const meta = {
    component: OddsBaseLinePrice,
    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <Providers>
                <Story/>
            </Providers>
        )
    ]
} satisfies Meta<typeof OddsBaseLinePrice>;


export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        odds: [{
            base: '3.5',
            price: '3.106'
        }, {
            price: '3.106'
        }]
    }
}

export const NoData: Story = {
    args: {}
}