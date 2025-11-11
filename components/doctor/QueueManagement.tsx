'use client'
import { useEffect, useState } from 'react'
import { Clock, Users, ArrowUp, ArrowDown, Loader, CheckCircle, Plus } from 'lucide-react'
import { useAuthStore } from '../../lib/authContext'
import { 
  getQueueForDoctor, 
  addPatientToQueue, 
  updateQueuePositions, 
  markPatientStatus 
} from '../../lib/firebaseServices'

// Dummy function to fetch confirmed patients not in queue (implement as per your API)
async function getConfirmedPatientsNotInQueue(doctorId: string, queue: any[]) {
  // Implement logic to fetch today's confirmed patients not already in queue
  // For demo, return a static array:
  return [
    // Example: { id: 'xyz', name: 'Amit Kumar', symptoms: 'Fever', time: '', status: 'CONFIRMED' }
  ]
}

export default function QueueManagement() {
  const { user } = useAuthStore()
  const [queue, setQueue] = useState<any[]>([])
  const [confirmedPatients, setConfirmedPatients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [addSlot, setAddSlot] = useState<{[pid: string]: string}>({})
  const [adding, setAdding] = useState<string | null>(null)

  useEffect(() => {
    if (user?.uid) fetchAll()
    // eslint-disable-next-line
  }, [user?.uid])

  const fetchAll = async () => {
    setLoading(true)
    const queueData = await getQueueForDoctor(user!.uid)
    setQueue(queueData)
    // Pull only patients not currently in queue
    const notInQueue = await getConfirmedPatientsNotInQueue(user!.uid, queueData)
    setConfirmedPatients(notInQueue)
    setLoading(false)
  }

  // Reorder
  const moveUp = (index: number) => {
    if (index === 0) return
    const newQueue = [...queue]
    const temp = newQueue[index]
    newQueue[index] = newQueue[index - 1]
    newQueue[index - 1] = temp
    setQueue(newQueue)
  }
  const moveDown = (index: number) => {
    if (index === queue.length - 1) return
    const newQueue = [...queue]
    const temp = newQueue[index]
    newQueue[index] = newQueue[index + 1]
    newQueue[index + 1] = temp
    setQueue(newQueue)
  }

  // Save entire queue order
  const saveQueue = async () => {
    setSaving(true)
    await updateQueuePositions(user!.uid, queue)
    setSaving(false)
    fetchAll()
  }

  // Mark patient as 'SEEING' or 'COMPLETED'
  const markAsSeeing = async (pid: string) => {
    await markPatientStatus(pid, 'SEEING')
    fetchAll()
  }
  const markAsCompleted = async (pid: string) => {
    await markPatientStatus(pid, 'COMPLETED')
    fetchAll()
  }

  // Add patient to queue with assigned time
  const handleAddToQueue = async (patient: any) => {
    if (!addSlot[patient.id]) {
      alert('Please assign a slot/time')
      return
    }
    setAdding(patient.id)
    await addPatientToQueue(user!.uid, {
      patientId: patient.id,
      patientName: patient.name,
      assignedTime: addSlot[patient.id],
      symptoms: patient.symptoms || '',
      status: 'WAITING'
    })
    setAddSlot(s => ({ ...s, [patient.id]: '' }))
    setAdding(null)
    fetchAll()
  }

  if (loading) {
    return <div className="flex justify-center py-10"><Loader className="animate-spin h-12 w-12 text-blue-600" /></div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Queue Management</h1>
        <button onClick={saveQueue} disabled={saving}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Queue Order'}
        </button>
      </div>

      {/* Add patients to queue */}
      <div className="bg-white rounded-lg border-2 border-blue-200 p-6 mb-6">
        <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
          <Plus className="h-5 w-5 text-blue-600" />
          Add Patient to Queue
        </h3>
        {confirmedPatients.length === 0 ? (
          <p className="text-gray-600">No confirmed patients to add</p>
        ) : (
          <div className="space-y-3">
            {confirmedPatients.map((p) => (
              <div key={p.id} className="flex items-center border-b py-3 gap-3">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{p.name}</p>
                  <p className="text-xs text-gray-600">{p.symptoms}</p>
                </div>
                <input
                  type="time"
                  value={addSlot[p.id] || ''}
                  onChange={e => setAddSlot(slots => ({ ...slots, [p.id]: e.target.value }))}
                  className="border rounded px-2 mr-2"
                />
                <button
                  onClick={() => handleAddToQueue(p)}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  disabled={adding === p.id || !addSlot[p.id]}
                >
                  {adding === p.id ? <Loader className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                  {adding === p.id ? 'Adding...' : 'Add'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CURRENT QUEUE */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Patients in Queue</p>
              <p className="text-4xl font-bold text-green-600 mt-2">{queue.length}</p>
            </div>
            <Users className="h-12 w-12 text-green-300" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Time per Patient</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">15m</p>
            </div>
            <Clock className="h-12 w-12 text-blue-300" />
          </div>
        </div>
      </div>

      {queue.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-600">
          No patients in queue for today
        </div>
      ) : (
        <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Today's Queue</h3>
          <div className="space-y-3">
            {queue.map((patient: any, index: number) => (
              <div key={patient.patientId || patient.id} className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 border-2 border-gray-200">
                <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{patient.patientName}</p>
                  <p className="text-sm text-gray-600">{patient.symptoms}</p>
                  <p className="text-xs text-gray-500">Time: {patient.assignedTime}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => moveUp(index)} disabled={index === 0} className="p-2 bg-blue-100 hover:bg-blue-200 rounded disabled:opacity-30">
                    <ArrowUp className="h-4 w-4 text-blue-600" />
                  </button>
                  <button onClick={() => moveDown(index)} disabled={index === queue.length - 1} className="p-2 bg-blue-100 hover:bg-blue-200 rounded disabled:opacity-30">
                    <ArrowDown className="h-4 w-4 text-blue-600" />
                  </button>
                  <button onClick={() => markAsSeeing(patient.patientId || patient.id)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded text-sm">Seeing</button>
                  <button onClick={() => markAsCompleted(patient.patientId || patient.id)}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm">Done</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

