'use client'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../../lib/authContext'
import { logout } from '../../lib/authFunctions'
import { LayoutDashboard, BarChart3, Users, Heart, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'

const ADMIN_MENU = [
  { name: 'Overview', icon: LayoutDashboard, href: '/admin' },
  { name: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
  { name: 'Staff', icon: Users, href: '/admin/staff' },
  { name: 'Organ Donation', icon: Heart, href: '/admin/organ-donation' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, userType } = useAuthStore()
  const [activeMenu, setActiveMenu] = useState('/admin')
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    console.log('🔍 Admin Layout Check:', { user: !!user, userType })
    
    const timer = setTimeout(() => {
      console.log('⏰ After 500ms:', { user: !!user, userType })
      
      if (!user || userType !== 'admin') {
        console.log('❌ Redirecting to /auth')
        router.push('/auth')
      } else {
        console.log('✅ Allowing admin access')
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

  if (isChecking || !user || userType !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gradient-to-b from-red-600 to-red-800 text-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-8">MeDiQ Admin</h1>
        
        <nav className="space-y-2">
          {ADMIN_MENU.map((item) => (
            <button
              key={item.href}
              onClick={() => {
                setActiveMenu(item.href)
                router.push(item.href)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeMenu === item.href
                  ? 'bg-red-900 text-white'
                  : 'text-red-100 hover:bg-red-700'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mt-8 text-red-200 hover:bg-red-900 hover:text-white transition-all"
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
