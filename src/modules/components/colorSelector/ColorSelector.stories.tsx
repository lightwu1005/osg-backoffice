import {Meta, StoryObj} from "@storybook/react";
import ColorSelector from "@/modules/components/colorSelector/ColorSelector";
import {expect, userEvent} from "@storybook/test";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const meta: Meta<typeof ColorSelector> = {
    component: ColorSelector,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <ProvidersWithoutNavigation>
                <Story />
            </ProvidersWithoutNavigation>
        )
    ]
} as Meta<typeof ColorSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {}

export const WithDefaultColor: Story = {
    args: {
        defaultColor: '#EA9A3E'
    }
}

export const UsingCustomColorToDefault: Story = {
    args: {
        defaultColor: '#625c3b'
    }
}

export const UITest: Story = {
    args: {
        defaultColor: '#625c3b'
    },
    play: wrapWithLoadingCheck(async ({ step } : { step: StepFunction }) => {
        const popupIndicator = document.getElementById('color-selector');
        await expect(popupIndicator).toBeInTheDocument();

        // open color picker for custom color
        await step('Open color picker for custom color', async () => {
            await userEvent.click(popupIndicator);
            const customButton = document.getElementById('edit-color-button-#625c3b');
            await expect(customButton).toBeInTheDocument();
            await userEvent.click(customButton);

            // Check if the color picker is displayed
            const colorPicker = document.querySelector('.react-colorful__pointer');
            await expect(colorPicker).toBeInTheDocument();
        });
    })
}