import useTemplateSummaryFormViewModel from "@/app/eventDetail/domain/useTemplateSummaryFormViewModel";
import {TemplateSummaryUsedModel} from "@/app/eventDetail/models/dataModel/EventDetailOddsDataModel";
import {Box, Button, Grid, Stack, Typography} from "@mui/material";
import * as React from "react";
import AlertDialog from "@/modules/components/dialog/AlertDialog";
import LoadingAnimation from "@/modules/components/general/LoadingAnimation"
import {GetTemplateDetailModel} from "@/services/@core/module/ResponseDataModels";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import MemoizedImpactTemplateDialog from "@/app/template/components/ImpactTemlateTabContent/ImpactTemplatesDialog";
import {ChildrenWithKey, TabPageSwitcher} from "@/modules/components/tabPageSwitcher/TabPageSwitcher";
import {ComponentType} from "@/app/template/domain/useTemplateFormViewModel";
import SummaryGeneralSetting from "@/app/template/pageComponent/SummaryGeneralSetting";
import SummaryBetSlipSetting from "@/app/template/pageComponent/SummaryBetSlipSetting";
import SummaryMarketsSetting from "@/app/template/pageComponent/SummaryMarketsSetting";
import MemoizedTemplateSummaryCard from "../TemplateSummaryCard";
import {WarningAmberOutlined} from "@mui/icons-material";

export enum ComeFromPage {
    AllMarketSetting,
    MarketSetting,
    AddTemplate,
    EditTemplate,
}

/**
 * @param comeFromPage currently this Summary form will be used for market setting, add/edit template pages. and will call different api to request
 * @param preValue the original value
 * @param refValue updated value
 * @param eventIds for api used
 * @param onFinished this function will let parent layer to close this dialog, if templateId is provided, it will also return to parent layer.
 * @param gotoSettingPage this function will let dialog switch between preview page and current page
 */
export interface TemplateSummaryFormProps {
    comeFromPage: ComeFromPage
    marketId?: string
    isDataFromConfiguration?: boolean
    adjustable: boolean
    preValue: TemplateSummaryUsedModel
    refValue: TemplateSummaryUsedModel
    eventIds: string[]
    impactedTemplate?: GetTemplateDetailModel[]
    onFinished?: (templateId?: string) => void
    gotoSettingPage?: () => void,
    isCustomized?: boolean
}

export const GridBlock = ({children, sx}: { children: React.ReactNode, sx?: SxProps<Theme>; }) => {
    return (
        <Grid container item xs={12} spacing={1} sx={{
            borderRadius: '0.5rem',
            backgroundColor: '#FBFCFE',
            '[data-mui-color-scheme="dark"] &': {
                backgroundColor: '#0B121F',
            },
            padding: '8px 16px',
            ...sx
        }}>
            {children}
        </Grid>
    )
}

