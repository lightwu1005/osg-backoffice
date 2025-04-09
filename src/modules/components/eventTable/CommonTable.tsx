"use client";
import {DataGridPro, GridColumnOrderChangeParams, GridPaginationModel, MuiEvent} from '@mui/x-data-grid-pro'
import {GridCellParams, GridColDef, GridRowsProp, GridSortModel} from '@mui/x-data-grid'
import {LicenseInfo} from '@mui/x-license-pro';
import React from "react";
import {GridInputRowSelectionModel, GridRowSelectionModel} from "@mui/x-data-grid/models/gridRowSelectionModel";
import {GridCallbackDetails} from "@mui/x-data-grid/models/api";
import {GridInitialStatePro} from "@mui/x-data-grid-pro/models/gridStatePro";
import {SortDirection} from "@/services/@core/module/Enum";
import {GridApiPro} from "@mui/x-data-grid-pro/models/gridApiPro";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {GridRowClassNameParams} from "@mui/x-data-grid/models/params";

LicenseInfo.setLicenseKey(process.env.NEXT_PUBLIC_MUI_X_PRO_KEY!);

/**
 * @param columns Define what kind of data to display, and the display sequence.
 * @param rows Data feed.
 * @param rowCount Number, represent total count of row data.
 * @param pageSizeOption The options of row number to display in a page.
 * @param defaultPageSize To set default page size of one page.
 * @param checkboxSelection To enable/disable checkbox function.
 * @param disableRowSelectionOnClick To enable/disable selection when click on row.
 * @param onPageChange Return page and size to let parent component handle data query if need.
 * @param rowSelectionModel Sets the row selection model of the Data Grid.
 * @param onRowSelectionModelChange Callback fired when the selection state of one or multiple rows changes.
 * @param onRowClick Manages the click action on rows, returning parameters obtained from the row data.
 * @param isLoading When set to true, activates a loading animation on the table.
 * @param initialState The initial state of table data.
 * @param customColumnMenu The customized component for column menu when click on column.
 * @param rowsUnSelectableWithIds Define what the row should be unSelectable.
 * @param hideFooterPagination Set to 'ture' to hide pagination object from table.
 * @param hideFooterRowCount Set to 'ture' to hide pagination total number.
 * @param headerBackGroundColor To set the color to header view.
 * @param getRowId To get the row ID.
 * @param onSortModeChange To handle the column sorting and pass sorting field and direction to parent to proceed api calls.
 **/
export interface CommonTableProps {
    columns: GridColDef[];
    rows: GridRowsProp;
    rowCount: number;
    pageSizeOptions?: number[];
    checkboxSelection?: boolean;
    disableRowSelectionOnClick?: boolean;
    pageModel: GridPaginationModel;
    setPageModel: React.Dispatch<React.SetStateAction<GridPaginationModel>>;
    rowSelectionModel?: GridInputRowSelectionModel;
    onRowSelectionModelChange?: (rowSelectionModel: GridRowSelectionModel, details: GridCallbackDetails) => void;
    onRowClick?: (params: GridCellParams, event: MuiEvent, details: GridCallbackDetails) => void;
    isLoading: boolean;
    initialState?: GridInitialStatePro
    customColumnMenu?: React.JSXElementConstructor<any>
    rowsUnSelectableWithIds?: string[]
    hideFooterPagination?: boolean
    hideFooterRowCount?: boolean
    headerBackgroundColor?: string
    getRowId?: (row: any) => string;
    onSortModeChange?: (sortField: string | undefined, sortDirection: SortDirection | undefined) => void;
    rowHeight?: number | 'auto';
    dataGridRef?: React.MutableRefObject<GridApiPro>;
    sortingMode?: 'server' | 'client';
    getRowClassName?: (params: GridRowClassNameParams) => string;
    onColumnOrderChange?: (params: GridColumnOrderChangeParams, event: MuiEvent<{}>, details: GridCallbackDetails) => void;
    disableColumnResize?: boolean;
    disableColumnReorder?: boolean;
}

