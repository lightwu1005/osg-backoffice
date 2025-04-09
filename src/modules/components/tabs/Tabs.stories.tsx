import type {Meta, StoryObj} from '@storybook/react';
import Tabs, {TabProps} from "@/modules/components/tabs/Tabs";
import React from "react";
import {SportsBasketballRounded, SportsSoccerRounded} from "@mui/icons-material";
import {Typography} from "@mui/material";
import {expect, userEvent, within} from "@storybook/test";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const DefaultTabs = () => {
    const labels: TabProps[] = [
        {
            icon: <SportsSoccerRounded/>,
            label: "SOCCER"
        },
        {
            icon: <SportsBasketballRounded/>,
            label: "BASKETBALL"
        }
    ]
    return (
        <div style={{width: '100vw'}}>
            <Tabs labels={labels}>
                <Typography variant="h3" gutterBottom>Content SOCCER</Typography>
                <Typography variant="h3" gutterBottom>Content BASKETBALL</Typography>
            </Tabs>
        </div>
    )
}

const meta = {
    component: DefaultTabs,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof DefaultTabs>;

export default meta
type Story = StoryObj<typeof meta>;

export const TabsForm: Story = {
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const canvas = within(canvasElement);
        const soccerTab = canvas.getByText('SOCCER');
        const basketballTab = canvas.getByText('BASKETBALL');

        await step('BASKETBALL click', async () => {
            await userEvent.click(basketballTab, {
                delay: 1000
            });
        });

        await expect(canvas.getByText('Content BASKETBALL')).toBeInTheDocument();
        await step('SOCCER click', async () => {
            await userEvent.click(soccerTab, {
                delay: 1000
            });
        });
        await expect(canvas.getByText('Content SOCCER')).toBeInTheDocument();
    })
};

