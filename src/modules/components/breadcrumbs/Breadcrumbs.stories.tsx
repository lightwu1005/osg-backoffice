import type {Args, Meta, StoryObj} from '@storybook/react';
import React from "react";
import {within} from "@storybook/test";
import Breadcrumbs from "@/modules/components/breadcrumbs/Breadcrumbs";
import {Stack} from "@mui/material";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";


const meta = {
    component: Breadcrumbs,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => {
            return (
                <ProvidersWithoutNavigation>
                    <Story/>
                </ProvidersWithoutNavigation>
            )
        },
    ]
} satisfies Meta<typeof Breadcrumbs>;

export default meta
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        return <Stack spacing={'0.125rem'}>
            <Breadcrumbs path={'/dashboard/1/2/3'}/>
            <Breadcrumbs path={'dashboard/1/2/3'}/>
            <Breadcrumbs path={'/1/2/3'}/>
            <Breadcrumbs path={'1/2/3'}/>
        </Stack>
    },
    play: wrapWithLoadingCheck(async ({args, canvasElement, step}: { canvasElement: HTMLElement, args: Args, step: StepFunction }) => {
        const canvas = within(canvasElement);
    })
};
