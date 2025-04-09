import {IFirstRow} from "@/app/eventDetail/models/dataModel/MarketSettingDataModel";
import {Button, Divider, Grid} from "@mui/material";
import {
    InfoQueryableSelectTextField,
    InfoSelectComponent
} from "@/modules/components/TextField";
import React from "react";
import {TemplateListViewModel} from "@/app/eventDetail/domain/TemplateListViewModel";
import {OptionItem} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

export const FirstRow = ({
                             sportId,
                             sportType,
                             sportName,
                             templateId,
                             templateName,
                             templateChange,
                             eventType,
                             openNewTemplateDialog,
                             templateListRenderKey,
                             isCustomized
                         }: IFirstRow) => {
    const intl = useIntl()
    const funType = LocalizationFunctionType.Template

    return (
        <Grid container spacing={2} mt={2} mb={4}>
            <Grid item xs={6}>
                {/* should be locked because there should be only one sport per market setting */}
                <InfoSelectComponent
                    disabled={true}
                    header={intl.formatMessage({ id: `${funType}.chooseSport`, defaultMessage: 'Choose Sport' })}
                    menu={{
                        options: [sportName],
                        value: sportType
                    }}
                />
            </Grid>
            <Grid item xs={6}>
                <InfoQueryableSelectTextField
                    key={`template-list-${templateListRenderKey}`}
                    header={intl.formatMessage({ id: `${funType}.templateName`, defaultMessage: 'Template Name' })}
                    menu={{
                        label: intl.formatMessage({ id: `${funType}.templateName`, defaultMessage: 'Template Name' }),
                        multiple: false,
                        disableClearable: true,
                        error: (templateId === ''),
                        ViewModel: TemplateListViewModel,
                        option: {
                            eventType: eventType,
                            sportIds: [sportId]
                        },
                        extraItems: isCustomized ? [{id: templateId, name: templateName}] : [],
                        currentValues:[
                            { id: templateId, name: templateName }
                        ],
                        onChange: (value: OptionItem[]) => templateChange(value.shift() as OptionItem),
                        bottomOptions: [
                            <>
                                <Divider/>
                                <Button
                                    key={"add-new-template"}
                                    variant={"text"}
                                    color="primary"
                                    fullWidth
                                    sx={{justifyContent: "flex-start", paddingX: 2, paddingY: 1}}
                                    onMouseDown={openNewTemplateDialog}
                                >
                                    {
                                        intl.formatMessage({
                                            id: `${funType}.createAsNewTemplate`,
                                            defaultMessage: 'Create as new template'
                                        })
                                    }
                                </Button>
                            </>
                        ]
                    }}
                />
            </Grid>
        </Grid>
    )
}