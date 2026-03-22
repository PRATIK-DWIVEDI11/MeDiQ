'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../lib/authContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles: Array<'patient' | 'doctor' | 'admin'>
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter()
  const { user, userType } = useAuthStore()

  useEffect(() => {
    if (!user) {
      router.push('/auth')
      return
    }
    if (userType && !allowedRoles.includes(userType)) {
      router.push('/auth')
    }
  }, [user, userType, allowedRoles, router])

  if (!user || (userType && !allowedRoles.includes(userType))) {
    return null
  }

  return <>{children}</>
}
