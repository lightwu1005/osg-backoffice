import {Meta, StoryObj} from "@storybook/react";
import ConfirmationDialog from "@/modules/components/dialog/ConfirmationDialog";
import {expect, userEvent, within} from "@storybook/test";
import SimpleBetNumberCard from "@/app/betSlip/components/SimpleBetNumberCard";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";

const meta = {
    component: ConfirmationDialog,
    parameters: {},
    tags: ["autodocs"],
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
} satisfies Meta<typeof ConfirmationDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const handleClose = (value?: string) => {
    console.log('value: ', value);
}

const handleCheckboxOnCheck = (value: boolean) => {
    console.log('check: ', value);
}

const setOpen = (value: boolean) => {
    console.log('setOpen: ', value)
}

export const Default: Story = {
    args: {
        id: 'testDialog',
        title: 'Reject Confirmation',
        subTitle: 'Please select the reason for rejection',
        contentCard: <SimpleBetNumberCard singleBets={1} parlayBets={2}/>,
        options: [
            "Changes in league or participants",
            "Changes in match start time",
            "Match interruption",
            "Handicap error",
            "Illegal betting",
            "Other"
        ],
        open: true,
        setOpen: setOpen,
        checkBox: {
            title: 'Send private message to member',
            checkBoxOnCheck: handleCheckboxOnCheck
        },
        onClose: handleClose
    },
    render: (args) => <ConfirmationDialog {...args}/>,
    play: async ({canvasElement, step}) => {
        const canvas = within(document.body);

        await step('Check titles', async () => {
            const title = await canvas.findByText('Reject Confirmation');
            await expect(title).toBeInTheDocument();

            const subtitle = await canvas.findByText('Please select the reason for rejection');
            await expect(subtitle).toBeInTheDocument();
        });

        await step('Check options', async () => {
            const options = await canvas.findAllByRole('radio');
            await expect(options).toHaveLength(6);

            options.forEach(radio => {
                userEvent.click(radio);
            });
        });

        await step('Check Input and button enable', async () => {
            const confirmButton = await canvas.findByText('Confirm');
            await expect(confirmButton).toBeInTheDocument();
            await expect(confirmButton).toBeDisabled();
            const input = await canvas.findByPlaceholderText('Write your comment ...');
            await expect(input).toBeInTheDocument();
            await userEvent.type(input, 'test comment');
            await expect(confirmButton).toBeEnabled();
        });

        await step('Check checkbox', async () => {
            const checkBox = await canvas.findByRole('checkbox');
            await expect(checkBox).toBeInTheDocument();
            await expect(checkBox).toBeChecked();
            await userEvent.click(checkBox);
            await expect(checkBox).not.toBeChecked();
        });
    }
}

export const SingleBets: Story = {
    args: {
        id: 'testDialog',
        title: 'Reject Confirmation',
        subTitle: 'Please select the reason for rejection',
        contentCard: <SimpleBetNumberCard singleBets={1} parlayBets={0}/>,
        options: [
            "Changes in league or participants",
            "Changes in match start time",
            "Match interruption",
            "Handicap error",
            "Illegal betting",
            "Other"
        ],
        open: true,
        setOpen: setOpen,
        checkBox: {
            title: 'Send private message to member',
            checkBoxOnCheck: handleCheckboxOnCheck
        },
        onClose: handleClose
    },
    render: (args) => <ConfirmationDialog {...args}/>,
}