import { Meta, StoryObj } from '@storybook/react';
import TimelineEvent from './TimelineEvent';

const meta: Meta<typeof TimelineEvent> = {
    component: TimelineEvent,
    tags: ["autodocs"],
    argTypes: {
        displayType: {
            control: 'radio',
            options: ['left', 'middle', 'right']
        }
    }
} as Meta<typeof TimelineEvent>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Home: Story = {
    args: {
        clockTime: 12356,
        systemTime: 1731981537423,
        displayType: 'left',
        detail: {
            name: 'Lineup - Conformed',
            description: 'Attack',
            periodName: '1st Half',
            periodTime: 1234,
            penaltyType: 'red',
            color: 'grey',
            isConfirmed: false
        }
    }
};

export const Away: Story = {
    args: {
        clockTime: 12356,
        systemTime: 1731981537423,
        displayType: 'right',
        detail: {
            name: 'Lineup - Conformed',
            description: 'Attack',
            periodName: '1st Half',
            periodTime: 1234,
            penaltyType: 'red',
            color: 'green',
            isConfirmed: true
        }
    }
};

export const MiddleType1: Story = {
    args: {
        clockTime: 12356,
        systemTime: 1731981537423,
        displayType: 'middle',
        detail: {
            name: 'YELLOW CARD RISK',
            penaltyType: 'yellow',
            isConfirmed: false
        }
    }
};

export const MiddleType2: Story = {
    args: {
        clockTime: 12356,
        systemTime: 1731981537423,
        displayType: 'middle',
        detail: {
            name: '#2 Comment - Confirmed',
            description: 'Weather: sun',
            isConfirmed: false
        }
    }
};

