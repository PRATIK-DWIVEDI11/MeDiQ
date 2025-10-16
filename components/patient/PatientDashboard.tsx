'use client'
import { Calendar, Clock, FileText, Heart, Brain, Zap } from 'lucide-react'

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-xl shadow-lg border border-gray-100 ${className}`}>
    {children}
  </div>
)

export default function PatientDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center">
            <Calendar className="h-10 w-10 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Next Appointment</p>
              <p className="text-2xl font-bold text-blue-900">Tomorrow</p>
              <p className="text-blue-700 text-sm">2:00 PM with Dr. Kumar</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center">
            <Clock className="h-10 w-10 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-semibold text-green-600 uppercase tracking-wide">Queue Position</p>
              <p className="text-2xl font-bold text-green-900">5th</p>
              <p className="text-green-700 text-sm">Est. wait: 25 min</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center">
            <FileText className="h-10 w-10 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide">Medical Records</p>
              <p className="text-2xl font-bold text-purple-900">12</p>
              <p className="text-purple-700 text-sm">Reports available</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center">
            <Heart className="h-10 w-10 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-semibold text-red-600 uppercase tracking-wide">Health Score</p>
              <p className="text-2xl font-bold text-red-900">8.5/10</p>
              <p className="text-red-700 text-sm">Excellent</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-8">
          <div className="flex items-center mb-6">
            <Brain className="h-8 w-8 text-purple-600 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">AI-Powered Healthcare</h3>
          </div>
          
          <div className="space-y-6">
            <div className="bg-purple-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-purple-800 mb-3">Smart Appointment Booking</h4>
              <p className="text-gray-700 mb-4">Our AI matches you with the right doctor based on your symptoms and medical history.</p>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-sm text-purple-800 font-medium">AI Matching Accuracy: <span className="text-2xl font-bold">91%</span></p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">Queue Optimization</h4>
              <p className="text-gray-700 mb-4">Real-time AI queue management reduces your wait time significantly.</p>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">Wait Time Reduced: <span className="text-2xl font-bold">42%</span></p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <div className="flex items-center mb-6">
            <Zap className="h-8 w-8 text-yellow-600 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">Quick Actions</h3>
          </div>
          
          <div className="space-y-4">
            <button className="w-full bg-red-600 text-white p-4 rounded-lg font-semibold hover:bg-red-700 transition-colors">
              🚨 Emergency Booking
            </button>
            <button className="w-full bg-blue-600 text-white p-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              📅 Book Appointment
            </button>
            <button className="w-full bg-green-600 text-white p-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              💬 Chat with AI Assistant
            </button>
            <button className="w-full bg-purple-600 text-white p-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              📊 View Health Analytics
            </button>
          </div>
        </Card>
      </div>

      <Card className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-4"></div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Appointment Confirmed</p>
              <p className="text-sm text-gray-600">Dr. Rajesh Kumar - Tomorrow 2:00 PM (Cardiology)</p>
            </div>
            <span className="text-xs text-green-600 bg-green-100 px-3 py-1 rounded-full">Confirmed</span>
          </div>
          
          <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-4"></div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Lab Report Available</p>
              <p className="text-sm text-gray-600">Blood Test Results - All parameters normal</p>
            </div>
            <span className="text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full">New</span>
          </div>

          <div className="flex items-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="w-4 h-4 bg-purple-500 rounded-full mr-4"></div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">AI Health Check</p>
              <p className="text-sm text-gray-600">Weekly health analysis completed - Score improved!</p>
            </div>
            <span className="text-xs text-purple-600 bg-purple-100 px-3 py-1 rounded-full">Completed</span>
          </div>
        </div>
      </Card>

      <Card className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Health Metrics</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-lg">
            <div className="text-3xl font-bold text-red-600 mb-2">120/80</div>
            <div className="text-gray-700 font-medium">Blood Pressure</div>
            <div className="text-sm text-green-600 mt-1">Normal</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">72</div>
            <div className="text-gray-700 font-medium">Heart Rate</div>
            <div className="text-sm text-green-600 mt-1">Normal</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
            <div className="text-gray-700 font-medium">Oxygen Level</div>
            <div className="text-sm text-green-600 mt-1">Excellent</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
