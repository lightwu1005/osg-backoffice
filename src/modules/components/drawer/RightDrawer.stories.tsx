import {ProvidersWithoutNavigation} from "@/utils/Providers";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import RightDrawer from "@/modules/components/drawer/RightDrawer";
import {Box, Divider, Typography} from "@mui/material";
import { fn } from "@storybook/test";

const meta = {
    component: RightDrawer,
    tags: ["autodocs"],
    decorators: [
        (Story) => {
            return (
                <ProvidersWithoutNavigation>
                    <Story/>
                </ProvidersWithoutNavigation>
            )
        },
    ],
    args: {
        open: false,
        setOpen: fn()
    },
} satisfies Meta<typeof RightDrawer>;


export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        open: true,
        title: 'This is the title',
        subTitle: 'This is the subtitle',
        children: (<Box>
            <Box sx={{ px: '1rem' }}>
                <Typography>Here is the customized content</Typography>
            </Box>
            <Divider> Here is the customized divider </Divider>
            <Box sx={{ px: '1rem' }}>
                <Typography>Here is the customized content</Typography>
            </Box>
        </Box>)
    }
}