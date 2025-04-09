import type {Metadata} from 'next'
import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter';
import LoggedInFrame from "@/modules/components/loggedInFrame/LoggedInFrame";
import ThemeWrapper from "@/app/ThemeWrapper";
import React, {Suspense} from "react";
import Loading from "@/app/loading";

export const metadata: Metadata = {
    title: `OllehSports ${process.env.FUNCTIONALITY} Management Background`,
    description: `${process.env.FUNCTIONALITY} Management Background`,
    icons: '/favicon.ico',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                <Suspense fallback={<Loading/>}>
                    <ThemeWrapper>
                        <LoggedInFrame>
                            <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
                        </LoggedInFrame>
                    </ThemeWrapper>
                </Suspense>
            </body>
        </html>
    )
}
