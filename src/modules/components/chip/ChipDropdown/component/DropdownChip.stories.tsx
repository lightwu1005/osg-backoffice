import {Meta, StoryObj} from "@storybook/react";
import MockApi from "@/data/mockData/MockApi";
import {expect, fn, userEvent, within} from "@storybook/test";
import {DropdownChip} from "@/modules/components/chip/ChipDropdown/component/DropdownChip";
import {DropdownChipViewModel} from "@/modules/components/chip/ChipDropdown/domain/DropdownChipViewModel";
import {delay} from "@/utils/tools";
import React from "react";
import {Box} from "@mui/material";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";

const {
    getRiskGroupsWithRandomData
} = MockApi();

const meta = {
    component: DropdownChip,
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
    ],
    args: {
        onChange: fn()
    }
} satisfies Meta<typeof DropdownChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        ViewModel: DropdownChipViewModel,
        label: 'Risk Level Group',
        multiple: false,
        currentValues: [
            {
                id: 'id_0', name: 'fake_risk_0', data: {
                    riskId: 'id_0',
                    riskName: 'fake_risk_0',
                    riskColor: 'red',
                    punterNumber: 1,
                    tags: []
                }
            },
        ],
    }
}


export const SingleSelection: Story = {
    args: {
        ViewModel: DropdownChipViewModel,
        label: 'Risk Level Group',
        multiple: false,
        currentValues: [
            {
                id: 'id_0', name: 'fake_risk_0', data: {
                    riskId: 'id_0',
                    riskName: 'fake_risk_0',
                    riskColor: 'red',
                    punterNumber: 1,
                    tags: []
                }
            },
        ],
        // onChange: handleOnChange
    },
    render: (args) => (<Box>
        <DropdownChip {...args}/>
    </Box>),
//    render: (args) => <DropdownChip {...args}/>,
    play: wrapWithLoadingCheck(async ({canvasElement}: { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);
        const delayTime = 500;

        const chip = canvas.getByRole('button');
        await expect(chip).toBeInTheDocument();
        await userEvent.click(chip);

        await delay(delayTime);

        const option = document.getElementsByClassName('MuiMenuItem-root')[1];
        await userEvent.click(option);

        await delay(delayTime);

        const updateChip = canvas.getByRole('button');
        await expect(updateChip).toHaveTextContent(option.textContent as string);
    })
}
