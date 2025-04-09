import {Meta, StoryObj} from "@storybook/react";
import {Box} from "@mui/material";
import TimeClockChip from "./TimeClockChip";

const meta: Meta<typeof TimeClockChip> = {
    component: TimeClockChip,
    tags: ["autodocs"],
    argTypes: {}
} as Meta<typeof TimeClockChip>;
export default meta;

type Story = StoryObj<typeof meta>;

export const WithHours: Story = {
    args: {
        seconds: 3665
    }, render: (args) => {
        return (
            <Box sx={{padding: 8, backgroundColor: '#F0F4F8'}}>
                <TimeClockChip seconds={args.seconds}/>
            </Box>
        )
    }
};

export const WithMinutes: Story = {
    args: {
        seconds: 123
    }, render: (args) => {
        return (
            <Box sx={{padding: 8, backgroundColor: '#F0F4F8'}}>
                <TimeClockChip seconds={args.seconds}/>
            </Box>
        )
    }
};

export const WithSeconds: Story = {
    args: {
        seconds: 55
    }, render: (args) => {
        return (
            <Box sx={{padding: 8, backgroundColor: '#F0F4F8'}}>
                <TimeClockChip seconds={args.seconds}/>
            </Box>
        )
    }
};