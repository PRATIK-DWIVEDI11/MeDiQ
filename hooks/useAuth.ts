'use client'
import { useEffect } from 'react'
import { auth, db } from '../lib/firebase'
import { useAuthStore } from '../lib/authContext'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

export function useAuth() {
  const { setUser, setUserType } = useAuthStore()

  useEffect(() => {
    let isMounted = true

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          try {
            const userRef = doc(db, 'users', firebaseUser.uid)
            const userSnap = await getDoc(userRef)
            if (userSnap.exists()) {
              const userData = userSnap.data()
              if (isMounted) {
                setUser(firebaseUser as any)
                setUserType(userData?.userType as any || 'patient')
              }
            } else {
              if (isMounted) {
                setUser(firebaseUser as any)
                setUserType('patient' as any)
              }
            }
          } catch (firestoreError) {
            console.error('Firestore error:', firestoreError)
            if (isMounted) {
              setUser(firebaseUser as any)
              setUserType('patient' as any)
            }
          }
        } else {
          if (isMounted) {
            setUser(null)
            setUserType(null)
          }
        }
      } catch (error) {
        console.error('Auth error:', error)
      }
    })

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [setUser, setUserType])

  return useAuthStore()
}
