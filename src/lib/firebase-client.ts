import { initializeApp, getApps, getApp } from 'firebase/app'
import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'mmoriss-62981',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

let messaging: Messaging | null = null

if (typeof window !== 'undefined') {
  try {
    // Only initialize messaging if supported by browser
    messaging = getMessaging(app)
  } catch (err) {
    console.warn('Firebase Messaging is not supported in this browser context:', err)
  }
}

export { app, messaging }

/**
 * Requests notification permissions from the user and retrieves their FCM registration token.
 */
export async function requestFcmToken(vapidKey: string) {
  if (!messaging) {
    console.warn('FCM is not initialized or not supported on this platform.')
    return null
  }

  try {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      const currentToken = await getToken(messaging, { vapidKey })
      if (currentToken) {
        return currentToken
      } else {
        console.warn('No registration token available. Request permission to generate one.')
        return null
      }
    } else {
      console.warn('Notification permission denied by user.')
      return null
    }
  } catch (error) {
    console.error('An error occurred while retrieving FCM token:', error)
    return null
  }
}

/**
 * Registers a callback for receiving foreground push messages.
 */
export function onMessageListener(callback: (payload: any) => void) {
  if (!messaging) return () => {}
  return onMessage(messaging, (payload) => {
    callback(payload)
  })
}
