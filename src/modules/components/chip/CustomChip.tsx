import Chip, {ChipPropsVariantOverrides} from "@mui/material/Chip";
import React, {useEffect, useState} from "react";
import {darken, lighten, SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {OverridableStringUnion} from "@mui/types";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {ChipColor} from "@/modules/components/chip/MuiChipsStyled";
import {Property} from "csstype";
import {colorNameToHex, isValidColor} from "@/utils/tools";

interface CustomChipProps {
    sx?: SxProps<Theme>
    icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>
    variant?: OverridableStringUnion<"filled" | "outlined", ChipPropsVariantOverrides>
    label?: React.ReactNode
    color: Property.Color | ChipColor
    onClick?: (e: React.MouseEvent<HTMLElement>) => void
    shouldShowArrow?: boolean
    isArrowUpExternal?: boolean
}

interface ColorModel {
    textColor: string
    backgroundColor: string
}

interface ColorModels {
    light: ColorModel
    dark: ColorModel
}

interface RGB {
    r: number
    g: number
    b: number
}

interface HSV {
    h: number
    s: number
    v: number
}

export function CustomChip(props: CustomChipProps) {
    const [isArrowUp, setIsArrowUp] = useState(false)
    const [color, setColor] = useState<ColorModels>()
    const [isCustomColor, setIsCustomColor] = useState(false)
    const [isChipColor, setIsChipColor] = useState(false)

    useEffect(() => {
        if (typeof props.isArrowUpExternal === 'boolean') {
            setIsArrowUp(props.isArrowUpExternal)
        }
    }, [props.isArrowUpExternal])

    useEffect(() => {
        const isChipColor = Object.values(ChipColor).includes(props.color as ChipColor)
        if (isChipColor) {
            setIsChipColor(true)
            setIsCustomColor(false)
        } else {
            setIsChipColor(false)
            const _isValidColor = isValidColor(props.color)
            const hex = _isValidColor ? props.color : colorNameToHex(props.color)
            const isCustomColor = hex !== null
            setIsCustomColor(isCustomColor)
            if (isCustomColor) {
                setColor(getColors(hex ?? props.color))
            }
        }
    }, [props.color])

    const hexToRgb = (hex: string): RGB => {
        const trimmedHex = hex.replace('#', '')
        const bigint = parseInt(trimmedHex, 16)
        const r = (bigint >> 16) & 255
        const g = (bigint >> 8) & 255
        const b = bigint & 255
        return {r, g, b}
    }

    const rgbToHex = ({r, g, b}: RGB): string => {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`
    }

    const rgbToHsv = ({r, g, b}: RGB): HSV => {
        const rNorm = r / 255
        const gNorm = g / 255
        const bNorm = b / 255

        const max = Math.max(rNorm, gNorm, bNorm)
        const min = Math.min(rNorm, gNorm, bNorm)
        const delta = max - min

        let h = 0
        if (delta !== 0) {
            if (max === rNorm) {
                h = ((gNorm - bNorm) / delta) % 6
            } else if (max === gNorm) {
                h = (bNorm - rNorm) / delta + 2
            } else {
                h = (rNorm - gNorm) / delta + 4
            }
            h = Math.round(h * 60)
            if (h < 0) h += 360
        }

        const s = max === 0 ? 0 : delta / max
        const v = max

        return {h, s, v}
    }

    const hsvToRgb = ({h, s, v}: HSV): RGB => {
        const c = v * s
        const x = c * (1 - Math.abs((h / 60) % 2 - 1))
        const m = v - c

        let r = 0, g = 0, b = 0

        if (0 <= h && h < 60) {
            [r, g, b] = [c, x, 0]
        } else if (60 <= h && h < 120) {
            [r, g, b] = [x, c, 0]
        } else if (120 <= h && h < 180) {
            [r, g, b] = [0, c, x]
        } else if (180 <= h && h < 240) {
            [r, g, b] = [0, x, c]
        } else if (240 <= h && h < 300) {
            [r, g, b] = [x, 0, c]
        } else {
            [r, g, b] = [c, 0, x]
        }

        return {
            r: Math.round((r + m) * 255),
            g: Math.round((g + m) * 255),
            b: Math.round((b + m) * 255)
        }
    }

    const adjustBrightnessAndSaturation = (hex: string, isDarkMode: boolean): string => {
        const rgb = hexToRgb(hex)
        const hsv = rgbToHsv(rgb)

        if (isDarkMode) {
            const isOverDark = (rgb.b + rgb.g + rgb.r) < 200
            hsv.v = isOverDark ? Math.min(0.8, hsv.v + 0.3) : hsv.v * 0.5
            hsv.s = isOverDark ? Math.min(0.8, hsv.s * 0.5) : Math.min(1, hsv.s + 0.3)
        } else {
            const isOverBright = (rgb.b + rgb.g + rgb.r) > 500
            hsv.v = isOverBright ? hsv.v * 0.75 : Math.min(1, hsv.v + 0.3)
            hsv.h = isOverBright ? hsv.h + 10 : hsv.h
            hsv.s = hsv.s * 0.5
        }

        const adjustedRgb = hsvToRgb(hsv)
        return rgbToHex(adjustedRgb)
    }

    const getColors = (textColor: string) => {
        const lightBg = adjustBrightnessAndSaturation(textColor, false)
        const darkBg = adjustBrightnessAndSaturation(textColor, true)

        return {
            light: {
                textColor: textColor,
                backgroundColor: lightBg
            },
            dark: {
                textColor: textColor,
                backgroundColor: darkBg
            }
        }
    }

    const handleChipClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()

        if (props.onClick) {
            props.onClick(event)
        }

        if (props.shouldShowArrow) {
            setIsArrowUp((prev) => !prev)
        }
    }

    return (
        <Chip
            key={`chip-${props.label}`}
            icon={props.icon}
            variant={props.variant}
            {...(isChipColor ?
                    {className: props.color, sx: props.sx} :
                    {
                        ...(isCustomColor ?
                                {
                                    sx: {
                                        ...props.sx,
                                        fontWeight: 500,
                                        color: color?.light.textColor,
                                        backgroundColor: color?.light.backgroundColor,
                                        '&:hover': {
                                            backgroundColor: color?.light.backgroundColor ? darken(color.light.backgroundColor, 0.1) : undefined,
                                        },
                                        '[data-mui-color-scheme="dark"] &': {
                                            color: color?.dark.textColor,
                                            backgroundColor: color?.dark.backgroundColor,
                                            '&:hover': {
                                                backgroundColor: color?.light.backgroundColor ? lighten(color?.dark.backgroundColor, 0.1) : undefined,
                                            },
                                        },
                                    }
                                } :
                                {className: ChipColor.default, sx: props.sx}
                        )
                    }
            )}

            label={
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {props.label}
                    {props.shouldShowArrow && (
                        isArrowUp ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>
                    )}
                </div>
            }
            onClick={handleChipClick}
        />
    )
}
