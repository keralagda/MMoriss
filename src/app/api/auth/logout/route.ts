import { NextResponse } from 'next/server'
import { checkDbConnection } from '@/lib/db'
import { destroySession } from '@/lib/session'

export async function POST() {
  // Always attempt to destroy the session first so the user is signed out locally
  try {
    await destroySession()
  } catch (error) {
    console.error('Failed to destroy session:', error)
  }

  // Connectivity guard check (required for all backend routes)
  const dbCheck = await checkDbConnection()
  if (!dbCheck.success) {
    return NextResponse.json({
      success: true,
      warning: 'Database connectivity issue, but session cleared.',
      error: dbCheck.error,
      diagnosticTrace: dbCheck.diagnosticTrace
    })
  }

  return NextResponse.json({ success: true })
}
