import ToggleProps from "@/modules/interface/ToggleProps";
import {
    Accordion, AccordionActions,
    AccordionDetails,
    Box,
    Button,
    Grid, TextField,
    Typography
} from "@mui/material";
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import {InfoSelectComponent} from "@/modules/components/TextField";
import React, {memo, useCallback, useMemo, useState} from "react";
import {PlaceBetData, TestPunterData} from "@/app/testPlaceBet/domain/useTestPlaceBetViewModel";
import {FullScreenDialog} from "@/modules/components/dialog/FullScreenDialog";
import {DataGridPro} from "@mui/x-data-grid-pro";
import {PlaceBetColumns} from "@/app/testPlaceBet/components/PlaceBetColumns";
import {ArrowForwardIosSharp} from '@mui/icons-material';
import {styled} from "@mui/material/styles";
import IdentityHandler from "@/modules/common/IdentityHandler";

export interface PlaceBetBoxProps extends ToggleProps{
    punterData: TestPunterData[];
    placeBetData: PlaceBetData[];
    handlePunterChange:(account: string)=> void;
    handlePlaceBet: (data: PlaceBetData)=> void;
    handleClearBet: (clearType: string)=> void;
}

export interface BetPartCardProps {
    betData: PlaceBetData;
    index: number;
    handlePlaceBet: (data: PlaceBetData)=> void;
    handleClearBet: (clearType: string)=> void;
}

export default function PlaceBetFormDialog(props: PlaceBetBoxProps) {
    const {open, setOpen} = props
    return <FullScreenDialog
        open={open}
        setOpen={setOpen}
        content={
            <PlaceBetBox {...props} />
        }
    />
}

export const BetPartCard = memo((props: BetPartCardProps) => {
    const {betData, index, handlePlaceBet} = props
    const {oddsDisplay} = IdentityHandler();
    const [betAmount, setBetAmount] = useState<number>(betData.stack >= 0 ? betData.stack : 0);
    const [expanded, setExpanded] = useState<boolean>(true);

    const AccordionSummary = styled((props: AccordionSummaryProps) => (
        <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharp sx={{ fontSize: '0.9rem' }} />}
            {...props}
        />
    ))(({ theme }) => ({
        backgroundColor:
            theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, .05)'
                : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
    }));

    const handleBetAmountChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        event.stopPropagation();
        setBetAmount(Number(event.target.value));
    }, [setBetAmount]);

    const handleAccordionChange = useCallback((event: React.SyntheticEvent, isExpanded: boolean) => {
        if (event.target instanceof HTMLElement && event.target.tagName !== 'INPUT' && event.target.tagName !== 'BUTTON') {
            setExpanded(isExpanded);
        } else {
            event.stopPropagation();
        }
    }, []);

    const MemoizedAmountInput = useMemo(() => {
        const BetAmountInput = ({ amount, onAmountChange }: {amount: number, onAmountChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> void}) => {
            return (
                <TextField
                    sx={{width: '30%'}}
                    value={amount}
                    type={'number'}
                    onMouseDown={(e) => e.stopPropagation()}
                    onChange={(e) => onAmountChange(e)}
                />
            );
        };

        BetAmountInput.displayName = 'BetAmountInput';

        return BetAmountInput;
    }, [])

    const MemoizedTable = useMemo(() => {
        const GridTable = ({oddsDisplay, market}: {oddsDisplay: string, market?: string}) => {
            return (
                <DataGridPro
                    columns={PlaceBetColumns(oddsDisplay, market)}
                    rows={betData.parts}
                    getRowId={(row) => row.partNo + ' - ' + row.eventId}
                    disableRowSelectionOnClick
                    disableColumnMenu
                    disableMultipleRowSelection
                    hideFooter
                />
            );
        };

        GridTable.displayName = 'GridTable';

        return GridTable;
    }, [betData.parts])

    return (
        <Accordion expanded={expanded} onChange={handleAccordionChange}>
            <AccordionSummary>
                <Typography ml={3}>
                    {`Bet No. ${index + 1} - ${betData.betType} (${betData.parts.length} legs)`}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <MemoizedTable oddsDisplay={oddsDisplay} market={betData.market}/>
            </AccordionDetails>
            <AccordionActions sx={{bgcolor: 'rgba(0, 0, 0, .03)'}}>
                <MemoizedAmountInput amount={betAmount} onAmountChange={handleBetAmountChange} />
                <Button
                    sx={{width: '150px'}}
                    variant={'outlined'}
                    color={'primary'}
                    onClick={()=> handlePlaceBet({...betData, stack: betAmount})}
                    disabled={betAmount <= 0}
                >
                    下注
                </Button>
                <Button
                    variant={'outlined'}
                    color={'primary'}
                    onClick={()=> props.handleClearBet(`SINGLE-${index}`)}
                >
                    清除注單
                </Button>
            </AccordionActions>
        </Accordion>
    )
});

BetPartCard.displayName = 'BetPartCard';

export const PlaceBetBox = (props: PlaceBetBoxProps) => {
    const {punterData, placeBetData, handlePunterChange, handlePlaceBet, handleClearBet} = props;

    const clearButtonOnClick = useCallback(() => {
        props.handleClearBet('ALL');
    }, [])

    return (
        <Box p={2}>
            <Grid container alignItems={'flex-end'} justifyContent={'space-between'}>
                <Grid item xs={6}>
                    <InfoSelectComponent header={'下注帳號'}
                                         tip={"選擇一個帳號進行下注"}
                                         menu={
                        {
                            label: '選擇下注會員帳號',
                            options: punterData.map(punter => punter.punterAccount + ': ' + punter.punterId),
                            onChange: handlePunterChange
                        }
                    }/>
                </Grid>
                <Grid item xs={2}>
                    <Button
                        fullWidth
                        variant={'outlined'}
                        color={'primary'}
                        onClick={clearButtonOnClick}
                    >
                        清除所有注單
                    </Button>
                </Grid>
            </Grid>
            <Box mt={4}>
                <Typography variant={'h4'} mb={2}>注單</Typography>
                {
                    placeBetData.map((betData, index) => {
                        return (
                            <BetPartCard
                                key={index + betData.betType}
                                betData={betData}
                                index={index}
                                handlePlaceBet={handlePlaceBet}
                                handleClearBet={handleClearBet}
                            />
                        )
                    })
                }
            </Box>
        </Box>
    )
}