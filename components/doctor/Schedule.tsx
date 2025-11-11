'use client'
import { useState } from 'react'
import { Calendar, Clock, Plus, Edit2, Trash2 } from 'lucide-react'

export default function Schedule() {
  const [slots, setSlots] = useState([
    { id: 1, day: 'Monday', time: '09:00 - 17:00', available: true },
    { id: 2, day: 'Tuesday', time: '09:00 - 17:00', available: true },
    { id: 3, day: 'Wednesday', time: '09:00 - 17:00', available: true },
    { id: 4, day: 'Thursday', time: '09:00 - 17:00', available: true },
    { id: 5, day: 'Friday', time: '09:00 - 17:00', available: true },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newSlot, setNewSlot] = useState({ day: '', startTime: '', endTime: '' })

  const toggleAvailability = (id: number) => {
    setSlots(slots.map(slot => 
      slot.id === id ? { ...slot, available: !slot.available } : slot
    ))
  }

  const deleteSlot = (id: number) => {
    if (confirm('Are you sure you want to delete this slot?')) {
      setSlots(slots.filter(slot => slot.id !== id))
    }
  }

  const addSlot = () => {
    if (!newSlot.day || !newSlot.startTime || !newSlot.endTime) {
      alert('Please fill all fields')
      return
    }

    const newId = Math.max(...slots.map(s => s.id), 0) + 1
    setSlots([...slots, {
      id: newId,
      day: newSlot.day,
      time: `${newSlot.startTime} - ${newSlot.endTime}`,
      available: true
    }])
    
    setNewSlot({ day: '', startTime: '', endTime: '' })
    setShowAddForm(false)
    alert('✅ Slot added successfully')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Schedule Management</h1>
      
      <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-600" />
            Weekly Availability
          </h3>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Slot
          </button>
        </div>

        {showAddForm && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Add New Time Slot</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Day</label>
                <select
                  value={newSlot.day}
                  onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-lg p-2 focus:border-green-500 focus:outline-none"
                >
                  <option value="">Select Day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Start Time</label>
                <input
                  type="time"
                  value={newSlot.startTime}
                  onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-lg p-2 focus:border-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">End Time</label>
                <input
                  type="time"
                  value={newSlot.endTime}
                  onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-lg p-2 focus:border-green-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={addSlot}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Add Slot
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {slots.map((slot) => (
            <div key={slot.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{slot.day}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <Clock className="h-4 w-4" />
                    {slot.time}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toggleAvailability(slot.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    slot.available 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }`}
                >
                  {slot.available ? 'Available' : 'Unavailable'}
                </button>
                <button
                  onClick={() => deleteSlot(slot.id)}
                  className="bg-red-100 text-red-800 p-2 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
