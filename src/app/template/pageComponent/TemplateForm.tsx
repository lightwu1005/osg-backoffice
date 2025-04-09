import {Stack, Typography, Box, Checkbox} from "@mui/material"
import useTemplateFormViewModel, {ComponentType} from "@/app/template/domain/useTemplateFormViewModel"
import {FirstRowTemplate} from "@/app/template/components/FirstRowTemplate"
import Button from "@mui/material/Button"
import {TemplateSummaryFormProps} from "@/app/eventDetail/components/pageComponent/TemplateSummaryForm"
import FormControlLabel from "@mui/material/FormControlLabel"
import {ChildrenWithKey, TabPageSwitcher} from "@/modules/components/tabPageSwitcher/TabPageSwitcher"
import {GeneralSetting} from "@/app/template/components/GeneralSetting"
import MarketConfigFormContent from "@/app/template/components/marketConfigForm/MarketConfigFormContent";
import {BetSlipSetting} from "@/app/template/components/BetSlipSetting";

export interface TemplateFormProps {
    editTemplateId?: string
    isDuplicate: boolean
    eventType: string
    onPublish?: (data: TemplateSummaryFormProps) => void
    viewOnly?: boolean
}

function TemplateForm(props: TemplateFormProps) {
    const viewModel = useTemplateFormViewModel(props)

    const contents: ChildrenWithKey[] = [{
        key: ComponentType.GeneralSetting,
        item: <GeneralSetting {...viewModel.GeneralSettingProps}/>,
    }, {
        key: ComponentType.BetSlipSetting,
        item: <BetSlipSetting {...viewModel.BetSlipSettingProps}/>,
    }, {
        key: ComponentType.MarketsSetting,
        item: <MarketConfigFormContent {...viewModel.marketSettingsProps}/>
    }]

    return (
        <Box sx={{padding: '32px'}}>
            <Stack height={'100%'} direction={"column"}>
                <Stack spacing={1} direction={"column"}>
                    <Typography variant={'h1'}>{viewModel.pageTitle}</Typography>
                    <Typography variant={'body1'}>{viewModel.pageDescribe}</Typography>
                </Stack>
                <FirstRowTemplate {...viewModel.FirstRowTemplateProp}/>
                <TabPageSwitcher tabs={viewModel.tabs} contents={contents}/>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <FormControlLabel
                        control={<Checkbox checked={viewModel.DefaultSettingProp.defaultChecked}/>}
                        label={viewModel.DefaultSettingProp.title}
                        onChange={viewModel.DefaultSettingProp.onCheck}
                        disabled={props.viewOnly ?? !viewModel.isEditable}
                    />
                    <Button variant="contained" onClick={viewModel.onClickPublish}
                            disabled={!viewModel.isSubmitEnabled || !viewModel.isEditable}
                    >
                        {
                            viewModel.intl.formatMessage({
                                id: `${viewModel.funType}.formSubmit`, defaultMessage: 'Publish'})
                        }
                    </Button>
                </Stack>
            </Stack>
        </Box>
    )
}

export default TemplateForm