"use client";
import {GridColDef} from '@mui/x-data-grid';
import {getDateTimeDisplay} from '@/modules/components/eventTable/EventDataConverter'
import '@/modules/components/eventTable/event.columns.css'
import {TimeFormat} from "@/modules/common/DisplayFormatConverter";
import {MarkChatReadRounded as ReadIcon, MarkChatUnreadRounded as UnreadIcon} from "@mui/icons-material";
import React from "react";
import {Tooltip} from "@mui/material";
import {Functionality} from "@/services/@core/module/Enum";
import {IntlShape} from "react-intl";

export function columns(intl: IntlShape, funType: string): GridColDef[] {
    const userFunctionality = process.env.FUNCTIONALITY ?? '';

    let cols: GridColDef[] = [
        {
            field: 'notificationTime',
            headerName: intl.formatMessage({id: `${funType}.time`, defaultMessage: 'Time'}),
            headerClassName: 'bold-header',
            flex: 1.2,
            renderCell: (params) => {
                return getDateTimeDisplay(params, TimeFormat.Long)
            },
        },
        {
            field: 'notificationName',
            headerName: intl.formatMessage({id: `${funType}.event`, defaultMessage: 'Event'}),
            headerClassName: 'bold-header',
            flex: 2,
        },
        {
            field: 'description',
            headerName: intl.formatMessage({id: `${funType}.eventDescription`, defaultMessage: 'Event Description'}),
            headerClassName: 'bold-header',
            flex: 2.7,
            sortable: false
        },
        {
            field: 'readStatus',
            headerName: intl.formatMessage({id: `${funType}.readOrUnread`, defaultMessage: 'Read/ Unread'}),
            headerClassName: 'bold-header',
            flex: 0.8,
            renderCell: (params) => {
                if (params.value as boolean) {
                    return <ReadIcon sx={{color: '#9FA6AD'}}/>
                } else {
                    return <Tooltip
                        title={intl.formatMessage({
                            id: `${funType}.markAsRead`, defaultMessage: 'Mark as read'
                        })}
                        placement="left"
                    >
                        <UnreadIcon sx={{color: '#0B6BCB'}}/>
                    </Tooltip>
                }
            },
        },
    ]

    if (userFunctionality === Functionality.Odds) {
        const newColumn: GridColDef = {
            field: 'eventId',
            headerName: intl.formatMessage({id: `${funType}.eventID`, defaultMessage: 'Event ID'}),
            headerClassName: 'bold-header',
            flex: 0.8,
        }

        cols.splice(1, 0, newColumn);
    }

    return cols
}

export const rowsPerPageOptions = [10, 15, 20, 30, 50]; // Options to define the number of row to display on table.
export const checkboxSelection = false; // To enable/disable checkbox function.
export const disableSelectionOnClick = true; // To enable/disable selection when click on row.

