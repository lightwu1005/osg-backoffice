import {Box, Button, Checkbox, FormControlLabel, Stack, TextField} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import RadioGroup from "@mui/material/RadioGroup";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";
import {ChangeEvent, SyntheticEvent, useEffect, useMemo, useRef, useState} from "react";
import Radio from "@mui/material/Radio";
import ToggleProps from "@/modules/interface/ToggleProps";
import MemoizedPreviewCard, {PreviewType} from "@/app/betSlip/components/PreviewCard";
import {debounce} from "lodash";
import { LocalizationFunctionType } from "@/localizedConfig/LanguageContext";
import { useIntl } from "react-intl";

/**
 * @param title The title of the checkbox to display on view.
 * @param checkBoxOnCheck To handle the checkbox value when click on confirm button.
 */
export interface ConfirmationDialogCheckBoxProps {
    title: string;
    checkBoxOnCheck: (value: boolean) => void;
}

/**
 * @param id The ID of this dialog.
 * @param title Represent the Dialog title.
 * @param subTitle Represent the title of options.
 * @param contentCard To display a component between title and subtitle.
 * @param options The single selection option items.
 * @param open Use to control dialog show/hide.
 * @param setOpen Use to set the status of dialog show/hide.
 * @param checkBox Use to set up a checkbox option at bottom of the dialog to control something that beside options.
 * @param onClose To handle button click event.
 */
export interface ConfirmationDialogProps extends ToggleProps {
    id: string;
    title: string;
    subTitle: string;
    contentCard?: React.ReactNode;
    options: string[];
    checkBox?: ConfirmationDialogCheckBoxProps;
    onClose: (value?: string) => void;
}

const ConfirmationDialog = (props: ConfirmationDialogProps) => {
    const radioGroupRef = useRef<HTMLElement>(null);
    const {
        title,
        subTitle,
        contentCard,
        options,
        open,
        setOpen,
        checkBox,
        onClose,
        ...other
    } = props;
    const [selectedValue, setSelectedValue] = useState('');
    const [inputtedValue, setInputtedValue] = useState('');
    const [checkboxChecked, setCheckboxChecked] = useState(true);
    const [isOther, setIsOther] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [marqueeText, setMarqueeText] = useState('');
    const intl = useIntl();
    const funType = LocalizationFunctionType.BetSlip;
    const funCommonType = LocalizationFunctionType.Common;

    const handleConfirm = () => {
        if (inputtedValue !== '' || selectedValue !== '') {
            if (checkBox?.checkBoxOnCheck) {
                checkBox.checkBoxOnCheck(checkboxChecked);
            }
            if (inputtedValue !== '') {
                onClose(inputtedValue);
            } else {
                onClose(selectedValue);
            }

            setOpen(false);
        }
    }

    const handleCancel = () => {
        onClose();
        setOpen(false);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        const lastElement = options.slice(0).pop();
        setIsOther(value === lastElement);
        setSelectedValue(value);
        setInputtedValue('');
        if (value === lastElement) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    };

    const handleTextFieldOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setInputtedValue(value);
        setDisabled((value === ''));
    }

    const handleCheckBoxOnChange = (event: SyntheticEvent<Element, Event>, checked: boolean) => {
        setCheckboxChecked(checked);
    }

    const debouncedOnChange = useMemo(() => debounce((value) => {
        setMarqueeText(value)
    }, 365), [])

    useEffect(() => {
        return () => debouncedOnChange.cancel()
    }, [debouncedOnChange])

    useEffect(() => {
        if (selectedValue.toLowerCase() === 'other') {
            debouncedOnChange(inputtedValue)
        } else {
            debouncedOnChange(selectedValue)
        }
    }, [inputtedValue, selectedValue]);

    return (
        <Box>
            <Dialog
                sx={{'& .MuiDialog-paper': {width: '80%'}}}
                open={open}
                {...other}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Stack direction={"column"} spacing={1}>
                        {contentCard}
                        <DialogContentText>{subTitle}</DialogContentText>
                        <RadioGroup
                            ref={radioGroupRef}
                            value={selectedValue}
                            onChange={handleChange}
                            sx={{marginLeft: 2}}
                        >
                            {options.map((option) => (
                                <FormControlLabel
                                    value={option}
                                    key={option}
                                    control={<Radio id={option} key={option}/>}
                                    label={option}
                                />
                            ))}
                        </RadioGroup>
                        {isOther &&
                            <TextField
                                variant="outlined"
                                sx={{paddingLeft: 5, minHeight: 80}}
                                multiline
                                rows={3}
                                onChange={handleTextFieldOnChange}
                                placeholder={intl.formatMessage({
                                    id: `${funType}.writeYourComment`, defaultMessage: 'Write your comment ...'})}
                            />
                        }
                        <MemoizedPreviewCard
                            previewText={marqueeText}
                            previewType={PreviewType.Desktop}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{
                    alignItems: 'center',
                    justifyContent: (checkBox ? 'space-between' : 'right'),
                    paddingLeft: 3, paddingRight: 3, paddingBottom: 3
                }}>
                    {(checkBox &&
                        <FormControlLabel
                            control={<Checkbox defaultChecked/>}
                            label={checkBox.title}
                            onChange={handleCheckBoxOnChange}
                        />
                    )}
                    <Box alignItems={'center'}>
                        <Button sx={{marginRight: 2}} onClick={handleCancel}>
                            {intl.formatMessage({id: `${funCommonType}.cancel`, defaultMessage: 'Cancel'})}
                        </Button>
                        <Button variant="contained" disabled={disabled} onClick={handleConfirm}>
                            {intl.formatMessage({id: `${funCommonType}.confirm`, defaultMessage: 'Confirm'})}
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default ConfirmationDialog