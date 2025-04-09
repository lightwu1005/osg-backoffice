"use client";
import {Stack} from "@mui/material";
import CommonTable from "@/modules/components/eventTable/CommonTable";
import {
    AutoMultiMenuTextField,
    SearchTextField,
    SingleInputDateRangePicker,
    TextFieldsContainer
} from "@/modules/components/TextField";
import React from "react";
import {
    checkboxSelection,
    columns,
    disableSelectionOnClick,
    rowsPerPageOptions
} from "@/app/notification/components/columns";
import {GridColumnMenu, GridColumnMenuItemProps, GridColumnMenuProps} from "@mui/x-data-grid-pro";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import useNotificationViewModel from "@/app/notification/domain/useNotificationViewModel";
import PageFramework from "@/modules/components/general/PageFramework";
import {Functionality} from "@/services/@core/module/Enum";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {useIntl} from "react-intl";

const readStatus = {
    Read: true,
    Unread: false
}

export default function Page() {
    const {
        loading,
        notificationsData,
        canClean,
        pageModel,
        handleCellClick,
        handleQueryChange,
        handleReadAll,
    } = useNotificationViewModel()
    const userFunctionality = process.env.FUNCTIONALITY ?? '';
    const intl = useIntl();
    const funType = LocalizationFunctionType.Common

    const CustomColumnMenu = (props: GridColumnMenuProps) => {
        const CustomItem = (props: GridColumnMenuItemProps) => {
            const {onClick, value} = props;
            return (
                <MenuItem onClick={onClick}>
                    <ListItemText>{value}</ListItemText>
                </MenuItem>
            );
        }

        if (props.colDef.field === 'readStatus') {
            return <GridColumnMenu
                {...props}
                slots={{
                    columnMenuUserItem: CustomItem,
                    columnMenuFilterItem: null,
                    columnMenuSortItem: null,
                    columnMenuPinningItem: null,
                    columnMenuColumnsItem: null
                }}
                slotProps={{
                    columnMenuUserItem: {
                        value: intl.formatMessage({
                            id: `${funType}.markAllAsRead`, defaultMessage: 'Mark all as read'
                        }),
                        onClick: (event: React.SyntheticEvent) => {
                            handleReadAll()
                            props.hideMenu(event)
                        },
                    },
                }}
            />
        } else {
            return <GridColumnMenu
                {...props}
            />
        }
    }

    const getTextFieldComponents = () => {
        const components = [
            <SingleInputDateRangePicker
                key="time-picker"
                label={intl.formatMessage({id: `${funType}.time`, defaultMessage: 'Time'})}
                onChange={(dateRange) => {
                    handleQueryChange({
                        startDate: dateRange?.[0]?.unix(),
                        endDate: dateRange?.[1]?.unix(),
                    });
                }}
            />,
            <AutoMultiMenuTextField
                key="status-picker"
                label={intl.formatMessage({id: `${funType}.status`, defaultMessage: 'Status'})}
                options={Object.keys(readStatus)}
                onChange={(value: string[]) => {
                    if (value.length === 1) {
                        const key = value[0];
                        const isRead = readStatus[key as keyof typeof readStatus];
                        handleQueryChange({read: isRead});
                    } else {
                        handleQueryChange({read: undefined});
                    }
                }}
            />
        ];

        if (userFunctionality === Functionality.Odds) {
            components.unshift(
                <SearchTextField
                    id={'eventId'}
                    key="event-id-search"
                    label={intl.formatMessage({id: `${funType}.eventID`, defaultMessage: 'Event ID'})}
                    openDebounce={true}
                    onChange={(value: string) => {
                        handleQueryChange({eventId: value});
                    }}
                />
            );
        }

        return components;
    };

    return (
        <PageFramework>
            <Stack spacing={2} sx={{
                width: '100%', maxWidth: '100%', mx: 'auto', paddingY: 2, paddingX: 3,
                minHeight: 0,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <TextFieldsContainer canClean={canClean} displayCleanButton={canClean}>
                    {getTextFieldComponents()}
                </TextFieldsContainer>
                <CommonTable
                    columns={columns(intl, funType)}
                    rows={notificationsData?.content ?? []}
                    rowCount={notificationsData?.totalElements ?? 0}
                    checkboxSelection={checkboxSelection}
                    disableRowSelectionOnClick={disableSelectionOnClick}
                    pageSizeOptions={rowsPerPageOptions}
                    pageModel={pageModel}
                    setPageModel={newPageModel => handleQueryChange({
                        ...newPageModel
                    })}
                    onRowClick={handleCellClick}
                    isLoading={loading}
                    customColumnMenu={CustomColumnMenu}
                    onSortModeChange={(sortField, sortDirection) => {
                        handleQueryChange({sortField, sortDirection})
                    }}
                />
            </Stack>
        </PageFramework>
    )
}