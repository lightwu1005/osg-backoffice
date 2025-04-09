'use client'
import {Box, Button, Typography} from '@mui/material';
import Image from 'next/image'
import React, {useMemo} from "react";
import {isApiError} from "@/services/@core/ApiErrorHandle";

export interface ErrorContentProps {
    error?: Error & { digest?: string }
}

interface Content {
    imagePath: string
    imageAlt: string
    message: string
    button: React.ReactNode
}

export default function ErrorContent({error}: ErrorContentProps) {

    const content = useMemo((): Content => {
        let contentData: Content
        if (isApiError(error)) {
            switch (error.status) {
                case 404:
                    contentData = {
                        imagePath: '/error/error-404.svg',
                        imageAlt: "Something went wrong",
                        message: "Something went wrong!",
                        button: <Button variant='contained' onClick={() => window.location.reload()}>Try again</Button>
                    }
                    break
                case 500:
                    contentData = {
                        imagePath: '/error/error-500.svg',
                        imageAlt: "Something went wrong",
                        message: "Something went wrong!",
                        button: <Button variant='contained' onClick={() => window.location.reload()}>Try again</Button>
                    }
                    break
                default:
                    contentData = {
                        imagePath: '/error/error-unknown.svg',
                        imageAlt: "Something went wrong",
                        message: "Something went wrong!",
                        button: <Button variant='contained' onClick={() => window.location.reload()}>Try again</Button>
                    }
                    break
            }
        } else {
            contentData = {
                imagePath: '/error/error-404.svg',
                imageAlt: "Page Not found",
                message: "Oops! Page not found!",
                button: <Button variant='contained' href={'/'}>Take Me Home</Button>
            }
        }
        return contentData
    }, [error]);

    return (
        <Box component="main" sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}>
            <Image width={480} height={500} src={content.imagePath} alt={content.imageAlt}/>
            <Typography variant='body2'>{content.message}</Typography>
            <Box height={12}/>
            {content.button}
        </Box>
    );
}