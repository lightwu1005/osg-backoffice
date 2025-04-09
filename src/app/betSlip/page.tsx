"use client";
import React from "react";
import {Button, Stack, TextField, Typography, Switch, MenuItem} from "@mui/material";
import {StatusButtonGroup} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup";
import {SingleInputDateRangePicker, TextFieldsContainer} from "@/modules/components/TextField";
import {AccountBalanceWalletRounded, FilterAltRounded} from "@mui/icons-material";
import SwitchListButton from "@/modules/components/buttons/switchListButton/SwitchListButton";
import CommonTable from "@/modules/components/eventTable/CommonTable";
import ActionButton from "@/modules/components/buttons/actionButton/ActionButton";
import PageFramework from "@/modules/components/general/PageFramework";
import DropdownInput from "@/modules/components/DropdownInput/DropdownInput";
import {MultipleFilterButton} from "@/modules/components/buttons/multipleFilterButton/MultipleFilterButton";
import {FilterSection} from "@/modules/components/buttons/multipleFilterButton/pageComponent/FilterSection";
import useBetSlipsViewModel from "@/app/betSlip/domain/useBetSlipsViewModel";
import ExportDialog from "@/app/betSlip/components/pageComponent/ExportDialog";
import ParlayDetailDialog from "@/modules/components/parlayDetail/ParlayDetail";
import AlertDialog from "@/modules/components/dialog/AlertDialog";
import {disableSelectionOnClick, pinColumns, rowsPerPageOptions} from "@/app/betSlip/components/columns";
import {BetTypeFilterViewModel} from "@/modules/components/buttons/multipleFilterButton/domain/BetTypeFilterViewModel";
import {SportFilterViewModel} from "@/modules/components/buttons/multipleFilterButton/domain/SportFilterViewModel";
import {LeagueFilterViewModel} from "@/modules/components/buttons/multipleFilterButton/domain/LeagueFilterViewModel";
import {MarketFilterViewModel} from "@/modules/components/buttons/multipleFilterButton/domain/MarketFilterViewModel";
import {
    BetStatusFilterViewModel
} from "@/modules/components/buttons/multipleFilterButton/domain/BetStatusFilterViewModel";
import {CustomFilterSection} from "@/modules/components/buttons/multipleFilterButton/pageComponent/CustomFilterSection";
import PaidIcon from "@mui/icons-material/Paid";
import {ConditionPayout} from "@/modules/components/buttons/multipleFilterButton/pageComponent/ConditionPayout";
import {DeviceFilterViewModel} from "@/modules/components/buttons/multipleFilterButton/domain/DeviceFilterViewModel";
import {
    BetSlipStatusFilterViewModel
} from "@/modules/components/buttons/multipleFilterButton/domain/BetSlipStatusFilterViewModel";
import {
    BetResultFilterViewModel
} from "@/modules/components/buttons/multipleFilterButton/domain/BetResultFilterViewModel";
import BetAmountFilter from "@/app/betSlip/components/NumberRangeTextField";
import FilterKeeper from "@/app/betSlip/components/FilterKeeper/FilterKeeper";
import ConfirmationDialog from "@/modules/components/dialog/ConfirmationDialog";
import SimpleBetNumberCard from "@/app/betSlip/components/SimpleBetNumberCard";
import {BetSlipEventType, BetStatus} from "@/services/@core/module/Enum";
import {
    ProviderFilterViewModel
} from "@/modules/components/buttons/multipleFilterButton/domain/ProviderFilterViewModel";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {EventStartTime} from "@/modules/components/buttons/multipleFilterButton/pageComponent/EventStartTime";
import {
    BettingTypeFilterViewModel
} from "@/modules/components/buttons/multipleFilterButton/domain/BettingTypeFilterViewModel";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    rejectedRow: {
        backgroundColor: '#FFDAB0A6 !important',
        '[data-mui-color-scheme="dark"] &': {
            backgroundColor: '#2E1B05 !important',
        },
    },
    deletedRow: {
        backgroundColor: '#FFDAB0A6 !important',
        '[data-mui-color-scheme="dark"] &': {
            backgroundColor: '#171A1C !important',
        },
        color: '#00000061 !important',
    }
});

