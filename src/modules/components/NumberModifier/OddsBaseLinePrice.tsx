import * as React from 'react';
import {ReactNode, useEffect, useState} from 'react';
import {NumberModifier, NumberModifierProps} from "@/modules/components/NumberModifier/NumberModifier";
import {Grid, Typography, Box} from "@mui/material";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {ApplyTemplate, BetSlipsModel} from "@/services/@core/module/ResponseDataModels";
import {Functionality} from "@/services/@core/module/Enum";

export type OddsLayoutType = 'horizontal' | 'vertical'

export interface OddsBaseLinePriceProps {
    odds?: OddBaseLinePriceProps[]
    displayType?: string
    viewOnly?: boolean
    marketType?: string
    isWidthFixed?: boolean
    layoutType?: OddsLayoutType
}

export interface OddsBaseLinePriceWithApplyTemplateProps extends OddsBaseLinePriceProps {
    applyTemplate?: ApplyTemplate
    otherLines?: ReactNode
    isShowBase?: boolean
    handleTemplateBtnClick?: (template: ApplyTemplate) => void
}

export interface OddBaseLinePriceProps {
    base?: string,
    price?: string,
    point?: number,
    quantity?: number,
    originalPrice?: number,
    acceptedAmount?: number,
    acceptedNumber?: number,
    betSlips?: BetSlipsModel,
    adjustedNumber?: number,
    oddsSuspendedStatus?: string,
    displayType?: string,
    viewOnly?: boolean,
    marketType?: string,
    betStatus?: string,
    isWidthFixed?: boolean,
    onValueChange?: (value: number) => void
    oddsLayoutType?: OddsLayoutType
}

const NoDataBox = () => {
    const intl = useIntl()
    const funType = LocalizationFunctionType.Common
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'text.secondary',
            fontSize: '0.875rem'
        }}>
            {
                intl.formatMessage({id: `${funType}.noData`, defaultMessage: 'No Data'})
            }
        </Box>
    )
}

const OddBaseLinePrice = ({
                              base,
                              price,
                              point,
                              quantity,
                              originalPrice,
                              betSlips,
                              adjustedNumber,
                              onValueChange,
                              displayType,
                              viewOnly,
                              marketType,
                              betStatus,
                              isWidthFixed,
                              oddsLayoutType = 'horizontal'
                          }: OddBaseLinePriceProps) => {
    const [priceValue, setPriceValue] = useState(price)
    const [count, setCount] = useState(0)
    const priceProps: NumberModifierProps | null = priceValue ? {
        status: betStatus ?? 'OPEN',
        value: priceValue,
        point: point,
        quantity: quantity,
        originalPrice: originalPrice,
        betSlips: betSlips,
        adjustedNumber: adjustedNumber,
        market: marketType,
        onValueChange: (value) => {
            setPriceValue(value.toString())
            setCount(count + 1)
            if (onValueChange) {
                onValueChange(value)
            }
        },
    } : null
    useEffect(() => {
        setPriceValue(price)
    }, [price]);

    return (
        oddsLayoutType === 'horizontal' ?
            <Box display={'flex'} width={'100%'} sx={{alignItems: 'center'}}>
                <Typography sx={{
                    color: 'text.primary',
                    marginRight: '0.5rem',
                    textAlign: 'center',
                    lineHeight: '35px',
                    fontSize: '0.875rem',
                }}>
                    {base}
                </Typography>
                {priceProps && <NumberModifier {...priceProps} displayType={displayType} isWidthFixed={isWidthFixed}
                                               viewOnly={viewOnly}/>}
            </Box>
            :
            <Grid container spacing={1} justifyContent="center">
                <Grid item xs={2}>
                    <Typography sx={{
                        color: 'text.primary',
                        marginRight: '0.5rem',
                        textAlign: 'center',
                        lineHeight: '35px',
                        fontSize: '0.875rem',
                    }}>
                        {base}
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    {
                        priceProps &&
                        <NumberModifier {...priceProps} displayType={displayType} isWidthFixed={isWidthFixed}
                                        viewOnly={viewOnly}/>
                    }
                </Grid>
            </Grid>
    )
}

export const OddsBaseLinePrice = ({
                                      odds,
                                      displayType = 'Decimal',
                                      isWidthFixed,
                                      viewOnly = false,
                                      marketType
                                  }: OddsBaseLinePriceProps) => {
    const isBetsBO = process.env.FUNCTIONALITY === Functionality.Bets

    return (odds && odds.length > 0 ?
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
            }}>
                {
                    odds.map((odd, index) => {
                        const isViewOnly = isBetsBO || odd.betStatus === 'CLOSED'
                        return (
                            <OddBaseLinePrice
                                key={`${odd.base}-${index}`}
                                {...odd}
                                displayType={displayType}
                                isWidthFixed={isWidthFixed}
                                viewOnly={isViewOnly}
                                marketType={marketType}
                            />
                        )
                    })
                }
            </Box>
            :
            <NoDataBox/>
    )
}

export const OddsBaseLinePriceWithApplyTemplate = ({
                                                       odds,
                                                       displayType = 'Decimal',
                                                       marketType,
                                                       isWidthFixed,
                                                       viewOnly = false,
                                                       isShowBase = true,
                                                       applyTemplate,
                                                       otherLines,
                                                       handleTemplateBtnClick
                                                   }: OddsBaseLinePriceWithApplyTemplateProps) => {
    const isBetsBO = process.env.FUNCTIONALITY === Functionality.Bets

    return (odds && odds.length > 0 ?
            <Grid container>
                {/*After discussion, temporarily hide the Template display.*/}
                {/*{applyTemplate &&*/}
                {/*    <Stack direction={'row'} width={'100%'}>*/}
                {/*        <Stack width={'16.666%'}/>*/}
                {/*        <Stack width={'50%'}>*/}
                {/*            <Tooltip title={applyTemplate.templateName} placement="top-start">*/}
                {/*                <Button*/}
                {/*                    size={'small'}*/}
                {/*                    sx={{*/}
                {/*                        textOverflow: 'ellipsis',*/}
                {/*                        overflow: 'hidden',*/}
                {/*                        whiteSpace: 'nowrap',*/}
                {/*                        display: 'block',*/}
                {/*                    }}*/}
                {/*                    onClick={() => handleTemplateBtnClick && handleTemplateBtnClick(applyTemplate)}>*/}
                {/*                    {applyTemplate.templateName}*/}
                {/*                </Button>*/}
                {/*            </Tooltip>*/}
                {/*        </Stack>*/}
                {/*    </Stack>*/}
                {/*}*/}
                {
                    odds.map((odd, index) => {
                        const isViewOnly = isBetsBO || odd.betStatus === 'CLOSED'

                        return (
                            <Grid item xs={12} key={`${odd.base}-${index}`} width={'inherit'}>
                                <OddBaseLinePrice
                                    key={`${odd.base}-${index}`}
                                    {...odd}
                                    marketType={marketType}
                                    displayType={displayType}
                                    isWidthFixed={isWidthFixed}
                                    viewOnly={isViewOnly}
                                    oddsLayoutType={'vertical'}
                                />
                            </Grid>
                        )
                    })
                }
                {
                    <Grid container justifyContent={"center"}>
                        <Grid item xs={4}></Grid>
                        <Grid item xs>
                            {otherLines}
                        </Grid>
                    </Grid>
                }
            </Grid>
            : <NoDataBox/>
    )
}