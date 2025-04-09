import * as React from 'react';
import {useEffect, useState} from 'react';
import {BarChart} from '@mui/x-charts';
import {Box, Stack, Typography} from "@mui/material";
import {BarChartDataProps} from "@/modules/interface/BarChartDataProps";
import {styled} from "@mui/material/styles";
import {moneyFormat} from "@/utils/tools";
import {Data} from "ejs";
import {firstCharToUpperCase} from "@/modules/common/DisplayFormatConverter"
import {useTheme} from "@/app/ThemeWrapper";
import { LocalizationFunctionType } from '@/localizedConfig/LanguageContext';
import {useIntl} from "react-intl";
import lodash from "lodash";

/**
 * @param layout Change Layout direction, only working when data length equals 2.
 */
interface ProgressBarProps extends BarChartDataProps {
    layout?: 'horizontal' | 'vertical'
    padding?: string;
    skipAnimation?: boolean;
    onItemClick?: (event: any) => void
}

const ProgressText = styled(Typography)(() => ({
    color: '#6E7880',
    fontSize: '0.75rem',
    fontFamily: 'Inter',
    fontWeight: 600,
    lineHeight: '19.92px',
    wordWrap: 'break-word',
    width: 'auto'
}));

interface CustomTooltipProps {
    title: string;
    data: Data[];
}

function generateBarColors(labelKeys: string[]): string[] {
    if (labelKeys.length === 2) {
        return ['#42A5F5', '#6E7880'];
    } else if (labelKeys.includes('running')) {
        return ['#51BC51', '#EA9A3E', '#9FA6AD'];
    } else if (labelKeys.includes('accept')) {
        return ['#42A5F5', '#9FA6AD', '#E47474'];
    } else {
        return ['#42A5F5', '#6E7880', '#51BC51', '#EA9A3E', '#9FA6AD'];
    }
}

