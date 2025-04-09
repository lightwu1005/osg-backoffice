import {Box, Grid, TableRow} from "@mui/material";
import React from "react";
import {BetModel, ConfigurationModel, OddModel} from "@/services/@core/module/ResponseDataModels";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import {OddBaseLinePriceProps, OddsBaseLinePrice} from "@/modules/components/NumberModifier/OddsBaseLinePrice";
import IdentityHandler from "@/modules/common/IdentityHandler";
import {
    getFractionLineDisplay,
    getIncrementByRuleNumber,
    getRuleNumber
} from "@/modules/components/eventTable/EventDataConverter";

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        color: 'text.primary',
        backgroundColor: '#F0F4F8',
        border: '1px solid #F0F4F8',
        '[data-mui-color-scheme="dark"] &': {
            backgroundColor: '#0A2744',
            border: '1px solid #0A2744',
        },
        fontSize: 14,
        textAlign: 'center',

    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        border: '1px solid #636B7429',
        '[data-mui-color-scheme="dark"] &': {
            border: '1px solid #636B7450'
        },
    },
}));

const StyledTable = styled(Table)(() => ({
    borderCollapse: 'collapse',
}));

export interface OddsAdjustmentTableProps {
    marketName: string
    odds: OddModel[]
    configuration?: ConfigurationModel
    handlePriceChanged: (betId: string, price: number, originalPrice: number) => void
    viewOnly?: boolean
}

const RowElements = ({betNames, marketName, betMap, configuration, handlePriceChanged, viewOnly}: {
    betNames: string[], marketName: string, betMap: Map<string, Map<string, BetModel[]>>,
    configuration?: ConfigurationModel,
    handlePriceChanged?: (betId: string, price: number, originalPrice: number) => void,
    viewOnly?: boolean
}) => {

    // Calculate the maximum length of the values arrays in the betMap
    let maxLength = 0;
    let lines: string[] = [];
    betMap.forEach(lineMap => {
        lines = Array.from(lineMap?.keys() ?? []);
        if (lines.length > maxLength) {
            maxLength = lines.length;
        }
    });

    const {oddsDisplay} = IdentityHandler();
    const elements = [];
    for (let i = 0; i < maxLength; i++) {
        const handicapLineDisplay = getFractionLineDisplay(lines[i])
        const oddsElements = betNames.map((name) => {
            const lineMap = betMap.get(name);
            if (!lineMap) return null;

            const bets = lineMap?.get(lines[i]); // Get the index of each line bets
            const odds = bets?.map<OddBaseLinePriceProps>((bet, index) => {
                const point = getRuleNumber(Number(bet?.price), configuration)
                return {
                    base: '',
                    price: bet?.price?.toString(),
                    point: point,
                    quantity: getIncrementByRuleNumber(point ?? 0, configuration),
                    betStatus: bet?.betStatus,
                    onValueChange: (value: number) => {
                        if (handlePriceChanged)
                            handlePriceChanged(bet.betId, value, bet ? bet.price : 0);
                    }
                }
            });

            return (
                <React.Fragment key={name}>
                    <StyledTableCell>
                        {(odds && odds.length > 0) ?
                            <OddsBaseLinePrice odds={odds} displayType={oddsDisplay} isWidthFixed={false}
                                               viewOnly={viewOnly}/> :
                            <Box/>}
                    </StyledTableCell>
                </React.Fragment>
            )
        });
        if (oddsElements.some(e => e !== null)) {
             elements.push(
                <TableRow key={`row-${i}`}>
                    <StyledTableCell colSpan={1} align={"center"}>
                        {handicapLineDisplay}
                    </StyledTableCell>
                    {oddsElements}
                </TableRow>
            )
        }
    }

    return <>{elements}</>;
}

const OddsAdjustmentTable = ({marketName, odds, configuration, handlePriceChanged, viewOnly}: OddsAdjustmentTableProps) => {
    const betMap = new Map<string, Map<string, BetModel[]>>();

    odds.forEach(market => {
        market.bets.forEach(bet => {
            if (!betMap.has(bet.betName)) {
                betMap.set(bet.betName, new Map<string, BetModel[]>());
            }
            const lineMap = betMap.get(bet.betName)!;
            if (!lineMap.has(market.baseLine ?? '')) {
                lineMap.set(market.baseLine ?? '', []);
            }
            lineMap.get(market.baseLine ?? '')!.push(bet);
        });
    });

    const combinedBetNames = Array.from(betMap.keys());

    return (
        <Box data-testid='odds-adjustment-table' width='100%'>
            <Grid container spacing={6}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TableContainer>
                        <StyledTable aria-label="odds-adjustment-table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell colSpan={combinedBetNames.length + 1}
                                                     style={{textAlign: 'center', fontWeight: 'bold'}}>
                                        {marketName}
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <StyledTableCell colSpan={1} align={"center"} />
                                    {
                                        combinedBetNames.map((name) =>
                                            <StyledTableCell key={`row-head-${name}`} colSpan={1} align={"center"}>
                                                {name}
                                            </StyledTableCell>
                                        )
                                    }
                                </TableRow>
                                <RowElements betNames={combinedBetNames} betMap={betMap} marketName={marketName} configuration={configuration}
                                             handlePriceChanged={handlePriceChanged} viewOnly={viewOnly}/>
                            </TableBody>
                        </StyledTable>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    );
}

export default OddsAdjustmentTable