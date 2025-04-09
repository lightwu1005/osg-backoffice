import {
    DeviationOption,
    IOddsDeviation,
} from "@/app/eventDetail/models/dataModel/MarketSettingDataModel";
import {Grid} from "@mui/material";
import {InfoInputComponent, InfoSelectComponent} from "@/modules/components/TextField";
import {getEnumKeyByValue} from "@/modules/common/DataProcessUnit";
import React from "react";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

export const OddsDeviation = ({ deviation, onDeviationChange, thresholdRange, disabled }: IOddsDeviation) => {
    const intl = useIntl();
    const funType = LocalizationFunctionType.Template;

    return (
        <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
                <InfoInputComponent
                    disable={disabled}
                    header={intl.formatMessage({ id: `${funType}.oddsDeviationThreshold`, defaultMessage: 'Odds Deviation Threshold' })}
                    error={false}
                    tip={intl.formatMessage({ id: `${funType}.oddsDeviationThresholdTip`, defaultMessage: 'The action will impact the odds calculation results.' })}
                    label={intl.formatMessage({ id: `${funType}.oddsDeviationThreshold`, defaultMessage: 'Odds Deviation Threshold' })}
                    helperText={''}
                    format={"number"}
                    suffix={'%'}
                    value={Number(deviation?.percentage)}
                    onChange={onDeviationChange ? onDeviationChange('percentage') : () => {}}
                    limitRange={thresholdRange}
                />
            </Grid>
            <Grid item xs={6}>
                <InfoSelectComponent
                    disabled={disabled}
                    header={intl.formatMessage({ id: `${funType}.deviationResponseActions`, defaultMessage: 'Deviation Response Actions' })}
                    tip={intl.formatMessage({ id: `${funType}.deviationResponseActionsTip`, defaultMessage: 'Upon auto-calculating odds to reach deviation, Deviation Response Actions will automatically initiate.' })}
                    menu={{
                        label: intl.formatMessage({ id: `${funType}.deviationResponseActions`, defaultMessage: 'Deviation Response Actions' }),
                        options: Object.keys(DeviationOption),
                        value: getEnumKeyByValue(DeviationOption, deviation?.action),
                        onChange: onDeviationChange ? onDeviationChange('action') : () => {}
                    }}
                />
            </Grid>
        </Grid>
    )
}