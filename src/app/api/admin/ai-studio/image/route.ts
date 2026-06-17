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
    const response = await fetch('https://ai.api.nvidia.com/v1/genai/stabilityai/stable-diffusion-xl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: prompt,
            weight: 1
          }
        ],
        cfg_scale: 5,
        steps: 25,
        seed: 0,
        samples: 1
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('NVIDIA API error response:', errorText)
      throw new Error(`Failed to generate image from NVIDIA AI API: ${response.status} ${response.statusText}. Error details: ${errorText}`)
    }

    const data = await response.json()
    
    // Extract base64 image data
    const b64Data = data.artifacts?.[0]?.base64 || ''
    if (!b64Data) {
      throw new Error('No image data returned from NVIDIA AI API')
    }

    const dataUrl = `data:image/png;base64,${b64Data}`

    return NextResponse.json({ success: true, imageUrl: dataUrl })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
