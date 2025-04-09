import React, {ReactElement, useEffect, useState} from 'react';
import {
    AutoMenuTextField,
    AutoMultiMenuTextField,
    AutoMultiMenuTextFieldProps,
    CommonTextField,
    CommonTextFieldProps,
    MenuTextField,
    MenuTextFieldProps,
    QueryableSelectTextField,
    SearchTextField,
    SingleDateTimePicker,
    SingleInputDateRangePicker,
    SingleInputDateRangePickerProps
} from "@/modules/components/TextField";
import {Box, Button, Grid} from "@mui/material";
import {AutoSearchTextField} from "@/modules/components/TextField/AutoSearchTextField";
import DropdownInput, {DropdownInputProps} from "@/modules/components/DropdownInput/DropdownInput";
import BetAmountFilter, {BetAmountOptionsProps} from "@/app/betSlip/components/NumberRangeTextField";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {useIntl} from 'react-intl';

type TextFieldGroupProps = CommonTextFieldProps | MenuTextFieldProps | AutoMultiMenuTextFieldProps | SingleInputDateRangePickerProps | DropdownInputProps | BetAmountOptionsProps;
type TextFieldGroup = React.ComponentType<TextFieldGroupProps>;

export interface TextFieldsContainerProps {
    children: ReactElement<TextFieldGroup> | ReactElement<TextFieldGroup>[];
    canClean?: boolean;
    displayCleanButton?: boolean;
    cleanButton?: ReactElement<React.ComponentType<OnCleanListener>>
}

export interface OnCleanListener {
    canClean?: boolean
    onClean?: () => void
}

function isValidChildType(elementType: React.ComponentType<TextFieldGroupProps>): boolean {
    return (
        elementType === CommonTextField ||
        elementType === SearchTextField ||
        elementType === MenuTextField ||
        elementType === SingleInputDateRangePicker ||
        elementType === SingleDateTimePicker ||
        elementType === AutoMenuTextField ||
        elementType === AutoMultiMenuTextField ||
        elementType === AutoSearchTextField ||
        elementType === DropdownInput ||
        elementType === BetAmountFilter ||
        elementType === QueryableSelectTextField
    );
}

/**
 *
 * @param children
 * @param cleanButton
 * @param canClean
 * @param displayCleanButton
 * @constructor
 *
 * @description Group the multi-textFields and with the clean button if needed
 */
const TextFieldsContainer: React.FC<TextFieldsContainerProps> = ({
                                                                     children,
                                                                     cleanButton,
                                                                     canClean = false,
                                                                     displayCleanButton = true,
                                                                 }) => {
    const [shouldClear, setShouldClear] = useState(false);
    const displayCleanButtonCount: number = 2;
    const intl = useIntl();
    const funcType = LocalizationFunctionType.Common;

    const handleClean = () => {
        setShouldClear(true);
    };

    useEffect(() => {
        if (shouldClear) {
            setTimeout(() => setShouldClear(false), 0);
        }
    }, [shouldClear]);

    const insertPropsToCleanButton = () => {
        if (React.isValidElement(cleanButton)) {
            const childProps = {
                ...cleanButton.props,
                onClean: handleClean,
                canClean: canClean
            };
            return React.cloneElement(cleanButton, childProps)
        }
        return cleanButton
    }

    return (
        <Grid container sx={{width: '100%'}}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    const elementType = child.type as React.ComponentType<TextFieldGroupProps>;
                    const childProps = {
                        ...child.props,
                        ...(isValidChildType(elementType) ? {shouldClear: shouldClear} : {})
                    };
                    return (
                        <Grid item xs sx={{paddingX: 1}}>
                            {React.cloneElement(child, childProps)}
                        </Grid>
                    );
                }
                return child;
            })}
            {displayCleanButton && React.Children.count(children) >= displayCleanButtonCount && (
                <Grid item sx={{paddingX: 1}} display="flex" justifyContent="center" alignItems="center">
                    {
                        cleanButton ?
                            insertPropsToCleanButton()
                            :
                            <Box display="flex" justifyContent="center" alignItems="center"
                                 sx={{width: '48px', height: '48px'}}>
                                <Button color="inherit" size="medium" variant="outlined" disabled={!canClean} onClick={handleClean} data-testid={"clean-button"}
                                        sx={{width: '100%', height: '100%'}}>
                                    {
                                        intl.formatMessage({id: `${funcType}.clean`, defaultMessage: 'CLEAN'})
                                    }
                                </Button>
                            </Box>
                    }
                </Grid>
            )}
        </Grid>
    );
};

export {TextFieldsContainer};
