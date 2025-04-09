"use client";
import {GRID_CHECKBOX_SELECTION_COL_DEF, GridColDef} from '@mui/x-data-grid';
import {
    getDateTimeDisplay,
    renderMemberStatusDisplay
} from '@/modules/components/eventTable/EventDataConverter'
import '@/modules/components/eventTable/event.columns.css'
import {TimeFormat} from "@/modules/common/DisplayFormatConverter";
import {Functionality} from "@/services/@core/module/Enum";
import {IntlShape} from "react-intl";

enum PermissionColumnType {
    UserName = 'userName',
    Role = 'role',
    UserAccount = 'userAccount',
    Organization = 'organization',
    LastLogin = 'lastLogin',
    Status = 'status'
}

export function columns(intl: IntlShape, funType: string): GridColDef[] {
    const userFunctionality = process.env.FUNCTIONALITY ?? '';
    const defaultCols = [
        {
            field: 'userName',
            headerName: intl.formatMessage({id: `${funType}.userName`, defaultMessage: 'User Name'}),
            flex: 1
        },
        {
            field: 'role',
            headerName: intl.formatMessage({id: `${funType}.role`, defaultMessage: 'Role'}),
            flex: 0.5
        },
        {
            field: 'userAccount',
            headerName: intl.formatMessage({id: `${funType}.email`, defaultMessage: 'Email'}),
            flex: 2,
            sortable: false
        },
        {
            field: 'lastLogin',
            headerName: intl.formatMessage({id: `${funType}.lastLoginTime`, defaultMessage: 'Last Login Time'}),
            flex: 1.5,
            timeFormat: TimeFormat.Long
        },
        {
            field: 'status',
            headerName: intl.formatMessage({id: `${funType}.accountStatus`, defaultMessage: 'Account Status'}),
            flex: 1,
            specialRender: true
        },
    ];

    switch (userFunctionality) {
        case Functionality.Admin:
            defaultCols.splice(3, 0, {
                field: 'organization',
                headerName: intl.formatMessage({id: `${funType}.companyName`, defaultMessage: 'Company Name'}),
                flex: 1
            });
            break;
        case Functionality.Odds:
            defaultCols.forEach((col) => {
                switch (col.field) {
                    case PermissionColumnType.UserName:
                        col.headerName = intl.formatMessage({id: `${funType}.userName`, defaultMessage: 'User Name'});
                        break;
                    case PermissionColumnType.Role:
                        col.flex = 1;
                        break;
                    case PermissionColumnType.UserAccount:
                        col.flex = 1;
                        break;
                }
            });
            break;
        default:
            break;
    }

    const columnDefinitions: GridColDef[] = [];

    for (let col of defaultCols) {
        const colDef: GridColDef = {
            field: col.field,
            headerName: col.headerName,
            headerClassName: 'bold-header',
            flex: col.flex,
        };
        if ('sortable' in col) {
            colDef.sortable = col.sortable
        }

        if (col.field === 'lastLogin') {
            colDef.renderCell = (params) => {
                return getDateTimeDisplay(params, col.timeFormat);
            };
        } else if (col.field === 'status' && col.specialRender) {
            colDef.renderCell = renderMemberStatusDisplay;
        }

        columnDefinitions.push(colDef);
    }

    return columnDefinitions;
}

export const pinColumns = {
    left: [
        GRID_CHECKBOX_SELECTION_COL_DEF.field,
        'userName',
        'role'
    ],
    right: []
}
export const rowsPerPageOptions = [10, 15, 20, 30, 50];
export const checkboxSelection = true;
export const disableSelectionOnClick = true;
