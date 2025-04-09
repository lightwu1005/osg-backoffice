"use client";
import * as React from "react";
import {Button, Divider, Stack, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import LoadingAnimation from "@/modules/components/general/LoadingAnimation";
import Box from "@mui/system/Box";
import useChangePasswordViewModel from "@/app/changePassword/domain/useChangePasswordViewModel";
import AuthLayoutFrame from "@/modules/components/general/AuthLayoutFrame";
import PageFramework from "@/modules/components/general/PageFramework";
import PasswordField from "@/modules/components/TextField/PasswordField";

export interface ChangePasswordFormData {
    password?: string;
    confirmPassword?: string;
}

interface PageProps {
    params: { isResetPassword: boolean | undefined };
}

function Page({params}: PageProps) {
    const {
        isLoading,
        confirmPasswordErrorMessage,
        isChangePasswordEnabled,
        handleChange,
        handlePasswordValidation,
        handleSubmit,
        showPassword,
        showConfirmPassword,
        handleMouseDownPassword,
        handleClickShowPassword,
        title,
        yourPassword,
        confirmPassword,
        setPassword
    } = useChangePasswordViewModel(params.isResetPassword ?? false)

    return (
        <PageFramework>
            <AuthLayoutFrame>
                <Stack direction={'column'} width={'100%'} alignItems={'center'} spacing={1}>
                    <Typography variant="h4">
                        {title}
                    </Typography>
                    <Divider flexItem/>
                </Stack>
                <Box height={4}/>
                <Stack sx={{width: '28.5rem'}}>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <PasswordField
                                label={yourPassword}
                                placeholder={yourPassword}
                                name="password"
                                handleChange={handleChange('password')}
                                handleBlur={handleChange('password')}
                                handleValidate={handlePasswordValidation('password')}
                                errorMessage={''}
                                shouldAddErrorPending={true}
                                showPassword={showPassword}
                                handleClickShowPassword={() => handleClickShowPassword('password')}
                                handleMouseDownPassword={handleMouseDownPassword}
                            />
                            <PasswordField
                                label={confirmPassword}
                                placeholder={confirmPassword}
                                name="confirmPassword"
                                handleChange={handleChange('confirmPassword')}
                                handleBlur={handleChange('confirmPassword')}
                                handleValidate={handlePasswordValidation('confirmPassword')}
                                errorMessage={confirmPasswordErrorMessage}
                                shouldAddErrorPending={true}
                                showPassword={showConfirmPassword}
                                handleClickShowPassword={() => handleClickShowPassword('confirmPassword')}
                                handleMouseDownPassword={handleMouseDownPassword}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={!isChangePasswordEnabled}
                                sx={{
                                    backgroundColor: isChangePasswordEnabled ? '#2196F3' : grey["300"],
                                    color: isChangePasswordEnabled ? "white" : "grey",
                                    textTransform: 'none'
                                }}
                            >
                                {setPassword}
                            </Button>
                            <LoadingAnimation isLoading={isLoading}/>
                        </Box>
                    </form>
                </Stack>
            </AuthLayoutFrame>
        </PageFramework>
    )
}

export default Page