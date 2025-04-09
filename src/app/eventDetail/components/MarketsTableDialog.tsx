import React from "react";
import AlertDialog from "@/modules/components/dialog/AlertDialog";
import ToggleProps from "@/modules/interface/ToggleProps";
import {GridColDef} from "@mui/x-data-grid";
import {ContentTable, ContentTableProps} from "@/modules/common/ContentTable";

export const MarketTableColumns: GridColDef[] = [
    {field: 'name', headerName: 'Market Type', flex: 1},
];

export const LeagueTableColumns: GridColDef[] = [
    {field: 'name', headerName: 'League', flex: 1},
];

const MarketsAlertDialog = (props: ContentTableProps & ToggleProps) => {
    const {open, setOpen, title, actions} = props

    return (
        <AlertDialog
            title={title}
            titleAlignment={"left"}
            buttonsAlignment={"right"}
            buttonWidth={100}
            content={ContentTable(props)}
            actions={actions}
            open={open}
            setOpen={setOpen}
        />
    )
}

const MemoizedMarketsAlertDialog = React.memo(MarketsAlertDialog)
MemoizedMarketsAlertDialog.displayName = 'MarketsAlertDialog'

export default MemoizedMarketsAlertDialog