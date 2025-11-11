'use client'
import { useEffect, useState } from 'react'
import { useAuthStore } from '../../lib/authContext'
import { getMedicalRecords } from '../../lib/firebaseServices'
import { FileText, Calendar, Loader, Stethoscope } from 'lucide-react'

export default function MedicalRecords() {
  const { user } = useAuthStore()
  const [records, setRecords] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) fetchRecords()
  }, [user])

  const fetchRecords = async () => {
    try {
      const data = await getMedicalRecords(user?.uid!)
      // Sorted with latest on top
      setRecords([...data].sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || "")))
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
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Medical Records</h1>
      
      <div className="space-y-4">
        {records.length === 0 && (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No medical records yet</p>
          </div>
        )}

        {records.map((record) => (
          <div key={record.id} className="bg-white rounded-lg border-2 border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{record.specialty} Consultation</h3>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Doctor:</span> {record.doctorName}<br/>
                  <span className="font-semibold">Symptoms:</span> {record.symptoms}<br/>
                  <span className="font-semibold">Reason:</span> {record.reason}
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  {record.date} {record.time}
                  <span className="ml-3">{record.status}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

