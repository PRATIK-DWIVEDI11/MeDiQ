import { db } from './firebase'
import { 
  collection, 
  setDoc,
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where,
  arrayUnion,
  arrayRemove,
  getDoc,
  orderBy,
  writeBatch
} from 'firebase/firestore'

// ==================== EXISTING FUNCTIONS ====================

export async function createAppointment(data: any) {
  try {
    const docRef = await addDoc(collection(db, 'appointments'), {
      ...data,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    })
    return { success: true, id: docRef.id }
  } catch (error) {
    return { success: false, error }
  }
}

export async function getAppointmentsByPatient(patientId: string) {
  try {
    const q = query(collection(db, 'appointments'), where('patientId', '==', patientId))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return []
  }
}

export async function getMedicalRecords(patientId: string) {
  try {
    const q = query(collection(db, 'medicalRecords'), where('patientId', '==', patientId))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    return []
  }
}

export async function getAllDoctors() {
  try {
    const snapshot = await getDocs(collection(db, 'doctors'))
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    return []
  }
}

export async function getAllPatients() {
  try {
    const snapshot = await getDocs(collection(db, 'patients'))
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    return []
  }
}

export async function deleteUser(userId: string, collectionName: string) {
  try {
    await deleteDoc(doc(db, collectionName, userId))
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

// ==================== POINT 1-2: DOCTOR MANAGEMENT ====================

export async function getAvailableDoctorsBySpecialty(specialty: string) {
  try {
    console.log(`🔍 Searching for ${specialty} doctors...`)
    
    // First try exact match on primary specialty
    let q = query(
      collection(db, 'doctors'),
      where('specialty', '==', specialty)
    )
    
    let snapshot = await getDocs(q)
    let doctors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    
    // If no results, search in specialties array
    if (doctors.length === 0) {
      q = query(
        collection(db, 'doctors'),
        where('specialties', 'array-contains', specialty)
      )
      snapshot = await getDocs(q)
      doctors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }
    
    console.log(`✅ Found ${doctors.length} doctors for ${specialty}`)
    return doctors
  } catch (error) {
    console.error('Error fetching doctors:', error)
    return []
  }
}


export async function addDoctor(doctorData: {
  name: string
  email: string
  specialty: string
  rating: number
  experience: string
  consultationFee: number
  bio: string
  schedule: any
}) {
  try {
    console.log('➕ Adding new doctor:', doctorData.name)
    const docRef = await addDoc(collection(db, 'doctors'), {
      ...doctorData,
      totalPatients: 0,
      availability: true,
      patients: [],
      pendingRequests: [],
      createdAt: new Date().toISOString()
    })
    console.log('✅ Doctor added:', docRef.id)
    return { success: true, doctorId: docRef.id }
  } catch (error) {
    console.error('Error adding doctor:', error)
    return { success: false, error }
  }
}

export async function updateDoctor(doctorId: string, updates: any) {
  try {
    console.log('✏️ Updating doctor:', doctorId)
    await updateDoc(doc(db, 'doctors', doctorId), {
      ...updates,
      updatedAt: new Date().toISOString()
    })
    console.log('✅ Doctor updated')
    return { success: true }
  } catch (error) {
    console.error('Error updating doctor:', error)
    return { success: false, error }
  }
}

export async function removeDoctor(doctorId: string) {
  try {
    console.log('🗑️ Removing doctor:', doctorId)
    await deleteDoc(doc(db, 'doctors', doctorId))
    console.log('✅ Doctor removed')
    return { success: true }
  } catch (error) {
    console.error('Error removing doctor:', error)
    return { success: false, error }
  }
}

// ==================== POINT 3: BOOKING STATUS FLOW ====================

export async function createAppointmentWithStatus(appointmentData: {
  patientId: string
  patientName: string
  patientEmail: string
  doctorId: string
  doctorName: string
  specialty: string
  date: string
  time: string
  symptoms: string
  reason: string
  urgency: string
}) {
  try {
    console.log('📅 Creating appointment with PENDING status...')

    const appointmentRef = await addDoc(collection(db, 'appointments'), {
      patientId: appointmentData.patientId,
      patientName: appointmentData.patientName,
      patientEmail: appointmentData.patientEmail,
      doctorId: appointmentData.doctorId,
      doctorName: appointmentData.doctorName,
      specialty: appointmentData.specialty,
      date: appointmentData.date,
      time: appointmentData.time,
      symptoms: appointmentData.symptoms,
      reason: appointmentData.reason,
      urgency: appointmentData.urgency,
      createdAt: new Date().toISOString(),
      status: 'PENDING',
      type: 'ai-auto-booked'
    })

    const appointmentId = appointmentRef.id
    console.log(`✅ Appointment created (PENDING): ${appointmentId}`)

    await updateDoc(doc(db, 'patients', appointmentData.patientId), {
      pendingAppointments: arrayUnion({
        appointmentId,
        doctorId: appointmentData.doctorId,
        doctorName: appointmentData.doctorName,
        specialty: appointmentData.specialty,
        date: appointmentData.date,
        time: appointmentData.time,
        status: 'PENDING',
        createdAt: new Date().toISOString()
      })
    })

    await updateDoc(doc(db, 'doctors', appointmentData.doctorId), {
      pendingRequests: arrayUnion({
        appointmentId,
        patientId: appointmentData.patientId,
        patientName: appointmentData.patientName,
        patientEmail: appointmentData.patientEmail,
        date: appointmentData.date,
        time: appointmentData.time,
        symptoms: appointmentData.symptoms,
        urgency: appointmentData.urgency,
        status: 'PENDING',
        createdAt: new Date().toISOString()
      })
    })

    return { success: true, appointmentId, status: 'PENDING' }
  } catch (error) {
    console.error('Error creating appointment:', error)
    return { success: false, error }
  }
}

// ==================== POINT 5: DOCTOR PATIENT ACTIONS ====================

export async function acceptAppointment(appointmentId: string, doctorId: string) {
  try {
    console.log('✅ Doctor accepting appointment:', appointmentId)

    const appointmentRef = doc(db, 'appointments', appointmentId)
    const appointmentDoc = await getDoc(appointmentRef)
    
    if (!appointmentDoc.exists()) {
      throw new Error('Appointment not found')
    }
    
    const appointment = appointmentDoc.data()

    await updateDoc(appointmentRef, {
      status: 'CONFIRMED',
      acceptedAt: new Date().toISOString(),
      acceptedBy: doctorId
    })
    console.log('✅ Appointment status updated to CONFIRMED')

    const patientRef = doc(db, 'patients', appointment.patientId)
    const patientDoc = await getDoc(patientRef)
    
    if (patientDoc.exists()) {
      const patientData = patientDoc.data()
      const pendingList = patientData.pendingAppointments || []
      const confirmedList = patientData.appointments || []

      const updatedPending = pendingList.filter((apt: any) => apt.appointmentId !== appointmentId)
      
      const confirmedAppointment = {
        appointmentId,
        doctorId: appointment.doctorId,
        doctorName: appointment.doctorName,
        specialty: appointment.specialty,
        date: appointment.date,
        time: appointment.time,
        status: 'CONFIRMED',
        acceptedAt: new Date().toISOString()
      }

      await updateDoc(patientRef, {
        pendingAppointments: updatedPending,
        appointments: [...confirmedList, confirmedAppointment]
      })
      console.log('✅ Patient document updated')
    }

    const doctorRef = doc(db, 'doctors', doctorId)
    const doctorDoc = await getDoc(doctorRef)
    
    if (doctorDoc.exists()) {
      const doctorData = doctorDoc.data()
      const pendingRequests = doctorData.pendingRequests || []
      const patientsList = doctorData.patients || []

      const updatedPendingReqs = pendingRequests.filter((req: any) => req.appointmentId !== appointmentId)
      
      const confirmedPatient = {
        patientId: appointment.patientId,
        patientName: appointment.patientName,
        patientEmail: appointment.patientEmail,
        appointmentId,
        date: appointment.date,
        time: appointment.time,
        status: 'CONFIRMED',
        acceptedAt: new Date().toISOString()
      }

      await updateDoc(doctorRef, {
        pendingRequests: updatedPendingReqs,
        patients: [...patientsList, confirmedPatient],
        totalPatients: (doctorData.totalPatients || 0) + 1
      })
      console.log('✅ Doctor document updated')
    }

    await addDoc(collection(db, 'medicalRecords'), {
      patientId: appointment.patientId,
      patientName: appointment.patientName,
      doctorId: doctorId,
      doctorName: appointment.doctorName,
      appointmentId: appointmentId,
      specialty: appointment.specialty,
      symptoms: appointment.symptoms,
      date: appointment.date,
      time: appointment.time,
      reason: appointment.reason,
      urgency: appointment.urgency,
      status: 'UPCOMING',
      createdAt: new Date().toISOString()
    })
    console.log('✅ Medical record created')

    return { success: true }
  } catch (error: any) {
    console.error('❌ Error accepting appointment:', error)
    return { success: false, error: error.message }
  }
}

export async function rejectAppointment(appointmentId: string, doctorId: string) {
  try {
    console.log('❌ Doctor rejecting appointment:', appointmentId)

    const appointmentRef = doc(db, 'appointments', appointmentId)
    const appointmentDoc = await getDoc(appointmentRef)
    
    if (!appointmentDoc.exists()) {
      throw new Error('Appointment not found')
    }
    
    const appointment = appointmentDoc.data()

    await updateDoc(appointmentRef, {
      status: 'REJECTED',
      rejectedAt: new Date().toISOString(),
      rejectedBy: doctorId
    })
    console.log('✅ Appointment status updated to REJECTED')

    const patientRef = doc(db, 'patients', appointment.patientId)
    const patientDoc = await getDoc(patientRef)
    
    if (patientDoc.exists()) {
      const patientData = patientDoc.data()
      const pendingList = patientData.pendingAppointments || []

      const updatedPending = pendingList.filter(
        (apt: any) => apt.appointmentId !== appointmentId
      )

      await updateDoc(patientRef, {
        pendingAppointments: updatedPending
      })
      console.log('✅ Removed from patient pending list')
    }

    const doctorRef = doc(db, 'doctors', doctorId)
    const doctorDoc = await getDoc(doctorRef)
    
    if (doctorDoc.exists()) {
      const doctorData = doctorDoc.data()
      const pendingRequests = doctorData.pendingRequests || []

      const updatedPendingReqs = pendingRequests.filter(
        (req: any) => req.appointmentId !== appointmentId
      )

      await updateDoc(doctorRef, {
        pendingRequests: updatedPendingReqs
      })
      console.log('✅ Removed from doctor pending requests')
    }

    console.log('✅ Appointment rejected successfully')
    return { success: true }
  } catch (error: any) {
    console.error('❌ Error rejecting appointment:', error)
    return { success: false, error: error.message }
  }
}

// ==================== ADMIN STATS ====================

export async function getAdminStats() {
  try {
    const doctorsSnap = await getDocs(collection(db, 'doctors'))
    const patientsSnap = await getDocs(collection(db, 'patients'))
    const appointmentsSnap = await getDocs(collection(db, 'appointments'))
    
    const appointments = appointmentsSnap.docs.map(doc => doc.data())
    const confirmed = appointments.filter(apt => apt.status === 'CONFIRMED').length
    const pending = appointments.filter(apt => apt.status === 'PENDING').length
    
    return {
      totalDoctors: doctorsSnap.size,
      totalPatients: patientsSnap.size,
      confirmedAppointments: confirmed,
      pendingAppointments: pending
    }
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return {
      totalDoctors: 0,
      totalPatients: 0,
      confirmedAppointments: 0,
      pendingAppointments: 0
    }
  }
}

export async function getDoctorPendingRequests(doctorId: string) {
  try {
    const doctorDoc = await getDoc(doc(db, 'doctors', doctorId))
    if (!doctorDoc.exists()) return []
    const doctorData = doctorDoc.data()
    return doctorData.pendingRequests || []
  } catch (error) {
    console.error('Error fetching pending requests:', error)
    return []
  }
}

// ==================== QUEUE MANAGEMENT ====================

export async function getTodaysQueue(doctorId: string) {
  try {
    const today = new Date().toISOString().split('T')[0]
    const appointmentsRef = collection(db, 'appointments')
    const q = query(
      appointmentsRef,
      where('doctorId', '==', doctorId),
      where('date', '==', today),
      where('status', '==', 'CONFIRMED')
    )
    const snapshot = await getDocs(q)
    const queue = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    return queue.sort((a: any, b: any) => {
      if (a.queuePosition && b.queuePosition) {
        return a.queuePosition - b.queuePosition
      }
      return (a.time || '').localeCompare(b.time || '')
    })
  } catch (error) {
    console.error('Error fetching queue:', error)
    return []
  }
}

export async function updateQueuePositions(doctorId: string, queueData: any[]) {
  try {
    console.log('📋 Updating queue positions...')
    const batch = writeBatch(db)
    
    queueData.forEach((item: any, index: number) => {
      const appointmentRef = doc(db, 'appointments', item.id)
      batch.update(appointmentRef, {
        queuePosition: index + 1,
        updatedAt: new Date().toISOString()
      })
    })
    
    await batch.commit()
    console.log('✅ Queue positions updated')
    return { success: true }
  } catch (error: any) {
    console.error('Error updating queue:', error)
    return { success: false, error: error.message }
  }
}

export async function getPatientQueueStatus(appointmentId: string) {
  try {
    const appointmentDoc = await getDoc(doc(db, 'appointments', appointmentId))
    if (!appointmentDoc.exists()) {
      return { position: 'N/A', totalInQueue: 0, estimatedWait: 0 }
    }
    
    const appointment = appointmentDoc.data()
    const queuePosition = appointment.queuePosition || 0
    
    const appointmentsRef = collection(db, 'appointments')
    const q = query(
      appointmentsRef,
      where('doctorId', '==', appointment.doctorId),
      where('date', '==', appointment.date),
      where('status', '==', 'CONFIRMED')
    )
    const snapshot = await getDocs(q)
    const totalInQueue = snapshot.size
    
    const estimatedWait = (queuePosition - 1) * 15
    
    return {
      position: queuePosition || 'Not assigned',
      totalInQueue,
      estimatedWait: estimatedWait > 0 ? estimatedWait : 0,
      yourTime: appointment.time,
      doctorName: appointment.doctorName,
      date: appointment.date
    }
  } catch (error) {
    console.error('Error fetching queue status:', error)
    return { position: 'N/A', totalInQueue: 0, estimatedWait: 0 }
  }
}

export async function markPatientStatus(appointmentId: string, status: 'SEEING' | 'COMPLETED') {
  try {
    await updateDoc(doc(db, 'appointments', appointmentId), {
      patientStatus: status,
      updatedAt: new Date().toISOString()
    })
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function addPatientToQueue(doctorId: string, patientDetails: any) {
//export async function addPatientToQueue(doctorId, patientDetails) {
  const queueRef = doc(db, "doctorQueues", doctorId);
  const queueSnap = await getDoc(queueRef);
  let queue = [];
  if (queueSnap.exists()) queue = queueSnap.data().queue || [];
  const queuePosition = queue.length + 1;
  const newEntry = { ...patientDetails, queuePosition, status: "WAITING" };
  queue.push(newEntry);
  await setDoc(queueRef, { queue }, { merge: true });
  return newEntry;
}

// Get full queue for doctor
export async function getQueueForDoctor(doctorId) {
  const queueRef = doc(db, "doctorQueues", doctorId);
  const queueSnap = await getDoc(queueRef);
  return queueSnap.exists() ? queueSnap.data().queue : [];
}


// Inside lib/firebaseServices.ts (example code)
export async function getConfirmedPatientsNotInQueue(doctorId: string, currentQueue: any[]) {
  // Get all today's confirmed appointments for this doctor
  const today = new Date().toISOString().split('T')[0];
  const appointmentsSnap = await getDocs(
    query(
      collection(db, 'appointments'),
      where('doctorId', '==', doctorId),
      where('date', '==', today),
      where('status', '==', 'CONFIRMED')
    )
  );
  const alreadyInQueueIds = new Set((currentQueue || []).map((entry: any) => entry.patientId));
  return appointmentsSnap.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter((apt: any) => !alreadyInQueueIds.has(apt.patientId));
}
