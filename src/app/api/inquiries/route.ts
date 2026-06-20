import { NextResponse } from 'next/server'
import { db, checkDbConnection } from '@/lib/db'
import { getSession } from '@/lib/session'

export async function GET() {
  const dbCheck = await checkDbConnection()
  if (!dbCheck.success) {
    return NextResponse.json({
      error: dbCheck.error,
      diagnosticTrace: dbCheck.diagnosticTrace
    }, { status: 503 })
  }

  try {
    const session = await getSession()
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const inquiries = await db.inquiry.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(inquiries)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const dbCheck = await checkDbConnection()
  if (!dbCheck.success) {
    return NextResponse.json({
      error: dbCheck.error,
      diagnosticTrace: dbCheck.diagnosticTrace
    }, { status: 503 })
  }

  try {
    const body = await request.json()
    let { name, email, phone, checkIn, checkOut, guests, roomType, message } = body

    // Make all fields optional by providing fallback values to satisfy non-null DB schema constraints
    name = name?.trim() || 'Guest'
    email = email?.trim() || 'no-email@munroemorris.com'
    message = message?.trim() || 'Requested a custom quote'

    const inquiry = await db.inquiry.create({
      data: {
        name,
        email,
        phone: phone || null,
        checkIn: checkIn ? new Date(checkIn) : null,
        checkOut: checkOut ? new Date(checkOut) : null,
        guests: guests ? parseInt(guests) : null,
        roomType: roomType || null,
        message,
        status: 'new'
      }
    })

    // Find or create guest for matching booking
    let guest = await db.guest.findUnique({
      where: { email }
    })

    if (!guest) {
      const nameParts = name.trim().split(/\s+/)
      const firstName = nameParts[0] || 'Guest'
      const lastName = nameParts.slice(1).join(' ') || 'User'
      guest = await db.guest.create({
        data: {
          email,
          phone: phone || null,
          firstName,
          lastName,
          notes: 'Created automatically via Get Quote inquiry'
        }
      })
    }

    // Resolve room selection
    let room = null
    if (roomType) {
      room = await db.room.findFirst({
        where: {
          OR: [
            { name: { contains: roomType, mode: 'insensitive' } },
            { slug: { contains: roomType, mode: 'insensitive' } }
          ],
          active: true
        }
      })
    }
    if (!room) {
      room = await db.room.findFirst({
        where: { active: true },
        orderBy: { sortOrder: 'asc' }
      })
    }

    // Create a corresponding pending booking request
    if (room) {
      const checkInDate = checkIn ? new Date(checkIn) : new Date()
      // Ensure checkout is at least 1 day after checkin
      const checkOutDate = checkOut ? new Date(checkOut) : new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000)
      
      const diffTime = checkOutDate.getTime() - checkInDate.getTime()
      const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
      const totalPrice = Number(room.price) * nights
      const confirmationCode = 'BK' + Math.floor(10000 + Math.random() * 90000)

      await db.booking.create({
        data: {
          confirmationCode,
          guestId: guest.id,
          roomId: room.id,
          checkIn: checkInDate,
          checkOut: checkOutDate,
          adults: guests ? parseInt(guests) : 1,
          children: 0,
          totalPrice,
          depositPaid: 0,
          status: 'pending',
          paymentStatus: 'pending',
          specialRequests: message,
          notes: `Logged automatically from Get Quote inquiry (ID: ${inquiry.id})`
        }
      })
    }

    return NextResponse.json({ success: true, inquiry })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
