// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSingleRedirectUrl } from 'utils/fetch';


export async function middleware(req: NextRequest) {
    const { pathname, origin } = req.nextUrl;


    let redirectedProduct = await getSingleRedirectUrl(pathname.replace(/^\/+|\/+$/g, ''))
    console.log(redirectedProduct, "urls")
 
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