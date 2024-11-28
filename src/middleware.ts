import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Main middleware function combining both logic
export function middleware(req: NextRequest) {
  const cookieLocale =
    req.cookies.get("NEXT_LOCALE")?.value || routing.defaultLocale;
  const urlLocale = req.nextUrl.locale || routing.defaultLocale; // Default to "ar" if no locale in the URL
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;
  console.log("cookieLocale:", cookieLocale);
  console.log("urlLocale:", urlLocale);
  console.log("pathname:", pathname);

  // Ensure consistency between URL locale and cookie locale
  if (cookieLocale !== urlLocale) {
    const res = NextResponse.next();
    res.cookies.set("NEXT_LOCALE", urlLocale);
  }

  // If no locale in the URL, redirect to the default "ar" locale
  if (!urlLocale || urlLocale === "") {
    const url = req.nextUrl.clone();
    url.locale = routing.defaultLocale;
    return NextResponse.redirect(url);
  }

  // Set locale from cookies if it exists, otherwise fallback to URL locale
  const locale = cookieLocale || urlLocale;
  console.log("locale cookieLocale ", cookieLocale);
  console.log("locale urlLocale ", urlLocale);
  console.log("locale locale ", locale);
  // If locale is not in the cookies, set it
  if (!cookieLocale) {
    const res = NextResponse.next();
    res.cookies.set("NEXT_LOCALE", routing.defaultLocale);
    return res;
  }
  console.log("cookieLocale:1", cookieLocale);
  console.log("urlLocale:1", urlLocale);

  // Restrict access to profile page if no token
  if (!token && pathname === `/${locale}/Profile`) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/signUp`; // Redirect to signUp or login page if no token
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from restricted pages
  if (
    token &&
    (pathname === `/${locale}/signUp` ||
      pathname === `/${locale}/Verify` ||
      pathname === `/${locale}/ForgetPassword` ||
      pathname === `/${locale}/ForgetPasswordOtp` ||
      pathname === `/${locale}/ResetPassword`)
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Route based on locale with next-intl
  return createIntlMiddleware(req);
}

console.log("routing ", routing);
// Helper function for next-intl middleware
function createIntlMiddleware(req: NextRequest) {
  const intlMiddleware = createMiddleware(routing);
  return intlMiddleware(req);
}

// Combined matcher configuration
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/",
    "/(ar|en)/:path*",
  ],
};
