"use client";
import {Box, Grid, Stack} from "@mui/material";
import {StatusButtonGroup} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup";
import * as React from "react";
import PageFramework from "@/modules/components/general/PageFramework";
import useMemberViewModel, {MemberTableType} from "@/app/member/domain/useMemberViewModel";
import DropdownInput from "@/modules/components/DropdownInput/DropdownInput";
import {
    QueryableSelectTextField,
    SingleInputDateRangePicker,
    TextFieldsContainer
} from "@/modules/components/TextField";
import CommonTable from "@/modules/components/eventTable/CommonTable";
import {checkboxSelection, disableSelectionOnClick, MemberLevelSettingsColumns, MemberListColumns, rowsPerPageOptions} from "@/app/member/components/memberColumn";
import {useIntl} from "react-intl";
import {TagsListViewModel} from "@/app/member/domain/TagsListViewModel";
import {TagSelectionViewModel} from "@/app/member/domain/TagSelectionViewModel";
import ActionButton from "@/modules/components/buttons/actionButton/ActionButton";
import SelectionContentDialog from "@/modules/components/dialog/SelectionContentDialog";
import RiskGroupFormDialog from "@/app/member/components/pageComponent/RiskGroupFormDialog";
import RiskGroupApplyingDialog from "@/app/member/components/pageComponent/RiskGroupApplyingDialog";
import EditMemberTagsDialog from "@/app/member/components/pageComponent/EditMemberTagsDialog";

