"use client"
import {GridColDef} from '@mui/x-data-grid'
import '@/modules/components/eventTable/event.columns.css'
import {allFirstCharToUpperCase} from "@/modules/common/DisplayFormatConverter"
import {IntlShape} from "react-intl"

export enum ActivatingListStatus {
    sport = 'sport',
    league = 'league',
    market = 'market'
}

export function columns(intl: IntlShape, funType: string, status: string): GridColDef[] {

    if (status.toLowerCase() === ActivatingListStatus.market) {
        const MarketCols = [
            { field: 'itemName', headerName: intl.formatMessage({id: `dashboard.odds.marketName`, defaultMessage: 'Market Name'}), flex: 1.5, sortable: true },
            { field: 'margin', headerName: intl.formatMessage({id: `${funType}.margin`, defaultMessage: 'Margin'}), flex: 1, sortable: false },
            { field: 'minimumDifference', headerName: intl.formatMessage({id: `configuration.minimumDifference`, defaultMessage: 'Minimum Difference'}), flex: 1, sortable: false },
            { field: 'lineSettings', headerName: intl.formatMessage({id: `${funType}.lineSetting`, defaultMessage: 'Line Settings'}), flex: 1, sortable: false }
        ]

        const columnDefinitions: GridColDef[] = [];

        for (let col of MarketCols) {
            const colDef: GridColDef = {
                field: col.field,
                headerName: col.headerName,
                headerClassName: 'bold-header',
                flex: col.flex,
                sortable: col.sortable
            }

            if (col.field === 'margin' || col.field === 'minimumDifference') {
                colDef.renderCell =  (params) => {
                    return `${params.value}%`
                }
            }

            if (col.field === 'lineSettings') {
                colDef.renderCell = (params) => {
                    return `${allFirstCharToUpperCase(params.value)}`
                }
            }

            columnDefinitions.push(colDef);
        }

        return columnDefinitions
    } else if (status.toLowerCase() === ActivatingListStatus.league) {
        return [
            { field: 'itemName', headerName: intl.formatMessage({id: `${funType}.league`, defaultMessage: 'League'}), flex: 1 },
        ]
    } else {
        return []
    }
}

export const rowsPerPageOptions = [10, 15, 20, 30, 50]
export const checkboxSelection = false
export const disableSelectionOnClick = true