import type {Args, Meta, StoryObj} from "@storybook/react";
import OddsAdjustmentTable from "@/app/eventList/components/pageComponent/OddsAdjustmentTable";
import {expect, within} from "@storybook/test";
import {persistor} from "@/modules/common/IdentityRedux";
import {PersistGate} from "redux-persist/integration/react";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const meta = {
    component: OddsAdjustmentTable,
    decorators: [
        (Story) => (
            <ProvidersWithoutNavigation>
                <PersistGate persistor={persistor}>
                    <Story/>
                </PersistGate>
            </ProvidersWithoutNavigation>
        )
    ],
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof OddsAdjustmentTable>;

export default meta
type Story = StoryObj<typeof meta>;

const handlePriceChanged = (betId: string, price: number, originalPrice: number) => {
    console.log(betId, price, originalPrice)
}
export const OverUnder: Story = {
    args: {
        marketName: 'Over/Under',
        odds: [
            {
                baseLine: "13.5",
                marketId: "56789",
                bets: [
                    {
                        betId: "0eec7164-306f-4f20-87b6-dbe760c0a408",
                        betName: "Over",
                        line: "13.5",
                        price: 1.9802,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    },
                    {
                        betId: "75fd7db3-9c10-4695-a03c-cf7abd4c1e4f",
                        betName: "Under",
                        line: "13.5",
                        price: 1.9802,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'CLOSE'
                    }
                ]
            },
            {
                baseLine: "14.5",
                marketId: "98951",
                bets: [
                    {
                        betId: "185b5418-b9ae-470e-9642-171490819dd1",
                        betName: "Over",
                        line: "14.5",
                        price: 1.0000,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    },
                    {
                        betId: "4bfd1c6d-8295-4448-a5df-d414fe2aba1d",
                        betName: "Under",
                        line: "14.5",
                        price: 1.0000,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    }
                ]
            },
            {
                baseLine: "15.5",
                marketId: "457823",
                bets: [
                    {
                        betId: "917a1e3b-020b-4f08-bd26-855a541c0dcd",
                        betName: "Over",
                        line: "15.5",
                        price: 1.0000,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    },
                    {
                        betId: "ed8c1a8b-8a06-4fdd-a864-0032fd9a08a6",
                        betName: "Under",
                        line: "15.5",
                        price: 1.0000,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    }
                ]
            }
        ],
        handlePriceChanged: handlePriceChanged
    }, play: wrapWithLoadingCheck(async ({canvasElement, args, step} : { canvasElement: HTMLElement, args: Args, step: StepFunction }) => {
        const canvas = within(canvasElement);
        for (let item of args.odds) {
            if (item.baseLine) {
                const baseLine = canvas.getAllByText(item.baseLine)[0];
                await expect(baseLine).toBeInTheDocument();
            }
        }
    })
}

export const Scores: Story = {
    args: {
        marketName: 'Correct Score',
        odds: [
            {
                baseLine: '',
                marketId: "123",
                bets: [
                    {
                        betId: "bc04489d-9b10-4f5c-ad96-2f939920d677",
                        betName: "1 And Both Teams To Score",
                        line: '1',
                        price: 5.1876,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    },
                    {
                        betId: "4bc4f884-eb0c-47c6-bceb-2b8bfdeff5fe",
                        betName: "1 To Nil",
                        line: '1',
                        price: 2.3208,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    },
                    {
                        betId: "0577614f-78cb-4e08-804c-21ead9330d15",
                        betName: "2 And Both Teams To Score",
                        line: '1',
                        price: 22.2964,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'CLOSE'
                    },
                    {
                        betId: "fc5274e6-8552-4ae1-8499-c6d8172a670f",
                        betName: "2 To Nil",
                        line: '1',
                        price: 12.3322,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    },
                    {
                        betId: "ee843373-3374-4e36-b573-725436e0dfde",
                        betName: "Both Teams Not To Score",
                        line: '1',
                        price: 8.2273,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    },
                    {
                        betId: "6a10030c-f515-4580-8fd1-d8266ff81806",
                        betName: "Both Teams To Score And X",
                        line: '1',
                        price: 7.2011,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    }
                ]
            },
            {
                baseLine: '',
                marketId: '456',
                bets: [
                    {
                        betId: "3a7be220-6e00-4a78-94d9-5d828afdaa5e",
                        betName: "1 And Both Teams To Score",
                        line: '2',
                        price: 11.9173,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    },
                    {
                        betId: "58d484d5-5b38-4ede-8c58-0f7051e44d8e",
                        betName: "1 To Nil",
                        line: '2',
                        price: 10.9016,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    },
                    {
                        betId: "030ea939-9954-45d1-b896-0690303a1c54",
                        betName: "2 And Both Teams To Score",
                        line: '2',
                        price: 3.9572,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    },
                    {
                        betId: "4a2068d2-b93d-4335-98a7-313cd488b21e",
                        betName: "2 To Nil",
                        line: '2',
                        price: 2.9415,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    },
                    {
                        betId: "8eea5d1d-d561-49f7-ac49-0cd1e61a8e7f",
                        betName: "Both Teams Not To Score",
                        line: '2',
                        price: 12.2154,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    },
                    {
                        betId: "37061f29-b533-4266-a6aa-179bda167e2a",
                        betName: "Both Teams To Score And X",
                        line: '2',
                        price: 6.2567,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    }
                ]
            }
        ],
        handlePriceChanged: handlePriceChanged
    }
}

export const HomeNeitherAway: Story = {
    args: {
        marketName: 'Home / Neither / Away',
        odds: [
            {
                baseLine: "3.0",
                marketId: '888',
                bets: [
                    {
                        betId: "a2d8647c-1ed9-4340-b9e9-7eb52f8d3403",
                        betName: "1",
                        line: "3.0",
                        price: 3.0288,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    },
                    {
                        betId: "c9d569c6-2f35-4dca-9a0e-29a15b27a96a",
                        betName: "2",
                        line: "3.0",
                        price: 1.5419,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    },
                    {
                        betId: "a0384cc1-bce8-4003-8a71-72ee51084e2f",
                        betName: "Neither",
                        line: "3.0",
                        price: 31.9403,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    }
                ]
            },
            {
                baseLine: "5.0",
                marketId: '777',
                bets: [
                    {
                        betId: "8ee62fd3-b05f-4768-8005-bac59055808c",
                        betName: "1",
                        line: "5.0",
                        price: 4.1460,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    },
                    {
                        betId: "39388353-7969-42a2-b3d1-6b1b0b8ac7eb",
                        betName: "2",
                        line: "5.0",
                        price: 1.7855,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    },
                    {
                        betId: "03584689-2eba-4da7-b51a-a85dbc075787",
                        betName: "Neither",
                        line: "5.0",
                        price: 4.7905,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    }
                ]
            },
            {
                baseLine: "7.0",
                marketId: '666',
                bets: [
                    {
                        betId: "49e56f33-6715-47fa-8765-33c3d61f6891",
                        betName: "1",
                        line: "7.0",
                        price: 8.2602,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    },
                    {
                        betId: "ae8c801d-2d72-47ed-81d5-414523ad816a",
                        betName: "2",
                        line: "7.0",
                        price: 2.7534,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    },
                    {
                        betId: "d59e0154-8869-4d39-b479-a033ea8616ce",
                        betName: "Neither",
                        line: "7.0",
                        price: 1.9020,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    }
                ]
            },
            {
                baseLine: "9.0",
                marketId: '555',
                bets: [
                    {
                        betId: "961490ed-d539-4b26-83ff-18ab9c134aff",
                        betName: "1",
                        line: "9.0",
                        price: 22.9805,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    },
                    {
                        betId: "e4238233-b8b0-458f-8704-5ba3d926f28d",
                        betName: "2",
                        line: "9.0",
                        price: 5.4715,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    },
                    {
                        betId: "1a9b52fc-43ec-4fd0-9c91-32ddf49f1131",
                        betName: "Neither",
                        line: "9.0",
                        price: 1.2760,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    }
                ]
            },
            {
                baseLine: "13.5",
                marketId: "56789",
                bets: [
                    {
                        betId: "0eec7164-306f-4f20-87b6-dbe760c0a408",
                        betName: "Over",
                        line: "13.5",
                        price: 1.9802,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    },
                    {
                        betId: "75fd7db3-9c10-4695-a03c-cf7abd4c1e4f",
                        betName: "Under",
                        line: "13.5",
                        price: 1.9802,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    }
                ]
            },
            {
                baseLine: "14.5",
                marketId: "98951",
                bets: [
                    {
                        betId: "185b5418-b9ae-470e-9642-171490819dd1",
                        betName: "Over",
                        line: "14.5",
                        price: 1.0000,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    },
                    {
                        betId: "4bfd1c6d-8295-4448-a5df-d414fe2aba1d",
                        betName: "Under",
                        line: "14.5",
                        price: 1.0000,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    }
                ]
            }
        ],
        handlePriceChanged: handlePriceChanged
    }
}

export const Goal: Story = {
    args: {
        marketName: 'Goal',
        odds: [
            {
                baseLine: '',
                marketId: '097',
                bets: [
                    {
                        betId: "ae912779-d0cb-4b24-9f8f-d4446c3ea8d0",
                        betName: "1",
                        line: '',
                        price: 3.2539,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    },
                    {
                        betId: "bcc080ab-8b5f-42be-93a8-3c8a2c0c5ef9",
                        betName: "2",
                        line: '',
                        price: 10.9397,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    },
                    {
                        betId: "00f5e089-d88b-4ea8-92f2-20d07f5a78b8",
                        betName: "3 Or More",
                        line: '',
                        price: 34.7828,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    },
                    {
                        betId: "4e1158bc-5706-4380-ba8e-41ad7460f6d6",
                        betName: "No Goal",
                        line: '',
                        price: 1.7167,
                        acceptedAmount: 24680,
                        acceptedNumber: 1357,
                        adjustedNumber: 0.045,
                        originalPrice: 1.5,
                        betStatus: 'OPEN'
                    }
                ]
            }
        ],
        handlePriceChanged: handlePriceChanged
    }
}

