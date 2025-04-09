"use client";
import * as React from 'react';
import {ReactNode} from 'react';
import {
    Container,
    Stack,
} from "@mui/material";
import Box from "@mui/system/Box";

function AuthLayoutFrame({children}: { children: ReactNode }) {
    return (
        <Container component="main">
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}>
                <Stack
                    direction={'column'}
                    gap={2}
                    spacing={1}
                    sx={{
                        minWidth: '55%',
                        height: '100vh',
                        padding: 12,
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'inline-flex'
                    }}
                >
                    <Stack direction={'column'} spacing={2} alignItems={'center'}>
                        <Box
                            component="img"
                            alt="OllehSports"
                            src='/logo/bigLogo.svg'
                        />
                    </Stack>
                    {children}
                </Stack>
            </Box>
        </Container>
    )
}

export default AuthLayoutFrame;