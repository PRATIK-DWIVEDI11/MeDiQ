'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../lib/authContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles: Array<'patient' | 'doctor' | 'admin'>
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const router = useRouter()
  const { user, userType } = useAuth() // REMOVED loading

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


// 'use client'
// import { useRouter } from 'next/navigation'
// import { useAuth } from '../hooks/useAuth'
// import { Loader } from 'lucide-react'

// interface ProtectedRouteProps {
//   children: React.ReactNode
//   requiredUserType?: 'patient' | 'doctor' | 'admin'
// }

// export default function ProtectedRoute({
//   children,
//   requiredUserType,
// }: ProtectedRouteProps) {
//   const router = useRouter()
//   const { user, userType, loading } = useAuth()

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <Loader className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
//           <p className="text-gray-600">Loading...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!user) {
//     router.push('/auth')
//     return null
//   }

//   if (requiredUserType && userType !== requiredUserType) {
//     router.push('/auth')
//     return null
//   }

//   return <>{children}</>
// }
