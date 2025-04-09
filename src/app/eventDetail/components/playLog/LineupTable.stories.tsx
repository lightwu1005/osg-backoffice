import type {Meta, StoryObj} from "@storybook/react";
import LineupTable from "@/app/eventDetail/components/playLog/LineupTable";
import {Stack} from "@mui/material";
import React from "react";
import {TeamLineupsInfo} from "@/services/@core/module/ResponseDataModels";
import {mockLineupsData} from "@/data/mockData/event/MockPlayLogData";
import {ProvidersWithoutNavigation} from "@/utils/Providers";

const meta = {
    component: LineupTable,
    tags: ["autodocs"],
    decorators: [(Story) => (
        <ProvidersWithoutNavigation>
            <Story/>
        </ProvidersWithoutNavigation>
    )],
} satisfies Meta<typeof LineupTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        type: 'home',
        players: mockLineupsData.home.players as TeamLineupsInfo[],
        substitutes: mockLineupsData.home.substitutes as TeamLineupsInfo[]
    }
}
export const HomeAndAway: Story = {
    args: {
        players: [],
        substitutes: []
    },
    render: (args) => {
        return <Stack direction={'row'} gap={4}>
            <LineupTable type={'home'} players={mockLineupsData.home.players as TeamLineupsInfo[]}
                         substitutes={mockLineupsData.home.substitutes as TeamLineupsInfo[]}/>
            <LineupTable type={'away'} players={mockLineupsData.away.players as TeamLineupsInfo[]}
                         substitutes={mockLineupsData.away.substitutes as TeamLineupsInfo[]}/>
        </Stack>
    },
}