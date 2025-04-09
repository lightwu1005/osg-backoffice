import {marketConfigColumns, pinColumns} from "@/app/template/components/marketConfigForm/marketConfigColumns";
import {useIntl} from "react-intl";
import {
    DataGridPro,
    GridRowModel,
    GridToolbarQuickFilter,
    GridRowId
} from "@mui/x-data-grid-pro";
import {Box} from "@mui/material";
import * as React from "react";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {MarketConfigModel} from "@/services/@core/module/ResponseDataModels";
import lodash from "lodash";

/**
 * @param rows To display the data in the table
 * @param processRowUpdate To handle the row update
 * @param onProcessRowUpdateError To handle the error when updating the row
 * @param toolbarEnabled To enable the toolbar, default is true
 * @param checkboxSelection To enable the checkbox selection, default is true
 * @param viewOnly To enable the view only mode, default is false
 */

export interface MarketConfigFormProps {
    rows: MarketConfigModel[];
    processRowUpdate: (update: GridRowModel) => void;
    onProcessRowUpdateError?: (error: any) => void;
    toolbarEnabled?: boolean;
    checkboxSelection?: boolean;
    viewOnly?: boolean;
}

const QuickSearchToolBar = () => {
    return (
        <Box sx={{p: 0.5, pb: 0,}}>
            <GridToolbarQuickFilter
                quickFilterParser={(searchInput: string) =>
                    searchInput
                        .split(',')
                        .map((value) => value.trim())
                        .filter((value) => value !== '')
                }
                debounceMs={200}
            />
        </Box>
    );
}


const MarketConfigForm = (props: MarketConfigFormProps) => {
    const {
        rows, processRowUpdate, onProcessRowUpdateError,
        toolbarEnabled = true,
        checkboxSelection = true,
        viewOnly = false
    } = props;
    const intl = useIntl();
    const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowId[]>([]);
    const isMultipleRowsSelected = Boolean(rowSelectionModel?.length && rowSelectionModel.length > 1);

    const handleBatchUpdate = (field: string, value: number | string | boolean) => {
        rowSelectionModel?.forEach((rowId) => {
            const row = rows.find((row) => row.marketId === rowId);
            if (row) {
                if (field.includes('singleBet')) {
                    const singleBetSettings = { ...row.singleBetSettings };
                    switch (field) {
                        case 'singleBetMinimumAmount':
                            singleBetSettings.minimum = Number(value);
                            break;
                        case 'singleBetMaximumAmount':
                            singleBetSettings.maximum = Number(value);
                            break;
                        case 'singleBetMaximumPayout':
                            singleBetSettings.maxPayout = Number(value);
                            break;
                        default:
                            return;
                    }
                    if (processRowUpdate) {
                        processRowUpdate({marketId: rowId, singleBetSettings});
                    }
                } else {
                    if (processRowUpdate) {
                        processRowUpdate({marketId: rowId, [field]: value});
                    }
                }
            }
        })
    }

    const columns = marketConfigColumns(intl, LocalizationFunctionType.Template, viewOnly, processRowUpdate, handleBatchUpdate,
        rowSelectionModel);

    return (
        <DataGridPro
            sx={{ minHeight: 150 }}
            columns={columns}
            rows={lodash.sortBy(rows, ['marketId'])}
            getRowId={(row) => row.marketId}
            hideFooter
            checkboxSelection={viewOnly ? false : checkboxSelection}
            disableRowSelectionOnClick
            processRowUpdate={(update) => {
                if (processRowUpdate) {
                    processRowUpdate(update);
                }
                return update
            }}
            {...(isMultipleRowsSelected ? {columnHeaderHeight: 100} : undefined)}
            onProcessRowUpdateError={onProcessRowUpdateError}
            disableColumnMenu={isMultipleRowsSelected}
            sortingMode={'client'}
            rowSelectionModel={rowSelectionModel}
            onRowSelectionModelChange={setRowSelectionModel}
            slots={{toolbar: toolbarEnabled ? QuickSearchToolBar : null}}
            localeText={{
                noRowsLabel: intl.formatMessage({
                    id: `${LocalizationFunctionType.Common}.noData`,
                    defaultMessage: 'No Data'
                }),
            }}
            initialState={{pinnedColumns: pinColumns}}
        />
    )
}

export default MarketConfigForm;