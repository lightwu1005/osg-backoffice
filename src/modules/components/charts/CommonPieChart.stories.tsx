import {Args, Meta, StoryObj} from '@storybook/react';
import CommonPieChart, {ChartCondition} from "@/modules/components/charts/CommonPieChart";
import {Stack} from "@mui/material";
import {expect, within} from "@storybook/test";
import {InfoType} from "@/services/@core/module/Enum";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const meta: Meta<typeof CommonPieChart> = {
    component: CommonPieChart,
    tags: ["autodocs"],
    decorators: [
        (Story) => {
            return (
                <ProvidersWithoutNavigation>
                    <Story />
                </ProvidersWithoutNavigation>
            )
        },
    ]
} as Meta<typeof CommonPieChart>;
export default meta;

type Story = StoryObj<typeof meta>;

export const GeneralFormat: Story = {
    args: {
        data: [
            {value: 5000, label: 'Website'},
            {value: 7500, label: 'IOS'},
            {value: 12000, label: 'Android'},
            {value: 2750, label: 'Unknown'},
        ],
        centerLabel: 'Total'
    }, play: wrapWithLoadingCheck(async ({canvasElement, args, step} : { canvasElement: HTMLElement, args: Args, step: StepFunction }) => {
        const canvas = within(canvasElement);
        for (let item of args.data) {
            const label = canvas.getByText(item.label);
            await expect(label).toBeInTheDocument();
        }

        if (args.prefix) {
            const prefix = canvas.getByText(args.prefix);
            await expect(prefix).toBeInTheDocument();
        }

        const centerLabel = canvas.getByText(args.centerLabel);
        await expect(centerLabel).toBeInTheDocument();
    })
};

export const MoneyFormat: Story = {
    args: {
        data: [
            {value: 5123222, label: 'Win'},
            {value: 1032233, label: 'Loss'},
            {value: 1125851, label: 'Draw'},
        ],
        prefix: '$',
        centerLabel: 'Total Income'
    }
}

export const MoneyFormatWithPercentage: Story = {
    args: {
        data: [
            {value: 5122220, label: 'Unsettled'},
            {value: 1322330, label: 'Early Settled'},
            {value: 1121510, label: 'SettledSettled'},
        ],
        prefix: '$',
        showPercentageInTooltip: true,
        centerLabel: 'Total Slip Amount'
    }
}

const onDataSelected = (infoType: InfoType, data: ChartCondition) => {
    console.log('Chart data is ', infoType, data.infoLabel)
}

export const MultiplePieCharts: Story = {
    args: {
        data: [
            {value: 5000, label: 'IOS'},
            {value: 7500, label: 'Android'},
            {value: 12000, label: 'Web'},
            {value: 2750, label: 'Unknown'},
        ],
        centerLabel: 'Total'
    },
    render: (args) => (
        <Stack direction="row" width="100%" textAlign="center" spacing={2}>
            <CommonPieChart data={args.data} centerLabel={'A'} infoType={InfoType.Device}
                            onDataSelected={onDataSelected}/>
            <CommonPieChart data={args.data} centerLabel={'B'} infoType={InfoType.Device}
                            onDataSelected={onDataSelected}/>
            <CommonPieChart data={args.data} centerLabel={'C'} infoType={InfoType.Device}
                            onDataSelected={onDataSelected}/>
        </Stack>
    )
}

export const NoData: Story = {
    args: {
        data: []
    }
}
