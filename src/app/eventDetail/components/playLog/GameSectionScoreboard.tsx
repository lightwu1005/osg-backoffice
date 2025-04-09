import React, {useEffect, useState} from "react"
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material'
import {styled} from "@mui/material/styles";

const DarkGrayText = styled(Typography)(() => ({
    color: '#9FA6AD',
    '[data-mui-color-scheme="dark"] &': {
        color: '#636B74',
    },
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '700',
    wordWrap: 'break-word'
}))

const DartText = styled(Typography)(() => ({
    color: 'text.secondary',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '700',
    wordWrap: 'break-word'
}))

export interface PeriodScore {
    name: string
    home: string
    away: string
    sequence: number
}

export interface GameSectionScoreboardProps {
    homeName: string
    awayName: string
    periods: PeriodScore[]
}

interface GameRowProps {
    homePeriodScores: string[];
    awayPeriodScores: string[];
}

const StyledTableRow = styled(TableRow)({
    height: 30,
});

const StyledTableCell = styled(TableCell)({
    padding: "0px 1rem",
});

const GameSectionScoreboard = React.memo(({homeName = "H", awayName = "A", periods}: GameSectionScoreboardProps) => {
    const [periodHeader, setPeriodHeader] = useState<string[]>([])
    const [periodBody, setPeriodBody] = useState<GameRowProps>({
        homePeriodScores: [],
        awayPeriodScores: [],
    })

    useEffect(() => {
        const titles: string[] = [' ']
        const homeScores: string[] = [homeName]
        const awayScores: string[] = [awayName]

        periods.forEach((period) => {
            titles.push(period.name)
            homeScores.push(period.home === "" ? "-" : period.home)
            awayScores.push(period.away === "" ? "-" : period.away)
        })

        setPeriodHeader(titles)
        setPeriodBody({ homePeriodScores: homeScores, awayPeriodScores: awayScores })
    }, [periods])

    const GameSectionHeader = () => {
        return (
            <TableHead>
                <StyledTableRow>
                    {periodHeader.map((header, index) => (
                        <StyledTableCell key={index} align={index === 0 ? "inherit" : "center"} sx={{ borderBottom: "none" }}>
                            <DarkGrayText>{header}</DarkGrayText>
                        </StyledTableCell>
                    ))}
                </StyledTableRow>
            </TableHead>
        )
    }

    const GameSectionBody = () => {
        return (
            <TableBody>
                <StyledTableRow>
                    {periodBody.homePeriodScores.map((body, index) => (
                        <StyledTableCell key={`${periodBody.homePeriodScores[0]}-${index}`} align={index === 0 ? "inherit" : "center"} sx={{ borderBottom: "none" }}>
                            {body === "-" || index === 0
                                ? <DarkGrayText>{body}</DarkGrayText>
                                : <DartText>{body}</DartText>
                            }
                        </StyledTableCell>
                    ))}
                </StyledTableRow>
                <StyledTableRow>
                    {periodBody.awayPeriodScores.map((body, index) => (
                        <StyledTableCell key={`${periodBody.awayPeriodScores[0]}-${index}`} align={index === 0 ? "inherit" : "center"} sx={{ borderBottom: "none" }}>
                            {body === "-" || index === 0
                                ? <DarkGrayText>{body}</DarkGrayText>
                                : <DartText>{body}</DartText>
                            }
                        </StyledTableCell>
                    ))}
                </StyledTableRow>
            </TableBody>
        )
    }

    return (
        <TableContainer sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%'}}>
            <Table sx={{ width: 'auto', maxWidth: '100%', minWidth: '450px'}}>
                <GameSectionHeader/>
                <GameSectionBody/>
            </Table>
        </TableContainer>
    )
})

GameSectionScoreboard.displayName = "GameSectionScoreboard"
export default GameSectionScoreboard
