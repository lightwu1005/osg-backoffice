import {Box, Stack} from "@mui/material";
import {InfoMultiSelectComponent, MultiMenuTextFieldType} from "@/modules/components/TextField";
import MarketConfigForm from "@/app/template/components/marketConfigForm/MarketConfigForm";
import {GridRowModel} from "@mui/x-data-grid-pro";
import {MarketList} from "@/app/eventDetail/models/dataModel/MarketSettingDataModel";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {MarketConfigModel} from "@/services/@core/module/ResponseDataModels";
import lodash from "lodash";
import Tabs from "@/modules/components/tabs/Tabs";
import useMarketTabViewModel from "@/app/template/domain/useMarketTabViewModel";
import React, {FC, useCallback, useEffect, useState} from "react";

export interface MarketConfigFormContentProps {
    eventType: string
    sportId: string
    markets: MarketList[]
    marketRowData: MarketConfigModel[]
    selectedMarketIds: string[]
    handleMarketSelectOnChange: (selectedMarketNames: string[]) => void
    handleMarketRowUpdate: (row: GridRowModel) => void
    viewOnly?: boolean
}


const MarketConfigFormContent: FC<Readonly<MarketConfigFormContentProps>> = (props) => {
    const {eventType, sportId, markets, marketRowData, selectedMarketIds, handleMarketSelectOnChange, handleMarketRowUpdate, viewOnly} = props

    const {
        labels,
        selectedIdx,
        handleTabChange,
        selectedMarketGroup
    } = useMarketTabViewModel({eventType, sportId})

    const intl = useIntl()

    const [filterMarketRowData, setFilterMarketRowData] = useState<MarketConfigModel[]>(marketRowData)

    const filterMarkets = useCallback(() => {
        if (selectedIdx === 0) {
            setFilterMarketRowData(marketRowData)
        } else {
            setFilterMarketRowData(marketRowData.filter(market => selectedMarketGroup?.marketIds?.includes(market.marketId)))
        }
    }, [selectedIdx, selectedMarketGroup, marketRowData])

    useEffect(() => {
        filterMarkets()
    }, [selectedIdx, selectedMarketGroup, marketRowData, filterMarkets])

    return (
        <Stack spacing={2} sx={{
            width: '100%',
            maxWidth: '100%',
            height: '100%',
            mx: 'auto'
        }}>
            {
                !viewOnly && (
                    <Box width={'30%'}>
                        <InfoMultiSelectComponent
                            header={''}
                            menu={{
                                label: intl.formatMessage({
                                    id: `${LocalizationFunctionType.Template}.selectMarket`,
                                    defaultMessage: 'Select Market',
                                }),
                                options: lodash.sortBy(markets, 'marketId').map(market => market.marketName),
                                initialSelectedOptions: markets.filter(market => selectedMarketIds.includes(market.marketId)).map(market => market.marketName),
                                onChange: handleMarketSelectOnChange,
                                isEmptyEqualSelectAll: false,
                                displayType: MultiMenuTextFieldType.selectedCount,
                                disabled: viewOnly
                            }}
                        />
                    </Box>
                )
            }
            <Tabs
                labels={labels}
                selected={selectedIdx}
                defaultSelected={0}
                onTabChange={handleTabChange}
                labelsOnly={true}
            >
                {null}
            </Tabs>
            <MarketConfigForm
                rows={filterMarketRowData}
                processRowUpdate={handleMarketRowUpdate}
                viewOnly={viewOnly}
            />
        </Stack>
    )
}

export default React.memo(MarketConfigFormContent)