'use client'
import ErrorContent from "@/modules/components/general/ErrorContent";

/**
 * Please refer to App Router Handling Errors in Root Layouts:
 * https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-errors-in-root-layouts
 * */
export default function GlobalError({error, reset}: {
    readonly error: Error & { digest?: string }
    readonly reset: () => void
}) {
    return (
        <html lang={'en'}>
            <body>
                <ErrorContent error={error}/>
            </body>
        </html>
    )
}