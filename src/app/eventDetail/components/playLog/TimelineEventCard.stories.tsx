import { Meta, StoryObj } from '@storybook/react';
import TimelineEventCard from "@/app/eventDetail/components/playLog/TimelineEventCard";

const meta: Meta<typeof TimelineEventCard> = {
    component: TimelineEventCard,
    tags: ["autodocs"],
    argTypes: {
        penaltyType: {
            control: 'radio',
            options: [undefined, 'red', 'yellow']
        }
    }
} as Meta<typeof TimelineEventCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: 'Lineup - Conformed',
        description: 'Attack',
        periodName: '1st Half',
        periodTime: 1234,
        penaltyType: 'red',
        color: 'grey'
    }
};

export const OnlyName: Story = {
    args: {
        name: 'Lineup - Conformed',
        color: 'grey'
    }
};

export const WithPeriod: Story = {
    args: {
        name: 'Danger State',
        periodName: '1st Half',
        periodTime: 1234,
        color: 'brown'
    }
};

export const WithPeriodAndDescription: Story = {
    args: {
        name: 'Danger State',
        description: 'Attack',
        periodName: '1st Half',
        periodTime: 1234,
        color: 'green'
    }
};

export const WithState: Story = {
    args: {
        name: 'Danger State',
        description: 'Attack',
        periodName: '1st Half',
        periodTime: 1234,
        penaltyType: 'red',
        color: 'red'
    }
};