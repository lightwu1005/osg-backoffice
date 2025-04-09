"use client"
import React from "react";
import useMarketSettingViewModel from "@/app/eventDetail/domain/useMarketSettingViewModel";
import {Stack, Typography, Box} from "@mui/material";
import {FirstRow} from "@/app/eventDetail/components/marketSetting/FirstRow";
import Button from '@mui/material/Button';
import {TemplateSummaryFormProps} from "@/app/eventDetail/components/pageComponent/TemplateSummaryForm";
import TemplateFormDialog from "@/app/template/pageComponent/TemplateFormDialog";
import {ChildrenWithKey, TabPageSwitcher} from "@/modules/components/tabPageSwitcher/TabPageSwitcher"
import {ComponentType} from "@/app/template/domain/useTemplateFormViewModel";
import {GeneralSetting} from "@/app/template/components/GeneralSetting";
import {BetSlipSetting} from "@/app/template/components/BetSlipSetting";
import MarketConfigFormContent from "@/app/template/components/marketConfigForm/MarketConfigFormContent";

/**
 * @param marketId To filter templates including this market, only use by single market settings to get list
 * */
export interface MarketSettingProps{
    eventId?: string
    eventType: string
    marketId?: string
    sportId: string
    sportType: string
    sportName: string
    leagueId?: string
    leagueName?: string
    onNext?: (data: TemplateSummaryFormProps) => void;
}

export const MarketSettingPage = (props: MarketSettingProps) => {
    const viewModel = useMarketSettingViewModel(props)

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
        <Box sx={{
            width: '100%',
            padding: '32px'
        }}>
            <Stack spacing={1} direction={"column"}>
                <Typography variant={'h1'}>{viewModel.pageTitle}</Typography>
                <Typography variant={'body1'}>{viewModel.pageDescribe}</Typography>
            </Stack>
            <FirstRow {...viewModel.FirstColumnsProp}/>
            <TabPageSwitcher tabs={viewModel.tabs} contents={contents}/>
            <Stack alignItems={'flex-end'}>
                <Button variant="contained" onClick={viewModel.onClickNext} disabled={!viewModel.isSubmitEnabled}>
                    {
                        viewModel.intl.formatMessage({id: `${viewModel.funCommonType}.next`, defaultMessage: 'Next'})
                    }
                </Button>
            </Stack>
            <TemplateFormDialog
                open={viewModel.showTemplateModelDialog}
                setOpen={viewModel.setShowTemplateModelDialog}
                templateModelProps={{
                    eventType: props.eventType,
                    isDuplicate: false
                }}
                onFinished={viewModel.refresh}
            />
        </Box>
    )
}