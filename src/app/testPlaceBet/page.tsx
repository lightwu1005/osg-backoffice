"use client";
import React from "react";
import {Badge, Box, Button, Grid, Stack} from "@mui/material";
import useTabViewModel from "@/viewModels/useTabViewModel";
import Tabs, {FilterTabProps} from "@/modules/components/tabs/Tabs";
import DropdownInput from "@/modules/components/DropdownInput/DropdownInput";
import useTestPlaceBetViewModel from "@/app/testPlaceBet/domain/useTestPlaceBetViewModel";
import {StatusButtonGroup} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup";
import {MenuTextField} from "@/modules/components/TextField";
import {KeyboardArrowDownRounded} from "@mui/icons-material";
import PanelTable from "@/app/testPlaceBet/components/PanelTable";
import PlaceBetFormDialog from "@/app/testPlaceBet/components/PlaceBetBox";
import {mockBetData} from "@/app/testPlaceBet/components/PlaceBetMockData";
import PageFramework from "@/modules/components/general/PageFramework";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import DangerBallTriggerDialog from "@/app/testPlaceBet/components/DangerBallTriggerDialog";

function PlaceBetContent({sportId, sportType}: Readonly<{ sportId: string, sportType: string }>) {

    const {
        dataGridRef,
        eventType,
        eventTypeList,
        loading,
        openBetSlip,
        setOpenBetSlip,
        openDangerBall,
        setOpenDangerBall,
        dataColumns,
        eventList,
        placeBetData,
        displayType,
        displayTypeOptions,
        punterData,
        configuration,
        pageModel,
        handleEventTypeChange,
        handleQueryChange,
        handleSearch,
        handleDisplayTypeChange,
        handleOddsOnClick,
        handlePunterChange,
        handlePlaceBet,
        handleClearBet,
        searchOption
    } = useTestPlaceBetViewModel(sportId, sportType)

    const eventListOptions = eventList?.content.map(event => ({
        key: event.eventId,
        text: event.eventName,
        type: event.eventId,
    })) ?? []

    return (
        <PageFramework>
            <Grid container paddingTop={1} sx={{alignItems: 'center', justifyContent: 'space-between'}}>
                <Grid item>
                    <StatusButtonGroup
                        items={eventTypeList}
                        selectedIndex={eventTypeList.findIndex(type =>
                            type.key === eventType)}
                        onClick={handleEventTypeChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <MenuTextField
                        placeholder={'Fractional'}
                        iconComponent={KeyboardArrowDownRounded}
                        options={displayTypeOptions}
                        value={displayType}
                        onChange={handleDisplayTypeChange}
                    />
                </Grid>
                <Grid  item>
                    <Button
                        sx={{width: 150}}
                        variant={'outlined'}
                        color={'primary'}
                        onClick={() => setOpenDangerBall(!openDangerBall)}
                    >
                        觸發危險球
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        sx={{width: 150}}
                        variant={'outlined'}
                        color={'primary'}
                        endIcon={<Badge badgeContent={placeBetData.map(bet => bet.parts).flat().length} sx={{marginLeft: 1}} color="primary"/>}
                        onClick={() => setOpenBetSlip(!openBetSlip)}
                    >
                        注單
                    </Button>
                </Grid>
                <Grid item xs={12} paddingTop={1}>
                    <DropdownInput
                        searchOptions={searchOption.map(item => item.value) as string[]}
                        onSearch={handleSearch}/>
                </Grid>
            </Grid>
            <Box mt={2}/>
            <PanelTable
                eventType={eventType}
                sportType={sportType}
                dataGridRef={dataGridRef}
                isLoading={loading}
                columns={dataColumns}
                rows={eventList?.content ?? []}
                selectingOdds={placeBetData.map(bet => bet.parts).flat()}
                rowCount={eventList?.totalElements ?? 0}
                configuration={configuration}
                pageModel={pageModel}
                setPageModel={newPageModel => handleQueryChange({
                    ...newPageModel
                })}
                onOddsClick={handleOddsOnClick}
            />
            <PlaceBetFormDialog
                open={openBetSlip}
                setOpen={setOpenBetSlip}
                punterData={punterData}
                placeBetData={placeBetData ?? [mockBetData]}
                handlePunterChange={handlePunterChange}
                handlePlaceBet={handlePlaceBet}
                handleClearBet={handleClearBet}
            />
            <DangerBallTriggerDialog
                eventList={eventListOptions}
                open={openDangerBall}
                setOpen={setOpenDangerBall}
            />
        </PageFramework>
    )
}

export default function Page() {
    const {
        labels,
        sportCategories
    } = useTabViewModel()
    const intl = useIntl();
    const funType = `${LocalizationFunctionType.Common}.sportCategory`;
    const filterTab: FilterTabProps = {
        searchLabel: intl.formatMessage({id: `${funType}.searchLabel`, defaultMessage: 'Search Sports'}),
        filterLabel: intl.formatMessage({id: `${funType}.filterLabel`, defaultMessage: 'All Sports'})
    }

    return (
        <Stack spacing={2} sx={{width: '100%', maxWidth: '100%', mx: 'auto', paddingX: "1rem", paddingY: "0.75rem"}}>
            <Tabs labels={labels} filterTab={filterTab}>
                {
                    sportCategories.map((category) => (
                        <PlaceBetContent sportId={category.sportId} sportType={category.sportType} key={category.sportId}/>
                    ))
                }
            </Tabs>
        </Stack>
    );
}