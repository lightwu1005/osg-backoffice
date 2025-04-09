'use client';
import {GridColDef} from "@mui/x-data-grid";
import {getDateTimeDisplay} from "@/modules/components/eventTable/EventDataConverter"
import "@/modules/components/eventTable/event.columns.css"
import {TimeFormat} from "@/modules/common/DisplayFormatConverter";
import {DescriptionRenderer} from "@/app/audit/components/DataConverter";
import {IntlShape} from "react-intl";

export function columns(
    intl: IntlShape,
    funType: string,
    clickSeeMoreButton: (content: string) => void,
): GridColDef[] {
    return [
        {
            field: 'logTime',
            headerName: intl.formatMessage({id: `${funType}.time`, defaultMessage: 'Time'}),
            headerClassName: 'bold-header',
            flex: 1.5,
            renderCell: (params) => {
                return getDateTimeDisplay(params, TimeFormat.Long)
            },
        },
        {
            field: 'userName',
            headerName: intl.formatMessage({id: `${funType}.userName`, defaultMessage: 'User Name'}),
            headerClassName: 'bold-header',
            flex: 1.2,
        },
        {
            field: 'action',
            headerName: intl.formatMessage({id: `${funType}.action`, defaultMessage: 'Action'}),
            headerClassName: 'bold-header',
            flex: 1.2,
        },
        {
            field: 'requestBody',
            headerName: intl.formatMessage({id: `${funType}.description`, defaultMessage: 'Description'}),
            headerClassName: 'bold-header',
            flex: 5,
            sortable: false,
            renderCell: (params) => {
                return DescriptionRenderer({
                    value: params.value,
                    computedWidth: params.colDef.computedWidth,
                    clickSeeMoreButton,
                    buttonText: intl.formatMessage({id: `${funType}.more`, defaultMessage: 'More'}),
                })
            }
        }
    ]
}

export const rowsPerPageOptions = [10, 15, 20, 30, 50]; // Options to define the number of row to display on table.
export const checkboxSelection = false; // To enable/disable checkbox function.
export const disableSelectionOnClick = true; // To enable/disable selection when click on row.

