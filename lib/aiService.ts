export interface AIBookingRequest {
  symptoms: string
  urgency: 'low' | 'medium' | 'high'
  patientAge: number
  preferredDate: string
}

export interface AIRecommendation {
  recommendedSpecialty: string
  reasoning: string
  recommendedTime: string
  severity: 'low' | 'medium' | 'high'
  model?: string
}

export async function analyzeSymptoms(request: AIBookingRequest): Promise<AIRecommendation> {
  try {
    console.log('🤖 [CLIENT] Calling Groq Backend AI...')
    
    const response = await fetch('/api/ai-analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `API error: ${response.status}`)
    }

    const result = await response.json()

    if (!result.success) {
      throw new Error(result.error || 'AI analysis failed')
    }

    console.log('✅ [CLIENT] Groq Response:', result.data)

    return result.data as AIRecommendation
  } catch (error) {
    console.error('❌ [CLIENT] AI Analysis Error:', error)
    throw error
  }
}
