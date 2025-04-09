import {IImbalancedBettingDecrease} from "@/app/eventDetail/models/dataModel/MarketSettingDataModel";
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

export const ImbalancedBettingDecrease = ({
                                              imbalancedBettingDecrease,
                                              onImbalancedBettingDecrease,
                                              imbalancedRange,
                                              disabled
                                          }: IImbalancedBettingDecrease) => {

    const size = imbalancedBettingDecrease?.updateType === 'MANUAL' ? 4 : 6;
    const intl = useIntl();
    const funType = LocalizationFunctionType.Template;

    return (
        <Box mt={3}>
            <Stack direction="row" alignItems='center' spacing={'0.5rem'} mb={1}>
                <Typography variant={'h4'}>
                    {intl.formatMessage({ id: `${funType}.imbalancedBettingSetting`,
                        defaultMessage: 'Imbalanced Betting Setting' })}
                </Typography>
                <StyledToolTip
                    title={intl.formatMessage({
                        id: `${funType}.imbalancedBettingSettingTip`,
                        defaultMessage: 'When the amount wagered reaches a disparity causing imbalance,' +
                            ' the odds will automatically be Decreased.'
                    })}
                    arrow>
                    <InfoOutlined />
                </StyledToolTip>
            </Stack>
            <FormControl>
                <RadioGroup
                    row
                    value={imbalancedBettingDecrease?.updateType}
                    onChange={onImbalancedBettingDecrease ? onImbalancedBettingDecrease('updateType') : () => {}}>
                    <FormControlLabel
                        disabled={disabled}
                        value="AUTO"
                        control={<Radio checked={imbalancedBettingDecrease?.updateType === 'AUTO'} />}
                        label={intl.formatMessage({ id: `${funType}.autoOddsUpdate`,
                            defaultMessage: 'Automatic odds update' })}
                    />
                    <FormControlLabel
                        disabled={disabled}
                        value="MANUAL"
                        control={<Radio checked={imbalancedBettingDecrease?.updateType === 'MANUAL'} />}
                        label={intl.formatMessage({ id: `${funType}.manualOddsUpdate`,
                            defaultMessage: 'Manual odds update' })}
                    />
                </RadioGroup>
            </FormControl>
            <Grid container spacing={2}>
                <Grid item xs={size}>
                    <InfoInputComponent
                        disable={disabled}
                        header={''}
                        error={false}
                        label={intl.formatMessage({ id: `${funType}.percentageOfDifference`,
                            defaultMessage: 'Percentage of difference' })}
                        helperText={''}
                        format={"number"}
                        suffix={"%"}
                        value={Number(imbalancedBettingDecrease?.difference)}
                        onChange={onImbalancedBettingDecrease ? onImbalancedBettingDecrease('difference') : () => {}}
                        limitRange={imbalancedRange?.difference}
                    />
                </Grid>
                {imbalancedBettingDecrease?.updateType === 'MANUAL' && (
                    <Grid item xs={size}>
                        <InfoInputComponent
                            disable={disabled}
                            header={''}
                            error={false}
                            label={intl.formatMessage({ id: `${funType}.oddsDecreasePercentage`,
                                defaultMessage: 'Odds Decrease %' })}
                            helperText={''}
                            format={"number"}
                            suffix={"%"}
                            value={Number(imbalancedBettingDecrease?.decrease)}
                            onChange={onImbalancedBettingDecrease ? onImbalancedBettingDecrease('decrease') : () => {}}
                            limitRange={imbalancedRange?.decrease}
                        />
                    </Grid>
                )}
                <Grid item xs={size}>
                    <InfoInputComponent
                        disable={disabled}
                        header={''}
                        error={false}
                        label={intl.formatMessage({ id: `${funType}.recalculateMinimumAmount`,
                            defaultMessage: 'Recalculate Minimum Amount' })}
                        helperText={''}
                        format={"number"}
                        value={Number(imbalancedBettingDecrease?.recalculate)}
                        onChange={onImbalancedBettingDecrease ? onImbalancedBettingDecrease('recalculate') : () => {}}
                        limitRange={imbalancedRange?.recalculate}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}