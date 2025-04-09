import {
    DataGridPro,
    GridRowParams,
    GridColDef,
    GridRowsProp,
    GridRowId, GridPaginationModel, MuiEvent
} from "@mui/x-data-grid-pro";
import React, {useCallback} from "react";
import {Box} from "@mui/material";
import {checkboxSelection, disableSelectionOnClick, rowsPerPageOptions} from "@/app/testPlaceBet/components/columns";
import {GridCellParams} from "@mui/x-data-grid";
import {OddsLinePriceProps} from "@/app/testPlaceBet/components/otherLineColumns";
import {ConfigurationModel, OddDataModel} from "@/services/@core/module/ResponseDataModels";
import {BetPartData} from "@/app/testPlaceBet/models/TestPlaceBetParameters";
import {GridApiPro} from "@mui/x-data-grid-pro/models/gridApiPro";
import OtherLineTable from "@/app/testPlaceBet/components/OtherLineTable";

export interface PanelTableProps {
    isLoading: boolean;
    sportType: string;
    columns: GridColDef[];
    rows: GridRowsProp;
    selectingOdds: BetPartData[];
    rowCount: number;
    eventType: string;
    configuration?: ConfigurationModel;
    pageModel: GridPaginationModel;
    setPageModel: React.Dispatch<React.SetStateAction<GridPaginationModel>>;
    onOddsClick?: (props: OddsLinePriceProps) => void;
    dataGridRef?: React.MutableRefObject<GridApiPro>;
}

const PanelTable: React.FC<PanelTableProps> = (
    {
        isLoading,
        sportType,
        columns,
        rows,
        selectingOdds,
        rowCount,
        eventType,
        configuration,
        pageModel,
        setPageModel,
        onOddsClick,
        dataGridRef,
    }) => {
    const isBasketball = sportType.toLowerCase() === 'basketball';
    const handicapTitle = isBasketball ? 'Point Spread' : 'Asian Handicap';
    const underOverTitle = isBasketball ? 'Total Points Over / Under' : 'Total Goals Over / Under';

    const onPaginationChange = (newModel: GridPaginationModel) => {
        setPageModel({
            ...newModel,
            page: newModel.page + 1
        });
    }

    const toggleDetailPanel = (id: GridRowId) => {
        dataGridRef?.current.toggleDetailPanel(id);
    };

    const getDetailPanelContent = useCallback(({ row, id, columns }: GridRowParams) => {
        const oddsData = row?.oddsData.filter((item: OddDataModel) => (item.marketType.toLowerCase() === handicapTitle.toLowerCase() || item.marketType.toLowerCase() === underOverTitle.toLowerCase())) ?? [];
        const maxOddsLength = Math.max(...oddsData.map((item: any) => item.odds?.length));
        if (maxOddsLength <= 1) return
        return (
            <Box sx={{width: '100%'}}>
                <OtherLineTable
                    row={row}
                    id={id}
                    columns={columns}
                    eventType={eventType}
                    sportType={sportType}
                    selectingOdds={selectingOdds}
                    configuration={configuration}
                    onOddsClick={onOddsClick}
                />
            </Box>
        )
    }, [selectingOdds, onOddsClick, configuration, rows]);

    const getDetailPanelHeight = useCallback(({row}: GridRowParams) => {
        const oddsData = row?.oddsData.filter((item: any) => (item.marketType.toLowerCase() === handicapTitle.toLowerCase() || item.marketType.toLowerCase() === underOverTitle.toLowerCase())) ?? [];
        const maxOddsLength = Math.max(...oddsData.map((item: any) => item.odds?.length));
        return 56 * maxOddsLength;
    }, []);

    const handleCellOnClick = (params: GridCellParams, event: MuiEvent<React.MouseEvent>) => {
        switch (params.field) {
            case '1X2':
            case '12':
                break;
            case 'OU':
            case 'AH': {
                const innerText = (event.target as HTMLElement).innerText;
                const regex = new RegExp(/\(\+\d+\)/);
                if (params.row.id && regex.test(innerText)) {
                    toggleDetailPanel(params.row.id);
                }
            }
                break;
            default:
                break;

        }
    }

    return (
        <div>
            <DataGridPro
                autoHeight
                loading={isLoading}
                columns={columns}
                rows={rows}
                rowCount={rowCount}
                rowThreshold={0}
                paginationMode='server'
                pagination
                paginationModel={{
                    ...pageModel,
                    page: pageModel.page - 1
                }}
                checkboxSelection={checkboxSelection}
                disableRowSelectionOnClick={disableSelectionOnClick}
                pageSizeOptions={rowsPerPageOptions}
                getDetailPanelContent={getDetailPanelContent}
                getDetailPanelHeight={getDetailPanelHeight}
                onPaginationModelChange={onPaginationChange}
                onCellClick={handleCellOnClick}
                apiRef={dataGridRef}
                localeText={{
                    noRowsLabel: 'No Data'
                }}
                getRowHeight={(params) => 56}
            />
        </div>
    )
}

export default PanelTable;