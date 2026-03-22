'use client'
import { useEffect, useState } from 'react'
import { CheckCircle, Clock, Loader, XCircle } from 'lucide-react'
import {
  getPendingDonations, getApprovedDonations, getRejectedDonations,
  approveOrganDonation, rejectOrganDonation, getDonationStats
} from '../../lib/blockchainService'
import { useAuthStore } from '../../lib/authContext'

export default function OrganDonationDetails() {
  const { user } = useAuthStore()
  const [pendingDonations, setPendingDonations] = useState<any[]>([])
  const [approvedDonations, setApprovedDonations] = useState<any[]>([])
  const [rejectedDonations, setRejectedDonations] = useState<any[]>([])
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 })
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'pending' | 'approved' | 'rejected'>('pending')
  const [approving, setApproving] = useState<string | null>(null)
  const [rejecting, setRejecting] = useState<string | null>(null)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    setLoading(true)
    const [pending, approved, rejected, donationStats] = await Promise.all([
      getPendingDonations(), getApprovedDonations(),
      getRejectedDonations(), getDonationStats()
    ])
    setPendingDonations(pending)
    setApprovedDonations(approved)
    setRejectedDonations(rejected)
    setStats(donationStats)
    setLoading(false)
  }

  const handleApprove = async (donationId: string) => {
    setApproving(donationId)
    try {
      const result = await approveOrganDonation(donationId, user?.uid || '')
      if (result.success) {
        alert(`✅ Approved! TX: ${result.approvalTxHash?.substring(0, 20)}...`)
        await fetchData()
      }
    } catch { alert('❌ Approval failed') }
    finally { setApproving(null) }
  }

  const handleReject = async (donationId: string) => {
    if (!confirm('Reject this donation request?')) return
    setRejecting(donationId)
    try {
      const result = await rejectOrganDonation(donationId, user?.uid || '')
      if (result.success) {
        alert('❌ Donation request rejected.')
        await fetchData()
      }
    } catch { alert('❌ Rejection failed') }
    finally { setRejecting(null) }
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
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total', value: stats.total, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
          { label: 'Pending', value: stats.pending, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
          { label: 'Approved', value: stats.approved, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
          { label: 'Rejected', value: stats.rejected, color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} p-5 rounded-xl border-2 ${s.border}`}>
            <p className="text-sm text-gray-600">{s.label}</p>
            <p className={`text-4xl font-bold ${s.color} mt-1`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { key: 'pending', label: `Pending (${stats.pending})`, icon: Clock, active: 'bg-yellow-500' },
          { key: 'approved', label: `Approved (${stats.approved})`, icon: CheckCircle, active: 'bg-green-600' },
          { key: 'rejected', label: `Rejected (${stats.rejected})`, icon: XCircle, active: 'bg-gray-600' },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key as any)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all ${
              tab === t.key ? `${t.active} text-white shadow` : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}>
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* PENDING TAB */}
      {tab === 'pending' && (
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
          {pendingDonations.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No pending donations</p>
          ) : (
            <div className="space-y-3">
              {pendingDonations.map((donation) => (
                <div key={donation.id} className="border-2 border-yellow-200 bg-yellow-50 rounded-xl p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-gray-900">{donation.donorName}</p>
                      <p className="text-sm text-gray-600">
                        Requested by: {donation.donorType === 'doctor' ? `Dr. ${donation.doctorName}` : 'Patient'}
                      </p>
                      <p className="text-sm text-gray-600">Age: {donation.age} | Blood: {donation.bloodType}</p>
                      <p className="text-sm text-gray-600">Organs: {donation.selectedOrgans?.join(', ')}</p>
                      <p className="text-xs text-gray-400 font-mono mt-1">TX: {donation.transactionHash?.substring(0, 25)}...</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => handleApprove(donation.id)}
                        disabled={approving === donation.id || rejecting === donation.id}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2">
                        {approving === donation.id ? <Loader className="animate-spin h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        Approve
                      </button>
                      <button onClick={() => handleReject(donation.id)}
                        disabled={approving === donation.id || rejecting === donation.id}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2">
                        {rejecting === donation.id ? <Loader className="animate-spin h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* APPROVED TAB */}
      {tab === 'approved' && (
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
          {approvedDonations.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No approved donations yet</p>
          ) : (
            <div className="space-y-3">
              {approvedDonations.map((donation) => (
                <div key={donation.id} className="border-2 border-green-200 bg-green-50 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900">{donation.donorName}</p>
                    <p className="text-sm text-gray-600">Organs: {donation.selectedOrgans?.join(', ')}</p>
                    <p className="text-xs text-gray-400 font-mono">Request TX: {donation.transactionHash?.substring(0, 25)}...</p>
                    <p className="text-xs text-gray-400 font-mono">Approval TX: {donation.approvalTxHash?.substring(0, 25)}...</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* REJECTED TAB */}
      {tab === 'rejected' && (
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
          {rejectedDonations.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No rejected donations</p>
          ) : (
            <div className="space-y-3">
              {rejectedDonations.map((donation) => (
                <div key={donation.id} className="border-2 border-gray-200 bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                  <XCircle className="h-6 w-6 text-gray-500 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900">{donation.donorName}</p>
                    <p className="text-sm text-gray-600">Organs: {donation.selectedOrgans?.join(', ')}</p>
                    <p className="text-sm text-gray-500">Age: {donation.age} | Blood: {donation.bloodType}</p>
                    <p className="text-xs text-gray-400 font-mono">Request TX: {donation.transactionHash?.substring(0, 25)}...</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}


