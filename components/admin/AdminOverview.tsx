'use client'
import { 
  Users, Activity, Heart, Shield, 
  TrendingUp, AlertCircle, CheckCircle, 
  DollarSign, Bed, Clock 
} from 'lucide-react'

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-xl shadow-lg border border-gray-100 ${className}`}>
    {children}
  </div>
)

export default function AdminOverview() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center">
            <Users className="h-10 w-10 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Total Patients</p>
              <p className="text-3xl font-bold text-blue-900">1,247</p>
              <p className="text-blue-700 text-sm">+15% from last month</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center">
            <Activity className="h-10 w-10 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-semibold text-green-600 uppercase tracking-wide">AI Efficiency</p>
              <p className="text-3xl font-bold text-green-900">87.5%</p>
              <p className="text-green-700 text-sm">Urgency scoring accuracy</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center">
            <Heart className="h-10 w-10 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-semibold text-red-600 uppercase tracking-wide">Organ Donors</p>
              <p className="text-3xl font-bold text-red-900">2,340</p>
              <p className="text-red-700 text-sm">Blockchain verified</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center">
            <Shield className="h-10 w-10 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide">System Security</p>
              <p className="text-3xl font-bold text-purple-900">99.97%</p>
              <p className="text-purple-700 text-sm">Blockchain sync rate</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-8">
        <div className="flex items-center mb-6">
          <Heart className="h-8 w-8 text-red-600 mr-3" />
          <h3 className="text-2xl font-bold text-gray-900">Blockchain Organ Donation System</h3>
          <span className="ml-auto bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Live</span>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-red-800">Kidney Donation</h4>
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Available:</span>
                <span className="font-bold text-red-600">12 organs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Waiting List:</span>
                <span className="font-bold text-gray-900">234 patients</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Success Rate:</span>
                <span className="font-bold text-green-600">94%</span>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-xs text-red-600 font-medium">Blockchain Transactions: 1,456</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-blue-800">Liver Donation</h4>
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Available:</span>
                <span className="font-bold text-blue-600">3 organs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Waiting List:</span>
                <span className="font-bold text-gray-900">156 patients</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Success Rate:</span>
                <span className="font-bold text-green-600">87%</span>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-xs text-blue-600 font-medium">Smart Contracts: 234</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-green-800">Heart Donation</h4>
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Available:</span>
                <span className="font-bold text-green-600">1 organ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Waiting List:</span>
                <span className="font-bold text-gray-900">89 patients</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Success Rate:</span>
                <span className="font-bold text-green-600">91%</span>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-xs text-green-600 font-medium">Verified Matches: 67</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Blockchain Transactions</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Donor Registration - Kidney</p>
                <p className="text-sm text-gray-600">Hash: 0x4a7c8b9d2e3f1a5c...</p>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Verified</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Smart Contract Execution</p>
                <p className="text-sm text-gray-600">Match Score: 98% compatibility</p>
              </div>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Processing</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-8">
          <div className="flex items-center mb-6">
            <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">Today's Performance</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                <div>
                  <p className="font-semibold text-gray-900">Patient Satisfaction</p>
                  <p className="text-sm text-gray-600">94% approval rating</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-green-600">94%</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <Clock className="h-6 w-6 text-blue-600 mr-3" />
                <div>
                  <p className="font-semibold text-gray-900">Wait Time Reduction</p>
                  <p className="text-sm text-gray-600">AI queue optimization</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-blue-600">42%</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <Activity className="h-6 w-6 text-purple-600 mr-3" />
                <div>
                  <p className="font-semibold text-gray-900">AI Accuracy</p>
                  <p className="text-sm text-gray-600">Urgency scoring precision</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-purple-600">87.5%</span>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <div className="flex items-center mb-6">
            <AlertCircle className="h-8 w-8 text-yellow-600 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">System Alerts</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-red-800">Emergency Department</span>
                <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-full">High Priority</span>
              </div>
              <p className="text-sm text-gray-700">3 critical patients in queue - AI recommended fast-track</p>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-yellow-800">Blockchain Network</span>
                <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded-full">Medium</span>
              </div>
              <p className="text-sm text-gray-700">15 pending organ donation verifications</p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-blue-800">AI System</span>
                <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">Info</span>
              </div>
              <p className="text-sm text-gray-700">Weekly AI model update completed - accuracy improved by 2.3%</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Resource Utilization</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-lg">
            <Bed className="h-8 w-8 text-red-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-red-600 mb-2">445/500</div>
            <div className="text-gray-700 font-medium">Bed Occupancy</div>
            <div className="text-sm text-red-600 mt-1">89% Occupied</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
            <Users className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-green-600 mb-2">150</div>
            <div className="text-gray-700 font-medium">Active Doctors</div>
            <div className="text-sm text-green-600 mt-1">91% Efficiency</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
            <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-blue-600 mb-2">₹12.5L</div>
            <div className="text-gray-700 font-medium">Daily Revenue</div>
            <div className="text-sm text-blue-600 mt-1">+12% Today</div>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg">
            <Shield className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-purple-600 mb-2">25</div>
            <div className="text-gray-700 font-medium">Connected Hospitals</div>
            <div className="text-sm text-purple-600 mt-1">Blockchain Network</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
