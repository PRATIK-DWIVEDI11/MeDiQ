'use client'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import {
  Home, Calendar, Clock, FileText, Users, Brain,
  BarChart3, TrendingUp, Heart, Settings, LogOut,
  Stethoscope, Loader
} from 'lucide-react'
import { logout } from '../../lib/authFunctions'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

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
  const [loggingOut, setLoggingOut] = useState(false)

  const userTypeConfig = {
    patient: { color: 'bg-blue-600', activeColor: 'bg-blue-600 text-white', name: 'Patient Portal' },
    doctor:  { color: 'bg-green-600', activeColor: 'bg-green-600 text-white', name: 'Doctor Portal' },
    admin:   { color: 'bg-red-600', activeColor: 'bg-red-600 text-white', name: 'Admin Dashboard' }
  }

  const config = userTypeConfig[userType]

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await logout()
      router.push('/auth')
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <div className="w-64 bg-white dark:bg-gray-900 shadow-xl border-r border-gray-200 dark:border-gray-700 flex flex-col h-screen transition-colors duration-300">
      
      {/* Header */}
      <div className={`${config.color} p-6`}>
        <Link href="/" className="flex items-center text-white mb-4 hover:text-gray-200 transition-colors">
          <Stethoscope className="h-5 w-5 mr-2" />
          <span className="text-sm font-medium">← Back to MeDiQ</span>
        </Link>
        <h2 className="text-white text-xl font-bold">{config.name}</h2>
        <p className="text-white/70 text-sm mt-1">Welcome</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon]
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-4 rounded-xl transition-all duration-200 ${
                    isActive
                      ? config.activeColor + ' shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {Icon && <Icon className="h-5 w-5 mr-4" />}
                  <span className="font-medium">{item.name}</span>
                  {isActive && <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Theme Toggle & Logout */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between p-4 text-gray-600 dark:text-gray-300 rounded-xl mb-1">
            <span className="font-medium text-sm">Dark Mode</span>
            <ThemeToggle />
          </div>

          <Link href="#" className="flex items-center p-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
            <Settings className="h-5 w-5 mr-4" />
            <span className="font-medium">Settings</span>
          </Link>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center p-4 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors mt-2 disabled:opacity-50"
          >
            {loggingOut ? <Loader className="h-5 w-5 mr-4 animate-spin" /> : <LogOut className="h-5 w-5 mr-4" />}
            <span className="font-medium">{loggingOut ? 'Logging out...' : 'Logout'}</span>
          </button>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">MeDiQ Hospital System</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">v2.0.0</p>
        </div>
      </div>
    </div>
  )
}
