// trigger the states when the timeline type is POINTS or GOALS
import {MarketLineStatus} from "@/services/@core/module/Enum";

export const triggerStates = ['POINTS', 'GOALS']

// countdown timer sports
export const countdownTimerSports = ['BASKETBALL']

export function removeNonLettersAndToLower(input: string): string {
    return input.replace(/[^a-zA-Z]/g, '').toLowerCase();
}

export const getMarketStatusBgColor = (lineStatus?: string): string => {
    if (lineStatus === MarketLineStatus.CLOSED) return '#DDE7EECC'
    if (lineStatus === MarketLineStatus.SUSPENDED) return '#FFDAB0A6'
    return 'transparent'
}

export const getMarketStatusDarkBgColor = (lineStatus?: string): string => {
    if (lineStatus === MarketLineStatus.CLOSED) return '#171A1C'
    if (lineStatus === MarketLineStatus.SUSPENDED) return '#2E1B05'
    return 'transparent'
};