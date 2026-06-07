import nodemailer from 'nodemailer'

// Create a reusable transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

interface SendEmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

/**
 * Sends a transactional email using Nodemailer and Gmail.
 */
export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Email credentials are not configured in environment variables.')
    return { success: false, error: 'Email configuration missing' }
  }

  const mailOptions = {
    from: `"Munroe Morris Resort" <${process.env.EMAIL_USER}>`,
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
