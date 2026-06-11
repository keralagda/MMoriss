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
    const reviews = await db.review.findMany({
      where: { approved: true },
      include: {
        guest: {
          select: {
            firstName: true,
            lastName: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(reviews)
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
    if (!session || session.role !== 'guest') {
      return NextResponse.json({ error: 'Only logged-in guests can submit reviews' }, { status: 401 })
    }

    const { rating, title, comment } = await request.json()

    if (!rating || !title || !comment) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const review = await db.review.create({
      data: {
        guestId: session.id,
        rating: parseInt(rating),
        title,
        comment,
        approved: false // requires admin approval before displaying on the landing page
      }
    })

    return NextResponse.json({ success: true, review })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
