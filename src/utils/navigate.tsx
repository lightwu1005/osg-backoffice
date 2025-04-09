'use server'
import { redirect as nextRedirect } from 'next/navigation'
export async function redirect(path: string, parameters?: Record<string, any>) {
    const pathname = path.startsWith('/') ? path : `/${path}`
    let params: string[] = []
    if (parameters) {
        for(let p of Object.keys(parameters)) {
            params.push(`${p}=${parameters[p]}`)
        }
    }

    nextRedirect(`${pathname}${params ? `?${params.join('&')}` : '' }`)
}