"use client";
import * as React from 'react';
import {Button, Divider, Stack, TextField, Typography} from "@mui/material";
import Box from "@mui/system/Box";
import {grey} from "@mui/material/colors";
import {isValidEmail} from "@/modules/common/CommonRegexChecker";
import LoadingAnimation from "@/modules/components/general/LoadingAnimation";
import useLoginViewModel from "@/app/login/domain/useLoginViewModel";
import AuthLayoutFrame from "@/modules/components/general/AuthLayoutFrame";
import PageFramework from "@/modules/components/general/PageFramework";
import PasswordField from "@/modules/components/TextField/PasswordField";

const Page = () => {
    const {
        isLoading,
        formData,
        errorMessage,
        showEmailError,
        isSignInEnabled,
        handleSubmit,
        handleChange,
        handleBlur,
        handlePasswordValidation,
        handleForgetPassword,
        handleClickShowPassword,
        showPassword,
        handleMouseDownPassword,
        title,
        emailAddress,
        password,
        signIn,
        forgetPassword,
        invalidEmailAddress
    } = useLoginViewModel()

    return (
        <PageFramework>
            <AuthLayoutFrame>
                <Stack direction={'column'} width={'100%'} alignItems={'center'} spacing={1}>
                    <Typography variant={'h4'}>
                        {title}
                    </Typography>
                    <Divider flexItem/>
                </Stack>
                <Box height={4}/>
                <Stack spacing={2} sx={{width: '28.5rem'}}>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <TextField
                                className="Account Textfield"
                                label={emailAddress}
                                variant="outlined"
                                name="userAccount"
                                value={formData.userAccount}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    handleChange('userAccount')(value);
                                }}
                                onBlur={(event) => {
                                    const value = event.target.value;
                                    handleBlur('userAccount')(value);
                                }}
                                error={showEmailError || (!!errorMessage)}
                                helperText={(showEmailError) && invalidEmailAddress}
                                sx={{
                                    marginBottom: '35px',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: isValidEmail(formData.userAccount) ? '#2196F3' : undefined,
                                            borderWidth: isValidEmail(formData.userAccount) ? 2 : 1,
                                        },
                                    },
                                }}
                            />
                            <PasswordField
                                label={password}
                                placeholder=""
                                name="password"
                                handleChange={handleChange('password')}
                                handleBlur={handleBlur('password')}
                                handleValidate={handlePasswordValidation}
                                errorMessage={errorMessage}
                                shouldAddErrorPending={true}
                                showPassword={showPassword}
                                handleClickShowPassword={handleClickShowPassword}
                                handleMouseDownPassword={handleMouseDownPassword}
                            />
                            <Box height={2}/>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={!isSignInEnabled}
                                sx={{
                                    backgroundColor: isSignInEnabled ? '#2196F3' : grey["300"],
                                    color: isSignInEnabled ? "white" : "grey",
                                    textTransform: 'none'
                                }}
                            >
                                {signIn}
                            </Button>
                            <LoadingAnimation isLoading={isLoading}/>
                        </Box>
                    </form>
                    <Button variant={'text'} color={'secondary'} disableRipple onClick={handleForgetPassword}>
                        {forgetPassword}
                    </Button>
                </Stack>
            </AuthLayoutFrame>
        </PageFramework>
    );
};

export default Page;