const ProgressBar = ({layout, data, type = 'axis', title = '', padding = '20px 16px', skipAnimation, onItemClick}: ProgressBarProps) => {
    const theme = useTheme();
    const [newData, setNewData] = useState<Data>({});
    const [labels, setLabels] = useState<Data>({});
    const [labelKeys, setLabelKeys] = useState<string[]>([]);
    const [amountKeys, setAmountKeys] = useState<string[]>([]);
    const [isAllZero, setIsAllZero] = useState<boolean>(false);
    const [mode, setMode] = useState<string>(theme.mode);
    const barColors = generateBarColors(labelKeys);
    const intl = useIntl();
    const funType = LocalizationFunctionType.Common;

    const CustomTooltip = () => {
        return (
            <Box sx={{
                backgroundColor: '#ffffff',
                '[data-mui-color-scheme="dark"] &': {
                    backgroundColor: "#000000d4",
                }
            }} borderRadius={2} p={2} fontSize={13} boxShadow={3}>
                <Typography fontSize={'0.875rem'}>{title}</Typography>
                {labelKeys.map((label, index) => (
                    <Stack key={index} direction={'row'} spacing={1} justifyContent={'space-between'}>
                        <Stack direction={'row'} alignItems={'center'}>
                            <Stack sx={{width: '0.625rem', height: '0.625rem', backgroundColor: barColors[index], marginRight: '5px', borderRadius: '3px'}}></Stack>
                            <Stack>
                                {
                                    intl.formatMessage({ id: `${funType}.${label}`,
                                        defaultMessage: firstCharToUpperCase(label) })
                                }
                            </Stack>
                        </Stack>
                        <Stack direction={'row'}>
                            <Typography
                                fontSize={'0.875rem'}
                                mr={1}
                                >{moneyFormat(data[label] ?? 0)}
                            </Typography>
                            {
                                amountKeys.length > 0 &&
                                <Typography
                                    fontSize={'0.875rem'}
                                    fontWeight={700}>${moneyFormat(data[amountKeys[index]] ?? 0)}
                                </Typography>
                            }
                        </Stack>
                    </Stack>
                ))}
            </Box>
        );
    };


    useEffect(() => {
        const labelKeys = Object.keys(data).filter(key => !key.endsWith('Amount'))
        const amountKeys = Object.keys(data).filter(key => key.endsWith('Amount'))
        const obj = Object.entries(data)
        const labels = Object.fromEntries(obj.filter(d => {
            const [key, value] = d
            return labelKeys.includes(key)
        }))
        const initialLabels = Object.fromEntries(
            Object.keys(labels).map((key, index) => [key, index === 0 ? 1 : 0])
        )
        const allZero = Object.values(labels).every(value => value === 0)

        setIsAllZero(allZero);
        setLabels(labels)
        setLabelKeys(labelKeys)
        setAmountKeys(amountKeys)
        setNewData(allZero ? initialLabels : labels)
        setMode(theme.mode)
    }, [data, theme.mode]);

    const series = labelKeys.map((label) => {
        return {
            label: label,
            dataKey: label,
            stack: 'group',
        }
    })

    const handleItemClick = (event: React.MouseEvent) => {
        if (onItemClick) onItemClick(event)
    }

    const isHorizontal = layout === 'horizontal' && labelKeys.length === 2;

    const ContentLabels = () => {
        const isEventDetailBetSlip = title === '';
        return (
            <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                {labelKeys.map((label, index) => (
                    <ProgressText
                        key={index}
                        variant="caption"
                        sx={{ textAlign: index === 0 ? 'left' : 'right' }}
                    >
                        {isEventDetailBetSlip
                            ? `${'$' + moneyFormat(data[amountKeys.find(item => item.includes(label)) ?? ''])} / ${moneyFormat(data[label])}`
                            : moneyFormat(data[label])}
                    </ProgressText>
                ))}
            </Stack>
        );
    };
    return (
        <Box sx={{width: '100%', maxWidth: 'calc(100% - 40px)', margin: '0 auto'}}>
            <Stack direction={isHorizontal ? 'row' : 'column'} justifyContent="space-between" sx={{width: 'calc(100%)'}} spacing={1} >
                {
                    isHorizontal ?
                        <ProgressText
                            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '5ch'}}>
                            {moneyFormat(data[labelKeys[0]])}
                        </ProgressText>
                        : null
                }
                {
                    labelKeys.length > 1 ?
                        <BarChart
                            onAxisClick={(e: any) => handleItemClick(e)}
                            sx={{
                                '& .MuiBarElement-root': {
                                    rx: 3,
                                    ry: 3,
                                },
                                cursor: 'pointer'
                            }}
                            dataset={[newData]}
                            margin={{
                                left: 0,
                                right: 0,
                                top: 8,
                                bottom: 8,
                            }}
                            xAxis={[{
                                max: isAllZero ? 1 : Object.values(labels).reduce((a, b) => a + b, 0)
                            }]}
                            layout={"horizontal"}
                            height={36}
                            bottomAxis={{disableLine: true}}
                            leftAxis={{disableLine: true}}
                            series={series}
                            colors={isAllZero ? [mode === 'light' ? 'rgba(0,0,0,0.12)' : '#32383E'] : barColors}
                            skipAnimation={skipAnimation}
                            slotProps={{
                                legend: {
                                    itemMarkHeight: 0,
                                    itemMarkWidth: 0,
                                    direction: 'row',
                                    position: {
                                        vertical: 'middle',
                                        horizontal: 'middle'
                                    },
                                    labelStyle: {
                                        fontSize: 0,
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
                            tooltip={{
                                trigger: type,
                                ...(type === 'axis' ? {
                                    axisContent: () => <CustomTooltip/>
                                } : undefined)

                            }}
                        />
                        :
                        <></>
                }
                {
                    isHorizontal ?
                        <ProgressText
                            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '5ch'}}>
                            {moneyFormat(data[labelKeys[1]])}
                        </ProgressText>
                         : <></>
                }
                {
                    !isHorizontal ? <ContentLabels/> : <></>
                }
            </Stack>
        </Box>
    );
};

export default React.memo(ProgressBar, (prevProps, nextProps) => (
    lodash.isEqual(
        lodash.omit(prevProps, ['onItemClick']),
        lodash.omit(nextProps, ['onItemClick']),
    ))
)
