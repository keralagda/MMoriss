import { NextResponse } from 'next/server'
import { db, checkDbConnection } from '@/lib/db'

export async function GET() {
  const dbCheck = await checkDbConnection()
  if (!dbCheck.success) {
    return NextResponse.json({
      error: dbCheck.error,
      diagnosticTrace: dbCheck.diagnosticTrace
    }, { status: 503 })
  }

  try {
    const venues = await db.diningVenue.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' }
    })

    const dishes = await db.dish.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' }
    })

    return NextResponse.json({ venues, dishes })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
