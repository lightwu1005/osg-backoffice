"use client";
import React from "react";
import {Box, Stack} from "@mui/material";
import CommonTable from "@/modules/components/eventTable/CommonTable";
import {AutoMultiMenuTextField, SingleInputDateRangePicker, TextFieldsContainer} from "@/modules/components/TextField";
import ActionButton from "@/modules/components/buttons/actionButton/ActionButton";
import {columns, disableSelectionOnClick, pinColumns, rowsPerPageOptions} from "@/app/channel/components/columns";
import {ChannelStatus, Country} from "@/services/@core/module/Enum";
import ChannelFormDialog from "@/app/channel/components/pageComponent/ChannelForm";
import useChannelViewModel from "@/app/channel/domain/useChannelViewModel";
import AlertDialog from "@/modules/components/dialog/AlertDialog";
import PageFramework from "@/modules/components/general/PageFramework";

export default function Page() {
    const {
        isEditable,
        loading,
        list,
        pageModel,
        rowSelectionModel,
        channelFormId,
        showChannelDialog,
        setShowChannelDialog,
        showRemoveDialog,
        setShowRemoveDialog,
        actions,
        canClean,
        refresh,
        removeAlertDialogProps,
        handleQueryChange,
        handleActionClick,
        onCellClick,
        onRowSelectionModelChange,
        showMaintainDialog,
        maintainAlertDialogProps,
        setShowMaintainDialog,
        intl,
        funCommonType
    } = useChannelViewModel();

    return (
        <PageFramework>
            <Stack spacing={2} sx={{
                width: '100%', maxWidth: '100%', mx: 'auto', paddingY: 2, paddingX: 3,
                minHeight: 0,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Box
                    display={'flex'} width={'100%'} alignItems={'flex-end'} justifyContent={'flex-end'}
                    sx={{paddingBottom: '1rem', paddingTop: '0.625rem'}}>
                    {
                        isEditable &&
                        <ActionButton
                            label={intl.formatMessage({id: `${funCommonType}.actions`, defaultMessage: 'Actions'})}
                            list={actions} onItemClick={handleActionClick}/>
                    }
                </Box>
                <Box sx={{paddingY: '1rem'}}>
                    <TextFieldsContainer canClean={canClean} displayCleanButton={canClean}>
                        <AutoMultiMenuTextField
                            label={intl.formatMessage({
                                id: `${funCommonType}.location`,
                                defaultMessage: 'Location'
                            })}
                            openDebounce={true}
                            options={Object.values(Country)}
                            onChange={(value) => {
                                handleQueryChange({
                                    locationNames: value,
                                })
                            }}
                        />
                        <AutoMultiMenuTextField
                            label={intl.formatMessage({id: `${funCommonType}.status`, defaultMessage: 'Status'})}
                            options={Object.keys(ChannelStatus)}
                            onChange={(value) => {
                                const statusValues = (value as (keyof typeof ChannelStatus)[]).map(statusKey =>
                                    ChannelStatus[statusKey]
                                );

                                handleQueryChange({
                                    statuses: statusValues,
                                })
                            }}
                        />
                        <SingleInputDateRangePicker
                            label={intl.formatMessage({
                                id: `${funCommonType}.registrationTime`,
                                defaultMessage: 'Registration Time'
                            })}
                            onChange={(dateRange) => {
                                handleQueryChange({
                                    startDate: dateRange?.[0]?.unix(),
                                    endDate: dateRange?.[1]?.unix(),
                                })
                            }}
                        />
                    </TextFieldsContainer>
                </Box>
                <CommonTable
                    columns={columns(intl, funCommonType)}
                    rows={list?.content ?? []}
                    rowCount={list?.totalElements ?? 0}
                    checkboxSelection={isEditable}
                    disableRowSelectionOnClick={disableSelectionOnClick}
                    pageSizeOptions={rowsPerPageOptions}
                    rowSelectionModel={rowSelectionModel}
                    onRowSelectionModelChange={onRowSelectionModelChange}
                    onRowClick={onCellClick}
                    pageModel={pageModel}
                    initialState={{pinnedColumns: pinColumns}}
                    setPageModel={newPageModel => handleQueryChange({
                        ...newPageModel
                    })}
                    onSortModeChange={(sortField, sortDirection) => {
                        handleQueryChange({sortField, sortDirection})
                    }}
                    isLoading={loading}
                />
                <ChannelFormDialog
                    open={showChannelDialog}
                    setOpen={setShowChannelDialog}
                    channelId={channelFormId}
                    onFinished={refresh}
                />
                <AlertDialog
                    open={showRemoveDialog}
                    setOpen={setShowRemoveDialog}
                    {...removeAlertDialogProps}
                />
                <AlertDialog
                    open={showMaintainDialog}
                    setOpen={setShowMaintainDialog}
                    {...maintainAlertDialogProps}
                />
            </Stack>
        </PageFramework>
    )
}

