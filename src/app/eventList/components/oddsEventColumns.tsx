"use client";
import {GridColDef} from '@mui/x-data-grid';
import {
    getDateTimeDisplay,
    renderBetSlipsDisplay,
    renderBetSlipsSmallDisplay,
    renderEventDisplay,
    renderMarketStatusDisplay,
    renderMatchStatusDisplay,
    renderOddsBaseLinePriceDisplayWithApplyTemplate,
    renderWithEventIdAndStatus,
    renderWithLocationLeagueAndTemplate
} from '@/modules/components/eventTable/EventDataConverter'
import '@/modules/components/eventTable/event.columns.css'
import * as React from "react";
import QuickAction, {QuickActionCallback} from "@/modules/components/eventTable/QuickAction";
import {EventStatus} from "@/services/@core/module/EventStatus";
import PermissionHandler from "@/modules/common/PermissionHandler";
import {ApplyTemplate, ConfigurationModel} from "@/services/@core/module/ResponseDataModels";
import IdentityHandler from "@/modules/common/IdentityHandler";
import {allFirstCharToUpperCase, TimeFormat} from "@/modules/common/DisplayFormatConverter";
import {BetSlipEventType, EventMarketStatus, EventType} from "@/services/@core/module/Enum";
import {IntlShape} from "react-intl";
import {Box, IconButton, Stack} from "@mui/material";
import {MenuOpenRounded, MenuRounded} from "@mui/icons-material";
import {getMarketNameMappings} from "@/app/eventList/models/marketMappings";
import {RightDrawerProps} from "@/modules/components/drawer/RightDrawer";

