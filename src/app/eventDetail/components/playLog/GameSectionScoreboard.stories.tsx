import { Meta, StoryObj } from '@storybook/react'
import GameSectionScoreboard from "@/app/eventDetail/components/playLog/GameSectionScoreboard";

const meta: Meta<typeof GameSectionScoreboard> = {
    component: GameSectionScoreboard,
    tags: ["autodocs"],
} as Meta<typeof GameSectionScoreboard>

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultGameSectionScoreboard: Story = {
    args: {
        homeName: 'Jiaku',
        awayName: 'Android 18',
        periods:[
            {
                "name": "P1",
                "home": "21",
                "away": "10",
                "sequence": 0
            },
            {
                "name": "P2",
                "home": "16",
                "away": "18",
                "sequence": 1
            },
            {
                "name": "P3",
                "home": "",
                "away": "",
                "sequence": 2
            },
            {
                "name": "P4",
                "home": "",
                "away": "",
                "sequence": 3
            },
            {
                "name": "OT",
                "home": "",
                "away": "",
                "sequence": 4
            },
            {
                "name": "TOT",
                "home": "37",
                "away": "28",
                "sequence": 5
            }
        ]
    }
}