import type {Meta, StoryObj} from '@storybook/react';
import {
    ComeFromPage,
    MemoizedTemplateSummaryForm,
} from "@/app/eventDetail/components/pageComponent/TemplateSummaryForm";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {
    mockTemplateSummaryUsedModelData,
    mockTestTemplateSummaryUsedModelData
} from "@/data/mockData/template/MockTemplateList";

const meta = {
    component: MemoizedTemplateSummaryForm,
    parameters: {
        layout: 'fullscreen',
    },
    tags: [],
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
} satisfies Meta<typeof MemoizedTemplateSummaryForm>;

export default meta
type Story = StoryObj<typeof meta>;

export const NoneSummaryConflict: Story = {
    args: {
        comeFromPage: ComeFromPage.AllMarketSetting,
        adjustable: true,
        preValue: mockTemplateSummaryUsedModelData,
        refValue: mockTestTemplateSummaryUsedModelData,
        eventIds: []
    },render: (args) => <MemoizedTemplateSummaryForm {...args} />
}

export const SummaryConflict: Story = {
    args: {
        comeFromPage: ComeFromPage.AllMarketSetting,
        adjustable: true,
        preValue: mockTemplateSummaryUsedModelData,
        refValue: mockTemplateSummaryUsedModelData,
        eventIds: []
    },render: (args) => <MemoizedTemplateSummaryForm {...args} />
}