import React from 'react';
import {BarChart, BarItemIdentifier} from '@mui/x-charts';
import {Box, Stack, Typography} from '@mui/material';
import {ChartCondition} from '@/modules/components/charts/CommonPieChart';
import {InfoType} from "@/services/@core/module/Enum";
import {formatPercentage} from "@/modules/common/DisplayFormatConverter";
import {moneyFormat, numberFormat} from "@/utils/tools";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {useTheme} from "@/app/ThemeWrapper";

export interface BarchartDataSet {
    data: number[];
    stack: string;
    label: string;
    valueFormatter?: (value: number | null) => string;
}

/**
 * @param title The text displayed at the top left, representing the category of the left Y-axis labels.
 * @param subTitle The text displayed at the top right, representing the category of the right Y-axis labels.
 * @param dataType Specifies how to visually represent the data in a specific format.
 * @param data The dataset to be visualized in the bar chart.
 * @param labels The text labels displayed at the ticks of the Y-axis.
 * @param colors A function or array used to customize the colors of the bars.
 * @param onDataSelected A callback for returning what kind of data selected
 */
export interface BarchartProps {
    title: string;
    infoType: InfoType;
    subTitle: string;
    dataType: 'money' | 'percentage' | 'number';
    data: BarchartDataSet[];
    height: number;
    labels: string[];
    infoIds: string[];
    colors: string[];
    onDataSelected: (infoType: InfoType, selectedData: ChartCondition) => void;
}

export const DefaultBarchartColors = ['#6B8BFF', '#76CAFF', '#8657FF'];

