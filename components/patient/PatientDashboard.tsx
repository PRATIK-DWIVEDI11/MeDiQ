'use client'
import { useEffect, useState } from 'react'
import { Calendar, Users, Heart, Loader, AlertCircle } from 'lucide-react'
import { useAuthStore } from '../../lib/authContext'
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'

interface PatientData {
  name: string
  age: number
  bloodType: string
  appointments: number
  upcomingAppointments: number
}

export default function PatientDashboard() {
  const { user } = useAuthStore()
  const [patientData, setPatientData] = useState<PatientData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      fetchPatientData()
    }
  }, [user])

  const fetchPatientData = async () => {
    try {
      setLoading(true)
      setError('')

      // Get patient profile
      const patientRef = doc(db, 'patients', user?.uid!)
      const patientSnap = await getDoc(patientRef)
      
      let patientInfo = {
        name: user?.displayName || 'Patient',
        age: 0,
        bloodType: 'O+',
      }
      
      if (patientSnap.exists()) {
        patientInfo = { ...patientInfo, ...patientSnap.data() }
      }

      // Get appointments count
      const appointmentsRef = collection(db, 'appointments')
      const appointmentsQuery = query(appointmentsRef, where('patientId', '==', user?.uid))
      const appointmentsSnap = await getDocs(appointmentsQuery)
      
      const totalAppointments = appointmentsSnap.size
      const upcomingAppointments = appointmentsSnap.docs.filter(doc => 
        doc.data().status === 'confirmed'
      ).length

      setPatientData({
        ...patientInfo,
        appointments: totalAppointments,
        upcomingAppointments,
      })
    } catch (err: any) {
      console.error('Error fetching patient data:', err)
      setError('Could not load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="animate-spin h-12 w-12 text-blue-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex items-center gap-3">
        <AlertCircle className="h-5 w-5" />
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900">Welcome, {patientData?.name}!</h2>
        <p className="text-gray-600 mt-1">Age: {patientData?.age} | Blood Type: {patientData?.bloodType}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Appointments</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{patientData?.appointments || 0}</p>
            </div>
            <Calendar className="h-12 w-12 text-blue-300" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Upcoming</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{patientData?.upcomingAppointments || 0}</p>
            </div>
            <Users className="h-12 w-12 text-green-300" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Health Score</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">85/100</p>
            </div>
            <Heart className="h-12 w-12 text-purple-300" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <a
            href="/patient/book-appointment"
            className="bg-blue-600 text-white p-4 rounded-lg text-center font-semibold hover:bg-blue-700 transition-colors"
          >
            📅 Book Appointment
          </a>
          <a
            href="/patient/medical-records"
            className="bg-purple-600 text-white p-4 rounded-lg text-center font-semibold hover:bg-purple-700 transition-colors"
          >
            📄 Medical Records
          </a>
        </div>
      </div>
    </div>
  )
}
