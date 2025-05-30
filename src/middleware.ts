import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the selected profile from cookies
  const selectedProfile = request.cookies.get('selectedProfile')

  // If no profile is selected and not on profile selection page, redirect to profile selection
  if (!selectedProfile && !request.nextUrl.pathname.startsWith('/profile-selection')) {
    return NextResponse.redirect(new URL('/profile-selection', request.url))
  }

  // If profile is selected and on profile selection page, redirect to home
  if (selectedProfile && request.nextUrl.pathname.startsWith('/profile-selection')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 