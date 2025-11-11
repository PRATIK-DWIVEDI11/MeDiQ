'use client'
import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState<'patient' | 'doctor' | 'admin'>('patient')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    setTimeout(() => {
      localStorage.setItem('userType', userType)
      localStorage.setItem('userName', email.split('@'))
      router.push(`/${userType}`)
      setLoading(false)
    }, 800)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your MeDiQ account</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {(['patient', 'doctor', 'admin'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setUserType(type)}
              className={`p-3 rounded-lg font-semibold transition-all ${
                userType === type
                  ? `${
                      type === 'patient'
                        ? 'bg-blue-600 text-white'
                        : type === 'doctor'
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 text-white'
                    }`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full pl-10 pr-10 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
            Demo: any@email.com / any password
          </p>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 ${
              userType === 'patient'
                ? 'bg-blue-600 hover:bg-blue-700'
                : userType === 'doctor'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-red-600 hover:bg-red-700'
            } disabled:opacity-50`}
          >
            {loading ? <Loader className="animate-spin h-5 w-5" /> : null}
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="#" className="text-red-600 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}
