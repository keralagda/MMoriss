import { NextResponse } from 'next/server'
import { checkDbConnection } from '@/lib/db'
import { getSession } from '@/lib/session'
import { sendEmail } from '@/lib/email'

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
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { to } = await request.json()
    if (!to) {
      return NextResponse.json({ error: 'Recipient email is required' }, { status: 400 })
    }

    const result = await sendEmail({
      to,
      subject: "SMTP Configuration Test - Munroe Morris Resort",
      html: `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #c5a880; border-radius: 8px;">
          <h2 style="color: #c5a880; border-bottom: 1px solid #eee; padding-bottom: 10px; font-family: serif;">SMTP Test Successful</h2>
          <p>Hello,</p>
          <p>This is a test email confirming that your Gmail SMTP transactional email configuration on <strong>Munroe Morris Resort</strong> is working correctly.</p>
          <p>Logged-in Admin: <strong>${session.name}</strong> (${session.email})</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 11px; color: #999;">This is an automated notification. Please do not reply directly to this message.</p>
        </div>
      `,
      text: `Hello, this is a test email confirming that your Gmail SMTP transactional email configuration on Munroe Morris Resort is working correctly. Logged-in Admin: ${session.name} (${session.email})`
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
