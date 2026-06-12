import { NextResponse } from 'next/server'
import { db, checkDbConnection } from '@/lib/db'
import { getSession } from '@/lib/session'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const dbCheck = await checkDbConnection()
  if (!dbCheck.success) {
    return NextResponse.json({
      error: dbCheck.error,
      diagnosticTrace: dbCheck.diagnosticTrace
    }, { status: 503 })
  }

  const { id } = await params

  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if booking exists
    const booking = await db.booking.findUnique({
      where: { id }
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Only admin or the guest who owns the booking can modify it
    // Guests can only cancel their booking (status = cancelled)
    const isAdmin = session.role === 'admin'
    const isOwner = booking.guestId === session.id

    if (!isAdmin && !isOwner) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const body = await request.json()

    // Restrict guest options
    let updateData: any = {}
    if (isAdmin) {
      if (body.roomId) updateData.roomId = body.roomId
      if (body.checkIn) updateData.checkIn = new Date(body.checkIn)
      if (body.checkOut) updateData.checkOut = new Date(body.checkOut)
      if (body.adults !== undefined) updateData.adults = parseInt(body.adults) || 1
      if (body.children !== undefined) updateData.children = parseInt(body.children) || 0
      if (body.totalPrice !== undefined) updateData.totalPrice = parseFloat(body.totalPrice)
      if (body.depositPaid !== undefined) updateData.depositPaid = parseFloat(body.depositPaid)
      if (body.status) updateData.status = body.status
      if (body.paymentStatus) updateData.paymentStatus = body.paymentStatus
      if (body.specialRequests !== undefined) updateData.specialRequests = body.specialRequests
      if (body.notes !== undefined) updateData.notes = body.notes
    } else {
      // Guests can only cancel their booking
      if (body.status === 'cancelled') {
        updateData.status = 'cancelled'
      } else {
        return NextResponse.json({ error: 'Guests can only cancel bookings' }, { status: 403 })
      }
    }

    const updatedBooking = await db.booking.update({
      where: { id },
      data: updateData,
      include: {
        guest: true,
        room: true
      }
    })

    return NextResponse.json({ success: true, booking: updatedBooking })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const dbCheck = await checkDbConnection()
  if (!dbCheck.success) {
    return NextResponse.json({
      error: dbCheck.error,
      diagnosticTrace: dbCheck.diagnosticTrace
    }, { status: 503 })
  }

  const { id } = await params

  try {
    const session = await getSession()
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await db.booking.delete({
      where: { id }
    })

    return NextResponse.json({ success: true, message: 'Booking deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