export function oddsEventColumns(
    intl: IntlShape,
    funType: string,
    eventType: string,
    sportType: string,
    oddsDisplay: string,
    handleCopyButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, text: string) => void,
    handleTemplateBtnClick: (template: ApplyTemplate) => void,
    handleBarChartClick: (event: React.MouseEvent) => void,
    handleCollapse?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    isCollapsed?: boolean,
    configuration?: ConfigurationModel,
    handlePriceChanged?: (betId: string, price: number, originalPrice: number) => void,
    handleQuickAction?: QuickActionCallback,
    pinEventIds: string[] = [],
    handleRightDrawer?: (props: Omit<RightDrawerProps, 'open' | 'setOpen'>) => void,
    handleMoreLines?: (displayMarketName: string, eventId: string, marketId: string) => void
): GridColDef[] {
    const { marketNameObj, displayLabelObj } = getMarketNameMappings(sportType, eventType === EventType.inPlay);
    const localizedMarkets = Array.from({ length: 6 }, (_, i) => {
        const key = `oddsMarket${i + 1}`;
        return intl.formatMessage(
            { id: displayLabelObj[key], defaultMessage: displayLabelObj[key] },
        );
    });

    return [
        {
            field: 'startTime',
            headerName: intl.formatMessage({id: `${funType}.time`, defaultMessage: 'Time'}),
            headerClassName: 'bold-header',
            width: 65,
            valueGetter: (params) => getDateTimeDisplay(params, TimeFormat.Short),
        },
        {
            field: 'eventId',
            headerName: `${intl.formatMessage({ id: `${funType}.eventID`, defaultMessage: 'Event ID' })} / ${intl.formatMessage({ id: `${funType}.realTimeStatus`, defaultMessage: 'Real-Time Status' })}`,
            headerClassName: 'bold-header',
            renderHeader: () => (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    justifyContent="center"
                    sx={{ height: '100%', lineHeight: 'normal' }}
                    className="MuiDataGrid-columnHeaderTitle"
                >
                    <div>
                        {intl.formatMessage({ id: `${funType}.eventID`, defaultMessage: 'Event ID' })}&nbsp;/
                    </div>
                    <div>
                        {intl.formatMessage({ id: `${funType}.realTimeStatus`, defaultMessage: 'Real-Time Status' })}
                    </div>
                </Box>
            ),
            width: 120,
            renderCell: (params) => renderWithEventIdAndStatus(intl, funType, params, handleCopyButtonClick)
        },
        {
            field: 'leagueName',
            headerName: `${intl.formatMessage({id: `${funType}.location`, defaultMessage: 'Location'})} / ${intl.formatMessage({id: `${funType}.league`, defaultMessage: 'League'})}`,
            headerClassName: 'bold-header',
            renderHeader: () => (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    justifyContent="center"
                    sx={{height: '100%', lineHeight: 'normal'}}
                    className="MuiDataGrid-columnHeaderTitle"
                >
                    <div>
                        {intl.formatMessage({id: `${funType}.location`, defaultMessage: 'Location'})}
                        &nbsp;/&nbsp;
                        {intl.formatMessage({id: `${funType}.league`, defaultMessage: 'League'})}
                    </div>
                </Box>
            ),
            width: 140,
            renderCell: (params) => renderWithLocationLeagueAndTemplate(intl, funType, params, handleCopyButtonClick, handleTemplateBtnClick)
        },
        {
            field: 'event',
            headerName: intl.formatMessage({id: `${funType}.event`, defaultMessage: 'Event'}),
            headerClassName: 'bold-header',
            width: 150,
            renderCell: (params) => renderEventDisplay(params, intl, eventType, handleRightDrawer)
        },
        {
            field: 'oddsMarket1',
            headerName: localizedMarkets[0],
            headerClassName: 'bold-header',
            width: 280,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => renderOddsBaseLinePriceDisplayWithApplyTemplate(
                params, localizedMarkets[0], marketNameObj.oddsMarket1, oddsDisplay, configuration,
                handlePriceChanged, handleTemplateBtnClick, handleMoreLines)
        },
        {
            field: 'oddsMarket2',
            headerName: localizedMarkets[1],
            headerClassName: 'bold-header',
            width: 280,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => renderOddsBaseLinePriceDisplayWithApplyTemplate(
                params, localizedMarkets[1], marketNameObj.oddsMarket2, oddsDisplay, configuration,
                handlePriceChanged, handleTemplateBtnClick, handleMoreLines)
        },
        {
            field: 'oddsMarket3',
            headerName: localizedMarkets[2],
            headerClassName: 'bold-header',
            width: 280,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => renderOddsBaseLinePriceDisplayWithApplyTemplate(
                params, localizedMarkets[2], marketNameObj.oddsMarket3, oddsDisplay, configuration,
                handlePriceChanged, handleTemplateBtnClick, handleMoreLines)
        },
        {
            field: 'oddsMarket4',
            headerName: localizedMarkets[3],
            headerClassName: 'bold-header',
            width: 280,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => renderOddsBaseLinePriceDisplayWithApplyTemplate(
                params, localizedMarkets[3], marketNameObj.oddsMarket4, oddsDisplay, configuration,
                handlePriceChanged, handleTemplateBtnClick, handleMoreLines)
        },
        {
            field: 'oddsMarket5',
            headerName: localizedMarkets[4],
            headerClassName: 'bold-header',
            width: 280,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => renderOddsBaseLinePriceDisplayWithApplyTemplate(
                params, localizedMarkets[4], marketNameObj.oddsMarket5, oddsDisplay, configuration,
                handlePriceChanged, handleTemplateBtnClick, handleMoreLines)
        },
        {
            field: 'oddsMarket6',
            headerName: localizedMarkets[5],
            headerClassName: 'bold-header',
            width: 280,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => renderOddsBaseLinePriceDisplayWithApplyTemplate(
                params, localizedMarkets[5], marketNameObj.oddsMarket6, oddsDisplay, configuration,
                handlePriceChanged, handleTemplateBtnClick, handleMoreLines)
        },
        {
            field: 'marketStatus',
            headerName: intl.formatMessage({ id: `${funType}.runningSuspendedHide`, defaultMessage: 'Running / Suspended / Hide' }),
            headerClassName: 'bold-header',
            headerAlign: 'center',
            align: 'center',
            width: 200,
            minWidth: 100,
            sortable: false,
            renderCell: renderMarketStatusDisplay
        },
        {
            field: 'betSlips',
            headerName: intl.formatMessage({ id: `${funType}.acceptPendingReject`, defaultMessage: 'Accept / Pending / Reject' }),
            renderHeader: (params) => {
                const width = params.colDef.width || 0;
                return (
                    <Box fontWeight={700}>
                        { width <= 150
                            ? intl.formatMessage({ id: `${funType}.acceptPendingRejectSmall`, defaultMessage: 'Accept / Pending / Reject' })
                            : intl.formatMessage({ id: `${funType}.acceptPendingReject`, defaultMessage: 'Accept / Pending / Reject' })}
                    </Box>
                )
            },
            headerClassName: 'bold-header',
            width: 200,
            minWidth: 100,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => {
                const width = params.colDef.width || 0;
                return width <= 150
                    ?
                    <Box id={'accept-data'} sx={{
                        cursor: 'pointer',
                        width: '100%'
                    }}>{renderBetSlipsSmallDisplay(params)}</Box>
                    : <Box id={'bar-chart'} sx={{
                        cursor: 'pointer',
                        width: '100%'
                    }}>{renderBetSlipsDisplay(params, handleBarChartClick)}</Box>
            }
        },
        {
            field: 'status',
            headerName: intl.formatMessage({id: `${funType}.eventStatus`, defaultMessage: 'Event Status'}),
            headerClassName: 'bold-header',
            width: 150,
            renderCell: renderMatchStatusDisplay
        },
        {
            field: 'actions',
            headerClassName: 'bold-header',
            minWidth: isCollapsed ? undefined : 150,
            maxWidth: isCollapsed ? 56 : undefined,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderHeader: () => (
                <Stack direction={'row'}
                       width={isCollapsed ? 56 : 150}
                       justifyContent={'space-between'}
                       alignItems={'center'}
                       alignContent={'center'}
                       className="MuiDataGrid-columnHeaderTitle"
                >
                   {
                       !isCollapsed && intl.formatMessage({
                           id: `${funType}.quickAction`,
                           defaultMessage: 'Quick Action'
                       })
                   }
                   <IconButton
                       size={'small'}
                       onClick={handleCollapse}
                   >
                       {isCollapsed ? <MenuOpenRounded/> : <MenuRounded/>}
                   </IconButton>
                </Stack>
            ),
            renderCell: (params) => {
                const eventId = params.row['eventId'] as string
                const eventStatus = params.row['status'] as string
                const status = params.row['eventSuspendedStatus']
                const pinStatus = pinEventIds.includes(eventId)
                const suspendStatus = status && status === EventMarketStatus.SUSPENDED
                const closeStatus = status && status === EventMarketStatus.CLOSE
                const autoPayoutStatus = params.row['autoPayoutStatus'] && params.row['autoPayoutStatus'] === 'ON'
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
                    isCollapsed={isCollapsed ?? false}
                    pinStatus={pinStatus}
                    templateStatus={false}
                    suspendStatus={suspendStatus}
                    closeStatus={closeStatus}
                    payoutStatus={autoPayoutStatus}
                    finishStatus={finishStatus}
                    onAction={(id, buttonName, status) =>
                        // Make sure the onAction callback value has been passed to the handleQuickAction function.
                        handleQuickAction && handleQuickAction(id, buttonName, status)}
                />
            }
        },
    ]
}

export const pinColumns = {
    left: [],
    right: [],
}

export const skipField = [
    '__check__',
    'leagueName',
    'oddsMarket1',
    'oddsMarket2',
    'oddsMarket3',
    'oddsMarket4',
    'oddsMarket5',
    'oddsMarket6',
    'actions',
    'betSlips'
]

export const rowsPerPageOptions = [10, 15, 20, 30, 50]; // Options to define the number of row to display on table.
export const checkboxSelection = true; // To enable/disable checkbox function.
export const disableSelectionOnClick = true; // To enable/disable selection when click on row.
