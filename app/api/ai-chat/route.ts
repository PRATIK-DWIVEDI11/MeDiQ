import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `You are MeDiQ's AI Health Assistant. You help patients understand their symptoms.

When a patient describes symptoms:
1. List 2-3 possible conditions (not diagnoses)
2. Give an urgency level: LOW / MEDIUM / HIGH / EMERGENCY
3. Recommend which type of doctor to see
4. Give one simple home care tip

Always end with: "This is not a medical diagnosis. Please consult a doctor."

Keep responses clear, short, and in simple English. Use emojis to make it friendly.`
          },
          ...messages
        ],
        max_tokens: 500,
        temperature: 0.7,
      })
    })

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json({ 
      success: true, 
      message: data.choices[0].message.content 
    })

    } catch (error: any) {
    console.error('Chat API error:', error)
    return NextResponse.json({ success: false, error: error?.message || 'AI service unavailable' }, { status: 500 })
    }
}