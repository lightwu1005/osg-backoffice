import {ProvidersWithoutNavigation} from "@/utils/Providers";
import type {Meta, StoryObj} from "@storybook/react";
import React, {useEffect, useState} from "react";
import MarketConfigForm, {MarketConfigFormProps} from "@/app/template/components/marketConfigForm/MarketConfigForm";
import {mockTemplateNewMarkets} from "@/data/mockData/template/MockTemplateList";
import {GridRowModel} from "@mui/x-data-grid-pro";
import {expect, within} from "@storybook/test";

const meta = {
    component: MarketConfigForm,
    parameters: {
        mockData: [
        ]
    },
    decorators: [
        (Story) => {
            return (
                <ProvidersWithoutNavigation>
                    <Story />
                </ProvidersWithoutNavigation>
            )
        },
    ]
} satisfies Meta<typeof MarketConfigForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const MarketConfigFormWithState = (args: MarketConfigFormProps) => {
    const [rows, setRows] = useState(mockTemplateNewMarkets);

    const processRowUpdate = async (update: GridRowModel) => {
        console.log('processRowUpdate 1', update);
        setRows((prevRows) => {
            return prevRows.map((row) => {
                if (row.marketId === update.marketId) {
                    return {...row, ...update};
                }
                return row;
            })
        })
    };

    useEffect(() => {
        console.log('newRos', rows);
    }, [rows]);

    return (
        <MarketConfigForm
            {...args}
            rows={rows}
            processRowUpdate={processRowUpdate}
        />
    );
};

export const Default: Story = {
    args: {
        rows: mockTemplateNewMarkets,
        processRowUpdate: async (update: GridRowModel) => {
            // actually wont play this function
            console.log('processRowUpdate 2', update);
        }
    },
    render: (args) => <MarketConfigFormWithState {...args} />,
    play: async ({canvasElement, step}) => {
        const canvas = within(canvasElement);

        const gridView = await canvas.findByRole('grid');
        await expect(gridView).toBeInTheDocument();
    }
};

export const ViewOnly: Story = {
    args: {
        rows: mockTemplateNewMarkets,
        toolbarEnabled: false,
        checkboxSelection: false,
        viewOnly: true,
        processRowUpdate: async (update: GridRowModel) => {
            // actually wont play this function
            console.log('processRowUpdate 2', update);
        }
    },
    render: (args) => <MarketConfigFormWithState {...args} />,
    play: async ({canvasElement, step}) => {
        const canvas = within(canvasElement);

        const gridView = await canvas.findByRole('grid');
        await expect(gridView).toBeInTheDocument();
    }
};