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
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (session.role === 'admin') {
      // Admin sees all bookings with details of guest and room
      const bookings = await db.booking.findMany({
        include: {
          guest: true,
          room: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
      return NextResponse.json(bookings)
    } else {
      // Guest sees only their own bookings
      const bookings = await db.booking.findMany({
        where: {
          guestId: session.id
        },
        include: {
          room: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
      return NextResponse.json(bookings)
    }
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
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Please login to make a booking' }, { status: 401 })
    }

    const { roomId, checkIn, checkOut, adults, children, specialRequests } = await request.json()

    if (!roomId || !checkIn || !checkOut) {
      return NextResponse.json({ error: 'Room, Check-In, and Check-Out dates are required' }, { status: 400 })
    }

    // Fetch the room details
    const room = await db.room.findUnique({ where: { id: roomId } })
    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 })
    }

    // Calculate total price
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    const diffTime = checkOutDate.getTime() - checkInDate.getTime()
    const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
    const totalPrice = Number(room.price) * nights

    // Generate confirmation code
    const confirmationCode = 'BK' + Math.floor(10000 + Math.random() * 90000)

    const booking = await db.booking.create({
      data: {
        confirmationCode,
        guestId: session.id,
        roomId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        adults: parseInt(adults) || 1,
        children: parseInt(children) || 0,
        totalPrice,
        depositPaid: 0,
        status: 'pending',
        paymentStatus: 'pending',
        specialRequests: specialRequests || '',
      },
      include: {
        room: true
      }
    })

    return NextResponse.json({ success: true, booking })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
