import { Meta, StoryObj } from '@storybook/react';
import {MatchStatusChip} from "@/modules/components/chip/MatchStatusChip";
import {EventStatus} from "@/services/@core/module/EventStatus";

const meta: Meta<typeof MatchStatusChip> = {
    component: MatchStatusChip,
    tags: ["autodocs"],
    argTypes: {
        status: {
            description: 'Match status',
            control: {
                type: 'number',
                min: 0,
                max: 3
            }
        },
    }
} as Meta<typeof MatchStatusChip>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        status: EventStatus.NOT_STARTED_YET
    }
};