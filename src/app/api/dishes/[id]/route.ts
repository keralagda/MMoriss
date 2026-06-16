import { NextResponse } from 'next/server'
import { db, checkDbConnection } from '@/lib/db'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const dbCheck = await checkDbConnection()
  if (!dbCheck.success) {
    return NextResponse.json(
      { 
        error: 'Database connection failed', 
        details: dbCheck.error,
        diagnosticTrace: dbCheck.diagnosticTrace 
      }, 
      { status: 503 }
    )
  }

  try {
    const body = await request.json()
    const { name, description, price, veg, imageUrl, active, sortOrder } = body

    const updated = await db.dish.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price }),
        ...(veg !== undefined && { veg: Boolean(veg) }),
        ...(imageUrl !== undefined && { imageUrl: imageUrl || null }),
        ...(active !== undefined && { active: Boolean(active) }),
        ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) })
      }
    })

    return NextResponse.json({
      ...updated,
      price: Number(updated.price)
    })
  } catch (error: any) {
    console.error('Failed to update dish:', error)
    return NextResponse.json(
      { error: 'Failed to update dish', details: error.message }, 
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const dbCheck = await checkDbConnection()
  if (!dbCheck.success) {
    return NextResponse.json(
      { 
        error: 'Database connection failed', 
        details: dbCheck.error,
        diagnosticTrace: dbCheck.diagnosticTrace 
      }, 
      { status: 503 }
    )
  }

  try {
    await db.dish.delete({
      where: { id }
    })

    return NextResponse.json({ success: true, message: 'Dish deleted successfully' })
  } catch (error: any) {
    console.error('Failed to delete dish:', error)
    return NextResponse.json(
      { error: 'Failed to delete dish', details: error.message }, 
      { status: 500 }
    )
  }
}
