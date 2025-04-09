import ToggleProps from "@/modules/interface/ToggleProps";
import {Box, Stack, Typography} from "@mui/material";
import {
    SingleInputDateRangePicker,
    TextFieldsContainer
} from "@/modules/components/TextField";
import CommonTable from "@/modules/components/eventTable/CommonTable";
import {FullScreenDialog} from "@/modules/components/dialog/FullScreenDialog";
import * as React from "react";
import useRiskGroupApplyingViewModel from "@/app/member/domain/useRiskGroupApplyingViewModel";
import {checkboxSelection, columns, disableSelectionOnClick, rowsPerPageOptions} from "@/app/member/components/riskGroupApplyingColumn";
import DropdownInput from "@/modules/components/DropdownInput/DropdownInput";
import ActionButton from "@/modules/components/buttons/actionButton/ActionButton";
import AlertDialog from "@/modules/components/dialog/AlertDialog";
import {AddMemberDialog} from "@/app/member/components/pageComponent/AddMemberDialog";

export interface RiskGroupApplyingProps extends ToggleProps {
    riskId: string
    riskName: string
}

function RiskGroupApplyingList(props: Readonly<RiskGroupApplyingProps>) {
    const {
        intl,
        langCommonType,
        loading,
        list,
        canClean,
        actions,
        searchOption,
        handleQueryChange,
        handleActionClick,
        handleSearch,
        handleDateRange,
        pageModel,
        showAddRiskMemberDialog,
        setShowAddRiskMemberDialog,
        showAlertDialog,
        setShowAlertDialog,
        dialogProps,
        onRowSelectionModelChange
    } = useRiskGroupApplyingViewModel(props.riskId)

    return (
        <Box sx={{padding: '2.5rem'}}>
            <Stack spacing={2} paddingY={2}>
                <Typography variant={'h1'}>{props.riskName}</Typography>
                <Stack direction="row" justifyContent="flex-end"
                       alignItems='center'>
                    <ActionButton
                        label={intl.formatMessage({
                            id: `${langCommonType}.actions`, defaultMessage: 'Actions'})}
                        list={actions}
                        onItemClick={handleActionClick}
                    />
                </Stack>
                <TextFieldsContainer canClean={canClean} displayCleanButton={canClean}>
                    <DropdownInput
                        searchOptions={searchOption.map(item => item.value) as string[]}
                        onSearch={handleSearch}/>
                    <SingleInputDateRangePicker
                        label={intl.formatMessage({id: `${langCommonType}.lastUpdatedTime`, defaultMessage: 'Last Updated Time'})}
                        onChange={handleDateRange}
                    />
                </TextFieldsContainer>
            </Stack>
            <CommonTable
                columns={columns(intl)}
                rows={list?.content ?? []}
                rowCount={list?.totalElements ?? 0}
                checkboxSelection={checkboxSelection}
                disableRowSelectionOnClick={disableSelectionOnClick}
                onRowSelectionModelChange={onRowSelectionModelChange}
                pageSizeOptions={rowsPerPageOptions}
                pageModel={pageModel}
                setPageModel={newPageModel => handleQueryChange({
                    ...newPageModel
                })}
                onSortModeChange={(sortField, sortDirection) => {
                    handleQueryChange({sortField, sortDirection})
                }}
                isLoading={loading}
                getRowId={(row) => row.punterId}
            />
            <AddMemberDialog
                open={showAddRiskMemberDialog}
                setOpen={setShowAddRiskMemberDialog}
                riskId={props.riskId}/>
            <AlertDialog
                open={showAlertDialog}
                setOpen={setShowAlertDialog}
                {...dialogProps}
            />
        </Box>
    )
}

export default function RiskGroupApplyingDialog(props: RiskGroupApplyingProps & ToggleProps) {
    const {open, setOpen} = props

    return <FullScreenDialog
        open={open}
        setOpen={setOpen}
        content={
            <RiskGroupApplyingList {...props} />
        }
    />
}