// Middleware for admin routes
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Allow all admin routes through - auth is checked client-side
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
