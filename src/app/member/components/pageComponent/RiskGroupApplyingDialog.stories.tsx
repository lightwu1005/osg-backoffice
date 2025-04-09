import {Meta, StoryObj} from "@storybook/react";
import MockApi from "@/data/mockData/MockApi";
import store, {setRole} from "@/modules/common/IdentityRedux"
import {MemoryRouter} from "react-router-dom";
import React from "react";
import {RoleType} from "@/services/@core/module/Enum";
import RiskGroupApplyingDialog from "@/app/member/components/pageComponent/RiskGroupApplyingDialog";
import {expect, userEvent, within} from "@storybook/test";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const {
    getRiskGroupsApplyingPunters,
    updateRiskGroupApply
} = MockApi()

const meta = {
    component: RiskGroupApplyingDialog,
    parameters: {
        layout: 'fullscreen',
        mockData: [
            getRiskGroupsApplyingPunters,
            updateRiskGroupApply
        ],
    },
    decorators: [
        (Story) => {
            store.dispatch(setRole(RoleType.ChannelAdmin));
            return (
                <ProvidersWithoutNavigation>
                    <MemoryRouter initialEntries={['/']}>
                        <Story/>
                    </MemoryRouter>
                </ProvidersWithoutNavigation>
            )
        },
    ],
    tags: [],
    argTypes: {},
} satisfies Meta<typeof RiskGroupApplyingDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        open: true,
        setOpen: () => {
        },
        riskId: '123456',
        riskName: 'Level 8'
    }
}

export const ClickAddMember: Story = {
    args: {
        open: true,
        setOpen: () => {
        },
        riskId: '123456',
        riskName: 'Level 8'
    },
    play: wrapWithLoadingCheck(async ({step} : {step: StepFunction}) => {
        const canvas = within(document.body)
        const actionButton = canvas.getByTestId('actions');
        await expect(actionButton).toBeInTheDocument()
        await step('action click', async () => {
            await userEvent.click(actionButton, {
                delay: 500
            });
        });
        const menuItem = document.getElementsByClassName('MuiMenuItem-root')[0];
        await step(`click action Add}`, async () => {
            await userEvent.click(menuItem, {
                delay: 500
            });
        });
    })
}
