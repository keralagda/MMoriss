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

    // 1. Fetch total bookings count
    const totalBookings = await db.booking.count()

    // 2. Fetch active guests count
    const totalGuests = await db.guest.count()

    // 3. Calculate occupancy rate
    // E.g., count of rooms currently occupied (status is 'checked_in') / total active rooms
    const totalRooms = await db.room.count({ where: { active: true } })
    const checkedInBookings = await db.booking.count({
      where: {
        status: { in: ['checked_in', 'confirmed'] }
      }
    })
    const occupancyRate = totalRooms > 0 ? Math.round((checkedInBookings / totalRooms) * 100) : 0

    // 4. Calculate total revenue
    // Sum of totalPrice for confirmed, checked_in, checked_out bookings
    const bookingsForRevenue = await db.booking.findMany({
      where: {
        status: { in: ['confirmed', 'checked_in', 'checked_out'] }
      },
      select: {
        totalPrice: true
      }
    })
    const totalRevenue = bookingsForRevenue.reduce((sum, b) => sum + Number(b.totalPrice), 0)

    // 5. Fetch 5 recent bookings
    const recentBookings = await db.booking.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        guest: true,
        room: true
      }
    })

    // 6. Fetch recent reviews
    const recentReviews = await db.review.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        guest: true
      }
    })

    // 7. Room occupancy status list
    const rooms = await db.room.findMany({
      where: { active: true },
      include: {
        bookings: {
          where: {
            status: { in: ['confirmed', 'checked_in'] }
          }
        }
      }
    })

    const roomStatus = rooms.map(room => {
      const occupied = room.bookings.length
      const total = 5 // Arbitrary total capacity per type or we assume total 5 units per type
      return {
        name: room.name,
        occupied: Math.min(occupied, total),
        total
      }
    })

    return NextResponse.json({
      stats: {
        totalBookings,
        totalGuests,
        occupancyRate: `${occupancyRate}%`,
        totalRevenue: `₹${(totalRevenue / 100000).toFixed(1)}L`
      },
      recentBookings,
      recentReviews,
      roomStatus
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
