import * as React from "react";
import ToggleProps from "@/modules/interface/ToggleProps";
import {FullScreenDialog} from "@/modules/components/dialog/FullScreenDialog";
import {Box, Grid, Stack, Typography} from "@mui/material";
import {SearchTextField} from "@/modules/components/TextField";
import CommonTable from "@/modules/components/eventTable/CommonTable";
import {
    checkboxSelection,
    columns,
    disableSelectionOnClick,
    rowsPerPageOptions,
    ActivatingListStatus
} from "@/app/template/components/ActivatingItemsColumns";
import {ActivatingModelHeader} from "@/app/template/domain/useTemplateViewModel";
import useActivatingItemsViewModel from "@/app/template/domain/useActivatingItemsViewModel";
import {useEffect} from "react";

export interface ActivatingItemProps extends ToggleProps {
    currentTemplate: ActivatingModelHeader
}

function ActivatingItems(props: Readonly<ActivatingItemProps>) {
    const {currentTemplate} = props
    const {
        activatingList,
        loading,
        pageModel,
        handleQueryChange,
        intl,
        funType
    } = useActivatingItemsViewModel(props.currentTemplate)
    const activatingItemId = currentTemplate?.searchType === ActivatingListStatus.market
        ? `${funType}.markets`
        : `${funType}.league`

    const activatingItemDefaultMessage = currentTemplate?.searchType === ActivatingListStatus.market
        ? 'Markets'
        : 'Leagues'

    const ActivatingItemName = intl.formatMessage({
        id: activatingItemId,
        defaultMessage: activatingItemDefaultMessage,
    })

    const searchTextPrefix = intl.formatMessage({
        id: 'common.search',
        defaultMessage: 'Search',
    })

    const searchText = `${searchTextPrefix} ${ActivatingItemName}`;

    useEffect(() => {
        console.log('activatingList', activatingList)
    }, [activatingList]);

    return (

        <Box sx={{padding: '40px'}}>
            <Stack spacing={4} direction={"column"}>
                <Grid container spacing={3} direction={"column"}>
                    <Stack spacing={1} direction={"column"}>
                        <Typography variant={'h1'}>{currentTemplate?.templateName} {currentTemplate?.totalNumber ?? 0} {ActivatingItemName}</Typography>
                    </Stack>
                </Grid>
            </Stack>
            <Box sx={{paddingY: '16px'}}>
                <SearchTextField
                    label={searchText}
                    placeholder={searchText}
                    openDebounce={true}
                    onChange={(value: string) => handleQueryChange({
                        searchValue: value
                    })}
                />
            </Box>
            <CommonTable
                columns={columns(intl, funType, currentTemplate.searchType ?? '')}
                rows={activatingList?.content ?? []}
                rowCount={activatingList?.totalElements ?? 0}
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
                getRowId={(row) => row.itemId}
            />
        </Box>
    )
}

export default function ActivatingListDialog(props: ActivatingItemProps & ToggleProps) {
    const {open, setOpen} = props

    return <FullScreenDialog
        open={open}
        setOpen={setOpen}
        content={
            <ActivatingItems {...props} />
        }
    />
}