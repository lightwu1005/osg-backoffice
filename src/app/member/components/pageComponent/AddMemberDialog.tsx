import ToggleProps from "@/modules/interface/ToggleProps";
import {FullScreenDialog} from "@/modules/components/dialog/FullScreenDialog";
import useAddMemberModelViewModel from "@/app/member/domain/useAddMemberModelViewModel"
import {Stack, Typography, Box} from "@mui/material";
import * as React from "react";
import DropdownInput from "@/modules/components/DropdownInput/DropdownInput";
import {columns, disableSelectionOnClick, rowsPerPageOptions, checkboxSelection} from "@/app/member/components/addMemberColumns";
import CommonTable from "@/modules/components/eventTable/CommonTable";
import Button from "@mui/material/Button";

interface AddMemberModelProps extends ToggleProps {
    riskId: string
}

export const AddMember = ({riskId}: {riskId: string}) => {
    const {
        riskMembers,
        searchOption,
        handleQueryChange,
        intl,
        funType,
        funCommonType,
        rowSelectionModel,
        onRowSelectionModelChange,
        loading,
        pageModel ,
        onClickPublish,
        isEditable
    } = useAddMemberModelViewModel(riskId)

    return (
        <Box p={3}>
            <Typography variant={'h1'}>
                {
                    intl.formatMessage({
                        id: `${funType}.addMemberTitle`, defaultMessage: 'Add Member'})
                }
            </Typography>
            <Box height={'32px'}/>
            <DropdownInput
                searchOptions={searchOption.map(item => item.value) as string[]}
                onSearch={(type: string, value: string) => handleQueryChange({
                    searchKey: (value !== '') ? searchOption.find((item => item.value === type))?.key : undefined,
                    searchValue: (value !== '') ? value : undefined,
                })}/>
            <Box height={'1rem'}/>
            <CommonTable
                columns={columns(intl, funCommonType)}
                rows={riskMembers?.content.filter(item => item.risk.riskId !== riskId) ?? []}
                rowCount={riskMembers?.totalElements ?? 0}
                checkboxSelection={checkboxSelection}
                disableRowSelectionOnClick={disableSelectionOnClick}
                pageSizeOptions={rowsPerPageOptions}
                rowSelectionModel={rowSelectionModel}
                onRowSelectionModelChange={onRowSelectionModelChange}
                pageModel={pageModel}
                setPageModel={newPageModel => handleQueryChange({
                    ...newPageModel
                })}
                isLoading={loading}
                onSortModeChange={(sortField, sortDirection) => {
                    handleQueryChange({sortField, sortDirection})
                }}
                getRowId={(row) => row.punterId}
            />
            <Box height={'36px'}/>
            <Stack alignItems={'flex-end'}>
                <Button variant="contained" onClick={onClickPublish} disabled={!isEditable} data-testid={'publishButton'}
                >
                    {
                        intl.formatMessage({
                            id: `${funType}.formSubmit`, defaultMessage: 'Publish'})
                    }
                </Button>
            </Stack>
        </Box>
    )
}


export const AddMemberDialog = (props: AddMemberModelProps) => {
    const {open, setOpen, riskId} = props

    return (<FullScreenDialog
        open={open}
        setOpen={setOpen}
        content={<AddMember riskId={riskId}/>}
    />)
}