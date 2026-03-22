'use client'
import { useEffect, useState } from 'react'
import { Loader, Users, Stethoscope, CheckCircle, XCircle, Plus, Trash2, Edit, RefreshCw } from 'lucide-react'
import { getAdminStats, getAllDoctors, getAllPatients, addDoctor, removeDoctor, updateDoctor, deleteUser } from '../../lib/firebaseServices'

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>({})
  const [doctors, setDoctors] = useState<any[]>([])
  const [patients, setPatients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'overview' | 'doctors' | 'patients'>('overview')
  const [editId, setEditId] = useState<string | null>(null)
  const [updatedDoctor, setUpdatedDoctor] = useState<any>({})
  const [addForm, setAddForm] = useState<any>({ name: '', email: '', specialty: '', rating: '', experience: '', consultationFee: '', bio: '' })
  const [crudLoading, setCrudLoading] = useState(false)
  const [crudSuccess, setCrudSuccess] = useState('')
  const [crudError, setCrudError] = useState('')

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [statsRes, doctorRes, patientRes] = await Promise.all([
        getAdminStats(), getAllDoctors(), getAllPatients()
      ])
      setStats(statsRes)
      setDoctors(doctorRes)
      setPatients(patientRes)
    } catch {
      setCrudError('Error loading admin data!')
      setTimeout(() => setCrudError(''), 3000)
    } finally {
      setLoading(false)
    }
  }

  const handleAddDoctor = async () => {
    try {
      setCrudLoading(true)
      const schedule = {
        monday: ['09:00-10:00', '10:00-11:00', '14:00-15:00'],
        tuesday: ['09:00-10:00', '14:00-15:00'],
        wednesday: ['09:00-10:00'],
        thursday: ['14:00-15:00'],
        friday: ['09:00-10:00', '10:00-11:00', '14:00-15:00'],
        saturday: ['10:00-11:00', '14:00-15:00'],
        sunday: []
      }
      const resp = await addDoctor({ ...addForm, schedule })
      if (resp.success) {
        setCrudSuccess('Doctor added!')
        setAddForm({ name: '', email: '', specialty: '', rating: '', experience: '', consultationFee: '', bio: '' })
        fetchAll()
      } else throw resp.error
    } catch (e: any) {
      setCrudError(e?.message || 'Add error')
    } finally {
      setCrudLoading(false)
      setTimeout(() => { setCrudSuccess(''); setCrudError('') }, 2000)
    }
  }

  const handleDeleteDoctor = async (id: string) => {
    if (!confirm('Delete this doctor?')) return
    try {
      setCrudLoading(true)
      await removeDoctor(id)
      setCrudSuccess('Doctor deleted!')
      fetchAll()
    } catch (e: any) {
      setCrudError(e?.message || 'Delete error')
    } finally {
      setCrudLoading(false)
      setTimeout(() => { setCrudSuccess(''); setCrudError('') }, 2000)
    }
  }

  const handleUpdateDoctor = async () => {
    try {
      setCrudLoading(true)
      await updateDoctor(editId!, updatedDoctor)
      setCrudSuccess('Doctor updated!')
      setEditId(null)
      fetchAll()
    } catch (e: any) {
      setCrudError(e?.message || 'Update error')
    } finally {
      setCrudLoading(false)
      setTimeout(() => { setCrudSuccess(''); setCrudError('') }, 2000)
    }
  }

  const handleDeletePatient = async (id: string) => {
    if (!confirm('Delete this patient?')) return
    try {
      setCrudLoading(true)
      await deleteUser(id, 'patients')
      setCrudSuccess('Patient deleted!')
      fetchAll()
    } catch (e: any) {
      setCrudError(e?.message || 'Delete error')
    } finally {
      setCrudLoading(false)
      setTimeout(() => { setCrudSuccess(''); setCrudError('') }, 2000)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin h-16 w-16 text-red-500" />
      </div>
    )
  }

  return (
    <div>
      {/* Toast */}
      {(crudSuccess || crudError) && (
        <div className={`rounded-xl p-4 mb-6 text-center font-semibold ${
          crudSuccess ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'
        }`}>
          {crudSuccess || crudError}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {[
          { key: 'overview', label: 'Overview' },
          { key: 'doctors', label: `Staff/Doctors (${doctors.length})` },
          { key: 'patients', label: `Patients (${patients.length})` },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key as any)}
            className={`py-2 px-5 font-semibold rounded-lg transition-all ${
              tab === t.key
                ? 'bg-red-600 text-white shadow'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}>
            {t.label}
          </button>
        ))}
        <button onClick={fetchAll}
          className="ml-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-lg">
          <RefreshCw className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* OVERVIEW TAB */}
      {tab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Patients', value: stats.totalPatients, icon: Users, border: 'border-blue-300', bg: 'bg-blue-50', text: 'text-blue-700' },
            { label: 'Total Doctors', value: stats.totalDoctors, icon: Stethoscope, border: 'border-green-300', bg: 'bg-green-50', text: 'text-green-700' },
            { label: 'Confirmed Appointments', value: stats.confirmedAppointments, icon: CheckCircle, border: 'border-yellow-300', bg: 'bg-yellow-50', text: 'text-yellow-700' },
            { label: 'Pending', value: stats.pendingAppointments, icon: XCircle, border: 'border-red-300', bg: 'bg-red-50', text: 'text-red-700' },
          ].map(card => (
            <div key={card.label} className={`${card.bg} rounded-2xl p-6 border-2 ${card.border} text-center`}>
              <card.icon className={`h-12 w-12 mx-auto mb-3 ${card.text}`} />
              <p className={`text-4xl font-bold ${card.text}`}>{card.value ?? 0}</p>
              <p className={`font-semibold mt-1 ${card.text}`}>{card.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* DOCTORS TAB */}
      {tab === 'doctors' && (
  <div className="space-y-6">
    {/* Add Doctor Form */}
    <div className="bg-white rounded-2xl border-2 border-blue-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Plus className="h-5 w-5 text-blue-600" /> Add New Doctor
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { placeholder: 'Full Name *', key: 'name', type: 'text' },
          { placeholder: 'Email *', key: 'email', type: 'email' },
          { placeholder: 'Specialty *', key: 'specialty', type: 'text' },
          { placeholder: 'Experience (e.g. 5) *', key: 'experience', type: 'number' },
          { placeholder: 'Consultation Fee (₹) *', key: 'consultationFee', type: 'number' },
          { placeholder: 'Rating (e.g. 4.5) *', key: 'rating', type: 'number' },
        ].map(f => (
          <input
            key={f.key}
            type={f.type}
            placeholder={f.placeholder}
            value={addForm[f.key]}
            onChange={e => setAddForm({ ...addForm, [f.key]: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ))}
      </div>
      <button
        onClick={() => {
          const { name, email, specialty, experience, consultationFee, rating } = addForm
          if (!name || !email || !specialty || !experience || !consultationFee || !rating) {
            setCrudError('Please fill all required fields before adding a doctor.')
            setTimeout(() => setCrudError(''), 3000)
            return
          }
          handleAddDoctor()
        }}
        disabled={crudLoading}
        className="mt-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
      >
        <Plus className="h-4 w-4" /> Add Doctor
      </button>
    </div>

    {/* Doctors Table */}
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {['Name', 'Email', 'Specialty', 'Experience', 'Fee', 'Rating', 'Actions'].map(h => (
                <th key={h} className="p-3 text-sm font-semibold text-gray-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {doctors.map(doc => editId === doc.id ? (
              <tr key={doc.id} className="bg-yellow-50 border-b border-gray-200">
                {['name', 'email', 'specialty', 'experience', 'consultationFee', 'rating'].map(field => (
                  <td key={field} className="p-2">
                    <input
                      className="border border-gray-300 rounded px-2 py-1 text-sm w-full bg-white text-gray-900"
                      value={updatedDoctor[field] || ''}
                      onChange={e => setUpdatedDoctor({ ...updatedDoctor, [field]: e.target.value })}
                    />
                  </td>
                ))}
                <td className="p-2">
                  <div className="flex gap-1">
                    <button onClick={handleUpdateDoctor} disabled={crudLoading}
                      className="bg-green-600 text-white px-3 py-1 rounded text-xs font-medium">Save</button>
                    <button onClick={() => setEditId(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded text-xs font-medium">Cancel</button>
                  </div>
                </td>
              </tr>
            ) : (
              <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-semibold text-gray-900">{doc.name}</td>
                <td className="p-3 text-gray-700 text-sm">{doc.email}</td>
                <td className="p-3 text-gray-700 text-sm">{doc.specialty}</td>
                <td className="p-3 text-gray-700 text-sm">{doc.experience}</td>
                <td className="p-3 text-gray-700 text-sm">₹{doc.consultationFee}</td>
                <td className="p-3 text-gray-700 text-sm">{doc.rating}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button onClick={() => { setEditId(doc.id); setUpdatedDoctor({ ...doc }) }}
                      className="bg-yellow-500 text-white p-1.5 rounded hover:bg-yellow-600">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDeleteDoctor(doc.id)} disabled={crudLoading}
                      className="bg-red-600 text-white p-1.5 rounded hover:bg-red-700">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {doctors.length === 0 && (
              <tr><td colSpan={7} className="p-6 text-center text-gray-500">No doctors found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}

      {/* PATIENTS TAB */}
      {tab === 'patients' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  {['Name', 'Email', 'Age', 'Blood Type', 'Actions'].map(h => (
                    <th key={h} className="p-3 text-sm font-semibold text-gray-700 dark:text-gray-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {patients.map(patient => (
                  <tr key={patient.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="p-3 font-semibold text-gray-900 dark:text-white">{patient.name || patient.email}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-300 text-sm">{patient.email}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-300 text-sm">{patient.age || 'N/A'}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-300 text-sm">{patient.bloodType || 'N/A'}</td>
                    <td className="p-3">
                      <button onClick={() => handleDeletePatient(patient.id)} disabled={crudLoading}
                        className="bg-red-600 text-white p-1.5 rounded hover:bg-red-700">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {patients.length === 0 && (
                  <tr><td colSpan={5} className="p-6 text-center text-gray-500 dark:text-gray-400">No patients found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}


