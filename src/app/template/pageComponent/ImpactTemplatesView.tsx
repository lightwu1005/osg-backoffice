import {GetTemplateDetailModel} from "@/services/@core/module/ResponseDataModels";
import useImpactTemplatesViewModel from "@/app/template/domain/useImpactTemplatesViewModel";
import {Box, Button, Grid, Stack, Typography} from "@mui/material";
import * as React from "react";
import {SearchTextField} from "@/modules/components/TextField";
import Tabs from "@/modules/components/tabs/Tabs";
import {
    MemoizedImpactTemplateTabContent
} from "@/app/template/components/ImpactTemlateTabContent/ImpactTemplateTabContent";
import {ArrowBack} from "@mui/icons-material";
import {ImpactTemplatesViewWordingType, useTemplateTranslate} from "@/app/template/models/useTranslateMapping";
import {ContentTable} from "@/modules/common/ContentTable";
import {ChildrenWithKey, TabPageSwitcher} from "@/modules/components/tabPageSwitcher/TabPageSwitcher";
import {ComponentType} from "@/app/template/domain/useTemplateFormViewModel";
import {StatusButtonGroupProps} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup";
import {useIntl} from "react-intl";

export interface ImpactTemplatesViewProps {
    newTemplates: GetTemplateDetailModel[];
    oldTemplates: GetTemplateDetailModel[];
    onFinished?: () => void
}

function ImpactTemplatesView(props: Readonly<ImpactTemplatesViewProps>) {
    const {
        newTemplates,
        filteredOldTemplates,
        handleSearch,
        onFinished,
        gotoSettingPage,
        tableProps,
        isTableOpen,
        setIsTableOpen,
        templateTableName,
        tabGeneralSettingArray,
        tabBetSlipSettingArray,
        tabMarketSettingArray,
    } = useImpactTemplatesViewModel(props)
    const intl = useIntl()
    const {getTranslatedWord} = useTemplateTranslate()

    const handleCloseButtonClicked = () => {
        if (onFinished) {
            onFinished()
        }
    }

    const handleCellButtonClick = (isNew: boolean, rowIndex: number, cellIndex: number) => {
        if (gotoSettingPage) {
            gotoSettingPage(isNew, rowIndex, cellIndex)
        }
    }

    const TabsContent = ({dataArray, defaultSelected}: {
        dataArray: ImpactTemplatesViewWordingType[], defaultSelected: number
    }) => {
        const isMarketView = dataArray.includes(ImpactTemplatesViewWordingType.TAB_Market)

        return (
            isMarketView ?
                (
                    <MemoizedImpactTemplateTabContent
                        key={`${ImpactTemplatesViewWordingType.TAB_Market}-${0}`}
                        contentType={ImpactTemplatesViewWordingType.TAB_Market}
                        newTemplates={newTemplates}
                        oldTemplates={filteredOldTemplates}
                        onCellButtonClick={handleCellButtonClick}
                    />
                ) :
                (
                    <Tabs
                        variant={'standard'}
                        labels={
                            dataArray.map(label => ({
                                label: getTranslatedWord(label)
                            }))
                        }
                        defaultSelected={defaultSelected}
                    >
                        {dataArray.map((type, index) => (
                            <MemoizedImpactTemplateTabContent
                                key={`${type}-${index}`}
                                contentType={type}
                                newTemplates={newTemplates}
                                oldTemplates={filteredOldTemplates}
                                onCellButtonClick={handleCellButtonClick}
                            />
                        ))}
                    </Tabs>
                )
        )
    }

    const tabs: StatusButtonGroupProps['items'] = [{
        key: ComponentType.GeneralSetting,
        text: intl.formatMessage({id: `common.generalSetting`, defaultMessage: 'General Setting'}),
        type: ComponentType.GeneralSetting,
    }, {
        key: ComponentType.BetSlipSetting,
        text: intl.formatMessage({id: `common.betSlipSetting`, defaultMessage: 'Bet Slip Setting'}),
        type: ComponentType.BetSlipSetting,
    }, {
        key: ComponentType.MarketsSetting,
        text: intl.formatMessage({id: `event.marketsSettingTitle`, defaultMessage: 'Markets Setting'}),
        type: ComponentType.MarketsSetting,
    }]

    const contents: ChildrenWithKey[] = [{
        key: ComponentType.GeneralSetting,
        item: <TabsContent dataArray={tabGeneralSettingArray}
                           defaultSelected={0}/>,
    }, {
        key: ComponentType.BetSlipSetting,
        item: <TabsContent dataArray={tabBetSlipSettingArray}
                           defaultSelected={0}/>,
    }, {
        key: ComponentType.MarketsSetting,
        item: <TabsContent dataArray={tabMarketSettingArray}
                           defaultSelected={0}/>,
    }]

    const CompareContent = () => {
        return (
            <TabPageSwitcher tabs={tabs} contents={contents}/>
        )
    }

    const handleBackButtonClicked = () => {
        handleSearch('')
        setIsTableOpen(false)
    }

    const TableContent = () => {
        return (
            <Box>
                <Grid container flexGrow={1}>
                    <Grid item xs={12} marginBottom={3}>
                        <Box display={"flex"} onClick={handleBackButtonClicked}>
                            <ArrowBack/>
                            <Typography variant="body1" textAlign="start">
                                {templateTableName.current}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} marginBottom={3}>
                        <ContentTable
                            title={tableProps.current.title}
                            rows={tableProps.current.rows}
                            markets={tableProps.current.markets}
                            actions={tableProps.current.actions}
                            columns={tableProps.current.columns}
                        />
                    </Grid>
                </Grid>
            </Box>
        )
    }

    return (
        <Box sx={{padding: 2}}>
            <Grid container flexGrow={1}>
                <Grid item xs={12} marginBottom={3}>
                    <Typography variant="h1" textAlign="center">
                        {getTranslatedWord(ImpactTemplatesViewWordingType.AllColumnChanges)}
                    </Typography>
                </Grid>
                <Box width={'100%'}>
                    {!isTableOpen && (
                        <Grid item xs={12} marginBottom={3}>
                            <SearchTextField
                                placeholder={getTranslatedWord(ImpactTemplatesViewWordingType.SearchLeague)}
                                onChange={handleSearch}
                            />
                        </Grid>
                    )}
                    {isTableOpen ? <TableContent/> : <CompareContent/>}
                </Box>
                <Grid item xs={12} style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Stack direction={"row"} spacing={2}>
                        <Button variant={'contained'} data-testid={'Summary-Card-Right-Button'}
                                color={'primary'}
                                onClick={handleCloseButtonClicked}
                        >
                            Close
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}

export const MemorizedImpactTemplatesView = React.memo(ImpactTemplatesView)
MemorizedImpactTemplatesView.displayName = 'ImpactTemplatesView'

