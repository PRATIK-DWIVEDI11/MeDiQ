import Sidebar from '../../components/common/Sidebar'
import PatientDashboard from '../../components/patient/PatientDashboard'

export default function PatientPortal() {
  const patientNavItems = [
    { name: 'Dashboard', href: '/patient', icon: 'Home' },
    { name: 'Book Appointment', href: '/patient/appointments', icon: 'Calendar' },
    { name: 'Queue Status', href: '/patient/queue', icon: 'Clock' },
    { name: 'Medical Records', href: '/patient/records', icon: 'FileText' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar navItems={patientNavItems} userType="patient" />
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Patient Portal</h1>
          <p className="text-gray-600 text-lg mt-2">Manage your healthcare journey with AI assistance</p>
        </div>
        <PatientDashboard />
      </div>
    </div>
  )
}
