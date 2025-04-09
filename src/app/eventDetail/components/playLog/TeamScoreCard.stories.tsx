import type {Meta, StoryObj} from "@storybook/react";
import TeamScoreCard from "@/app/eventDetail/components/playLog/TeamScoreCard";
import {ProvidersWithoutNavigation} from "@/utils/Providers";


const meta = {
    component: TeamScoreCard,
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <ProvidersWithoutNavigation>
                <Story />
            </ProvidersWithoutNavigation>
        )
    ]
} satisfies Meta<typeof TeamScoreCard>;


export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        leagueName: 'Eclectic Eclipse',
        gameState: 'First Half',
        displayType: 'team',
        home: {
            teamName: 'Omiya Ardija Ventus',
            clubName: 'A-LEAGUE',
            score: 37
        },
        away: {
            teamName: 'Juventus FC',
            clubName: 'Premier League',
            score: 28
        }
    }
}