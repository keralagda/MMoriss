import { NextResponse } from 'next/server'
import { db, checkDbConnection } from '@/lib/db'

export async function GET() {
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
    const rooms = await db.room.findMany({
      orderBy: { sortOrder: 'asc' }
    })
    
    // Parse JSON string fields (features, amenities, images) for client consumption
    const parsedRooms = rooms.map(room => ({
      ...room,
      price: Number(room.price),
      features: JSON.parse(room.features || '[]'),
      amenities: JSON.parse(room.amenities || '[]'),
      images: JSON.parse(room.images || '[]')
    }))

    return NextResponse.json(parsedRooms)
  } catch (error: any) {
    console.error('Failed to fetch rooms:', error)
    return NextResponse.json(
      { error: 'Failed to fetch rooms', details: error.message }, 
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
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
    const body = await request.json()
    const { name, description, longDescription, price, size, maxGuests, beds, view, features, amenities, images, active } = body

    const slug = name.toLowerCase().replace(/\s+/g, '-')
    
    // Determine sortOrder by counting existing rooms
    const count = await db.room.count()

    const newRoom = await db.room.create({
      data: {
        name,
        slug,
        description,
        longDescription: longDescription || '',
        price: price || 0,
        size: size || '',
        maxGuests: Number(maxGuests) || 2,
        beds: beds || '',
        view: view || '',
        features: JSON.stringify(features || []),
        amenities: JSON.stringify(amenities || []),
        images: JSON.stringify(images || []),
        active: active ?? true,
        sortOrder: count + 1
      }
    })

    return NextResponse.json({
      ...newRoom,
      price: Number(newRoom.price),
      features: JSON.parse(newRoom.features),
      amenities: JSON.parse(newRoom.amenities),
      images: JSON.parse(newRoom.images)
    })
  } catch (error: any) {
    console.error('Failed to create room:', error)
    return NextResponse.json(
      { error: 'Failed to create room', details: error.message }, 
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
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
    const body = await request.json()
    const { id, name, description, longDescription, price, size, maxGuests, beds, view, features, amenities, images, active, sortOrder } = body

    if (!id) {
      return NextResponse.json({ error: 'Missing room ID' }, { status: 400 })
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-')

    const updatedRoom = await db.room.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        longDescription: longDescription || '',
        price: price || 0,
        size: size || '',
        maxGuests: Number(maxGuests) || 2,
        beds: beds || '',
        view: view || '',
        features: JSON.stringify(features || []),
        amenities: JSON.stringify(amenities || []),
        images: JSON.stringify(images || []),
        active: active ?? true,
        sortOrder: sortOrder || 0
      }
    })

    return NextResponse.json({
      ...updatedRoom,
      price: Number(updatedRoom.price),
      features: JSON.parse(updatedRoom.features),
      amenities: JSON.parse(updatedRoom.amenities),
      images: JSON.parse(updatedRoom.images)
    })
  } catch (error: any) {
    console.error('Failed to update room:', error)
    return NextResponse.json(
      { error: 'Failed to update room', details: error.message }, 
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
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
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Missing room ID' }, { status: 400 })
    }

    await db.room.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Failed to delete room:', error)
    return NextResponse.json(
      { error: 'Failed to delete room', details: error.message }, 
      { status: 500 }
    )
  }
}
