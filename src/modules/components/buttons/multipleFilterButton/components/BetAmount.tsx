import * as React from "react";
import {useEffect, useState} from "react";
import {BetAmountModel, BetAmountOptions, BetAmountOptionsType} from "@/app/betSlip/components/NumberRangeTextField";

export interface BetAmountBlockProp {
    selected?: BetAmountModel
    onChange?: (newModel: BetAmountModel) => void
}

export const BetAmountBlock: React.FC<BetAmountBlockProp> = ({selected, onChange}) => {
    const [betAmountModel, setBetAmountModel] = useState<BetAmountModel>({
        condition: BetAmountOptionsType.G,
        firstAmount: '',
        secondAmount: ''
    })

    useEffect(() => {
        if (selected?.firstAmount) {
            setBetAmountModel({
                condition: selected.condition,
                firstAmount: selected.firstAmount,
                secondAmount: selected.condition === BetAmountOptionsType.B ? selected?.secondAmount : undefined
            });
        }
    }, [selected]);

    const handleModelChange = (condition: string, firstAmount: string, secondAmount?: string) => {
        const newModel = {
            condition,
            firstAmount,
            secondAmount
        }
        setBetAmountModel(newModel)
        if (onChange) {
            onChange(newModel)
        }
    }

    return <BetAmountOptions
        betAmountModel={betAmountModel}
        onChange={handleModelChange}
    />
}
