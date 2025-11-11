'use client'
import { useState } from 'react'
import { useAuthStore } from '../../lib/authContext'
import { doctorRequestOrganDonation } from '../../lib/blockchainService'
import { Heart, CheckCircle, Loader } from 'lucide-react'

const ORGANS = ['Heart', 'Kidney', 'Liver', 'Lungs', 'Pancreas', 'Cornea']

export default function DoctorOrganDonation() {
  const { user } = useAuthStore()
  const [patientName, setPatientName] = useState('')
  const [patientAge, setPatientAge] = useState(30)
  const [bloodType, setBloodType] = useState('O+')
  const [selectedOrgans, setSelectedOrgans] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [txHash, setTxHash] = useState('')

  const handleToggleOrgan = (organ: string) => {
    setSelectedOrgans(prev =>
      prev.includes(organ) ? prev.filter(o => o !== organ) : [...prev, organ]
    )
  }

  const handleSubmit = async () => {
    if (!patientName || selectedOrgans.length === 0) {
      alert('Please enter patient name and select organs')
      return
    }

    setLoading(true)
    try {
      const result = await doctorRequestOrganDonation(
        user?.uid || '',
        user?.displayName || 'Doctor',
        `patient_${Date.now()}`, // Generate unique patient ID
        patientName,
        patientAge,
        bloodType,
        selectedOrgans
      )

      if (result.success) {
        setTxHash(result.txHash || '')
        setSubmitted(true)
        alert('✅ Organ donation request submitted for admin approval!')
      }
    } catch (error) {
      alert('❌ Request failed')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-900 mb-2">Request Submitted!</h2>
        <p className="text-gray-700 mb-3">Organ donation request recorded on immutable blockchain.</p>
        <p className="text-sm font-mono text-gray-600">TX: {txHash?.substring(0, 20)}...</p>
        <p className="text-gray-600 mt-4">Patient: <strong>{patientName}</strong></p>
        <p className="text-gray-600">Status: <strong>PENDING</strong> - Awaiting admin approval</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Request Organ Donation</h1>
      
      <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="h-6 w-6 text-red-600" />
          <h3 className="text-lg font-bold text-gray-900">Recommend Organ Donation</h3>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Patient Name</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter patient name"
              className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-red-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
              <input
                type="number"
                value={patientAge}
                onChange={(e) => setPatientAge(parseInt(e.target.value))}
                className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-red-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Type</label>
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-red-500 focus:outline-none"
              >
                <option>O+</option>
                <option>O-</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Select Organs</label>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {ORGANS.map((organ) => (
              <button
                key={organ}
                onClick={() => handleToggleOrgan(organ)}
                className={`p-3 rounded-lg border-2 transition-all text-sm ${
                  selectedOrgans.includes(organ)
                    ? 'bg-red-50 border-red-300 text-red-900 font-semibold'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {organ}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !patientName || selectedOrgans.length === 0}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader className="animate-spin h-5 w-5" /> : <Heart className="h-5 w-5" />}
          {loading ? 'Submitting...' : 'Submit Donation Request'}
        </button>
      </div>
    </div>
  )
}
