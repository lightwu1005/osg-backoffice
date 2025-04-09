"use client";
import {GridColDef} from '@mui/x-data-grid';
import '@/modules/components/eventTable/event.columns.css';
import {IntlShape} from "react-intl";

export function columns(intl: IntlShape, funType: string): GridColDef[] {
    return [
        {
            field: 'punterId',
            headerName: intl.formatMessage({id: `${funType}.memberId`, defaultMessage: 'Member ID'}),
            headerClassName: 'bold-header',
            flex: 1.5,
        },
        {
            field: 'punterAccount',
            headerName: intl.formatMessage({id: `${funType}.account`, defaultMessage: 'Account'}),
            headerClassName: 'bold-header',
            flex: 1.5,
        }
    ];
}

export const rowsPerPageOptions = [10, 15, 20, 30, 50];
export const checkboxSelection = true;
export const disableSelectionOnClick = true;