import crypto from 'crypto'
import { cookies } from 'next/headers'

const SESSION_SECRET = process.env.SESSION_SECRET || 'munroe-morris-secure-session-key-2026'
const COOKIE_NAME = 'mm_session'

export interface SessionPayload {
  id: string
  email: string
  role: 'admin' | 'guest'
  name: string
}

export function encrypt(payload: SessionPayload): string {
  const data = JSON.stringify({ ...payload, exp: Date.now() + 24 * 60 * 60 * 1000 })
  const hmac = crypto.createHmac('sha256', SESSION_SECRET)
  hmac.update(data)
  const signature = hmac.digest('hex')
  return btoa(JSON.stringify({ data, signature }))
}

export function decrypt(token: string): SessionPayload | null {
  try {
    const raw = atob(token)
    const { data, signature } = JSON.parse(raw)
    
    const hmac = crypto.createHmac('sha256', SESSION_SECRET)
    hmac.update(data)
    const expectedSignature = hmac.digest('hex')
    
    if (signature !== expectedSignature) return null
    
    const parsed = JSON.parse(data)
    if (parsed.exp < Date.now()) return null // expired
    
    return parsed
  } catch (e) {
    return null
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  return decrypt(token)
}

export async function setSession(payload: SessionPayload) {
  const token = encrypt(payload)
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 // 1 day
  })
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}
