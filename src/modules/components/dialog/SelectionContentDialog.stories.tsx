import {Meta, StoryObj} from "@storybook/react";
import {TagSelectionViewModel} from "@/app/member/domain/TagSelectionViewModel";
import SelectionContentDialog from "@/modules/components/dialog/SelectionContentDialog";
import MockApi from "@/data/mockData/MockApi";
import {expect, userEvent, waitFor, within} from "@storybook/test";
import {delay} from "@/utils/tools";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";

const {
    getRiskGroupsWithRandomData
} = MockApi();

const meta = {
    component: SelectionContentDialog,
    parameters: {
        mockData: [
            getRiskGroupsWithRandomData
        ],
    },
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
} satisfies Meta<typeof SelectionContentDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const onValueChange = (value: any) => {
    console.log('onValueChange: ', value)
}

export const Default: Story = {
    args: {
        title: 'Risk Level Group Title',
        label: 'Risk Level Group',
        setOpen: () => {
        },
        onClose: () => {
        },
        onValueChange: onValueChange,
        open: true,
        ViewModel: TagSelectionViewModel,
    },
    render: (args) => <SelectionContentDialog {...args}/>,
    play: async ({canvasElement, step}) => {
        const canvas = within(document.body);

        await step('Click on option', async () => {
            const inputField = await canvas.findByLabelText('Risk Level Group');
            await expect(inputField).toBeInTheDocument();

            const saveButton = await canvas.findByRole('button', {name: 'SAVE'});
            await expect(saveButton).toBeInTheDocument();
            await expect(saveButton).toBeDisabled();

            await delay(500)
            await userEvent.click(inputField);

            const listbox = await canvas.findByRole('listbox');
            await expect(listbox).toBeInTheDocument();
            const rows = listbox.querySelectorAll('li');
            await userEvent.click(rows[0]);

            await waitFor(async () => {
                const selectedTag = await canvas.findByDisplayValue(rows[0].textContent!);
                await expect(selectedTag).toBeInTheDocument();
            }, {timeout: 1000});

            await expect(saveButton).toBeEnabled();
        });

    }
}