import {Meta, StoryObj} from '@storybook/react';
import {userEvent} from "@storybook/test";
import AlertDialog from "@/modules/components/dialog/AlertDialog";
import {ProvidersWithoutNavigation} from "@/utils/Providers";

const meta: Meta<typeof AlertDialog> = {
    component: AlertDialog,
    decorators: [
        (Story) => (
            <ProvidersWithoutNavigation>
                <Story />
            </ProvidersWithoutNavigation>
        )
    ]
} as Meta<typeof AlertDialog>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Confirm: Story = {
    args: {
        title: 'Odds Feeding Sources Changing',
        content: 'The setting will impact this event’s odd feed; please click “Confirm” to do the confirmation. Or click “Cancel” back to the last step.',
        actions: [
            {
                type: 'cancel',
                text: 'cancel',
                onClick: async () => {
                    await userEvent.click();
                }
            },
            {
                type: 'confirm',
                text: 'confirm',
                autoFocus: true,
                onClick: async () => {
                    await userEvent.click();
                }
            },
        ],
        open: true,
        setOpen: (value) =>  {}
    }
};

export const Warning: Story = {
    args: {
        title: 'Suspended Channel',
        content: 'This action will cease the provision of all markets on this channel. Please click \'Confirm\' to complete the action.',
        actions: [
            {
                type: 'cancel',
                text: 'cancel',
                onClick: async () => {
                    await userEvent.click();
                }
            },
            {
                type: 'warning',
                text: 'warning',
                autoFocus: true,
                onClick: async () => {
                    await userEvent.click();
                }
            },
        ],
        open: true,
        setOpen: (value) =>  {}
    }
};