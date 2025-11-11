'use client'
import { useEffect, useState } from 'react'
import { useAuthStore } from '../../lib/authContext'
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc 
} from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { Loader, User, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react'
import { getDoctorPendingRequests, acceptAppointment, rejectAppointment } from '../../lib/firebaseServices'

export default function PatientsList() {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'confirmed' | 'pending'>('pending')
  const [confirmedPatients, setConfirmedPatients] = useState<any[]>([])
  const [pendingRequests, setPendingRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user])

  const fetchData = async () => {
    try {
      setLoading(true)
      console.log('📋 Fetching doctor data...')
      
      // Fetch confirmed patients
      await fetchConfirmedPatients()
      
      // Fetch pending requests
      await fetchPendingRequests()
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const fetchConfirmedPatients = async () => {
    try {
      const appointmentsRef = collection(db, 'appointments')
      const appointmentsQuery = query(
        appointmentsRef, 
        where('doctorId', '==', user?.uid),
        where('status', '==', 'CONFIRMED')
      )
      const appointmentsSnap = await getDocs(appointmentsQuery)
      
      const patientIds = [...new Set(appointmentsSnap.docs.map(doc => doc.data().patientId))]
      
      const patientsData = []
      for (const patientId of patientIds) {
        const patientRef = doc(db, 'patients', patientId)
        const patientSnap = await getDoc(patientRef)
        if (patientSnap.exists()) {
          patientsData.push({
            id: patientId,
            ...patientSnap.data()
          })
        }
      }
      
      setConfirmedPatients(patientsData)
      console.log(`✅ Fetched ${patientsData.length} confirmed patients`)
    } catch (err) {
      console.error('Error fetching confirmed patients:', err)
    }
  }

  const fetchPendingRequests = async () => {
    try {
      const requests = await getDoctorPendingRequests(user!.uid)
      setPendingRequests(requests)
      console.log(`✅ Fetched ${requests.length} pending requests`)
    } catch (err) {
      console.error('Error fetching pending requests:', err)
    }
  }

  const handleAccept = async (appointmentId: string) => {
    try {
      setProcessingId(appointmentId)
      console.log('✅ Accepting appointment:', appointmentId)
      
      const result = await acceptAppointment(appointmentId, user!.uid)
      
      if (result.success) {
        setSuccessMessage('Appointment accepted!')
        setTimeout(() => {
          fetchData()
          setSuccessMessage('')
        }, 1500)
      } else {
        throw new Error('Failed to accept')
      }
    } catch (err: any) {
      console.error('Error:', err)
      setError(err.message || 'Failed to accept appointment')
      setTimeout(() => setError(''), 3000)
    } finally {
      setProcessingId(null)
    }
  }

  const handleReject = async (appointmentId: string) => {
    try {
      setProcessingId(appointmentId)
      console.log('❌ Rejecting appointment:', appointmentId)
      
      const result = await rejectAppointment(appointmentId, user!.uid)
      
      if (result.success) {
        setSuccessMessage('Appointment rejected!')
        setTimeout(() => {
          fetchData()
          setSuccessMessage('')
        }, 1500)
      } else {
        throw new Error('Failed to reject')
      }
    } catch (err: any) {
      console.error('Error:', err)
      setError(err.message || 'Failed to reject appointment')
      setTimeout(() => setError(''), 3000)
    } finally {
      setProcessingId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="animate-spin h-12 w-12 text-green-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Messages */}
      {successMessage && (
        <div className="bg-green-50 border-2 border-green-200 text-green-800 p-4 rounded-lg flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          {successMessage}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-800 p-4 rounded-lg flex items-center gap-2">
          <XCircle className="h-5 w-5" />
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b-2 border-gray-200">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-6 py-3 font-semibold transition-all ${
            activeTab === 'pending'
              ? 'border-b-2 border-orange-600 text-orange-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Clock className="inline h-5 w-5 mr-2" />
          Pending Requests ({pendingRequests.length})
        </button>
        <button
          onClick={() => setActiveTab('confirmed')}
          className={`px-6 py-3 font-semibold transition-all ${
            activeTab === 'confirmed'
              ? 'border-b-2 border-green-600 text-green-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <CheckCircle className="inline h-5 w-5 mr-2" />
          Confirmed Patients ({confirmedPatients.length})
        </button>
      </div>

      {/* PENDING REQUESTS TAB */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          {pendingRequests.length === 0 ? (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8 text-center">
              <AlertCircle className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <p className="text-blue-700">No pending requests</p>
            </div>
          ) : (
            pendingRequests.map((request: any) => (
              <div
                key={request.appointmentId}
                className="bg-white border-2 border-orange-200 rounded-lg p-4 hover:shadow-lg transition"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{request.patientName}</p>
                      <p className="text-sm text-gray-600">{request.patientEmail}</p>
                    </div>
                  </div>
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold">
                    PENDING
                  </span>
                </div>

                {/* Details */}
                <div className="grid grid-cols-3 gap-4 mb-3 py-3 border-y border-gray-200">
                  <div>
                    <p className="text-xs text-gray-600 uppercase">Date & Time</p>
                    <p className="font-semibold text-gray-900">{request.date} @ {request.time}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase">Urgency</p>
                    <p className={`font-semibold ${
                      request.urgency === 'high' ? 'text-red-600' :
                      request.urgency === 'medium' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {request.urgency.toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase">Symptoms</p>
                    <p className="font-semibold text-gray-900 truncate">{request.symptoms}</p>
                  </div>
                </div>

                {/* Symptoms Details */}
                <div className="bg-gray-50 p-3 rounded mb-4">
                  <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Full Symptoms</p>
                  <p className="text-sm text-gray-800">{request.symptoms}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAccept(request.appointmentId)}
                    disabled={processingId === request.appointmentId}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                  >
                    {processingId === request.appointmentId ? (
                      <>
                        <Loader className="animate-spin h-4 w-4" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Accept
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleReject(request.appointmentId)}
                    disabled={processingId === request.appointmentId}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                  >
                    {processingId === request.appointmentId ? (
                      <>
                        <Loader className="animate-spin h-4 w-4" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4" />
                        Reject
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* CONFIRMED PATIENTS TAB */}
      {activeTab === 'confirmed' && (
        <div className="space-y-4">
          {confirmedPatients.length === 0 ? (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8 text-center">
              <User className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <p className="text-blue-700">No confirmed patients yet</p>
            </div>
          ) : (
            confirmedPatients.map((patient: any) => (
              <div
                key={patient.id}
                className="bg-white border-2 border-green-200 rounded-lg p-4 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{patient.name || patient.email}</p>
                    <p className="text-sm text-gray-600">
                      Age: {patient.age} | Blood: {patient.bloodType || 'N/A'} | Email: {patient.email}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Patient ID: {patient.id}</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-semibold text-green-700">Confirmed</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

