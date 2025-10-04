import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { API_PREFIX } from './config';

export function middleware(request: NextRequest) {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000'

  // Remove /api prefix and forward to backend
  // e.g., /api/ping -> http://backend-service:8000/ping
  const pathWithoutPrefix = request.nextUrl.pathname.substring(API_PREFIX.length)
  const backendPath = `${backendUrl}${pathWithoutPrefix}${request.nextUrl.search}`

  console.log('[Middleware] Proxying:', request.nextUrl.pathname, '->', backendPath)

  return NextResponse.rewrite(new URL(backendPath))
}

export const config = {
  // NOTE: matcher must be a static string literal, cannot use variables or expressions
  // See: https://nextjs.org/docs/messages/invalid-page-config
  matcher: "/api/:path*",
}