const CommonHorizontalBarchart = ({
                                      infoType,
                                      title,
                                      subTitle,
                                      dataType,
                                      data,
                                      height,
                                      labels,
                                      infoIds,
                                      colors,
                                      onDataSelected,
                                  }: BarchartProps) => {
    const intl = useIntl();
    const funType = LocalizationFunctionType.Common
    const { mode } = useTheme()

    if (data.length === 0 || data.map(item => item.data).flat().every(value => value === 0)) {
        return (
            <Stack sx={{width: '100%', padding: 2}} alignItems={'center'}>
                <Box
                    component="img"
                    alt="ChartEmpty"
                    sx={{width: '120px', height: '120px'}}
                    src={ mode === 'light' ? '/ChartEmptyLight.svg' : '/ChartEmptyDark.svg'}
                />
                <Typography variant={'body1'} color={'text.disabled'}>
                    {
                        intl.formatMessage({
                            id: `${funType}.noData`,
                            defaultMessage: 'No Data'
                        })
                    }
                </Typography>
            </Stack>
        )
    }
    const refactorDisplayData = (
        dataType: 'money' | 'percentage' | 'number',
        originalData: BarchartDataSet[]
    ): BarchartDataSet[] => {
        const total: number[] = originalData.reduce((acc, curr) => {
            curr.data.forEach((value, index) => {
                if (acc[index]) {
                    acc[index] += value;
                } else {
                    acc[index] = value;
                }
            });
            return acc;
        }, [] as number[]);

        return originalData.map(item => {
            const newItem: BarchartDataSet = {
                data: item.data.map((number, index) =>
                    dataType === 'percentage' ? (number / total[index]) * 100 : number),
                label: item.label,
                stack: item.stack,
                valueFormatter: (value) => {
                    if (value === null) return ''
                    if (dataType === 'percentage') {
                        return `${formatPercentage(value / 100, 3)}`;
                    } else {
                        return `${dataType === 'money' ? '$' : ''}${moneyFormat(value)}`
                    }
                }
            };
            return newItem;
        });
    };

    //If the length of the string is less than the specified position, return the original string.
    const getYAxisTickDisplay = (label: string) => {
        if (label.length <= 15) {
            return label;
        }
        let breakPoint = 15;
        let substringPoint = 30;
        while (breakPoint > 0 && label[breakPoint] !== ' ' && label[breakPoint] !== '\n') {
            breakPoint--;
        }
        if (breakPoint === 0) {
            while (breakPoint < label.length && label[breakPoint] !== ' ' && label[breakPoint] !== '\n') {
                breakPoint++;
            }
        }
        if (breakPoint < label.length) {
            label = label.substring(0, breakPoint + 1) + '\n' + label.substring(breakPoint + 1);
        } else {
            // If it cannot insert newline character then should trim string shorter to avoid overlap to bar chart
            substringPoint = 20;
        }

        return label.substring(0, substringPoint) + '...';
    };

    const percentageAxis = {};
    const moneyAxis = {};
    const xAxisConfig = dataType === 'percentage' ? percentageAxis : moneyAxis;
    const yAxisConfig = {
        categoryGapRatio: 0.6,
    };
    const maxLength = 22 * 7;
    const legendHidden = !(dataType === 'percentage');

    const handleDataClick = (_: any, barData: BarItemIdentifier) => {
        const selectedId = infoIds[barData.dataIndex];
        const selectedLabel = labels[barData.dataIndex];

        if (onDataSelected) {
            onDataSelected(infoType, {infoId: selectedId, infoLabel: selectedLabel});
        }
    };

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography sx={{color: '#6E7880', fontSize: 13}}>{title}</Typography>
                <Typography sx={{color: '#6E7880', fontSize: 13}}>{subTitle}</Typography>
            </Stack>
            <BarChart
                sx={{
                    '& .MuiChartsLegend-mark': {
                        rx: 4,
                        ry: 4,
                    },
                    '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': {
                        textAnchor: 'start',
                        transform: `translateX(-${maxLength - 6}px)`,
                    },
                }}
                layout={'horizontal'}
                yAxis={[
                    {
                        id: 'leftAxisId',
                        data: labels,
                        scaleType: 'band',
                        valueFormatter: (value, context) => {
                            if (context.location === 'tick') {
                                return getYAxisTickDisplay(value ?? '');
                            } else {
                                return value;
                            }
                        },
                        ...yAxisConfig,
                    },
                    {
                        id: 'rightAxisId',
                        data: data[0] === undefined ? [] : data[0].data,
                        scaleType: 'band',
                        valueFormatter: (value, _) => {
                            switch (dataType) {
                                case 'number':
                                case 'money':
                                    return `${dataType === 'money' ? '$' : ''}${moneyFormat(value)}`;
                                case 'percentage':
                                    return '';
                            }
                        },
                    },
                ]}
                leftAxis={{
                    axisId: 'leftAxisId',
                    disableTicks: true,
                }}
                rightAxis={{
                    axisId: 'rightAxisId',
                    disableLine: true,
                    disableTicks: true,
                }}
                xAxis={[
                    {
                        tickNumber: 5,
                        tickPlacement: 'middle',
                        valueFormatter: (value, _) => {
                            switch (dataType) {
                                case 'money':
                                case 'number':
                                    return numberFormat(value, 1);
                                case 'percentage':
                                    return `${value}%`;
                                default:
                                    return value;
                            }
                        },
                        ...xAxisConfig,
                    },
                ]}
                series={refactorDisplayData(dataType, data)}
                grid={{vertical: true}}
                tooltip={{trigger: 'axis'}}
                height={height}
                onItemClick={handleDataClick}
                margin={{
                    left: maxLength,
                    bottom: dataType === 'percentage' ? 70 : 30,
                    right: dataType === 'percentage' ? 20 : 60,
                    top: 10,
                }}
                colors={colors.length > 0 ? colors : DefaultBarchartColors}
                slotProps={{
                    legend: {
                        hidden: legendHidden,
                        itemMarkHeight: 12,
                        itemMarkWidth: 12,
                        direction: 'row',
                        position: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        },
                        labelStyle: {
                            fontSize: 12,
                            fill: '#172733',
                            fontWeight: 600,
                            fontFamily: 'Inter',
                        },
                    },
                }}
            />
        </Box>
    );
};

export default CommonHorizontalBarchart;
