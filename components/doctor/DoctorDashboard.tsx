'use client'
import { Users, Calendar, Brain, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-xl shadow-lg border border-gray-100 ${className}`}>
    {children}
  </div>
)

export default function DoctorDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center">
            <Users className="h-10 w-10 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-semibold text-green-600 uppercase tracking-wide">Today's Patients</p>
              <p className="text-3xl font-bold text-green-900">12</p>
              <p className="text-green-700 text-sm">3 urgent cases</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center">
            <Calendar className="h-10 w-10 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Appointments</p>
              <p className="text-3xl font-bold text-blue-900">8</p>
              <p className="text-blue-700 text-sm">Remaining today</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center">
            <Brain className="h-10 w-10 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide">AI Efficiency</p>
              <p className="text-3xl font-bold text-purple-900">92%</p>
              <p className="text-purple-700 text-sm">This month</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex items-center">
            <TrendingUp className="h-10 w-10 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-semibold text-yellow-600 uppercase tracking-wide">Patient Rating</p>
              <p className="text-3xl font-bold text-yellow-900">4.8</p>
              <p className="text-yellow-700 text-sm">847 reviews</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-8">
          <div className="flex items-center mb-6">
            <Brain className="h-8 w-8 text-purple-600 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">AI Clinical Assistant</h3>
          </div>
          
          <div className="space-y-6">
            <div className="bg-purple-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-purple-800 mb-3">Diagnostic Support</h4>
              <p className="text-gray-700 mb-4">AI-powered diagnostic suggestions with 89% accuracy.</p>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-sm text-purple-800 font-medium">Cases Assisted Today: <span className="text-2xl font-bold">7</span></p>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-green-800 mb-3">Treatment Recommendations</h4>
              <p className="text-gray-700 mb-4">Evidence-based treatment suggestions from latest research.</p>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-sm text-green-800 font-medium">Recommendation Accuracy: <span className="text-2xl font-bold">92%</span></p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <div className="flex items-center mb-6">
            <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">Urgent Patients</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-red-800">Ravi Patel (45)</span>
                <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-full">High Risk</span>
              </div>
              <p className="text-sm text-gray-700 mb-2">Chest pain, shortness of breath</p>
              <div className="flex items-center text-xs text-red-600">
                <span className="font-medium">AI Urgency Score: 85/100</span>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-orange-800">Meera Singh (32)</span>
                <span className="text-xs bg-orange-600 text-white px-2 py-1 rounded-full">Medium</span>
              </div>
              <p className="text-sm text-gray-700 mb-2">Severe headache, nausea</p>
              <div className="flex items-center text-xs text-orange-600">
                <span className="font-medium">AI Urgency Score: 65/100</span>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-yellow-800">Rajesh Kumar (28)</span>
                <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded-full">Low</span>
              </div>
              <p className="text-sm text-gray-700 mb-2">Back pain, routine checkup</p>
              <div className="flex items-center text-xs text-yellow-600">
                <span className="font-medium">AI Urgency Score: 35/100</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Today's Schedule</h3>
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="w-16 text-center">
              <div className="text-sm font-semibold text-green-700">9:00 AM</div>
            </div>
            <div className="flex-1 ml-4">
              <p className="font-semibold text-gray-900">Ravi Patel - Cardiology Consultation</p>
              <p className="text-sm text-gray-600">Chest pain evaluation | AI Priority: High</p>
            </div>
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-xs text-green-600 bg-green-100 px-3 py-1 rounded-full ml-2">Completed</span>
          </div>

          <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-16 text-center">
              <div className="text-sm font-semibold text-blue-700">10:30 AM</div>
            </div>
            <div className="flex-1 ml-4">
              <p className="font-semibold text-gray-900">Meera Singh - Neurology Follow-up</p>
              <p className="text-sm text-gray-600">Headache treatment review | AI Priority: Medium</p>
            </div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full ml-2">In Progress</span>
          </div>

          <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="w-16 text-center">
              <div className="text-sm font-semibold text-gray-700">2:00 PM</div>
            </div>
            <div className="flex-1 ml-4">
              <p className="font-semibold text-gray-900">Sunita Sharma - Routine Checkup</p>
              <p className="text-sm text-gray-600">Annual physical examination | AI Priority: Low</p>
            </div>
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full ml-2">Scheduled</span>
          </div>
        </div>
      </Card>

      <Card className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Performance Metrics</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">15</div>
            <div className="text-gray-700 font-medium">Patients Treated</div>
            <div className="text-sm text-green-600 mt-1">This Week</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">8.5</div>
            <div className="text-gray-700 font-medium">Avg Time/Patient</div>
            <div className="text-sm text-blue-600 mt-1">Minutes</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">92%</div>
            <div className="text-gray-700 font-medium">AI Assistance</div>
            <div className="text-sm text-purple-600 mt-1">Accuracy</div>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg">
            <div className="text-3xl font-bold text-yellow-600 mb-2">4.8</div>
            <div className="text-gray-700 font-medium">Patient Rating</div>
            <div className="text-sm text-yellow-600 mt-1">847 Reviews</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
