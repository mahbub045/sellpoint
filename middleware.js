// This middleware logs each request's pathname and continues the request.
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("Token in middleware:", token);
  const isAuthPage = request.nextUrl.pathname.startsWith("/login");

  // If user is not authenticated and not on login/signup, redirect to login
  if (!token && !isAuthPage) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

// Apply middleware only to admin/* and user/* routes
export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
