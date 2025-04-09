import {Box, Stack, Typography} from "@mui/material";
import * as React from "react";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

/**
 * @param singleBets Represent how many single bet slips be selected.
 * @param parlayBets Represent how many parlay bet slips be selected.
 */
export interface SimpleBetInfoCardProps {
    singleBets: number;
    parlayBets: number;
}

const SimpleBetNumberCard = ({singleBets, parlayBets}: SimpleBetInfoCardProps) => {
    const intl = useIntl();
    const funType = LocalizationFunctionType.BetSlip;
    const excluded = (parlayBets > 0) ? intl.formatMessage(
        {id: `${funType}.includeParlay`, defaultMessage: 'Include'}) : intl.formatMessage(
        {id: `${funType}.excludeParlay`, defaultMessage: 'Exclude'});

    return (
        <Box sx={{bgcolor: '#F0F4F8', borderRadius: 2}} marginRight={3} marginLeft={3} padding={2}>
            <Stack direction={'row'}>
                <Typography color={'#555E68'}>
                    {intl.formatMessage(
                        {id: `${funType}.singleBet`, defaultMessage: 'Single Bet'}
                    )}
                </Typography>
                <Typography color={'#171A1C'} marginLeft={1}>{singleBets}</Typography>
            </Stack>
            <Stack direction={'row'}>
                <Typography color={'#555E68'}>
                    {intl.formatMessage(
                        {id: `${funType}.includeParlayInfluence`, defaultMessage: 'Include parlay influence'}
                    )}
                </Typography>
                <Typography color={'#171A1C'} marginLeft={1}>{excluded}</Typography>
            </Stack>
            {(parlayBets > 0) &&
                <Stack direction={'row'}>
                    <Typography color={'#555E68'}>
                        {intl.formatMessage(
                                {id: `${funType}.parlay`, defaultMessage: 'Parlay'}
                        )}
                    </Typography>
                    <Typography color={'#171A1C'} marginLeft={1}>{parlayBets}</Typography>
                </Stack>
            }
        </Box>
    )
}

export default SimpleBetNumberCard