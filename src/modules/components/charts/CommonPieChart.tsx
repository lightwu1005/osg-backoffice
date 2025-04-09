import * as React from 'react';
import {PieChart} from '@mui/x-charts/PieChart';
import {useDrawingArea} from '@mui/x-charts/hooks';
import {styled} from '@mui/material/styles';
import {formatNumber, formatPercentage} from "@/modules/common/DisplayFormatConverter";
import {PieItemIdentifier} from "@mui/x-charts";
import {InfoType} from "@/services/@core/module/Enum";
import {OptionItem} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {useTheme} from "@/app/ThemeWrapper";
import lodash from "lodash";

const colors = ['#9972FF', '#76CAFF', '#F3C896', '#5ED1B1', '#6B8BFF', '#DDE3E7']

const StyledTextTitle = styled('text')(({isNoData}: {isNoData:boolean}) => ({
    fill: isNoData ? '#00000060' : '#172733',
    '[data-mui-color-scheme="dark"] &': {
        fill: isNoData ? '#FFFFFF99' : '#F0F4F8',
    },
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 16,
    fontWeight: 600,
    wordWrap: 'break-word'
}));

const StyledTextSubTitle = styled('text')(({theme}) => ({
    fill: '#6E7880',
    '[data-mui-color-scheme="dark"] &': {
        fill: '#FFFFFF99',
    },
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 12,
    fontWeight: 400,
    wordWrap: 'break-word'
}));

export interface ChartCondition {
    infoId?: string,
    infoLabel?: string
}

export interface CommonPieChartRecord {
    infoType: InfoType;
    filterCondition: ChartCondition;
    options: OptionItem[];
    dateRange?: [number, number];
    eventId?: string;
}

function PieCenterLabel({prefix, total, centerLabel, isNoData}: {
    readonly prefix: string,
    readonly total: number,
    readonly centerLabel: string
    readonly isNoData: boolean
}) {
    const {width, height, left, top} = useDrawingArea();
    const intl = useIntl();
    const funType = LocalizationFunctionType.Common
    return (
        <>
            <StyledTextTitle x={left + width / 2} y={top + height / (isNoData ? 2: 2.15)} isNoData={isNoData}>
                {
                    isNoData ? intl.formatMessage({
                        id: `${funType}.noData`,
                        defaultMessage: 'No Data'
                    }) : `${prefix}${formatNumber(total)}`
                }
            </StyledTextTitle>
            {
                !isNoData && <StyledTextSubTitle x={left + width / 2} y={top + height / 1.85}>
                    {centerLabel}
                </StyledTextSubTitle>
            }
        </>
    );
}

/** Pie Chart Props
 * @param data data of the chart.
 * @param prefix prefix of data value, default is empty.
 * @param showPercentageInTooltip display the percentage value at tool tip, default is false.
 * @param centerLabel center label of the chart.
 * @param onDataClick function to handle data click event.
 * */
export interface CommonPieChartProps {
    data: PieData[]
    infoType: InfoType
    prefix?: string
    showPercentageInTooltip?: boolean
    centerLabel: string
    onDataSelected?: (infoType: InfoType, selectedData: ChartCondition) => void
}

/**
 * @param label data label of the chart
 * @param value data value of the chart
 * */
export interface PieData {
    label: string
    value: number
}

const CommonPieChart = (props: Readonly<CommonPieChartProps>) => {
    const {
        infoType,
        data = [],
        prefix = '',
        showPercentageInTooltip = false,
        centerLabel,
        onDataSelected
    } = props
    const { mode } = useTheme()

    const total: number = data.map((value) => value.value)
        .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0)

    const isNoData = total === 0

    const valueFormatter = (value: number) => {
        return `
            ${showPercentageInTooltip ? formatPercentage(value / total) : ''}
            ${prefix}${formatNumber(value)}
        `
    };

    const handleDataClick = (_: any, pieData: PieItemIdentifier) => {
        if(isNoData) return

        const selectedData = data[pieData.dataIndex]
        if (onDataSelected) {
            onDataSelected(infoType, {infoLabel: selectedData.label})
        }
    }

    const chartColors = () => {
        if (mode === 'light') {
            return isNoData ? ['#0000001F'] : colors
        } else {
            return isNoData ? ['#636B74'] : colors
        }
    }

    return (
        <PieChart
            sx={{
                '& .MuiChartsLegend-mark': {
                    rx: 4,
                    ry: 4,
                }
            }}
            series={[{
                data: !isNoData ? data : [{label: '', value: 1}],
                highlightScope: !isNoData ? {faded: 'global', highlighted: 'item'} : undefined,
                highlighted: {innerRadius: 95, outerRadius: 75},
                innerRadius: 90,
                outerRadius: 72,
                paddingAngle: 1,
                valueFormatter: (item) => valueFormatter(item.value),
            }]}
            onItemClick={handleDataClick}
            slotProps={{
                legend: {
                    itemMarkHeight: 12,
                    itemMarkWidth: 12,
                    direction: 'row',
                    position: {vertical: 'bottom', horizontal: 'middle'},
                    padding: {top: 0},
                    labelStyle: {
                        fontSize: '0.875rem',
                        fontWeight: 400,
                    },
                    hidden: isNoData
                }
            }}
            tooltip={{
                trigger: isNoData? 'none' : 'item',
            }}
            margin={{right: 5}}
            height={250}
            colors={chartColors}
        >
            <PieCenterLabel prefix={prefix} total={total} centerLabel={centerLabel} isNoData={isNoData}/>
        </PieChart>
    );
}

const MemoizedCommonPieChart = React.memo(CommonPieChart, (prevProps, nextProps) => {
    return(
        lodash.isEqual(
            lodash.omit(prevProps, 'onDataSelected'),
            lodash.omit(nextProps, 'onDataSelected')
        )
    )
})

MemoizedCommonPieChart.displayName = 'CommonPieChart'

export default MemoizedCommonPieChart
