import React, {useCallback} from "react";
import {Box, Stack} from "@mui/material";
import ChartWrapper from "@/app/dashboard/components/ChartWrapper";
import CommonPieChart, {CommonPieChartRecord} from "@/modules/components/charts/CommonPieChart"
import {PieChartProps, QueryChangeParameters} from "@/app/dashboard/models/EventQueryParameters";
import {SportsDataModel} from "@/services/@core/module/ResponseDataModels";
import useChartOptions from "@/app/dashboard/domain/useChartOptions";
import {InfoType} from "@/services/@core/module/Enum";
import {SportIdsFromOptions} from "@/app/dashboard/domain/useOddsDashboardViewModel";
import {allFirstCharToUpperCase} from "@/modules/common/DisplayFormatConverter";
import {hashDataWith} from "@/utils/tools";
import lodash from "lodash";

interface PerformanceProps {
    readonly title: string
    readonly sportsList?: SportsDataModel[]
    readonly chartData: PieChartProps[] | undefined
    readonly onDataSelected: (records: CommonPieChartRecord) => void
    readonly handleQueryChange?: (params: QueryChangeParameters) => void
}

function SportsPerformance({title, sportsList, chartData, onDataSelected, handleQueryChange}: PerformanceProps) {
    const {options, handleChanged, handleDataSelectedWithOptions} = useChartOptions({
        sportsList,
        onDataSelected,
    });

    const handleSportChanged = useCallback((options: string[]) => {
        handleChanged(options)
        if (handleQueryChange) {
            const sportIds = SportIdsFromOptions(options, sportsList as SportsDataModel[]);

            handleQueryChange({
                infoType: InfoType.Sports,
                sportIds: sportIds
            });
        }
    }, [sportsList])

    return (
        <Box sx={{width: '65%', height: 'auto'}}>
            <ChartWrapper title={title} type={'sport'} atLeastOne={true} options={options} isSingle={false}
                          onOptionsSelected={handleSportChanged}>
                <Stack direction="row">
                    {chartData && chartData.map((item, index) => (
                        <CommonPieChart
                            infoType={InfoType.Sports}
                            data={item.infoData.map((toInfoTypeData) => ({
                                label: allFirstCharToUpperCase(toInfoTypeData.label),
                                value: toInfoTypeData.value
                            }))}
                            showPercentageInTooltip={true}
                            prefix={'$'}
                            centerLabel={item.infoTitle}
                            key={`${item.infoId}-${index}-${hashDataWith(item)}`}
                            onDataSelected={handleDataSelectedWithOptions}
                        />
                    ))}
                </Stack>
            </ChartWrapper>
        </Box>
    );
}

const MemorizedSportsPerformance = React.memo(SportsPerformance, (prevProps, nextProps) => {
    return (
        lodash.isEqual(
            lodash.omit(prevProps, ['onDataSelected', 'handleQueryChange']),
            lodash.omit(nextProps, ['onDataSelected', 'handleQueryChange']),
            )
        )
    }
)

MemorizedSportsPerformance.displayName = 'SportsPerformance'
export default MemorizedSportsPerformance