import { NextResponse } from 'next/server'
import { checkDbConnection } from '@/lib/db'
import { getSession } from '@/lib/session'

export async function POST(request: Request) {
  // 1. Connection check to the database (Connectivity Guard)
  const dbCheck = await checkDbConnection()
  if (!dbCheck.success) {
    return NextResponse.json({
      error: dbCheck.error,
      diagnosticTrace: dbCheck.diagnosticTrace
    }, { status: 503 })
  }

  // 2. Auth guard
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const apiKey = process.env.NVIDIA_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'NVIDIA API key not configured' }, { status: 500 })
    }

    // Call NVIDIA AI API for image generation
    const response = await fetch('https://integrate.api.nvidia.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'stabilityai/stable-diffusion-3.5-large',
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json'
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('NVIDIA API error response:', errorText)
      throw new Error(`Failed to generate image from NVIDIA AI API: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    // Extract base64 image data
    const b64Data = data.data?.[0]?.b64_json || ''
    if (!b64Data) {
      throw new Error('No image data returned from NVIDIA AI API')
    }

    const dataUrl = `data:image/png;base64,${b64Data}`

    return NextResponse.json({ success: true, imageUrl: dataUrl })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