export default function Page() {
    const {
        handleTableTypeChange,
        canClean,
        searchOption,
        handleSearch,
        riskMembers,
        rowSelectionModel,
        onRowSelectionModelChange,
        handleQueryChange,
        memberListPageModel,
        loading,
        langCommonType,
        funType,
        handleDateRange,
        handleQueryableSelectedValue,
        memberTableType,
        memberTableTypes,
        riskGroups,
        actions,
        handleActionClick,
        openChangeRiskLevelDialog,
        setOpenChangeRiskLevelDialog,
        handleUpdatedRiskLevel,
        openRiskGroupFormDialog,
        setOpenRiskGroupFormDialog,
        riskGroupFormRiskId,
        onRowClick,
        handlePunterNumberClick,
        openRiskGroupApplyDialog,
        setOpenRiskGroupApplyDialog,
        selectedRiskGroup,
        handleOnChange,
        openEditMemberTagsDialog,
        setOpenEditMemberTagsDialog,
        handleTagEditClick,
        editMemberTagsPunterIdRef,
        refreshData
    } = useMemberViewModel()

    const intl = useIntl()

    return (
        <PageFramework>
            <Box sx={{padding: '2.5rem'}}>
                <Grid container paddingY={0} spacing={0} flex={1} alignContent={'start'}>
                    <Grid item xs={12}>
                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                            <Stack direction="row" justifyContent="flex-end"
                                   alignItems='center'>
                                <StatusButtonGroup
                                    selectedIndex={
                                    memberTableType === MemberTableType.MemberList ? 0 : 1
                                }
                                    items={memberTableTypes()}
                                    onClick={handleTableTypeChange}
                                />
                            </Stack>
                            <ActionButton
                                data-testid={'action-button'}
                                label={intl.formatMessage({
                                    id: `${langCommonType}.actions`, defaultMessage: 'Actions'
                                })}
                                list={actions}
                                onItemClick={handleActionClick}
                            />
                        </Stack>
                    </Grid>
                    {
                        <Grid item xs={12} marginTop={2}>
                            {memberTableType === MemberTableType.MemberList ?
                                <Grid container paddingY={0} spacing={2} flex={1} alignContent={'start'}>
                                    <Grid item xs={12}>
                                        <TextFieldsContainer canClean={canClean} displayCleanButton={canClean}>
                                            <DropdownInput
                                                searchOptions={searchOption.map(item => item.value) as string[]}
                                                onSearch={handleSearch}
                                            />
                                            <QueryableSelectTextField
                                                key={'AllRiskLevel'}
                                                label={intl.formatMessage({
                                                    id: `${funType}.allRiskLevel`,
                                                    defaultMessage: 'All Risk Level'
                                                })}
                                                onChange={handleQueryableSelectedValue('riskIds')}
                                                ViewModel={TagSelectionViewModel}
                                                multiple={true}
                                                limitTags={2}
                                            />
                                            <QueryableSelectTextField
                                                key={'AllTags'}
                                                label={intl.formatMessage({
                                                    id: `${funType}.allTags`,
                                                    defaultMessage: 'All Tags'
                                                })}
                                                onChange={handleQueryableSelectedValue('tagIds')}
                                                ViewModel={TagsListViewModel}
                                                multiple={true}
                                                limitTags={2}
                                            />
                                            <SingleInputDateRangePicker
                                                label={intl.formatMessage({
                                                    id: `${langCommonType}.lastUpdatedTime`,
                                                    defaultMessage: 'Last Updated Time'
                                                })}
                                                onChange={handleDateRange}
                                            />
                                        </TextFieldsContainer>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CommonTable
                                            columns={MemberListColumns({handleOnChange, handleTagEditClick})}
                                            rows={riskMembers?.content ?? []}
                                            rowCount={riskMembers?.totalElements ?? 0}
                                            checkboxSelection={checkboxSelection}
                                            disableRowSelectionOnClick={disableSelectionOnClick}
                                            onRowClick={onRowClick}
                                            pageSizeOptions={rowsPerPageOptions}
                                            rowSelectionModel={rowSelectionModel}
                                            onRowSelectionModelChange={onRowSelectionModelChange}
                                            pageModel={memberListPageModel}
                                            setPageModel={newPageModel => handleQueryChange({
                                                ...newPageModel
                                            })}
                                            isLoading={loading}
                                            onSortModeChange={(sortField, sortDirection) => {
                                                handleQueryChange({sortField, sortDirection})
                                            }}
                                            getRowId={(row) => row.punterId}
                                        />
                                    </Grid>

                                </Grid>
                                :
                                <Grid container paddingY={0} spacing={2} flex={1} alignContent={'start'}>
                                    <Grid item xs={12}>
                                        <CommonTable
                                            columns={MemberLevelSettingsColumns({handlePunterNumberClick})}
                                            rows={riskGroups?.content ?? []}
                                            rowCount={riskGroups?.totalElements ?? 0}
                                            checkboxSelection={checkboxSelection}
                                            disableRowSelectionOnClick={disableSelectionOnClick}
                                            onRowClick={onRowClick}
                                            pageSizeOptions={rowsPerPageOptions}
                                            rowSelectionModel={rowSelectionModel}
                                            onRowSelectionModelChange={onRowSelectionModelChange}
                                            pageModel={memberListPageModel}
                                            setPageModel={newPageModel => handleQueryChange({
                                                ...newPageModel
                                            })}
                                            isLoading={loading}
                                            onSortModeChange={(sortField, sortDirection) => {
                                                handleQueryChange({sortField, sortDirection})
                                            }}
                                            getRowId={(row) => row.riskId}
                                        />
                                    </Grid>
                                </Grid>
                            }
                        </Grid>
                    }
                </Grid>
                <SelectionContentDialog
                    title={"Risk Level Group Title"}
                    label={"Risk Level Group"}

                    setOpen={() => {
                        setOpenChangeRiskLevelDialog(false)
                    }}
                    onClose={() => {
                        setOpenChangeRiskLevelDialog(false)
                    }}
                    onValueChange={(value) => {
                        handleUpdatedRiskLevel(value.map(item => item.id))
                    }}
                    open={openChangeRiskLevelDialog}
                    ViewModel={TagSelectionViewModel}
                />
                <RiskGroupFormDialog
                    open={openRiskGroupFormDialog}
                    setOpen={setOpenRiskGroupFormDialog}
                    riskId={riskGroupFormRiskId.current}
                    onFinished={refreshData}
                />
                <RiskGroupApplyingDialog
                    open={openRiskGroupApplyDialog}
                    setOpen={setOpenRiskGroupApplyDialog}
                    riskId={selectedRiskGroup.current?.riskId ?? ''}
                    riskName={selectedRiskGroup.current?.riskName ?? ''}
                />
                <EditMemberTagsDialog
                    punterId={editMemberTagsPunterIdRef.current?.punterId ?? ''}
                    initialSelectedOptions={editMemberTagsPunterIdRef.current?.tags ?? []}
                    open={openEditMemberTagsDialog}
                    setOpen={setOpenEditMemberTagsDialog}
                    onFinished={refreshData}
                />
            </Box>
        </PageFramework>
    );
}