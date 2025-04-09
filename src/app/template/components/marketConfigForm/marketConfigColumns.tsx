import {IntlShape} from "react-intl";
import {
    GridColDef,
    GridColumnHeaderParams,
    GridRenderCellParams,
    GridRowModel
} from "@mui/x-data-grid-pro";
import {Stack, TextField, Typography, Box, MenuItem} from "@mui/material";
import * as React from "react";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import Switch from "@mui/material/Switch";
import {GRID_CHECKBOX_SELECTION_COL_DEF, GridRowId} from "@mui/x-data-grid";
import {allFirstCharToUpperCase, toUpperCaseWithUnderscore} from "@/modules/common/DisplayFormatConverter";

/**
 * @param intl To get the localized string
 * @param funType To get the function type
 * @param processRowUpdate To handle the row update
 * @param batchUpdate To handle the batch update when selecting multiple rows
 * @param rowSelectionModel To represent the selected row
 * @param viewOnly To represent the view only mode, default is false
 */
export function marketConfigColumns(
    intl: IntlShape,
    funType: string,
    viewOnly: boolean,
    processRowUpdate?: (update: GridRowModel) => void,
    batchUpdate?: (field: string, value: number | string | boolean) => void,
    rowSelectionModel?: GridRowId[],
): GridColDef[] {
    const isMultipleRowsSelected = rowSelectionModel?.length && rowSelectionModel.length > 1;
    const lineOptions = ['NO_LIMIT', 'MAINLINE_ONLY']; // ...Array.from({ length: 99 }, (_, i) => (i + 1).toString())

    const renderSingleBetAmount = (params: GridRenderCellParams<any, string>) => {
        const singleBetSettings = params.row.singleBetSettings;
        switch (params.field) {
            case 'singleBetMinimumAmount':
                return <Typography>{singleBetSettings.minimum}</Typography>
            case 'singleBetMaximumAmount':
                return <Typography>{singleBetSettings.maximum}</Typography>
            case 'singleBetMaximumPayout':
                return <Typography>{singleBetSettings.maxPayout}</Typography>
            default:
                return <></>
        }
    }

    const renderInputHeader = (params: GridColumnHeaderParams ) => {
        const handleValueChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
            if (batchUpdate && event.target.value) batchUpdate(params.field, Number(event.target.value));
        }

        return (isMultipleRowsSelected) ? (
            <Stack direction={'column'} py={1} spacing={1} alignItems={'flex-start'}>
                <TextField
                    name={params.field}
                    size={'small'}
                    type={'number'}
                    defaultValue={'0'}
                    label={params.colDef.headerName || params.field}
                    onChange={handleValueChange}
                    onClick={(event) => event.stopPropagation()}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            event.stopPropagation();
                            (event.target as HTMLInputElement).blur();
                        }
                    }}
                />
                <Typography
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '14px',
                    }}
                >
                    {params.colDef.headerName || params.field}
                </Typography>
            </Stack>
        ) : (<DefaultGridHeader params={params} />)
    }

    const renderDropDownHeader = (params: GridColumnHeaderParams) => {
        const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (batchUpdate) batchUpdate(params.field, toUpperCaseWithUnderscore(event.target.value));
        }
        const minWidth = params.colDef.minWidth ? params.colDef.minWidth - 30 : params.colDef.minWidth;

        return (isMultipleRowsSelected) ? (
            <Stack direction={'column'} py={1} spacing={1} alignItems={'flex-start'}>
                <TextField
                    select
                    sx={{ width: '100%', minWidth: minWidth}}
                    InputProps={{style: { fontSize: '13px' }}}
                    size={'small'}
                    name={params.field}
                    defaultValue={'No Limit'}
                    label={params.colDef.headerName || params.field}
                    onChange={handleValueChange}
                    onClick={(event) => event.stopPropagation()}
                >
                    {lineOptions.map((option: string) => (
                        <MenuItem
                            key={option}
                            value={allFirstCharToUpperCase(option)}
                            sx={{ whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '13px' }}
                        >
                            {allFirstCharToUpperCase(option)}
                        </MenuItem>
                    ))}
                </TextField>
                <Typography
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '14px',
                    }}
                >
                    {params.colDef.headerName || params.field}
                </Typography>
            </Stack>
        ) : (<DefaultGridHeader params={params} />)
    }

    const renderSwitchHeader = (params: GridColumnHeaderParams) => {
        const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (batchUpdate) batchUpdate(params.field, event.target.checked);
        }

        return (isMultipleRowsSelected) ? (
            <Stack direction={'column'} py={1} spacing={1} alignItems={'flex-start'}>
                <Switch
                    name={params.field}
                    size={'small'}
                    onChange={handleValueChange}
                />
                <Typography
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '14px',
                    }}
                >
                    {params.colDef.headerName || params.field}
                </Typography>
            </Stack>
        ) : (<DefaultGridHeader params={params} />)
    }

    function DefaultGridHeader({ params }: { params: GridColumnHeaderParams }) {
        return (
            <Box style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    height: '100%',
                }}
            >
                {params.colDef.headerName || params.field}
            </Box>
        );
    }

    return [
        {
            field: 'marketName',
            headerName: intl.formatMessage({ id: `${funType}.marketName`, defaultMessage: 'Market Name'}),
            editable: false,
            sortable: true,
            headerClassName: 'bold-header',
            minWidth: 200,
        },
        {
            field: 'margin',
            headerName: intl.formatMessage({
                id: `${funType}.margin`, defaultMessage: 'Margin'
            }),
            renderHeader: renderInputHeader,
            editable: !viewOnly,
            sortable: true,
            type: 'number',
            align: 'left',
            headerAlign: 'left',
            headerClassName: 'bold-header',
            hideSortIcons: Boolean(isMultipleRowsSelected),
            minWidth: 140,
            valueSetter: (params) => {
                return {...params.row, margin: params.value};
            },
            renderCell: (params) =>
                <Typography>{params.row.margin + '%'}</Typography>
        },
        {
            field: 'minimumDifference',
            headerName: intl.formatMessage({
                id: `${LocalizationFunctionType.Configuration}.minimumDifference`,
                defaultMessage: 'Minimum Difference'
            }),
            renderHeader: renderInputHeader,
            editable: !viewOnly,
            sortable: true,
            type: 'number',
            align: 'left',
            headerAlign: 'left',
            headerClassName: 'bold-header',
            hideSortIcons: Boolean(isMultipleRowsSelected),
            minWidth: 140,
            valueSetter: (params) => {
                return {...params.row, minimumDifference: params.value};
            },
            renderCell: (params) =>
                <Typography>{params.row.minimumDifference + '%'}</Typography>
        },
        {
            field: 'lineSettings',
            headerName: intl.formatMessage({
                id: `${LocalizationFunctionType.Configuration}.lineSettings`,
                defaultMessage: 'line Settings'
            }),
            renderHeader: renderDropDownHeader,
            editable: !viewOnly,
            sortable: true,
            type: 'singleSelect',
            valueOptions: lineOptions.map((option) => allFirstCharToUpperCase(option)),
            headerClassName: 'bold-header',
            hideSortIcons: Boolean(isMultipleRowsSelected),
            minWidth: 150,
            renderCell: (params) =>
                <Typography>{allFirstCharToUpperCase(params.row.lineSettings)}</Typography>
        },
        {
            field: 'singleBetMinimumAmount',
            headerName: intl.formatMessage({
                id: `${LocalizationFunctionType.Template}.singleMinimumAmount`,
                defaultMessage: 'Single Bet Min Amount'
            }),
            renderHeader: renderInputHeader,
            editable: !viewOnly,
            sortable: true,
            type: 'number',
            align: 'left',
            headerAlign: 'left',
            headerClassName: 'bold-header',
            hideSortIcons: Boolean(isMultipleRowsSelected),
            minWidth: 170,
            valueSetter: (params) => {
                const singleBetSettings = params.row.singleBetSettings;
                singleBetSettings.minimum = params.value;
                return {...params.row, singleBetSettings: singleBetSettings};
            },
            valueGetter: (params) => {
                const singleBetSettings = params.row.singleBetSettings;
                return singleBetSettings.minimum
            },
            renderCell: renderSingleBetAmount
        },
        {
            field: 'singleBetMaximumAmount',
            headerName: intl.formatMessage({
                id: `${LocalizationFunctionType.Template}.singleMaximumAmount`,
                defaultMessage: 'Single Bet Max Amount'
            }),
            renderHeader: renderInputHeader,
            editable: !viewOnly,
            sortable: true,
            type: 'number',
            align: 'left',
            headerAlign: 'left',
            headerClassName: 'bold-header',
            hideSortIcons: Boolean(isMultipleRowsSelected),
            minWidth: 170,
            valueSetter: (params) => {
                const singleBetSettings = params.row.singleBetSettings;
                singleBetSettings.maximum = params.value;
                return {...params.row, singleBetSettings: singleBetSettings};
            },
            valueGetter: (params) => {
                const singleBetSettings = params.row.singleBetSettings;
                return singleBetSettings.maximum
            },
            renderCell: renderSingleBetAmount
        },
        {
            field: 'singleBetMaximumPayout',
            headerName: intl.formatMessage({
                id: `${LocalizationFunctionType.Template}.singleMaximumPayoutAmount`,
                defaultMessage: 'Single Bet Max Payout Amount'
            }),
            renderHeader: renderInputHeader,
            editable: !viewOnly,
            sortable: true,
            type: 'number',
            align: 'left',
            headerAlign: 'left',
            headerClassName: 'bold-header',
            hideSortIcons: Boolean(isMultipleRowsSelected),
            minWidth: 170,
            valueSetter: (params) => {
                const singleBetSettings = params.row.singleBetSettings;
                singleBetSettings.maxPayout = params.value;
                return {...params.row, singleBetSettings: singleBetSettings};
            },
            valueGetter: (params) => {
                const singleBetSettings = params.row.singleBetSettings;
                return singleBetSettings.maxPayout
            },
            renderCell: renderSingleBetAmount
        },
        {
            field: 'parlayable',
            headerName: intl.formatMessage({ id: `${funType}.parlay`, defaultMessage: 'Parlay' }),
            renderHeader: renderSwitchHeader,
            editable: !viewOnly,
            sortable: false,
            type: 'boolean',
            headerClassName: 'bold-header',
            hideSortIcons: Boolean(isMultipleRowsSelected),
            minWidth: 120,
            renderCell: (params) => {
                if (viewOnly) {
                    return params.row.parlayable ? 'Enabled' : 'Disabled';
                } else {
                    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
                        const updatedRow = {...params.row, parlayable: event.target.checked};
                        if (processRowUpdate) {
                            processRowUpdate(updatedRow);
                        }
                    };
                    return <Switch checked={params.row.parlayable} onChange={handleToggle} size={'small'}/>
                }
            }
        },
        {
            field: 'sgpable',
            headerName: intl.formatMessage({ id: `${funType}.sgp`, defaultMessage: 'SGP' }),
            renderHeader: renderSwitchHeader,
            editable: !viewOnly,
            sortable: false,
            type: 'boolean',
            headerClassName: 'bold-header',
            hideSortIcons: Boolean(isMultipleRowsSelected),
            minWidth: 120,
            renderCell: (params) => {
                if (viewOnly) {
                    return params.row.sgpable ? 'Enabled' : 'Disabled';
                } else {
                    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
                        const updatedRow = {...params.row, sgpable: event.target.checked};
                        if (processRowUpdate) {
                            processRowUpdate(updatedRow);
                        }
                    };
                    return <Switch checked={params.row.sgpable} onChange={handleToggle} size={'small'}/>
                }
            }
        }
    ]
}

export const pinColumns = {
    left: [
        GRID_CHECKBOX_SELECTION_COL_DEF.field,
        'marketName',
    ],
    right: []
}