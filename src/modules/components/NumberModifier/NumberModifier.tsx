import * as React from "react";
import {useCallback, useEffect, useRef, useState} from "react";
import BigDecimal from "js-big-decimal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {oddsFormat} from "@/utils/OddsFormat";
import SensorsIcon from '@mui/icons-material/Sensors';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Button, InputAdornment, Stack, TextField, Tooltip} from "@mui/material";
import {moneyFormat} from "@/utils/tools";
import {CheckRounded, CloseRounded} from "@mui/icons-material";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import LockIcon from "@mui/icons-material/Lock";
import {BetSlipsModel} from "@/services/@core/module/ResponseDataModels";

export interface NumberModifierProps {
    status: string,
    value: string | number,
    onValueChange?: (value: number) => void,
    point?: number,
    quantity?: number,
    displayType?: string
    viewOnly?: boolean,
    isWidthFixed?: boolean,
    originalPrice?: number,
    betSlips?: BetSlipsModel,
    adjustedNumber?: number
    isLock?: boolean
    market?: string
}

export const complementZero = (num: string | number, point: number) => {
    return Number(num).toFixed(point).toString()
}

const getColor = (newValue: number, preValue?: number): string => {
    if (!preValue) return ''
    if (preValue > newValue) return '#1F7A1F'
    if (preValue < newValue) return '#C41C1C'
    return '';
};

export const countDecimalPlaces = (num: number) => {
    const decimalPart = String(num).match(/\.(\d+)/);
    return decimalPart ? decimalPart[1].length : 0;
};


const AcceptChild = ({num, amount}: { num: number, amount: number }) => {
    return (
        <Stack direction={'row'}
               id={'accept-data'}
               sx={{
                   marginLeft: '0.375rem',
                   fontSize: '0.875rem',
                   cursor: 'pointer',
                   whiteSpace: 'nowrap',
                   overflow: 'hidden',
                   textOverflow: 'ellipsis',
               }}>
            {moneyFormat(num)}/<span style={{color: '#0288D1'}} id={'accept-data'}>{moneyFormat(amount)}</span>
        </Stack>
    )
}

const mapping: Record<number, number> = {
    1: 10,
    2: 100,
    3: 1000,
    4: 10000
}

const AdjustedNumChild = ({adjusted, point}: { adjusted: number, point: number }) => {
    const multiplier = new BigDecimal(mapping[point])
    const adjustedNum = new BigDecimal(adjusted).multiply(multiplier).floor().getValue()
    return (
        <Box sx={{
            marginLeft: '0.375rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }}>
            <Box sx={{
                color: '#E47474',
                fontSize: '0.875rem',
                display: 'inline-block'
            }}>{adjusted > 0 ? '+' : ''}{adjustedNum}</Box>
        </Box>
    )
}

const OriginalPrice = ({origin, displayType, quantity, market, point}: {
    origin: number, displayType: string, quantity: number, market: string, point: number
}) => {
    const preOriginalPriceRef = useRef<number>(origin)
    const [previousOrigin, setPreviousOrigin] = useState<number>(origin)

    useEffect(() => {
        if (origin !== preOriginalPriceRef.current) {
            setPreviousOrigin(preOriginalPriceRef.current);
            preOriginalPriceRef.current = origin;
        }
    }, [origin]);

    const displayText = transferToDisplayText(origin, displayType, quantity, market, point);

    return (
        <Box sx={{
            color: getColor(origin, previousOrigin || undefined) || '#9D9D9E',
            fontSize: '0.875rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 700
        }}>
            <SensorsIcon sx={{
                color: '#9D9D9E',
                marginRight: '5px'
            }}/>
            {displayText}
            {
                (() => {
                    if (previousOrigin < origin) return <ArrowDropUpIcon sx={{color: '#C41C1C'}}/>
                    if (previousOrigin > origin) return <ArrowDropDownIcon sx={{color: '#1F7A1F'}}/>
                    return null;
                })()
            }
        </Box>
    );
};

const EditableNumberTextField = ({setIsEditing, onSave}: {
    setIsEditing: (value: boolean) => void, onSave: (value: string) => void
}) => {
    const intl = useIntl()
    const funcType = LocalizationFunctionType.Common
    const [inputValue, setInputValue] = useState('')
    const [helperText, setHelperText] = useState('')
    const isSaveEnabled = inputValue !== '' && !helperText && !isNaN(Number(inputValue))

    const handleBlur = () => {
        setInputValue('')
        setIsEditing(false)
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSave()
            setIsEditing(false)
        }
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setHelperText("")
        if (/^[+-]?\d*$/.test(value)) {
            const numericValue = Number(value)
            setInputValue(value)
            if (!(value === '' || value === '+' || value === '-' || (numericValue >= -50 && numericValue <= 50))) {
                setHelperText(intl.formatMessage({
                    id: `${funcType}.inputFramesHelperText`,
                    defaultMessage: 'Please enter a number of frames between -50 and 50'
                }))
            }
        }
    }
    const handleCancel = () => {
        setInputValue('')
        setIsEditing(false)
    };

    const handleSave = () => {
        if (!isSaveEnabled) return
        onSave(inputValue)
        setIsEditing(false)
    }

    return (
        <TextField
            variant={'outlined'}
            type={'text'}
            error={!!helperText}
            helperText={helperText}
            sx={{
                width: '120px',
                margin: '6px 0',
                fontSize: '0.75rem',
                height: '30px',
                display: 'flex',
                color: 'text.primary',
                '& .MuiOutlinedInput-root': {
                    paddingX: 0.5,
                    backgroundColor: '#0000000A',
                    borderColor: '#CDD7E1',
                    borderRadius: '100px',
                    '& fieldset': {
                        borderColor: '#CDD7E1',
                        borderWidth: '0.125rem',
                    },
                    '&:hover fieldset': {
                        borderColor: '#CDD7E1',
                        borderWidth: '0.125rem',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#CDD7E1',
                        borderWidth: '0.125rem',
                    },
                },
            }}
            autoFocus
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Tooltip arrow placement={'top'}
                                 title={intl.formatMessage({id: `${funcType}.cancel`, defaultMessage: 'Cancel'})}
                        >
                            <IconButton edge="start"
                                        size="small"
                                        sx={{color: 'text.disabled'}}
                                        onMouseDown={handleCancel}
                            >
                                <CloseRounded fontSize={'small'}/>
                            </IconButton>
                        </Tooltip>
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <Tooltip arrow placement={'top'}
                                 title={intl.formatMessage({id: `${funcType}.save`, defaultMessage: 'Save'})}
                        >
                            <IconButton edge={false}
                                        size="small"
                                        sx={{color: '#1F7A1F'}}
                                        disabled={!isSaveEnabled}
                                        onMouseDown={handleSave}
                            >
                                <CheckRounded fontSize={'small'}/>
                            </IconButton>
                        </Tooltip>
                    </InputAdornment>
                ),
            }}
            FormHelperTextProps={{
                sx: {
                    width: 'fit-content',
                    paddingX: 1,
                    backgroundColor: 'background.paper'
                },
            }}
        />
    )
}

