import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from 'firebase/auth'

interface AuthState {
  user: User | null
  userType: 'patient' | 'doctor' | 'admin' | null
  setUser: (user: User | null) => void
  setUserType: (type: 'patient' | 'doctor' | 'admin' | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      userType: null,
      setUser: (user) => set({ user }),
      setUserType: (type) => set({ userType: type }),
      logout: () => set({ user: null, userType: null })
    }),
    {
      name: 'mediq-auth-storage', // localStorage key
      partialize: (state) => ({
        user: state.user,
        userType: state.userType
      })
    }
  )
)

