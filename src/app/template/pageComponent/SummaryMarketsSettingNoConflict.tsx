import MarketConfigForm from "@/app/template/components/marketConfigForm/MarketConfigForm";
import React from "react";
import {MarketConfigModel} from "@/services/@core/module/ResponseDataModels";

export interface SummaryMarketsSettingNoConflictProps {
    marketRowData: MarketConfigModel[];
}

const SummaryMarketsSettingNoConflict = ({marketRowData} : SummaryMarketsSettingNoConflictProps) => {
    return <MarketConfigForm rows={marketRowData}
                             processRowUpdate={() => {}}
                             toolbarEnabled={false}
                             checkboxSelection={false}
                             viewOnly
    />
}

SummaryMarketsSettingNoConflict.displayName = 'SummaryMarketsSettingNoConflict';
export default React.memo(SummaryMarketsSettingNoConflict);