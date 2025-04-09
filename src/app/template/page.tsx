'use client'
import React from "react";
import {Box, Stack} from "@mui/material";
import {AutoMultiMenuTextField, SearchTextField, TextFieldsContainer} from "@/modules/components/TextField";
import useTemplateViewModel from "@/app/template/domain/useTemplateViewModel";
import ActionButton from "@/modules/components/buttons/actionButton/ActionButton";
import {StatusButtonGroup} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup";
import CommonTable from "@/modules/components/eventTable/CommonTable";
import {
    columns,
    disableSelectionOnClick, pinColumns,
    rowsPerPageOptions
} from "@/app/template/components/columns";
import EventListDialog from "@/app/template/pageComponent/EventList";
import AlertDialog from "@/modules/components/dialog/AlertDialog";
import TemplateFormDialog from "@/app/template/pageComponent/TemplateFormDialog";
import PageFramework from "@/modules/components/general/PageFramework";
import ActivatingListDialog from "@/app/template/pageComponent/ActivatingItems";


export default function Page() {
    const {
        isEditable,
        SettingLevel,
        sportCategories,
        statusButtonGroup,
        actions,
        handleActionClick,
        loading,
        templateList,
        canClean,
        pageModel,
        onRowSelectionModelChange,
        rowSelectionModel,
        handleQueryChange,
        onCellClick,
        showEventDialog,
        setShowEventDialog,
        currentActivatingHeader,
        showRemoveDialog,
        setShowRemoveDialog,
        alertDialogProps,
        showTemplateModelDialog,
        setShowTemplateModelDialog,
        editTemplateId,
        isDuplicate,
        templateQueryParams,
        refresh,
        intl,
        funType,
        funCommonType,
        showActiveItemDialog,
        setShowActiveItemDialog
    } = useTemplateViewModel()

    return (
        <PageFramework>
            <Stack spacing={2} sx={{
                width: '100%', maxWidth: '100%', mx: 'auto', paddingY: 2, paddingX: 3,
                minHeight: 0,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Stack sx={{paddingBottom: '1rem', paddingTop: '0.625rem'}} direction="row" justifyContent="space-between"
                       alignItems='center'>
                    <StatusButtonGroup {...statusButtonGroup}/>
                    {
                        isEditable &&
                        <ActionButton
                            label={intl.formatMessage({
                                id: `${funCommonType}.actions`, defaultMessage: 'Actions'})}
                            list={actions}
                            onItemClick={handleActionClick}
                        />
                    }
                </Stack>
                <Box sx={{paddingY: '1rem'}}>
                    <TextFieldsContainer canClean={canClean} displayCleanButton={canClean}>
                        <SearchTextField
                            label={intl.formatMessage({
                                id: `${funCommonType}.templateName`, defaultMessage: 'Template Name'})}
                            openDebounce={true}
                            onChange={(value: string) => handleQueryChange({
                                search: value,
                            })}
                        />
                        <AutoMultiMenuTextField
                            label={intl.formatMessage({
                                id: `${funCommonType}.settingLevel`, defaultMessage: 'Setting Level'})}
                            options={Object.values(SettingLevel)}
                            onChange={(value: string[]) => handleQueryChange({
                                settingLevels: value,
                            })}
                        />
                        <AutoMultiMenuTextField
                            label={intl.formatMessage({
                                id: `${funCommonType}.sport`, defaultMessage: 'Sport'})}
                            options={sportCategories.map(item => item.sportName)}
                            onChange={(value: string[]) => handleQueryChange({
                                sportNames: value,
                            })}
                        />
                    </TextFieldsContainer>
                </Box>
                <CommonTable
                    columns={columns(intl, funCommonType, templateList?.content ?? [])}
                    rows={templateList?.content ?? []}
                    rowCount={templateList?.totalElements ?? 0}
                    checkboxSelection={isEditable}
                    disableRowSelectionOnClick={disableSelectionOnClick}
                    pageSizeOptions={rowsPerPageOptions}
                    rowSelectionModel={rowSelectionModel}
                    onRowSelectionModelChange={onRowSelectionModelChange}
                    pageModel={pageModel}
                    initialState={{pinnedColumns: pinColumns}}
                    setPageModel={newPageModel => handleQueryChange({
                        ...newPageModel
                    })}
                    onSortModeChange={(sortField, sortDirection) => {
                        handleQueryChange({sortField, sortDirection})
                    }}
                    isLoading={loading}
                    onRowClick={onCellClick}
                    getRowId={(row) => row.templateId}
                />
                <EventListDialog
                    open={showEventDialog}
                    setOpen={setShowEventDialog}
                    currentTemplate={currentActivatingHeader}
                />
                <TemplateFormDialog
                    open={showTemplateModelDialog}
                    setOpen={setShowTemplateModelDialog}
                    templateModelProps={{
                        editTemplateId: editTemplateId,
                        eventType: templateQueryParams.eventType,
                        isDuplicate: isDuplicate
                    }}
                    onFinished={refresh}
                />
                <ActivatingListDialog
                    currentTemplate={currentActivatingHeader}
                    open={showActiveItemDialog}
                    setOpen={setShowActiveItemDialog}/>
                <AlertDialog
                    open={showRemoveDialog}
                    setOpen={setShowRemoveDialog}
                    {...alertDialogProps}
                />
            </Stack>
        </PageFramework>
    )
}