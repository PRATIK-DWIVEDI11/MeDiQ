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
  const [addForm, setAddForm] = useState<any>({ name: '', email: '', specialty: '', rating: 4.5, experience: '', consultationFee: 600, bio: '' })
  const [crudLoading, setCrudLoading] = useState(false)
  const [crudSuccess, setCrudSuccess] = useState('')
  const [crudError, setCrudError] = useState('')

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = async () => {
    setLoading(true)
    try {
      const statsRes = await getAdminStats()
      const doctorRes = await getAllDoctors()
      const patientRes = await getAllPatients()
      setStats(statsRes)
      setDoctors(doctorRes)
      setPatients(patientRes)
    } catch (e) {
      setCrudError('Error loading admin data!')
      setTimeout(() => setCrudError(''), 3000)
    } finally {
      setLoading(false)
    }
  }

  // CRUD: DOCTOR ADD
  const handleAddDoctor = async () => {
    try {
      setCrudLoading(true)
      const schedule = {
        monday: ["09:00-10:00", "10:00-11:00", "14:00-15:00"],
        tuesday: ["09:00-10:00", "14:00-15:00"],
        wednesday: ["09:00-10:00"],
        thursday: ["14:00-15:00"],
        friday: ["09:00-10:00", "10:00-11:00", "14:00-15:00"],
        saturday: ["10:00-11:00", "14:00-15:00"],
        sunday: []
      }
      const resp = await addDoctor({ ...addForm, schedule })
      if (resp.success) {
        setCrudSuccess('Doctor added!')
        setAddForm({ name: '', email: '', specialty: '', rating: 4.5, experience: '', consultationFee: 600, bio: '' })
        fetchAll()
      } else throw resp.error
    } catch (e: any) {
      setCrudError(e.message || 'Add error')
    } finally {
      setCrudLoading(false)
      setTimeout(() => { setCrudSuccess(''); setCrudError('') }, 1800)
    }
  }

  // CRUD: DOCTOR DELETE
  const handleDeleteDoctor = async (id: string) => {
    if (!confirm('Delete this doctor?')) return
    try {
      setCrudLoading(true)
      await removeDoctor(id)
      setCrudSuccess('Deleted doctor!')
      fetchAll()
    } catch (e: any) {
      setCrudError(e.message || 'Delete error')
    } finally {
      setCrudLoading(false)
      setTimeout(() => { setCrudSuccess(''); setCrudError('') }, 1800)
    }
  }

  // CRUD: DOCTOR UPDATE
  const handleStartEdit = (doc: any) => {
    setEditId(doc.id)
    setUpdatedDoctor({ ...doc })
  }
  const handleUpdateDoctor = async () => {
    try {
      setCrudLoading(true)
      await updateDoctor(editId!, updatedDoctor)
      setCrudSuccess('Updated doctor!')
      setEditId(null)
      fetchAll()
    } catch (e: any) {
      setCrudError(e.message || 'Update error')
    } finally {
      setCrudLoading(false)
      setTimeout(() => { setCrudSuccess(''); setCrudError('') }, 1800)
    }
  }

  // CRUD: PATIENT DELETE
  const handleDeletePatient = async (id: string) => {
    if (!confirm('Delete this patient?')) return
    try {
      setCrudLoading(true)
      await deleteUser(id, "patients")
      setCrudSuccess('Deleted patient!')
      fetchAll()
    } catch (e: any) {
      setCrudError(e.message || 'Delete error')
    } finally {
      setCrudLoading(false)
      setTimeout(() => { setCrudSuccess(''); setCrudError('') }, 1800)
    }
  }

  if (loading) {
    return <div className="flex justify-center py-10"><Loader className="animate-spin h-16 w-16 text-blue-500" /></div>
  }

  return (
    <div>
      {/* Message */}
      {(crudSuccess || crudError) && (
        <div className={`rounded-lg p-4 my-4 text-center font-semibold ${crudSuccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {crudSuccess || crudError}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button onClick={()=>setTab('overview')}
          className={`py-2 px-4 font-semibold rounded ${tab==='overview'?'bg-blue-600 text-white':'bg-gray-100 text-gray-800 hover:bg-blue-50'}`}>
          Overview
        </button>
        <button onClick={()=>setTab('doctors')}
          className={`py-2 px-4 font-semibold rounded ${tab==='doctors'?'bg-blue-600 text-white':'bg-gray-100 text-gray-800 hover:bg-blue-50'}`}>
          Staff/Doctors ({doctors.length})
        </button>
        <button onClick={()=>setTab('patients')}
          className={`py-2 px-4 font-semibold rounded ${tab==='patients'?'bg-blue-600 text-white':'bg-gray-100 text-gray-800 hover:bg-blue-50'}`}>
          Patients ({patients.length})
        </button>
        <button onClick={fetchAll} className="ml-auto bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded">
          <RefreshCw className="inline h-5 w-5" />
        </button>
      </div>

      {/* Overview */}
      {tab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="bg-white rounded-lg p-6 border-2 border-blue-200 text-center">
            <Users className="h-12 w-12 text-blue-700 mx-auto mb-2" />
            <p className="text-3xl font-bold">{stats.totalPatients}</p>
            <p className="font-semibold text-gray-900">Total Patients</p>
          </div>
          <div className="bg-white rounded-lg p-6 border-2 border-green-200 text-center">
            <Stethoscope className="h-12 w-12 text-green-700 mx-auto mb-2" />
            <p className="text-3xl font-bold">{stats.totalDoctors}</p>
            <p className="font-semibold text-gray-900">Total Doctors</p>
          </div>
          <div className="bg-white rounded-lg p-6 border-2 border-yellow-200 text-center">
            <CheckCircle className="h-12 w-12 text-yellow-600 mx-auto mb-2" />
            <p className="text-3xl font-bold">{stats.confirmedAppointments}</p>
            <p className="font-semibold text-gray-900">Confirmed Appointments</p>
          </div>
          <div className="bg-white rounded-lg p-6 border-2 border-red-200 text-center">
            <XCircle className="h-12 w-12 text-red-700 mx-auto mb-2" />
            <p className="text-3xl font-bold">{stats.pendingAppointments}</p>
            <p className="font-semibold text-gray-900">Pending</p>
          </div>
        </div>
      )}

      {/* Doctors CRUD */}
      {tab === 'doctors' && (
        <div className="mb-12">
          {/* Add Doctor */}
          <div className="bg-white rounded-xl border-2 border-blue-200 p-6 mb-8 flex gap-3 items-center">
            <input type="text" placeholder="Name" className="border rounded px-2 py-1 mr-2 flex-1"
              value={addForm.name} onChange={e=>setAddForm({...addForm, name:e.target.value})}/>
            <input type="email" placeholder="Email" className="border rounded px-2 py-1 mr-2 flex-1"
              value={addForm.email} onChange={e=>setAddForm({...addForm, email:e.target.value})}/>
            <input type="text" placeholder="Specialty" className="border rounded px-2 py-1 mr-2 flex-1"
              value={addForm.specialty} onChange={e=>setAddForm({...addForm, specialty:e.target.value})}/>
            <input type="text" placeholder="Exp: 5 years" className="border rounded px-2 py-1 mr-2 flex-1"
              value={addForm.experience} onChange={e=>setAddForm({...addForm, experience:e.target.value})}/>
            <input type="number" placeholder="Fee" className="border rounded px-2 py-1 mr-2 w-24"
              value={addForm.consultationFee} onChange={e=>setAddForm({...addForm, consultationFee:e.target.value})}/>
            <input type="text" placeholder="Bio" className="border rounded px-2 py-1 mr-2 flex-2"
              value={addForm.bio} onChange={e=>setAddForm({...addForm, bio:e.target.value})}/>
            <button onClick={handleAddDoctor}
              className="bg-blue-600 text-white py-2 px-6 rounded flex items-center gap-2 hover:bg-blue-700 font-semibold"
              disabled={crudLoading}>
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>
          {/* Doctors List CRUD */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Specialty</th>
                  <th className="p-2">Exp</th>
                  <th className="p-2">Fee</th>
                  <th className="p-2">Rating</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map(doc =>
                  editId === doc.id ? (
                    <tr key={doc.id} className="bg-yellow-50">
                      <td><input className="border px-2 py-1" value={updatedDoctor.name}
                        onChange={e=>setUpdatedDoctor({...updatedDoctor, name:e.target.value})} /></td>
                      <td><input className="border px-2 py-1" value={updatedDoctor.email}
                        onChange={e=>setUpdatedDoctor({...updatedDoctor, email:e.target.value})} /></td>
                      <td><input className="border px-2 py-1" value={updatedDoctor.specialty}
                        onChange={e=>setUpdatedDoctor({...updatedDoctor, specialty:e.target.value})} /></td>
                      <td><input className="border px-2 py-1" value={updatedDoctor.experience}
                        onChange={e=>setUpdatedDoctor({...updatedDoctor, experience:e.target.value})} /></td>
                      <td><input className="border px-2 py-1" type="number" value={updatedDoctor.consultationFee}
                        onChange={e=>setUpdatedDoctor({...updatedDoctor, consultationFee:e.target.value})} /></td>
                      <td><input className="border px-2 py-1" type="number" step="0.1" value={updatedDoctor.rating}
                        onChange={e=>setUpdatedDoctor({...updatedDoctor, rating:e.target.value})} /></td>
                      <td>
                        <button className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                          onClick={handleUpdateDoctor} disabled={crudLoading}><CheckCircle className="inline h-4 w-4" /></button>
                        <button className="bg-gray-400 text-white px-3 py-1 rounded"
                          onClick={()=>setEditId(null)}><XCircle className="inline h-4 w-4" /></button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={doc.id} className="odd:bg-gray-50">
                      <td className="p-2 font-bold">{doc.name}</td>
                      <td className="p-2">{doc.email}</td>
                      <td className="p-2">{doc.specialty}</td>
                      <td className="p-2">{doc.experience}</td>
                      <td className="p-2">{doc.consultationFee}</td>
                      <td className="p-2">{doc.rating}</td>
                      <td className="p-2">
                        <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                          onClick={()=>handleStartEdit(doc)}><Edit className="inline h-4 w-4" /></button>
                        <button className="bg-red-600 text-white px-2 py-1 rounded"
                          onClick={()=>handleDeleteDoctor(doc.id)} disabled={crudLoading}><Trash2 className="inline h-4 w-4" /></button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Patients CRUD */}
      {tab === 'patients' && (
        <div className="mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Age</th>
                  <th className="p-2">Blood</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map(patient => (
                  <tr key={patient.id} className="odd:bg-gray-50">
                    <td className="p-2 font-bold">{patient.name || patient.email}</td>
                    <td className="p-2">{patient.email}</td>
                    <td className="p-2">{patient.age}</td>
                    <td className="p-2">{patient.bloodType || 'N/A'}</td>
                    <td className="p-2">
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded"
                        onClick={()=>handleDeletePatient(patient.id)}
                        disabled={crudLoading}><Trash2 className="inline h-4 w-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

