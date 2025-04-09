import {Meta, StoryObj} from '@storybook/react';
import NotificationSnackbar from "@/modules/components/snackbar/NotificationSnackbar";
import {GlobalController} from "@/modules/common/GlobalController";
import {Box, Button} from "@mui/material";
import {expect, userEvent, within} from "@storybook/test";
import MultipleNotificationSnackbar from "@/modules/components/snackbar/MultipleNotificationSnackbar";
import React from "react";
import {Providers} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const meta: Meta = {
    component: NotificationSnackbar,
    argTypes: {
        open: {control: 'boolean'},
        title: {control: 'text'},
        content: {control: 'text'},
        horizontal: {control: 'select', options: ['left', 'center', 'right']},
        vertical: {control: 'select', options: ['top', 'bottom']},
    },
    decorators: [(Story) => (
        <Providers withNavigation={true}>
            <Story/>
        </Providers>
    )],
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        open: true,
        title: 'Odds above Minimum Difference',
        content: 'The match “West Ham United (peja) VS Olympique Marseille (Jekos)” odds above minimum different',
        vertical: 'top',
        horizontal: 'right',
    },
    render: (args) => (
        <NotificationSnackbar
            id={'1'}
            open={args.open}
            title={args.title}
            content={args.content}
            position={{
                horizontal: args.horizontal,
                vertical: args.vertical,
            }}
            setOpen={() => {
            }}/>
    ),
};
export const Multiple: Story = {
    render: (args) => {
        const globalController = GlobalController.getInstance()
        return <Box>
            <Button onClick={() => {
                const random = Math.random()
                globalController.dispatch(GlobalController.KEY_NOTIFICATION_SNACKBAR, {
                    id: random,
                    title: 'Notification',
                    content: `RECEIVED ${random}`
                })
            }
            }>send</Button>
            <MultipleNotificationSnackbar/>
        </Box>
    },
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const canvas = within(canvasElement);
        const canvasBody = within(document.body);
        await step('send notification', async () => {
            const sendButton = canvas.getByText('send');
            await userEvent.click(sendButton);

            const notification = canvasBody.getByText('Notification');
            await expect(notification).toBeInTheDocument();
        });
    })
};