import React, {ReactNode, useEffect, useMemo, useState} from 'react';
import {Box, Button, Divider, Grid, Stack, Tooltip, Typography} from "@mui/material";
import {AddBoxRounded, IndeterminateCheckBoxRounded} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import ProgressBar from "@/modules/components/progressBar/ProgressBar";
import {BetModel, ConfigurationModel, OddModel, OddsListModel} from "@/services/@core/module/ResponseDataModels";
import Chip from "@mui/material/Chip";
import {
    displayStrongOddLine,
    getIncrementByRuleNumber,
    getRuleNumber,
    sortedOddBets
} from "@/modules/components/eventTable/EventDataConverter";
import {updateOdds} from "@/app/eventList/domain/useEventListViewModel";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {useIntl} from "react-intl";
import {MarketLineStatus} from "@/services/@core/module/Enum";
import {MuiEvent} from "@mui/x-data-grid-pro";
import {getMarketStatusBgColor, getMarketStatusDarkBgColor} from "@/app/eventDetail/models/EventDetailUtils";
import {lineStatus} from "@/services/@event/useCase";
import {NumberModifier} from "@/modules/components/NumberModifier/NumberModifier";

export interface MarketInfoCardPropsBase extends OddsListModel {
    handlePreference: (provider: string, marketId: string) => void
    handlePriceChange: (provider: string, betId: string, price: number, originalPrice: number) => void
    configuration?: ConfigurationModel;
    displayType: string;
    isBets: boolean;
    marketName: string;
    marketStatus: string;
    onClickAcceptData: (event: MuiEvent) => void
    homeParticipantEnName: string
    awayParticipantEnName: string
    marketType: string
}

export type MarketInfoCardProps = Readonly<MarketInfoCardPropsBase>;

const HeaderText = styled(Typography)(() => ({
    color: 'var(--text-primary, rgba(0, 0, 0, 0.87))',
    fontFamily: 'Roboto',
    fontSize: '1rem',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '1.5rem',
    letterSpacing: '0.17px',
}));

const ChildBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    gap: '8px var(--1, 8px)',
    alignSelf: 'stretch',
    flexWrap: 'wrap',
    marginTop: 6,
    marginBottom: 6
}));

interface GridFormProps {
    lineStatus?: string
    isHeader?: boolean
    leftView?: ReactNode
    rightView?: ReactNode
}

interface BetDisplayData extends BetModel {
    ruleNumber: number,
    quantity: number,
}

const getWordColor = (lineStatus?: string): string => {
    if (lineStatus === MarketLineStatus.CLOSED) return '#00000061'
    return 'text.primary'
};

const getDarkWordColor = (lineStatus?: string): string => {
    if (lineStatus === MarketLineStatus.CLOSED) return '#FFFFFF61'
    return 'text.primary'
};


const GridForm = ({isHeader, leftView, rightView, lineStatus}: GridFormProps) => {
    return <Grid container
                 sx={{
                     backgroundColor: isHeader ? '#F0F4F8' : getMarketStatusBgColor(lineStatus),
                     '[data-mui-color-scheme="dark"] &': {
                         backgroundColor: isHeader ? '#171A1C' : getMarketStatusDarkBgColor(lineStatus),
                     },
                 }}
                 alignItems={"stretch"}
                 padding={'1rem'}
                 justifyContent={"space-between"}
    >
        <Grid item xs={8} alignItems="stretch">
            {leftView}
        </Grid>
        <Grid item xs={4} alignItems="stretch">
            {rightView}
        </Grid>
    </Grid>
}

