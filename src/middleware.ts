import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Se for a raiz, redireciona para mar2601
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/mar2601', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/'],
};
