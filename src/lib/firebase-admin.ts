import * as admin from 'firebase-admin'

if (!admin.apps.length) {
  try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      : undefined

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    })
    console.log('Firebase Admin SDK initialized successfully.')
  } catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error)
  }
}

export const messaging = admin.apps.length ? admin.messaging() : null

/**
 * Sends a push notification to a specific FCM token.
 */
export async function sendPushNotification(token: string, title: string, body: string, data?: Record<string, string>) {
  if (!messaging) {
    throw new Error('Firebase Messaging is not initialized.')
  }

  const message = {
    notification: {
      title,
      body,
    },
    token,
    data: data || {},
  }

  try {
    const response = await messaging.send(message)
    console.log('Successfully sent message:', response)
    return { success: true, messageId: response }
  } catch (error) {
    console.error('Error sending push notification:', error)
    throw error;
  }
}

/**
 * Sends a push notification to a specific topic.
 */
export async function sendTopicNotification(topic: string, title: string, body: string, data?: Record<string, string>) {
  if (!messaging) {
    throw new Error('Firebase Messaging is not initialized.')
  }

  const message = {
    notification: {
      title,
      body,
    },
    topic,
    data: data || {},
  }

  try {
    const response = await messaging.send(message)
    console.log('Successfully sent message to topic:', response)
    return { success: true, messageId: response }
  } catch (error) {
    console.error('Error sending topic notification:', error)
    throw error;
  }
}
