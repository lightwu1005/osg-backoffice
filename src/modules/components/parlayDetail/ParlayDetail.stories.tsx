import type {Meta, StoryObj} from "@storybook/react";
import {expect, waitFor, within} from "@storybook/test";
import ParlayDetailDialog from "@/modules/components/parlayDetail/ParlayDetail";
import {EventStatus} from "@/services/@core/module/EventStatus";
import {BetPartLegsModel} from "@/services/@core/module/ResponseDataModels";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";

const meta = {
    component: ParlayDetailDialog,
    argTypes: {},
    decorators: [
        (Story) => {
            return (
                <ProvidersWithoutNavigation>
                    <Story />
                </ProvidersWithoutNavigation>
            )
        },
    ]
} satisfies Meta<typeof ParlayDetailDialog>;

const generateRandomArray = (): BetPartLegsModel[] => {
    const eventStatuses = [EventStatus.IN_PROGRESS, EventStatus.FINISHED, EventStatus.CANCELLED];
    const result: BetPartLegsModel[] = [];

    for (let i = 1; i <= Math.floor(Math.random() * 20); i++) {
        const randomStatus = eventStatuses[Math.floor(Math.random() * eventStatuses.length)];
        const id = i.toString()
        result.push({
            leagueName: `league ${id}`,
            eventName: `event ${id}`,
            marketName: `market ${id}`,
            eventStatus: randomStatus,
            eventTime: new Date().getTime(),
            betId: `betId ${id}`,
            betName: `betName ${id}`,
            eventId: `event ${id}`,
            providerName: `provider ${id}`,
            sportName: "Soccer",
            sportId: "123456",
            leagueId: "987654",
            marketId: "24680",
            line: "3.5",
            odds: 1.56,
            status: "Win",
            isMostBalance: true,
            eventType: "preMatch",
            participants: [
                {
                    "id": "1234567890",
                    "name": "Lakers",
                    "score": 23,
                    "type": "team",
                    "isHome": true,
                },
                {
                    "id": "1234567891",
                    "name": "Warriors",
                    "score": 33,
                    "type": "team",
                    "isHome": false,
                }
            ]
        });
    }

    return result;
};

export default meta
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        open: true,
        setOpen: () => {
        },
        parlayId: "randomLegs",
        betAmount: 100,
        legs: generateRandomArray(),
        device: 'Android',
        maxPayout: 200
    },
    play: async ({canvasElement, args}) => {
        const canvas = within(document.body);
        await waitFor(() => {
            const parlayId = canvas.getByText(args.parlayId);
            expect(parlayId).toBeInTheDocument();
            const leg = canvas.getByText(`${args.legs.length} Leg`);
            expect(leg).toBeInTheDocument();
            const device = canvas.getByText(args.device);
            expect(device).toBeInTheDocument();
            const table = canvas.getByTestId('table');
            expect(table).toBeInTheDocument();
        })

    }
}