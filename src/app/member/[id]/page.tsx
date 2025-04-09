"use client";
import {Divider, Stack, Typography} from "@mui/material";
import * as React from "react";
import PageFramework from "@/modules/components/general/PageFramework";
import Breadcrumbs from "@/modules/components/breadcrumbs/Breadcrumbs";
import {DropdownChipViewModel} from "@/modules/components/chip/ChipDropdown/domain/DropdownChipViewModel";
import {DropdownChip} from "@/modules/components/chip/ChipDropdown/component/DropdownChip";
import useMemberDetailViewModel from "@/app/member/domain/useMemberDetailViewModel";
import {usePathname} from "next/navigation";
import CommonTable from "@/modules/components/eventTable/CommonTable";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
    checkboxSelection,
    disableSelectionOnClick,
    rowsPerPageOptions
} from "@/app/member/components/memberDetailColumn";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {MarketFilterViewModel} from "@/modules/components/buttons/multipleFilterButton/domain/MarketFilterViewModel";
import {
    AutoMultiMenuTextField,
    QueryableSelectTextField,
    SearchTextField,
    SingleInputDateRangePicker,
    TextFieldsContainer
} from "@/modules/components/TextField";
import {DisplayType} from "@/modules/components/TextField/QueryableSelectTextField/QueryableSelectTextField";
import CustomDatePerformanceFrame from "@/app/member/[id]/components/CustomDatePerformanceFrame";
import CommonLineChart from "@/modules/components/charts/CommonLineChart";
import {InfoType} from "@/services/@core/module/Enum";
import {hashDataWith} from "@/utils/tools";
import CommonPieChart from "@/modules/components/charts/CommonPieChart";
import ParlayDetailDialog from "@/modules/components/parlayDetail/ParlayDetail";
import {RiskGroupDataModel} from "@/services/@core/module/ResponseDataModels";
import {LeagueFilterViewModel} from "@/modules/components/buttons/multipleFilterButton/domain/LeagueFilterViewModel";
import {KeyboardArrowDownRounded} from "@mui/icons-material";