const Child = ({
                   odd,
                   marketStatus,
                   homeParticipantEnName,
                   awayParticipantEnName,
                   configuration,
                   marketType,
                   displayType,
                   handlePriceChange,
                   provider,
                   isBets,
                   skipAnimation,
                   onClickAcceptData,
               }: {
    odd: OddModel, marketStatus: string,
    homeParticipantEnName: string, awayParticipantEnName: string,
    configuration?: ConfigurationModel,
    marketType: string,
    displayType: string,
    handlePriceChange: (provider: string, betId: string, price: number, originalPrice: number) => void,
    provider: string,
    isBets: boolean,
    skipAnimation: boolean,
    onClickAcceptData: (event: MuiEvent) => void
}) => {
    const intl = useIntl()
    const funType = LocalizationFunctionType.Event

    const transformBetData = (bet: BetModel): BetDisplayData => {
        const ruleNumber = getRuleNumber(bet.price, configuration) ?? 4;
        const increment = getIncrementByRuleNumber(ruleNumber, configuration) ?? 0.0001
        return {
            ...bet,
            ruleNumber: ruleNumber,
            quantity: increment,
        }
    }

    const renderBalanceLine = (bet: BetDisplayData, odd: OddModel, status: string, index: number, homeParticipantEnName: string) => {
        const lineDisplayString = displayStrongOddLine(
            marketType,
            odd.bets,
            odd.baseLine ?? '',
            bet.line,
            bet.betName,
            bet.price,
            homeParticipantEnName,
            index
        );

        const shouldRenderBalanceChip = odd.isMostBalance ?? false;
        const lineColor = {
            color: getWordColor(status),
            '[data-mui-color-scheme="dark"] &': {
                color: getDarkWordColor(status),
            },
        };

        if (lineDisplayString) {
            return (
                <ChildBox key={`${bet.betId}` + 'mostBalanceLine'} sx={{flex: 1}}>
                    <Box sx={lineColor}>{lineDisplayString}</Box>
                    {shouldRenderBalanceChip && (
                        <Chip
                            sx={{
                                color: '#EF6C00',
                                borderColor: '#EF6C00',
                            }}
                            variant="outlined"
                            label={intl.formatMessage({
                                id: `${funType}.mostBalanceLine`,
                                defaultMessage: 'Most Balance Line',
                            })}
                        />
                    )}
                </ChildBox>
            );
        }

        return <Box key={index + 'mostBalanceLine'} sx={{flex: 1}}/>;
    };
    if (!configuration) return
    const sortedBets = sortedOddBets(odd, marketType, homeParticipantEnName, awayParticipantEnName);
    const betList = sortedBets.map(bet => transformBetData(bet))
    const status = lineStatus(sortedBets, odd.oddsSuspendedStatus, marketStatus)

    return <GridForm
        leftView={
            <Grid item container height={'100%'}>
                <Grid item xs sx={{
                    display: 'flex', flexDirection: 'column',
                    color: getWordColor(status),
                    '[data-mui-color-scheme="dark"] &': {
                        color: getDarkWordColor(status),
                    },
                }}>
                    {
                        betList.map((bet) => <ChildBox key={bet.betId}
                                                              sx={{flex: 1}}>{bet.betName}</ChildBox>)
                    }
                </Grid>
                <Grid item xs sx={{display: 'flex', flexDirection: 'column'}}>
                    {
                        betList.map((bet, index) => renderBalanceLine(bet, odd, status, index, homeParticipantEnName))
                    }
                </Grid>
                <Grid item sx={{display: 'flex', flexDirection: 'column'}}>
                    {
                        betList.map((bet) => {
                            return (
                                <ChildBox key={bet.betId} sx={{flex: 1}}>
                                    <NumberModifier
                                        point={bet.ruleNumber}
                                        quantity={bet.quantity}
                                        status={bet.betStatus}
                                        displayType={displayType}
                                        value={bet.price}
                                        onValueChange={(value) => handlePriceChange(provider, bet.betId, value, bet.price)}
                                        viewOnly={isBets || bet.betStatus === 'CLOSED'}
                                        originalPrice={bet.originalPrice}
                                        adjustedNumber={bet.adjustedNumber}
                                        market={marketType}
                                    />
                                </ChildBox>
                            );
                        })
                    }
                </Grid>
            </Grid>
        }
        rightView={
            <Grid item container height={'100%'} paddingLeft={'1rem'}>
                <Grid item xs sx={{
                    display: 'flex', flexDirection: 'column',
                }}>
                    {
                        betList?.map((bet) =>
                            <ChildBox key={bet.betId} sx={{flex: 1}}>
                                <ProgressBar key={bet.betId + '_progress'}
                                             layout={'horizontal'}
                                             padding={'0px'}
                                             data={bet.betSlips ?? {
                                                 accept: 0,
                                                 acceptAmount: 0,
                                                 pending: 0,
                                                 pendingAmount: 0,
                                                 rejected: 0,
                                                 rejectedAmount: 0
                                             }}
                                             skipAnimation={skipAnimation}
                                             onItemClick={onClickAcceptData}
                                />
                            </ChildBox>
                        )
                    }
                </Grid>
            </Grid>
        }
        lineStatus={status}
    />
}

