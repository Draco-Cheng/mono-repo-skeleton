import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { API_PREFIX } from './config';

const DOCKER_FALLBACK_URL = 'http://backend:8000'
const LOCAL_FALLBACK_URL = 'http://localhost:8000'

const isDocker = () => process.env.DOCKER === 'true'

const getBackendUrl = () => {
  if (process.env.BACKEND_URL) {
    return process.env.BACKEND_URL
  }

  const host = process.env.BACKEND_HOST
  const port = process.env.BACKEND_PORT ?? '8000'

  if (!host) {
    return isDocker() ? DOCKER_FALLBACK_URL : LOCAL_FALLBACK_URL
  }

  if (/^https?:\/\//.test(host)) {
    return host
  }

  return `http://${host}${port ? `:${port}` : ''}`
}

export function middleware(request: NextRequest) {
  const backendUrl = getBackendUrl()

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
