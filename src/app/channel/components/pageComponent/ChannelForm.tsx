import * as React from "react";
import {Box, Button, Grid, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import {
    InfoInputComponent,
    InfoMultiSelectComponent,
    InfoSelectComponent
} from "@/modules/components/TextField";
import {RegexPatterns} from "@/modules/common/CommonRegexChecker";
import ToggleProps from "@/modules/interface/ToggleProps";
import {FullScreenDialog} from "@/modules/components/dialog/FullScreenDialog";
import useChannelFormViewModel from "@/app/channel/domain/useChannelFormViewModel";
import {OutlinedInputProps} from "@mui/material/OutlinedInput";
import {InfoHeaderInputProps} from "@/modules/components/infoHeaderInput/InfoHeaderInput";
import {Functionality} from "@/services/@core/module/Enum";
import {ConfigurationRounding} from "@/services/@core/module/CommonDataModels";
import {AvailableOwnerSelectionViewModel, OptionModelItem} from "@/app/channel/domain/AvailableOwnerSelectionViewModel";
import {InfoQueryableSelectTextField} from "@/modules/components/TextField/InfoQueryableSelectTextField";
import {LocalChannelFormModel} from "@/app/channel/models/LocalDataTranslate";
import {LineSettingOptionsType} from "@/app/configuration/domain/useConfigurationViewModel";
import StyledToolTip from "@/modules/components/general/StyledToolTip";
import {InfoOutlined} from "@mui/icons-material";
import {range0To100, range1To1000, range0To4} from "@/utils/rangeLimits";
import {IntlShape} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

export interface ChannelFormProps extends ToggleProps {
    channelId?: string
    onFinished: () => void
}

interface OddsDefaultConfigurationFormProps {
    isEditable: boolean,
    providers: string[],
    lineSettingOptions: string[],
    lineSettings: string,
    fieldsValues: LocalChannelFormModel,
    handleDynamicChange: (path: string) => (value: any) => void,
    oddsRange: [number, number],
    roundingRange: [number, number],
    differenceRange: [number, number],
    marginRange?: [number, number],
    isMaxOddsFieldValid: boolean,
    toRuleNameDisplay: ({ruleName, ruleNumber}: ConfigurationRounding) => string,
    intl: IntlShape
}

function OddsDefaultConfigurationForm(props: OddsDefaultConfigurationFormProps) {
    const {
        isEditable,
        providers,
        lineSettingOptions,
        lineSettings,
        fieldsValues,
        handleDynamicChange,
        toRuleNameDisplay,
        intl
    } = props;

    const funTypeConfig = LocalizationFunctionType.Configuration;
    const funTypeChannel = LocalizationFunctionType.Channel;

    const generateOddsSettingPros = (label: string, header: string, value: any, onChange: OutlinedInputProps['onChange'], suffix?: string, tip?: string): InfoHeaderInputProps => {
        return {
            error: false,
            tip: tip,
            suffix: suffix,
            header: header,
            helperText: 'The maximum allowable input is 4 digits.',
            label: label,
            value: value,
            onChange: onChange,
            format: 'number',
            limitRange: range1To1000,
            regex: RegexPatterns.OddSettingLimit
        }
    }

    const minimum = fieldsValues.configuration?.oddsSettings?.minimum ?? 0
    const maximum = fieldsValues.configuration?.oddsSettings?.maximum ?? 0

    const generateRoundingProps = (label: string, header: string, value: any, onChange: OutlinedInputProps['onChange'], tip?: string): InfoHeaderInputProps => {
        return {
            error: false,
            tip: tip,
            header: header,
            helperText: 'The maximum allowable input is 4 digits.',
            label: label,
            value: value,
            onChange: onChange,
            format: 'numeric',
            limitRange: range0To4,
            regex: RegexPatterns.Rounding
        }
    }

    const renderRoundingFields = (startIndex: number, endIndex: number, Component: any) => {
        return Array.from({ length: endIndex - startIndex + 1 }, (_, i) => {
            const index = i + startIndex;
            return (
                <Grid item xs={12} sm={4} key={index} mb={2} alignItems={'flex-end'} justifyContent={'flex-end'}>
                    <Component
                        {...generateRoundingProps(
                            toRuleNameDisplay(fieldsValues.configuration?.rounding[index] ?? {
                                ruleName: '',
                                ruleNumber: 0
                            }),
                            '',
                            fieldsValues.configuration?.rounding[index]?.ruleNumber === 0 ? '0' : fieldsValues.configuration?.rounding[index]?.ruleNumber,
                            handleDynamicChange(`configuration.rounding.${index}.ruleNumber`),
                            ''
                        )}
                        disable={!isEditable}
                    />
                </Grid>
            );
        });
    };

    return (
        <>
            <Stack direction="row" paddingY={4} spacing={0.5} alignContent="start" alignItems="center">
                <Typography variant={'h3'}>
                    {
                        intl.formatMessage({
                            id: `${funTypeChannel}.oddsDefaultConfig`, defaultMessage: 'Odds Default Configuration'})
                    }
                </Typography>
            </Stack>
            <Grid container spacing={2} flexGrow={1} alignContent={'start'}>
                <Grid item xs={12}>
                    <InfoMultiSelectComponent
                        header={intl.formatMessage({id: `${funTypeChannel}.oddProvider`, defaultMessage: 'Odd Provider'})}
                        tip={intl.formatMessage({id: `${funTypeChannel}.oddProviderTip`, defaultMessage: 'You can select multiple odd providers to the channel.'})}
                                              menu={
                                                  {
                                                      label: intl.formatMessage({
                                                          id: `${funTypeChannel}.selectProvider`,
                                                          defaultMessage: 'Select the odd provider'
                                                      }),
                                                      options: providers,
                                                      initialSelectedOptions: fieldsValues.configuration?.oddsProviders,
                                                      onChange: handleDynamicChange('configuration.oddsProviders')
                                                  }
                                              }
                                              disabled={!isEditable}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InfoSelectComponent header={intl.formatMessage({id: `${funTypeConfig}.lineSettings`, defaultMessage: 'Line Settings'})}
                                         disabled={!isEditable}
                                         tip={intl.formatMessage({id: `${funTypeConfig}.lineSettingsTips`, defaultMessage: 'Setup the line you want to open to the channel.'})}
                                         menu={
                        {
                            label: intl.formatMessage({id: `${funTypeConfig}.selectTheLineSettings`, defaultMessage: 'Select the line settings'}),
                            options: lineSettingOptions,
                            value: lineSettings,
                            onChange: handleDynamicChange('configuration.lineSettings')
                        }
                    }/>
                </Grid>
            </Grid>
            <Grid container paddingY={2} spacing={2} flexGrow={1} alignContent={'start'} mb={3}>
                <Grid item xs={12}>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Stack direction={"row"} spacing={1} alignItems={"center"}>
                            <Typography variant={"h4"}>{intl.formatMessage({id: `${funTypeChannel}.oddsSetting`, defaultMessage: 'Odds Setting'})}</Typography>
                            <StyledToolTip title={intl.formatMessage({id: `${funTypeChannel}.oddsSettingTip`, defaultMessage: 'You will received the range of odds from feeders.'})}>
                                <InfoOutlined/>
                            </StyledToolTip>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <InfoInputComponent
                        header={''}
                        error={minimum > maximum}
                        tip={''}
                        label={intl.formatMessage({id: `${funTypeConfig}.minimumOdds`, defaultMessage: 'Minimum Odds'})}
                        helperText={intl.formatMessage({id: `${funTypeConfig}.minimumOddsTips`, defaultMessage: 'The amount needs to be less than the maximum.'})}
                        format={"number"}
                        limitRange={range1To1000}
                        regex={RegexPatterns.OddSettingLimit}
                        value={fieldsValues.configuration?.oddsSettings.minimum}
                        onChange={handleDynamicChange('configuration.oddsSettings.minimum')}
                        disable={!isEditable}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <InfoInputComponent
                        {...generateOddsSettingPros(
                            intl.formatMessage({id: `${funTypeConfig}.maximumOdds`, defaultMessage: 'Maximum Odds'}),
                            '',
                            fieldsValues.configuration?.oddsSettings.maximum,
                            handleDynamicChange('configuration.oddsSettings.maximum'),
                        )}
                        helperText={intl.formatMessage({id: `${funTypeConfig}.maximumOddsTips`, defaultMessage: 'The amount needs to be greater than the minimum.'})}
                        error={minimum > maximum}
                        disable={!isEditable}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <InfoInputComponent
                        {...generateOddsSettingPros(
                            intl.formatMessage({id: `${funTypeConfig}.minimumDifference`, defaultMessage: 'Minimum Difference %'}),
                            '',
                            fieldsValues.configuration?.oddsSettings.difference,
                            handleDynamicChange('configuration.oddsSettings.difference'),
                            '%',
                        )}
                        limitRange={range0To100}
                        disable={!isEditable}
                    />
                </Grid>
            </Grid>

            <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <Typography variant={"h4"}>
                    {intl.formatMessage({ id: `${funTypeConfig}.roundingRules`, defaultMessage: 'Rounding Rules' })}
                </Typography>
                <StyledToolTip title={intl.formatMessage({ id: `${funTypeConfig}.roundingRulesTips`, defaultMessage: 'Number of digits after the decimal point' })}>
                    <InfoOutlined/>
                </StyledToolTip>
            </Stack>
            <Grid container paddingY={1.5} paddingBottom={1} spacing={1}>
                {renderRoundingFields(0, 2, InfoInputComponent)}
                {renderRoundingFields(3, 5, InfoInputComponent)}
                {renderRoundingFields(6, 8, InfoInputComponent)}
            </Grid>
        </>
    )
}

function ChannelForm(props: ChannelFormProps) {
    const {
        title,
        subTitle,
        buttonTitle,
        locations,
        displayTypes,
        fieldsValues,
        isEditable,
        isSubmitEnabled,
        handleQueryableSelectedValue,
        handleDynamicChange,
        handleChannelAction,
        clonedFieldsValues,
        isMaxOddsFieldValid,
        handleMarginChange,
        intl,
        funType,
        ...others
    } = useChannelFormViewModel(props)

    const theme = useTheme()
    const isLessThanSm = useMediaQuery(theme.breakpoints.down('sm'));
    const functionality = process.env.FUNCTIONALITY || '';
    const isAdmin = functionality === Functionality.Admin;

    const extraOwner: OptionModelItem = {
        id: clonedFieldsValues.current.ownerId,
        name: clonedFieldsValues.current.ownerName,
        model: {
            uuid: clonedFieldsValues.current.ownerId,
            userName: clonedFieldsValues.current.ownerName,
            userAccount: clonedFieldsValues.current.email
        }
    }

    const currentOwner: OptionModelItem = {
        id: fieldsValues.ownerId,
        name: fieldsValues.ownerName,
        model: {
            uuid: fieldsValues.ownerId,
            userName: fieldsValues.ownerName,
            userAccount: fieldsValues.email
        }
    }

    return (
        <Box sx={{padding: '2.5rem'}}>
            <Stack spacing={4} direction={"column"}>
                <Grid container spacing={3} direction={"column"}>
                    <Stack spacing={1} direction={"column"}>
                        <Typography variant={'h1'}>{title}</Typography>
                        <Typography variant={'body1'}>{subTitle}</Typography>
                    </Stack>
                    <Grid container paddingY={4} spacing={2} flexGrow={1} alignContent={'start'}>
                        <Grid item xs={12} sm={isAdmin ? 6 : 4}>
                            <InfoInputComponent
                                id={'channelName'}
                                header={intl.formatMessage({
                                    id: `${funType}.formName`,
                                    defaultMessage: 'Channel Name'}
                                )}
                                error={false}
                                label={intl.formatMessage({
                                    id: `${funType}.formNameLabel`,
                                    defaultMessage: 'Input the channel name'}
                                )}
                                helperText={intl.formatMessage({
                                    id: `${funType}.formNameHelperText`,
                                    defaultMessage: 'Please enter a valid channel name'}
                                )}
                                value={fieldsValues.channelName}
                                regex={RegexPatterns.ChannelName}
                                disable={!isEditable}
                                onChange={handleDynamicChange('channelName')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={isAdmin ? 6 : 4}>
                            <InfoSelectComponent
                                header={intl.formatMessage({
                                    id: `${funType}.formLocation`,
                                    defaultMessage: 'Location'}
                                )}
                                disabled={!isEditable} menu={
                                {
                                    label: intl.formatMessage({
                                        id: `${funType}.formLocationLabel`,
                                        defaultMessage: 'Select a country'}
                                    ),
                                    options: locations,
                                    value: fieldsValues.locationName,
                                    onChange: handleDynamicChange('locationName')
                                }
                            }/>
                        </Grid>
                        {(!isAdmin &&
                            <Grid item xs={12} sm={4}>
                                <InfoInputComponent
                                    id={'margin'}
                                    header={intl.formatMessage({
                                        id: `${funType}.formMargin`,
                                        defaultMessage: 'Margin'}
                                    )}
                                    error={false}
                                    format={'number'}
                                    label={intl.formatMessage({
                                        id: `${funType}.formMarginLabel`,
                                        defaultMessage: 'Input the Margin or default 0%'}
                                    )}
                                    helperText={''}
                                    value={fieldsValues.margin}
                                    onChange={handleDynamicChange('margin')}
                                    disable={!isEditable}
                                    limitRange={others.marginRange.current}
                                />
                            </Grid>
                        )}
                    </Grid>
                    <Grid container spacing={2} flexGrow={1} alignContent={'start'}>
                        <Grid item xs={4}>
                            <InfoMultiSelectComponent
                                header={intl.formatMessage({
                                    id: `${funType}.formOddsFormat`,
                                    defaultMessage: 'Odds Format'}
                                )}
                                disabled={!isEditable} menu={{
                                    label: intl.formatMessage({
                                        id: `${funType}.formOddsFormatLabel`,
                                        defaultMessage: 'Select the odds format'}
                                    ),
                                    options: displayTypes,
                                    isEmptyEqualSelectAll: false,
                                    onChange: handleDynamicChange('oddsFormat'),
                                    initialSelectedOptions: fieldsValues.oddsFormat,
                                    limitTags: isLessThanSm ? 2 : undefined
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} alignContent={'start'}>
                            <InfoQueryableSelectTextField
                                id={'ownerName'}
                                header={intl.formatMessage({
                                    id: `${funType}.formOwnerName`,
                                    defaultMessage: 'Owner\'s Name'}
                                )}
                                menu={{
                                    label: intl.formatMessage({
                                        id: `${funType}.formOwnerNameLabel`,
                                        defaultMessage: 'Select the owner name'}
                                    ),
                                    placeholder: intl.formatMessage({
                                        id: `${funType}.formOwnerNameLabel`,
                                        defaultMessage: 'Select the owner name'}
                                    ),
                                    currentValues: [currentOwner],
                                    extraItems: [extraOwner],
                                    onChange: handleQueryableSelectedValue,
                                    ViewModel: AvailableOwnerSelectionViewModel
                                }}
                                disabled={!isEditable}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <InfoInputComponent
                                header={intl.formatMessage({
                                    id: `${funType}.formContactEmail`,
                                    defaultMessage: 'Contact Email'}
                                )}
                                error={false}
                                label={intl.formatMessage({
                                    id: `${funType}.formContactEmailLabel`,
                                    defaultMessage: 'Contact Email'}
                                )}
                                helperText={''}
                                value={fieldsValues.email}
                                disable={true}
                            />
                        </Grid>
                    </Grid>
                    {(isAdmin) ?
                        <OddsDefaultConfigurationForm
                            isEditable={isEditable}
                            providers={others.providers}
                            lineSettingOptions={Object.values(LineSettingOptionsType)}
                            lineSettings={others.lineSettings}
                            fieldsValues={fieldsValues}
                            handleDynamicChange={handleDynamicChange}
                            oddsRange={range1To1000}
                            roundingRange={range0To4}
                            differenceRange={range0To100}
                            marginRange={others.marginRange.current}
                            isMaxOddsFieldValid={isMaxOddsFieldValid}
                            toRuleNameDisplay={others.toRuleNameDisplay}
                            intl={intl}
                        /> :
                        <Box paddingTop={8}/>
                    }
                    <Stack alignItems={'end'}>
                        <Button
                            data-testid="channel-form-submit"
                            variant={'contained'}
                            color={'primary'}
                            disabled={!isSubmitEnabled}
                            onClick={handleChannelAction}
                        >
                            {buttonTitle}
                        </Button>
                    </Stack>
                </Grid>
            </Stack>
        </Box>
    )
}

export default function ChannelFormDialog(props: ChannelFormProps & ToggleProps) {
    const {open, setOpen} = props
    return <FullScreenDialog
        open={open}
        setOpen={setOpen}
        content={
            <ChannelForm {...props} />
        }
    />
}