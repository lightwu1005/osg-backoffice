import type { Meta, StoryObj } from '@storybook/react';
import {SingleInputDateRangePicker} from "@/modules/components/TextField";
import {daysShortType} from "@/modules/components/TextField/ShortcutsItems";

const meta: Meta<typeof SingleInputDateRangePicker> = {
    component: SingleInputDateRangePicker,
};

export default meta;
type Story = StoryObj<typeof SingleInputDateRangePicker>;

export const SingleInputDateRangePickerLabel: Story = {
    args: {
        label: 'SingleInputDateRangePicker',
        daysType:[
            daysShortType.today,
            daysShortType.tomorrow,
            daysShortType.thisWeek
        ]
    },
};

