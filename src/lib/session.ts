import { cookies } from 'next/headers'

const SESSION_SECRET = process.env.SESSION_SECRET || 'munroe-morris-secure-session-key-2026'
const COOKIE_NAME = 'mm_session'

export interface SessionPayload {
  id: string
  email: string
  role: 'admin' | 'guest'
  name: string
}

async function getCryptoKey(): Promise<CryptoKey> {
  const enc = new TextEncoder()
  const keyData = enc.encode(SESSION_SECRET)
  return globalThis.crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  )
}

export async function encrypt(payload: SessionPayload): Promise<string> {
  const data = JSON.stringify({ ...payload, exp: Date.now() + 24 * 60 * 60 * 1000 })
  const enc = new TextEncoder()
  const key = await getCryptoKey()
  const signatureBuffer = await globalThis.crypto.subtle.sign(
    'HMAC',
    key,
    enc.encode(data)
  )
  const signatureArray = Array.from(new Uint8Array(signatureBuffer))
  const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return btoa(JSON.stringify({ data, signature: signatureHex }))
}

export async function decrypt(token: string): Promise<SessionPayload | null> {
  try {
    const raw = atob(token)
    const { data, signature } = JSON.parse(raw)
    
    const enc = new TextEncoder()
    const key = await getCryptoKey()
    const dataBuffer = enc.encode(data)
    
    // Parse hex signature
    const signatureBytes = new Uint8Array(
      signature.match(/.{1,2}/g).map((byte: string) => parseInt(byte, 16))
    )
    
    const isValid = await globalThis.crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes,
      dataBuffer
    )
    
    if (!isValid) return null
    
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
  return await decrypt(token)
}

export async function setSession(payload: SessionPayload) {
  const token = await encrypt(payload)
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
