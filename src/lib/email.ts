import nodemailer from 'nodemailer'
import { db } from './db'

interface SendEmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

async function getEmailCredentials() {
  try {
    const smtpUserSetting = await db.setting.findUnique({ where: { key: 'smtp_user' } })
    const smtpPassSetting = await db.setting.findUnique({ where: { key: 'smtp_pass' } })
    return {
      user: smtpUserSetting?.value || process.env.EMAIL_USER,
      pass: smtpPassSetting?.value || process.env.EMAIL_PASS
    }
  } catch (error) {
    console.error("Failed to fetch email credentials from DB, falling back to env:", error)
    return {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  }
}

/**
 * Sends a transactional email using Nodemailer and Gmail.
 */
export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  const creds = await getEmailCredentials()
  
  if (!creds.user || !creds.pass) {
    console.error('Email credentials are not configured in settings or environment variables.')
    return { success: false, error: 'Email configuration missing' }
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: creds.user,
      pass: creds.pass,
    },
  })

  const mailOptions = {
    from: `"Munroe Morris Resort" <${creds.user}>`,
    to,
    subject,
    html,
    text: text || html.replace(/<[^>]*>/g, ''), // Fallback to stripping HTML tags if plain text is not provided
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error: any) {
    console.error('Error sending email via Nodemailer:', error)
    return { success: false, error: error?.message || 'Failed to send email' }
  }
}

