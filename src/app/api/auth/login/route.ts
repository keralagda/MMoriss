import { NextResponse } from 'next/server'
import { db, checkDbConnection } from '@/lib/db'
import { setSession } from '@/lib/session'

export async function POST(request: Request) {
  const dbCheck = await checkDbConnection()
  if (!dbCheck.success) {
    return NextResponse.json({
      error: dbCheck.error,
      diagnosticTrace: dbCheck.diagnosticTrace
    }, { status: 503 })
  }

  try {
    const { email, password, role } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    if (role === 'admin') {
      const admin = await db.adminUser.findUnique({ where: { email } })
      if (!admin || admin.password !== password) {
        return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 })
      }
      if (!admin.active) {
        return NextResponse.json({ error: 'Admin account is deactivated' }, { status: 403 })
      }
      await setSession({
        id: admin.id,
        email: admin.email,
        role: 'admin',
        name: admin.name
      })
      return NextResponse.json({
        success: true,
        user: { id: admin.id, email: admin.email, name: admin.name, role: 'admin' }
      })
    } else {
      // Guest role
      const guest = await db.guest.findUnique({ where: { email } })
      if (!guest || guest.password !== password) {
        return NextResponse.json({ error: 'Invalid guest credentials' }, { status: 401 })
      }
      await setSession({
        id: guest.id,
        email: guest.email,
        role: 'guest',
        name: `${guest.firstName} ${guest.lastName}`
      })
      return NextResponse.json({
        success: true,
        user: { id: guest.id, email: guest.email, name: `${guest.firstName} ${guest.lastName}`, role: 'guest' }
      })
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
