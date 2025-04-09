import type {Meta, StoryObj} from '@storybook/react';
import {SearchTextField} from "@/modules/components/TextField";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";

const meta: Meta<typeof SearchTextField> = {
    component: SearchTextField,
    decorators: [
        (Story) => {
            return (
                <ProvidersWithoutNavigation>
                    <Story/>
                </ProvidersWithoutNavigation>
            )
        },
    ]
};

export default meta;
type Story = StoryObj<typeof SearchTextField>;

export const SearchTextFieldLabel: Story = {
    args: {
        label: 'SearchTextField',
    },
};

