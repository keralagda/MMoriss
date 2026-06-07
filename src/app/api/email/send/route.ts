import { NextResponse } from 'next/server'
import { checkDbConnection } from '@/lib/db'
import { sendEmail } from '@/lib/email'

export async function POST(request: Request) {
  // Connectivity guard check
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
    const { to, subject, html, text } = body

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: 'Missing to, subject, or html body parameters' },
        { status: 400 }
      )
    }

    const result = await sendEmail({ to, subject, html, text })

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      messageId: result.messageId,
    })
  } catch (error: any) {
    console.error('API email sending endpoint error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to process email request', 
        details: error?.message || 'Unknown processing error' 
      },
      { status: 500 }
    )
  }
}
