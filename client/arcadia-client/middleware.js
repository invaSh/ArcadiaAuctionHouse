
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const loginUrl = "/api/auth/signin";
  const url = req.nextUrl.clone();
  if (token) {
    if (token.roles === "Admin" || token.roles === "Employee") {
      if (!url.pathname.startsWith("/admin")) {
        url.pathname = "/admin";
        return NextResponse.redirect(url);
      }
    } else if (token.roles === "User") {
      if (url.pathname.startsWith("/admin")) {
        url.pathname = "/unauthorized";
        return NextResponse.redirect(url);
      }
    }
  } else {
    if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/user/items")) {
      url.pathname = loginUrl;
      url.searchParams.set("callbackUrl", req.nextUrl.href);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/user/:path*", "/admin/:path*"],
};
