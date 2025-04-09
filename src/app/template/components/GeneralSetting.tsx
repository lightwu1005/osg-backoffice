import {
    IFeedOddsSetting,
    IHeavyBetting,
    IImbalancedBettingDecrease,
    IOddsDeviation,
    IMarginLine
} from "@/app/eventDetail/models/dataModel/MarketSettingDataModel"
import SortedCardList, {SortedCardListProps} from "@/app/eventDetail/components/marketSetting/SortedCardList"
import {FeedOddsSetting} from "@/app/eventDetail/components/marketSetting/FeedOddsSetting"
import {OddsDeviation} from "@/app/eventDetail/components/marketSetting/OddsDeviation"
import {ImbalancedBettingDecrease} from "@/app/eventDetail/components/marketSetting/ImbalancedBettingDecrease"
import {HeavyBetting} from "@/app/eventDetail/components/marketSetting/HeavyBetting"
import {MarginLine} from "@/app/eventDetail/components/marketSetting/MarginLine"

export interface GeneralSettingProps {
    sortCard: SortedCardListProps
    feedOddsSetting: IFeedOddsSetting,
    marginLine: IMarginLine,
    oddsDeviation: IOddsDeviation
    imbalancedBetting: IImbalancedBettingDecrease
    heavyBetting: IHeavyBetting
}

export const GeneralSetting = ({
                                   sortCard,
                                   feedOddsSetting,
                                   marginLine,
                                   oddsDeviation,
                                   imbalancedBetting,
                                   heavyBetting
                               }: GeneralSettingProps) => {
    return (
        <>
            <SortedCardList {...sortCard}/>
            <FeedOddsSetting {...feedOddsSetting}/>
            <MarginLine {...marginLine}/>
            <OddsDeviation {...oddsDeviation}/>
            <ImbalancedBettingDecrease {...imbalancedBetting}/>
            <HeavyBetting {...heavyBetting}/>
        </>
    )
}