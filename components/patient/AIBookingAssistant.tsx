'use client'
import { useState } from 'react'
import { Brain, Loader } from 'lucide-react'
import { analyzeSymptoms } from '../../lib/aiService'
//import { analyzeSymptoms, analyzeSymptomsFallback, type AIBookingResponse } from '../../lib/aiService'
import { bookAppointment } from '../../lib/firebaseServices'
import { useAuthStore } from '../../lib/authContext'
import { useRouter } from 'next/navigation'

export default function AIBookingAssistant() {
  const router = useRouter()
  const { user } = useAuthStore()
  
  const [step, setStep] = useState<'input' | 'analyzing' | 'result'>('input')
  const [symptoms, setSymptoms] = useState('')
  const [urgency, setUrgency] = useState('medium')
  const [age, setAge] = useState('')
  const [aiResult, setAiResult] = useState<AIBookingResponse | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAnalyze = async () => {
    if (!symptoms || !age || !selectedDate) {
      setError('Please fill all fields')
      return
    }

    setLoading(true)
    setError('')
    setStep('analyzing')

    try {
      const result = await analyzeSymptoms({
        symptoms,
        urgency: urgency as 'low' | 'medium' | 'high',
        preferredDate: selectedDate,
        patientAge: parseInt(age)
      })

      setAiResult(result)
      setStep('result')
    } catch (err) {
      console.error('AI Error:', err)
      // Fallback to rule-based
      const fallbackResult = analyzeSymptomsFallback(symptoms, urgency)
      setAiResult(fallbackResult)
      setStep('result')
    } finally {
      setLoading(false)
    }
  }

  const handleBook = async () => {
    if (!aiResult || !user) return

    setLoading(true)
    try {
      const result = await bookAppointment(
        user.uid,
        aiResult.recommendedDoctor.id,
        selectedDate,
        aiResult.recommendedTime,
        symptoms,
        aiResult.recommendedDoctor.specialty
      )

      if (result.success) {
        alert('✅ Appointment booked successfully!')
        router.push('/patient/appointments')
      } else {
        setError('Failed to book appointment')
      }
    } catch (err) {
      setError('Error booking appointment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg border-2 border-blue-200">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">AI Appointment Booking Assistant</h2>
      </div>

      {step === 'input' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Describe Your Symptoms
            </label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="E.g., Chest pain, shortness of breath, persistent cough..."
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Urgency Level
            </label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="low">Low - Can wait</option>
              <option value="medium">Medium - Within a week</option>
              <option value="high">High - ASAP</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="25"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {error && <p className="text-red-600 font-semibold">{error}</p>}

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Analyzing with AI...' : 'Analyze & Get Recommendation'}
          </button>
        </div>
      )}

      {step === 'analyzing' && (
        <div className="text-center py-12">
          <Loader className="h-12 w-12 text-blue-600 mx-auto animate-spin mb-4" />
          <p className="text-gray-600 font-semibold">AI is analyzing your symptoms...</p>
          <p className="text-sm text-gray-500 mt-2">This helps find the best doctor for you</p>
        </div>
      )}

      {step === 'result' && aiResult && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              🎯 AI Recommendation
            </h3>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Recommended Doctor</p>
                <p className="text-xl font-bold text-blue-600">{aiResult.recommendedDoctor.name}</p>
                <p className="text-sm text-gray-600">{aiResult.recommendedDoctor.specialty}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Match Score</p>
                  <p className="text-2xl font-bold text-green-600">{aiResult.recommendedDoctor.matchScore}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Urgency Score</p>
                  <p className="text-2xl font-bold text-orange-600">{aiResult.urgencyScore}/100</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">AI Reasoning</p>
                <p className="text-gray-800 mt-1">{aiResult.reasoning}</p>
              </div>

              <div className="bg-white p-3 rounded-lg">
                <p className="text-sm font-semibold text-gray-700">
                  Recommended Time: <span className="text-blue-600">{aiResult.recommendedTime}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                setStep('input')
                setSymptoms('')
                setAiResult(null)
              }}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50"
            >
              Try Again
            </button>
            <button
              onClick={handleBook}
              disabled={loading}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Booking...' : '✅ Confirm & Book'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
