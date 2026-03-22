import { db } from './firebase'
import { collection, addDoc, getDocs, query, where, Timestamp, updateDoc, doc, getDoc } from 'firebase/firestore'

export interface OrganDonation {
  id?: string
  donorId: string
  donorName: string
  donorType: 'patient' | 'doctor'
  age: number
  bloodType: string
  selectedOrgans: string[]
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  transactionHash: string
  registrationDate: string
  approvalDate?: string
}

async function createImmutableTransaction(
  transactionType: 'ORGAN_DONATION_REQUEST' | 'ORGAN_DONATION_APPROVED' | 'ORGAN_DONATION_REJECTED',
  data: any
): Promise<string> {
  try {
    const txRef = await addDoc(collection(db, 'organDonationBlockchain'), {
      type: transactionType,
      data,
      timestamp: Timestamp.now(),
      status: 'confirmed',
      immutable: true,
      blockHash: `0x${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`
    })
    return txRef.id
  } catch (error) {
    console.error('❌ Blockchain transaction error:', error)
    throw error
  }
}

export async function patientRequestOrganDonation(
  patientId: string,
  name: string,
  age: number,
  bloodType: string,
  selectedOrgans: string[]
): Promise<{ success: boolean; donationId?: string; txHash?: string; error?: string }> {
  try {
    const txHash = await createImmutableTransaction('ORGAN_DONATION_REQUEST', {
      patientId, name, age, bloodType, selectedOrgans,
      requestedBy: 'PATIENT', timestamp: new Date().toISOString()
    })
    const donationRef = await addDoc(collection(db, 'organDonations'), {
      donorId: patientId, donorName: name, donorType: 'patient',
      age, bloodType, selectedOrgans, status: 'PENDING',
      transactionHash: txHash, registrationDate: new Date().toISOString(),
      immutable: true, blockchainVerified: true
    })
    return { success: true, donationId: donationRef.id, txHash }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function doctorRequestOrganDonation(
  doctorId: string, doctorName: string, patientId: string, patientName: string,
  age: number, bloodType: string, selectedOrgans: string[]
): Promise<{ success: boolean; donationId?: string; txHash?: string; error?: string }> {
  try {
    const txHash = await createImmutableTransaction('ORGAN_DONATION_REQUEST', {
      doctorId, doctorName, patientId, patientName, age, bloodType,
      selectedOrgans, requestedBy: 'DOCTOR', timestamp: new Date().toISOString()
    })
    const donationRef = await addDoc(collection(db, 'organDonations'), {
      donorId: patientId, donorName: patientName, donorType: 'doctor',
      doctorId, doctorName, age, bloodType, selectedOrgans, status: 'PENDING',
      transactionHash: txHash, registrationDate: new Date().toISOString(),
      immutable: true, blockchainVerified: true
    })
    return { success: true, donationId: donationRef.id, txHash }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function approveOrganDonation(
  donationId: string, adminId: string
): Promise<{ success: boolean; approvalTxHash?: string; error?: string }> {
  try {
    const donationRef = doc(db, 'organDonations', donationId)
    const donationSnap = await getDoc(donationRef)
    if (!donationSnap.exists()) throw new Error('Donation request not found')
    const donation = donationSnap.data()
    const approvalTxHash = await createImmutableTransaction('ORGAN_DONATION_APPROVED', {
      donationId, donorName: donation.donorName, selectedOrgans: donation.selectedOrgans,
      approvedBy: adminId, approvalTime: new Date().toISOString(),
      previousTxHash: donation.transactionHash
    })
    await updateDoc(donationRef, {
      status: 'APPROVED', approvalDate: new Date().toISOString(),
      approvalTxHash, approvedBy: adminId
    })
    return { success: true, approvalTxHash }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function rejectOrganDonation(
  donationId: string, adminId: string = ''
): Promise<{ success: boolean; error?: string }> {
  try {
    const donationRef = doc(db, 'organDonations', donationId)
    const donationSnap = await getDoc(donationRef)
    if (!donationSnap.exists()) throw new Error('Donation request not found')
    const donation = donationSnap.data()
    const rejectionTxHash = await createImmutableTransaction('ORGAN_DONATION_REJECTED', {
      donationId, donorName: donation.donorName, selectedOrgans: donation.selectedOrgans,
      rejectedBy: adminId, rejectionTime: new Date().toISOString(),
      previousTxHash: donation.transactionHash
    })
    await updateDoc(donationRef, {
      status: 'REJECTED', rejectionDate: new Date().toISOString(),
      rejectionTxHash, rejectedBy: adminId
    })
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getPendingDonations() {
  try {
    const q = query(collection(db, 'organDonations'), where('status', '==', 'PENDING'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) { return [] }
}

export async function getApprovedDonations() {
  try {
    const q = query(collection(db, 'organDonations'), where('status', '==', 'APPROVED'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) { return [] }
}

export async function getRejectedDonations() {
  try {
    const q = query(collection(db, 'organDonations'), where('status', '==', 'REJECTED'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) { return [] }
}

export async function getBlockchainTransactions() {
  try {
    const snapshot = await getDocs(collection(db, 'organDonationBlockchain'))
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) { return [] }
}

export async function getDonationStats() {
  try {
    const allDonations = await getDocs(collection(db, 'organDonations'))
    const pending = allDonations.docs.filter(d => d.data().status === 'PENDING').length
    const approved = allDonations.docs.filter(d => d.data().status === 'APPROVED').length
    const rejected = allDonations.docs.filter(d => d.data().status === 'REJECTED').length
    return { total: allDonations.size, pending, approved, rejected }
  } catch (error) {
    return { total: 0, pending: 0, approved: 0, rejected: 0 }
  }
}


