import {Meta, StoryObj} from "@storybook/react";
import {QueryableSelectTextField} from "@/modules/components/TextField";
import MockApi from "@/data/mockData/MockApi";
import {TagSelectionViewModel} from "@/app/member/domain/TagSelectionViewModel";
import {expect, fireEvent, userEvent, waitFor, within} from "@storybook/test";
import {delay} from "@/utils/tools";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";

const {
    getRiskGroupsWithRandomData
} = MockApi();

const meta = {
    component: QueryableSelectTextField,
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
} satisfies Meta<typeof QueryableSelectTextField>;

export default meta;
type Story = StoryObj<typeof meta>;

const handleOnChange = (value: any) => {
    console.log('handleOnChange: ', value)
}

export const SingleSelection: Story = {
    args: {
        ViewModel: TagSelectionViewModel,
        label: 'Risk Level Group',
        multiple: false,
        currentValues: [
            {id: 'id_0', name: 'fake_risk_0'}
        ],
        onChange: handleOnChange
    },
    render: (args) => <QueryableSelectTextField {...args}/>,
    play: async ({canvasElement, step}) => {
        const canvas = within(document.body);
        const delayTime = 500

        await step('Scroll Down List', async () => {
            const inputField = await canvas.findByLabelText('Risk Level Group');
            await expect(inputField).toBeInTheDocument();

            await delay(delayTime)

            await userEvent.click(inputField);

            const listbox = await canvas.findByRole('listbox');
            await expect(listbox).toBeInTheDocument();
            for (let i = 0; i <= listbox.scrollHeight; i += 100) {
                await fireEvent.scroll(listbox, {target: {scrollTop: i}});
                await new Promise(resolve => setTimeout(resolve, 200));
            }

            const rows = listbox.querySelectorAll('li');
            await expect(rows.length).toBe(100);
        });

        await step('Check Input Field', async () => {
            const listbox = await canvas.findByRole('listbox');
            await expect(listbox).toBeInTheDocument();

            // random select between 0 and 100
            const rows = listbox.querySelectorAll('li');
            const randomIndex = Math.floor(Math.random() * 100);
            const randomRow = rows[randomIndex];
            await userEvent.click(randomRow);

            await waitFor(async () => {
                const selectedTag = await canvas.findByDisplayValue(randomRow.textContent!);
                await expect(selectedTag).toBeInTheDocument();
            }, {timeout: 1000});
        });
    }
}

export const MultipleSelection: Story = {
    args: {
        ViewModel: TagSelectionViewModel,
        label: 'Risk Level Group',
        multiple: true,
        limitTags: 3,
        initialSelectedItems: [
            {id: 'id_0', name: 'fake_risk_0'}
        ],
        onChange: handleOnChange
    },
    render: (args) => <QueryableSelectTextField {...args}/>,
    play: async ({canvasElement, step}) => {
        const canvas = within(document.body);
        const inputField = await canvas.findByLabelText('Risk Level Group');
        await expect(inputField).toBeInTheDocument();

        await step('Scroll Down List', async () => {
            await userEvent.click(inputField);

            const listbox = await canvas.findByRole('listbox');
            await expect(listbox).toBeInTheDocument();
            for (let i = 0; i <= listbox.scrollHeight; i += 120) {
                await fireEvent.scroll(listbox, {target: {scrollTop: i}});
                await new Promise(resolve => setTimeout(resolve, 200));
            }

            const rows = listbox.querySelectorAll('li');
            await expect(rows.length).toBe(100);
        });

        await step('Check Input Field', async () => {
            const listbox = await canvas.findByRole('listbox');
            await expect(listbox).toBeInTheDocument();

            const rows = listbox.querySelectorAll('li');
            const selectedIndices: number[] = [];

            while (selectedIndices.length < 5) {
                const randomIndex = Math.floor(Math.random() * rows.length);
                if (!selectedIndices.includes(randomIndex)) {
                    selectedIndices.push(randomIndex);
                }
            }

            for (const index of selectedIndices) {
                let randomRow = rows[index];
                randomRow.scrollIntoView({behavior: 'instant', block: 'center'});
                await new Promise((resolve) => setTimeout(resolve, 300));
                await waitFor(() => {
                    randomRow = listbox.querySelectorAll('li')[index];
                    expect(randomRow).toBeInTheDocument();
                    expect(randomRow).toBeVisible();
                }, {timeout: 1000});

                await userEvent.click(randomRow);
            }

            await userEvent.click(canvasElement);

            await waitFor(() => {
                const selectedTags = inputField.parentElement!.querySelectorAll('.MuiChip-root');
                expect(selectedTags.length).toBe(3); // because of limitTags=3
                selectedTags.forEach((tag, index) => {
                    expect(tag).toBeInTheDocument();
                });
            }, {timeout: 2000});
        });
    }
}