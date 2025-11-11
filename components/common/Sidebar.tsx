'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { 
  Home, Calendar, Clock, FileText, Users, Brain, 
  BarChart3, TrendingUp, Heart, Settings, LogOut,
  Stethoscope, Loader
} from 'lucide-react'
import { logout } from '../../lib/authFunctions'
import { useAuthStore } from '../../lib/authContext'
import { useState } from 'react'

interface NavItem {
  name: string
  href: string
  icon: string
}

interface SidebarProps {
  navItems: NavItem[]
  userType: 'patient' | 'doctor' | 'admin'
}

const iconMap: { [key: string]: any } = {
  Home, Calendar, Clock, FileText, Users, Brain, 
  BarChart3, TrendingUp, Heart, Settings
}

export default function Sidebar({ navItems, userType }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { logoutUser } = useAuthStore()
  const [loggingOut, setLoggingOut] = useState(false)
  
  const userTypeConfig = {
    patient: {
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      activeColor: 'bg-blue-600 text-white',
      name: 'Patient Portal'
    },
    doctor: {
      color: 'bg-green-600', 
      hoverColor: 'hover:bg-green-700',
      activeColor: 'bg-green-600 text-white',
      name: 'Doctor Portal'
    },
    admin: {
      color: 'bg-red-600',
      hoverColor: 'hover:bg-red-700', 
      activeColor: 'bg-red-600 text-white',
      name: 'Admin Dashboard'
    }
  }

  const config = userTypeConfig[userType]

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await logout()
      logoutUser() // Clear auth store
      router.push('/auth')
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <div className="w-64 bg-white shadow-xl border-r border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className={`${config.color} p-6`}>
        <Link 
          href="/" 
          className="flex items-center text-white mb-4 hover:text-gray-200 transition-colors"
        >
          <Stethoscope className="h-5 w-5 mr-2" />
          <span className="text-sm font-medium">← Back to MeDiQ</span>
        </Link>
        <h2 className="text-white text-xl font-bold">
          {config.name}
        </h2>
        <p className="text-blue-100 text-sm mt-1 capitalize">
          Welcome
        </p>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-6">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap]
            const isActive = pathname === item.href
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-4 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? config.activeColor + ' shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {Icon && <Icon className="h-5 w-5 mr-4" />}
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Settings & Logout */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <Link 
            href="#" 
            className="flex items-center p-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Settings className="h-5 w-5 mr-4" />
            <span className="font-medium">Settings</span>
          </Link>
          
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center p-4 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors mt-2 disabled:opacity-50"
          >
            {loggingOut ? (
              <Loader className="h-5 w-5 mr-4 animate-spin" />
            ) : (
              <LogOut className="h-5 w-5 mr-4" />
            )}
            <span className="font-medium">{loggingOut ? 'Logging out...' : 'Logout'}</span>
          </button>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-500">MeDiQ Hospital System</p>
          <p className="text-xs text-gray-400 mt-1">v2.0.0</p>
        </div>
      </div>
    </div>
  )
}
