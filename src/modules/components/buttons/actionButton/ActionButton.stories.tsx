import type {Args, Meta, StoryObj} from '@storybook/react';
import React from "react";
import ActionButton, {ActionButtonProps} from "@/modules/components/buttons/actionButton/ActionButton";
import {Avatar, Grid, Typography} from "@mui/material";
import {expect, userEvent, within} from "@storybook/test";
import {deepOrange} from "@mui/material/colors";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const DefaultActionButton: React.FC<ActionButtonProps> = (props) => {
    return (
        <div style={{width: '100vw', height: 'auto'}}>
            <ActionButton {...props} />
            <Typography id='content' variant="h3" gutterBottom></Typography>
        </div>
    )
}

const meta = {
    component: DefaultActionButton,
    tags: ['autodocs']
} satisfies Meta<typeof DefaultActionButton>;

export default meta
type Story = StoryObj<typeof meta>;

export const ActionButtonForm: Story = {
    args: {
        label: "ACTIONS",
        list: [
            {
                key: 0,
                value: "item 0"
            },
            {
                key: 1,
                value: "item 1",
            },
            {
                key: 2,
                value: "item 2",
                disabled: true,
                tips: "item 2 tips"
            }
        ],
        onItemClick: (item, index) => {
            // @ts-ignore
            document.getElementById('content')["textContent"] = `selected index ${index}`
        }
    },
    play: wrapWithLoadingCheck(async ({args, canvasElement, step}: { canvasElement: HTMLElement, args: Args, step: StepFunction }) => {
        const {list} = args
        const canvas = within(canvasElement);
        const actionButton = canvas.getByText('ACTIONS');

        for (const item of list) {
            await step('action click', async () => {
                await userEvent.click(actionButton, {
                    delay: 800
                });
            });

            const index = list.indexOf(item);
            const menuItem = document.getElementsByClassName('MuiMenuItem-root')[index];

            await step(`menu item click ${index}`, async () => {
                if (item.disabled) {
                    const hasMuiDisabledClass = menuItem.classList.contains('Mui-disabled');
                    const hasAriaDisabledAttr = menuItem.getAttribute('aria-disabled') === 'true';
                    const pass = hasMuiDisabledClass || hasAriaDisabledAttr;
                    await expect(pass).toEqual(true)
                } else {
                    await userEvent.click(menuItem, {
                        delay: 500
                    });
                    await expect(canvas.getByText(`selected index ${index}`)).toBeInTheDocument();
                }
            });
        }
    })
};

const UserLabel = () => {
    return <Grid container direction="row" alignItems="center" spacing={3}>
        <Grid item>
            <Typography>John</Typography>
        </Grid>
        <Grid item>
            <Avatar sx={{bgcolor: deepOrange[500]}}>J</Avatar>
        </Grid>
    </Grid>
}
export const UserActionForm: Story = {
    args: {
        label: <UserLabel/>,
        list: [{
            key: 0,
            value: "User Center"
        }, {
            key: 1,
            value: "Logout"
        }],
        onItemClick: (item, index) => {
            // @ts-ignore
            document.getElementById('content')["textContent"] = `selected index ${index}`
        }
    },
    play: wrapWithLoadingCheck(async ({args, canvasElement, step}: { canvasElement: HTMLElement, args: Args, step: StepFunction }) => {
        const canvas = within(canvasElement);
        const actionButton = canvas.getByText('John');

        await step('user click', async () => {
            await userEvent.click(actionButton, {
                delay: 800
            });
        });

    })
};