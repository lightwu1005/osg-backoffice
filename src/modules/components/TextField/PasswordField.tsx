import React, {useState, useCallback, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {RegexPatterns} from "@/modules/common/CommonRegexChecker";
import { Box } from '@mui/material';
import {debounce} from "lodash";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

export interface PasswordFieldProps {
    label: string;
    placeholder: string;
    name: string;
    value?: string;
    shouldAddErrorPending?: boolean
    handleChange?: (event: string) => void;
    handleBlur?: (value: string) => void;
    handleValidate?: (value: boolean) => void;
    errorMessage: string | React.ReactNode;
    showPassword: boolean;
    handleClickShowPassword: () => void;
    handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PasswordField = (props: PasswordFieldProps) => {
    const {
        label,
        placeholder,
        name,
        value: externalValue,
        handleChange,
        handleBlur,
        errorMessage,
        showPassword,
        handleValidate,
        handleClickShowPassword,
        handleMouseDownPassword,
        shouldAddErrorPending
    } = props
    const intl = useIntl();
    const funType = LocalizationFunctionType.Common;

    const validatePassword = useCallback((password: string) => {
        let errorMsg = '';

        if (!RegexPatterns.Password.test(password)) {
            errorMsg = intl.formatMessage({
                id: `${funType}.passwordRegError`,
                defaultMessage: 'Password must be 8-16 characters long, include uppercase and lowercase letters, and symbols.'
            });
        }

        return errorMsg;
    }, []);

    const [value, setValue] = useState(externalValue || '');
    const [error, setError] = useState<string | React.ReactNode>(errorMessage);
    const [showPasswordError, setShowPasswordError] = useState(false);

    const debouncedValidatePassword = useCallback(
        debounce((password: string) => {
            const validationError = validatePassword(password);
            setError(validationError);
        }, 500),
        [validatePassword]
    );

    useEffect(() => {
        if (externalValue !== undefined) {
            setValue(externalValue);
        }
    }, [externalValue]);

    useEffect(() => {
        if (value !== '') {
            debouncedValidatePassword(value);
        } else {
            setError('');
        }
    }, [value, debouncedValidatePassword]);

    useEffect(() => {
        setError(errorMessage);
    }, [errorMessage]);

    useEffect(() => {
        setShowPasswordError(Boolean(error));
        if (handleValidate) handleValidate(!Boolean(error));
    }, [error]);

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        setError('');
        if (handleChange) {
            handleChange(newValue);
        }
    };

    const handlePasswordBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (handleBlur) {
            handleBlur(newValue);
        }
    };

    return (
        <Box>
            <TextField
                className="Password Textfield"
                label={label}
                placeholder={placeholder}
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                name={name}
                value={value}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                error={showPasswordError}
                helperText={showPasswordError ? error : ''}
                sx={{
                    marginBottom: '32px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: showPasswordError ? '#f44336' : undefined,
                            borderWidth: showPasswordError ? 2 : 1,
                        },
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            {(showPasswordError && shouldAddErrorPending) && (
                <Box height={20} />
            )}
        </Box>
    );
};

export default PasswordField;
