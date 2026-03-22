'use client'
import { useState } from 'react'
import { Brain, Loader } from 'lucide-react'
import { analyzeSymptoms, type AIBookingRequest, type AIRecommendation } from '../../lib/aiService'
import { useAuthStore } from '../../lib/authContext'
import { useRouter } from 'next/navigation'

export default function AIBookingAssistant() {
  const router = useRouter()
  const { user } = useAuthStore()

  const [step, setStep] = useState<'input' | 'analyzing' | 'result'>('input')
  const [symptoms, setSymptoms] = useState('')
  const [urgency, setUrgency] = useState('medium')
  const [age, setAge] = useState('')
  const [aiResult, setAiResult] = useState<AIRecommendation | null>(null)
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
      setError('AI analysis failed. Please try again.')
      setStep('input')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-blue-200 dark:border-blue-700">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Appointment Booking Assistant</h2>
      </div>

      {step === 'input' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Describe Your Symptoms</label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="E.g., Chest pain, shortness of breath, persistent cough..."
              className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Urgency Level</label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="low">Low - Can wait</option>
              <option value="medium">Medium - Within a week</option>
              <option value="high">High - ASAP</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Your Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="25"
                className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Preferred Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
          <p className="text-gray-600 dark:text-gray-400 font-semibold">AI is analyzing your symptoms...</p>
          <p className="text-sm text-gray-500 mt-2">This helps find the best doctor for you</p>
        </div>
      )}

      {step === 'result' && aiResult && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-lg border-2 border-blue-200 dark:border-blue-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🎯 AI Recommendation</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Recommended Specialty</p>
                <p className="text-xl font-bold text-blue-600">{aiResult.recommendedSpecialty}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Severity</p>
                  <p className={`text-2xl font-bold capitalize ${
                    aiResult.severity === 'high' ? 'text-red-600' :
                    aiResult.severity === 'medium' ? 'text-orange-600' : 'text-green-600'
                  }`}>{aiResult.severity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Recommended Time</p>
                  <p className="text-lg font-bold text-blue-600">{aiResult.recommendedTime}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">AI Reasoning</p>
                <p className="text-gray-800 dark:text-gray-200 mt-1">{aiResult.reasoning}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => { setStep('input'); setSymptoms(''); setAiResult(null) }}
              className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push('/patient/book-appointment')}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              Book Appointment →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
