'use client'
import { Calendar, Clock, User, Trash2 } from 'lucide-react'
import { mockAppointments } from '../../lib/mockData'

export default function AppointmentsList() {
  return (
    <div className="space-y-4">
      {mockAppointments.map((apt) => (
        <div
          key={apt.id}
          className="bg-white rounded-lg border-2 border-blue-100 p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900">{apt.doctorName}</h3>
              <p className="text-sm text-blue-600 font-medium">{apt.specialty}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">{apt.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">{apt.time}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mt-2">Reason: {apt.reason}</p>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  apt.status === 'confirmed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
              </span>
              <button className="text-red-600 hover:text-red-700">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
