import React, {useCallback} from "react";
import {Box, Stack} from "@mui/material";
import ChartWrapper from "@/app/dashboard/components/ChartWrapper";
import CommonHorizontalBarchart from "@/modules/components/charts/CommonHorizontalBarchart";
import {BarChartProps, QueryChangeParameters} from "@/app/dashboard/models/EventQueryParameters";
import {CommonPieChartRecord} from "@/modules/components/charts/CommonPieChart";
import {SportsDataModel} from "@/services/@core/module/ResponseDataModels";
import useChartOptions from "@/app/dashboard/domain/useChartOptions";
import {InfoType} from "@/services/@core/module/Enum";
import {SportIdsFromOptions} from "@/app/dashboard/domain/useOddsDashboardViewModel";
import lodash from "lodash";

interface PerformanceProps {
    readonly title: string
    readonly hasOptions: boolean
    readonly sportsList?: SportsDataModel[]
    readonly chartData: BarChartProps | undefined
    readonly onDataSelected: (records: CommonPieChartRecord) => void
    readonly handleQueryChange?: (params: QueryChangeParameters) => void
}

function MarketPerformance({
                               title,
                               sportsList,
                               chartData,
                               onDataSelected,
                               hasOptions,
                               handleQueryChange
                           }: PerformanceProps) {
    const {options, handleChanged, handleDataSelectedWithOptions} = useChartOptions({
        sportsList,
        onDataSelected,
    });

    const handleSportChanged = useCallback((options: string[]) => {
        handleChanged(options)
        if (handleQueryChange) {
            const sportIds = SportIdsFromOptions(options, sportsList as SportsDataModel[]);

            handleQueryChange({
                infoType: InfoType.Market,
                sportIds: sportIds
            });
        }
    }, [sportsList])

    return (
        <Box sx={{width: '45%', height: 'auto'}}>
            <ChartWrapper title={title} type={'sport'} atLeastOne={true} options={hasOptions ? options : undefined}
                          isSingle={false}
                          onOptionsSelected={handleSportChanged}>
                <Stack direction="row">
                    <Box width="100%" height="100%">
                        {chartData && <CommonHorizontalBarchart {...chartData} infoType={InfoType.Market}
                                                                onDataSelected={handleDataSelectedWithOptions}/>}
                    </Box>
                </Stack>
            </ChartWrapper>
        </Box>
    );
}

const MemorizedMarketPerformance = React.memo(MarketPerformance, (prevProps, nextProps) => (
    lodash.isEqual(
        lodash.omit(prevProps, ['onDataSelected']),
        lodash.omit(nextProps, ['onDataSelected'])
    ))
)

MemorizedMarketPerformance.displayName = 'MarketPerformance'
export default MemorizedMarketPerformance