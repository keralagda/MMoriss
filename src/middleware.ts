import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Since standard node.js crypto is sometimes problematic in Next.js middleware depending on the environment,
// we can do a lightweight parse or use the Web Crypto API, or directly import decrypt from session.
// Let's import decrypt but handle edge cases.
import { decrypt } from './lib/session'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Match /admin routes
  const isAdminRoute = path.startsWith('/admin')
  // Match /dashboard routes
  const isDashboardRoute = path.startsWith('/dashboard')

  if (!isAdminRoute && !isDashboardRoute) {
    return NextResponse.next()
  }

  const token = request.cookies.get('mm_session')?.value
  const session = token ? await decrypt(token) : null

  if (isAdminRoute) {
    if (!session || session.role !== 'admin') {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', path)
      return NextResponse.redirect(loginUrl)
    }
  }

  if (isDashboardRoute) {
    if (!session) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', path)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*']
}
