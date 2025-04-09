'use client'
import React from "react";
import {Stack} from "@mui/material";
import {
    AutoMultiMenuTextField,
    SearchTextField,
    SingleInputDateRangePicker,
    TextFieldsContainer
} from "@/modules/components/TextField";
import CommonTable from "@/modules/components/eventTable/CommonTable";
import {checkboxSelection, columns, disableSelectionOnClick, rowsPerPageOptions} from "@/app/audit/components/column";
import useAuditViewModel from "@/app/audit/domain/useAuditViewModel";
import PageFramework from "@/modules/components/general/PageFramework";
import SimpleContentDialog from "@/modules/components/dialog/SimpleContentDialog";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

export default function Page() {
    const {
        loading,
        list,
        actions,
        canClean,
        pageModel,
        queryParams,
        handleQueryChange,
        handleDateRange,
        openDialog,
        setOpenDialog,
        handleDialogChange
    } = useAuditViewModel();
    const intl = useIntl();
    const funType = LocalizationFunctionType.Common;

    return (
        <PageFramework>
            <Stack spacing={2} sx={{
                width: '100%', maxWidth: '100%', mx: 'auto', paddingY: 2, paddingX: 3,
                minHeight: 0,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <TextFieldsContainer canClean={canClean} displayCleanButton={canClean}>
                    <SearchTextField
                        id={'userName'}
                        label={intl.formatMessage({id: `${funType}.userName`, defaultMessage: 'User Name'})}
                        openDebounce={true}
                        onChange={(value: string) => {
                            value !== queryParams.search &&
                            handleQueryChange({
                                search: value,
                            })
                        }}
                    />
                    <AutoMultiMenuTextField
                        id={'action'}
                        label={intl.formatMessage({id: `${funType}.action`, defaultMessage: 'Action'})}
                        options={actions}
                        onChange={(value: string[]) => {
                            value !== queryParams.actions &&
                            handleQueryChange({
                                actions: value,
                            })
                        }}
                    />
                    <SingleInputDateRangePicker
                        label={intl.formatMessage({id: `${funType}.time`, defaultMessage: 'Time'})}
                        onChange={handleDateRange}
                    />
                </TextFieldsContainer>
                <CommonTable
                    columns={columns(intl, funType, handleDialogChange)}
                    rows={list?.content ?? []}
                    rowCount={list?.totalElements ?? 0}
                    checkboxSelection={checkboxSelection}
                    disableRowSelectionOnClick={disableSelectionOnClick}
                    pageSizeOptions={rowsPerPageOptions}
                    pageModel={pageModel}
                    setPageModel={newPageModel => handleQueryChange({
                        ...newPageModel
                    })}
                    onSortModeChange={(sortField, sortDirection) => {
                        handleQueryChange({sortField, sortDirection})
                    }}
                    isLoading={loading}
                />
            </Stack>
            {
                openDialog.open &&
                <SimpleContentDialog
                    title={intl.formatMessage({id: `${funType}.description`, defaultMessage: 'Description'})}
                    open={openDialog.open} content={openDialog.content}
                    setOpen={(open) => setOpenDialog({open: open, content: ''})}
                />
            }
        </PageFramework>
    );
}