import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  // Clear the selected profile cookie
  cookies().delete('selectedProfile')

  // Redirect to profile selection page
  return NextResponse.redirect(new URL('/profile-selection', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'))
} 