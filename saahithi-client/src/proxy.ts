import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * 1. Centralized Route Configuration
 * Makes it easy to update access rules without hunting through logic.
 */
const ROUTES = {
  AUTH: ["/login", "/register"],
  PROTECTED: ["/profile", "/settings"],
  AUTHOR_ONLY: ["/editor", "/drafts"],
  PUBLIC: ["/", "/about"],
};

// Mock function: Replace this with your actual JWT verification logic (e.g., using 'jose')
async function getValidatedSession(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  if (!token) return null;

  try {
    // In production, verify the JWT signature here!
    // For now, we'll assume it returns the user object.
    return { role: "author" }; // Example payload
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const session = await getValidatedSession(request);

  // --- LOGIC 1: AUTHENTICATED USERS vs AUTH PAGES ---
  // Redirect logged-in users away from /login or /register
  if (session && ROUTES.AUTH.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // --- LOGIC 2: ROLE-BASED ACCESS CONTROL (RBAC) ---
  // Author-only check
  if (ROUTES.AUTHOR_ONLY.some((path) => pathname.startsWith(path))) {
    if (session?.role !== "author") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // --- LOGIC 3: PROTECTED ROUTES vs GUESTS ---
  const isProtectedRoute = [...ROUTES.PROTECTED, ...ROUTES.AUTHOR_ONLY].some(
    (path) => pathname.startsWith(path),
  );

  if (!session && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
