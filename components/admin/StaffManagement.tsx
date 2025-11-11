'use client'
import { useEffect, useState } from 'react'
import { getAllDoctors, getAllPatients, deleteUser } from '../../lib/firebaseServices'
import { User, Trash2, Loader } from 'lucide-react'

export default function StaffManagement() {
  const [doctors, setDoctors] = useState<any[]>([])
  const [patients, setPatients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'doctors' | 'patients'>('doctors')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const doctorsData = await getAllDoctors()
      const patientsData = await getAllPatients()
      setDoctors(doctorsData)
      setPatients(patientsData)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, type: 'doctors' | 'patients') => {
    if (!confirm('Are you sure you want to delete this user?')) return
    
    const result = await deleteUser(id, type)
    if (result.success) {
      fetchData()
      alert('✅ Deleted successfully')
    } else {
      alert('❌ Delete failed')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="animate-spin h-12 w-12 text-red-600" />
      </div>
    )
  }

  const currentList = activeTab === 'doctors' ? doctors : patients

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Staff Management</h1>
      
      <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('doctors')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'doctors'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Doctors ({doctors.length})
          </button>
          <button
            onClick={() => setActiveTab('patients')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'patients'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Patients ({patients.length})
          </button>
        </div>

        <div className="space-y-4">
          {currentList.map((item) => (
            <div key={item.id} className="border-2 border-gray-200 rounded-lg p-4 flex items-center justify-between hover:border-gray-300 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`${
                  activeTab === 'doctors' ? 'bg-green-100' : 'bg-blue-100'
                } w-12 h-12 rounded-full flex items-center justify-center`}>
                  <User className={`h-6 w-6 ${
                    activeTab === 'doctors' ? 'text-green-600' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{item.name || item.email}</p>
                  <p className="text-sm text-gray-600">{item.email}</p>
                  {activeTab === 'doctors' && item.specialty && (
                    <p className="text-xs text-gray-500">Specialty: {item.specialty}</p>
                  )}
                  {activeTab === 'patients' && item.bloodType && (
                    <p className="text-xs text-gray-500">Blood Type: {item.bloodType} | Age: {item.age}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleDelete(item.id, activeTab)}
                className="bg-red-100 text-red-800 p-2 rounded-lg hover:bg-red-200 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}

          {currentList.length === 0 && (
            <p className="text-gray-600 text-center py-8">No {activeTab} found</p>
          )}
        </div>
      </div>
    </div>
  )
}

