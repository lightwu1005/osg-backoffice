import {Meta, StoryObj} from "@storybook/react";
import MockApi from "@/data/mockData/MockApi";
import {expect, within} from "@storybook/test";
import store, {setRole} from "@/modules/common/IdentityRedux"
import {MemoryRouter} from "react-router-dom";
import React from "react";
import {RoleType} from "@/services/@core/module/Enum";
import {AddMemberDialog} from "./AddMemberDialog";
import {Providers} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const {
    getRiskMembers,
    updateRiskGroupApply
} = MockApi()

const meta = {
    component: AddMemberDialog,
    parameters: {
        layout: 'fullscreen',
        mockData: [
            getRiskMembers,
            updateRiskGroupApply
        ],
        nextjs: {
            appDirectory: true,
        }
    },
    decorators: [
        (Story) => {
            store.dispatch(setRole(RoleType.BetsAdmin));
            return (
                <Providers>
                    <MemoryRouter initialEntries={['/']}>
                        <Story/>
                    </MemoryRouter>
                </Providers>
            )
        },
    ],
    tags: [],
    argTypes: {},
} satisfies Meta<typeof AddMemberDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        open: true,
        setOpen: () => {
        },
        riskId: '123456',
    },
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const canvas = within(document.body);
        const dropdownButton = canvas.getByLabelText('dropdown');
        await expect(dropdownButton).toBeInTheDocument();

        const publishButton = await canvas.findByTestId('publishButton')
        await expect(publishButton).toBeInTheDocument();
    })
}
