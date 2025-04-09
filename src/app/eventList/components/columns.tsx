"use client";
import {GRID_CHECKBOX_SELECTION_COL_DEF, GridColDef} from '@mui/x-data-grid';
import {
    getDateTimeDisplay,
    renderBetSlipsDisplay,
    renderMarketStatusDisplay,
    renderMatchStatusDisplay,
    renderOddsBaseLinePriceDisplay,
    renderWithDangerBall,
} from '@/modules/components/eventTable/EventDataConverter'
import '@/modules/components/eventTable/event.columns.css'
import * as React from "react";
import QuickAction, {QuickActionCallback} from "@/modules/components/eventTable/QuickAction";
import {EventStatus} from "@/services/@core/module/EventStatus";
import PermissionHandler from "@/modules/common/PermissionHandler";
import {ConfigurationModel} from "@/services/@core/module/ResponseDataModels";
import IdentityHandler from "@/modules/common/IdentityHandler";
import {allFirstCharToUpperCase, TimeFormat} from "@/modules/common/DisplayFormatConverter";
import {EventMarketStatus} from "@/services/@core/module/Enum";
import {IntlShape} from "react-intl";

export function columns(
    intl: IntlShape,
    funType: string,
    sportName: string,
    oddsDisplay: string,
    handleCopyButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, text: string) => void,
    configuration?: ConfigurationModel,
    handlePriceChanged?: (betId: string, price: number, originalPrice: number) => void,
    handleQuickAction?: QuickActionCallback,
    pinEventIds: string[] = [],
    handleMoreLines?: (displayMarketName: string, eventId: string, marketId: string) => void,
): GridColDef[] {
    const isBasketball = sportName.toLowerCase() === 'basketball';
    const oUtotalTitle = isBasketball ? 'Total Points O/U' : 'Total Goals O/U'
    const handicapTitle = 'Match Handicap';
    const oneXTwoTitle = isBasketball ? 'Money Line' : 'Match Result';
    const underOverTitle = isBasketball ? 'Total Points Over / Under' : 'Total Goals Over / Under';

    return [
        {
            field: 'eventId',
            headerName: intl.formatMessage({id: `${funType}.eventID`, defaultMessage: 'Event ID'}),
            headerClassName: 'bold-header',
            width: 125,
            renderCell: (params) => renderWithDangerBall(intl, funType, params, handleCopyButtonClick)
        },
        {
            field: 'startTime',
            headerName: intl.formatMessage({id: `${funType}.eventStartTime`, defaultMessage: 'Event Start Time'}),
            headerClassName: 'bold-header',
            width: 115,
            valueGetter: (params) => getDateTimeDisplay(params, TimeFormat.Short),
        },
        {
            field: 'leagueName',
            headerName: intl.formatMessage({id: `${funType}.league`, defaultMessage: 'League'}),
            headerClassName: 'bold-header',
            width: 175,
        },
        {
            field: 'locationName',
            headerName: intl.formatMessage({id: `${funType}.location`, defaultMessage: 'Location'}),
            headerClassName: 'bold-header',
            width: 100,
            sortable: false
        },
        {
            field: 'eventName',
            headerName: intl.formatMessage({id: `${funType}.event`, defaultMessage: 'Event'}),
            headerClassName: 'bold-header',
            width: 125,
        },
        {
            field: 'status',
            headerName: intl.formatMessage({id: `${funType}.eventStatus`, defaultMessage: 'Event Status'}),
            headerClassName: 'bold-header',
            width: 150,
            renderCell: renderMatchStatusDisplay
        },
        {
            field: 'OU',
            headerName: oUtotalTitle,
            headerClassName: 'bold-header',
            minWidth: 400,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => renderOddsBaseLinePriceDisplay(params, underOverTitle, oddsDisplay, configuration, handlePriceChanged, handleMoreLines)
        },
        {
            field: 'AH',
            headerName: handicapTitle,
            headerClassName: 'bold-header',
            minWidth: 400,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => renderOddsBaseLinePriceDisplay(params, handicapTitle, oddsDisplay, configuration, handlePriceChanged, handleMoreLines)
        },
        {
            field: isBasketball ? '12' : '1X2',
            headerName: oneXTwoTitle,
            headerClassName: 'bold-header',
            minWidth: 450,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => renderOddsBaseLinePriceDisplay(params, oneXTwoTitle, oddsDisplay, configuration, handlePriceChanged, undefined)
        },
        {
            field: 'marketStatus',
            headerName: intl.formatMessage({ id: `${funType}.runningSuspendedHide`, defaultMessage: 'Running / Suspended / Hide' }),
            headerClassName: 'bold-header',
            headerAlign: 'center',
            align: 'center',
            minWidth: 220,
            sortable: false,
            renderCell: renderMarketStatusDisplay
        },
        {
            field: 'betSlips',
            headerName: intl.formatMessage({ id: `${funType}.acceptPending`, defaultMessage: 'Accept / Pending' }),
            headerClassName: 'bold-header',
            minWidth: 200,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: renderBetSlipsDisplay
        },
        // {
        //     field: 'updateTime',
        //     headerName: 'Last Update Time',
        //     headerClassName: 'bold-header',
        //     width: 170,
        //     align: 'center',
        //     renderCell: (params) => getDateTimeDisplay(params, TimeFormat.Long)
        // }, This field is temporarily hidden because [FE-714]
        {
            field: 'actions',
            headerName: intl.formatMessage({id: `${funType}.quickAction`, defaultMessage: 'Quick Action'}),
            headerClassName: 'bold-header',
            minWidth: 175,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => {
                const eventId = params.row['eventId'] as string
                const eventStatus = params.row['status'] as string
                const status = params.row['eventSuspendedStatus']
                const pinStatus = pinEventIds.includes(eventId)
                const suspendStatus = status && status === EventMarketStatus.SUSPENDED
                const closeStatus = status && status === EventMarketStatus.CLOSE
                const finishStatus = (
                    eventStatus === allFirstCharToUpperCase(EventStatus.FINISHED) ||
                    eventStatus === allFirstCharToUpperCase(EventStatus.CANCELED) ||
                    eventStatus === allFirstCharToUpperCase(EventStatus.ABANDONED)
                )
                const {isEditable: checkEdit} = PermissionHandler()
                const {userRole, currentPathName} = IdentityHandler();
                const isEditable = checkEdit(userRole, currentPathName || '');

                return <QuickAction
                    id={eventId}
                    editable={isEditable}
                    isCollapsed={false}
                    pinStatus={pinStatus}
                    templateStatus={false}
                    suspendStatus={suspendStatus}
                    closeStatus={closeStatus}
                    payoutStatus={false}
                    finishStatus={finishStatus}
                    onAction={handleQuickAction ?? (() => {
                    })}
                />
            }
        },
    ]
}

export const pinColumns = {
    left: [
        GRID_CHECKBOX_SELECTION_COL_DEF.field,
        'eventId',
    ],
    right: [],
}

export const skipField = [
    '__check__',
    'OU',
    'AH',
    '1X2',
    '12',
    'actions'
]

export const rowsPerPageOptions = [10, 15, 20, 30, 50]; // Options to define the number of row to display on table.
export const checkboxSelection = true; // To enable/disable checkbox function.
export const disableSelectionOnClick = true; // To enable/disable selection when click on row.