export default function Page() {
    const path = usePathname()
    const memberId = path ? path.split('/').pop() || '' : '';
    const intl = useIntl();
    const funMemberDetail = `${LocalizationFunctionType.Member}.detail`
    const funCommonType = LocalizationFunctionType.Common;
    const funBetSlip = LocalizationFunctionType.BetSlip;
    const funMemberType = LocalizationFunctionType.Member
    const defaultRiskLevel = {
        id: 'defaultRiskLevel',
        name: intl.formatMessage({id: `${funMemberType}.defaultRiskLevel`, defaultMessage: 'Default Risk Level'}),
        data: {} as RiskGroupDataModel
    };

    const {
        loading,
        columns,
        riskMember,
        betSlips,
        totalAmount,
        winLossRate,
        totalCustomDateRange,
        winLossCustomDateRange,
        // leagues,
        statuses,
        betSlipDateRange,
        canClean,
        dateOptions,
        betSlipsPageModel,
        parlayDetailProps,
        showParlayDialog, setShowParlayDialog,
        handleQueryChange,
        handleLeague,
        handleMarket,
        handleStatus,
        handleDateRangeChange,
        handleRiskChange,
        handleTotalAmountDate,
        handleWinLossRateDate
    } = useMemberDetailViewModel(memberId)

    return (
        <PageFramework>
            <Stack sx={{width: '100%', maxWidth: '100%', mx: 'auto', padding: '2.5rem'}}>
                <Breadcrumbs/>
                <Stack direction={'row'} spacing={1} alignItems="center">
                    <Typography variant={'h3'}>{riskMember.punterAccount}</Typography>
                    <DropdownChip
                        key={riskMember.risk.riskId}
                        ViewModel={DropdownChipViewModel}
                        label={riskMember.risk.riskName}
                        multiple={true}
                        currentValues={[
                            riskMember.risk.riskId ? {
                                id: riskMember.risk.riskId,
                                name: riskMember.risk.riskName,
                                data: riskMember.risk as unknown as RiskGroupDataModel
                            } : defaultRiskLevel,
                        ]}
                        onChange={(options) => {
                            handleRiskChange(options);
                        }}
                    />
                </Stack>
                <Divider sx={{width: '100%', marginTop: '0.5rem', marginBottom: '1rem'}}/>
                <Stack direction={'row'} spacing={1}>
                    <CustomDatePerformanceFrame
                        testId={'totalBetAmount'}
                        title={intl.formatMessage({
                            id: `${funMemberDetail}.totalBetAmount`,
                            defaultMessage: 'Total Bet Amount'
                        })}
                        customDateRange={totalCustomDateRange} dateRangeList={dateOptions}
                        handleDateChange={handleTotalAmountDate}>
                        <CommonLineChart dataSets={totalAmount} valueType={'money'}/>
                    </CustomDatePerformanceFrame>
                    <CustomDatePerformanceFrame
                        testId={'winLossRatePerformance'}
                        title={intl.formatMessage({
                            id: `${funMemberDetail}.winLossRatePerformance`,
                            defaultMessage: 'WinLoss Rate Performance'
                        })}
                        customDateRange={winLossCustomDateRange} dateRangeList={dateOptions}
                        handleDateChange={handleWinLossRateDate}>
                        <CommonPieChart
                            key={hashDataWith(winLossRate)}
                            infoType={InfoType.WinRate}
                            data={winLossRate}
                            centerLabel={intl.formatMessage({
                                id: `${funMemberDetail}.winRate`,
                                defaultMessage: 'Win Rate'
                            })}
                        />
                    </CustomDatePerformanceFrame>
                </Stack>
                <Stack sx={{marginTop: '32px'}}>
                    <Stack sx={{marginBottom: '1rem'}}>
                        <Typography variant={'h4'}>{intl.formatMessage({
                            id: `${funMemberDetail}.betList`,
                            defaultMessage: 'Bet List'
                        })}</Typography>
                        <Typography variant={'body2'}>{intl.formatMessage({
                            id: `${funMemberDetail}.betListDescription`,
                            defaultMessage: 'You can view the member\'s betting orders.'
                        })}</Typography>
                    </Stack>
                    <TextFieldsContainer canClean={canClean} displayCleanButton={canClean}>
                        <SearchTextField
                            id={'ip'}
                            label={intl.formatMessage({
                                id: `${funBetSlip}.searchIP`,
                                defaultMessage: 'IP'
                            })}
                            openDebounce={true}
                            onChange={(value: string) => handleQueryChange({
                                ipAddress: value || undefined,
                            })}
                        />
                        <QueryableSelectTextField
                            id={'league'}
                            key={'AllLeagues'}
                            label={intl.formatMessage({
                                id: `${funCommonType}.league`, defaultMessage: 'League'
                            })}
                            onChange={(value) => handleLeague(value.map(item => item.id))}
                            ViewModel={LeagueFilterViewModel}
                            multiple={true}
                            displayType={DisplayType.Count}
                            endAdornment={<KeyboardArrowDownRounded />}
                        />
                        <QueryableSelectTextField
                            id={'market'}
                            key={'AllMarkets'}
                            label={intl.formatMessage({
                                id: `${funCommonType}.market`,
                                defaultMessage: 'Market'
                            })}
                            displayType={DisplayType.Count}
                            onChange={handleMarket}
                            ViewModel={MarketFilterViewModel}
                            multiple={true}
                            endAdornment={<FilterListIcon/>}
                        />
                        <AutoMultiMenuTextField
                            id={'status'}
                            label={intl.formatMessage({
                                id: `${funCommonType}.status`, defaultMessage: 'Status'
                            })}
                            options={statuses}
                            onChange={handleStatus}
                        />
                        <SingleInputDateRangePicker
                            label={intl.formatMessage({id: `${funCommonType}.betTime`, defaultMessage: 'Bet Time'})}
                            value={betSlipDateRange}
                            onChange={handleDateRangeChange}
                        />
                    </TextFieldsContainer>
                    <CommonTable
                        columns={columns}
                        rows={betSlips?.content ?? []}
                        rowCount={betSlips?.totalElements ?? 0}
                        checkboxSelection={checkboxSelection}
                        disableRowSelectionOnClick={disableSelectionOnClick}
                        pageSizeOptions={rowsPerPageOptions}
                        pageModel={betSlipsPageModel}
                        setPageModel={newPageModel => handleQueryChange({...newPageModel})}
                        isLoading={loading}
                        onSortModeChange={(sortField, sortDirection) => {
                            handleQueryChange({sortField, sortDirection})
                        }}
                        getRowId={(row) => row.betSlipId}
                        rowHeight={88}
                    />
                </Stack>
            </Stack>
            <ParlayDetailDialog parlayId={parlayDetailProps.parlayId}
                                betAmount={parlayDetailProps.betAmount}
                                legs={parlayDetailProps.legs}
                                device={parlayDetailProps.device}
                                maxPayout={parlayDetailProps.maxPayout}
                                open={showParlayDialog}
                                setOpen={setShowParlayDialog}/>
        </PageFramework>
    );
}