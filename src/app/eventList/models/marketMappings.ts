import { LocalizationFunctionType } from "@/localizedConfig/LanguageContext";

export type MarketMappingObj = {
    [key: string]: string;
};

/**
 * Basketball major market names for backend database
 * */
enum BEMarketNameBasketball {
    Handicap = 'Point Spread',
    OverUnder = 'Total Points Over / Under',
    MoneyLine = 'Money Line',
    HandicapHalftime = '1st Half Point Spread',
    OverUnderHalftime = '1st Half Total Points Over / Under',
    MoneyLineHalftime = '1st Half Money Line'
}

/**
 * Soccer major market names for backend database
 * */
enum BEMarketNameSoccer {
    OneXTwo = 'Match Result',
    OU = 'Total Goals Over / Under',
    AsiaHandicap = 'Asian Handicap',
    AsiaHandicapRestMatch = 'Rest of Match Asian Handicap',
    OneXTwoFirstHalf = 'Half-time Result',
    OUFirstHalf = 'Half-time Total Goals Over / Under',
    AsiaHandicapFirstHalf = 'Half-time Asian Handicap',
    AsiaHandicapRestFirstHalf = 'Rest of First Half Asian Handicap'
}

/**
 * sports major market names for backend database
 * */
const MarketNames = {
    Basketball: {
        oddsMarket1: BEMarketNameBasketball.Handicap,
        oddsMarket2: BEMarketNameBasketball.OverUnder,
        oddsMarket3: BEMarketNameBasketball.MoneyLine,
        oddsMarket4: BEMarketNameBasketball.HandicapHalftime,
        oddsMarket5: BEMarketNameBasketball.OverUnderHalftime,
        oddsMarket6: BEMarketNameBasketball.MoneyLineHalftime,
    },
    Soccer: (isInPlay: boolean) => ({
        oddsMarket1: BEMarketNameSoccer.OneXTwo,
        oddsMarket2: isInPlay
            ? BEMarketNameSoccer.AsiaHandicapRestMatch
            : BEMarketNameSoccer.AsiaHandicap,
        oddsMarket3: BEMarketNameSoccer.OU,
        oddsMarket4: BEMarketNameSoccer.OneXTwoFirstHalf,
        oddsMarket5: isInPlay
            ? BEMarketNameSoccer.AsiaHandicapRestFirstHalf
            : BEMarketNameSoccer.AsiaHandicapFirstHalf,
        oddsMarket6: BEMarketNameSoccer.OUFirstHalf,
    }),
};

/**
 * Localization keys for displaying market names
 */
const LocalizationKeys = {
    Basketball: {
        oddsMarket1: 'handicap',
        oddsMarket2: 'overUnder',
        oddsMarket3: 'moneyLine',
        oddsMarket4: 'handicapHalftime',
        oddsMarket5: 'ouHalftime',
        oddsMarket6: 'moneyLineHalftime',
    },
    Soccer: {
        oddsMarket1: '1X2',
        oddsMarket2: 'asiaHandicap',
        oddsMarket3: 'ou',
        oddsMarket4: '1X2FirstHalf',
        oddsMarket5: 'asiaHandicapFirstHalf',
        oddsMarket6: 'ouFirstHalf',
    },
};

/**
 * Get market name mappings based on sport type
 */
export function getMarketNameMappings(sportType: string, isInPlay: boolean): {
    marketNameObj: MarketMappingObj;
    displayLabelObj: MarketMappingObj;
} {
    const funcType = `${LocalizationFunctionType.Event}.targetMarkets`;
    const sportKey = sportType.toLowerCase() === 'basketball' ? 'Basketball' : 'Soccer';
    const marketNameObj = sportKey === 'Soccer' ? MarketNames.Soccer(isInPlay) : MarketNames.Basketball;
    const displayLabelObj = Object.fromEntries(
        Object.entries(LocalizationKeys[sportKey]).map(([key, value]) => [
            key,
            `${funcType}.${value}`,
        ])
    );

    return { marketNameObj, displayLabelObj };
}

/**
 * Get arrays of market names grouped by type
 */
export function getMarketNameArrays(): {
    oneXTwo: string[];
    ou: string[];
    handicap: string[];
    moneyLine: string[];
} {
    const oneXTwo = [
        BEMarketNameSoccer.OneXTwo,
        BEMarketNameSoccer.OneXTwoFirstHalf
    ];
    const ou = [
        BEMarketNameBasketball.OverUnder,
        BEMarketNameBasketball.OverUnderHalftime,
        BEMarketNameSoccer.OU,
        BEMarketNameSoccer.OUFirstHalf
    ];
    const handicap = [
        BEMarketNameBasketball.Handicap,
        BEMarketNameBasketball.HandicapHalftime,
        BEMarketNameSoccer.AsiaHandicap,
        BEMarketNameSoccer.AsiaHandicapFirstHalf,
        BEMarketNameSoccer.AsiaHandicapRestMatch,
        BEMarketNameSoccer.AsiaHandicapRestFirstHalf
    ];
    const moneyLine = [
        BEMarketNameBasketball.MoneyLine,
        BEMarketNameBasketball.MoneyLineHalftime
    ];

    return { oneXTwo, ou, handicap, moneyLine };
}