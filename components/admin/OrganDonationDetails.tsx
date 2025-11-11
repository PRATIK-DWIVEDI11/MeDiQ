'use client'
import { useEffect, useState } from 'react'
import { Heart, CheckCircle, Clock, Loader } from 'lucide-react'
import { getPendingDonations, getApprovedDonations, approveOrganDonation, getDonationStats } from '../../lib/blockchainService'
import { useAuthStore } from '../../lib/authContext'

export default function OrganDonationDetails() {
  const { user } = useAuthStore()
  const [pendingDonations, setPendingDonations] = useState<any[]>([])
  const [approvedDonations, setApprovedDonations] = useState<any[]>([])
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0 })
  const [loading, setLoading] = useState(true)
  const [approving, setApproving] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    const pending = await getPendingDonations()
    const approved = await getApprovedDonations()
    const donationStats = await getDonationStats()
    
    setPendingDonations(pending)
    setApprovedDonations(approved)
    setStats(donationStats)
    setLoading(false)
  }

  const handleApprove = async (donationId: string) => {
    setApproving(donationId)
    try {
      const result = await approveOrganDonation(donationId, user?.uid || '')
      if (result.success) {
        alert(`✅ Donation approved! Immutable TX: ${result.approvalTxHash?.substring(0, 20)}...`)
        await fetchData()
      }
    } catch (error) {
      alert('❌ Approval failed')
    } finally {
      setApproving(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="animate-spin h-12 w-12 text-red-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border-2 border-red-200">
          <p className="text-sm text-gray-600">Total Donations</p>
          <p className="text-4xl font-bold text-red-600 mt-2">{stats.total}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg border-2 border-yellow-200">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-4xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
          <p className="text-sm text-gray-600">Approved</p>
          <p className="text-4xl font-bold text-green-600 mt-2">{stats.approved}</p>
        </div>
      </div>

      {/* Pending Donations */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-yellow-600" />
          Pending Donations ({pendingDonations.length})
        </h3>
        
        {pendingDonations.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No pending donations</p>
        ) : (
          <div className="space-y-3">
            {pendingDonations.map((donation) => (
              <div key={donation.id} className="border-2 border-yellow-200 bg-yellow-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">{donation.donorName}</p>
                    <p className="text-sm text-gray-600">
                      Requested by: {donation.donorType === 'doctor' ? `Dr. ${donation.doctorName}` : 'Patient'}
                    </p>
                    <p className="text-sm text-gray-600">Age: {donation.age} | Blood: {donation.bloodType}</p>
                    <p className="text-sm text-gray-600">Organs: {donation.selectedOrgans.join(', ')}</p>
                    <p className="text-xs text-gray-500 font-mono mt-2">TX: {donation.transactionHash?.substring(0, 20)}...</p>
                  </div>
                  <button
                    onClick={() => handleApprove(donation.id)}
                    disabled={approving === donation.id}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
                  >
                    {approving === donation.id ? (
                      <Loader className="animate-spin h-4 w-4" />
                    ) : (
                      <CheckCircle className="h-4 w-4" />
                    )}
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approved Donations */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Approved Donations ({approvedDonations.length})
        </h3>
        
        {approvedDonations.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No approved donations</p>
        ) : (
          <div className="space-y-3">
            {approvedDonations.map((donation) => (
              <div key={donation.id} className="border-2 border-green-200 bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-bold text-gray-900">{donation.donorName}</p>
                    <p className="text-sm text-gray-600">Organs: {donation.selectedOrgans.join(', ')}</p>
                    <p className="text-xs text-gray-500 font-mono">Request TX: {donation.transactionHash?.substring(0, 20)}...</p>
                    <p className="text-xs text-gray-500 font-mono">Approval TX: {donation.approvalTxHash?.substring(0, 20)}...</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

