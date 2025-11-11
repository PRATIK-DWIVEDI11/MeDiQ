'use client'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../../lib/authContext'
import { logout } from '../../lib/authFunctions'
import { LayoutDashboard, Users, Calendar, Activity, Droplet, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'

const DOCTOR_MENU = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/doctor' },
  { name: 'Patients', icon: Users, href: '/doctor/patients' },
  { name: 'Schedule', icon: Calendar, href: '/doctor/schedule' },
  { name: 'Queue', icon: Activity, href: '/doctor/queue' },
  { name: 'Donation', icon: Droplet, href: '/doctor/donation' },
]

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, userType } = useAuthStore()
  const [activeMenu, setActiveMenu] = useState('/doctor')
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    console.log('🔍 Doctor Layout Check:', { user: !!user, userType })
    
    const timer = setTimeout(() => {
      console.log('⏰ After 500ms:', { user: !!user, userType })
      
      if (!user || userType !== 'doctor') {
        console.log('❌ Redirecting to /auth')
        router.push('/auth')
      } else {
        console.log('✅ Allowing doctor access')
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

  if (isChecking || !user || userType !== 'doctor') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gradient-to-b from-green-600 to-green-800 text-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-8">MeDiQ</h1>
        
        <nav className="space-y-2">
          {DOCTOR_MENU.map((item) => (
            <button
              key={item.href}
              onClick={() => {
                setActiveMenu(item.href)
                router.push(item.href)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeMenu === item.href
                  ? 'bg-green-900 text-white'
                  : 'text-green-100 hover:bg-green-700'
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

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
