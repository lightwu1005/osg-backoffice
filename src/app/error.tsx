'use client'
import ErrorContent from "@/modules/components/general/ErrorContent";

/**
 * Please refer to App Router error handling:
 * https://nextjs.org/docs/app/building-your-application/routing/error-handling
 * */
export default function ErrorPage({error, reset}: {
    readonly error: Error & { digest?: string }
    readonly reset: () => void
}) {
    return (
        <ErrorContent error={error}/>
    )
}