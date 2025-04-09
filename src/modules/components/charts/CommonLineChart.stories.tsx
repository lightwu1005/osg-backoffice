import {type Args, Meta, StoryObj} from "@storybook/react";
import CommonLineChart, {getTitleDisplay} from "@/modules/components/charts/CommonLineChart";
import {expect, within} from "@storybook/test";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const meta = {
    component: CommonLineChart,
    parameters: {},
    tags: ["autodocs"],
    argTypes: {},
    decorators: [
        (Story) => {
            return (
                <ProvidersWithoutNavigation>
                    <Story/>
                </ProvidersWithoutNavigation>
            )
        },
    ]
} satisfies Meta<typeof CommonLineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        dataSets: [
            {label: '00:00', value: 100},
            {label: '02:00', value: 577},
            {label: '04:00', value: 960},
            {label: '06:00', value: 1112},
            {label: '08:00', value: 1488},
            {label: '10:00', value: 1395},
            {label: '12:00', value: 333},
            {label: '14:00', value: 560},
            {label: '16:00', value: 1230},
            {label: '18:00', value: 834},
            {label: '20:00', value: 1245},
            {label: '22:00', value: 233},
            {label: '24:00', value: 656},
        ],
        valueType: 'money',
        area: true,
        showMark: false
    },
    play: wrapWithLoadingCheck(async ({args, canvasElement, step}: { canvasElement: HTMLElement, args: Args, step: StepFunction }) => {
        const canvas = within(canvasElement)
        const titleDisplayText = getTitleDisplay(args.valueType, args.dataSets.reduce((a : Args, b: Args) => a + b.value, 0), args.title)
        const title = canvas.getByText(titleDisplayText);
        await expect(title).toBeInTheDocument();

        for (const dataSet of args.dataSets) {
            const label = canvas.getByText(dataSet.label);
            await expect(label).toBeInTheDocument();
        }
    })
}

export const NoData: Story = {
    args: {
        dataSets: [],
        valueType: 'money',
        area: true,
        showMark: false
    }
}