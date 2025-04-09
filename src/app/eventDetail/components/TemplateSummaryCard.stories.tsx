import type {Meta, StoryObj} from "@storybook/react";
import TemplateSummaryCard from "@/app/eventDetail/components/TemplateSummaryCard";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";

const meta = {
    component: TemplateSummaryCard,
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
} satisfies Meta<typeof TemplateSummaryCard>;


export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        items: [
            {
                title: 'Time limit (Second)',
                preValue: '1',
                refValue: '1',
                shouldShowWarningSettingBar: false,
                isHeader: true
            },
            {
                title: 'Maximum Odds',
                preValue: '20,000',
                refValue: '10,000',
                shouldShowWarningSettingBar: true,
                tips: 'Your previous setting is different please confirm the value',
                isHeader: false
            }
        ]
    }
}