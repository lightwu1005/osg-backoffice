"use client";
import React from "react";
import {Box, Stack} from "@mui/material";
import {StatusButtonGroup} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup";
import Tabs, {FilterTabProps} from "@/modules/components/tabs/Tabs";
import useEventListViewModel from "@/app/eventList/domain/useEventListViewModel";
import {MenuTextField, QueryableSelectTextField, TextFieldsContainer} from "@/modules/components/TextField";
import {FilterAltRounded, KeyboardArrowDownRounded} from "@mui/icons-material";
import SwitchListButton from "@/modules/components/buttons/switchListButton/SwitchListButton";
import CommonTable from "@/modules/components/eventTable/CommonTable";
import ActionButton from "@/modules/components/buttons/actionButton/ActionButton";
import AlertDialog from "@/modules/components/dialog/AlertDialog";
import PageFramework from "@/modules/components/general/PageFramework";
import DropdownInput from "@/modules/components/DropdownInput/DropdownInput";
import MarketSettingDialog from "@/app/eventDetail/components/pageComponent/MarketSettingDialog";
import {MultipleFilterButton} from "@/modules/components/buttons/multipleFilterButton/MultipleFilterButton";
import {FilterSection} from "@/modules/components/buttons/multipleFilterButton/pageComponent/FilterSection";
import {
    LocationFilterViewModel
} from "@/modules/components/buttons/multipleFilterButton/domain/LocationFilterViewModel";
import {CustomFilterSection} from "@/modules/components/buttons/multipleFilterButton/pageComponent/CustomFilterSection";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {EventStartTime} from "@/modules/components/buttons/multipleFilterButton/pageComponent/EventStartTime";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import useTabViewModel from "@/viewModels/useTabViewModel";
import {EventSuspendedStatus} from "@/services/@core/module/Enum";
import {makeStyles} from "@mui/styles";
import TemplateFormDialog from "../template/pageComponent/TemplateFormDialog";
import {
    checkboxSelection,
    disableSelectionOnClick,
    pinColumns,
    rowsPerPageOptions
} from "./components/oddsEventColumns";
import {
    EventStatusFilterViewModel
} from "@/modules/components/buttons/multipleFilterButton/domain/EventStatusFilterViewModel";
import RightDrawer from "@/modules/components/drawer/RightDrawer";
import OtherLinesDrawerContent from "@/app/eventList/components/pageComponent/OtherLinesDrawerContent";
import {LeagueFilterViewModel} from "@/modules/components/buttons/multipleFilterButton/domain/LeagueFilterViewModel";
import {DisplayType} from "@/modules/components/TextField/QueryableSelectTextField/QueryableSelectTextField";

const useStyles = makeStyles({
    suspendedRow: {
        backgroundColor: '#FFDAB0A6 !important',
        '[data-mui-color-scheme="dark"] &': {
            backgroundColor: '#2E1B05 !important',
        },
    },
    closeRow: {
        backgroundColor: '#DDE7EECC !important',
        '[data-mui-color-scheme="dark"] &': {
            backgroundColor: '#171A1C !important',
        },
    },
    providerSuspendedRow: {
        backgroundColor: '#FFDAB0A6 !important',
        '[data-mui-color-scheme="dark"] &': {
            backgroundColor: '#240505 !important',
        },
    },
    providerCloseRow: {
        backgroundColor: '#DDE7EECC !important',
        '[data-mui-color-scheme="dark"] &': {
            backgroundColor: '#0B121F !important',
        },
    },
});

