import {Circle, ColorizeRounded, KeyboardArrowDownRounded, TuneRounded} from "@mui/icons-material";
import {Box, Button, Divider, IconButton, InputAdornment, Paper, Stack, TextField, Typography} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import {Dispatch, FC, HTMLAttributes, Key, ReactNode, SetStateAction, useEffect, useState} from "react";
import {ColorPicker} from "@/modules/components/colorSelector/ColorPicker";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import { datadogLogs } from "@/config/Datadog";

export interface ColorSelectorProps {
    defaultColor?: string
    onSelected: (color: string) => void
}

export interface ColorProps {
    key: string
    label: string
    color: string
}

interface PaperComponentProps {
    children?: ReactNode;
    setOpenColorPicker: Dispatch<SetStateAction<boolean>>;
    translateText: (key: string, label: string) => string;
}

const PaperComponent: FC<PaperComponentProps> = ({children, setOpenColorPicker, translateText }) => {
    return (
        <Paper>
            {children}
            <Divider/>
            <Button
                key={"add-new-color"}
                variant={"text"}
                color="secondary"
                fullWidth
                sx={{justifyContent: "flex-start", paddingX: 2, paddingY: 1}}
                onMouseDown={() => setOpenColorPicker(true)}
            >
                <Stack key={"key"} spacing={1} direction={"row"}>
                    <ColorizeRounded sx={{fontSize: 20}}/>
                    <Typography>{translateText('customColor', 'Custom Color')}</Typography>
                </Stack>
            </Button>
        </Paper>
    )
};

export default function ColorSelector({defaultColor, onSelected}: Readonly<ColorSelectorProps>) {
    const [openColorPicker, setOpenColorPicker] = useState(false);
    const [pickerColor, setPickerColor] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<ColorProps | null>(null);
    const [customColors, setCustomColors] = useState<ColorProps[]>([]);

    const intl = useIntl();
    const funType = `${LocalizationFunctionType.Common}.colorSelector`;
    const translateText = (key: string, label: string) => intl.formatMessage({ id: `${funType}.${key}`, defaultMessage: label });
    const defaultColors: ColorProps[] = [
        { key: 'gray', label: translateText('gray', 'Gray'), color: '#9FA6AD' },
        { key: 'red', label: translateText('red', 'Red'), color: '#D32F2F' },
        { key: 'orange', label: translateText('orange', 'Orange'), color: '#EA9A3E' },
        { key: 'brown', label: translateText('brown', 'Brown'), color: '#9A5B13' },
        { key: 'green', label: translateText('green', 'Green'), color: '#1F7A1F' },
        { key: 'blue', label: translateText('blue', 'Blue'), color: '#0B6BCB' },
        { key: 'darkIndigo', label: translateText('darkIndigo', 'Dark Indigo'), color: '#12467B' },
        { key: 'purple', label: translateText('purple', 'Purple'), color: '#784AF2' }
    ]

    const totalColors = [...defaultColors, ...customColors];
    const uniqueColors = totalColors.filter((color, index, self) =>
        index === self.findIndex((c) => c.color === color.color)
    );

    // initial customColors from localStorage
    useEffect(() => {
        const storedCustomColors = localStorage.getItem("color-selector-custom");
        if (storedCustomColors) {
            try {
                const parsedColors = JSON.parse(storedCustomColors);
                if (Array.isArray(parsedColors)) {
                    setCustomColors(parsedColors);
                }
            } catch (error) {
                console.error("Error parsing custom colors from localStorage:", error);
                datadogLogs.logger.error("Error parsing custom colors from localStorage", {}, error instanceof Error ? error : new Error(String(error)));
            }
        }
    }, []);

    // set defaultColor
    useEffect(() => {
        if (defaultColor) {
            const isColorPresent = uniqueColors.some((color) => color.color === defaultColor);
            if (!isColorPresent) {
                const newColor = { key: defaultColor, label: defaultColor, color: defaultColor };
                setCustomColors(prevColors => {
                    const updatedColors = [...prevColors, newColor];
                    const defaultColorOption = updatedColors.find((color) => color.color === defaultColor);
                    setSelectedColor(defaultColorOption ?? null);
                    return updatedColors;
                });
            } else {
                const defaultColorOption = uniqueColors.find((color) => color.color === defaultColor);
                setSelectedColor(defaultColorOption ?? null);
            }
        }
    }, [defaultColor]);

    // Save customColors to localStorage when it changes
    useEffect(() => {
        if (customColors.length > 0) {
            try {
                localStorage.setItem("color-selector-custom", JSON.stringify(customColors));
            } catch (error) {
                console.error("Error saving custom colors to localStorage:", error);
                datadogLogs.logger.error("Error saving custom colors to localStorage", {}, error instanceof Error ? error : new Error(String(error)));
            }
        }
    }, [customColors]);

    const handleChange = (_: any, newValue: ColorProps | null) => {
        setSelectedColor(newValue);
        if (newValue) {
            onSelected(newValue.color);
        }
    };

    const handleColorPickerSave = (newColor: string) => {
        const newOption: ColorProps = {
            key: newColor,
            label: newColor,
            color: newColor
        };

        // if pickerColor is set, update the existing color
        if (pickerColor) {
            setCustomColors(prevColors =>
                prevColors.map((color) => {
                    if (color.color === pickerColor) {
                        return newOption;
                    }
                    return color;
                })
            );
        } else if (!customColors.some(existingColor => existingColor.color === newColor)) {
            setCustomColors(prevColors => [...prevColors, newOption]);
        }

        setSelectedColor(newOption);
        onSelected(newOption.color);
        setOpenColorPicker(false);
        setPickerColor(null);
    }

    const openColorPickerForEdit = (color: string) => {
        setPickerColor(color);
        setOpenColorPicker(true);
    };

    return (
        <Box>
            <Autocomplete
                id="color-selector"
                options={uniqueColors}
                autoHighlight
                popupIcon={<KeyboardArrowDownRounded/>}
                getOptionLabel={(option) => option.label}
                clearIcon={null}
                renderOption={(props, option) => {
                    const {key, ...otherProps} = props as HTMLAttributes<HTMLLIElement> & { key: Key };
                    return (
                        <Stack
                            key={key}
                            direction={'row'}
                            spacing={1}
                            component="li"
                            alignItems={'center'}
                            {...otherProps}
                        >
                            <Circle sx={{ fontSize: 20, color: option.color}}/>
                            <Typography flexGrow={1}>{option.label}</Typography>
                            {
                                // only custom colors can be edited
                                !defaultColors.map(item => item.color).includes(option.color) &&
                                <IconButton
                                    id={`edit-color-button-${option.label}`}
                                    sx={{ fill: 'text.primary', textAlign: "flex-end" }}
                                    onClick={() => {
                                        openColorPickerForEdit(option.color);
                                    }}
                                >
                                    <TuneRounded sx={{fontSize: 20}}/>
                                </IconButton>
                            }
                        </Stack>
                    );
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={translateText('chooseAColor', 'Choose a color')}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: selectedColor ? (
                                <InputAdornment position="end">
                                    <Circle sx={{ fontSize: 20, color: selectedColor?.color }} />
                                </InputAdornment>
                            ) : null
                        }}
                    />
                )}
                PaperComponent={(props) =>
                    <PaperComponent setOpenColorPicker={setOpenColorPicker} translateText={translateText} {...props} />}
                value={selectedColor}
                onChange={handleChange}
            />
            <ColorPicker
                defaultColor={pickerColor}
                open={openColorPicker}
                setOpen={(value) => setOpenColorPicker(value)}
                onSave={handleColorPickerSave}
            />
        </Box>
    );
};