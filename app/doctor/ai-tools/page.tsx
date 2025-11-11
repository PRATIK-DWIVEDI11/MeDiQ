import Sidebar from '../../../components/common/Sidebar'
import AITools from '../../../components/doctor/AITools'
import { Brain } from 'lucide-react'

export default function DoctorAIToolsPage() {
  const doctorNavItems = [
    { name: 'Dashboard', href: '/doctor', icon: 'Home' },
    { name: 'Patients', href: '/doctor/patients', icon: 'Users' },
    { name: 'Schedule', href: '/doctor/schedule', icon: 'Calendar' },
    { name: 'AI Tools', href: '/doctor/ai-tools', icon: 'Brain' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar navItems={doctorNavItems} userType="doctor" />
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="h-8 w-8 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-900">AI Clinical Tools</h1>
          </div>
          <p className="text-gray-600 mb-8">AI-powered diagnostic and treatment support system</p>
          <AITools />
        </div>
      </div>
    </div>
  )
}
