'use client'
import { useState, useEffect } from 'react'
import { Clock, Users, Activity, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { subscribeToQueue } from '../../../lib/firebaseServices'
import { useAuthStore } from '../../../lib/authContext'
import { getAppointmentsByPatient } from '../../../lib/firebaseServices'

export default function QueueStatusPage() {
  const { user } = useAuthStore()
  const [queue, setQueue] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [doctorId, setDoctorId] = useState<string | null>(null)
  const [doctorName, setDoctorName] = useState<string>('')
  const [notInQueue, setNotInQueue] = useState(false)

  // Step 1: Find patient's confirmed appointment to get their doctorId
  useEffect(() => {
    if (!user?.uid) return

    const fetchAppointment = async () => {
      const appointments = await getAppointmentsByPatient(user.uid) as any[]
      const today = new Date().toISOString().split('T')[0]
      const todayAppt = appointments.find(
        (a: any) => a.date === today && a.status === 'CONFIRMED'
      ) as any
      if (todayAppt) {
        setDoctorId(todayAppt.doctorId)
        setDoctorName(todayAppt.doctorName || 'Your Doctor')
      } else {
        setNotInQueue(true)
        setLoading(false)
      }
    }

    fetchAppointment()
  }, [user])

  // Step 2: Subscribe to real-time queue once we have doctorId
  useEffect(() => {
    if (!doctorId) return

    const unsubscribe = subscribeToQueue(doctorId, (liveQueue) => {
      setQueue(liveQueue)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [doctorId])

  const myPosition = queue.findIndex((q: any) => q.patientId === user?.uid) + 1
  const isInQueue = myPosition > 0
  const estimatedWait = myPosition > 1 ? (myPosition - 1) * 15 : 0
  const isNext = myPosition === 1

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading queue...</span>
      </div>
    )
  }

  if (notInQueue || !isInQueue) {
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Queue Status</h1>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-10 text-center">
          <AlertCircle className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">Not in Queue</h2>
          <p className="text-gray-500 dark:text-gray-400">
            You don't have a confirmed appointment today, or your doctor hasn't added you to the queue yet.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-3">
            Please check back after your appointment is confirmed.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Queue Status</h1>
        <p className="text-gray-500 dark:text-gray-400">Doctor: <span className="font-semibold text-blue-600">{doctorName}</span> · Updates in real-time</p>
      </div>

      {/* Status Banner */}
      {isNext && (
        <div className="bg-green-500 rounded-2xl p-5 text-white flex items-center gap-4 animate-pulse">
          <CheckCircle className="h-10 w-10 flex-shrink-0" />
          <div>
            <p className="font-bold text-xl">You're Next! 🎉</p>
            <p className="text-green-100 text-sm">Please proceed to the doctor's room</p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-2xl border-2 border-blue-200 dark:border-blue-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your Position</p>
              <p className="text-5xl font-bold text-blue-600 mt-1">#{myPosition}</p>
            </div>
            <Users className="h-12 w-12 text-blue-300" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-6 rounded-2xl border-2 border-purple-200 dark:border-purple-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Est. Wait</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">
                {isNext ? 'Now!' : `${estimatedWait} min`}
              </p>
            </div>
            <Clock className="h-12 w-12 text-purple-300" />
          </div>
        </div>
      </div>

      {/* Live Queue List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
        <div className="flex items-center gap-2 mb-5">
          <Activity className="h-5 w-5 text-green-500" />
          <h3 className="font-bold text-gray-900 dark:text-white">Live Queue</h3>
          <span className="ml-auto flex items-center gap-1 text-xs text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Live
          </span>
        </div>

        <div className="space-y-3">
          {queue.map((q: any, idx: number) => {
            const isMe = q.patientId === user?.uid
            const isCurrent = idx === 0
            return (
              <div
                key={q.patientId || idx}
                className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                  isMe
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-400'
                    : isCurrent
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-300'
                    : 'bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600'
                }`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold ${
                  isMe ? 'bg-blue-600 text-white' :
                  isCurrent ? 'bg-green-500 text-white' :
                  'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200'
                }`}>
                  {idx + 1}
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {isMe ? '👤 You' : q.patientName || `Patient ${idx + 1}`}
                  </p>
                  {isCurrent && !isMe && (
                    <p className="text-xs text-green-600 dark:text-green-400">Currently with doctor</p>
                  )}
                </div>

                <div className="text-right">
                  {isCurrent && (
                    <span className="text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2 py-1 rounded-full font-medium">In Progress</span>
                  )}
                  {isMe && !isCurrent && (
                    <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full font-medium">That's you!</span>
                  )}
                  {!isMe && !isCurrent && (
                    <span className="text-xs text-gray-400">~{idx * 15} min</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

