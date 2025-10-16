import Sidebar from '../../components/common/Sidebar'
import DoctorDashboard from '../../components/doctor/DoctorDashboard'

export default function DoctorPortal() {
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Doctor Portal</h1>
          <p className="text-gray-600 text-lg mt-2">AI-powered clinical dashboard for enhanced patient care</p>
        </div>
        <DoctorDashboard />
      </div>
    </div>
  )
}
