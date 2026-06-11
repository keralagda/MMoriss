import { NextResponse } from 'next/server'
import { db, checkDbConnection } from '@/lib/db'
import { setSession } from '@/lib/session'
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
    const { email, firstName, lastName, phone, password } = await request.json()

    if (!email || !firstName || !lastName || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Check if guest already exists
    const existingGuest = await db.guest.findUnique({ where: { email } })
    if (existingGuest) {
      return NextResponse.json({ error: 'A guest account with this email already exists' }, { status: 400 })
    }

    // Create guest
    const guest = await db.guest.create({
      data: {
        email,
        firstName,
        lastName,
        phone,
        password, // stored in plain text matching seeding design
      }
    })

    // Establish session
    const fullName = `${guest.firstName} ${guest.lastName}`
    await setSession({
      id: guest.id,
      email: guest.email,
      role: 'guest',
      name: fullName
    })

    // Send welcome email if credentials / settings are present
    try {
      const subjectSetting = await db.setting.findUnique({ where: { key: 'welcome_email_subject' } })
      const bodySetting = await db.setting.findUnique({ where: { key: 'welcome_email_body' } })

      const subject = subjectSetting?.value || "Welcome to Munroe Morris Service Villa!"
      const bodyTemplate = bodySetting?.value || "Dear {{name}},\n\nWelcome to Munroe Morris Service Villa! We are thrilled to have you as our guest. You can now log in to view your profile, manage bookings, and submit reviews.\n\nWarm regards,\nMunroe Morris Team"
      
      const emailBody = bodyTemplate.replace(/\{\{name\}\}/g, fullName)

      await sendEmail({
        to: email,
        subject: subject,
        html: `<div style="font-family: sans-serif; padding: 20px; line-height: 1.6; color: #333;">
                ${emailBody.replace(/\n/g, '<br />')}
               </div>`,
        text: emailBody
      })
    } catch (emailErr) {
      console.error("Welcome email failed to send, but registration succeeded:", emailErr)
    }

    return NextResponse.json({
      success: true,
      user: { id: guest.id, email: guest.email, name: fullName, role: 'guest' }
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
