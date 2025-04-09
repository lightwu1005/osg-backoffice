import {BetAmountBlock} from "@/modules/components/buttons/multipleFilterButton/components/BetAmount";
import {FilterSectionProps} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {BetAmountModel} from "@/app/betSlip/components/NumberRangeTextField";

export const ConditionPayout = ({selected, onChange}: FilterSectionProps<BetAmountModel>) => {
    return <BetAmountBlock
        selected={selected}
        onChange={newModel => {
            if (onChange) {
                const isValid = newModel.condition === 'Between'
                    ? newModel.firstAmount && newModel.secondAmount && (Number(newModel.secondAmount) > Number(newModel.firstAmount))
                    : newModel.firstAmount;

                onChange(isValid ? { key: newModel } : {});
            }
        }}
    />
}