'use client'
import { useEffect, useState } from 'react'
import { Users, Calendar, Clock, Activity, Loader } from 'lucide-react'
import { useAuthStore } from '../../lib/authContext'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../lib/firebase'

export default function DoctorDashboard() {
  const { user } = useAuthStore()
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    avgRating: 4.8
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchDoctorStats()
    }
  }, [user])

  const fetchDoctorStats = async () => {
    try {
      const appointmentsRef = collection(db, 'appointments')
      const q = query(appointmentsRef, where('doctorId', '==', user?.uid))
      const snapshot = await getDocs(q)
      
      const uniquePatients = new Set(snapshot.docs.map(doc => doc.data().patientId))
      
      const today = new Date().toISOString().split('T')[0]
      const todayAppts = snapshot.docs.filter(doc => 
        doc.data().date === today
      ).length
      
      setStats({
        totalPatients: uniquePatients.size,
        todayAppointments: todayAppts,
        avgRating: 4.8
      })
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="animate-spin h-12 w-12 text-green-600" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
        <h2 className="text-2xl font-bold text-gray-900">Welcome, Dr. {user?.displayName}!</h2>
        <p className="text-gray-600 mt-1">Your dashboard overview</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Patients</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.totalPatients}</p>
            </div>
            <Users className="h-12 w-12 text-green-300" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Appointments</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{stats.todayAppointments}</p>
            </div>
            <Calendar className="h-12 w-12 text-blue-300" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{stats.avgRating}/5</p>
            </div>
            <Activity className="h-12 w-12 text-purple-300" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <a
            href="/doctor/patients"
            className="bg-green-600 text-white p-4 rounded-lg text-center font-semibold hover:bg-green-700 transition-colors"
          >
            👥 View Patients
          </a>
          <a
            href="/doctor/schedule"
            className="bg-blue-600 text-white p-4 rounded-lg text-center font-semibold hover:bg-blue-700 transition-colors"
          >
            📅 Manage Schedule
          </a>
        </div>
      </div>

      <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-green-600" />
          Today's Schedule
        </h3>
        
        <div className="space-y-3">
          {stats.todayAppointments === 0 ? (
            <p className="text-gray-600 text-center py-4">No appointments scheduled for today</p>
          ) : (
            <p className="text-gray-600">You have {stats.todayAppointments} appointment(s) today</p>
          )}
        </div>
      </div>
    </div>
  )
}

