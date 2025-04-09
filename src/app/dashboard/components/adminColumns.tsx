import {GridColDef} from "@mui/x-data-grid";
import {
    getDateTimeDisplay,
    renderVendorStatusDisplay
} from "@/modules/components/eventTable/EventDataConverter";
import {TimeFormat} from "@/modules/common/DisplayFormatConverter";
import {IntlShape} from "react-intl";

export function adminColumns(intl: IntlShape, funType: string): GridColDef[] {
    return [
        {
            field: 'providerName',
            headerName: intl.formatMessage({id: `${funType}.feederName`, defaultMessage: 'Feeder Name'}),
            headerClassName: 'bold-header',
            flex: 1
        },
        {
            field: 'runningEventCount',
            headerName: intl.formatMessage({id: `${funType}.events`, defaultMessage: 'Events'}),
            headerClassName: 'bold-header',
            flex: 1
        },
        {
            field: 'status',
            headerName: intl.formatMessage({id: `${funType}.status`, defaultMessage: 'Status'}),
            headerClassName: 'bold-header',
            flex: 1,
            renderCell: renderVendorStatusDisplay,
            sortable: false
        },
        {
            field: 'updateTime',
            headerName: intl.formatMessage({id: `${funType}.lastUpdate`, defaultMessage: 'Last Update'}),
            headerClassName: 'bold-header',
            flex: 1,
            valueGetter: (params) => getDateTimeDisplay(params, TimeFormat.Long),
            sortable: false
        },
    ]
};

export const rowsPerPageOptions = [ 10, 15, 20, 30, 50]; // Options to define the number of row to display on table.
export const checkboxSelection = false; // To enable/disable checkbox function.
export const disableSelectionOnClick = true; // To enable/disable selection when click on row.