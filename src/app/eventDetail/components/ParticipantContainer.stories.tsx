import {Meta, StoryObj} from "@storybook/react";
import ParticipantContainer from "@/app/eventDetail/components/ParticipantContainer";
import {getParticipants} from "@/data/mockData/event/MockEventRowData";
import {expect, within} from "@storybook/test";

const meta: Meta<typeof ParticipantContainer> = {
    component: ParticipantContainer,
    tags: ['autodocs']
} satisfies Meta<typeof ParticipantContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

const home = getParticipants[0]
const away = getParticipants[1]

export const Default: Story = {
    args: {
        home: {
            name: home.name,
            score: home.score,
            cards: home.cards
        },
        away: {
            name: away.name,
            score: away.score,
            cards: away.cards
        },
        periodName: '1st Half',
        duration: 45,
        switchToHomeTeam: true,
        switchToAwayTeam: true,
        isFixedToTop: false
    },
    play: async ({ canvasElement }) => {
        const data = getParticipants;
        const canvas = within(canvasElement);

        const scores = data.map(item => item.score)
        const scoreItem = canvas.getByTestId('score')
        for (const score of scores) {
            await expect(scoreItem).toHaveTextContent(`${score}`);
        }

        const names = data.map(item => item.name)
        const nameItems = canvas.getAllByTestId('participantName')
        names.forEach((title, index) => {
            expect(nameItems[index]).toHaveTextContent(title)
        })

        const cards = data.flatMap(item => item.cards)
        const cardItems = canvas.getAllByTestId('cardIcon')
        await expect(cardItems).toHaveLength(cards.length)
    }
}

export const WithCards: Story = {
    args: {
        home: {
            name: 'Home Team',
            score: 88,
            cards: [
                {
                    cardType: 'red',
                    cardCount: 2,
                },
                {
                    cardType: 'yellow',
                    cardCount: 1,
                }
            ]
        },
        away: {
            name: 'Away Team',
            score: 85,
            cards: [
                {
                    cardType: 'red',
                    cardCount: 2,
                },
                {
                    cardType: 'yellow',
                    cardCount: 1,
                }
            ]
        },
        periodName: '1st Half',
        duration: 45
    }

}

export const WithNoCards: Story = {
    args: {
        home: {
            name: 'Home Team',
            score: 22
        },
        away: {
            name: 'Away Team',
            score: 12
        },
        periodName: '2st Half',
        duration: 450
    }

}