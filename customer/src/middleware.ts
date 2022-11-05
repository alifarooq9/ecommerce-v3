import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // const session = await getServerAuthSession({req: req, res});
  const pathname = req.nextUrl.pathname;
  const url = req.nextUrl.origin;

  if (pathname.startsWith("/account") && !session) {
    return NextResponse.redirect(`${url}/auth/signin`);
  }

  if (pathname.startsWith("/auth") && session) {
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
