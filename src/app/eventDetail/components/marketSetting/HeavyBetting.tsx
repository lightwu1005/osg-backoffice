import {IHeavyBetting} from "@/app/eventDetail/models/dataModel/MarketSettingDataModel";
import {Box, Grid, Stack, Tooltip, Typography} from "@mui/material";
import {InfoOutlined} from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {InfoInputComponent} from "@/modules/components/TextField";
import React from "react";
import {styled} from "@mui/material/styles";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

const StyledToolTip = styled(Tooltip)(() => ({
    color: '#636B74'
}));

export const HeavyBetting = ({
                                 heavyBetting,
                                 heavyBettingChange,
                                 heavyBettingRange,
                                 disabled }: IHeavyBetting) => {

    const size = heavyBetting?.updateType === 'MANUAL' ? 4 : 6;
    const intl = useIntl();
    const funType = LocalizationFunctionType.Template;

    return (
        <Box mt={3}>
            <Stack direction="row" spacing={2} alignItems='center' mb={1}>
                <Typography variant={'h4'}>
                    {intl.formatMessage({ id: `${funType}.heavyBetting`, defaultMessage: 'Heavy Betting' })}
                </Typography>
                <StyledToolTip
                    title={intl.formatMessage({
                        id: `${funType}.heavyBettingTip`,
                        defaultMessage: 'When a sudden influx of bets from risk accounts is received, the odds will be decreased.'
                    })}
                    arrow>
                    <InfoOutlined />
                </StyledToolTip>
            </Stack>
            <FormControl>
                <RadioGroup
                    row
                    value={heavyBetting?.updateType}
                    onChange={heavyBettingChange ? heavyBettingChange('updateType') : () => {}}>
                    <FormControlLabel
                        disabled={disabled}
                        value="AUTO"
                        control={<Radio checked={heavyBetting?.updateType === 'AUTO'} />}
                        label={intl.formatMessage({ id: `${funType}.autoOddsUpdate`, defaultMessage: 'Automatic odds update' })}
                    />
                    <FormControlLabel
                        disabled={disabled}
                        value="MANUAL"
                        control={<Radio checked={heavyBetting?.updateType === 'MANUAL'} />}
                        label={intl.formatMessage({ id: `${funType}.manualOddsUpdate`, defaultMessage: 'Manual odds update' })}
                    />
                </RadioGroup>
            </FormControl>
            <Grid container spacing={2}>
                <Grid item xs={size}>
                    <InfoInputComponent
                        disable={disabled}
                        header={''}
                        error={false}
                        tip={""}
                        label={intl.formatMessage({ id: `${funType}.timeLimit`, defaultMessage: 'Time limit (Second)' })}
                        helperText={''}
                        suffix={intl.formatMessage({ id: `${funType}.second`, defaultMessage: 'Second' })}
                        format={"number"}
                        value={Number(heavyBetting?.timeLimit)}
                        onChange={heavyBettingChange ? heavyBettingChange('timeLimit') : () => {}}
                        limitRange={heavyBettingRange?.timeLimit}
                    />
                </Grid>
                <Grid item xs={size}>
                    <InfoInputComponent
                        disable={disabled}
                        header={''}
                        error={false}
                        label={intl.formatMessage({ id: `${funType}.amountOfBet`, defaultMessage: 'Amount of bet' })}
                        helperText={''}
                        format={"number"}
                        value={Number(heavyBetting?.amount)}
                        onChange={heavyBettingChange ? heavyBettingChange('amount') : () => {}}
                        limitRange={heavyBettingRange?.amount}
                    />
                </Grid>
                {heavyBetting?.updateType === 'MANUAL' && (
                    <Grid item xs={size}>
                        <InfoInputComponent
                            disable={disabled}
                            header={''}
                            error={false}
                            label={intl.formatMessage({ id: `${funType}.oddsDecreasePercentage`, defaultMessage: 'Odds Decrease %' })}
                            helperText={''}
                            format={"number"}
                            suffix={"%"}
                            value={Number(heavyBetting?.decrease)}
                            onChange={heavyBettingChange ? heavyBettingChange('decrease') : () => {}}
                            limitRange={heavyBettingRange?.decrease}
                        />
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}
