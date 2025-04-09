import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {Box, FormControl, MenuItem, Select, TextField} from '@mui/material'
import FilterListIcon from "@mui/icons-material/FilterList"
import {SelectChangeEvent} from "@mui/material/Select"
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {InfoTextField} from "@/modules/components/TextField";
import {IntlShape, useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

export interface BetAmountModel {
    condition: string
    firstAmount: string
    secondAmount?: string
}

export interface BetAmountOptionsProps {
    betAmountModel: BetAmountModel
    onChange?: (condition: string, firstAmount: string, secondAmount?: string) => void
    shouldClear?: boolean
    sx?: SxProps<Theme>
}

enum BetAmountFieldType {
    ConditionField = 'ConditionField',
    FirstAmountField = 'FirstAmountField',
    SecondAmountField = 'SecondAmountField'
}

/**
 * @param G greater Represent >
 * @param GE greaterEqual Represent >=
 * @param L less Represent <
 * @param LE lessEqual Represent <=
 * @param B between Represent >= A && <= B
 */
export enum BetAmountOptionsType {
    G = 'betAmountOptions.greaterThan',
    GE = 'betAmountOptions.greaterThanOrEqualTo',
    L = 'betAmountOptions.lessThan',
    LE = 'betAmountOptions.lessThanOrEqualTo',
    B = 'betAmountOptions.between'
}

export const BetAmountOptions = (props: Omit<BetAmountOptionsProps, 'shouldClear'>) => {
    const {betAmountModel, onChange, sx} = props
    const options = Object.values(BetAmountOptionsType)
    const nonBetweenOptions = options.filter(option => option !== BetAmountOptionsType.B)
    const intl = useIntl()
    const funType = LocalizationFunctionType.Common
    const [secondAmountError, setSecondAmountError] = useState<string | null>(null)

    const handleChanged = useCallback(
        (fieldType: BetAmountFieldType, value: any) => {
            const newModel = {...betAmountModel};

            switch (fieldType) {
                case BetAmountFieldType.ConditionField:
                    newModel.condition = value;
                    break;
                case BetAmountFieldType.FirstAmountField:
                    newModel.firstAmount = value;
                    break;
                case BetAmountFieldType.SecondAmountField:
                    newModel.secondAmount = value;
                    break;
            }

            if (onChange) {
                onChange(
                    newModel.condition,
                    newModel.firstAmount,
                    newModel.condition === BetAmountOptionsType.B
                        ? newModel.secondAmount
                        : undefined
                );
            }
        },
        [betAmountModel]
    );


    const handleAmountChange = (fieldType: BetAmountFieldType, value: string) => {
        const regex = /^\d*\.?\d{0,2}$/
        if (regex.test(value)) {
            handleChanged(fieldType, value)
        }
    }

    useEffect(() => {
        if (betAmountModel.condition === BetAmountOptionsType.B && betAmountModel.firstAmount && betAmountModel.secondAmount) {
            const firstValue = parseFloat(betAmountModel.firstAmount)
            const secondValue = parseFloat(betAmountModel.secondAmount)
            if (secondValue <= firstValue) {
                setSecondAmountError(intl.formatMessage({
                    id: `${funType}.maxGreaterThanMin`,
                    defaultMessage: 'The maximum should be greater than the minimum'
                }))
            } else {
                setSecondAmountError(null)
            }
        } else {
            setSecondAmountError(null)
        }
    }, [betAmountModel])

    return (
        <Box id="bet-amount-options" display={'inline-flex'} flexDirection="column" gap="1rem" width={'100%'}
             sx={sx}
        >
            <FormControl variant="outlined" fullWidth>
                <Select
                    value={betAmountModel.condition}
                    onChange={(event: SelectChangeEvent<string>) => handleChanged(BetAmountFieldType.ConditionField, event.target.value)}
                    displayEmpty
                    renderValue={(selected) => intl.formatMessage({
                        id: `${funType}.${selected}`,
                        defaultMessage: selected
                    }) || 'Condition'}
                >
                    {options.map((item, index) => (
                        <MenuItem key={`${index}-${item}`} value={item} id={`bet-amount-options-${index}`}>
                            {intl.formatMessage({id: `${funType}.${item}`, defaultMessage: item})}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {nonBetweenOptions.includes(betAmountModel.condition as BetAmountOptionsType) && (
                <InfoTextField
                    error={false}
                    label={intl.formatMessage({id: `${funType}.amount`, defaultMessage: 'Amount'})}
                    helperText={''}
                    format={"number"}
                    value={betAmountModel.firstAmount}
                    onChange={(e) => handleAmountChange(BetAmountFieldType.FirstAmountField, e.target.value)}
                />
            )}
            {betAmountModel.condition === BetAmountOptionsType.B && (
                <>
                    <InfoTextField
                        error={false}
                        label={intl.formatMessage({
                            id: `${funType}.minimumAmount`,
                            defaultMessage: 'Minimum Amount'
                        })}
                        helperText={''}
                        format={"number"}
                        value={betAmountModel.firstAmount}
                        onChange={(e) => handleAmountChange(BetAmountFieldType.FirstAmountField, e.target.value)}
                    />
                    <InfoTextField
                        error={!!secondAmountError}
                        label={intl.formatMessage({
                            id: `${funType}.maximumAmount`,
                            defaultMessage: 'Maximum Amount'
                        })}
                        helperText={secondAmountError || ''}
                        format={"number"}
                        value={betAmountModel.secondAmount}
                        onChange={(e) => handleAmountChange(BetAmountFieldType.SecondAmountField, e.target.value)}
                    />
                </>
            )}
        </Box>
    )
}

export const getConditionDisplayValue = (betAmountModel: BetAmountModel, intl: IntlShape, funType: string) => {
    const {condition, firstAmount, secondAmount} = betAmountModel
    if (condition === BetAmountOptionsType.B) {
        return `${intl.formatMessage({
            id: `${funType}.${BetAmountOptionsType.B}`,
            defaultMessage: condition
        })}, 
                $${Number(firstAmount).toFixed(2)} - $${Number(secondAmount).toFixed(2)}`
    } else {
        return `${intl.formatMessage({id: `${funType}.${condition}`, defaultMessage: condition})}, 
            $${Number(firstAmount).toFixed(2)}`
    }
}

const BetAmountFilter = (props: Omit<BetAmountOptionsProps, 'betAmountModel' | 'sx'>) => {
    const {shouldClear, onChange} = props
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [betAmountModel, setBetAmountModel] = useState<BetAmountModel>({
        condition: BetAmountOptionsType.G,
        firstAmount: '',
        secondAmount: ''
    })
    const intl = useIntl()
    const funType = LocalizationFunctionType.Common

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            const container = containerRef.current
            const optionsBox = document.getElementById('bet-amount-options')
            const menuItemClicked = Array.from(document.querySelectorAll('[id^="bet-amount-options-"]')).some(el => el.contains(target))
            if (container && !container.contains(target) && optionsBox && !optionsBox.contains(target) && !menuItemClicked) {
                setShowOptions(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleModelChange = (condition: string, firstAmount: string, secondAmount?: string) => {
        const newModel = {
            condition,
            firstAmount,
            secondAmount
        }

        setBetAmountModel(newModel)
    }

    function checkResultIsValid() {
        if (betAmountModel.condition === BetAmountOptionsType.B) {
            const {firstAmount, secondAmount} = betAmountModel;
            const firstAmountFilled = firstAmount !== '';
            const secondAmountFilled = secondAmount !== '';

            if (!firstAmountFilled && !secondAmountFilled) {
                return false;
            } else if (!firstAmountFilled || !secondAmountFilled) {
                return false;
            } else {
                const firstValue = Number(firstAmount);
                const secondValue = Number(secondAmount);
                return secondValue > firstValue;
            }
        }

        return true
    }


    useEffect(() => {
        if (shouldClear) {
            setBetAmountModel({
                condition: BetAmountOptionsType.G,
                firstAmount: '',
                secondAmount: '',
            })
            if (onChange)
                onChange(BetAmountOptionsType.G, '', '')
        }
    }, [shouldClear]);

    useEffect(() => {
        function handleResult() {
            if (onChange === undefined) return;

            if (checkResultIsValid()) {
                setError(null);
                onChange(
                    betAmountModel.condition,
                    betAmountModel.firstAmount,
                    betAmountModel.secondAmount
                );
            } else if (betAmountModel.condition === BetAmountOptionsType.B) {

                const {firstAmount, secondAmount} = betAmountModel;
                if (firstAmount !== '' && secondAmount !== '') {
                    setError(
                        intl.formatMessage({
                            id: `${funType}.maxGreaterThanMin`,
                            defaultMessage: 'The maximum should be greater than the minimum',
                        })
                    );
                } else {
                    setError(null);
                }
            } else {
                setError(
                    intl.formatMessage({
                        id: `${funType}.invalidInput`,
                        defaultMessage: 'Invalid input',
                    })
                );
            }
        }

        handleResult();
    }, [betAmountModel]);

    const getDisplayValue = useMemo(() => {
        return getConditionDisplayValue(betAmountModel, intl, funType)
    }, [betAmountModel])

    return (
        <Box ref={containerRef} display="flex" flexDirection="column" width="100%" gap="1rem"
             sx={{position: 'relative'}}>
            <TextField
                data-testid="bet-amount-filter"
                label={intl.formatMessage({id: `${funType}.betAmount`, defaultMessage: 'Bet Amount'})}
                placeholder={intl.formatMessage({
                    id: `${funType}.betAmountPlaceHolder`,
                    defaultMessage: 'Select filter criteria'
                })}
                value={betAmountModel.firstAmount === '' ? '' : getDisplayValue}
                onFocus={() => setShowOptions(true)}
                onClick={() => setShowOptions(true)}
                InputProps={{
                    readOnly: true,
                    endAdornment: <FilterListIcon/>,
                }}
                fullWidth
                error={betAmountModel.condition === BetAmountOptionsType.B && !!error}
                helperText={betAmountModel.condition === BetAmountOptionsType.B ? error : ''}
            />
            {showOptions && (
                <BetAmountOptions
                    betAmountModel={betAmountModel}
                    onChange={handleModelChange}
                    sx={{
                        position: 'absolute', top: '100%', left: 0, zIndex: 2, paddingTop: 2,
                        backgroundColor: 'background.paper'
                    }}
                />
            )}
        </Box>
    )
}

export default BetAmountFilter