const transferToDisplayText = (
    value: number | string, displayType: string, quantity: number, market: string, point: number
) => {
    let displayText = oddsFormat(value, displayType, countDecimalPlaces(quantity), market)
    if (!isNaN(Number(displayText))) {
        if (displayText.startsWith('+')) {
            displayText = `+${complementZero(displayText, point)}`
        } else {
            displayText = complementZero(displayText, point)
        }
    }
    return displayText
}

export const NumberModifier = ({
                                   status,
                                   value,
                                   onValueChange,
                                   point = 4,
                                   quantity = 0.001,
                                   displayType = 'Decimal',
                                   isWidthFixed = false,
                                   viewOnly,
                                   market,
                                   originalPrice,
                                   betSlips,
                                   adjustedNumber,
                                   isLock = false
                               }: NumberModifierProps) => {
    const [count, setCount] = React.useState<number>(Number(value));
    const [countTxt, setCountTxt] = React.useState<string>(transferToDisplayText(value, displayType, quantity, market ?? '', point));
    const [diff, setDiff] = useState<number | undefined>(undefined)
    const [decrementDisabled, setDecrementDisabled] = useState<boolean>(true)
    const [isSuspended, setIsSuspended] = useState<boolean>(status === 'SUSPENDED')

    const preCount = useRef<number>()
    const [previousCount, setPreviousCount] = useState<number>()
    const {accept, acceptAmount} = betSlips ?? {accept: undefined, acceptAmount: undefined}
    useEffect(() => {
        const prev = preCount.current
        if (prev) setPreviousCount(prev)
    }, [value, countTxt]);

    useEffect(() => {
        if (diff) {
            const displayText = transferToDisplayText(diff ?? value, displayType, quantity, market ?? '', point);
            if (onValueChange) {
                onValueChange(diff)
            }
            setCount(diff)
            setDiff(undefined)
            setCountTxt(displayText)
        }
    }, [diff, quantity])

    const handleDecrement = useCallback(() => {
        if (count === 0) return;
        const diff = BigDecimal.subtract(count, quantity);
        if (BigDecimal.compareTo(diff, 1) <= 0) return; // If diff is less than 1, do not update
        setDiff(Number(diff))
    }, [count, quantity])

    const handleIncrement = useCallback(() => {
        const diff = BigDecimal.add(count, quantity);
        setDiff(Number(diff));
    }, [count, quantity])

    useEffect(() => {
        const count = Number(value)
        const countText = value.toString()
        setCount(count)

        const displayText = transferToDisplayText(countText, displayType, quantity, market ?? '', point);
        setCountTxt(displayText)
        preCount.current = Number(displayText)
    }, [value, displayType])

    useEffect(() => {
        setDecrementDisabled(prevState => {
            const nextDecrement = BigDecimal.subtract(count, quantity);
            const newState = BigDecimal.compareTo(nextDecrement, 1) <= 0
            if (prevState !== newState) return newState
            return prevState
        })
    }, [count]);

    useEffect(() => {
        setIsSuspended(prevState => {
            const _status = status === 'SUSPENDED'
            if (prevState !== _status) return _status
            return prevState
        })
    }, [status]);

    const [isEditing, setIsEditing] = useState(false)
    const handleButtonClick = () => {
        setIsEditing(true)
    }
    const handleFramesNumber = (value: string) => {
        // 幀數輸入完的實際調水 = {configuration 設定的每次增加的調水值} x {輸入的幀數}
        const transferFramesToQuantity = BigDecimal.multiply(value, quantity)
        const diff = BigDecimal.add(count, transferFramesToQuantity)
        if (BigDecimal.compareTo(diff, 1) <= 0) return; // If diff is less than 1, do not update
        setDiff(Number(diff));
    }

    return <Stack flexDirection={'row'} alignItems={'flex-start'}>
        <Stack flexDirection={'column'}>
            {
                isEditing ? (
                    <EditableNumberTextField
                        setIsEditing={setIsEditing}
                        onSave={handleFramesNumber}
                    />
                ) : (
                    <Box
                        sx={{
                            backgroundColor: isSuspended ? '#BB69001F' : '#00000014',
                            '[data-mui-color-scheme="dark"] &': {
                                backgroundColor: 'rgba(255, 255, 255, 0.16)',
                            },
                            width: isWidthFixed ? '120px' : '100%',
                            color: 'text.primary',
                            fontSize: '0.875rem',
                            borderRadius: '100px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '4px 0',
                            maxHeight: '35px',
                        }}
                    >
                        {!viewOnly ?
                            <IconButton
                                size="small"
                                disabled={decrementDisabled}
                                sx={{
                                    color: 'text.disabled'
                                }}
                                onClick={handleDecrement}
                            >
                                <RemoveIcon fontSize="small"/>
                            </IconButton> :
                            <Box sx={{width: 30, height: 25}}/>
                        }
                        {
                            !isLock ?
                                <Box sx={{
                                    width: '100%',
                                    minWidth: '45px',
                                    height: '30px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    color: getColor(Number(countTxt), previousCount) || 'text.primary'
                                }}>
                                    <Button
                                        sx={{
                                            width: '100%',
                                            minWidth: '45px',
                                            height: '30px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            color: isSuspended ? '#9A5B13' : 'text.primary',
                                            mx: '0.5rem',
                                        }}
                                        disabled={viewOnly}
                                        onClick={handleButtonClick}
                                    >
                                        {countTxt}
                                    </Button>
                                    {
                                        previousCount && (() => {
                                            if (previousCount < Number(countTxt)) return <ArrowDropUpIcon sx={{color: '#C41C1C'}}/>
                                            if (previousCount > Number(countTxt)) return <ArrowDropDownIcon sx={{color: '#1F7A1F'}}/>
                                            return null;
                                        })()
                                    }
                                </Box>
                                :
                                <LockIcon sx={{color: '#9D9D9E', height: '1.25rem', margin: '5px 0'}}/>
                        }
                        {!viewOnly ?
                            <IconButton
                                size="small"
                                sx={{
                                    color: 'text.disabled'
                                }}
                                onClick={handleIncrement}
                            >
                                <AddIcon fontSize="small"/>
                            </IconButton> :
                            <Box sx={{width: 30, height: 25}}/>
                        }
                    </Box>
                )
            }
            {originalPrice && <OriginalPrice origin={originalPrice} displayType={displayType} quantity={quantity}
                                                 market={market ?? ''} point={point}/>}
        </Stack>
        <Stack flexDirection={'row'}
               mt={1}
               display="flex"
               flexWrap="wrap"
               alignItems="center"
               overflow="hidden"
               sx={{width: '100%'}}
        >
            {accept && acceptAmount ? <AcceptChild num={accept} amount={acceptAmount}/> : <></>}
            {adjustedNumber && adjustedNumber !== 0 ?
                <AdjustedNumChild adjusted={adjustedNumber} point={point}/> : <></>}
        </Stack>
    </Stack>
}