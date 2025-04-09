import {type Args, Meta, StoryObj} from "@storybook/react";
import DropdownInput from "@/modules/components/DropdownInput/DropdownInput";
import {userEvent, within} from "@storybook/test";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const meta: Meta<typeof DropdownInput> = {
    component: DropdownInput,
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
} as Meta<typeof DropdownInput>;
export default meta;

type Story = StoryObj<typeof meta>;
const menuItems = ['Account', 'Bet ID', 'Event', 'IP'];
export const Default: Story = {
    args: {
        searchOptions: menuItems,
        onSearch: (type, value) => console.log(`Searching for ${value} in ${type}`)
    },
    play: wrapWithLoadingCheck(async ({args, canvasElement, step}: { canvasElement: HTMLElement, args: Args, step: StepFunction }) => {
        const canvas = within(canvasElement);

        const dropdownButton = canvas.getByLabelText('dropdown');

        // const bodyCanvas = within(document.body);

        async function selectItem(index: number) {
            await step('type click', async () => {
                await userEvent.click(dropdownButton, {
                    delay: 50
                });
            });
            const menuItem = document.getElementsByClassName('MuiMenuItem-root')[index];

            await step(`item click ${index}`, async () => {
                await userEvent.click(menuItem, {
                    delay: 150
                });
            });
        }

        for (let i = 0; i < menuItems.length; i++) {
            const nextIndex = (i + 1) % menuItems.length
            await selectItem(nextIndex)
        }
    })
};