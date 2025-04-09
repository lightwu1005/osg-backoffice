import React from "react";
import {Stack} from "@mui/material";
import MemoizedTemplateCardItem, {
    SummaryCardItemType,
    TemplateCardItemProps
} from "@/app/eventDetail/components/TemplateSummaryCardItem";

export interface TemplateSummaryCardProps {
    items: TemplateCardItemProps[]
}

export function TemplateCardItems({items}: TemplateSummaryCardProps) {
    return items.map((item, index) => {
        const itemKey = `${item.title}-${index}`;
        return (
            <MemoizedTemplateCardItem
                key={itemKey}
                isFirst={index === 0}
                title={item.title}
                tips={item.tips}
                isHeader={item.isHeader}
                preValue={item.preValue}
                refValue={item.refValue}
                currentValue={item.currentValue}
                isValueSet={item.isValueSet}
                onValueSelected={item.onValueSelected}
                summaryCardItemType={item.summaryCardItemType}
                shouldShowWarningSettingBar={item.shouldShowWarningSettingBar}
                popUpMarketListClicked={item.popUpMarketListClicked}
            />
        )
    })
}

function TemplateSummaryCard(props: TemplateSummaryCardProps) {
    const {items} = props
    const isLong = props.items && props.items.length > 0 && props.items[0]?.summaryCardItemType === SummaryCardItemType.Long;

    return (
        <Stack direction={isLong ? "row" : "column"} spacing={isLong ? 0 : 2}>
            <TemplateCardItems items={items}/>
        </Stack>
    )
}

const MemoizedTemplateSummaryCard = React.memo(TemplateSummaryCard)
MemoizedTemplateSummaryCard.displayName = 'TemplateSummaryCard'

export default MemoizedTemplateSummaryCard
