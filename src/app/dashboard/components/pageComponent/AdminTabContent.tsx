"use client";
import {Stack} from "@mui/material";
import React from "react";
import {AutoMultiMenuTextField, TextFieldsContainer} from "@/modules/components/TextField";
import {
    adminColumns,
    checkboxSelection,
    disableSelectionOnClick,
    rowsPerPageOptions
} from "@/app/dashboard/components/adminColumns";
import CommonTable from "@/modules/components/eventTable/CommonTable";
import useAdminTabContentViewModel, {StatusListType} from "@/app/dashboard/domain/useAdminTabContentViewModel";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

export default function AdminTabContent({sportId}: { sportId: string }) {
    const {
        loading,
        pageModel,
        providerInfoList,
        providers,
        canClean,
        handleQueryChange
    } = useAdminTabContentViewModel(sportId)
    const intl = useIntl();
    const funType = LocalizationFunctionType.Common

    return (
        <Stack marginTop={2} spacing={2}>
            <TextFieldsContainer canClean={canClean} displayCleanButton={canClean}>
                <AutoMultiMenuTextField
                    label={intl.formatMessage({id: `${funType}.feederName`, defaultMessage: 'Feeder Name'})}
                    openDebounce={true}
                    isEmptyEqualSelectAll={true}
                    options={providers}
                    onChange={(value: string[]) => handleQueryChange({search: value})}
                />
                <AutoMultiMenuTextField
                    label={intl.formatMessage({id: `${funType}.status`, defaultMessage: 'Status'})}
                    openDebounce={true}
                    isEmptyEqualSelectAll={true}
                    options={Object.values(StatusListType)}
                    onChange={(value: string[]) => handleQueryChange({status: value})}
                />
            </TextFieldsContainer>
            <CommonTable
                columns={adminColumns(intl, funType)}
                rows={providerInfoList?.content ?? []}
                rowCount={providerInfoList?.totalElements ?? 0}
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
    )
}