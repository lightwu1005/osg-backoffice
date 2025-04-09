'use client'
import React from "react";
import {Box, Stack} from "@mui/material";
import {AutoMultiMenuTextField, SearchTextField, TextFieldsContainer} from "@/modules/components/TextField";
import ActionButton from "@/modules/components/buttons/actionButton/ActionButton";
import {columns, disableSelectionOnClick, pinColumns, rowsPerPageOptions} from "@/app/permission/components/columns";
import AlertDialog from "@/modules/components/dialog/AlertDialog";
import usePermissionViewModel from "@/app/permission/domain/usePermissionViewModel";
import CommonTable from "@/modules/components/eventTable/CommonTable";
import MemberFormDialog from "@/app/permission/components/pageComponent/MemberForm";
import PageFramework from "@/modules/components/general/PageFramework";
import {Functionality} from "@/services/@core/module/Enum";

export default function Page() {
    const {
        isEditable,
        loading,
        list,
        actions,
        memberFormUUID,
        memberRoleOptions,
        modelRoleOptions,
        statusOptions,
        canClean,
        pageModel,
        rowSelectionModel,
        rowsUnSelectableWithIds,
        alertDialogProps,
        isAlertDialogOpen,
        setAlertDialogOpen,
        showMemberDialog,
        setShowMemberDialog,
        onRowClick,
        onRowSelectionModelChange,
        handleActionClick,
        handleQueryChange,
        refresh,
        userFunctionality,
        intl,
        funCommonType
    } = usePermissionViewModel()

    return (
        <PageFramework>
            <Stack spacing={2} sx={{
                width: '100%', maxWidth: '100%', mx: 'auto', paddingY: 2, paddingX: 3,
                minHeight: 0,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Stack sx={{paddingBottom: '1rem', paddingTop: '0.625rem'}} direction="row" justifyContent="flex-end"
                       alignItems='center'>
                    {
                        isEditable &&
                        <ActionButton
                            label={intl.formatMessage({id: `${funCommonType}.actions`, defaultMessage: 'Actions'})}
                            list={actions}
                            onItemClick={handleActionClick}
                        />
                    }
                </Stack>
                <Box sx={{paddingY: '1rem'}}>
                    <TextFieldsContainer canClean={canClean} displayCleanButton={canClean}>
                        {userFunctionality === Functionality.Admin ?
                            <SearchTextField
                                label={intl.formatMessage({
                                    id: `${funCommonType}.companyName`,
                                    defaultMessage: 'Company Name'
                                })}
                                openDebounce={true}
                                onChange={(value: string) => handleQueryChange({
                                    organization: value,
                                })}
                            /> :
                            <SearchTextField
                                label={intl.formatMessage({
                                    id: `${funCommonType}.userNameOrEmail`,
                                    defaultMessage: 'User Name or Email'
                                })}
                                openDebounce={true}
                                onChange={(value: string) => handleQueryChange({
                                    search: value,
                                })}
                            />
                        }
                        <AutoMultiMenuTextField
                            label={intl.formatMessage({
                                id: `${funCommonType}.role`,
                                defaultMessage: 'Role'
                            })}
                            options={memberRoleOptions}
                            onChange={(value: string[]) => handleQueryChange({
                                roles: value,
                            })}
                        />
                        <AutoMultiMenuTextField
                            label={intl.formatMessage({
                                id: `${funCommonType}.accountStatus`,
                                defaultMessage: 'Account Status'
                            })}
                            options={statusOptions}
                            onChange={(value: string[]) => handleQueryChange({
                                statuses: value,
                            })}
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
                    onRowClick={onRowClick}
                    pageModel={pageModel}
                    initialState={{pinnedColumns: pinColumns}}
                    setPageModel={newPageModel => handleQueryChange({
                        ...newPageModel
                    })}
                    isLoading={loading}
                    rowsUnSelectableWithIds={rowsUnSelectableWithIds()}
                    onSortModeChange={(sortField, sortDirection) => {
                        handleQueryChange({sortField, sortDirection})
                    }}
                />
                <MemberFormDialog
                    open={showMemberDialog}
                    setOpen={setShowMemberDialog}
                    uuid={memberFormUUID}
                    roleList={modelRoleOptions}
                    onFinished={refresh}
                />
                <AlertDialog
                    {...alertDialogProps}
                    open={isAlertDialogOpen}
                    setOpen={setAlertDialogOpen}
                />
            </Stack>
        </PageFramework>
    )
}
