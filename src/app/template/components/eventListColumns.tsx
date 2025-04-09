"use client";
import {GridColDef} from '@mui/x-data-grid';
import {
    getDateTimeDisplay, renderMatchStatusDisplay
} from '@/modules/components/eventTable/EventDataConverter'
import '@/modules/components/eventTable/event.columns.css'
import {TimeFormat} from "@/modules/common/DisplayFormatConverter";
export function columns(): GridColDef[] {
    const cols = [
        { field: 'startTime', headerName: 'Event Time', flex: 1, timeFormat: TimeFormat.Long },
        { field: 'eventId', headerName: 'ID', flex: 1 },
        { field: 'location', headerName: 'Location', flex: 1 },
        { field: 'eventName', headerName: 'Event', flex: 1.5 },
        { field: 'leagueName', headerName: 'League', flex: 1.5 },
        { field: 'status', headerName: 'Status', flex: 0.7 },
    ];

    const columnDefinitions: GridColDef[] = [];

    for (let col of cols) {
        const colDef: GridColDef = {
            field: col.field,
            headerName: col.headerName,
            headerClassName: 'bold-header',
            flex: col.flex,
        };

        if (col.field === 'startTime') {
            colDef.renderCell = (params) => {
                return getDateTimeDisplay(params, col.timeFormat);
            };
        }

        if (col.field === 'status') {
            colDef.renderCell =  renderMatchStatusDisplay
        }

        columnDefinitions.push(colDef);
    }

    return columnDefinitions;
}

export const rowsPerPageOptions = [10, 15, 20, 30, 50];
export const checkboxSelection = false;
export const disableSelectionOnClick = true;
