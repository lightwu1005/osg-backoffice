"use client";
import Box from "@mui/system/Box";
import {Button, Typography} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import ChangePassword from "@/app/changePassword/page";
import AuthLayoutFrame from "@/modules/components/general/AuthLayoutFrame";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

function Page() {
    const [clicked, setClicked] = useState<boolean>(false)
    const intl = useIntl();
    const funType = LocalizationFunctionType.EmailVerification;

    return (!clicked ?
        <AuthLayoutFrame>
            <Box sx={{width: '100%', textAlign: 'center'}}>
                <Typography variant="h4" style={{margin: '1.25rem 0'}}>
                    {
                        intl.formatMessage({
                            id: `${funType}.title`,
                            defaultMessage: 'Welcome to OllehSports!'
                        })
                    }
                    <br/>
                    {
                        intl.formatMessage({
                            id: `${funType}.subTitle`,
                            defaultMessage: 'Woo hoo~ Your Account is active'
                        })
                    }
                </Typography>
                <Button
                    onClick={() => {
                        setClicked(true)
                    }}
                    type="submit"
                    variant="contained"
                    sx={{
                        backgroundColor: "#2196F3",
                        color: "white",
                        width: "max-content"
                    }}
                >
                    {intl.formatMessage({id: `${funType}.setYourPassword`, defaultMessage: 'Set Your Password'})}
                </Button>
            </Box>
        </AuthLayoutFrame>
        : <ChangePassword params={{ isResetPassword: true }} />
    )
}

export default Page