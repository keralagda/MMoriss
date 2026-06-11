import { NextResponse } from 'next/server'
import { db, checkDbConnection } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const dbCheck = await checkDbConnection()
  if (!dbCheck.success) {
    return NextResponse.json(
      { 
        error: 'Database connection failed', 
        details: dbCheck.error,
        diagnosticTrace: dbCheck.diagnosticTrace 
      }, 
      { status: 500 }
    )
  }

  try {
    const { slug } = await params
    const room = await db.room.findUnique({
      where: { slug }
    })

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 })
    }

    const parsedRoom = {
      ...room,
      price: Number(room.price),
      features: JSON.parse(room.features || '[]'),
      amenities: JSON.parse(room.amenities || '[]'),
      images: JSON.parse(room.images || '[]')
    }

    return NextResponse.json(parsedRoom)
  } catch (error: any) {
    console.error('Failed to fetch room by slug:', error)
    return NextResponse.json(
      { error: 'Failed to fetch room details', details: error.message }, 
      { status: 500 }
    )
  }
}
