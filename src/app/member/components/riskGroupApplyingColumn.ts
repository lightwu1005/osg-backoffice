"use client";
import {GridColDef} from '@mui/x-data-grid';
import {getDateTimeDisplay} from '@/modules/components/eventTable/EventDataConverter'
import {TimeFormat} from "@/modules/common/DisplayFormatConverter";
import '@/modules/components/eventTable/event.columns.css'
import {IntlShape} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

/**
 * The value of field will be used as the key for sortField.
 * */
export function columns(intl: IntlShape): GridColDef[] {
    const funcType = LocalizationFunctionType.Common
    return [
        {
            field: 'punterId',
            headerName: intl.formatMessage({id: `${funcType}.memberId`, defaultMessage: 'Member ID'}),
            flex: 1
        },
        {
            field: 'punterAccount',
            headerName: intl.formatMessage({id: `${funcType}.account`, defaultMessage: 'Account'}),
            flex: 1
        },
        {
            field: 'lastUpdate',
            headerName: intl.formatMessage({id: `${funcType}.lastUpdatedTime`, defaultMessage: 'Last Updated Time'}),
            flex: 1,
            renderCell: (params) => {
                return getDateTimeDisplay(params, TimeFormat.Long)
            }
        }
    ];
}

export const rowsPerPageOptions = [10, 15, 20, 30, 50];
export const checkboxSelection = true;
export const disableSelectionOnClick = true;
