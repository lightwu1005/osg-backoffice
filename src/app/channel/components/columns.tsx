"use client";
import {GRID_CHECKBOX_SELECTION_COL_DEF, GridColDef} from '@mui/x-data-grid';
import {getDateTimeDisplay, renderChannelStatusDisplay} from '@/modules/components/eventTable/EventDataConverter';
import '@/modules/components/eventTable/event.columns.css';
import {TimeFormat} from "@/modules/common/DisplayFormatConverter";
import GridChips from "@/modules/components/chip/GridChip";
import {Functionality} from "@/services/@core/module/Enum";
import {IntlShape} from "react-intl";

export function columns(intl: IntlShape, funType: string): GridColDef[] {
    const userFunctionality = process.env.FUNCTIONALITY ?? '';

    const defaultCols: GridColDef[] = [
        {
            field: 'channelName',
            headerName: intl.formatMessage({id: `${funType}.channelName`, defaultMessage: 'Channel Name'}),
            headerClassName: 'bold-header',
            flex: 1.5,
        },
        {
            field: 'email',
            headerName: intl.formatMessage({id: `${funType}.contactEmail`, defaultMessage: 'Contact Email'}),
            headerClassName: 'bold-header',
            flex: 1.5,
        },
        {
            field: 'locationName',
            headerName: intl.formatMessage({id: `${funType}.location`, defaultMessage: 'Location'}),
            headerClassName: 'bold-header',
            flex: 1,
        },
        {
            field: 'oddsFormat',
            headerName: intl.formatMessage({id: `${funType}.oddsFormat`, defaultMessage: 'Odds Format'}),
            headerClassName: 'bold-header',
            flex: 1.7,
            renderCell: (params) => {
                const id = params.row['channelId'];
                return <GridChips id={id} labels={params.value}/>;
            },
            sortable: false
        },
        {
            field: 'status',
            headerName: intl.formatMessage({id: `${funType}.status`, defaultMessage: 'Status'}),
            headerClassName: 'bold-header',
            flex: 1,
            renderCell: (params) => {
                return renderChannelStatusDisplay(params);
            }
        },
        {
            field: 'regTime',
            headerName: intl.formatMessage({id: `${funType}.registrationTime`, defaultMessage: 'Registration Time'}),
            headerClassName: 'bold-header',
            flex: 1,
            renderCell: (params) => {
                return getDateTimeDisplay(params, TimeFormat.Long);
            },
            sortable: false
        },
    ];

    if (userFunctionality === Functionality.Odds) {
        const marginCol: GridColDef = {
            field: 'margin',
            headerName: intl.formatMessage({id: `${funType}.margin`, defaultMessage: 'Margin'}),
            headerClassName: 'bold-header',
            flex: 1,
            renderCell: (params) => {
                return `${params.value ?? ''}%`;
            }
        };

        const updatedCols = [...defaultCols];
        updatedCols.splice(2, 0, marginCol);

        defaultCols.forEach((col) => {
            switch (col.field) {
                case 'channelName':
                    col.flex = 1
                    break;
                case 'email':
                    col.flex = 2;
                    break;
            }
        });
        return updatedCols;
    }

    return defaultCols;
}

export const pinColumns = {
    left: [
        GRID_CHECKBOX_SELECTION_COL_DEF.field,
        'channelName',
    ],
    right: []
}
export const rowsPerPageOptions = [10, 15, 20, 30, 50]; // Options to define the number of row to display on table.
export const checkboxSelection = true; // To enable/disable checkbox function.
export const disableSelectionOnClick = true; // To enable/disable selection when click on row.
