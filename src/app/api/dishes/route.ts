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
      { status: 503 }
    )
  }

  try {
    const dishes = await db.dish.findMany({
      orderBy: { sortOrder: 'asc' }
    })
    
    // Convert price Decimal to Number
    const parsedDishes = dishes.map(d => ({
      ...d,
      price: Number(d.price)
    }))

    return NextResponse.json(parsedDishes)
  } catch (error: any) {
    console.error('Failed to fetch dishes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dishes', details: error.message }, 
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
      { status: 503 }
    )
  }

  try {
    const body = await request.json()
    const { name, description, price, veg, imageUrl, active } = body

    // Count existing dishes to determine sortOrder
    const count = await db.dish.count()

    const dish = await db.dish.create({
      data: {
        name,
        description,
        price,
        veg: Boolean(veg),
        imageUrl: imageUrl || null,
        active: active !== undefined ? Boolean(active) : true,
        sortOrder: count + 1
      }
    })

    return NextResponse.json({
      ...dish,
      price: Number(dish.price)
    })
  } catch (error: any) {
    console.error('Failed to create dish:', error)
    return NextResponse.json(
      { error: 'Failed to create dish', details: error.message }, 
      { status: 500 }
    )
  }
}