const CommonTable: React.FC<CommonTableProps> = (
    {
        columns,
        rows,
        rowCount = 0,
        pageSizeOptions = [10, 15],
        checkboxSelection = false,
        disableRowSelectionOnClick = true,
        pageModel,
        setPageModel,
        rowSelectionModel = undefined,
        onRowSelectionModelChange = undefined,
        onRowClick = (params: GridCellParams, event: MuiEvent, details: GridCallbackDetails) => {
        },
        isLoading = false,
        customColumnMenu = undefined,
        initialState = undefined,
        rowsUnSelectableWithIds = [],
        hideFooterPagination = false,
        hideFooterRowCount = false,
        headerBackgroundColor = 'none',
        getRowId,
        onSortModeChange = (sortField: string | undefined, sortDirection: SortDirection | undefined) => {
        },
        rowHeight,
        dataGridRef,
        sortingMode = 'server',
        getRowClassName,
        onColumnOrderChange,
        disableColumnResize,
        disableColumnReorder,
    }) => {
    const intl = useIntl();
    const funType = LocalizationFunctionType.Common

    const onPaginationChange = (newModel: GridPaginationModel) => {
        setPageModel({
            ...newModel,
            page: newModel.page + 1
        });
    }

    const onSortingChange = (sortModel: GridSortModel) => {
        if (sortModel.length > 0) {
            const condition = sortModel[0];
            const sortDirection = condition.sort ? SortDirection[condition.sort?.toUpperCase() as keyof typeof SortDirection] : undefined;
            onSortModeChange(condition.field, sortDirection);
        } else {
            onSortModeChange(undefined, undefined);
        }
    }

    const handleCellClick = (params: GridCellParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => {
        const isSelectingText = window.getSelection()?.toString();

        if (isSelectingText) {
            event.stopPropagation();
        } else {
            if (onRowClick) onRowClick(params, event, details);
        }
    };

    return (
        <DataGridPro
            apiRef={dataGridRef}
            data-testid={'table'}
            getRowHeight={() => rowHeight ?? 56}
            sx={{
                border: 0,
                '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
                    '&:focus': {
                        outline: 0,
                    },
                },
                '& .MuiDataGrid-columnHeader': {
                    backgroundColor: headerBackgroundColor,
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                },
                "& .MuiDataGrid-cell": {
                    display: "block", // to align content to top
                    py: 1,
                    verticalAlign: "top",
                },
            }}
            localeText={{
                noRowsLabel: intl.formatMessage({id: `${funType}.noData`, defaultMessage: 'No Data'}),
                footerRowSelected: (count) =>
                    intl.formatMessage({
                            id: `${funType}.rowSelectedCount`, defaultMessage: 'selected: {count}'
                        }, {count: count}
                    ),
                MuiTablePagination: {
                    labelRowsPerPage: intl.formatMessage({
                        id: `${funType}.rowsPerPage`,
                        defaultMessage: 'Rows per page:'
                    }),
                    labelDisplayedRows: ({from, to, count}) =>
                        `${from}–${to} ${intl.formatMessage({id: `${funType}.of`, defaultMessage: 'of'})} 
                            ${count !== -1 ? count : `${intl.formatMessage({id: `${funType}.over`, defaultMessage: 'over'})} 
                            ${to}`}`,
                }
            }}
            rows={rows}
            columns={columns}
            rowCount={rowCount}
            pageSizeOptions={pageSizeOptions}
            checkboxSelection={checkboxSelection}
            rowSelectionModel={rowSelectionModel}
            onRowSelectionModelChange={onRowSelectionModelChange}
            disableRowSelectionOnClick={disableRowSelectionOnClick}
            onCellClick={handleCellClick}
            loading={isLoading}
            hideFooterPagination={hideFooterPagination}
            hideFooterRowCount={hideFooterRowCount}
            paginationModel={{
                ...pageModel,
                page: pageModel.page - 1
            }}
            paginationMode='server'
            pagination
            disableMultipleColumnsSorting={true}
            onPaginationModelChange={onPaginationChange}
            isRowSelectable={(params) => {
                return !rowsUnSelectableWithIds.includes(params.id.toString());
            }}
            initialState={initialState}
            {...(customColumnMenu ? {
                slots: {
                    columnMenu: customColumnMenu
                }
            } : undefined)}
            getRowId={getRowId}
            disableColumnMenu={customColumnMenu === undefined}
            sortingMode={sortingMode}
            onSortModelChange={onSortingChange}
            getRowClassName={getRowClassName}
            onColumnOrderChange={onColumnOrderChange}
            {...(disableColumnResize && {
                disableColumnResize: disableColumnResize
            })}
            {...(disableColumnReorder && {
                disableColumnReorder: disableColumnReorder
            })}
        />
    );
};

export default CommonTable;