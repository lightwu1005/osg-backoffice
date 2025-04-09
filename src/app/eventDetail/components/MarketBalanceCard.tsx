import React from 'react';
import {BarChart} from '@mui/x-charts/BarChart';
import {Stack} from "@mui/material";
import {BarChartDataProps} from "@/modules/interface/BarChartDataProps";


export interface Data {
    label: string
    value: number
}
const valueFormatter = (value: number | null) => `${value}%`;

export interface MarketBalanceProps {
    data: Data[]
}

function MarketBalanceCard({data}: MarketBalanceProps) {

    const totalBalance: number = data.map((value) => value.value)
        .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);

    const series =  data.map((item) => {
            return {
                data: [ (item.value / totalBalance) * 100 ],
                label: item.label, stack: 'stack',
                valueFormatter: valueFormatter
            };
        }
    );

    const formattedTotalBalance = totalBalance.toLocaleString('en-US', {
        style: 'currency',
        currency: 'CNY',
        minimumFractionDigits: 2,
        currencyDisplay: 'narrowSymbol'
    }).replace('¥', '');

    return (
        <Stack sx={{display: 'flex', p: '1rem', bgcolor: '#F0F4F8', borderRadius: '0.75rem'}}>
            <Stack direction={"row"} spacing={2} paddingX={2} justifyContent="space-between">
                <div style={{
                    color: '#6E7880',
                    fontSize: 12,
                    fontFamily: 'Inter',
                    fontWeight: 600
                }}>
                    Market Balance
                </div>
                <div style={{
                    color: '#6E7880',
                    fontSize: 12,
                    fontFamily: 'Inter',
                    fontWeight: 600
                }}>
                    Total Amount {formattedTotalBalance} (RMB)
                </div>
            </Stack>
            <BarChart
                sx={{
                    '& .MuiBarElement-root': {
                        rx: 4,
                        ry: 4
                    },
                    '& .MuiChartsAxis-line': {
                        color: '#00000000',
                        stroke: '#00000000'
                    },
                    '& .MuiChartsLegend-mark': {
                        rx: 4,
                        ry: 4
                    },
                }}
                margin={{
                    left: 16,
                    right: 24,
                    top: 24,
                    bottom: 80,
                }}
                layout={"horizontal"}
                height={120}
                xAxis={[{
                    max: 100,
                    tickInterval: [0, 20, 40, 60, 80, 100],
                    tickLabelStyle: {
                        color: '#6E7880',
                        fontSize: 12,
                        fontFamily: 'Inter',
                        fontWeight: 600,
                    },
                    valueFormatter: (value) => `${value}%`
                }]}
                leftAxis={{disableLine: true}}
                series={series}
                colors={['#13C998', '#6B8BFF', '#8657FF']}
                slotProps={{
                    legend: {
                        itemMarkHeight: 12,
                        itemMarkWidth: 12,
                        direction: 'row',
                        position: {
                            vertical: 'bottom',
                            horizontal: 'left'
                        },
                        labelStyle: {
                            fontSize: 12,
                            fill: '#172733',
                            fontWeight: 600,
                            fontFamily: 'Inter'
                        },
                    },
                    itemContent: {
                        sx: {
                            fontSize: 12,
                            fill: '#172733',
                            fontWeight: 600,
                            fontFamily: 'Inter',
                        }
                    }
                }}
                tooltip={{ trigger: 'item' }}
            />
        </Stack>
    );
}

export default MarketBalanceCard