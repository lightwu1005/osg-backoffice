import {Meta, StoryObj} from "@storybook/react";
import MockApi from "@/data/mockData/MockApi";
import {expect, userEvent, within} from "@storybook/test";
import store, {setRole} from "@/modules/common/IdentityRedux"
import {MemoryRouter} from "react-router-dom";
import React from "react";
import {RoleType} from "@/services/@core/module/Enum";
import RiskGroupFormDialog from "@/app/member/components/pageComponent/RiskGroupFormDialog";
import {delay} from "@/utils/tools";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const {
    getTagsWithRandomData,
    getRiskGroupDetail,
} = MockApi()

const meta = {
    component: RiskGroupFormDialog,
    parameters: {
        layout: 'fullscreen',
        mockData: [
            getTagsWithRandomData,
            getRiskGroupDetail
        ],
    },
    decorators: [
        (Story) => {
            store.dispatch(setRole(RoleType.BetsAdmin));
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
} satisfies Meta<typeof RiskGroupFormDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EditRisk: Story = {
    args: {
        open: true,
        setOpen: () => {},
        riskId: '1',
    },
    play: wrapWithLoadingCheck(async ({step}: {step: StepFunction}) => {
        const canvas = within(document.body)
        const dialog = canvas.getByRole('dialog');
        await expect(dialog).toBeInTheDocument()

        await step('Update Risk Group', async () => {
            const riskName = canvas.getAllByRole('textbox')[0];
            await delay(300)
            await expect(riskName).toHaveValue('Level 1');
            await userEvent.clear(riskName);
            await delay(300)
            await userEvent.type(riskName, 'Level 2');
            await expect(riskName).toHaveValue('Level 2');
            await delay(300)
        });

        await step('Check Publish Button Enable', async () => {
            const publishButton = canvas.getAllByRole('button')[2];
            await expect(publishButton).toBeEnabled();
            await delay(300)
        });
    })
}

export const AddRisk: Story = {
    args: {
        open: true,
        setOpen: () => {},
    },
    play: wrapWithLoadingCheck(async ({step}: {step: StepFunction}) => {
        const canvas = within(document.body)
        const dialog = canvas.getByRole('dialog');
        await expect(dialog).toBeInTheDocument()

        await step('Add Risk Group', async () => {
            const riskName = canvas.getAllByRole('textbox')[0];
            await delay(300)
            await userEvent.type(riskName, 'Level 9');
            await delay(300)
            const minimumBet = canvas.getAllByRole('spinbutton')[0];
            await delay(300)
            await userEvent.type(minimumBet, "100");
            await delay(300)
            const maximumBet = canvas.getAllByRole('spinbutton')[1];
            await delay(300)
            await userEvent.type(maximumBet, "1000");
            await delay(300)
            const successRate = canvas.getAllByRole('spinbutton')[2];
            await delay(300)
            await userEvent.type(successRate, "50");
            await delay(300)
            const days = canvas.getAllByRole('spinbutton')[3];
            await delay(300)
            await userEvent.type(days, "5");
            await delay(300)
            const oddsDecrease = canvas.getAllByRole('spinbutton')[4];
            await delay(300)
            await userEvent.type(oddsDecrease, "10");
            await delay(300)
            const dailyLimit = canvas.getAllByRole('spinbutton')[5];
            await delay(300)
            await userEvent.type(dailyLimit, "1000");
            await delay(300)
            const dailySecondLimit = canvas.getAllByRole('spinbutton')[6];
            await delay(300)
            await userEvent.type(dailySecondLimit, "1000");
            await delay(300)
            const popupIndicator = document.getElementById('color-selector');
            await expect(popupIndicator).toBeInTheDocument();
            await userEvent.click(popupIndicator);
            await delay(300)
            await userEvent.keyboard('{arrowdown}');
            await delay(300)
            await userEvent.keyboard('{enter}');
            await delay(300)
            const tagField = canvas.getAllByRole('combobox')[2];
            await delay(300)
            await userEvent.click(tagField);
            await delay(300)
            await userEvent.keyboard('{arrowdown}');
            await delay(300)
            await userEvent.keyboard('{enter}');
            await delay(300)
            await userEvent.keyboard(`{esc}`);
            await delay(300)
        });

        await step('Check Publish Button Enable', async () => {
            const publishButton = canvas.getByTestId('publishButton');
            await expect(publishButton).toBeEnabled();
            await delay(300)
            await userEvent.click(publishButton);
        });
    })
}