const AllMarketSettingContent = (contentStr: string) => {
    return (
        <Box sx={{padding: 2}}>
            <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={2}>
                    <Box display="flex" justifyContent="center" alignItems="flex-start">
                        <WarningAmberOutlined sx={{
                            color: '#FFB024',
                            fontSize: '32px',
                        }}/>
                    </Box>
                </Grid>

                <Grid item xs={10}>
                    <Typography variant="body1">
                        {contentStr}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

const TemplateSummaryForm = (props: TemplateSummaryFormProps) => {
    const {
        basicTemplateInfoProps,
        marginProps,
        providerPriorityProps,
        oddsSettingProps,
        decreaseSettingProps,
        heavyBettingProps,
        singleBetProps,
        lineSettingProps,
        formTitle,
        leftButtonName,
        rightButtonName,
        handleButtonClick,
        showConfirmDialog,
        setShowConfirmDialog,
        refAlertDialogProps,
        loading,
        parlayBetProps,
        sgpBetProps,
        delaySettingProps,
        deviationProps,
        impactTemplateViewOpen,
        setImpactTemplateViewOpen,
        impactTemplateViewTitle,
        impactTemplateData,
        feederSuspendProps,
        dangerAttackActionProps,
        betSlipAmountSettingsProps,
        autoSettlementSettingsProps,
        bellowMarginSettingsProps,
        parlayAlertProps,
        rapidBetEntrySettingsProps,
        pageTabs,
        marketSettingsProps,
        handleImpactTemplateViewOpen,
        comeFromPage
    } = useTemplateSummaryFormViewModel(props)

    const contents: ChildrenWithKey[] = [{
        key: ComponentType.GeneralSetting,
        item: <SummaryGeneralSetting
            providerPriorityProps={providerPriorityProps}
            oddsSettingProps={oddsSettingProps}
            marginProps={marginProps}
            lineSettingProps={lineSettingProps}
            deviationProps={deviationProps}
            decreaseSettingProps={decreaseSettingProps}
            heavyBettingProps={heavyBettingProps}
        />,
    }, {
        key: ComponentType.BetSlipSetting,
        item: <SummaryBetSlipSetting
            feederSuspendProps={feederSuspendProps}
            dangerAttackProps={dangerAttackActionProps}
            betSlipAmountSettingsProps={betSlipAmountSettingsProps}
            autoSettlementSettingsProps={autoSettlementSettingsProps}
            bellowMarginSettingsProps={bellowMarginSettingsProps}
            parlayAlertProps={parlayAlertProps}
            rapidBetEntrySettingsProps={rapidBetEntrySettingsProps}
            delaySettingProps={delaySettingProps}
            singleBetProps={singleBetProps}
            parlayBetProps={parlayBetProps}
            sgpBetProps={sgpBetProps}
        />,
    }, {
        key: ComponentType.MarketsSetting,
        item:
            <SummaryMarketsSetting {...(marketSettingsProps)}/>
    }]

    return (
        <Box sx={{padding: 2}}>
            <Grid container flexGrow={1}>
                <Grid item xs={12} marginBottom={3}>
                    <Box display={"flex"}>
                        <Typography variant={'h1'}>{formTitle()}</Typography>
                        {impactTemplateData.current.oldTemplates.length > 0 && (
                            <Button
                                sx={{marginLeft: 3}}
                                onClick={handleImpactTemplateViewOpen}
                            >
                                {impactTemplateViewTitle}
                            </Button>
                        )}
                    </Box>
                </Grid>
                <GridBlock sx={{marginBottom: 3}}>
                    <Grid item xs={12}>
                        <MemoizedTemplateSummaryCard
                            key={basicTemplateInfoProps?.items[0].title}
                            items={basicTemplateInfoProps?.items ?? []}
                        />
                    </Grid>
                </GridBlock>
                <Grid item xs={12} marginBottom={3}>
                    <TabPageSwitcher tabs={pageTabs} contents={contents}/>
                </Grid>
                <Grid item xs={12} style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Stack direction={"row"} spacing={2}>
                        <Button variant={'outlined'} data-testid={'Summary-Card-Left-Button'}
                                color={'primary'}
                                sx={{
                                    '&.MuiButton-outlined': {
                                        borderColor: 'primary.main',
                                    },
                                    '[data-mui-color-scheme="dark"] &': {
                                        borderColor: 'primary.light',
                                    },
                                }}
                                onClick={() => handleButtonClick("left")}
                        >
                            {leftButtonName}
                        </Button>
                        <Button variant={'contained'} data-testid={'Summary-Card-Right-Button'}
                                color={'primary'}
                                onClick={() => handleButtonClick("right")}
                        >
                            {rightButtonName}
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
            <AlertDialog
                open={showConfirmDialog}
                setOpen={setShowConfirmDialog}
                {...refAlertDialogProps.current}
                content={comeFromPage === ComeFromPage.AllMarketSetting ?
                    AllMarketSettingContent((refAlertDialogProps.current.content ?? "").toString()) :
                    refAlertDialogProps.current.content
            }
            />
            <MemoizedImpactTemplateDialog
                open={impactTemplateViewOpen}
                setOpen={setImpactTemplateViewOpen}
                data={impactTemplateData.current}
            />
            <LoadingAnimation isLoading={loading}/>
        </Box>
    )
}

export const MemoizedTemplateSummaryForm = React.memo(TemplateSummaryForm);
MemoizedTemplateSummaryForm.displayName = 'TemplateSummaryForm';
