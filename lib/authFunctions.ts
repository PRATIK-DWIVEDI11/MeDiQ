import { auth, db } from './firebase'
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { useAuthStore } from './authContext'

const googleProvider = new GoogleAuthProvider()

export async function signupWithGoogle(userType: 'patient' | 'doctor' | 'admin') {
  try {
    console.log('🔵 Google OAuth starting for:', userType)
    
    // Step 1: Authenticate with Google
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user
    
    console.log('✅ Google auth success:', user.uid)
    
    // Step 2: Set in Zustand IMMEDIATELY (will persist to localStorage)
    useAuthStore.getState().setUser(user as any)
    useAuthStore.getState().setUserType(userType)
    
    console.log('✅ Zustand state set:', { uid: user.uid, userType })
    
    // Step 3: Background Firestore write (non-blocking)
    setTimeout(async () => {
      try {
        // Create user document
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          name: user.displayName || 'User',
          userType: userType,
          photoURL: user.photoURL || '',
          createdAt: new Date().toISOString(),
          provider: 'google',
        }, { merge: true })
        
        // Create role-specific document
        if (userType === 'patient') {
          await setDoc(doc(db, 'patients', user.uid), {
            userId: user.uid,
            name: user.displayName || 'Patient',
            email: user.email,
            age: 0,
            bloodType: 'O+',
            medicalHistory: [],
            allergies: [],
            appointments: [],
            createdAt: new Date().toISOString(),
          }, { merge: true })
        } else if (userType === 'doctor') {
          await setDoc(doc(db, 'doctors', user.uid), {
            userId: user.uid,
            name: user.displayName || 'Dr. Name',
            email: user.email,
            specialty: 'General Medicine',
            rating: 4.5,
            totalPatients: 0,
            appointments: [],
            availability: true,
            createdAt: new Date().toISOString(),
          }, { merge: true })
        } else if (userType === 'admin') {
          await setDoc(doc(db, 'admins', user.uid), {
            userId: user.uid,
            name: user.displayName || 'Admin',
            email: user.email,
            createdAt: new Date().toISOString(),
          }, { merge: true })
        }
        
        console.log('✅ Firestore documents created')
      } catch (err) {
        console.warn('⚠️ Firestore write delayed:', err)
      }
    }, 100)
    
    // Step 4: Return result
    return { user, userType }
    
  } catch (error: any) {
    console.error('❌ Google auth failed:', error.message)
    throw error
  }
}

export async function logout() {
  await signOut(auth)
  useAuthStore.getState().logout()
  console.log('✅ Logout successful')
}

export async function getUserType(uid: string): Promise<'patient' | 'doctor' | 'admin'> {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid))
    return (userDoc.data()?.userType || 'patient') as 'patient' | 'doctor' | 'admin'
  } catch (error) {
    console.warn('Could not fetch userType, using default')
    return 'patient'
  }
}

// Initialize auth listener
export function initAuthListener() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('🔵 Firebase auth state changed:', user.uid)
      useAuthStore.getState().setUser(user as any)
    } else {
      console.log('🔵 User logged out')
      useAuthStore.getState().logout()
    }
  })
}
