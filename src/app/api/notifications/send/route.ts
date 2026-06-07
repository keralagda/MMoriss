import { NextResponse } from 'next/server'
import { checkDbConnection } from '@/lib/db'
import { sendPushNotification, sendTopicNotification } from '@/lib/firebase-admin'

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
    const { token, topic, title, body: content, data } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Missing notification title or body content' },
        { status: 400 }
      )
    }

    if (!token && !topic) {
      return NextResponse.json(
        { error: 'Must specify either a target registration token or a topic' },
        { status: 400 }
      )
    }

    let result
    if (token) {
      result = await sendPushNotification(token, title, content, data)
    } else {
      result = await sendTopicNotification(topic, title, content, data)
    }

    return NextResponse.json({
      success: true,
      message: 'Notification sent successfully',
      result,
    })
  } catch (error: any) {
    console.error('API notifications endpoint error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to send notification', 
        details: error?.message || 'Unknown notification error' 
      },
      { status: 500 }
    )
  }
}
