import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { reportText } = await request.json()

    if (!reportText || reportText.trim().length < 10) {
      return NextResponse.json({ success: false, error: 'Report text too short' }, { status: 400 })
    }

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
            content: `You are MeDiQ's Medical Report Analyzer. A patient has shared their medical report or lab results with you.

Your job is to explain it in simple, friendly language that anyone can understand.

Structure your response EXACTLY like this:

📋 REPORT SUMMARY
[2-3 sentence plain English summary of what this report is about]

🔬 KEY FINDINGS
[List each test/value found. For each one write:
- Test Name: value — what this means in simple words (Normal / Slightly High / High / Low)]

⚠️ AREAS TO WATCH
[List any values that are outside normal range and why it matters]

✅ WHAT'S NORMAL
[List values that are within healthy range]

💡 RECOMMENDATIONS
[2-3 simple action points — diet, lifestyle, or doctor visit suggestions]

⚕️ IMPORTANT: This is an educational summary only. Always consult your doctor for medical advice.`
          },
          {
            role: 'user',
            content: `Please analyze this medical report:\n\n${reportText}`
          }
        ],
        max_tokens: 1000,
        temperature: 0.4,
      })
    })

    if (!response.ok) {
      const err = await response.text()
      throw new Error(`Groq API error: ${response.status} - ${err}`)
    }

    const data = await response.json()
    return NextResponse.json({
      success: true,
      summary: data.choices[0].message.content
    })

  } catch (error: any) {
    console.error('Report summarize error:', error)
    return NextResponse.json({ success: false, error: error?.message || 'Service unavailable' }, { status: 500 })
  }
}