import {Meta, StoryObj} from "@storybook/react";
import BetAmountFilter from "@/app/betSlip/components/NumberRangeTextField";
import {expect, userEvent, within} from "@storybook/test";
import {delay} from "@/utils/tools";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const meta = {
    component: BetAmountFilter,
    parameters: {},
    tags: ["autodocs"],
    argTypes: {},
    decorators: [
        (Story) => {
            return (
                <ProvidersWithoutNavigation>
                    <Story />
                </ProvidersWithoutNavigation>

            )
        },
    ]
} satisfies Meta<typeof BetAmountFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

const handleChanged = (condition: string, firstAmount: string, secondAmount?: string) => {
    console.log(`Condition: ${condition} \n FirstAmount: ${firstAmount} \n SecondAmount: ${secondAmount}`);
}

export const Default: Story = {
    args: {
        onChange: handleChanged
    }
}

export const CheckBetweenCondition: Story = {
    args: {
        onChange: handleChanged
    },
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const canvas = within(canvasElement);

        const betAmountField = canvas.getByTestId('bet-amount-filter');
        await userEvent.click(betAmountField)
        const conditionField = document.body.querySelector('.MuiSelect-select.MuiSelect-outlined');
        await userEvent.click(conditionField)
        await delay(500)
        const conditionOption = document.body.querySelector('#bet-amount-options-4');
        await userEvent.click(conditionOption)
        const maxAmountField = document.body.querySelector('.MuiInputBase-input.MuiOutlinedInput-input');
        await expect(maxAmountField).toBeInTheDocument()
    }),
}