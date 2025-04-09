import type {Meta, StoryObj} from "@storybook/react";
import MemoizedMarketsAlertDialog, {MarketTableColumns} from "@/app/eventDetail/components/MarketsTableDialog";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";


const meta = {
    component: MemoizedMarketsAlertDialog,
    tags: ["autodocs"],
    decorators: [
        (Story) => {
            return (
                <ProvidersWithoutNavigation>
                    <Story/>
                </ProvidersWithoutNavigation>
            )
        },
    ]
} satisfies Meta<typeof MemoizedMarketsAlertDialog>;


export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        open: true,
        setOpen: () => {
        },
        title: 'market(500)',
        rows: Array.from({length: 500}, (_, index) => ({
            id: `market${index + 1}`,
            name: `Market ${index + 1}`
        })),
        actions: [
            {
                type: 'confirm',
                text: 'Close',
                onClick: () => console.log('Close action triggered')
            }
        ],
        columns: MarketTableColumns
    }
}