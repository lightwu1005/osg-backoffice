import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import {Box, Stack, Typography} from "@mui/material";
import {numberFormat} from "@/utils/tools";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {useTheme} from "@/app/ThemeWrapper";

type ValueType = 'money' | 'number' | 'percentage'

/**
 * @param title The title of the chart, if not provided, the total value will be displayed
 * @param dataSets The data sets of the chart
 * @param valueType The value type of the chart
 * @param area The area of the chart, default is false
 * @param showMark The show mark of the chart, default is true
 * */
export interface CommonLineChartProps {
    title?: string
    dataSets: DataSet[]
    valueType: ValueType
    area?: boolean
    showMark?: boolean
}

/**
 * @param label The XAxis label of the data
 * @param value The value of the data
 * */
export interface DataSet {
    label: string
    value: number
}

export const getYAxisDisplay = (valueType: ValueType, value: number) => {
    switch (valueType) {
        case 'money':
            return numberFormat(value, 1)
        case 'percentage':
            return value + '%'
        case 'number':
            return value.toLocaleString('en-US')
    }
}

export const getTitleDisplay = (valueType: ValueType, total: number, title?: string) => {
    if (title)
        return title

    switch (valueType) {
        case 'money':
            return '$ ' + numberFormat(total, 1)
        case 'percentage':
            return total + '%'
        case 'number':
            return total.toLocaleString('en-US')
    }
}

export default function CommonLineChart({title, dataSets, valueType, area, showMark}: Readonly<CommonLineChartProps>) {
    const intl = useIntl();
    const funType = LocalizationFunctionType.Common
    const { mode } = useTheme()

    if (dataSets.length === 0) {
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

    const labels = dataSets.map((dataSet) => dataSet.label)
    const data = dataSets.map((dataSet) => dataSet.value)
    const total = data.reduce((a, b) => a + b, 0)
    return (
        <Stack sx={{width: '100%', padding: 2}}>
            <Typography variant={'h2'}>{getTitleDisplay(valueType, total, title)}</Typography>
            <LineChart
                sx={{
                    '& .MuiLineElement-root': {
                        strokeWidth: '2px !important',
                    },
                    '& .MuiChartsAxis-tick': {
                        stroke: 'transparent !important',
                    },
                    '& .MuiChartsAxis-tickLabel': {
                        fill: '#00000060 !important',
                        fontSize: '0.75rem',
                        '[data-mui-color-scheme="dark"] &': {
                            fill: '#FFFFFF99 !important',
                        },
                    },
                    '& .MuiAreaElement-series-y': {
                        fill: "url('#linearGradientY')",
                    },
                    '& .MuiChartsAxis-line': {
                        stroke: '#DDE3E7 !important'
                    }
                }}
                height={300}
                series={[
                    {
                        id: 'y',
                        data: data,
                        curve: 'linear',
                        color: '#9972FF',
                        showMark: showMark,
                        area: area
                    },
                ]}
                xAxis={[{ scaleType: 'point', data: labels, tickNumber: 5 }]}
                yAxis={[{ scaleType: 'linear', data: data, tickNumber: 3, valueFormatter: (value) => getYAxisDisplay(valueType, value) }]}
                grid={{ horizontal: true }}
            >
                <defs>
                    <linearGradient id="linearGradientY" gradientTransform="rotate(90)">
                        <stop offset="10%" stopColor="#9972FF" stopOpacity="0.2"/>
                        <stop offset="90%" stopColor='rgba(153, 114, 255, 0.00)' stopOpacity="0"/>
                    </linearGradient>
                </defs>
            </LineChart>
        </Stack>
    )
}
