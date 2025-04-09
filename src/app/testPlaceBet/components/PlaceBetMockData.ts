
import {PlaceBetData} from "@/app/testPlaceBet/domain/useTestPlaceBetViewModel";

export const mockBetData: PlaceBetData = {
    sportsId: '1',
    punterAccount: '1',
    stack: 0,
    betType: 'SINGLE',
    parts: [
        {
            partNo: 1,
            eventId: '1234',
            oddsId: '9876',
            odds: 1.5,
            oddsType: "inPlay",
            line: '1.5'
        },
        {
            partNo: 2,
            eventId: '2345',
            oddsId: '8765',
            odds: 1.05,
            oddsType: "preMatch",
            line: '2.5'
        }
    ]
}