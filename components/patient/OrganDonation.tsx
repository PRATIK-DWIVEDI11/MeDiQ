'use client'
import { useState } from 'react'
import { useAuthStore } from '../../lib/authContext'
import { patientRequestOrganDonation } from '../../lib/blockchainService'
import { Heart, CheckCircle, Loader } from 'lucide-react'

const ORGANS = ['Heart', 'Kidney', 'Liver', 'Lungs', 'Pancreas', 'Cornea']

export default function OrganDonation() {
  const { user } = useAuthStore()
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
    if (selectedOrgans.length === 0) {
      alert('Please select at least one organ')
      return
    }

    setLoading(true)
    try {
      const result = await patientRequestOrganDonation(
        user?.uid || '',
        user?.displayName || 'Patient',
        30,
        'O+',
        selectedOrgans
      )

      if (result.success) {
        setTxHash(result.txHash || '')
        setSubmitted(true)
        alert('✅ Organ donation request submitted! Waiting for admin approval.')
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
        <p className="text-gray-700 mb-3">Your organ donation request has been recorded on blockchain.</p>
        <p className="text-sm font-mono text-gray-600">TX: {txHash?.substring(0, 20)}...</p>
        <p className="text-gray-600 mt-4">Status: <strong>PENDING</strong> - Awaiting admin approval</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Organ Donation Request</h1>
      
      <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="h-6 w-6 text-red-600" />
          <h3 className="text-lg font-bold text-gray-900">Request Organ Donation</h3>
        </div>

        <p className="text-gray-600 mb-6">
          Select organs you wish to donate. Your request will be immutably recorded on blockchain and sent for admin approval.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {ORGANS.map((organ) => (
            <button
              key={organ}
              onClick={() => handleToggleOrgan(organ)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedOrgans.includes(organ)
                  ? 'bg-red-50 border-red-300 text-red-900 font-semibold'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              {organ}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || selectedOrgans.length === 0}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader className="animate-spin h-5 w-5" /> : <Heart className="h-5 w-5" />}
          {loading ? 'Submitting...' : 'Submit Donation Request'}
        </button>
      </div>
    </div>
  )
}

