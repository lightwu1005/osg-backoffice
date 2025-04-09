// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import PermissionHandler from "@/modules/common/PermissionHandler";
import {getCombineSplitStringsFromCookie} from "@/services/@core/module/LongTokenHandler";
import {Functionality} from "@/services/@core/module/Enum";

export function middleware(request: NextRequest) {
    const authToken = getCombineSplitStringsFromCookie('a', request);
    const functionality = process.env.FUNCTIONALITY ?? '';
    const {isAccessAble} = PermissionHandler();
    const url = request.nextUrl.clone();
    const {pathname, searchParams} = url;

    function getLoginPath(): string {
        const loginQuery = request.cookies.get('c')?.value ?? undefined;
        if (functionality !== Functionality.Admin && loginQuery && loginQuery !== 'undefined') {
            return `/login?c=${loginQuery}`
        } else {
            return '/login'
        }
    }

    if (pathname.startsWith('/health')) {
        return new Response('Application is running', { status: 200 });
    }
    if (pathname.startsWith('/_next/') ||
        pathname.startsWith('/static/') ||
        pathname.includes('.') ||
        pathname.startsWith('/login') ||
        pathname.startsWith('/forgetPassword')) {
        return NextResponse.next();
    }
    if (pathname.startsWith('/changePassword') ||
        pathname.startsWith('/emailVerification')) {
        if (!searchParams.has('token')) {
            return NextResponse.redirect(new URL(getLoginPath(), request.url));
        }
        return NextResponse.next();
    }

    if (!authToken || authToken === '') {
        return NextResponse.redirect(new URL(getLoginPath(), request.url));
    } else {
        if (pathname === '/') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        const pageName = pathname.split('/')[1];
        if (!isAccessAble(functionality, pageName)) {
            return NextResponse.rewrite(new URL('/not-found', request.url));
        }
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        '/((?!_next/static|favicon.ico|login|forgetPassword|logo.svg).*)',
        '/changePassword',
        '/emailVerification'
    ],
};