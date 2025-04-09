import {GridColDef} from "@mui/x-data-grid-pro";
import {Typography} from "@mui/material";
import {transformedPrice} from "@/modules/components/eventTable/EventDataConverter";

export function PlaceBetColumns(
    oddsDisplay?: string,
    market: string = ''
): GridColDef[] {
    return [
        {
            field: 'partNo',
            headerName: 'Leg No.',
            headerClassName: 'bold-header',
            width: 175
        },
        {
            field: 'eventId',
            headerName: 'Event ID',
            headerClassName: 'bold-header',
            width: 175
        },
        {
            field: 'oddsId',
            headerName: 'Bet ID',
            headerClassName: 'bold-header',
            width: 175
        },
        {
            field: 'oddsType',
            headerName: 'Event Type',
            headerClassName: 'bold-header',
            width: 175
        },
        {
            field: 'line',
            headerName: 'Line',
            headerClassName: 'bold-header',
            width: 175
        },
        {
            field: 'odds',
            headerName: 'Odds Price',
            headerClassName: 'bold-header',
            width: 175,
            renderCell: (params) => {
                return (
                    <Typography>
                        {transformedPrice(Number(params.value), 4, oddsDisplay ?? 'Decimal', market)}
                    </Typography>
                )
            }
        },
    ]
}