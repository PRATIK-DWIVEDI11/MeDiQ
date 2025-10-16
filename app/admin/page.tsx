import Sidebar from '../../components/common/Sidebar'
import AdminOverview from '../../components/admin/AdminOverview'

export default function AdminPortal() {
  const adminNavItems = [
    { name: 'Overview', href: '/admin', icon: 'BarChart3' },
    { name: 'Analytics', href: '/admin/analytics', icon: 'TrendingUp' },
    { name: 'Staff', href: '/admin/staff', icon: 'Users' },
    { name: 'Organ Donation', href: '/admin/organ-donation', icon: 'Heart' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar navItems={adminNavItems} userType="admin" />
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 text-lg mt-2">Hospital management & blockchain organ donation system</p>
        </div>
        <AdminOverview />
      </div>
    </div>
  )
}
