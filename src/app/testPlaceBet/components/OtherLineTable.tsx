import {DataGridPro, GridColDef, useGridApiRef} from "@mui/x-data-grid-pro";
import {
    BetModel,
    ConfigurationModel,
    EventDataModel,
    OddDataModel,
    OddModel
} from "@/services/@core/module/ResponseDataModels";
import {Box} from "@mui/material";
import {OddsLinePriceProps, otherLineColumns} from "@/app/testPlaceBet/components/otherLineColumns";
import React, {useCallback, useEffect} from "react";
import {GridRowId} from "@mui/x-data-grid";
import {BetPartData} from "@/app/testPlaceBet/models/TestPlaceBetParameters";
import {EventType} from "@/services/@core/module/Enum";
import useOddsSubscription, {
    SubscriptionBetModel,
    SubscriptionOddsModel
} from "@/services/@odds/socket/events/OddsSubscriptionProvider";

export interface OtherLineTableProps {
    row: any;
    id: GridRowId;
    columns: GridColDef[];
    eventType: string;
    sportType: string;
    selectingOdds: BetPartData[];
    configuration?: ConfigurationModel;
    onOddsClick?: (props: OddsLinePriceProps) => void;
}

const OtherLineTable: React.FC<OtherLineTableProps> = (
    {
        row,
        columns,
        eventType,
        sportType,
        selectingOdds,
        configuration,
        onOddsClick,
    }) => {
    const isBasketball = sportType.toLowerCase() === 'basketball';
    const handicapTitle = isBasketball
        ? 'Point Spread'
        : eventType === EventType.inPlay
            ? 'Rest of Match Asian Handicap'
            : 'Asian Handicap';
    const underOverTitle = isBasketball ? 'Total Points Over / Under' : 'Total Goals Over / Under';
    const dangerBallState = row?.dangerBallState;
    const eventStatus = row?.eventSuspendedStatus;
    const oddsData = row?.oddsData.filter((item: OddDataModel) => (item.marketType.toLowerCase() === handicapTitle.toLowerCase() || item.marketType.toLowerCase() === underOverTitle.toLowerCase())) ?? [];
    const maxOddsLength = Math.max(...oddsData.map((item: any) => item.odds?.length));

    const targetColumns = columns.filter((item: GridColDef) => item.field === 'OU' || item.field === 'AH');
    const columnWidth = targetColumns.reduce((sum, item) => sum + (item.minWidth ?? 400), 0);
    const rowsData = [];
    for (let i = 1; i < maxOddsLength; i++) {
        const entry: Record<string, any> = {};
        const marketStatus: string[] = []
        oddsData.forEach((item: OddDataModel) => {
            entry[item.marketType] = item.odds?.[i];
            if (item.marketSuspendedStatus && item.marketSuspendedStatus !== 'ACTIVE') {
                marketStatus.push(item.marketType)
            }
        });
        entry['id'] = 'row-' + i;
        entry['eventId'] = row.eventId;
        entry['dangerBallState'] = dangerBallState;
        entry['eventSuspendedStatus'] = eventStatus;
        entry['marketSuspendedStatus'] = marketStatus;
        rowsData.push(entry);
    }

    const {add, remove, odds} = useOddsSubscription();
    const gridRef = useGridApiRef();

    const onSubscriptCallBack = useCallback((oddsModels: SubscriptionOddsModel[]) => {

        const oddsMap = new Map(oddsModels.map(odds => [odds.eventId, odds]))
        const updateBets = (odd: OddModel, newOdds: SubscriptionOddsModel) => {
            let foundTarget = false
            odd.bets = odd.bets.map(bet => {
                const target = findTargetBet(bet.betId, newOdds.bets);
                if (updateBetPrice(bet, target)) {
                    foundTarget = true;
                }
                return bet;
            });
            if (foundTarget) {
                odd.baseLine = newOdds.baseLine;
            }
            return foundTarget
        }

        const findTargetBet = (betId: string, bets?: SubscriptionBetModel[]) => {
            return bets?.find((newBet: SubscriptionBetModel) => newBet.betId === betId);
        };

        const updateBetPrice = (bet: BetModel, target?: SubscriptionBetModel | null) => {
            if (target?.price) {
                bet.price = target.price;
                return true;
            }
            return false;
        };

        const updateOdds = (newOdds: SubscriptionOddsModel, odds?: OddDataModel[]) => {
            return odds?.some(data => {
                if (data.marketId !== newOdds.marketId) return false
                return data.odds?.some(odd => updateBets(odd, newOdds))
            })
        }
        const modifyPrice = (events: EventDataModel[]) => {
            return events.some(event => {
                const newOdds = oddsMap.get(event.eventId)
                if (!newOdds) return false
                return updateOdds(newOdds, event.oddsData)
            })
        }

        if (row.oddsData) {
            if (modifyPrice(row?.oddsData)) {
                const updateRows = [...Array.from(new Set(oddsModels.map(odds => odds.eventId)))]
                    .filter(eventId => !!gridRef.current.getRow(eventId))
                    .map(eventId => ({id: eventId}))
                if (updateRows.length > 0) {
                    gridRef.current.updateRows(updateRows)
                }
            }
        }

    }, [row?.oddsData, gridRef])

    useEffect(() => {
        if (odds.length > 0) {
            onSubscriptCallBack(odds)
        }
    }, [odds]);

    useEffect(() => {
        if (!row) return
        const displayIds = [row.eventId]
        const marketIds = row.oddsData.map((item: OddDataModel) => item.marketId) ?? []
        if (displayIds) {
            add(displayIds, marketIds, eventType)
        }
        return () => {
            remove(displayIds, marketIds, eventType)
        }
    }, [row.eventId])

    if (maxOddsLength > 1) {
        return (
            <Box key={row.id} ml={100} width={columnWidth + 2}>
                <DataGridPro
                    apiRef={gridRef}
                    columns={otherLineColumns(targetColumns, selectingOdds, eventType, sportType, configuration, onOddsClick)}
                    rows={rowsData}
                    getRowId={(row) => row.id}
                    columnHeaderHeight={0}
                    disableRowSelectionOnClick={true}
                    getRowHeight={(params) => 56}
                    hideFooter={true}
                    disableColumnMenu={true}
                    disableColumnFilter={true}
                    disableMultipleRowSelection={true}
                    localeText={{
                        noRowsLabel: 'No Data'
                    }}
                />
            </Box>
        );
    } else return
}

export default OtherLineTable;