import {ActionProps} from "@/modules/components/dialog/AlertDialog";
import {GridColDef} from "@mui/x-data-grid";
import React, {useState} from "react";
import {GridPaginationModel} from "@mui/x-data-grid-pro";
import {Box} from "@mui/material";
import CommonTable from "@/modules/components/eventTable/CommonTable";
import {rowsPerPageOptions} from "@/app/template/components/columns";
import {MarketTableColumns} from "@/app/eventDetail/components/MarketsTableDialog";
import {MarketConfigModel} from "@/services/@core/module/ResponseDataModels";
import MarketConfigForm from "@/app/template/components/marketConfigForm/MarketConfigForm";

export interface ContentTableProps {
    title: string;
    rows?: Array<{ id: string; name: string }>
    markets?: MarketConfigModel[]
    actions: ActionProps[]
    columns?: GridColDef[]
}


export const ContentTable = (props: ContentTableProps) => {
    const {rows, markets, columns = MarketTableColumns} = props
    const isMarket = markets !== undefined
    const [pageModel, setPageModel] = useState<GridPaginationModel>({
        page: 1,
        pageSize: 10
    })

    return (
        <Box width="100%">
            {isMarket ?
                (
                    <MarketConfigForm rows={markets}
                                      processRowUpdate={() => {}}
                                      toolbarEnabled={false}
                                      checkboxSelection={false}
                                      viewOnly
                    />
                ) :
                (<CommonTable
                    columns={columns}
                    rows={(rows ?? []).slice((pageModel.page - 1) * pageModel.pageSize, pageModel.page * pageModel.pageSize)}
                    rowCount={(rows ?? []).length}
                    pageSizeOptions={rowsPerPageOptions}
                    pageModel={pageModel}
                    setPageModel={setPageModel}
                    isLoading={false}
                    sortingMode={'client'}
                />)
            }
        </Box>
    )
}