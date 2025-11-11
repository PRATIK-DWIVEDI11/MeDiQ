'use client'
import { useEffect, useState } from 'react'
import { useAuthStore } from '../../lib/authContext'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { Calendar, Clock, User, Loader, AlertCircle, CheckCircle } from 'lucide-react'

export default function MyAppointments() {
  const { user } = useAuthStore()
  const [pendingAppointments, setPendingAppointments] = useState<any[]>([])
  const [confirmedAppointments, setConfirmedAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.uid) fetchAppointments()
  }, [user?.uid])

  const fetchAppointments = async () => {
    try {
      const patientDoc = await getDoc(doc(db, 'patients', user!.uid))
      if (patientDoc.exists()) {
        const data = patientDoc.data()
        setPendingAppointments(data.pendingAppointments || [])
        setConfirmedAppointments(data.appointments || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="animate-spin h-12 w-12 text-blue-600" />
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Appointments</h1>
      {/* Pending */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
          <AlertCircle className="h-6 w-6" />
          Pending Approval ({pendingAppointments.length})
        </h2>
        {pendingAppointments.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-600">No pending appointments</div>
        ) : (
          <div className="space-y-3">
            {pendingAppointments.map((apt: any, idx: number) => (
              <div key={idx} className="bg-white border-2 border-orange-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-900">{apt.doctorName}</p>
                    <p className="text-sm text-gray-600">{apt.specialty}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />{apt.date}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />{apt.time}
                      </div>
                    </div>
                  </div>
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold">PENDING</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Confirmed */}
      <div>
        <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
          <CheckCircle className="h-6 w-6" />
          Confirmed Appointments ({confirmedAppointments.length})
        </h2>
        {confirmedAppointments.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-600">No confirmed appointments</div>
        ) : (
          <div className="space-y-3">
            {confirmedAppointments.map((apt: any, idx: number) => (
              <div key={idx} className="bg-white border-2 border-green-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-900">{apt.doctorName}</p>
                    <p className="text-sm text-gray-600">{apt.specialty}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />{apt.date}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />{apt.time}
                      </div>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">CONFIRMED</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
