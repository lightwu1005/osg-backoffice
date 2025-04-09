import React, {useCallback} from "react";
import {Box, Stack} from "@mui/material";
import ChartWrapper from "@/app/dashboard/components/ChartWrapper";
import CommonHorizontalBarchart from "@/modules/components/charts/CommonHorizontalBarchart";
import {BarChartProps, QueryChangeParameters} from "@/app/dashboard/models/EventQueryParameters";
import {SportsDataModel} from "@/services/@core/module/ResponseDataModels";
import useChartOptions from "@/app/dashboard/domain/useChartOptions";
import {InfoType} from "@/services/@core/module/Enum";
import {SportIdsFromOptions} from "@/app/dashboard/domain/useOddsDashboardViewModel";
import {CommonPieChartRecord} from "@/modules/components/charts/CommonPieChart";
import lodash from "lodash";

interface PerformanceProps {
    readonly title: string
    readonly sportsList?: SportsDataModel[]
    readonly chartData: BarChartProps | undefined
    readonly onDataSelected: (records: CommonPieChartRecord) => void
    readonly handleQueryChange?: (params: QueryChangeParameters) => void

}

function LeaguePerformance({
    title,
    sportsList,
    chartData,
    onDataSelected,
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
                infoType: InfoType.League,
                sportIds: sportIds
            });
        }
    }, [sportsList])

    return (
        <ChartWrapper title={title} type={'sport'} atLeastOne={true} options={options} isSingle={false}
                      onOptionsSelected={handleSportChanged}>
            <Stack direction="row">
                <Box width="100%" height="100%">
                    {chartData && <CommonHorizontalBarchart {...chartData} infoType={InfoType.League}
                                                            onDataSelected={handleDataSelectedWithOptions}/>}
                </Box>
            </Stack>
        </ChartWrapper>
    );
}

const MemorizedLeaguePerformance = React.memo(LeaguePerformance, (prevProps, nextProps) => (
    lodash.isEqual(
        lodash.omit(prevProps, ['onDataSelected']),
        lodash.omit(nextProps, ['onDataSelected'])
    ))
)

MemorizedLeaguePerformance.displayName = 'LeaguePerformance'
export default MemorizedLeaguePerformance