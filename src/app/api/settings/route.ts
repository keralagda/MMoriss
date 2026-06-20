import { NextResponse } from 'next/server'
import { db, checkDbConnection } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  // Database connection check
  const dbCheck = await checkDbConnection()
  if (!dbCheck.success) {
    return NextResponse.json(
      { 
        error: 'Database connection failed', 
        details: dbCheck.error,
        diagnosticTrace: dbCheck.diagnosticTrace 
      }, 
      { status: 500 }
    );
  }

  try {
    const allSettings = await db.setting.findMany()
    // Transform array to key-value object
    const settingsObj = allSettings.reduce((acc, item) => {
      acc[item.key] = item.value
      return acc
    }, {} as Record<string, string>)

    return NextResponse.json(settingsObj, {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
      },
    })
  } catch (error: any) {
    console.error('Failed to fetch settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings', details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  // Database connection check
  const dbCheck = await checkDbConnection()
  if (!dbCheck.success) {
    return NextResponse.json(
      { 
        error: 'Database connection failed', 
        details: dbCheck.error,
        diagnosticTrace: dbCheck.diagnosticTrace 
      }, 
      { status: 500 }
    );
  }

  try {
    const body = await request.json()
    const updatedSettings: Record<string, string> = {}

    // Upsert each key-value pair in a transaction
    await db.$transaction(
      Object.entries(body).map(([key, value]) => {
        if (typeof value !== 'string') {
          value = JSON.stringify(value)
        }
        
        return db.setting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        })
      })
    )

    // Fetch the updated settings to return
    const allSettings = await db.setting.findMany()
    const settingsObj = allSettings.reduce((acc, item) => {
      acc[item.key] = item.value
      return acc
    }, {} as Record<string, string>)

    return NextResponse.json(settingsObj)
  } catch (error: any) {
    console.error('Failed to save settings:', error)
    return NextResponse.json(
      { error: 'Failed to save settings', details: error.message },
      { status: 500 }
    )
  }
}
