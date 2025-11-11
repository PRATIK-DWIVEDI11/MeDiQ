'use client'
import { useState, useEffect } from 'react'
import { Clock, Users, Activity, Loader } from 'lucide-react'
import { getQueueForDoctor } from '../../lib/firebaseServices'
import { useAuthStore } from '../../lib/authContext'

// Pass in patient doctorId and patient uid as props (not appointmentId).
export default function QueueStatus({
  doctorId,
  patientId
}: {
  doctorId: string,
  patientId: string
}) {
  const [queue, setQueue] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [myEntry, setMyEntry] = useState<any>(null)

  useEffect(() => {
    if (!doctorId || !patientId) return
    fetchQueue()
    const interval = setInterval(fetchQueue, 20000)
    return () => clearInterval(interval)
  }, [doctorId, patientId])

  const fetchQueue = async () => {
    setLoading(true)
    try {
      const data = await getQueueForDoctor(doctorId)
      setQueue(data)
      // Find patient queue entry
      const found = data.find((q: any) => q.patientId === patientId)
      setMyEntry(found || null)
    } finally {
      setLoading(false)
    }
  }

  const yourPosition = myEntry
    ? queue.findIndex((row: any) => row.patientId === patientId) + 1
    : null
  const estimatedWait =
    yourPosition && yourPosition > 1
      ? (yourPosition - 1) * 15
      : 0

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Queue Status</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Your Position</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">
                {loading ? <Loader className="inline animate-spin h-6 w-6" /> : (yourPosition || '--')}
              </p>
            </div>
            <Users className="h-12 w-12 text-blue-300" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Estimated Wait</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">
                {loading ? <Loader className="inline animate-spin h-5 w-5" /> : (yourPosition ? `${estimatedWait} min` : '--')}
              </p>
            </div>
            <Clock className="h-12 w-12 text-purple-300" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border-2 border-gray-200 p-6 mt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-green-600" />
          Real-time Queue
        </h3>
        {loading ? (
          <div className="flex items-center gap-3 p-2 text-blue-600 font-semibold">
            <Loader className="animate-spin h-5 w-5" /> Loading...
          </div>
        ) : !myEntry ? (
          <div className="text-gray-500">You are not in the current queue.</div>
        ) : (
          <div className="space-y-3">
            {queue.map((q, idx) => (
              <div
                key={q.patientId || idx}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  q.patientId === patientId
                    ? 'bg-blue-50 border-2 border-blue-300'
                    : 'bg-gray-50'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg ${
                    q.patientId === patientId
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {idx + 1}
                </div>
                <p className="font-semibold text-gray-900">
                  {q.patientId === patientId ? 'You' : q.patientName}
                </p>
                <span className="ml-auto font-mono text-purple-700 font-bold text-xs">
                  {q.assignedTime}
                </span>
                {q.patientId === patientId && q.status && (
                  <span className="ml-2 text-xs text-green-700">{q.status}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
