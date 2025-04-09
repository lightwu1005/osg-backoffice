import {
    IMarginLine,
    LineSettingsOptions
} from "@/app/eventDetail/models/dataModel/MarketSettingDataModel"
import {Grid} from "@mui/material"
import {InfoSelectComponent, InfoInputComponent} from "@/modules/components/TextField"
import { useIntl } from "react-intl"
import { LocalizationFunctionType } from "@/localizedConfig/LanguageContext"
import {getEnumKeyByValue} from "@/modules/common/DataProcessUnit";
import React from "react";
import {range0To100} from "@/utils/rangeLimits";

export const MarginLine = ({
                                margin,
                                lineSettings,
                                onMarginLineChange,
                                lineSettingDropDown,
                                disabled
                            }: IMarginLine) => {

    const intl = useIntl()
    const funType = LocalizationFunctionType.Template

    return (
        <Grid container spacing={2} mt={1} alignItems={'flex-end'}>
            <Grid item xs={6}>
                <InfoInputComponent
                    header={intl.formatMessage({ id: `${funType}.margin`, defaultMessage: 'Margin' })}
                    error={false}
                    tip={intl.formatMessage({ id: `${funType}.marginTip`, defaultMessage: 'Setting the profit margin for odds.' })}
                    label={intl.formatMessage({ id: `${funType}.margin`, defaultMessage: 'Margin' })}
                    helperText={''}
                    format={"numeric"}
                    step={0.5}
                    suffix={"%"}
                    value={Number(margin)}
                    limitRange={range0To100}
                    disable={disabled}
                    onChange={onMarginLineChange ? onMarginLineChange('margin') : () => {}}
                />
            </Grid>
            <Grid item xs={6}>
                <InfoSelectComponent
                    disabled={disabled}
                    header={intl.formatMessage({ id: `${funType}.lineSettings`,
                        defaultMessage: 'Line Settings' })}
                    tip={intl.formatMessage({ id: `${funType}.chooseMarketsTip`,
                        defaultMessage: 'Choose the markets you want to open.' })}
                    menu={{
                        label: intl.formatMessage({ id: `${funType}.lineSetting`, defaultMessage: 'Line Setting' }),
                        options: !lineSettingDropDown ? Object.keys(LineSettingsOptions) : lineSettingDropDown.map(item => getEnumKeyByValue(LineSettingsOptions, item)) as string[],
                        value: getEnumKeyByValue(LineSettingsOptions, lineSettings),
                        onChange: onMarginLineChange ? onMarginLineChange('lineSettings') : () => {}
                    }}
                />
            </Grid>
        </Grid>
    )
}
