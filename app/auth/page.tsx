'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Loader } from 'lucide-react'
import { signupWithGoogle } from '../../lib/authFunctions'

export default function AuthPage() {
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor' | 'admin'>('patient')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGoogleAuth = async () => {
    setError('')
    setLoading(true)

    try {
      console.log('🔐 Starting Google signin for:', selectedRole)
      
      await signupWithGoogle(selectedRole)
      
      console.log('✅ Login successful, redirecting...')
      
      // Hard reload to new page (localStorage will persist)
      window.location.href = `/${selectedRole}`
      
    } catch (err: any) {
      console.error('❌ Auth error:', err)
      setError(err.message || 'Google sign-in failed')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* CLICKABLE LOGO - Goes to Home */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block hover:opacity-80 transition">
            <h1 className="text-4xl font-bold text-gray-900">
              <span className="text-red-600">MeDiQ</span>
            </h1>
            <p className="text-gray-600 text-sm mt-1">AI-Driven Smart Hospital System</p>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Select Your Role
          </h2>

          <div className="grid grid-cols-3 gap-3 mb-8">
            {(['patient', 'doctor', 'admin'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedRole(type)}
                disabled={loading}
                className={`p-3 rounded-lg font-semibold text-sm transition-all ${
                  selectedRole === type
                    ? `${
                        type === 'patient'
                          ? 'bg-blue-600 text-white'
                          : type === 'doctor'
                          ? 'bg-green-600 text-white'
                          : 'bg-red-600 text-white'
                      }`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } disabled:opacity-50`}
              >
                {type === 'patient' && '👤 Patient'}
                {type === 'doctor' && '👨‍⚕️ Doctor'}
                {type === 'admin' && '⚙️ Admin'}
              </button>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg mb-6 text-sm">
              ❌ {error}
            </div>
          )}

          <button
            onClick={handleGoogleAuth}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all ${
              selectedRole === 'patient'
                ? 'bg-blue-600 hover:bg-blue-700'
                : selectedRole === 'doctor'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-red-600 hover:bg-red-700'
            } disabled:opacity-50`}
          >
            {loading ? (
              <>
                <Loader className="animate-spin h-5 w-5" />
                Signing in...
              </>
            ) : (
              <>
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </>
            )}
          </button>

          <p className="text-center text-gray-600 text-sm mt-6">
            🔐 Secure login with Google Account
          </p>
        </div>
      </div>
    </div>
  )
}
