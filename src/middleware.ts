// middleware.ts
import { redirecPages } from 'data/redirect_pages';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function middleware(req: NextRequest) {
    const { pathname, origin } = req.nextUrl;
    
    const redirectedProduct =  redirecPages.find((prod) => {
        return prod.url === pathname.toLowerCase();
    }); 
    console.log(pathname, "splited", redirectedProduct)
    if (redirectedProduct) {
        const redirectPath = redirectedProduct.redirectUrl == '/' ? '/' : redirectedProduct.redirectUrl;
        const absoluteUrl = new URL(redirectPath, origin);
        return NextResponse.redirect(absoluteUrl, 301);
    }


    return NextResponse.next();
}


export const config = {
    matcher: [
        '/((?!api|_next|.*\\.).+)',
    ],
};