import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import GetUserCookie from "./components/GetUserCookie/GetUserCookie";

export async function middleware(request){
    const user = await GetUserCookie();
    const token = (await cookies()).get('token')?.value;
    const email = (await cookies()).get('email')?.value;
    // return to same page
    const referer = request.headers.get('referer'); 
    const { pathname } = request.nextUrl;

    if(!(token || email) && pathname.startsWith('/verify')){
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }    

    if( user && user.email_verified_at && (pathname.startsWith('/login') || pathname.startsWith('/verify') || pathname.startsWith('/register'))){
        const response =  NextResponse.redirect(new URL(referer, request.nextUrl));
        response.cookies.set('message', 'You Are Logged In');
        return response;
    }

     if(!user && (pathname.startsWith('/create') || pathname.startsWith('/profile') ||
        pathname.startsWith('/categories/create') || pathname.startsWith('/subcategories/create') ||
        pathname.startsWith('/brands/create') 
    )){
        const response =  NextResponse.redirect(new URL('/', request.nextUrl));
        response.cookies.set('message', 'You Are Loged Out');
        return response;
    }

    if(!user && user.role !== 'admin' && pathname === '/users'){
        const response = NextResponse.redirect(new URL('/', request.nextUrl));
        response.cookies.set('message', 'You Are Not Admin');
        return response;
    }
    
    return NextResponse.next();
}

export const config = {
    matcher : ['/login:path*', '/verify:path*', '/register:path*', '/create:path*', '/users:path*', '/profile:path*', '/brands/create', '/categories/create', '/subcategories/create']
}