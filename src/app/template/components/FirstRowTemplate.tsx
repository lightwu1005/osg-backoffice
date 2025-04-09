import {IFirstRowTemplate} from "@/app/template/models/TemplateDetailDataModel"
import {Grid} from "@mui/material";
import {
    InfoInputComponent,
    InfoQueryableSelectTextField,
    InfoSelectComponent,
} from "@/modules/components/TextField";
import React from "react";
import {KeyboardArrowDownRounded} from "@mui/icons-material";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import lodash from "lodash";
import {LeagueFilterViewModel} from "@/modules/components/buttons/multipleFilterButton/domain/LeagueFilterViewModel";
import {DisplayType} from "@/modules/components/TextField/QueryableSelectTextField/QueryableSelectTextField";

export const FirstRowTemplate = ({
                                     sportCategories,
                                     templateName,
                                     isEditTemplate,
                                     isDuplicate,
                                     templateChange,
                                     sportName,
                                     sportChange,
                                     leagues,
                                     leaguesChange,
                                     disabled,
                                     sportId
                                 }: IFirstRowTemplate) => {
    const intl = useIntl()
    const funType = LocalizationFunctionType.Template

    const hasSelectedSport = lodash.isEmpty(sportName)

    return (
        <Grid container spacing={2} mt={2} mb={4}>
            <Grid item xs={4}>
                <InfoInputComponent
                    id={'templateName'}
                    header={intl.formatMessage({ id: `${funType}.templateName`, defaultMessage: 'Template Name' })}
                    error={isDuplicate && templateName === ''}
                    tip={""}
                    label={intl.formatMessage({ id: `${funType}.templateName`, defaultMessage: 'Template Name' })}
                    helperText={intl.formatMessage({ id: `${funType}.templateNameHelperText`, defaultMessage: 'Please enter the template name.' })}
                    format={"text"}
                    value={templateName}
                    disable={disabled}
                    onChange={(event) => templateChange(event.target.value)}
                />
            </Grid>
            <Grid item xs={4}>
                <InfoSelectComponent
                    id={'chooseSport'}
                    header={intl.formatMessage({ id: `${funType}.chooseSport`, defaultMessage: 'Choose Sport' })}
                    disabled={isEditTemplate || disabled}
                    error={hasSelectedSport}
                    helperText={hasSelectedSport ? intl.formatMessage({
                        id: `${LocalizationFunctionType.Template}.selectSportFirst`,
                        defaultMessage: 'Please select a sport first.',
                    }) : undefined}
                    menu={{
                        label: intl.formatMessage({ id: `${funType}.chooseSport`, defaultMessage: 'Choose Sport' }),
                        options: sportCategories.map(item => item.sportName),
                        value: sportName,
                        onChange: (e) => sportChange(e),
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <InfoQueryableSelectTextField
                    id={`chooseLeague`}
                    key={`${sportId}-league`}
                    header={intl.formatMessage({ id: `${funType}.chooseLeague`, defaultMessage: 'Choose League' })}
                    menu={{
                        label: intl.formatMessage({ id: `${funType}.league`, defaultMessage: 'League' }),
                        currentValues: leagues ?? [],
                        multiple: true,
                        onChange: leaguesChange,
                        ViewModel: LeagueFilterViewModel,
                        endAdornment: <KeyboardArrowDownRounded />,
                        displayType: DisplayType.Count,
                        option: { sportIds: [sportId] },
                        disabled: disabled,
                    }}
                />
            </Grid>
        </Grid>
    )
}