function OddsRiskCard({
                          configuration,
                          provider,
                          isPreferred,
                          odds,
                          handlePreference,
                          handlePriceChange,
                          displayType,
                          isBets,
                          marketName,
                          marketStatus,
                          onClickAcceptData,
                          homeParticipantEnName,
                          awayParticipantEnName,
                          marketType
                      }: MarketInfoCardProps) {
    const [open, setOpen] = useState(true)
    const [skipAnimation, setSkipAnimation] = useState(false)
    const intl = useIntl()
    const funType = LocalizationFunctionType.Event

    const updatedOdds = useMemo(() => odds.map(odd => updateOdds(odd)), [odds])

    useEffect(() => {
        const id = setTimeout(() => {
            setSkipAnimation(true);
        }, 1000)
        return () => clearTimeout(id)
    }, []);

    const ToggleIcon = ({onClick}: { onClick: () => void }) => {
        const isMoreThanOne = updatedOdds.length > 1
        if (open && isMoreThanOne) {
            return <Tooltip
                title={intl.formatMessage({
                    id: `${funType}.showMostBalanceLine`,
                    defaultMessage: 'Show most balance line'
                })}
                arrow placement="top-start">
                <IndeterminateCheckBoxRounded sx={{color: '#2196F3'}} onClick={onClick}/>
            </Tooltip>
        } else {
            return <Tooltip
                title={isMoreThanOne ? intl.formatMessage({
                    id: `${funType}.showAllLine`,
                    defaultMessage: 'Show all line'
                }) : intl.formatMessage({
                    id: `${funType}.noMoreLines`,
                    defaultMessage: 'No more lines'
                })}
                arrow placement="top-start">
                <AddBoxRounded sx={{
                    color: !isMoreThanOne ? 'text.disabled' : '#2196F3',
                    cursor: !isMoreThanOne ? 'not-allowed' : 'pointer'
                }} onClick={isMoreThanOne ? onClick : undefined}/>
            </Tooltip>
        }
    }

    const Header = () => {
        return <GridForm
            isHeader={true}
            leftView={
                <Stack direction={"row"} spacing={1}>
                    <ToggleIcon onClick={() => setOpen(!open)}/>
                    <HeaderText sx={{color: 'text.primary'}}>
                        {
                            !isBets ? provider : intl.formatMessage({
                                id: `${funType}.AllLine`,
                                defaultMessage: 'All Line'
                            })
                        }
                    </HeaderText>
                </Stack>
            }
            rightView={
                isPreferred || isBets ?
                    <HeaderText sx={{color: 'text.primary'}} textAlign={'center'}>
                        {
                            intl.formatMessage({
                                id: `common.acceptPendingReject`,
                                defaultMessage: 'Accept / Pending / Reject'
                            })
                        }
                    </HeaderText>
                    : !isBets &&
                    <Box display={'flex'} justifyContent={'flex-end'}>
                        <Button
                            variant={'outlined'}
                            size={'small'}
                            onClick={() => {
                                handlePreference(provider, odds[0]?.marketId ?? '')
                            }}
                        >
                            {
                                intl.formatMessage({
                                    id: `${funType}.setAsPreference`,
                                    defaultMessage: 'Set as preference'
                                })
                            }
                        </Button>
                    </Box>
            }
        />
    }


    return (
        <Box sx={{
            width: '100%',
            borderBottom: '1px solid #636B7429',
            '[data-mui-color-scheme="dark"] &': {
                borderBottom: '1px solid #636B7450'
            }
        }}>
            <Stack>
                <Header/>
                {
                    open ?
                        <Stack divider={<Divider orientation="horizontal" flexItem/>}>
                            {
                                updatedOdds.map(function (odd) {
                                        return (
                                            <Child
                                                key={`${(odd.marketId ? odd.marketId : marketName) + odd.baseLine}`}
                                                odd={odd}
                                                marketStatus={marketStatus}
                                                homeParticipantEnName={homeParticipantEnName}
                                                awayParticipantEnName={awayParticipantEnName}
                                                marketType={marketType}
                                                displayType={displayType}
                                                handlePriceChange={handlePriceChange}
                                                provider={provider}
                                                isBets={isBets}
                                                skipAnimation={skipAnimation}
                                                onClickAcceptData={onClickAcceptData}
                                                configuration={configuration}
                                            />
                                        )
                                    }
                                )
                            }
                        </Stack>
                        : <Child odd={updatedOdds[0]} marketStatus={marketStatus}
                                 homeParticipantEnName={homeParticipantEnName}
                                 awayParticipantEnName={awayParticipantEnName}
                                 handlePriceChange={handlePriceChange}
                                 provider={provider}
                                 isBets={isBets}
                                 skipAnimation={skipAnimation}
                                 onClickAcceptData={onClickAcceptData}
                                 marketType={marketType}
                                 displayType={displayType}
                        />
                }
            </Stack>
        </Box>
    );
}

export default OddsRiskCard