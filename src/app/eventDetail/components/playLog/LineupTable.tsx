import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import {PenaltyIcon} from "@/app/eventDetail/components/playLog/PenaltyIcon";
import {Stack, TableRow} from "@mui/material";
import {LineupCards, TeamLineupsInfo} from "@/services/@core/module/ResponseDataModels";
import {useIntl} from "react-intl";
import { LocalizationFunctionType } from '@/localizedConfig/LanguageContext';

const StyledTableCell = styled(TableCell)(({ type } : {type?: Type}) => ({
    [`&.${tableCellClasses.head}`]: {
        color: 'text.primary',
        backgroundColor: type === 'home' ? '#EDF5FD': '#FEF6F6',
        '[data-mui-color-scheme="dark"] &': {
            backgroundColor: type === 'home' ? '#0A2744': '#430A0A',
        },
        fontSize: 14,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export type Type = 'home' | 'away';

export interface LineupTableProps {
    type?: Type
    players: TeamLineupsInfo[]
    substitutes: TeamLineupsInfo[]
}

const buildCardSection = (cards?: LineupCards) => {
    const redCards = Array.from({ length: cards?.red ?? 0 }).map((value) => (
        <PenaltyIcon key={`starting-red-${value}`} type="red" />
    ));

    const yellowCards = Array.from({ length: cards?.yellow ?? 0 }).map((value) => (
        <PenaltyIcon key={`starting-yellow-${value}`} type="yellow" />
    ));

    return (
        <>
            {redCards}
            {yellowCards}
        </>
    );
}

const RowElements = ({players, substitutes}: {players: TeamLineupsInfo[], substitutes: TeamLineupsInfo[]}) => {
    let maxLength = Math.max(players.length, substitutes.length);
    const elements = [];

    for (let i = 0; i < maxLength; i++) {
        elements.push(
            <TableRow key={i}>
                <StyledTableCell>{players[i]?.jerseyNumber}</StyledTableCell>
                <StyledTableCell>
                    <Stack direction={'row'} gap={1}>
                        {
                            players[i]?.name
                        }
                        {
                            players[i]?.cards && buildCardSection(players[i]?.cards)
                        }
                    </Stack>
                </StyledTableCell>
                <StyledTableCell>{substitutes[i]?.jerseyNumber}</StyledTableCell>
                <StyledTableCell>
                    <Stack direction={'row'} gap={1}>
                        {
                            substitutes[i]?.name
                        }
                        {
                            substitutes[i]?.cards && buildCardSection(substitutes[i]?.cards)
                        }
                    </Stack>
                </StyledTableCell>
            </TableRow>
        );
    }

    return <>{elements}</>;
}
const LineupTable: React.FC<LineupTableProps> = ({ type, players, substitutes }: LineupTableProps) => {
    const intl = useIntl();
    const funcType = LocalizationFunctionType.Event;
    const funcCommonType = LocalizationFunctionType.Common;
    return (
        <TableContainer>
            <Table aria-label="starting table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell type={type} colSpan={2}>
                            {
                                intl.formatMessage({
                                    id: `${funcType}.starting`, defaultMessage: 'Starting' })
                            }
                        </StyledTableCell>
                        <StyledTableCell type={type} colSpan={2}>
                            {
                                intl.formatMessage({
                                    id: `${funcType}.substitutes`, defaultMessage: 'Substitutes' })
                            }
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <RowElements players={players} substitutes={substitutes}/>
                </TableBody>
                {
                    players.length === 0 && substitutes.length === 0 &&
                    <caption>
                        {
                            intl.formatMessage({
                                id: `${funcCommonType}.noData`, defaultMessage: 'No Data' })
                        }
                    </caption>
                }
            </Table>
        </TableContainer>
    );
}

export default LineupTable