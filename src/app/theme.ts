'use client';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import '@fontsource/material-icons';
import {experimental_extendTheme as materialExtendTheme} from "@mui/material/styles";
import {MuiChipsVariants} from "@/modules/components/chip/MuiChipsStyled";

/**
 * Reference:
 * https://mui.com/material-ui/experimental-api/css-theme-variables
 * */
export const materialTheme = materialExtendTheme(
    {
        typography: {
            fontFamily: 'Inter, Roboto',
            h1: {
                fontSize: '2.125rem',
                fontWeight: 400,
                lineHeight: '123.5%',
                letterSpacing: '0.25px',
                wordWrap: 'break-word'
            },
            h2: {
                fontSize: '1.5rem',
                fontStyle: 'normal',
                fontWeight: 'bold',
                lineHeight: '155%',
            },
            h3: {
                fontSize: '1.5rem',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: '150%',
            },
            h4: {
                fontSize: '1.25rem',
                fontWeight: 600,
                lineHeight: '31px',
                wordWrap: 'break-word',
                minHeight: '31px'
            },
            h5: {
                fontSize: '1rem',
                fontWeight: 600,
                lineHeight: '22.72px',
            },
            h6: {
                fontSize: '1.25rem',
                fontWeight: 500,
                lineHeight: '2rem  ',
            },
            button: {
                fontSize: '0.875rem',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '170%',
            },
            body1: {
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: '150%',
                letterSpacing: '0.15px'
            },
            body2: {
                fontSize: '0.875rem',
                fontWeight: 400,
                lineHeight: '143%',
                letterSpacing: '0.01063rem'
            }
        },
        components: {
            MuiChip: {
                styleOverrides: {
                    root: {
                        height: '1.5rem',
                        '& .MuiChip-label': {
                            lineHeight: '1.5rem',
                        },
                    },
                },
                variants: MuiChipsVariants
            },
            MuiButton: {
                styleOverrides: {
                    root: ({theme}) => ({
                        ...{
                            borderRadius: '8px'
                        },
                    }),
                    text: {
                        boxShadow: 'none',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                        },
                        '&:active': {
                            boxShadow: 'none',
                            backgroundColor: 'transparent',
                        },
                        '&:focus': {
                            boxShadow: 'none',
                        },
                    }
                }
            },
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        borderRadius: '4px',
                        backgroundColor: 'rgba(99,107,116,0.8)',
                        color: '#FFFFFF',
                        fontSize: '1rem',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: '1.5rem'
                    },
                    arrow: {
                        color: 'rgba(99,107,116,0.8)',
                        fontSize: '0.875rem'
                    }
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        ...{
                            width: '100%',
                            '& .MuiInputBase-root': {
                                height: '100%',
                                borderWidth: '1px',
                                borderRadius: '8px',
                                boxShadow: '0px 1px 2px rgba(21, 21, 21, 0.08)'
                            },
                            '& .MuiOutlinedInput-input': {
                                height: 'calc(100% - 32px)'
                            },
                            "& .MuiOutlinedInput-root": {
                                '&:hover fieldset': {
                                    borderColor: theme.vars.palette.FilledInput.hoverBg,
                                    borderWidth: '2px',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#4393E4',
                                },
                                '&.Mui-error fieldset': {
                                    borderColor: theme.palette.error.main,
                                    borderWidth: '2px',
                                },
                            }
                        },
                    }),
                }
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        ...{
                            color: '#91979E',
                            '[data-mui-color-scheme="dark"] &': {
                                color: '#6A717A',
                            },
                            '&.Mui-focused': {
                                color: '#2196F3',
                            },
                            '&.Mui-error': {
                                color: theme.palette.error.main,
                            },
                        },
                    })
                }
            },
            MuiInputBase: {
                styleOverrides: {
                    input: {
                        '::placeholder': {
                            color: '#91979E',
                            '[data-mui-color-scheme="dark"] &': {
                                color: '#6A717A',
                            },
                            opacity: 1,
                        },
                    },
                }
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        ...{
                            borderWidth: '1px',
                            borderRadius: '8px',
                            borderColor: theme.vars.palette.FilledInput.hoverBg,
                            backgroundColor: theme.vars.palette.FilledInput.bg,
                            height: 52,
                            width: '100%',
                            "&:hover": {
                                borderWidth: '1px',
                            }
                        },
                    }),
                },
            },
            MuiAutocomplete: {
                styleOverrides: {
                    root: () => ({
                        ...{
                            width: '100%'
                        },
                    }),
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: ({theme}) => ({
                        ...{
                            backgroundImage: theme.vars.palette.background.paper,
                        },
                    }),
                },
            },
            MuiIcon: {
                styleOverrides: {
                    root: {
                        color: '#636B74',
                        '[data-mui-color-scheme="dark"] &': {
                            color: '#9FA6AD',
                        },
                    }
                }
            }
        },
        colorSchemes: {
            light: {
                palette: {
                    primary: {
                        main: '#2196F3',
                    },
                    secondary: {
                        main: '#32383E'
                    },
                    background: {
                        default: '#FFFFFF',
                        paper: '#FFFFFF',
                    },
                    FilledInput: {
                        bg: '#FBFCFE',
                        hoverBg: '#CDD7E1',
                    },
                    divider: '#636B7429',
                    Alert: {
                        successColor: '#0A470A',
                        successIconColor: '#0A470A',
                        successFilledBg: '#E3FBE3',
                        successFilledColor: '#E3FBE3',
                        successStandardBg: '#E3FBE3',
                        warningColor: '#492B08',
                        warningIconColor: '#492B08',
                        warningFilledBg: '#FDF0E1',
                        warningFilledColor: '#FDF0E1',
                        warningStandardBg: '#FDF0E1',
                        errorColor: '#C41C1C',
                        errorIconColor: '#C41C1C',
                        errorFilledBg: '#FCE4E4',
                        errorFilledColor: '#FCE4E4',
                        errorStandardBg: '#FCE4E4'
                    },
                    text: {
                        primary: '#171A1C',
                        secondary: '#32383E',
                        disabled: '#00000060',
                        secondaryChannel: '#555E68'
                    }
                }
            },
            dark: {
                palette: {
                    primary: {
                        main: '#2196F3',
                    },
                    secondary: {
                        main: '#DDE7EE'
                    },
                    background: {
                        default: '#060f17',
                        paper: '#030F1E',
                    },
                    FilledInput: {
                        bg: '#0a1625',
                        hoverBg: '#32383E',
                    },
                    divider: '#636B7450',
                    Alert: {
                        successColor: '#C7F7C7',
                        successIconColor: '#C7F7C7',
                        successFilledBg: '#0A470A',
                        successFilledColor: '#0A470A',
                        successStandardBg: '#0A470A',
                        warningColor: '#FCE1C2',
                        warningIconColor: '#FCE1C2',
                        warningFilledBg: '#72430D',
                        warningFilledColor: '#72430D',
                        warningStandardBg: '#72430D',
                        errorColor: '#F7C5C5',
                        errorIconColor: '#F7C5C5',
                        errorFilledBg: '#7D1212',
                        errorFilledColor: '#7D1212',
                        errorStandardBg: '#7D1212'
                    },
                    text: {
                        primary: '#F0F4F8',
                        secondary: '#CDD7E1',
                        disabled: '#FFFFFF99',
                        secondaryChannel: '#9FA6AD'
                    }
                },
            },
        },
    }
);