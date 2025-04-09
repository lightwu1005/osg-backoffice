import {ComponentsPropsList, CssVarsTheme, Interpolation, Theme} from "@mui/material/styles";

export enum ChipColor {
    default = 'default',
    green = 'chip-green',
    blue = 'chip-blue',
    yellow = 'chip-yellow',
    brown = 'chip-brown',
    lightBrown = 'chip-lightBrown',
    red = 'chip-red',
    grey = 'chip-grey',
    black = 'chip-black',
    greyBlue = 'chip-greyBlue',
    lightBlue = 'chip-lightBlue',
    pink = 'chip-pink'
}

interface MuiChipsVariant {
    props: Partial<ComponentsPropsList["MuiChip"]>
    style: Interpolation<{theme: Omit<Theme, "components" | "palette"> & CssVarsTheme}>
}

const createChipStyle = (
    backgroundColor: string,
    color: string,
    darkModeBgColor?: string,
    darkModeColor?: string
): Interpolation<{theme: Omit<Theme, "components" | "palette"> & CssVarsTheme}> => ({
    backgroundColor,
    color,
    '[data-mui-color-scheme="dark"] &': {
        backgroundColor: darkModeBgColor ?? backgroundColor,
        color: darkModeColor ?? color,
    },
});

const createMuiChipsVariant = (color: ChipColor): MuiChipsVariant => {
    const getStyle = () => {
        switch (color) {
            case ChipColor.green:
                return createChipStyle('#C7F7C7', '#1F7A1F', '#0A470A', '#C7F7C7');
            case ChipColor.blue:
                return createChipStyle('#C7DFF7', '#0B6BCB', '#185EA5', '#E3EFFB');
            case ChipColor.yellow:
                return createChipStyle('#FDF0E1', '#9A5B13', '#72430D', '#FDF0E1');
            case ChipColor.brown:
                return createChipStyle('#F3C896', '#9A5B13', '#72430D', '#FDF0E1');
            case ChipColor.lightBrown:
                return createChipStyle('#FDF0E1', '#9A5B13', '#9A5B13', '#FFFFFF');
            case ChipColor.red:
                return createChipStyle('#D32F2F4D', '#D32F2F', '#7D1212', '#F7C5C5');
            case ChipColor.greyBlue:
                return createChipStyle('#F0F4F8', '#32383E', '#555E68', '#FBFCFE');
            case ChipColor.lightBlue:
                return createChipStyle('#E3EFFB', '#12467B', '#0A2744', '#C7DFF7');
            case ChipColor.pink:
                return createChipStyle('#FFD4DF', '#E91E63', '#C2185B', '#FCE4EC');
            case ChipColor.grey:
                return createChipStyle('#FFFFFFF5', '#32383E');
            case ChipColor.black:
                return createChipStyle('#00000014', '#000000DE');
            default:
                return createChipStyle('rgba(0, 0, 0, 0.08)', 'rgba(0, 0, 0, 0.87)',
                        'rgba(255, 255, 255, 0.16)', '#FFFFFF');
        }
    }

    return {
        props: { className: color },
        style: getStyle
    }
}

export const MuiChipsVariants: MuiChipsVariant[] = [
    createMuiChipsVariant(ChipColor.default),
    createMuiChipsVariant(ChipColor.green),
    createMuiChipsVariant(ChipColor.blue),
    createMuiChipsVariant(ChipColor.yellow),
    createMuiChipsVariant(ChipColor.brown),
    createMuiChipsVariant(ChipColor.lightBrown),
    createMuiChipsVariant(ChipColor.red),
    createMuiChipsVariant(ChipColor.grey),
    createMuiChipsVariant(ChipColor.black),
    createMuiChipsVariant(ChipColor.lightBlue),
    createMuiChipsVariant(ChipColor.greyBlue),
    createMuiChipsVariant(ChipColor.pink)
];