function TabContent({sportId, sportType, sportName}: { sportId: string, sportType: string, sportName: string }) {
    const {
        loading,
        defaultEventTypeIndex,
        dataKey,
        searchOption,
        pageModel,
        eventList,
        manageColumns,
        defaultLabels,
        displayType,
        dataColumns,
        actions,
        eventTypeList,
        displayTypeOptions,
        search,
        defaultSearch,
        leagueSelected,
        filterSelected,
        setFilterSelected,
        dialogProps,
        canClean,
        onlyPin,
        rowSelectionModel,
        showMarketSetting, setShowMarketSetting,
        marketSettingProps,
        showDialog, setShowDialog,
        onCellClick,
        handleActionClick,
        handleEventTypeChange,
        handleDisplayTypeChange,
        handlePriceChanged,
        handleMarketActiveChange,
        handleOtherLinesContentProgressBarClick,
        handleOnlyPinChange,
        handleSearch,
        handleLeague,
        handleQueryChange,
        onRowSelectionModelChange,
        handleColumnsSwitchChanges,
        setShowOtherLinesDrawer,
        showOtherLinesDrawer,
        otherLinesDrawerContent,
        dataGridRef,
        configuration,
        intl,
        funCommonType,
        funType,
        showTemplateDialog,
        setShowTemplateDialog,
        applyTemplate,
        showRightDrawer,
        setShowRightDrawer,
        rightDrawerProps,
        eventType,
        handleColumnOrderChange,
        disableColumnResize,
    } = useEventListViewModel(sportId, sportType, sportName)
    const classes = useStyles();
    const initialState = {
        pinnedColumns: {...pinColumns, right: ['actions']}
    };
    const disableColumnReorder = true

    return (
        <PageFramework>
            <Box sx={{
                minHeight: 0,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Stack spacing={2} sx={{
                    width: '100%', maxWidth: '100%', mx: 'auto', paddingY: 2
                }}>
                    <Stack direction="row" justifyContent="space-between" alignItems='center'>
                        <StatusButtonGroup
                            items={eventTypeList}
                            onClick={handleEventTypeChange}
                            selectedIndex={defaultEventTypeIndex}
                        />
                        <Stack spacing={2} direction="row" alignItems='center'>
                            <MenuTextField
                                placeholder={'Fractional'}
                                iconComponent={KeyboardArrowDownRounded}
                                options={displayTypeOptions}
                                value={displayType}
                                onChange={handleDisplayTypeChange}
                            />
                            <SwitchListButton
                                buttonIcon={<FilterAltRounded sx={{color: '#636B74'}}/>}
                                buttonText={intl.formatMessage({
                                    id: `${funCommonType}.manageColumns`, defaultMessage: 'Manage Columns'
                                })}
                                listLabels={manageColumns}
                                dataKey={dataKey}
                                minSelected={1}
                                defaultLabels={defaultLabels}
                                onSwitchChanges={handleColumnsSwitchChanges}
                            />
                            <ActionButton
                                label={intl.formatMessage({
                                    id: `${funCommonType}.actions`, defaultMessage: 'Actions'
                                })}
                                list={actions}
                                onItemClick={handleActionClick}
                                sx={{paddingY: 1, paddingX: 2}}/>
                        </Stack>
                    </Stack>
                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                        <TextFieldsContainer
                            canClean={canClean}
                            displayCleanButton={true}
                            cleanButton={
                                <MultipleFilterButton
                                    selected={filterSelected}
                                    setSelected={setFilterSelected}
                                >
                                    <FilterSection key={1} option={{
                                        sportId: sportId
                                    }} ViewModel={LocationFilterViewModel}/>
                                    <CustomFilterSection key={2} ItemProps={{
                                        getFilterItemProps: () => {
                                            return {
                                                labelLangKey: 'eventStartTime',
                                                label: 'Event Start Time',
                                                icon: CalendarTodayIcon
                                            }
                                        }
                                    }}>
                                        <EventStartTime/>
                                    </CustomFilterSection>
                                    <FilterSection key={3} ViewModel={EventStatusFilterViewModel}/>
                                </MultipleFilterButton>
                            }>
                            <DropdownInput
                                searchOptions={searchOption.map(item => item.value) as string[]}
                                defaultSearch={defaultSearch}
                                search={search}
                                onSearch={handleSearch}/>
                            <QueryableSelectTextField
                                key={`${sportId}-${eventType}_AllLeagues`}
                                label={intl.formatMessage({
                                    id: `${funCommonType}.league`, defaultMessage: 'League'
                                })}
                                onChange={handleLeague}
                                ViewModel={LeagueFilterViewModel}
                                multiple={true}
                                displayType={DisplayType.Count}
                                option={{
                                    sportIds: [sportId],
                                    eventType: eventType
                                }}
                                currentValues={leagueSelected.map(item => {
                                    return {id: item.leagueId, name: item.leagueName}
                                })}
                                endAdornment={<KeyboardArrowDownRounded/>}
                            />
                        </TextFieldsContainer>
                        <FormControlLabel
                            control={<Switch checked={onlyPin} onChange={handleOnlyPinChange}/>}
                            label={intl.formatMessage({
                                id: `${funType}.pinOnly`, defaultMessage: 'Pin Only'
                            })}
                            sx={{whiteSpace: 'nowrap'}}
                        />
                    </Stack>
                </Stack>
                <CommonTable
                    dataGridRef={dataGridRef}
                    columns={dataColumns}
                    rows={eventList?.content ?? []}
                    rowCount={eventList?.totalElements ?? 0}
                    checkboxSelection={checkboxSelection}
                    disableRowSelectionOnClick={disableSelectionOnClick}
                    pageSizeOptions={rowsPerPageOptions}
                    rowSelectionModel={rowSelectionModel}
                    onRowSelectionModelChange={onRowSelectionModelChange}
                    onRowClick={onCellClick}
                    pageModel={pageModel}
                    setPageModel={newPageModel => handleQueryChange({
                        ...newPageModel
                    })}
                    onSortModeChange={(sortField, sortDirection) => {
                        handleQueryChange({sortField, sortDirection})
                    }}
                    isLoading={loading}
                    initialState={initialState}
                    rowHeight={'auto'}
                    getRowClassName={(params) => {
                        const status = params.row?.eventSuspendedStatus;
                        switch (status) {
                            case EventSuspendedStatus.SUSPENDED:
                                return classes.suspendedRow;
                            case EventSuspendedStatus.CLOSE:
                                return classes.closeRow;
                            case EventSuspendedStatus.PROVIDER_SUSPENDED:
                                return classes.providerSuspendedRow;
                            case EventSuspendedStatus.PROVIDER_CLOSE:
                                return classes.providerCloseRow;
                            default:
                                return '';
                        }
                    }}
                    onColumnOrderChange={handleColumnOrderChange}
                    disableColumnResize={disableColumnResize}
                    disableColumnReorder={disableColumnReorder}
                />
            </Box>
            <MarketSettingDialog
                open={showMarketSetting} setOpen={setShowMarketSetting}
                marketSettingProps={marketSettingProps}
            />
            <AlertDialog
                open={showDialog}
                setOpen={setShowDialog}
                {...dialogProps}
            />
            <RightDrawer
                open={showOtherLinesDrawer}
                setOpen={setShowOtherLinesDrawer}
                title={otherLinesDrawerContent.title}
                subTitle={otherLinesDrawerContent.subTitle}
            >
                <OtherLinesDrawerContent
                    {...otherLinesDrawerContent}
                    onMarketStatusChange={handleMarketActiveChange}
                    onOddPriceChanged={handlePriceChanged}
                    onDataSelected={handleOtherLinesContentProgressBarClick}
                    configuration={configuration}
                />
            </RightDrawer>
            <TemplateFormDialog
                open={showTemplateDialog}
                setOpen={setShowTemplateDialog}
                templateModelProps={{
                    eventType: applyTemplate.eventType,
                    editTemplateId: applyTemplate.templateId,
                    isDuplicate: false,
                    viewOnly: true
                }}
                onFinished={() => {
                }}
            />
            <RightDrawer
                open={showRightDrawer}
                setOpen={setShowRightDrawer}
                title={rightDrawerProps?.title}
                subTitle={rightDrawerProps?.subTitle}
            >
                {rightDrawerProps?.children}
            </RightDrawer>
        </PageFramework>
    );
}

export default function Page() {
    const {
        labels,
        sportCategories,
        selectedIndex,
        handleTabChange
    } = useTabViewModel()
    const intl = useIntl();
    const funType = `${LocalizationFunctionType.Common}.sportCategory`;
    const filterTab: FilterTabProps = {
        searchLabel: intl.formatMessage({id: `${funType}.searchLabel`, defaultMessage: 'Search Sports'}),
        filterLabel: intl.formatMessage({id: `${funType}.filterLabel`, defaultMessage: 'All Sports'})
    }

    return (
        <Stack spacing={2} sx={{
            width: '100%',
            maxWidth: '100%',
            height: '100%',
            mx: 'auto',
            paddingX: "1rem",
            paddingY: "0.75rem"
        }}>
            <Tabs
                labels={labels}
                filterTab={filterTab}
                selected={selectedIndex}
                onTabChange={handleTabChange}>
                {
                    sportCategories.map((category) => (
                        <TabContent key={category.sportId} sportId={category.sportId}
                                    sportType={category.sportType} sportName={category.sportName}/>
                    ))
                }
            </Tabs>
        </Stack>
    );
}
