import {Meta, StoryObj} from "@storybook/react";
import SimpleContentDialog from "@/modules/components/dialog/SimpleContentDialog";
import {expect, userEvent, within} from "@storybook/test";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";

const meta: Meta<typeof SimpleContentDialog> = {
    component: SimpleContentDialog,
    decorators: [
        (Story) => {
            return (
                <ProvidersWithoutNavigation>
                    <Story/>
                </ProvidersWithoutNavigation>
            )
        },
    ]
} as Meta<typeof SimpleContentDialog>;
export default meta;

type Story = StoryObj<typeof meta>;

const title = 'Description'
const content = 'Login Account, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

export const Default: Story = {
    args: {
        title: title,
        content: content,
        open: true,
        setOpen: (value) => {
        }
    }
}

export const CheckContentAndCloseDialog: Story = {
    args: {
        title: title,
        content: content,
        open: true,
        setOpen: (value) => {
        }
    },
    play: wrapWithLoadingCheck(async () => {
        const canvas = within(document.body);
        const dialogTitle = document.body.querySelector('.MuiDialogTitle-root');
        await expect(dialogTitle).toBeInTheDocument()
        const dialogContent = document.body.querySelector('.MuiDialogContent-root');
        await expect(dialogContent).toBeInTheDocument()
        const closeButton = await canvas.findByText('Close')
        await expect(closeButton).toBeInTheDocument()

        setTimeout(() => {
            userEvent.click(closeButton)
        }, 1000)
    })
}