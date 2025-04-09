"use client";
// MicrosoftLoginButton.tsx
import React, {useCallback, useEffect, useState} from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest, silentRequest } from "@/app/login/config/authConfig";
import { Button } from "@mui/material";
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import Box from "@mui/system/Box";
import { grey } from "@mui/material/colors";
import {redirect} from "@/utils/navigate";
import {datadogLogs} from "@/config/Datadog";

interface MicrosoftLoginButtonProps {
    onAccessTokenChange?: (newAccessToken?: string, account?: string) => void;
}

const MicrosoftLoginButton: React.FC<MicrosoftLoginButtonProps> = ({ onAccessTokenChange }) => {
    const { instance, accounts } = useMsal();
    const [loggedIn, setLoggedIn] = useState(accounts.length > 0);

    const handleLogin = async () => {
        console.log('account: ', accounts)
        try {
            // Use MSAL instance to initiate login
            await instance.loginRedirect(loginRequest);
            await handleAcquireToken();
        } catch (error: any) {
            // Handle user_cancelled error (if needed)
            if (error.errorMessage === 'user_cancelled') {
                console.log('User cancelled the flow.');
            } else {
                // Handle other errors
                console.error('Error during login:', error);
                datadogLogs.logger.error('Error during login', {}, error instanceof Error ? error : new Error(String(error)));
            }
        }
    };

    const handleAcquireToken = async () => {
        try {
            const tokenResponse = await instance.acquireTokenSilent({
                scopes: silentRequest.scopes,
                account: accounts[0],
            });
            if (tokenResponse && tokenResponse.accessToken) {
                console.log('AcquireToken response: ', tokenResponse)
                onAccessTokenChange?.(tokenResponse.accessToken, tokenResponse.account.username);
            } else {
                console.error('Token response is undefined');
                datadogLogs.logger.error('Token response is undefined', {tokenResponse: tokenResponse}, new Error('Token response is undefined'));
            }
        } catch (error: any) {
            console.error('Token acquisition error:', error);
            datadogLogs.logger.error('Token acquisition error', {}, error instanceof Error ? error : new Error(String(error)));
        }
    };

    const handleLogout = async () => {
        try {
            await instance.logoutPopup({account: accounts[0]});
            await redirect('/login')
        } catch (error) {
            console.error('Logout error:', error);
            datadogLogs.logger.error('Logout error', {}, error instanceof Error ? error : new Error(String(error)));
        }
    };

    const handleAccessTokenChange = useCallback((newAccessToken?: string, account?: string) => {
        if (onAccessTokenChange) {
            onAccessTokenChange(newAccessToken, account);
        }
    },[onAccessTokenChange]);

    useEffect(() => {
        if (accounts.length > 0 && !loggedIn) {
            console.log("Acquiring token...");
            handleAcquireToken();
            setLoggedIn(true);
        } else if (accounts.length === 0 && loggedIn) {
            console.log("No accounts, handling token change...");
            handleAccessTokenChange();
            setLoggedIn(false);
        }
    }, [accounts, loggedIn, handleAcquireToken, handleAccessTokenChange]);

    return (
        <Box>
            {accounts.length > 0 ? (
                <div>
                    <p>Welcome, {accounts[0].name}</p>
                    <Button
                        className="logoutButton"
                        style={{ textTransform: 'none' }}
                        variant="contained"
                        startIcon={<MicrosoftIcon />}
                        onClick={handleLogout}
                    >
                        Logout Microsoft Account
                    </Button>
                </div>
            ) : (
                <Button
                    className="loginButton"
                    style={{
                        width: '100%',
                        height: '2.5rem',
                        backgroundColor: grey["300"],
                        color: "black",
                        textTransform: 'none'
                    }}
                    variant="contained"
                    startIcon={<img src='/logo/MSLogo.svg' alt="MSLogo"/>}
                    onClick={handleLogin}
                >
                </Button>
            )}
        </Box>
    );
};

export default MicrosoftLoginButton;
