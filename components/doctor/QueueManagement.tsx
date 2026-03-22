'use client'
import { useState, useEffect } from 'react'
import { Clock, Users, ArrowUp, ArrowDown, Loader, Plus, SkipForward, CheckCircle } from 'lucide-react'
import { useAuthStore } from '../../lib/authContext'
import {
  subscribeToQueue,
  addPatientToQueue,
  markCurrentPatientDone,
  getConfirmedPatientsNotInQueue
} from '../../lib/firebaseServices'

export default function QueueManagement() {
  const { user } = useAuthStore()
  const [queue, setQueue] = useState<any[]>([])
  const [confirmedPatients, setConfirmedPatients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [addSlot, setAddSlot] = useState<{ [pid: string]: string }>({})
  const [adding, setAdding] = useState<string | null>(null)
  const [completing, setCompleting] = useState(false)

  // Real-time queue subscription
  useEffect(() => {
    if (!user?.uid) return

    const unsubscribe = subscribeToQueue(user.uid, (liveQueue) => {
      setQueue(liveQueue)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user?.uid])

  // Fetch confirmed patients not yet in queue
  useEffect(() => {
    if (!user?.uid) return
    fetchConfirmed()
  }, [user?.uid, queue])

  const fetchConfirmed = async () => {
    const patients = await getConfirmedPatientsNotInQueue(user!.uid, queue)
    setConfirmedPatients(patients)
  }

  const handleAddToQueue = async (patient: any) => {
    if (!addSlot[patient.id]) {
      alert('Please assign a time slot first')
      return
    }
    setAdding(patient.id)
    await addPatientToQueue(user!.uid, {
      patientId: patient.patientId || patient.id,
      patientName: patient.patientName || patient.name,
      assignedTime: addSlot[patient.id],
      symptoms: patient.symptoms || '',
      status: 'WAITING'
    })
    setAddSlot(s => ({ ...s, [patient.id]: '' }))
    setAdding(null)
  }

  const handleNextPatient = async () => {
    if (queue.length === 0) return
    setCompleting(true)
    await markCurrentPatientDone(user!.uid)
    setCompleting(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin h-10 w-10 text-green-600" />
        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading queue...</span>
      </div>
    )
  }

  const currentPatient = queue[0] || null

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Queue Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block"></span>
            Live — updates instantly for all patients
          </p>
        </div>

        {/* NEXT PATIENT BUTTON — the most important button */}
        <button
          onClick={handleNextPatient}
          disabled={queue.length === 0 || completing}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg transition-all hover:scale-105 disabled:scale-100"
        >
          {completing
            ? <><Loader className="h-5 w-5 animate-spin" /> Updating...</>
            : <><SkipForward className="h-5 w-5" /> Next Patient</>
          }
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-6 rounded-2xl border-2 border-green-200 dark:border-green-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">In Queue</p>
              <p className="text-5xl font-bold text-green-600 mt-1">{queue.length}</p>
            </div>
            <Users className="h-12 w-12 text-green-300" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-2xl border-2 border-blue-200 dark:border-blue-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Est. Total Time</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{queue.length * 15} min</p>
            </div>
            <Clock className="h-12 w-12 text-blue-300" />
          </div>
        </div>
      </div>

      {/* Current Patient Banner */}
      {currentPatient && (
        <div className="bg-green-500 dark:bg-green-600 rounded-2xl p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 rounded-full p-3">
              <CheckCircle className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm text-green-100">Currently Seeing</p>
              <p className="text-2xl font-bold">{currentPatient.patientName}</p>
              <p className="text-green-100 text-sm">{currentPatient.symptoms || 'No symptoms listed'}</p>
            </div>
          </div>
          <button
            onClick={handleNextPatient}
            disabled={completing}
            className="bg-white text-green-600 font-bold px-5 py-2.5 rounded-xl hover:bg-green-50 transition-colors flex items-center gap-2"
          >
            <SkipForward className="h-4 w-4" />
            Done → Next
          </button>
        </div>
      )}

      {/* Add Confirmed Patients to Queue */}
      {confirmedPatients.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-blue-700 p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Plus className="h-5 w-5 text-blue-600" />
            Add to Queue
            <span className="text-sm font-normal text-gray-500 ml-2">(Today's confirmed patients)</span>
          </h3>
          <div className="space-y-3">
            {confirmedPatients.map((p: any) => (
              <div key={p.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">{p.patientName || p.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{p.symptoms || 'No symptoms listed'}</p>
                </div>
                <input
                  type="time"
                  value={addSlot[p.id] || ''}
                  onChange={e => setAddSlot(s => ({ ...s, [p.id]: e.target.value }))}
                  className="border border-gray-300 dark:border-gray-500 dark:bg-gray-800 dark:text-white rounded-lg px-2 py-1 text-sm"
                />
                <button
                  onClick={() => handleAddToQueue(p)}
                  disabled={adding === p.id || !addSlot[p.id]}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg flex items-center gap-1 text-sm font-medium transition-colors"
                >
                  {adding === p.id ? <Loader className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Queue List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Today's Queue</h3>

        {queue.length === 0 ? (
          <div className="text-center py-10">
            <Users className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No patients in queue yet</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Add confirmed patients above to start the queue</p>
          </div>
        ) : (
          <div className="space-y-3">
            {queue.map((patient: any, index: number) => (
              <div
                key={patient.patientId || index}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  index === 0
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-400'
                    : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                  index === 0 ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {patient.patientName}
                    {index === 0 && <span className="ml-2 text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">In Progress</span>}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{patient.symptoms || 'No symptoms'} · {patient.assignedTime}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 dark:text-gray-500">~{index * 15} min wait</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}



