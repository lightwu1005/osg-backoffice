import React, {useCallback} from "react"
import {Box, Stack} from "@mui/material"
import ChartWrapper from "@/app/dashboard/components/ChartWrapper"
import CommonPieChart, {ChartCondition, CommonPieChartRecord} from "@/modules/components/charts/CommonPieChart"
import {PieChartProps} from "@/app/dashboard/models/EventQueryParameters";
import {InfoType} from "@/services/@core/module/Enum";
import {allFirstCharToUpperCase} from "@/modules/common/DisplayFormatConverter";
import {hashDataWith} from "@/utils/tools";
import lodash from "lodash";

interface PerformanceProps {
    readonly title: string
    readonly chartData: PieChartProps[] | undefined
    readonly onDataSelected: (records: CommonPieChartRecord) => void
}

function DevicePerformance({title, chartData, onDataSelected}: PerformanceProps) {
    const handleDataSelectedWithOptions = useCallback((infoType: InfoType, selectedData: ChartCondition) => {
        onDataSelected({
            infoType: infoType,
            options: [],
            filterCondition: selectedData
        })
    }, [])

    return (
        <Box sx={{width: '35%', height: 'auto', marginRight: '1.5rem'}}>
            <ChartWrapper title={title}>
                <Stack direction="row">
                    {chartData && chartData.map((item, index) => (
                        <CommonPieChart
                            infoType={InfoType.Device}
                            data={item.infoData.map((toInfoTypeData) => ({
                                label: allFirstCharToUpperCase(toInfoTypeData.label),
                                value: toInfoTypeData.value
                            }))}
                            centerLabel={item.infoTitle ?? ''}
                            key={`${item.infoId}-${index}-${hashDataWith(item)}`}
                            onDataSelected={handleDataSelectedWithOptions}
                        />
                    ))}
                </Stack>
            </ChartWrapper>
        </Box>
    );
}

const MemorizedDevicePerformance = React.memo(DevicePerformance, (prevProps, nextProps) => (
    lodash.isEqual(
        lodash.omit(prevProps, ['onDataSelected']),
        lodash.omit(nextProps, ['onDataSelected'])
    ))
)

MemorizedDevicePerformance.displayName = 'DevicePerformance'
export default MemorizedDevicePerformance