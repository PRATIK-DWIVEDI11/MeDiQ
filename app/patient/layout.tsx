'use client'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../../lib/authContext'
import { logout } from '../../lib/authFunctions'
import { LayoutDashboard, Calendar, Clock, FileText, Activity, Droplet, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'

const PATIENT_MENU = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/patient' },
  { name: 'Book Appointment', icon: Calendar, href: '/patient/book-appointment' },
  { name: 'My Appointments', icon: Clock, href: '/patient/appointments' },
  { name: 'Medical Records', icon: FileText, href: '/patient/medical-records' },
  { name: 'Queue Status', icon: Activity, href: '/patient/queue-status' },
  { name: 'Organ Donation', icon: Droplet, href: '/patient/donation' },
]

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, userType } = useAuthStore()
  const [activeMenu, setActiveMenu] = useState('/patient')
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    console.log('🔍 Patient Layout Check:', { user: !!user, userType })
    
    // Wait 500ms for Zustand state to update
    const timer = setTimeout(() => {
      console.log('⏰ After 500ms:', { user: !!user, userType })
      
      if (!user || userType !== 'patient') {
        console.log('❌ Redirecting to /auth')
        router.push('/auth')
      } else {
        console.log('✅ Allowing patient access')
        setIsChecking(false)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [user, userType, router])

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/auth')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  // Show loading while checking auth
  if (isChecking || !user || userType !== 'patient') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-8">MeDiQ</h1>
        
        <nav className="space-y-2">
          {PATIENT_MENU.map((item) => (
            <button
              key={item.href}
              onClick={() => {
                setActiveMenu(item.href)
                router.push(item.href)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeMenu === item.href
                  ? 'bg-blue-900 text-white'
                  : 'text-blue-100 hover:bg-blue-700'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mt-8 text-red-200 hover:bg-red-600 hover:text-white transition-all"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
