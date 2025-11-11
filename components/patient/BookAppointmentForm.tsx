'use client'
import { useState } from 'react'
import { Loader, Brain, CheckCircle, AlertCircle } from 'lucide-react'
import { useAuthStore } from '../../lib/authContext'
import { analyzeSymptoms } from '../../lib/aiService'
import { getAvailableDoctorsBySpecialty, createAppointmentWithStatus } from '../../lib/firebaseServices'

export default function BookAppointmentForm() {
  const { user } = useAuthStore()
  const [symptoms, setSymptoms] = useState('')
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high'>('medium')
  const [age, setAge] = useState(25)
  const [preferredDate, setPreferredDate] = useState('')
  
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'input' | 'ai-analyzing' | 'ai-result' | 'booking' | 'success' | 'error'>('input')
  const [aiResponse, setAiResponse] = useState<any>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null)
  const [availableDoctors, setAvailableDoctors] = useState<any[]>([])
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleAnalyzeWithAI = async () => {
    if (!symptoms.trim()) {
      setError('Please describe your symptoms')
      return
    }
    if (!preferredDate) {
      setError('Please select a preferred date')
      return
    }
    setLoading(true)
    setError('')
    setStep('ai-analyzing')
    try {
      console.log('🤖 Starting AI Analysis...')
      const aiAnalysis = await analyzeSymptoms({
        symptoms,
        urgency,
        patientAge: age,
        preferredDate
      })
      setAiResponse(aiAnalysis)
      console.log('✅ AI Recommendation:', aiAnalysis)

      const doctors = await getAvailableDoctorsBySpecialty(aiAnalysis.recommendedSpecialty)
      if (doctors.length === 0) {
        setError(`No doctors available for ${aiAnalysis.recommendedSpecialty}`)
        setStep('error')
        setLoading(false)
        return
      }
      setAvailableDoctors(doctors)
      // Auto-select best doctor
      const bestDoctor = doctors.reduce((prev: any, current: any) => 
        (prev.rating || 0) > (current.rating || 0) ? prev : current
      )
      // const bestDoctor = doctors.reduce((prev, current) => 
      //   (prev.rating || 0) > (current.rating || 0) ? prev : current
      // )
      setSelectedDoctor(bestDoctor)
     // console.log('🎯 Auto-selected best doctor:', bestDoctor.name)
      setStep('ai-result')
    } catch (err: any) {
      console.error('❌ AI Analysis Error:', err)
      setError(err.message || 'AI analysis failed. Please try again.')
      setStep('error')
    } finally {
      setLoading(false)
    }
  }

  const handleAutoBookAppointment = async () => {
    if (!selectedDoctor || !aiResponse || !user) return
    setLoading(true)
    setStep('booking')
    setError('')
    try {
     // console.log('📅 Creating appointment with PENDING status...')
      const bookingResult = await createAppointmentWithStatus({
        patientId: user.uid,
        patientName: user.displayName || 'Patient',
        patientEmail: user.email || '',
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        specialty: aiResponse.recommendedSpecialty,
        date: preferredDate,
        time: aiResponse.recommendedTime,
        symptoms: symptoms,
        reason: aiResponse.reasoning,
        urgency: urgency
      })
      if (bookingResult.success) {
       // console.log('✅ Appointment requested successfully!')
        setSuccessMessage(`
          ✅ Appointment Request Submitted!
          Doctor: ${selectedDoctor.name}
          Specialty: ${aiResponse.recommendedSpecialty}
          Date: ${preferredDate}
          Time: ${aiResponse.recommendedTime}
          Status: PENDING - Awaiting doctor confirmation
        `)
        setSymptoms('')
        setPreferredDate('')
        setAge(25)
        setUrgency('medium')
        setAiResponse(null)
        setSelectedDoctor(null)
        setAvailableDoctors([])
        setStep('success')
        setTimeout(() => { window.location.href = '/patient/appointments' }, 3000)
      } else {
        throw new Error(bookingResult.error)
      }
    } catch (err: any) {
      console.error('❌ Booking Error:', err)
      setError(err.message || 'Failed to book appointment')
      setStep('error')
    } finally {
      setLoading(false)
    }
  }

  // Input Form
  if (step === 'input') {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            AI-Powered Agentic Booking Assistant
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Describe Your Symptoms
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g., severe headache, fever for 3 days, difficulty breathing..."
                className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-purple-500 focus:outline-none"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Urgency Level
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as any)}
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-purple-500 focus:outline-none"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-800 p-3 rounded-lg text-sm flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                {error}
              </div>
            )}
            <button
              onClick={handleAnalyzeWithAI}
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin h-5 w-5" />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5" />
                  Analyze with AI & Auto-Book
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // AI Analyzing
  if (step === 'ai-analyzing') {
    return (
      <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-8 text-center">
        <Loader className="animate-spin h-12 w-12 text-purple-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-purple-900 mb-2">AI Analyzing Your Symptoms...</h2>
        <p className="text-gray-700">Finding the best available doctor for you...</p>
      </div>
    )
  }

  // AI Result
  if (step === 'ai-result' && aiResponse && selectedDoctor) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">✨ AI Recommendation</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600">Recommended Specialty</p>
              <p className="text-xl font-bold text-purple-900">{aiResponse.recommendedSpecialty}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600">Severity Level</p>
              <p className="text-xl font-bold text-red-600 uppercase">{aiResponse.severity}</p>
            </div>
            <div className="bg-white rounded-lg p-4 col-span-2">
              <p className="text-sm text-gray-600">AI Reasoning</p>
              <p className="text-sm text-gray-800 mt-1">{aiResponse.reasoning}</p>
            </div>
          </div>
          <hr className="my-6" />
          <h4 className="font-bold text-gray-900 mb-4">🎯 Auto-Selected Best Doctor</h4>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Doctor Name</p>
            <p className="text-2xl font-bold text-blue-900">{selectedDoctor.name}</p>
            <p className="text-sm text-gray-600 mt-3">Specialty</p>
            <p className="font-semibold text-gray-800">{selectedDoctor.specialty}</p>
            <p className="text-sm text-gray-600 mt-3">Rating</p>
            <p className="text-lg font-bold text-yellow-600">⭐ {selectedDoctor.rating}/5</p>
            <p className="text-sm text-gray-600 mt-3">Recommended Time</p>
            <p className="text-lg font-bold text-green-600">{aiResponse.recommendedTime}</p>
          </div>
          <button
            onClick={handleAutoBookAppointment}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="animate-spin h-5 w-5" />
                Booking...
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5" />
                Confirm & Request Appointment
              </>
            )}
          </button>
        </div>
      </div>
    )
  }

  // Booking
  if (step === 'booking') {
    return (
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8 text-center">
        <Loader className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-blue-900 mb-2">Booking Your Appointment...</h2>
        <p className="text-gray-700">Please wait while we confirm your appointment.</p>
      </div>
    )
  }

  // Success
  if (step === 'success') {
    return (
      <div className="bg-green-50 border-2 border-green-300 rounded-lg p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-900 mb-2">✅ Appointment Requested!</h2>
        <p className="text-gray-700 whitespace-pre-line font-mono text-sm">{successMessage}</p>
        <p className="text-gray-600 mt-4">Redirecting to your appointments...</p>
      </div>
    )
  }

  // Error
  if (step === 'error') {
    return (
      <div className="bg-red-50 border-2 border-red-300 rounded-lg p-8 text-center">
        <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-red-900 mb-2">❌ Error</h2>
        <p className="text-red-800 mb-6">{error}</p>
        <button
          onClick={() => {
            setStep('input')
            setError('')
            setAiResponse(null)
            setSelectedDoctor(null)
          }}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  return null
}
