// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Define paths that require authentication
const protectedRoutes = ["/"];

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Check if the route is protected and user is not authenticated
  if (protectedRoutes.includes(pathname) && !token) {
    // Redirect to login page if not authenticated
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow access to public routes or authenticated users
  return NextResponse.next();
}

// Apply middleware to the entire app
export const config = {
//   matcher: ["/", "/dashboard/:path*"], // Adjust paths as needed
  matcher: ["/"], // Adjust paths as needed
};
