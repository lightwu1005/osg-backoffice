import {Args, Meta, StoryObj} from "@storybook/react";
import SwitchListButton, {SwitchListButtonProps} from "@/modules/components/buttons/switchListButton/SwitchListButton";
import {expect, userEvent, within} from "@storybook/test";
import React from "react";
import {action} from '@storybook/addon-actions';
import {adminColumns} from "@/app/dashboard/components/adminColumns";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const meta = {
    component: SwitchListButton,
    parameters: {},
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof SwitchListButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const dataKey = 'headerName'

const handleSwitchChanges = (checkedLabels: Record<string, any>[]) => {
    console.log('Switched:', checkedLabels);
    action('handleSwitchChanges')(JSON.stringify(checkedLabels, null, 2));
};

const SwitchListButtonComponent = (props: SwitchListButtonProps) => {
    const intl = useIntl();
    const fakeData = adminColumns(intl, LocalizationFunctionType.Common)
    return <SwitchListButton {...props} listLabels={fakeData} onSwitchChanges={handleSwitchChanges} />;
};

export const Default: Story = {
    args: {
        buttonIcon: null,
        buttonText: 'Switch List',
        listHeaderText: 'At least need to select 3',
        dataKey: dataKey,
        minSelected: 3,
        listLabels: []
    },
    render: (args) => {
        return (
            <ProvidersWithoutNavigation>
                <SwitchListButtonComponent {...args} />
            </ProvidersWithoutNavigation>
        )
    },
    play: wrapWithLoadingCheck(async ({canvasElement, args, step} : { canvasElement: HTMLElement, args: Args, step: StepFunction }) => {
        const canvas = within(document.body);

        await step('Button Click', async () => {
            const button = canvas.getByTestId('SwitchListButton');
            await expect(button).toBeInTheDocument();
            await userEvent.click(button);

            const popover = canvas.getByTestId('SwitchListPopover');
            await expect(popover).toBeInTheDocument();
        });

        await step('List Display', async () => {
            const headerText = canvas.getByText('At least need to select 3');
            await expect(headerText).toBeInTheDocument();

            const fakeLabels = args.listLabels.map((item: Record<string, any>) => item[dataKey]);
            fakeLabels.forEach((label: string) => {
                const item = canvas.getByText(label ?? '');
                expect(item).toBeInTheDocument();
            });

            const allSwitches = canvas.getAllByRole('checkbox');
            allSwitches.forEach(switchItem => {
                expect(switchItem).toBeChecked();
            })
        });

        await step('Test Switch Click', async () => {
            const allSwitches = canvas.getAllByRole('checkbox');
            const option2 = allSwitches[1];
            await userEvent.click(option2);
            await expect(option2).not.toBeChecked();
        });

        await step('Test Cannot Uncheck 4th', async () => {
            const allSwitches = canvas.getAllByRole('checkbox');
            const option1 = allSwitches[0];
            await userEvent.click(option1);
            await expect(option1).toBeChecked();
        });

        await step('Test Reset Button', async () => {
            const resetButton = canvas.getByText('Reset');
            await userEvent.click(resetButton);

            const allSwitches = canvas.getAllByRole('checkbox');
            allSwitches.forEach(switchItem => {
                expect(switchItem).toBeChecked();
            })
        });
    })
}