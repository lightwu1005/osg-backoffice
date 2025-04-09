import {OddsMarginCalculateModel, OddsMarginModel} from "@/services/@core/module/ResponseDataModels";

export const mockOddsMargin: OddsMarginModel = {
    "defaultMargin": 5,
    "overrideMargin": 3.2,
    "maxPayout": 100000,
    "minOdds": 1.01,
    "maxOdds": 2.34,
    "alertDifference": 1,
    "alignMaxDifference": 5,
    "effectiveTime": 1703471869
}
export const mockOddsMarginCalculate: OddsMarginCalculateModel = {
    "margin": 1.25,
    "minOdds": 1.23,
    "maxOdds": 2.35
}