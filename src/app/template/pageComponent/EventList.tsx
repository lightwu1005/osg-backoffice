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
    rowsPerPageOptions
} from "@/app/template/components/eventListColumns";
import {ActivatingModelHeader} from "@/app/template/domain/useTemplateViewModel";
import useEventListViewModel from "@/app/template/domain/useEventListViewModel";

export interface EventListProps extends ToggleProps {
    currentTemplate: ActivatingModelHeader
}

function EventList(props: EventListProps) {
    const {currentTemplate} = props
    const {eventList,loading, pageModel, handleQueryChange} = useEventListViewModel(props.currentTemplate)

    return (

        <Box sx={{padding: '2.5rem'}}>
            <Stack spacing={4} direction={"column"}>
                <Grid container spacing={3} direction={"column"}>
                    <Stack spacing={1} direction={"column"}>
                        <Typography variant={'h1'}>{currentTemplate?.templateName} {currentTemplate?.eventNumber ?? 0} Events</Typography>
                    </Stack>
                </Grid>
            </Stack>
            <Box sx={{paddingY: '1rem'}}>
                    <SearchTextField
                        label='Search a location, league or events'
                        placeholder='Search a location, league or events'
                        openDebounce={true}
                        onChange={(value: string) => handleQueryChange({
                            search: value,
                        })}
                    />
            </Box>
            <CommonTable
                columns={columns()}
                rows={eventList?.content ?? []}
                rowCount={eventList?.totalElements ?? 0}
                checkboxSelection={checkboxSelection}
                disableRowSelectionOnClick={disableSelectionOnClick}
                pageSizeOptions={rowsPerPageOptions}
                pageModel={pageModel}
                setPageModel={newPageModel => handleQueryChange({
                    ...newPageModel
                })}
                isLoading={loading}
                getRowId={(row) => row.eventId}
            />
        </Box>
    )
}

export default function EventListDialog(props: EventListProps & ToggleProps) {
    const {open, setOpen} = props

    return <FullScreenDialog
        open={open}
        setOpen={setOpen}
        content={
            <EventList {...props} />
        }
    />
}