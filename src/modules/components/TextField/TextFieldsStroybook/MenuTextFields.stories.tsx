import type { Meta, StoryObj } from '@storybook/react';
import {MenuTextField} from "@/modules/components/TextField";

const meta: Meta<typeof MenuTextField> = {
    component: MenuTextField,
};

export default meta;
type Story = StoryObj<typeof MenuTextField>;

export const MenuTextFieldLabel: Story = {
    args: {
        label: 'MenuTextField',
        options: ['Location 1', 'Location 2', 'Location 3']
    },
};
