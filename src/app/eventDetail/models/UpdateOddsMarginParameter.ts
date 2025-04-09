
export interface UpdateOddsMarginParameter {
    eventId: string,
    marketId?: string,
    baseLineId?: string
    provider: string
    overrideMargin: number
    maxPayout: number
    minOdds: number
    maxOdds: number
    alertDifference: number
    alignMaxDifference: number
    effectiveTime?: number
}