import {Meta, StoryObj} from "@storybook/react";
import {ColorPicker} from "@/modules/components/colorSelector/ColorPicker";
import {ProvidersWithoutNavigation} from "@/utils/Providers";

const meta: Meta<typeof ColorPicker> = {
    component: ColorPicker,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <ProvidersWithoutNavigation>
                <Story/>
            </ProvidersWithoutNavigation>
        )
    ]
} as Meta<typeof ColorPicker>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        defaultColor: '#ff0000',
        open: true,
        setOpen: (value) => {
            console.log('setOpen', value);
        },
        onSave: (color: string) => {
            console.log('onSave', color);
        }
    }
}