export default function Page() {
    const {
        isEditable,
        betSlipTypes,
        showExportDialog,
        setShowExportDialog,
        parlayDetailProps,
        showParlayDialog,
        setShowParlayDialog,
        searchOption,
        dataKey,
        manageColumns,
        handleColumnsSwitchChanges,
        dataColumns,
        pageModel,
        rowSelectionModel,
        onRowSelectionModelChange,
        betSlipList,
        handleQueryChange,
        loading,
        filterSelected,
        setFilterSelected,
        handleBetAmountChanged,
        actions,
        canClean,
        handleActionItemClick,
        confirmationDialog,
        alertDialog,
        dateRange,
        intl,
        funCommonType,
        queryParams,
        fireSeconds,
        fireSecondOptions,
        isFiring,
        handleRealTimeSwitchChange,
        handleRealTimeUpdateIntervalChange,
        selectedBetSlipEventType
    } = useBetSlipsViewModel()
    const classes = useStyles();

    return (
        <PageFramework>
            <Stack spacing={2} sx={{
                width: '100%', maxWidth: '100%', mx: 'auto', paddingY: 2, paddingX: 3,
                minHeight: 0,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Stack direction="row" justifyContent="space-between" alignItems='center'>
                    <StatusButtonGroup
                        items={betSlipTypes}
                        selectedIndex={betSlipTypes.findIndex(type =>
                            type.key === selectedBetSlipEventType.current)}
                        onClick={(_, key) => {
                            selectedBetSlipEventType.current = key as BetSlipEventType
                            if (key === BetSlipEventType.all) {
                                handleQueryChange({
                                    eventType: undefined,
                                })
                            } else {
                                handleQueryChange({
                                    eventType: key,
                                })
                            }
                        }}
                    />
                    <Stack spacing={2} direction="row" alignItems='center'>
                        <SwitchListButton
                            buttonIcon={<FilterAltRounded/>}
                            buttonText={intl.formatMessage({
                                id: `${funCommonType}.manageColumns`, defaultMessage: 'Manage Columns'
                            })}
                            listLabels={manageColumns}
                            dataKey={dataKey}
                            minSelected={1}
                            onSwitchChanges={handleColumnsSwitchChanges}
                        />
                        <Button
                            sx={{paddingY: 1, paddingX: 2}}
                            variant={'outlined'}
                            onClick={() => setShowExportDialog(true)}
                        >
                            {
                                intl.formatMessage({
                                    id: `${funCommonType}.export`, defaultMessage: 'Export'
                                })
                            }
                        </Button>
                        {isEditable && <ActionButton
                            sx={{paddingY: 1, paddingX: 2}}
                            label={intl.formatMessage({
                                id: `${funCommonType}.actions`, defaultMessage: 'Actions'
                            })}
                            list={actions}
                            onItemClick={handleActionItemClick}
                        />}
                    </Stack>
                </Stack>
                <Stack direction="row" alignItems='center'>
                    <Switch
                        onChange={(checked) => handleRealTimeSwitchChange(checked.target.checked)}
                        checked={isFiring}
                    />
                    <Typography>
                        {intl.formatMessage({
                            id: `betSlip.realTime`, defaultMessage: "Real-Time"
                        })}
                    </Typography>
                    {isFiring && (
                        <Stack paddingX={2} spacing={1} direction={'row'} alignItems={'center'}>
                            <Typography noWrap>
                                {intl.formatMessage({
                                    id: `betSlip.refreshPageEvery`, defaultMessage: "Refresh page every"
                                })}
                            </Typography>
                            <TextField
                                sx={{width: 70}}
                                select
                                size={'small'}
                                value={fireSeconds}
                                onChange={(e) => handleRealTimeUpdateIntervalChange(parseInt(e.target.value))}
                            >
                                {fireSecondOptions.map((item, index) => (
                                    <MenuItem key={`${item}-${index}`} value={item}>{item}</MenuItem>
                                ))}
                            </TextField>
                            <Typography>
                                {intl.formatMessage({
                                    id: `betSlip.seconds`, defaultMessage: "Seconds"
                                })}
                            </Typography>
                        </Stack>
                    )
                    }
                </Stack>
                <TextFieldsContainer
                    canClean={canClean}
                    displayCleanButton={true}
                    cleanButton={
                        <MultipleFilterButton selected={filterSelected} setSelected={setFilterSelected}>
                            <FilterSection key={0} ViewModel={BetTypeFilterViewModel}/>
                            <FilterSection key={1} ViewModel={SportFilterViewModel}/>
                            <FilterSection key={2}
                                           option={{
                                               sportIds: queryParams.sportIds
                                           }}
                                           ViewModel={LeagueFilterViewModel}
                            />
                            <FilterSection key={3} ViewModel={MarketFilterViewModel}/>
                            <CustomFilterSection key={4} ItemProps={{
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
                            <FilterSection key={5} ViewModel={BetStatusFilterViewModel}/>
                            <CustomFilterSection key={6} ItemProps={{
                                getFilterItemProps: () => {
                                    return {
                                        labelLangKey: 'maximumPayout',
                                        label: 'Maximum Payout',
                                        icon: PaidIcon
                                    }
                                }
                            }}>
                                <ConditionPayout/>
                            </CustomFilterSection>
                            <CustomFilterSection key={7} ItemProps={{
                                getFilterItemProps: () => {
                                    return {
                                        labelLangKey: 'payout',
                                        label: 'Payout',
                                        icon: AccountBalanceWalletRounded
                                    }
                                }
                            }}>
                                <ConditionPayout/>
                            </CustomFilterSection>
                            <FilterSection key={8} ViewModel={DeviceFilterViewModel}/>
                            <FilterSection key={9} ViewModel={ProviderFilterViewModel}/>
                            {selectedBetSlipEventType.current === BetSlipEventType.all ?
                                <FilterSection key={10} ViewModel={BettingTypeFilterViewModel} isSingleSelect={true}/> :
                                <> </>
                            }
                            <FilterSection key={11} ViewModel={BetSlipStatusFilterViewModel}/>
                            <FilterSection key={12} ViewModel={BetResultFilterViewModel}/>
                        </MultipleFilterButton>
                    }>
                    <DropdownInput
                        searchOptions={searchOption.map(item => item.value) as string[]}
                        onSearch={(type: string, value: string) => handleQueryChange({
                            search: {
                                searchType: (value !== '') ? searchOption.find((item => item.value === type))?.key : undefined,
                                searchValue: (value !== '') ? value : undefined,
                            },
                        })}
                        defaultSearch={{
                            type: queryParams.search?.searchType
                                ? searchOption.find(item => item.key === queryParams.search?.searchType)?.value?.toString() ?? undefined
                                : undefined,
                            value: queryParams.search?.searchValue ?? undefined,
                        }}
                    />
                    <BetAmountFilter onChange={handleBetAmountChanged}/>
                    <SingleInputDateRangePicker
                        label={intl.formatMessage({id: `${funCommonType}.betTime`, defaultMessage: 'Bet Time'})}
                        value={[dateRange.startDate, dateRange.endDate]}
                        onChange={(dateRange) => {
                            handleQueryChange({
                                startDate: dateRange?.[0]?.unix(),
                                endDate: dateRange?.[1]?.unix(),
                            })
                        }}
                    />
                </TextFieldsContainer>
                <FilterKeeper data={filterSelected} onSelected={setFilterSelected}/>
                <CommonTable
                    columns={dataColumns}
                    rows={betSlipList?.content ?? []}
                    rowCount={betSlipList?.totalElements ?? 0}
                    checkboxSelection={isEditable}
                    disableRowSelectionOnClick={disableSelectionOnClick}
                    pageSizeOptions={rowsPerPageOptions}
                    rowSelectionModel={rowSelectionModel}
                    onRowSelectionModelChange={onRowSelectionModelChange}
                    pageModel={pageModel}
                    setPageModel={newPageModel => handleQueryChange({
                        ...newPageModel
                    })}
                    onSortModeChange={(sortField, sortDirection) => {
                        handleQueryChange({sortField, sortDirection})
                    }}
                    isLoading={loading}
                    initialState={{pinnedColumns: {...pinColumns, right: ['option']}}}
                    rowHeight={96}
                    getRowClassName={(params) => {
                        const statusPart = params.row.statusPart
                        const status = statusPart.status
                        switch (status) {
                            case BetStatus.VOID:
                            case BetStatus.DELETE:
                                return classes.deletedRow
                            default:
                                return ''
                        }
                    }}
                />
                <ExportDialog open={showExportDialog} setOpen={setShowExportDialog}/>
                <ParlayDetailDialog parlayId={parlayDetailProps.parlayId}
                                    betAmount={parlayDetailProps.betAmount}
                                    legs={parlayDetailProps.legs}
                                    device={parlayDetailProps.device}
                                    maxPayout={parlayDetailProps.maxPayout}
                                    open={showParlayDialog}
                                    setOpen={setShowParlayDialog}/>
                <ConfirmationDialog id={confirmationDialog.id}
                                    title={confirmationDialog.title}
                                    subTitle={confirmationDialog.subTitle}
                                    options={confirmationDialog.options}
                                    checkBox={confirmationDialog.checkBox}
                                    contentCard={<SimpleBetNumberCard singleBets={confirmationDialog.singleBets}
                                                                      parlayBets={confirmationDialog.parlayBets}/>}
                                    onClose={confirmationDialog.onClose}
                                    open={confirmationDialog.open}
                                    setOpen={confirmationDialog.setOpen}
                />
                <AlertDialog open={alertDialog.open}
                             setOpen={alertDialog.setOpen}
                             title={alertDialog.title}
                             content={alertDialog.content}
                             actions={alertDialog.actions}
                />
            </Stack>
        </PageFramework>
    );
}