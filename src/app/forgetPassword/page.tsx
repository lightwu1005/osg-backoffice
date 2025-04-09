"use client";
import Box from "@mui/system/Box";
import {Divider, Stack, TextField, Typography} from "@mui/material";
import * as React from "react";
import {isValidEmail} from "@/modules/common/CommonRegexChecker";
import LoadingButton from "@mui/lab/LoadingButton";
import {grey} from "@mui/material/colors";
import AuthLayoutFrame from "@/modules/components/general/AuthLayoutFrame";
import useForgetPasswordViewModel from "@/app/forgetPassword/domain/useForgetPasswordViewModel";
import PageFramework from "@/modules/components/general/PageFramework";

const CheckEmail: React.FC = () => {
    const {
        loading,
        email,
        errorMessage,
        isSendEmailEnabled,
        showEmailError,
        handleChange,
        handleBlur,
        isActive,
        sendEmail,
        emailAddress,
        sendAgainInSeconds,
        sendEmailText,
        helperText
    } = useForgetPasswordViewModel()

    return (
        <PageFramework>
            <Stack spacing={2} sx={{width: '100%'}}>
                <form onSubmit={sendEmail}>
                    <Stack spacing={4}>
                        <TextField
                            data-testid={"email"}
                            type="email"
                            className="Account Textfield"
                            label={emailAddress}
                            variant="outlined"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={showEmailError || (!!errorMessage)}
                            helperText={(showEmailError) && helperText}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: isValidEmail(email) ? '#2196F3' : undefined,
                                        borderWidth: isValidEmail(email) ? 2 : 1,
                                    },
                                },
                            }}
                        />
                        <LoadingButton
                            data-testid={"submit"}
                            type="submit"
                            variant="contained"
                            disabled={!isSendEmailEnabled}
                            loading={loading}
                            loadingPosition="center"
                            sx={{
                                backgroundColor: isSendEmailEnabled ? '#2196F3' : grey["300"],
                                color: isSendEmailEnabled ? "white" : "grey",
                                textTransform: 'none'
                            }}
                        >
                            { isActive ? sendAgainInSeconds : sendEmailText }
                        </LoadingButton>
                    </Stack>
                </form>
            </Stack>
        </PageFramework>
    )
}

function Page() {
    const {title} = useForgetPasswordViewModel()

    return (
        <AuthLayoutFrame>
            <Stack direction={'column'} width={'100%'} alignItems={'center'} spacing={1}>
                <Typography variant="h6" style={{fontFamily: 'Inter', fontWeight: 600}}>
                    {title}
                </Typography>
                <Divider flexItem/>
            </Stack>
            <Box height={4}/>
            <CheckEmail/>
        </AuthLayoutFrame>
    )
}

export default Page