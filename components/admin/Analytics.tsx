'use client'
import { BarChart3, TrendingUp, Activity } from 'lucide-react'

export default function Analytics() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Appointments Growth</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">+23%</p>
            </div>
            <TrendingUp className="h-12 w-12 text-blue-300" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Patient Satisfaction</p>
              <p className="text-3xl font-bold text-green-600 mt-2">94%</p>
            </div>
            <Activity className="h-12 w-12 text-green-300" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">$45K</p>
            </div>
            <BarChart3 className="h-12 w-12 text-purple-300" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border-2 border-gray-200 p-6 mt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Visualization</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
          <p className="text-gray-500">Chart visualization (integrate Chart.js or Recharts for real charts)</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border-2 border-gray-200 p-6 mt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Trends</h3>
        <div className="space-y-4">
          {[
            { month: 'January', appointments: 145, revenue: '$12,450' },
            { month: 'February', appointments: 178, revenue: '$15,230' },
            { month: 'March', appointments: 192, revenue: '$16,890' },
            { month: 'April', appointments: 203, revenue: '$17,550' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <p className="font-semibold text-gray-900">{item.month}</p>
              <div className="flex gap-6">
                <p className="text-sm text-gray-600">Appointments: <span className="font-bold text-blue-600">{item.appointments}</span></p>
                <p className="text-sm text-gray-600">Revenue: <span className="font-bold text-green-600">{item.revenue}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


