import React from "react";
import {IFeedOddsSetting} from "@/app/eventDetail/models/dataModel/MarketSettingDataModel";
import {Grid, Stack, Typography} from "@mui/material";
import {InfoInputComponent} from "@/modules/components/TextField";
import StyledToolTip from "@/modules/components/general/StyledToolTip";
import {InfoOutlined} from "@mui/icons-material";
import {RegexPatterns} from "@/modules/common/CommonRegexChecker";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

export const FeedOddsSetting: React.FC<IFeedOddsSetting> = ({ feedOdds, feedOddsChange, feedOddsRange, disabled }) => {
    const intl = useIntl();
    const funType = LocalizationFunctionType.Template;

    return (
        <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                        <Typography variant={"h4"}>
                            {intl.formatMessage({ id: `${funType}.feederOddsMinimumSetting`,
                                defaultMessage: 'Feeder Odds Alignment Minimum Setting' })}
                        </Typography>
                        <StyledToolTip title={intl.formatMessage({ id: `${funType}.feederOddsMinimumSettingTip`,
                            defaultMessage: 'When odds in the range it will update automatically' })}>
                            <InfoOutlined />
                        </StyledToolTip>
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <InfoInputComponent
                    disable={disabled}
                    header={''}
                    error={+feedOdds?.minimum > +feedOdds?.maximum}
                    helperText={intl.formatMessage({ id: `${funType}.amountLessThanMax`,
                        defaultMessage: 'The amount needs to be less than the maximum.' })}
                    tip={""}
                    label={intl.formatMessage({ id: `${funType}.minimumOdds`, defaultMessage: 'Minimum Odds' })}
                    format={"number"}
                    value={Number(feedOdds?.minimum)}
                    onChange={feedOddsChange ? feedOddsChange('minimum') : () => {}}
                    regex={RegexPatterns.OddSettingLimit}
                    limitRange={feedOddsRange?.minimum}
                />
            </Grid>
            <Grid item xs={4}>
                <InfoInputComponent
                    disable={disabled}
                    header={''}
                    error={+feedOdds?.minimum > +feedOdds?.maximum}
                    helperText={intl.formatMessage({ id: `${funType}.amountGreaterThanMin`,
                        defaultMessage: 'The amount needs to be greater than the minimum.' })}
                    label={intl.formatMessage({ id: `${funType}.maximumOdds`, defaultMessage: 'Maximum Odds' })}
                    format={"number"}
                    value={Number(feedOdds?.maximum)}
                    regex={RegexPatterns.OddSettingLimit}
                    onChange={feedOddsChange ? feedOddsChange('maximum') : () => {}}
                    limitRange={feedOddsRange?.maximum}
                />
            </Grid>
            <Grid item xs={4}>
                <InfoInputComponent
                    disable={disabled}
                    header={''}
                    error={false}
                    label={intl.formatMessage({ id: `${funType}.oddsDifferenceAlignment`,
                        defaultMessage: 'Odds Difference Alignment %' })}
                    helperText={''}
                    format={"number"}
                    suffix={"%"}
                    value={Number(feedOdds?.difference)}
                    onChange={feedOddsChange ? feedOddsChange('difference') : () => {}}
                    limitRange={feedOddsRange?.difference}
                />
            </Grid>
        </Grid>
    )
}
