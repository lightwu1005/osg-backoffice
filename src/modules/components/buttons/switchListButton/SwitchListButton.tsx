import {ReactNode, useCallback, useState} from "react";
import {Box, Button, FormControl, FormControlLabel, FormGroup, Popover, Switch, Typography} from "@mui/material";
import {FilterList, Replay} from "@mui/icons-material";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

/**
 * @param buttonIcon The icon displayed at the beginning of the button.
 * @param buttonText The text displayed on the button.
 * @param listHeaderText The text displayed at the top of the list.
 * @param listLabels The initial list of labels to be shown in the switch list.
 * @param dataKey The key of the data that displaying with switch.
 * @param minSelected The minimum number of items that must be selected.
 * @param onSwitchChanges A callback to handle the updated list that includes selected items.
 */
export interface SwitchListButtonProps {
    buttonIcon?: ReactNode;
    buttonText: string;
    listHeaderText?: string;
    listLabels: Record<string, any>[];
    dataKey: string;
    minSelected: number;
    defaultLabels?: string[]
    onSwitchChanges?: (checkedLabels: Record<string, any>[]) => void;
}

const SwitchListButton = ({buttonIcon, buttonText, listHeaderText, listLabels, dataKey, minSelected, defaultLabels, onSwitchChanges}: SwitchListButtonProps) => {


    const refactorListDataToStrings = useCallback(() => {
        return listLabels.map(item => item[dataKey])
    }, [listLabels, dataKey])

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [labels, setLabels] = useState<string[]>(defaultLabels ?? refactorListDataToStrings());
    const open = Boolean(anchorEl);
    const intl = useIntl();
    const funType = LocalizationFunctionType.Common;

    const refactorListDataToObjects = (values: string[]) => {
        return listLabels.filter(item => values.includes(item[dataKey]));
    }

    const handleButtonOnClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSwitchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Do nothing when hit minimum select number
        if ((labels.length <= minSelected) && !event.target.checked) return;

        let newData;
        if (labels.includes(event.target.name)) {
            newData = labels.filter(item => item !== event.target.name);
        } else {
            newData = [...labels, event.target.name];
        }

        const originalLabels = refactorListDataToStrings();

        newData = newData.sort((a, b) => originalLabels.indexOf(a) - originalLabels.indexOf(b));
        setLabels(newData);

        if (onSwitchChanges) {
            onSwitchChanges(refactorListDataToObjects(newData));
        }
    }

    const handleResetButtonOnclick = () => {
        const newData = refactorListDataToStrings();
        setLabels(newData);
        if (onSwitchChanges) {
            onSwitchChanges(listLabels);
        }
    }

    return (
        <Box>
            <Button
                data-testid={'SwitchListButton'}
                sx={{
                    paddingY: 1,
                    paddingX: 2,
                    minWidth: 'auto',
                    border: '1px solid',
                    borderColor: 'FilledInput.hoverBg',
                    ":hover": { borderColor: 'FilledInput.hoverBg' },
                    textTransform: 'none',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    backgroundColor: 'FilledInput.bg'
                }}
                startIcon={(buttonIcon) ? buttonIcon : <FilterList />}
                variant={'outlined'}
                color={'secondary'}
                onClick={handleButtonOnClick}
            >
                {buttonText}
            </Button>
            <Popover data-testid={'SwitchListPopover'}
                     open={open}
                     onClose={handleClose}
                     anchorEl={anchorEl}
                     anchorOrigin={{
                         vertical: 'bottom',
                         horizontal: 'left',
                     }}
            >
                <Box padding={4} width={300}>
                    <FormControl>
                        {listHeaderText && <Typography color={'#32383E'}>{listHeaderText}</Typography>}
                        <FormGroup>
                            {
                                refactorListDataToStrings().map(
                                    (label, index) =>
                                        <FormControlLabel
                                            key={`FormGroup_${index}`}
                                            label={label}
                                            color={'#32383E'}
                                            control={
                                                <Switch checked={labels.includes(label)}
                                                        onChange={handleSwitchOnChange}
                                                        name={label}
                                                />
                                            }
                                        />
                                    )
                            }
                        </FormGroup>
                    </FormControl>
                    <Button
                        variant={'text'}
                        startIcon={<Replay />}
                        sx={{marginTop: 1, textAlign: 'left'}}
                        onClick={handleResetButtonOnclick}
                    >
                        { intl.formatMessage({id: `${funType}.reset`, defaultMessage: 'Reset'}) }
                    </Button>
                </Box>
            </Popover>
        </Box>
    )
}

export default SwitchListButton