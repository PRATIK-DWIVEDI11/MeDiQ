import { NextRequest, NextResponse } from 'next/server'

// Different approach - using REST API instead of SDK
export async function POST(request: NextRequest) {
  try {
    console.log('🤖 [API] AI Analysis with Groq REST API')
    
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'GROQ_API_KEY not configured'
      }, { status: 500 })
    }

    const { symptoms, urgency, patientAge, preferredDate } = await request.json()

    console.log('📝 [API] Input:', { symptoms, urgency, patientAge })

    const prompt = `You are a medical AI assistant. Analyze patient symptoms and recommend ONE doctor specialty.

Symptoms: "${symptoms}"
Age: ${patientAge}
Urgency: ${urgency}

Choose from: General Medicine, Cardiology, Neurology, Dermatology, Orthopedics, Pediatrics, ENT, Psychiatry

Respond ONLY as JSON:
{
  "recommendedSpecialty": "specialty",
  "reasoning": "explanation",
  "recommendedTime": "14:00",
  "severity": "low|medium|high"
}`

    console.log('🔄 [API] Calling Groq REST API...')

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('❌ Groq API Error:', errorData)
      throw new Error(errorData.error?.message || 'Groq API failed')
    }

    const data = await response.json()
    const responseText = data.choices[0].message.content

    console.log('✅ [API] Groq Response:', responseText)

    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Invalid JSON from AI')
    }

    const analysis = JSON.parse(jsonMatch[0])

    console.log('✅ [API] Analysis:', analysis)

    return NextResponse.json({
      success: true,
      data: {
        recommendedSpecialty: analysis.recommendedSpecialty || 'General Medicine',
        reasoning: analysis.reasoning || 'Medical consultation recommended',
        recommendedTime: analysis.recommendedTime || '14:00',
        severity: analysis.severity || urgency
      }
    })

  } catch (error: any) {
    console.error('❌ [API] Error:', error.message)
    
    return NextResponse.json({
      success: false,
      error: error.message || 'AI analysis failed'
    }, { status: 500 })
  }
}
