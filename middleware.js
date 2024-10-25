import { NextResponse } from "next/server";

export function middleware(request) {
  const respone = NextResponse.next();

  respone.headers.set('Access-Control-Allow-Origin', '*');
  respone.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,  OPTIONS');
  respone.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return respone;
}

export const config = {
  matcher: '/api/:path*',
}
