import {Box, Stack, Typography} from "@mui/material";
import React from "react";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

const styles = {
    statistics: {
        fontSize: '0.875rem',
        lineHeight: '1.5rem',
        color: 'text.secondary',
        fontWeight: 500,
        margin: '8px 111px'
    },
    times: {
        fontWeight: 700,
        color: 'text.primary',
        fontSize: '0.875rem',
        lineHeight: '1.5rem',
        margin: '8px 16px'
    }
};

export interface StatisticSummaryProps {
    name: string
    home: number
    away: number
    sequence: number
}

const StatisticSummary = ({data}: { data: StatisticSummaryProps[] }) => {
    const intl = useIntl();
    const funType = LocalizationFunctionType.Event;

    return (
        <>
            <Stack direction='row'>
                <Box sx={{
                    marginTop: '32px',
                    flex: 1,
                    textAlign: 'right'
                }}>
                    {
                        data.map((item, index) =>
                            <Box key={index} sx={{...styles.times}}>{item.home}</Box>
                        )
                    }
                </Box>
                <Box sx={{textAlign: 'center'}}>
                    <Typography variant="subtitle2" color="text.primary" lineHeight='1.5rem' mb={2}>
                        {
                            intl.formatMessage({
                                id: `${funType}.statistic`,
                                defaultMessage: 'STATISTIC'
                            })
                        }
                    </Typography>
                    {
                        data.map((item, index) =>
                            <Box key={index} sx={{...styles.statistics}}>{item.name}</Box>
                        )
                    }
                </Box>
                <Box sx={{
                    marginTop: '32px',
                    flex: 1,
                    textAlign: 'left'
                }}>
                    {
                        data.map((item, index) =>
                            <Box key={index} sx={{...styles.times}}>{item.away}</Box>
                        )
                    }
                </Box>
            </Stack>
        </>
    )
}

export default StatisticSummary