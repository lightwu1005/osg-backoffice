import React, {useCallback, useState} from "react";
import {Box, Stack} from "@mui/material";
import ChartWrapper from "@/app/dashboard/components/ChartWrapper";
import CommonPieChart, {
    ChartCondition,
    CommonPieChartRecord
} from "@/modules/components/charts/CommonPieChart"
import {PieChartProps, QueryChangeParameters} from "@/app/dashboard/models/EventQueryParameters";
import {InfoType} from "@/services/@core/module/Enum";
import {OptionItem} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {allFirstCharToUpperCase} from "@/modules/common/DisplayFormatConverter";
import {hashDataWith} from "@/utils/tools";
import lodash from "lodash";

const list = ["Single", "Parlay"]

interface PerformanceProps {
    readonly title: string
    readonly hasOptions: boolean
    readonly chartData: PieChartProps[] | undefined
    readonly onDataSelected: (records: CommonPieChartRecord) => void
    readonly handleQueryChange?: (params: QueryChangeParameters) => void
}

function BetSlipsPerformance({
    title,
    chartData,
    onDataSelected,
    hasOptions,
    handleQueryChange
}: PerformanceProps) {
    const [options, setOptions] = useState<string[]>(list)
    const [selected, setSelected] = useState<string[]>([])

    const handleChanged = useCallback((options: string[]) => {
        setSelected(options)
        if (handleQueryChange) {
            handleQueryChange({
                infoType: InfoType.BetSlips,
                betType: options[0].toUpperCase()
            })
        }
    }, [])

    const handleDataSelectedWithOptions = useCallback((infoType: InfoType, selectedData: ChartCondition) => {
        let selectedOptions: OptionItem[] = []

        if (hasOptions) {
            if (selected.length !== 0) {
                selectedOptions = selected.map((item, index) => ({
                    id: index.toString(),
                    name: item
                }))
            } else {
                selectedOptions = [{
                    id: '0',
                    name: list[0]
                }]
            }
        }

        onDataSelected({
            infoType: infoType,
            options: selectedOptions,
            filterCondition: selectedData
        })
    }, [selected])

    return (
        <Box sx={{width: '55%', height: 'auto', marginRight: '1.5rem'}}>
            <ChartWrapper title={title} options={hasOptions ? options : undefined} isSingle={true}
                          onOptionsSelected={handleChanged}>
                <Stack direction="row" height="100%" alignItems="center">
                    {chartData && chartData.map((item, index) => (
                        <CommonPieChart
                            infoType={InfoType.BetSlips}
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

const MemorizedBetSlipsPerformance = React.memo(BetSlipsPerformance, (prevProps, nextProps) => (
    lodash.isEqual(
        lodash.omit(prevProps, ['onDataSelected', 'handleQueryChange']),
        lodash.omit(nextProps, ['onDataSelected', 'handleQueryChange']),
    ))
)

MemorizedBetSlipsPerformance.displayName = 'BetSlipsPerformance'
export default MemorizedBetSlipsPerformance